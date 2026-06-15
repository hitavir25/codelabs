authors: HitaVirTech
summary: Build a gold layer with Athena CTAS, load it into Redshift Serverless with COPY, query the lake directly with Redshift Spectrum, and understand the lake house.
id: hvt-de-aws-03-3-serve
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Serve and query: Athena CTAS, Redshift Serverless, and the lake house

## Overview
Duration: 5:00

Your silver layer is clean, typed, and partitioned, but nobody runs a business off
raw silver tables. In this lab you build the **gold** layer — the curated, ready-to-
answer tables — and then serve it two ways: query it in place with Amazon Athena,
and load it into a real warehouse with Amazon Redshift Serverless. By the end you
will have the same revenue-by-region answer coming out of both engines, and you will
understand why a modern data team keeps a lake and a warehouse side by side.

You are still the first data engineer at **HitaVir Retail**. So far you have moved
one dataset from **raw to bronze to silver**. This is the last hop: **silver to gold**,
and then out to the people who ask the questions.

### What you'll build

- A **gold** table, `daily_region_sales`, built from silver with an Athena **CTAS**
  query and written back to S3 as Parquet under `gold/`.
- A **Redshift Serverless** namespace and workgroup — a warehouse that turns on only
  when you query it.
- An **IAM role** that lets Redshift read your S3 gold data, and a **COPY** load that
  pulls the gold Parquet into a Redshift table.
- A **Redshift Spectrum** external schema that queries the S3 gold and silver data
  directly, without loading it.

### What you'll learn

- What **CTAS** is and why it is the simplest way to materialize a curated table.
- What **serverless**, **COPY**, **Redshift Spectrum**, and a **lake house** mean.
- The difference between a data **lake** and a data **warehouse**, and how the
  **Modern Data Architecture** uses both together.

### Prerequisites

- You finished codelab 03-2, so silver Parquet exists at
  `s3://hvt-retail-datalake-<account-id>/silver/orders/`, partitioned by `region`
  and `order_date`.
- The Glue database `hvt_retail_db` exists (from codelab 02) and has an `orders`
  table pointing at silver.
- The AWS CLI is configured for `us-east-1` (codelab 00).

### Services used

Amazon Athena, Amazon S3, AWS Glue Data Catalog, Amazon Redshift Serverless, AWS IAM.

### Cost and time

- **Time:** about 60 minutes.
- **Cost:** Athena bills per terabyte scanned; this dataset is tiny, so Athena costs
  fractions of a cent. **Redshift Serverless is the one service in this track that
  bills while it merely exists.** See the warning below and do the cleanup.

Negative
: **Redshift Serverless bills by RPU-hour for as long as the workgroup exists**, even
idle, charged in 60-second minimums whenever it is active. An RPU (Redshift Processing
Unit) is its unit of compute. You will set the base capacity to the minimum (8 RPUs)
and **delete the workgroup and namespace the moment you finish**. Do not leave this
lab running overnight. The mandatory Cleanup step at the end removes everything.

### The concept visual

Open the lake house architecture diagram. It shows the medallion layers in S3 feeding
both Athena and Redshift, and where the warehouse and the lake meet.

Visual: [`assets/03-lakehouse-architecture.html`](../assets/03-lakehouse-architecture.html)

## Setup
Duration: 3:00

Set two shell variables so every command below is copy-paste ready. Replace the
account id with your own.

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
echo "Bucket: $BUCKET"
```

Athena needs a place to write query results. Create a dedicated prefix in your data
lake bucket and remember it; the console will ask for it the first time you run a
query.

```bash
aws s3api put-object --bucket "$BUCKET" --key athena-results/
```

Confirm your silver table is queryable before you build on it:

```bash
aws athena start-query-execution \
  --query-string "SELECT COUNT(*) FROM hvt_retail_db.orders" \
  --query-execution-context Database=hvt_retail_db \
  --result-configuration OutputLocation=s3://$BUCKET/athena-results/
```

That returns a `QueryExecutionId`. If it does not error, your catalog and silver data
are wired up and you are ready to build gold.

Positive
: A **lake house** (one word in this track) is an architecture that puts warehouse-
style querying directly on top of data-lake storage. You get the cheap, open storage
of a lake and the fast, structured querying of a warehouse without copying everything
twice. This lab is you building exactly that.

## Build the gold layer with Athena CTAS
Duration: 12:00

The **gold** layer holds curated tables shaped around real questions. HitaVir Retail's
first question is simple: how much revenue did each region make each day, counting only
orders that became real sales (status `completed` or `shipped`)?

You will answer it with a **CTAS** query. **CTAS** stands for **Create Table As Select**:
a single SQL statement that runs a `SELECT` and writes its result to S3 as a new table,
registering that table in the Glue catalog at the same time. It is the simplest way to
materialize a curated dataset.

The full script lives at [`scripts/athena_gold_ctas.sql`](../scripts/athena_gold_ctas.sql).
Here is the core of it:

```sql
CREATE TABLE hvt_retail_db.daily_region_sales
WITH (
  format = 'PARQUET',
  parquet_compression = 'SNAPPY',
  external_location = 's3://hvt-retail-datalake-<account-id>/gold/daily_region_sales/'
) AS
SELECT
    region,
    order_date,
    COUNT(order_id)  AS order_count,
    SUM(quantity)    AS units_sold,
    SUM(amount)      AS revenue
FROM hvt_retail_db.orders
WHERE status IN ('completed', 'shipped')
GROUP BY region, order_date;
```

**Console path**

1. Open **Athena**, then **Query editor**. If prompted, set the query result location
   to `s3://hvt-retail-datalake-<account-id>/athena-results/` under **Settings**.
2. Pick `hvt_retail_db` as the database on the left.
3. Paste the `CREATE TABLE ... AS SELECT` statement, replace `<account-id>`, and choose
   **Run**. Athena scans silver, computes the aggregate, and writes Parquet to `gold/`.

**AWS CLI**

Run the same CTAS as a query execution. The statement is written inline here; mind the
quoting.

```bash
aws athena start-query-execution \
  --query-string "CREATE TABLE hvt_retail_db.daily_region_sales WITH (format='PARQUET', parquet_compression='SNAPPY', external_location='s3://$BUCKET/gold/daily_region_sales/') AS SELECT region, order_date, COUNT(order_id) AS order_count, SUM(quantity) AS units_sold, SUM(amount) AS revenue FROM hvt_retail_db.orders WHERE status IN ('completed','shipped') GROUP BY region, order_date" \
  --query-execution-context Database=hvt_retail_db \
  --result-configuration OutputLocation=s3://$BUCKET/athena-results/
```

Confirm the gold objects landed in S3:

```bash
aws s3 ls s3://$BUCKET/gold/daily_region_sales/
```

Now query gold and read the business answer:

```bash
aws athena start-query-execution \
  --query-string "SELECT region, SUM(revenue) AS total_revenue FROM hvt_retail_db.daily_region_sales GROUP BY region ORDER BY total_revenue DESC" \
  --query-execution-context Database=hvt_retail_db \
  --result-configuration OutputLocation=s3://$BUCKET/athena-results/
```

In the console you will see a small table: one row per region with its total revenue,
highest first. That is your gold layer serving its first query.

Positive
: CTAS wrote Parquet, not CSV, and registered the table in Glue. Anything that reads
the Glue catalog — Athena, Redshift Spectrum, another Glue job — can now query gold
without knowing where the files physically live.

## Stand up Redshift Serverless
Duration: 12:00

Athena queries files in place. A **warehouse** like Amazon Redshift instead loads data
into its own optimized storage and compute, which makes repeated, complex queries and
many concurrent users fast and cheap per query. **Redshift Serverless** is the version
with no cluster to size or manage: it scales compute up and down automatically and you
pay only for what you use. **Serverless** means you never provision or run servers
yourself — the service does it on demand.

Redshift Serverless has two pieces. A **namespace** holds your databases, users, and
data (the storage side). A **workgroup** holds the compute and network settings (the
query side). You create one of each.

**Console path**

1. Open **Amazon Redshift**, then **Redshift Serverless**.
2. Choose **Create workgroup**. Name it `hvt-retail-wg`.
3. Set **Base capacity** to the minimum, **8 RPUs**, to keep the bill small.
4. On the namespace page, create a new namespace `hvt-retail-ns`. Set an admin user
   name and password and note them.
5. Accept the default VPC and subnets, then create. It takes a few minutes to become
   **Available**.

**AWS CLI**

Create the namespace, then the workgroup that points at it. Replace the password.

```bash
aws redshift-serverless create-namespace \
  --namespace-name hvt-retail-ns \
  --admin-username hvtadmin \
  --admin-user-password 'ChangeMe-Str0ng!' \
  --tags key=project,value=hvt-retail key=env,value=dev
```

```bash
aws redshift-serverless create-workgroup \
  --workgroup-name hvt-retail-wg \
  --namespace-name hvt-retail-ns \
  --base-capacity 8 \
  --publicly-accessible \
  --tags key=project,value=hvt-retail key=env,value=dev
```

Wait until it reports `AVAILABLE`:

```bash
aws redshift-serverless get-workgroup \
  --workgroup-name hvt-retail-wg \
  --query 'workgroup.status' --output text
```

Positive
: The 60-second meter starts when the workgroup becomes available, not when you first
query. Move through the next two steps without long breaks, then run Cleanup.

## Give Redshift permission to read S3
Duration: 8:00

Redshift cannot read your gold data until an **IAM role** grants it permission. You will
create a role that Redshift can assume, attach read access to S3 and the Glue catalog,
and associate it with the namespace.

**AWS CLI**

Create a trust policy that lets the Redshift service assume the role:

```bash
cat > redshift-trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "redshift.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}
EOF

aws iam create-role \
  --role-name hvt-retail-redshift-role \
  --assume-role-policy-document file://redshift-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev
```

Attach read access to S3 (for COPY and Spectrum) and to the Glue catalog (for the
external schema):

```bash
aws iam attach-role-policy \
  --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

aws iam attach-role-policy \
  --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonAthenaFullAccess
```

Associate the role with the namespace so Redshift can use it:

```bash
export ROLE_ARN=arn:aws:iam::$ACCOUNT_ID:role/hvt-retail-redshift-role

aws redshift-serverless update-namespace \
  --namespace-name hvt-retail-ns \
  --iam-roles "$ROLE_ARN"
```

**Console path**

In **IAM**, create a role with a **Custom trust policy** for the `redshift.amazonaws.com`
service, attach **AmazonS3ReadOnlyAccess** and **AmazonAthenaFullAccess**, and name it
`hvt-retail-redshift-role`. Then in **Redshift Serverless**, open the `hvt-retail-ns`
namespace, go to **Security and encryption**, and **Associate IAM role**.

Negative
: `AmazonS3ReadOnlyAccess` is broad on purpose to keep this lab moving. In production
you would scope the role to just `s3://hvt-retail-datalake-<account-id>/gold/*` and
`silver/*`. You will practice least-privilege scoping in codelab 05.

## Load gold into Redshift with COPY
Duration: 10:00

Now pull the gold Parquet into a Redshift table. The tool for that is **COPY**: Redshift's
bulk loader that reads many files from S3 in parallel and inserts them into a table far
faster than running individual `INSERT` statements.

The full script is [`scripts/redshift_copy.sql`](../scripts/redshift_copy.sql). It creates
a table whose columns match the CTAS output, then loads it:

```sql
CREATE TABLE daily_region_sales (
    region        VARCHAR(32),
    order_date    DATE,
    order_count   BIGINT,
    units_sold    BIGINT,
    revenue       DOUBLE PRECISION
);

COPY daily_region_sales
FROM 's3://hvt-retail-datalake-<account-id>/gold/daily_region_sales/'
IAM_ROLE '<redshift-role-arn>'
FORMAT AS PARQUET;
```

**Console path**

1. In **Redshift Serverless**, open **Query editor v2** and connect to `hvt-retail-wg`
   using the admin user you created.
2. Paste the `CREATE TABLE`, then the `COPY` (replace the bucket and the role ARN), then
   the `SELECT`. Run them in order.

**AWS CLI**

Drive the same statements through the **Redshift Data API**, which runs SQL over HTTPS
with no database driver or open port. Run them one at a time.

```bash
# Create the target table
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "CREATE TABLE daily_region_sales (region VARCHAR(32), order_date DATE, order_count BIGINT, units_sold BIGINT, revenue DOUBLE PRECISION)"
```

```bash
# Bulk-load the gold Parquet
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "COPY daily_region_sales FROM 's3://$BUCKET/gold/daily_region_sales/' IAM_ROLE '$ROLE_ARN' FORMAT AS PARQUET"
```

Each call returns a statement `Id`. Check that a statement finished and read its result:

```bash
aws redshift-data describe-statement --id <statement-id> --query 'Status' --output text
```

```bash
# Query gold inside Redshift
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "SELECT region, SUM(revenue) AS total_revenue FROM daily_region_sales GROUP BY region ORDER BY total_revenue DESC"
```

Fetch the rows of the SELECT with its statement id:

```bash
aws redshift-data get-statement-result --id <statement-id>
```

You should see the same region rows and revenue totals Athena gave you. The gold layer
now lives in the warehouse.

## Query the lake directly with Redshift Spectrum
Duration: 7:00

You just copied gold into Redshift. But sometimes you want Redshift to read S3 data
*without* loading it first — to join a warehouse table against fresh lake data, or to
reach a table too big to copy. **Redshift Spectrum** does that: it lets Redshift run
SQL straight against files in S3 through an **external schema** mapped to the Glue
catalog.

**Console path / Query editor v2**

In Query editor v2 connected to `hvt-retail-wg`, create an external schema that points
at your existing Glue database, then query gold without loading it:

```sql
CREATE EXTERNAL SCHEMA hvt_spectrum
FROM DATA CATALOG
DATABASE 'hvt_retail_db'
IAM_ROLE '<redshift-role-arn>';

SELECT region, SUM(revenue) AS total_revenue
FROM hvt_spectrum.daily_region_sales
GROUP BY region
ORDER BY total_revenue DESC;
```

**AWS CLI**

The same two statements through the Data API:

```bash
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "CREATE EXTERNAL SCHEMA hvt_spectrum FROM DATA CATALOG DATABASE 'hvt_retail_db' IAM_ROLE '$ROLE_ARN'"
```

```bash
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "SELECT region, SUM(revenue) AS total_revenue FROM hvt_spectrum.daily_region_sales GROUP BY region ORDER BY total_revenue DESC"
```

The result matches the loaded table, but no data was copied — Redshift read the gold
Parquet in S3 directly. Through the same external schema you can also query
`hvt_spectrum.orders` (your silver table) without ever loading it.

Positive
: This is the **Modern Data Architecture**, also called the **lake house**, in action.
Your **lake** is the open, cheap, all-the-data S3 store in Parquet. Your **warehouse**
is Redshift's fast, structured store for hot, curated tables. Spectrum is the seam
between them: load the gold you query constantly, and reach into the lake with Spectrum
for everything else — one set of catalog tables, two engines, no duplicated pipelines.

## Checkpoint: the same answer from both engines
Duration: 3:00

You have served the gold layer two ways. Confirm both agree.

1. **Athena** returned revenue by region from `hvt_retail_db.daily_region_sales`.
2. **Redshift** returned the same revenue by region from the COPY-loaded
   `daily_region_sales`, and again through the `hvt_spectrum` external schema.

All three queries produce one row per region with a `total_revenue` total, in the same
order. If your Athena result and your Redshift result match, you have a working lake
house: gold built once in S3, queryable from both a lake engine and a warehouse engine.

Positive
: That agreement is the whole point. The same curated table answers the same question
identically whether the question comes through the lake or the warehouse.

## Troubleshooting
Duration: 3:00

- **CTAS fails with `location ... is not empty`** — Athena will not write into a
  non-empty prefix. Delete the old gold objects first:
  `aws s3 rm s3://$BUCKET/gold/daily_region_sales/ --recursive`, then re-run.
- **Athena: `No output location provided`** — set the query result location to
  `s3://$BUCKET/athena-results/` in the Athena **Settings** tab before running.
- **COPY: `S3ServiceException: Access Denied`** — the IAM role is missing S3 read
  access or is not associated with the namespace. Confirm `AmazonS3ReadOnlyAccess` is
  attached and that you ran `update-namespace --iam-roles`.
- **`relation "daily_region_sales" already exists`** — you ran `CREATE TABLE` twice.
  Run `DROP TABLE daily_region_sales;` first, or re-run the COPY only.
- **Spectrum: `IAM role ... cannot assume`** — the external schema needs the role to
  reach Glue. Confirm `AmazonAthenaFullAccess` (which includes Glue read) is attached
  to `hvt-retail-redshift-role`.

## Cleanup
Duration: 5:00

This step is **mandatory**. Redshift Serverless keeps billing until the workgroup is
gone, so do this now, not later.

**1. Delete the Redshift workgroup, then the namespace.** Order matters — the workgroup
goes first.

```bash
aws redshift-serverless delete-workgroup --workgroup-name hvt-retail-wg

# Wait until the workgroup is fully gone, then:
aws redshift-serverless delete-namespace --namespace-name hvt-retail-ns
```

In the console: **Redshift Serverless**, select `hvt-retail-wg`, **Delete**; then
delete the `hvt-retail-ns` namespace.

**2. Delete the Redshift IAM role.** Detach its policies first, then delete it.

```bash
aws iam detach-role-policy --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
aws iam detach-role-policy --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonAthenaFullAccess
aws iam delete-role --role-name hvt-retail-redshift-role
```

**3. Drop the gold CTAS table and delete its S3 objects.**

```bash
aws athena start-query-execution \
  --query-string "DROP TABLE IF EXISTS hvt_retail_db.daily_region_sales" \
  --query-execution-context Database=hvt_retail_db \
  --result-configuration OutputLocation=s3://$BUCKET/athena-results/

aws s3 rm s3://$BUCKET/gold/daily_region_sales/ --recursive
```

Negative
: Confirm the workgroup is really gone with
`aws redshift-serverless list-workgroups`. An empty list means the meter has stopped.
Leave your S3 bucket, silver data, and `hvt_retail_db` in place — later labs use them.

## What's next
Duration: 1:00

You closed the loop from raw to gold and served the result through both a data lake
engine and a warehouse engine. You now know what a CTAS, a COPY, Redshift Spectrum, and
a lake house are, and why a team runs a lake and a warehouse together.

Next you will stop running these steps by hand. In **Codelab 04: Orchestration and
automation**, you will wire the whole pipeline — raw to bronze to silver to gold — into
a scheduled, repeatable workflow.

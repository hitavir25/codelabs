authors: HitaVirTech
summary: Build an end-to-end AWS data pipeline for HitaVir Retail — discovery, a Medallion lake, Glue ETL, Athena and Redshift, orchestration, security, and a capstone.
id: data-engineering-on-aws
categories: aws,data-engineering,foundations
status: Published
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Data Engineering on AWS

## Overview
Duration: 12:00

Welcome to **Data Engineering on AWS**. This is one continuous, hands-on codelab.
You will become the first data engineer at **HitaVir Retail**, a fictional online
store, and build a real end-to-end data pipeline on AWS. You work one dataset the
whole way through, moving it across a Medallion data lake on Amazon S3 — from
**raw to bronze to silver to gold** — and end with a capstone that validates the
whole thing against a known result.

Unlike a tour, every section here is something you **do**. You build the lake,
catalog it, transform it with Spark, serve it from two engines, automate it, lock
it down, and finally tear it all down so your account returns to zero cost.

### What you build, end to end

- A safe AWS workbench: a non-root admin user, billing guardrails, and the AWS CLI.
- A Medallion data lake on S3: `raw`, `bronze`, `silver`, and `gold` layers.
- A Glue Data Catalog database `hvt_retail_db`, populated by a crawler.
- A Glue ETL job in PySpark that turns raw CSV into clean, partitioned Parquet.
- A curated gold table `daily_region_sales`, served from both Athena and Redshift.
- A scheduled, retryable Step Functions pipeline driven by EventBridge.
- Least-privilege IAM, Lake Formation column security, KMS encryption, CloudWatch
  alarms, and a CloudTrail audit trail.

### Learning outcomes

- Explain what a data engineer does, the six key functions, and the pipeline lifecycle.
- Perform data discovery: crawl unknown data, infer a schema, and fix wrong types.
- Design a data lake with Medallion layers, partitioning, storage classes, and lifecycle rules.
- Transform data at scale with serverless Glue ETL and PySpark.
- Serve curated data with Athena CTAS and Redshift Serverless, and reason about the lake house.
- Orchestrate a pipeline with retries on a schedule.
- Secure and monitor a lake with least privilege, encryption, and audit.

### The HitaVir Retail storyline

You are the first data engineer at HitaVir Retail. You work one dataset across the
whole track — three logical tables, `orders`, `customers`, and `products` — and move
it through a Medallion lake on Amazon S3: **raw to bronze to silver to gold**. Each
section adds one real capability to that pipeline, so the work is cumulative. By the
end you will have a complete, automated, governed lake house and the gold revenue
numbers to prove it runs correctly.

### Services used

Amazon S3 and S3 Lifecycle, AWS IAM, AWS Glue (crawler, Data Catalog, and ETL),
Amazon Athena, Amazon Redshift Serverless, AWS Step Functions, Amazon EventBridge
Scheduler, AWS Lake Formation, AWS KMS, Amazon CloudWatch, AWS CloudTrail, AWS
Budgets, and the AWS CLI.

### Cost and time

- **Time:** about 7 to 8 hours total, done in one cumulative build.
- **Cost:** this track favors free-tier and serverless services and keeps the
  dataset tiny, so most steps cost cents or nothing. **Redshift Serverless is the
  only notable biller** — it charges by the hour for as long as the workgroup exists,
  even idle. You set it to the minimum capacity and the final teardown removes it,
  along with the small KMS key charge. Run the teardown and your bill returns to zero.

### Prerequisites

- An AWS account you can create resources in (the next section walks you through setup).
- The AWS CLI installed and configured (also covered next).
- Basic comfort with Python, SQL, and a terminal.
- A code editor. VS Code is fine.

### Conventions for the whole track

These hold everywhere so resources are easy to find and delete:

- **Region:** `us-east-1` (N. Virginia) — broadest service and free-tier coverage.
  If you use another region, change it everywhere consistently.
- **Naming:** everything starts with `hvt-retail-`.
- **Data lake bucket:** `hvt-retail-datalake-<your-account-id>`. S3 bucket names are
  global, so adding your account id keeps yours unique.
- **Tags:** tag everything with `project=hvt-retail` and `env=dev` for cost tracking
  and cleanup.

### AWS Well-Architected

This course applies the AWS Well-Architected Framework pillars throughout, and the
boxes along the way call them out:

- **Operational excellence** — automate the pipeline with Step Functions and EventBridge.
- **Security** — least-privilege IAM, Lake Formation column grants, KMS encryption, audit.
- **Reliability** — retries with backoff, validation checkpoints, immutable raw data.
- **Performance efficiency** — serverless engines and partitioned, columnar Parquet.
- **Cost optimization** — free tier, lifecycle transitions, right-sized workers, and a full teardown.

### The roadmap visual

Open the learning-path roadmap for the whole track. It shows every stage as one
connected, color-coded journey so you always know where you are.

Visual: [`assets/00-learning-path.html`](../assets/00-learning-path.html)

Positive
: Write your chosen region and account id on a sticky note. You will paste them into
almost every command in this track.

## Course navigation: set up your AWS workbench
Duration: 30:00

This first stage gets your account ready so every later step just works. You will not
touch a data service yet. Instead you build a safe, cheap place to work and prove your
tools are wired up: a non-root admin user, cost guardrails, and a configured AWS CLI.

### Create your AWS account

If you already have an account you are happy to use, skip to the cost guardrails below.

**Console path**

1. Go to [aws.amazon.com](https://aws.amazon.com) and choose **Create an AWS Account**.
2. Enter your email, a strong password, and an account name like `hvt-retail`.
3. Add billing details, verify your phone, and choose the **Basic (free)** support plan.
4. Sign in to the **AWS Management Console** as the root user.

Negative
: The email and password you just created are the **root user**. The root user can do
anything, including close the account and change billing. Never use it for daily work,
and never create access keys for it. You will make a safer user next.

### Turn on cost guardrails first

Before any data service exists, give yourself a tripwire. This is the habit that
separates engineers who get a surprise bill from those who never do.

**Set a budget (console path)**

1. In the console search bar, open **Billing and Cost Management**.
2. Choose **Budgets**, then **Create budget**.
3. Pick **Use a template**, then **Monthly cost budget**.
4. Set the amount to `5` USD and add your email for alerts. Create the budget.

**Set a budget (AWS CLI)**

Once the CLI is configured two steps from now, the same budget looks like this. Save
it as `budget.json`:

```json
{
  "BudgetName": "hvt-retail-monthly",
  "BudgetLimit": { "Amount": "5", "Unit": "USD" },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}
```

```bash
aws budgets create-budget \
  --account-id <your-account-id> \
  --budget file://budget.json
```

**Add a billing alarm (console path)**

A budget emails you on a schedule; a CloudWatch billing alarm fires the moment
estimated charges cross a line. Use both.

1. Open **CloudWatch** and switch the region selector to **US East (N. Virginia)**
   (billing metrics only live there).
2. Choose **Alarms**, then **Create alarm**, then **Select metric**.
3. Pick **Billing**, then **Total Estimated Charge**, then the `USD` metric.
4. Set the threshold to **greater than 5** and send the alert to an email topic.

Positive
: Billing metrics are only published in `us-east-1`. If you cannot find the Billing
metric, you are looking in the wrong region, not missing a setting. Cost guardrails
before resources is the cost optimization pillar in practice.

### Create a safe admin user with IAM

You will work as an **IAM user** with admin rights, not as root. IAM is AWS's identity
and access service: it decides who can do what.

**Console path**

1. Open **IAM**, choose **Users**, then **Create user**.
2. Name the user `hvt-admin` and enable **console access**.
3. Attach the **AdministratorAccess** policy directly.
4. Create the user. On the next page, create an **access key** for **Command Line
   Interface (CLI)** use and download the `.csv`.

After this track, real production access should be least-privilege, not full admin.
You will tighten exactly this kind of access later in the security stage.

Negative
: Your access key is a secret, like a password. Never paste it into code, a commit, or
a chat. If it ever leaks, deactivate it in IAM immediately.

### Install and configure the AWS CLI

The AWS CLI lets you drive AWS from the terminal, which is how this track gives you
copy-paste commands alongside every console path.

```bash
# macOS
brew install awscli

# Windows (PowerShell)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip && sudo ./aws/install
```

Confirm it installed, then configure it:

```bash
aws --version
aws configure
```

Paste your access key id and secret access key from the `.csv`, set the region to
`us-east-1`, and set the output format to `json`.

Positive
: Run `aws configure` once and it writes `~/.aws/credentials` and `~/.aws/config`.
Every command in this track reads those files, so you never type keys again.

### Checkpoint: prove your tools work

Confirm who you are and that you can reach S3.

```bash
aws sts get-caller-identity
```

You should see your account id and the `hvt-admin` user ARN. Note the account id; you
will use it in bucket names. Now list your S3 buckets — a brand-new account has none,
and an empty list is a success here, not an error.

```bash
aws s3 ls
```

If that command returns with no error, your workbench is ready. This is your first
validation checkpoint: a concrete thing you can see that proves the step worked. Every
stage in this track ends with one.

### Troubleshooting

- **`Unable to locate credentials`** — `aws configure` did not finish. Re-run it and
  confirm `~/.aws/credentials` exists.
- **`AccessDenied` on `get-caller-identity`** — the access key is deactivated or
  mistyped. Create a fresh key for `hvt-admin` and reconfigure.
- **`InvalidClientTokenId`** — the key id and secret do not match, often from a copy
  that grabbed a trailing space. Re-paste both carefully.
- **Billing metric missing in CloudWatch** — you are not in `us-east-1`. Switch the
  region selector.
- **CLI command not found after install** — open a new terminal so it picks up the
  updated path.

## What a data engineer does
Duration: 30:00

You have a safe workbench. Now learn what the job is actually about, then do the very
first piece of it: land the raw data in your lake.

A **data engineer** builds and runs the systems that move data from where it is created
to where it can be used. Analysts, dashboards, and machine-learning models all sit
downstream of you. When the data is late, wrong, or missing, they are stuck. The output
you are responsible for is **trustworthy data, delivered on time**.

### The concept visual

Open the key-functions visual. It lays out the six functions as a pipeline: four flow
left to right (build infrastructure, ingest, prepare, catalog), while automate rides
above and govern rides below, wrapping every stage.

Visual: [`assets/01-key-functions.html`](../assets/01-key-functions.html)

### The six key functions

These six functions show up in every data platform, on any cloud. The whole track is
organized around them.

1. **Build and manage data infrastructure** — set up the storage and compute the
   platform runs on. On AWS this is your S3 data lake, the IAM roles that grant access,
   and the engines that process data.
2. **Ingest from various sources** — bring data in from databases, flat files, APIs,
   and event streams. Today the source is three CSV files.
3. **Prepare data for analytics** — clean, validate, and reshape messy raw data into
   something usable. This is the **raw to bronze to silver to gold** journey.
4. **Catalog and document datasets** — record what each table and column means, so
   others can find and trust it. On AWS the Glue Data Catalog does this.
5. **Automate workflows** — turn the steps into pipelines that run on a schedule or in
   response to an event, with no human clicking buttons.
6. **Ensure quality, security, and compliance** — validate the data, control access,
   encrypt it, and keep an audit trail. This wraps every other function.

Negative
: A common beginner mistake is treating security and quality as a later chore. By then
the bad data has already reached a dashboard and the wrong people have already had
access. Build both in from the first object you store.

### The pipeline lifecycle, and batch versus streaming

A **pipeline** is the path a piece of data travels from its source to a place where it
creates value. The lifecycle is the ordered set of stages: **ingest**, **store**,
**transform**, **catalog**, **serve**. Two cross-cutting concerns run alongside every
stage: **orchestration** decides order and timing, and **governance** keeps it secure,
correct, and compliant.

Data moves through that pipeline in one of two cadences. **Batch** processing handles
data in chunks on a schedule; it is simpler, cheaper, and the right default for
reporting. HitaVir Retail's daily order export is a batch source, and this whole track
is a batch pipeline. **Streaming** processing handles each event the moment it arrives,
for near real-time results; reach for it only when freshness genuinely matters.

Positive
: Start with batch unless a real requirement forces streaming. "It would be nice if it
were live" is not a requirement. Latency you actually need is.

### Where AWS fits

| Function | AWS service | Role |
|---|---|---|
| Build infrastructure | Amazon S3, IAM | Durable lake storage; identity and access. |
| Ingest | AWS Glue, AWS DMS, Amazon Kinesis | Batch loads, database replication, streaming. |
| Prepare | AWS Glue ETL | Clean and reshape data at scale with PySpark. |
| Catalog | AWS Glue Data Catalog | Central record of tables, schemas, locations. |
| Automate | Glue Workflows, Step Functions, EventBridge | Schedule and chain the steps. |
| Govern | IAM, Lake Formation, KMS, CloudTrail | Least privilege, encryption, audit. |

**S3 is the foundation** every other service reads from and writes to. That is why your
first real action is to create the S3 lake and land the raw data.

### Quick win: create the lake and land the raw data

Capture your account id first; the bucket name needs it.

```bash
aws sts get-caller-identity --query Account --output text
```

To save typing, store it in a shell variable for this session. On macOS or Linux:

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET=hvt-retail-datalake-$ACCOUNT_ID
echo "Using bucket: $BUCKET"
```

You will create the bucket `hvt-retail-datalake-<your-account-id>` and upload the three
CSVs to the `raw/` prefix. A **prefix** is S3's version of a folder. The `raw/` zone
holds data exactly as it arrived, untouched, so you always have an original to reprocess.

**Console path**

1. Open the **S3** console and choose **Create bucket**.
2. Set **Bucket name** to `hvt-retail-datalake-<your-account-id>` and **Region** to
   **US East (N. Virginia) us-east-1**. Leave **Block all public access** on. Create it.
3. Open the bucket, go to **Properties**, find **Tags**, and add `project=hvt-retail`
   and `env=dev`.
4. Choose **Create folder**, name it `raw`, then **Upload** `orders.csv`,
   `customers.csv`, and `products.csv` into it.

**AWS CLI**

```bash
aws s3 mb s3://$BUCKET --region us-east-1

aws s3api put-bucket-tagging \
  --bucket $BUCKET \
  --tagging 'TagSet=[{Key=project,Value=hvt-retail},{Key=env,Value=dev}]'

aws s3 cp dataset/orders.csv    s3://$BUCKET/raw/orders.csv
aws s3 cp dataset/customers.csv s3://$BUCKET/raw/customers.csv
aws s3 cp dataset/products.csv  s3://$BUCKET/raw/products.csv
```

Negative
: `us-east-1` is the one region where `aws s3 mb` does not take a location constraint.
Pass only `--region us-east-1`. In any other region you would also need
`--create-bucket-configuration LocationConstraint=<region>`, a common first-bucket error.

### Checkpoint: see the raw zone

```bash
aws s3 ls s3://$BUCKET/raw/
```

You should see exactly three objects:

```text
2026-06-16 10:00:00      20902 customers.csv
2026-06-16 10:00:00     192475 orders.csv
2026-06-16 10:00:00       2151 products.csv
```

If the three CSVs are listed, the raw zone of your data lake is live and the next steps
have data to work with.

## How to perform data discovery on AWS
Duration: 50:00

Right now those raw files are just bytes in a bucket. Nothing in AWS knows they are
tables, what columns they hold, or what types those columns are. **Data discovery** is
the work of answering exactly that: profiling unknown data, inferring its structure, and
recording the result so every later service can read it without guessing.

### The concept visual

Open the discovery loop. It shows the three stages you are about to run as a cycle, plus
the before-and-after of the schema you will correct.

Visual: [`assets/02-data-discovery-loop.html`](../assets/02-data-discovery-loop.html)

### Setup: a least-privilege role for Glue

Set your shell variables, then confirm the raw data is present.

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET=hvt-retail-datalake-$ACCOUNT_ID
aws s3 ls s3://$BUCKET/raw/
```

The crawler needs an IAM role it can assume to read your bucket and write to the catalog.
Create a least-privilege role for Glue now.

```bash
cat > glue-trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "glue.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

aws iam create-role \
  --role-name hvt-retail-glue-crawler-role \
  --assume-role-policy-document file://glue-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

aws iam attach-role-policy \
  --role-name hvt-retail-glue-crawler-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole

cat > glue-s3-read.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::$BUCKET",
        "arn:aws:s3:::$BUCKET/raw/*"
      ]
    }
  ]
}
EOF

aws iam put-role-policy \
  --role-name hvt-retail-glue-crawler-role \
  --policy-name hvt-retail-glue-s3-read \
  --policy-document file://glue-s3-read.json
```

Positive
: The managed `AWSGlueServiceRole` covers the catalog actions Glue needs; the inline
policy grants read access to your bucket and nothing else. That is the security pillar —
least privilege — from the very first role you create.

### Create a Glue database

A **Glue Data Catalog** is AWS's central metadata store: it holds the definitions of your
tables (names, columns, types, locations) without holding the data itself. A **database**
inside it is just a namespace that groups related tables.

**Console path**

1. Open **AWS Glue**, then under **Data Catalog** choose **Databases**.
2. Choose **Add database**, name it `hvt_retail_db`, and create it.

**AWS CLI**

```bash
aws glue create-database \
  --database-input '{"Name": "hvt_retail_db", "Description": "HitaVir Retail discovery catalog"}'

aws glue get-database --name hvt_retail_db --query 'Database.Name' --output text
```

Negative
: Glue and Athena allow lowercase letters, numbers, and underscores only in database and
table names. Use `hvt_retail_db`, not `hvt-retail-db`. A hyphen here will bite you two
steps later.

### Run a crawler over the raw data

A **crawler** is a Glue job that walks a data location, samples the files it finds, and
writes a proposed table definition into the catalog. Point it at `raw/` and it produces
one table per CSV, complete with a guessed **schema** (the list of columns and types).

**Console path**

1. In **AWS Glue**, choose **Crawlers**, then **Create crawler**. Name it
   `hvt-retail-raw-crawler`.
2. For the data source choose **S3** with path
   `s3://hvt-retail-datalake-<account-id>/raw/`.
3. For the IAM role, choose `hvt-retail-glue-crawler-role`.
4. For the output, choose the `hvt_retail_db` database. Leave the schedule **On demand**,
   create the crawler, then choose **Run**.

**AWS CLI**

```bash
aws glue create-crawler \
  --name hvt-retail-raw-crawler \
  --role hvt-retail-glue-crawler-role \
  --database-name hvt_retail_db \
  --targets "{\"S3Targets\": [{\"Path\": \"s3://$BUCKET/raw/\"}]}" \
  --tags project=hvt-retail,env=dev

aws glue start-crawler --name hvt-retail-raw-crawler
```

Watch its state until it returns to `READY` (it moves through `RUNNING` and `STOPPING`
first), then list the tables it created.

```bash
aws glue get-crawler --name hvt-retail-raw-crawler --query 'Crawler.State' --output text
aws glue get-tables --database-name hvt_retail_db --query 'TableList[].Name' --output text
```

You should see three tables: `orders`, `customers`, and `products`.

### Inspect and fix the inferred schema

CSV files carry no type information, so a crawler infers types by sampling. It often gets
text right but dates and some numbers wrong. Look at `orders`:

```bash
aws glue get-table --database-name hvt_retail_db --name orders \
  --query 'Table.StorageDescriptor.Columns[].{name:Name,type:Type}' \
  --output table
```

Three columns are typically wrong: `order_date` came in as `string` but should be `date`;
`amount` and `unit_price` should be `double`; `quantity` should be `int`.

Negative
: Until these types are fixed, `order_date` cannot be compared as a date and `amount`
cannot be summed as a number. You would be doing math on text. Fixing the schema is the
whole point of the discovery loop.

**Console path**

1. In the `orders` table, choose **Edit schema**.
2. Change `order_date` to **date**, `amount` and `unit_price` to **double**, and
   `quantity` to **int**. Save the table.

**AWS CLI**

Editing a column type from the CLI means resending the full table definition. Capture it,
fix the types, strip the server-managed fields, then update.

```bash
aws glue get-table --database-name hvt_retail_db --name orders \
  --query 'Table' > orders-table.json

python - <<'EOF'
import json
t = json.load(open("orders-table.json"))
keep = {k: t[k] for k in ("Name","StorageDescriptor","PartitionKeys","TableType","Parameters") if k in t}
fix = {"order_date":"date","quantity":"int","unit_price":"double","amount":"double"}
for c in keep["StorageDescriptor"]["Columns"]:
    if c["Name"] in fix:
        c["Type"] = fix[c["Name"]]
json.dump(keep, open("orders-input.json","w"), indent=2)
print("wrote orders-input.json")
EOF

aws glue update-table \
  --database-name hvt_retail_db \
  --table-input file://orders-input.json
```

Positive
: You only need to fix `orders` for the checkpoint. As an exercise, repeat the same edit
on `customers` (`signup_date` to `date`) and `products` (`unit_price` to `double`,
`in_stock` to `boolean`). The technique is identical.

### Set up Athena and explore the data

**Athena** is a serverless query engine that runs standard SQL directly over S3 data,
using the schema from the Glue catalog. It bills per data scanned and needs one thing
configured first: a place in S3 to write results.

```bash
aws s3api put-object --bucket $BUCKET --key athena-results/

aws athena create-work-group \
  --name hvt-retail-wg \
  --configuration "ResultConfiguration={OutputLocation=s3://$BUCKET/athena-results/}" \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev
```

**Console path**

1. Open **Athena**, then **Query editor**. Under **Settings**, set the query result
   location to `s3://hvt-retail-datalake-<account-id>/athena-results/`.
2. Pick `AwsDataCatalog` and the `hvt_retail_db` database, then profile the data:

```sql
SELECT count(*) AS order_rows FROM hvt_retail_db.orders;
```

```sql
SELECT
  count(DISTINCT customer_id) AS distinct_customers,
  count(DISTINCT status)      AS distinct_statuses,
  sum(CASE WHEN amount IS NULL THEN 1 ELSE 0 END) AS null_amounts,
  min(order_date)             AS first_order,
  max(order_date)             AS last_order
FROM hvt_retail_db.orders;
```

**AWS CLI**

The same query from the CLI is a start-then-fetch pattern:

```bash
QID=$(aws athena start-query-execution \
  --query-string "SELECT count(*) AS order_rows FROM hvt_retail_db.orders;" \
  --work-group hvt-retail-wg \
  --query-execution-context Database=hvt_retail_db \
  --query 'QueryExecutionId' --output text)

aws athena get-query-execution --query-execution-id $QID \
  --query 'QueryExecution.Status.State' --output text

aws athena get-query-results --query-execution-id $QID \
  --query 'ResultSet.Rows[1].Data[0].VarCharValue' --output text
```

### Checkpoint: query the cataloged data

```sql
SELECT count(*) AS order_rows FROM hvt_retail_db.orders;
```

```text
order_rows
----------
3000
```

If the row count is `3000`, the discovery loop is complete: the raw CSVs are profiled,
their schema inferred and corrected, and they are cataloged and queryable. That is the
foundation every later stage builds on.

### Troubleshooting

- **Crawler ends with `0 tables created`** — the S3 path is wrong or the role cannot read
  it. Confirm the path ends in `/raw/` and the inline read policy is attached.
- **`Schema hvt-retail-db does not exist`** — you used a hyphen. Glue and Athena require
  underscores: the database is `hvt_retail_db`.
- **Athena `No output location provided`** — set the results location to
  `s3://<bucket>/athena-results/`.
- **`update-table` rejects the file with `Unknown field`** — you sent the raw `get-table`
  output. Use the Python snippet to keep only the input fields.

## Storage and the data lake
Duration: 50:00

You have raw files and a catalog. Now turn that pile into a proper **data lake**: a single
storage layer that holds raw and refined data side by side, cheaply, and lets many tools
query the same bytes. You design it the way real teams do — in **Medallion** layers.

### The concept visual

Open the lake-house diagram. It shows the Medallion layers color-coded and the service
stack that sits on top of S3 — the same picture for this stage and the next two.

Visual: [`assets/03-lakehouse-architecture.html`](../assets/03-lakehouse-architecture.html)

### The Medallion layers

The **Medallion** design splits the lake into quality tiers, named after medals, so anyone
can tell how trustworthy a dataset is by which prefix it lives in.

- **raw** — the original source files, byte-for-byte, never edited. Your safety net.
- **bronze** — raw copied into the lake and given proper column types. Still messy, but
  inside the lake's structure.
- **silver** — cleaned, de-duplicated, conformed, and **partitioned**. What most queries read.
- **gold** — business-ready aggregates, like daily sales by region, ready to serve.

Each layer is just a **prefix** (a path segment) in the one bucket:

```text
s3://hvt-retail-datalake-<account-id>/
├── raw/        already here  — untouched source CSVs
├── bronze/     you create    — typed copies
├── silver/     you create    — cleaned + partitioned
└── gold/       you create    — aggregates to serve
```

Negative
: Never let a tool write back into `raw/`. The whole point of the raw layer is that it is
immutable, so you can always rebuild every other layer from it. That replayability is the
reliability pillar.

### Create the lake prefixes

S3 has no real folders — a prefix exists the moment an object exists under it. Drop a tiny
zero-byte marker into each layer.

**Console path**

1. Open **S3** and your bucket. Choose **Create folder**, name it `bronze`, create it.
2. Repeat for `silver` and `gold`.

**AWS CLI**

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET="hvt-retail-datalake-${ACCOUNT_ID}"

touch .keep
for layer in bronze silver gold; do
  aws s3 cp .keep "s3://${BUCKET}/${layer}/.keep"
done
rm .keep

aws s3 ls "s3://${BUCKET}/"
```

You should see `raw/`, `bronze/`, `silver/`, and `gold/`.

### Partition the silver layer

A **partition** splits a dataset into folders by the value of a column, so a query that
filters on that column skips every folder it does not need. For HitaVir Retail you
partition `orders` by `region` and `order_date`, because almost every business question
filters on one or both. The convention is `key=value` in the prefix — Athena and Glue read
these names automatically and turn them into queryable columns.

You will not write the Parquet files yet (that is the Glue ETL job, next). Create one
example partition prefix so the layout is concrete.

```bash
touch .keep
aws s3 cp .keep \
  "s3://${BUCKET}/silver/orders/region=us-east/order_date=2025-01-01/.keep"
rm .keep

aws s3 ls "s3://${BUCKET}/silver/orders/" --recursive
```

Positive
: Good partition keys are columns you filter on often and that have a moderate number of
values. `region` and `order_date` are ideal. Partitioning on `order_id`, unique per row,
would create millions of tiny folders and make things slower. Right partitioning is the
performance efficiency pillar.

### Choose a storage class and apply a lifecycle rule

A **storage class** is the tier S3 keeps an object in, trading retrieval speed and access
cost against storage price.

| Storage class | Best for | Relative storage cost |
|---|---|---|
| S3 Standard | Hot data queried often (silver, gold) | Baseline |
| S3 Standard-IA | Infrequent access, kept warm (aging raw, bronze) | Lower storage, small retrieval fee |
| S3 Glacier Instant Retrieval | Rarely read, but needed instantly | Much lower |
| S3 Glacier Deep Archive | Compliance archive, retrieval in hours | Lowest |

New objects land in **S3 Standard**. You do not move cold raw files by hand — a
**lifecycle rule** is an automatic policy that moves or deletes objects as they age. Add
one: raw data older than 30 days transitions to **S3 Standard-IA**.

**Console path**

1. In the **S3** console, open your bucket and go to the **Management** tab.
2. Choose **Create lifecycle rule**, name it `hvt-retail-raw-to-ia`.
3. Under scope, select **Limit the scope** and set the prefix to `raw/`.
4. Check **Move current versions of objects between storage classes**, choose
   **Standard-IA**, set **Days after object creation** to `30`, and save.

**AWS CLI**

Save this as `lifecycle.json`:

```json
{
  "Rules": [
    {
      "ID": "hvt-retail-raw-to-ia",
      "Filter": { "Prefix": "raw/" },
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        }
      ]
    }
  ]
}
```

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket "$BUCKET" \
  --lifecycle-configuration file://lifecycle.json
```

Positive
: S3 evaluates lifecycle rules once a day and only acts on objects past the age threshold,
so transitions are not instant. Automating cold-data tiering is cost optimization you set
once and forget.

### Parquet versus CSV

Your raw files are CSV — fine for landing data, wrong for querying at scale. From silver
on, this track stores data as **Parquet**: a columnar, compressed format built for
analytics. "Columnar" means values from the same column are stored together.

| | CSV | Parquet |
|---|---|---|
| Layout | Row by row | Column by column |
| Reads only needed columns | No | Yes |
| Compression | Poor | Strong |
| Schema and types | None, all text | Stored in the file |
| Athena scan cost | High | Low |

Because Athena bills by **bytes scanned**, a query like `SELECT amount FROM orders` reads
only the `amount` column from Parquet but the entire file from CSV.

Negative
: Keep raw as CSV — you want the source format untouched and human-readable. Convert to
Parquet on the way into silver. That conversion is the Glue ETL job next.

### Checkpoint: prove the lake is laid out

```bash
aws s3 ls "s3://${BUCKET}/"
aws s3api get-bucket-lifecycle-configuration --bucket "$BUCKET"
```

You should see `raw/`, `bronze/`, `silver/`, and `gold/`, and the `hvt-retail-raw-to-ia`
rule, `Enabled`, scoped to `raw/`, with a 30-day transition to `STANDARD_IA`. If both
checks pass, your lake is designed.

## Transform with AWS Glue ETL (PySpark)
Duration: 60:00

Raw data is faithful but messy: every column is text, duplicate orders sneak in, and some
rows are missing keys. Now you run your first **transform** job. You use **AWS Glue ETL**
(AWS's serverless extract-transform-load service) to run a **PySpark** script (Python on
Apache Spark, the distributed engine Glue runs under the hood). The job moves orders along
the Medallion path from **raw to bronze to silver**.

### The concept visual

Visual: [`assets/03-lakehouse-architecture.html`](../assets/03-lakehouse-architecture.html)

Negative
: Glue ETL is not free tier. It bills per **DPU-hour** (a DPU is one Spark worker unit)
while a job runs. Keep the job tiny, let it use the minimum workers, and never leave a job
running. The final teardown deletes it.

### Setup: upload the job script

```bash
export ACCOUNT_ID=<your-account-id>
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID

aws s3 ls s3://$BUCKET/raw/

aws s3 cp scripts/glue_bronze_to_silver.py \
  s3://$BUCKET/scripts/glue_bronze_to_silver.py
```

### Create the Glue ETL IAM role

A Glue job needs an identity of its own. You give it an **IAM role** instead of pasting
your access keys into the job. Save the trust policy as `glue-trust.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "glue.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Scope its S3 access to exactly the one bucket. Save this as `glue-s3-policy.json` (replace
`<your-account-id>`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::hvt-retail-datalake-<your-account-id>/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::hvt-retail-datalake-<your-account-id>"
    }
  ]
}
```

**Console path**

1. Open **IAM**, **Roles**, **Create role**. Trusted entity **AWS service**, then **Glue**.
2. Attach **AWSGlueServiceRole**, add an inline policy with the bucket JSON above.
3. Name the role `hvt-retail-glue-etl-role` and create it.

**AWS CLI**

```bash
aws iam create-role \
  --role-name hvt-retail-glue-etl-role \
  --assume-role-policy-document file://glue-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

aws iam attach-role-policy \
  --role-name hvt-retail-glue-etl-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole

aws iam put-role-policy \
  --role-name hvt-retail-glue-etl-role \
  --policy-name hvt-retail-glue-s3 \
  --policy-document file://glue-s3-policy.json
```

### Read the PySpark job

The script is `scripts/glue_bronze_to_silver.py`. It reads job parameters so the bucket is
passed in at run time and never hardcoded:

```python
args = getResolvedOptions(sys.argv, ["JOB_NAME", "BUCKET"])
bucket = args["BUCKET"]

sc = SparkContext()
glue_context = GlueContext(sc)
spark = glue_context.spark_session
job = Job(glue_context)
job.init(args["JOB_NAME"], args)
```

Glue can hand you data as a **DynamicFrame** (its self-describing table type that tolerates
schema drift) or you can drop to a Spark **DataFrame** (fixed schema, full SQL-style API).
For casting and dedup the DataFrame API is clearest. **Raw to bronze** reads the header CSV
and writes Parquet:

```python
raw = spark.read.option("header", "true").csv(raw_path)
raw.write.mode("overwrite").parquet(bronze_path)
```

**Bronze to silver** casts text columns to real types, removes duplicate rows
(**dedup**), and drops rows missing a key:

```python
silver = (
    spark.read.parquet(bronze_path)
    .withColumn("order_date", F.to_date("order_date"))
    .withColumn("quantity", F.col("quantity").cast("int"))
    .withColumn("unit_price", F.col("unit_price").cast("double"))
    .withColumn("amount", F.col("amount").cast("double"))
    .dropDuplicates(["order_id"])
    .dropna(subset=["order_id", "region", "order_date"])
)
```

Finally it writes **partitioned Parquet**, so a later query filtered to one region reads
only that folder:

```python
silver.write.mode("overwrite") \
    .partitionBy("region", "order_date") \
    .parquet(silver_path)
```

### Create and run the Glue ETL job

**Console path**

1. **AWS Glue**, **ETL jobs**, **Script editor**, **Create**. Choose **Author from an
   existing script** and set the path to
   `s3://hvt-retail-datalake-<account-id>/scripts/glue_bronze_to_silver.py`.
2. On **Job details**: name `hvt-retail-bronze-to-silver`, role `hvt-retail-glue-etl-role`,
   Glue version 4.0, Python 3, worker type **G.1X**, **2** workers.
3. Under **Job parameters**, add key `--BUCKET` with value
   `hvt-retail-datalake-<account-id>`. Save.
4. Open the job and choose **Run**; watch the **Runs** tab go from Running to Succeeded.

**AWS CLI**

```bash
aws glue create-job \
  --name hvt-retail-bronze-to-silver \
  --role hvt-retail-glue-etl-role \
  --glue-version "4.0" \
  --worker-type G.1X \
  --number-of-workers 2 \
  --command "Name=glueetl,ScriptLocation=s3://$BUCKET/scripts/glue_bronze_to_silver.py,PythonVersion=3" \
  --default-arguments "{\"--BUCKET\":\"$BUCKET\"}" \
  --tags project=hvt-retail,env=dev

RUN_ID=$(aws glue start-job-run \
  --job-name hvt-retail-bronze-to-silver \
  --query JobRunId --output text)

aws glue get-job-run \
  --job-name hvt-retail-bronze-to-silver \
  --run-id $RUN_ID \
  --query "JobRun.JobRunState" --output text
```

Re-run the last command until the state is `SUCCEEDED`.

Positive
: Two G.1X workers is the smallest practical Glue setup, and our dataset is tiny.
Right-sizing workers is the single biggest lever on Glue cost — the cost optimization
pillar applied to compute.

### Checkpoint: silver is partitioned Parquet

```bash
aws s3 ls s3://$BUCKET/silver/orders/
aws s3 ls s3://$BUCKET/silver/orders/region=West/ --recursive
```

You should see region partition folders, and inside one region the date partitions with
Parquet files:

```text
silver/orders/region=West/order_date=2026-01-04/part-00000-....snappy.parquet
silver/orders/region=West/order_date=2026-02-27/part-00000-....snappy.parquet
```

Seeing the `region=.../order_date=.../ ... .parquet` layout proves the transform worked:
the data is typed, deduplicated, and partitioned. That is a silver table.

### Troubleshooting

- **`AccessDenied` writing to S3** — the inline bucket policy is missing or has the wrong
  account id. Confirm `glue-s3-policy.json` names your bucket and re-run `put-role-policy`.
- **Run fails with `getResolvedOptions ... BUCKET`** — the `--BUCKET` parameter was not
  set. Confirm it is in `--default-arguments` or the console **Job parameters**.
- **`EntityNotFoundException` on the role** — IAM is eventually consistent. Wait a few
  seconds after creating the role, then run the job again.
- **Run stuck in `RUNNING` far too long** — open the run's CloudWatch logs for the Spark
  error, fix, and re-run. Do not leave a stuck job billing per DPU-hour.

## Serve and query: Athena CTAS, Redshift Serverless, and the lake house
Duration: 60:00

Your silver layer is clean, typed, and partitioned, but nobody runs a business off raw
silver tables. Now build the **gold** layer — curated, ready-to-answer tables — and serve
it two ways: query it in place with Athena, and load it into a warehouse with Redshift
Serverless. By the end the same revenue-by-region answer comes out of both engines.

### The concept visual

Visual: [`assets/03-lakehouse-architecture.html`](../assets/03-lakehouse-architecture.html)

Negative
: **Redshift Serverless bills by RPU-hour for as long as the workgroup exists**, even
idle, in 60-second minimums. An RPU (Redshift Processing Unit) is its unit of compute. Set
base capacity to the minimum (8 RPUs) and move through this stage without long breaks. The
final teardown removes it; do not leave it running overnight.

### Setup

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID

aws s3api put-object --bucket "$BUCKET" --key athena-results/

aws athena start-query-execution \
  --query-string "SELECT COUNT(*) FROM hvt_retail_db.orders" \
  --query-execution-context Database=hvt_retail_db \
  --result-configuration OutputLocation=s3://$BUCKET/athena-results/
```

Positive
: A **lake house** (one word in this track) is an architecture that puts warehouse-style
querying directly on top of data-lake storage. You get the cheap, open storage of a lake
and the fast, structured querying of a warehouse without copying everything twice.

### Build the gold layer with Athena CTAS

The **gold** layer holds curated tables shaped around real questions. HitaVir Retail's
first question: how much revenue did each region make each day, counting only orders that
became real sales (status `completed` or `shipped`)? Answer it with a **CTAS** —
**Create Table As Select** — a single statement that runs a `SELECT`, writes the result to
S3 as a new table, and registers it in the Glue catalog. The full script lives at
[`scripts/athena_gold_ctas.sql`](../scripts/athena_gold_ctas.sql).

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

1. Open **Athena**, **Query editor**. Confirm the result location is set under **Settings**.
2. Pick `hvt_retail_db`, paste the CTAS (replace `<account-id>`), and choose **Run**.

**AWS CLI**

```bash
aws athena start-query-execution \
  --query-string "CREATE TABLE hvt_retail_db.daily_region_sales WITH (format='PARQUET', parquet_compression='SNAPPY', external_location='s3://$BUCKET/gold/daily_region_sales/') AS SELECT region, order_date, COUNT(order_id) AS order_count, SUM(quantity) AS units_sold, SUM(amount) AS revenue FROM hvt_retail_db.orders WHERE status IN ('completed','shipped') GROUP BY region, order_date" \
  --query-execution-context Database=hvt_retail_db \
  --result-configuration OutputLocation=s3://$BUCKET/athena-results/

aws s3 ls s3://$BUCKET/gold/daily_region_sales/
```

Positive
: CTAS wrote Parquet, not CSV, and registered the table in Glue. Anything that reads the
Glue catalog — Athena, Redshift Spectrum, another Glue job — can now query gold without
knowing where the files physically live.

### Stand up Redshift Serverless

A **warehouse** like Amazon Redshift loads data into its own optimized storage and compute,
which makes repeated, complex, concurrent queries fast and cheap per query. **Redshift
Serverless** has no cluster to size or manage: it scales compute on demand and you pay only
for what you use. **Serverless** means you never provision or run servers yourself.

It has two pieces. A **namespace** holds your databases, users, and data; a **workgroup**
holds the compute and network settings. Create one of each.

**Console path**

1. Open **Amazon Redshift**, then **Redshift Serverless**, then **Create workgroup**. Name
   it `hvt-retail-wg`, set **Base capacity** to the minimum **8 RPUs**.
2. Create a new namespace `hvt-retail-ns` with an admin user and password; note them.
3. Accept the default VPC and subnets, then create. It takes a few minutes to become
   **Available**.

**AWS CLI**

```bash
aws redshift-serverless create-namespace \
  --namespace-name hvt-retail-ns \
  --admin-username hvtadmin \
  --admin-user-password 'ChangeMe-Str0ng!' \
  --tags key=project,value=hvt-retail key=env,value=dev

aws redshift-serverless create-workgroup \
  --workgroup-name hvt-retail-wg \
  --namespace-name hvt-retail-ns \
  --base-capacity 8 \
  --publicly-accessible \
  --tags key=project,value=hvt-retail key=env,value=dev

aws redshift-serverless get-workgroup \
  --workgroup-name hvt-retail-wg \
  --query 'workgroup.status' --output text
```

Positive
: The 60-second meter starts when the workgroup becomes available, not when you first
query. Move through the next two steps without long breaks.

### Give Redshift permission to read S3

Redshift cannot read your gold data until an **IAM role** grants it permission. Create a
role Redshift can assume, attach read access to S3 and the Glue catalog, and associate it
with the namespace.

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

aws iam attach-role-policy \
  --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

aws iam attach-role-policy \
  --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonAthenaFullAccess

export ROLE_ARN=arn:aws:iam::$ACCOUNT_ID:role/hvt-retail-redshift-role

aws redshift-serverless update-namespace \
  --namespace-name hvt-retail-ns \
  --iam-roles "$ROLE_ARN"
```

Negative
: `AmazonS3ReadOnlyAccess` is broad on purpose to keep this stage moving. In production
you would scope the role to just `s3://hvt-retail-datalake-<account-id>/gold/*` and
`silver/*`. You practice least-privilege scoping in the security stage.

### Load gold into Redshift with COPY

**COPY** is Redshift's bulk loader: it reads many files from S3 in parallel far faster than
individual `INSERT`s. The full script is
[`scripts/redshift_copy.sql`](../scripts/redshift_copy.sql).

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

In **Redshift Serverless**, open **Query editor v2**, connect to `hvt-retail-wg` as your
admin user, paste the `CREATE TABLE`, then the `COPY` (replace the bucket and role ARN),
then a `SELECT`. Run them in order.

**AWS CLI**

Drive the same statements through the **Redshift Data API**, which runs SQL over HTTPS with
no database driver or open port.

```bash
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "CREATE TABLE daily_region_sales (region VARCHAR(32), order_date DATE, order_count BIGINT, units_sold BIGINT, revenue DOUBLE PRECISION)"

aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "COPY daily_region_sales FROM 's3://$BUCKET/gold/daily_region_sales/' IAM_ROLE '$ROLE_ARN' FORMAT AS PARQUET"

aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "SELECT region, SUM(revenue) AS total_revenue FROM daily_region_sales GROUP BY region ORDER BY total_revenue DESC"
```

Each call returns a statement `Id`. Check status and read results with:

```bash
aws redshift-data describe-statement --id <statement-id> --query 'Status' --output text
aws redshift-data get-statement-result --id <statement-id>
```

### Query the lake directly with Redshift Spectrum

Sometimes you want Redshift to read S3 data *without* loading it first. **Redshift
Spectrum** does that through an **external schema** mapped to the Glue catalog.

**Console path / Query editor v2**

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

```bash
aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "CREATE EXTERNAL SCHEMA hvt_spectrum FROM DATA CATALOG DATABASE 'hvt_retail_db' IAM_ROLE '$ROLE_ARN'"

aws redshift-data execute-statement \
  --workgroup-name hvt-retail-wg \
  --database dev \
  --sql "SELECT region, SUM(revenue) AS total_revenue FROM hvt_spectrum.daily_region_sales GROUP BY region ORDER BY total_revenue DESC"
```

Positive
: This is the **Modern Data Architecture**, the **lake house**, in action. Your **lake** is
the open, cheap S3 store in Parquet; your **warehouse** is Redshift's fast store for hot,
curated tables; Spectrum is the seam between them. One set of catalog tables, two engines,
no duplicated pipelines.

### Checkpoint: the same answer from both engines

You have served gold two ways. Confirm both agree: Athena returned revenue by region from
`hvt_retail_db.daily_region_sales`, and Redshift returned the same totals from the
COPY-loaded table and again through the `hvt_spectrum` external schema. If your Athena and
Redshift results match — one row per region with a `total_revenue`, in the same order — you
have a working lake house.

### Troubleshooting

- **CTAS fails with `location ... is not empty`** — Athena will not write into a non-empty
  prefix. Delete old gold objects first, then re-run.
- **COPY: `S3ServiceException: Access Denied`** — the role lacks S3 read or is not
  associated with the namespace. Confirm `AmazonS3ReadOnlyAccess` is attached and you ran
  `update-namespace --iam-roles`.
- **Spectrum: `IAM role ... cannot assume`** — confirm `AmazonAthenaFullAccess` (which
  includes Glue read) is attached to `hvt-retail-redshift-role`.

## Orchestration and automation options
Duration: 55:00

So far you have run each piece of the pipeline by hand. That works once. It does not work
every night while you sleep. **Orchestration** coordinates several steps into one reliable,
repeatable run, with order, error handling, and retries built in. First compare the AWS
options, then build the one that fits: a **Step Functions** workflow on a daily
**EventBridge** schedule.

### The concept visual

Open the orchestration comparison and the workflow state diagram. The five color-coded
cards each carry a one-line "pick when", and the diagram shows the crawler, ETL, and CTAS
flow with its retry indicators.

Visual: [`assets/04-orchestration-options.html`](../assets/04-orchestration-options.html)

### Compare the orchestration options

| Option | What it is | Pick when | Cost at this scale |
|---|---|---|---|
| **AWS Step Functions** | Serverless state machine; chains tasks with retry, catch, branching. Service integrations call Glue and Athena with no code. | You want a few AWS services run in order with first-class error handling. **This stage.** | Basically free. |
| **AWS Glue Workflows** | Chains Glue crawlers and jobs inside Glue. | Every step is a Glue crawler or job. | No workflow charge; pay for Glue runs. |
| **Amazon MWAA** (managed Airflow) | Python DAGs, large operator ecosystem, rich backfills. | You run many DAGs and your team knows Airflow. | **Not free — bills hourly even when idle.** |
| **Amazon EventBridge schedule** | A cron or rate timer that fires a target. The trigger, not the workflow. | You need to run a pipeline on a clock. **You add this on top.** | Basically free. |
| **AWS Lambda trigger** | A short function that reacts to an event and starts work. | A run should start from an event (a new S3 file), not a clock. | Basically free. |

A mental model: **Step Functions** and **Glue Workflows** *are* the workflow;
**EventBridge** and **Lambda** *start* a workflow; **MWAA** is the heavyweight you grow
into when one workflow is no longer enough.

Negative
: Do **not** create an Amazon MWAA environment for this stage. It bills per hour the moment
it exists, whether or not a DAG runs. For three steps it is expensive overkill. We compare
it so you know when to choose it later, not so you provision it now.

Positive
: Step Functions for the workflow and EventBridge for the daily trigger is the common,
cost-aware default for AWS-native data pipelines — operational excellence built on
serverless.

### Setup

```bash
export ACCOUNT_ID=<your-account-id>
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
export AWS_REGION=us-east-1

aws glue get-crawler --name hvt-retail-raw-crawler --query 'Crawler.Name'
aws glue get-job --job-name hvt-retail-bronze-to-silver --query 'Job.Name'
aws glue get-database --name hvt_retail_db --query 'Database.Name'
```

The state machine definition lives at
[`scripts/stepfunctions_pipeline.asl.json`](../scripts/stepfunctions_pipeline.asl.json),
written in **Amazon States Language** (ASL). The schedule config is at
[`scripts/eventbridge_daily_schedule.json`](../scripts/eventbridge_daily_schedule.json).
Both contain the placeholder `ACCOUNT_ID`; substitute your real id before use.

### Create a least-privilege IAM role for the state machine

A **state machine** needs an **IAM role** to call the services in its definition. Give it
exactly the permissions it needs and nothing more. Save the trust policy as
`states-trust.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "states.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Save the permissions policy as `states-permissions.json` (replace `ACCOUNT_ID`). It allows
only the crawler, the one Glue job, the Athena CTAS, and the S3 and Glue catalog access
those need:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RunCrawler",
      "Effect": "Allow",
      "Action": ["glue:StartCrawler", "glue:GetCrawler"],
      "Resource": "arn:aws:glue:us-east-1:ACCOUNT_ID:crawler/hvt-retail-raw-crawler"
    },
    {
      "Sid": "RunGlueJob",
      "Effect": "Allow",
      "Action": ["glue:StartJobRun", "glue:GetJobRun", "glue:BatchStopJobRun"],
      "Resource": "arn:aws:glue:us-east-1:ACCOUNT_ID:job/hvt-retail-bronze-to-silver"
    },
    {
      "Sid": "AthenaCTAS",
      "Effect": "Allow",
      "Action": [
        "athena:StartQueryExecution",
        "athena:GetQueryExecution",
        "athena:StopQueryExecution"
      ],
      "Resource": "arn:aws:athena:us-east-1:ACCOUNT_ID:workgroup/hvt-retail-wg"
    },
    {
      "Sid": "GlueCatalogForAthena",
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabase", "glue:GetTable", "glue:GetTables",
        "glue:CreateTable", "glue:GetPartitions"
      ],
      "Resource": [
        "arn:aws:glue:us-east-1:ACCOUNT_ID:catalog",
        "arn:aws:glue:us-east-1:ACCOUNT_ID:database/hvt_retail_db",
        "arn:aws:glue:us-east-1:ACCOUNT_ID:table/hvt_retail_db/*"
      ]
    },
    {
      "Sid": "LakeAndResults",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": [
        "arn:aws:s3:::hvt-retail-datalake-ACCOUNT_ID",
        "arn:aws:s3:::hvt-retail-datalake-ACCOUNT_ID/*"
      ]
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name hvt-retail-states-role \
  --assume-role-policy-document file://states-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

aws iam put-role-policy \
  --role-name hvt-retail-states-role \
  --policy-name hvt-retail-states-permissions \
  --policy-document file://states-permissions.json

aws iam get-role --role-name hvt-retail-states-role --query 'Role.Arn' --output text
```

Negative
: It is tempting to attach a broad managed policy like `AdministratorAccess` to "just make
it work". Don't. A pipeline role that can only touch its own crawler, job, table, and
bucket cannot be turned into a foothold if the workflow is ever compromised.

### Create the Step Functions state machine

The definition chains **StartCrawler** (with a wait-and-poll loop so the asynchronous
crawler finishes first), **StartGlueETL** using the `glue:startJobRun.sync` **service
integration** (the `.sync` pattern blocks until the run completes), and **AthenaCTAS**
using `athena:startQueryExecution.sync`. Every task carries a **Retry** block so a
transient error waits and tries again with **backoff** (each retry waits longer), and a
**Catch** that routes any unrecoverable error to a single `PipelineFailed` state.

```json
"StartGlueETL": {
  "Type": "Task",
  "Resource": "arn:aws:states:::glue:startJobRun.sync",
  "Parameters": {
    "JobName": "hvt-retail-bronze-to-silver",
    "Arguments": { "--BUCKET.$": "$.bucket" }
  },
  "Retry": [
    {
      "ErrorEquals": ["Glue.ConcurrentRunsExceededException", "Glue.InternalServiceException"],
      "IntervalSeconds": 60,
      "MaxAttempts": 3,
      "BackoffRate": 2.0
    }
  ],
  "Catch": [
    { "ErrorEquals": ["States.ALL"], "ResultPath": "$.error", "Next": "PipelineFailed" }
  ],
  "Next": "AthenaCTAS"
}
```

Substitute your account id, then create the state machine.

**AWS CLI**

```bash
sed "s/ACCOUNT_ID/$ACCOUNT_ID/g" \
  scripts/stepfunctions_pipeline.asl.json > /tmp/pipeline.asl.json

ROLE_ARN=$(aws iam get-role --role-name hvt-retail-states-role --query 'Role.Arn' --output text)

aws stepfunctions create-state-machine \
  --name hvt-retail-pipeline \
  --definition file:///tmp/pipeline.asl.json \
  --role-arn "$ROLE_ARN" \
  --type STANDARD \
  --tags key=project,value=hvt-retail key=env,value=dev

SM_ARN=$(aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" --output text)
echo "$SM_ARN"
```

**Console path**

1. Open **Step Functions**, **State machines**, **Create state machine**.
2. Choose **Write your workflow in code**, type **Standard**, paste your substituted
   definition. The graph should show crawler, ETL, then CTAS.
3. Name it `hvt-retail-pipeline`, pick the role `hvt-retail-states-role`, add the tags, create.

### Run it once by hand

Prove the workflow runs end to end before scheduling it.

**AWS CLI**

```bash
aws stepfunctions start-execution \
  --state-machine-arn "$SM_ARN" \
  --name "manual-$(date +%Y%m%d-%H%M%S)" \
  --input "{\"bucket\": \"$BUCKET\"}"
```

**Console path**

1. Open `hvt-retail-pipeline`, choose **Start execution**.
2. Paste input `{ "bucket": "hvt-retail-datalake-<your-account-id>" }` and start it.
3. Watch the crawler, then ETL, then CTAS turn green in turn.

The run takes a few minutes, mostly the Glue job. The crawler poll loop means the graph
sits on the wait-and-check states briefly before the ETL starts; that is expected.

### Schedule it daily with EventBridge

**EventBridge Scheduler** fires a target on a clock — here once a day at 02:00 UTC. The
schedule needs its own small IAM role allowed only to start this one state machine. Save
the trust policy as `scheduler-trust.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "scheduler.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name hvt-retail-scheduler-role \
  --assume-role-policy-document file://scheduler-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

aws iam put-role-policy \
  --role-name hvt-retail-scheduler-role \
  --policy-name hvt-retail-scheduler-start \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [{
      \"Effect\": \"Allow\",
      \"Action\": \"states:StartExecution\",
      \"Resource\": \"$SM_ARN\"
    }]
  }"
```

Create the schedule. The config is at
[`scripts/eventbridge_daily_schedule.json`](../scripts/eventbridge_daily_schedule.json).

**AWS CLI (EventBridge Scheduler)**

```bash
sed "s/ACCOUNT_ID/$ACCOUNT_ID/g" \
  scripts/eventbridge_daily_schedule.json > /tmp/schedule.json

aws scheduler create-schedule --cli-input-json file:///tmp/schedule.json
```

If you prefer the classic EventBridge rules API, the equivalent is:

```bash
aws events put-rule \
  --name hvt-retail-daily-pipeline \
  --schedule-expression "cron(0 2 * * ? *)" \
  --state ENABLED

ROLE_ARN=$(aws iam get-role --role-name hvt-retail-scheduler-role --query 'Role.Arn' --output text)
aws events put-targets \
  --rule hvt-retail-daily-pipeline \
  --targets "Id=hvt-pipeline,Arn=$SM_ARN,RoleArn=$ROLE_ARN,Input={\"bucket\":\"$BUCKET\"}"
```

**Console path**

1. Open **EventBridge**, **Scheduler**, **Schedules**, **Create schedule**. Name it
   `hvt-retail-daily-pipeline`, recurring cron `cron(0 2 * * ? *)`, timezone **UTC**.
2. Target **AWS Step Functions StartExecution**, select `hvt-retail-pipeline`, input
   `{ "bucket": "hvt-retail-datalake-<your-account-id>" }`.
3. Let it use the `hvt-retail-scheduler-role`, then create.

Negative
: The cron expression `cron(0 2 * * ? *)` is in **UTC**, not your local time. Set the time
to land after your source data has arrived for the day.

### Checkpoint: prove the pipeline succeeded

You do not have to wait until 2 a.m. Confirm the manual run reached `SUCCEEDED` and that
gold refreshed.

```bash
EXEC_ARN=$(aws stepfunctions list-executions \
  --state-machine-arn "$SM_ARN" \
  --max-results 1 --query 'executions[0].executionArn' --output text)

aws stepfunctions describe-execution \
  --execution-arn "$EXEC_ARN" \
  --query '{status: status, started: startDate, stopped: stopDate}'

aws s3 ls "s3://$BUCKET/gold/daily_region_sales/"
```

You want `"status": "SUCCEEDED"` and fresh Parquet objects under `gold/`. The pipeline ran,
end to end, unattended.

### Troubleshooting

- **`AccessDeniedException` starting the crawler or job** — the role is missing a
  permission or a resource ARN does not match. Re-check `states-permissions.json` and
  re-run `put-role-policy`.
- **Execution stuck looping on the wait states** — the crawler is still `RUNNING`. A first
  crawl of a new prefix can take a couple of minutes; this is normal.
- **Athena CTAS fails with "table already exists"** — drop the gold table first, or have
  the workflow target a fresh location. For a nightly job, dropping then recreating is fine.
- **Schedule never fires** — confirm it is `ENABLED` and that `hvt-retail-scheduler-role`
  has `states:StartExecution` on this exact ARN.

## Data engineering security and monitoring
Duration: 55:00

Your lake works, but so far you have been the only user, working as a full admin. That is
fine for building, not for running. Now wrap the lake in layers of protection and put eyes
on it: give an analyst exactly the access they need, hide a sensitive column, encrypt the
data at rest, and wire up alarms and an audit trail.

### The concept visual

Open the defense-in-layers visual. It shows IAM, Lake Formation, KMS, CloudWatch, and
CloudTrail as protective rings wrapping the lake, each labeled with the one job it does.

Visual: [`assets/05-security-layers.html`](../assets/05-security-layers.html)

Negative
: One service here is not free. **KMS** charges roughly **$1 per month** per
customer-managed key, plus a tiny per-request fee. The teardown schedules the key for
deletion so the charge stops.

### Setup

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export REGION=us-east-1
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
export DB=hvt_retail_db

aws s3 ls s3://$BUCKET/
aws glue get-database --name $DB --query 'Database.Name' --output text
```

### Write and attach a least-privilege IAM policy

**Least privilege** grants an identity only the permissions it truly needs. Create a
read-only analyst user and give it a policy that allows reading the lake and running Athena
queries, but denies every write and delete.

**AWS CLI**

```bash
aws iam create-user \
  --user-name hvt-retail-analyst \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev
```

Save this as `analyst-readonly.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadLakeBucket",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": [
        "arn:aws:s3:::hvt-retail-datalake-ACCOUNT_ID",
        "arn:aws:s3:::hvt-retail-datalake-ACCOUNT_ID/*"
      ]
    },
    {
      "Sid": "RunAthenaQueries",
      "Effect": "Allow",
      "Action": [
        "athena:StartQueryExecution",
        "athena:GetQueryExecution",
        "athena:GetQueryResults",
        "athena:StopQueryExecution",
        "athena:GetWorkGroup"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ReadGlueCatalog",
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetPartitions"
      ],
      "Resource": "*"
    }
  ]
}
```

```bash
sed -i "s/ACCOUNT_ID/$ACCOUNT_ID/g" analyst-readonly.json

aws iam create-policy \
  --policy-name hvt-retail-analyst-readonly \
  --policy-document file://analyst-readonly.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

aws iam attach-user-policy \
  --user-name hvt-retail-analyst \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/hvt-retail-analyst-readonly
```

**Console path**

1. In **IAM**, **Policies**, **Create policy**, switch to **JSON**, paste the document
   (with your account id), name it `hvt-retail-analyst-readonly`.
2. In **Users**, select `hvt-retail-analyst`, **Add permissions**, **Attach policies
   directly**, attach the policy.

Positive
: Because the policy lists only read actions, you do not need an explicit `Deny` for
writes. IAM denies everything that is not explicitly allowed.

### Govern the lake with Lake Formation column permissions

**AWS Lake Formation** sits on top of the Glue catalog and controls who can read which
databases, tables, and even which columns. It can do something IAM alone cannot: a
**column-level permission**. The `customers` table has an `email` column; an analyst
studying loyalty tiers by region has no business reading it. Grant `SELECT` on `customers`
for every column except `email`.

```bash
aws lakeformation register-resource \
  --resource-arn arn:aws:s3:::$BUCKET \
  --use-service-linked-role

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::$ACCOUNT_ID:user/hvt-retail-analyst \
  --permissions SELECT \
  --resource '{
    "TableWithColumns": {
      "DatabaseName": "'"$DB"'",
      "Name": "customers",
      "ColumnWildcard": { "ExcludedColumnNames": ["email"] }
    }
  }'
```

**Console path**

1. Open **Lake Formation**; if prompted, add `hvt-admin` as a **Data lake administrator**.
2. Under **Administration**, **Data lake locations**, **Register location**, set the S3
   path to `s3://hvt-retail-datalake-<account-id>` with the
   **AWSServiceRoleForLakeFormationDataAccess** role.
3. Under **Data permissions**, **Grant**: principal `hvt-retail-analyst`, database
   `hvt_retail_db`, table `customers`, **Select**, then **Column-based access**, **Exclude
   columns**, select `email`.

Negative
: Registering a location means Lake Formation now arbitrates access to that data. If a
previously working query returns `Insufficient Lake Formation permissions`, it is because
the grant has not been made yet. Grant `SELECT` to the principals that need it.

### Encrypt the lake at rest with KMS

**Encryption at rest** scrambles bytes while they sit on disk. **Encryption in transit**
protects data moving over the network; AWS already does this for you over **TLS** on every
S3 and Athena call. **KMS** (AWS Key Management Service) creates and controls encryption
keys. Make a customer-managed key and set it as the bucket default, so S3 encrypts every
new object with it (**SSE-KMS**).

```bash
export KEY_ID=$(aws kms create-key \
  --description "hvt-retail lake data encryption key" \
  --tags TagKey=project,TagValue=hvt-retail TagKey=env,TagValue=dev \
  --query 'KeyMetadata.KeyId' --output text)

aws kms create-alias \
  --alias-name alias/hvt-retail-lake \
  --target-key-id $KEY_ID
```

Save this as `encryption.json` and apply it:

```json
{
  "Rules": [
    {
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "alias/hvt-retail-lake"
      },
      "BucketKeyEnabled": true
    }
  ]
}
```

```bash
aws s3api put-bucket-encryption \
  --bucket $BUCKET \
  --server-side-encryption-configuration file://encryption.json
```

**Console path**

1. **KMS**, **Customer managed keys**, **Create key**: symmetric, encrypt and decrypt,
   alias `hvt-retail-lake`, tags `project=hvt-retail` and `env=dev`, yourself as
   administrator and user.
2. **S3**, your bucket, **Properties**, **Default encryption**, **Edit**: choose **SSE-KMS**
   with the `hvt-retail-lake` key, enable **Bucket Key**, save.

Positive
: `BucketKeyEnabled` caches a bucket-level data key, cutting KMS calls and per-request cost
without weakening encryption — security and cost optimization at once.

### Watch the lake with CloudWatch and CloudTrail

**CloudWatch** collects metrics, stores logs, and fires **alarms** when a metric crosses a
threshold. **CloudTrail** records who called which API, when, and from where. CloudWatch
tells you *something is wrong*; CloudTrail tells you *who did what*.

Alarm on Glue job failures:

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name hvt-retail-glue-job-failures \
  --alarm-description "Fires when a HitaVir Retail Glue job reports failed tasks" \
  --namespace Glue \
  --metric-name "glue.driver.aggregate.numFailedTasks" \
  --statistic Sum \
  --period 300 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --evaluation-periods 1 \
  --treat-missing-data notBreaching \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev
```

Turn on a CloudTrail audit trail. Your first trail is free.

```bash
aws s3api create-bucket --bucket hvt-retail-cloudtrail-$ACCOUNT_ID --region $REGION

aws s3api put-bucket-policy \
  --bucket hvt-retail-cloudtrail-$ACCOUNT_ID \
  --policy file://trail-bucket-policy.json

aws cloudtrail create-trail \
  --name hvt-retail-audit \
  --s3-bucket-name hvt-retail-cloudtrail-$ACCOUNT_ID \
  --is-multi-region-trail

aws cloudtrail start-logging --name hvt-retail-audit
```

The `trail-bucket-policy.json` grants the CloudTrail service write access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSCloudTrailAclCheck",
      "Effect": "Allow",
      "Principal": { "Service": "cloudtrail.amazonaws.com" },
      "Action": "s3:GetBucketAcl",
      "Resource": "arn:aws:s3:::hvt-retail-cloudtrail-ACCOUNT_ID"
    },
    {
      "Sid": "AWSCloudTrailWrite",
      "Effect": "Allow",
      "Principal": { "Service": "cloudtrail.amazonaws.com" },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::hvt-retail-cloudtrail-ACCOUNT_ID/AWSLogs/ACCOUNT_ID/*",
      "Condition": { "StringEquals": { "s3:x-amz-acl": "bucket-owner-full-control" } }
    }
  ]
}
```

Positive
: You can alarm on cost the same way. In `us-east-1` the Billing namespace exposes
`EstimatedCharges`; an alarm at greater than 5 USD gives a real-time tripwire that
complements the monthly budget you set at the start.

### Apply the cost allocation tag scheme

A **cost allocation tag** is a tag AWS recognizes in billing so spend can be sliced by tag
value. You have tagged everything `project=hvt-retail` and `env=dev`. Activate those tags in
billing so they show up as a cost dimension.

**Console path**

1. Open **Billing and Cost Management**, **Cost allocation tags**.
2. Find `project` and `env` under **User-defined cost allocation tags**, select both,
   **Activate**.

**AWS CLI**

```bash
aws ce update-cost-allocation-tags-status \
  --cost-allocation-tags-status \
      TagKey=project,Status=Active \
      TagKey=env,Status=Active
```

Positive
: Tag activation is not retroactive — it attributes cost from activation forward. Activate
cost tags early in a real project so the history is there when you need it.

### Checkpoint

Confirm encryption at rest, then prove least privilege.

```bash
aws s3api get-bucket-encryption --bucket $BUCKET \
  --query 'ServerSideEncryptionConfiguration.Rules[0].ApplyServerSideEncryptionByDefault'
```

You should see `"SSEAlgorithm": "aws:kms"`. Now create an access key for the analyst and a
throwaway CLI profile, then test:

```bash
aws iam create-access-key --user-name hvt-retail-analyst
aws configure --profile analyst

aws s3 ls s3://$BUCKET/ --profile analyst

echo "should fail" > deny-test.txt
aws s3 cp deny-test.txt s3://$BUCKET/deny-test.txt --profile analyst
# Expected: An error occurred (AccessDenied) ...
```

If the read returns the lake contents and the write returns `AccessDenied`, your
least-privilege policy is correct. In Athena, the same analyst can `SELECT` from `customers`
but the `email` column is hidden by Lake Formation. That asymmetry is the whole point.

### Troubleshooting

- **`Insufficient Lake Formation permissions` on `customers`** — registering the bucket put
  Lake Formation in charge. Grant the analyst the column-filtered `SELECT`; the IAM policy
  alone is not enough once a location is registered.
- **`KMS.DisabledException` or `AccessDenied` after encryption** — the principal also needs
  `kms:Decrypt` on the key. Add the analyst as a key user.
- **CloudTrail `InsufficientS3BucketPolicyException`** — re-apply `trail-bucket-policy.json`
  with your real account id in both ARNs.
- **The Glue alarm sits in `INSUFFICIENT_DATA`** — that metric only appears after a Glue
  job runs at least once. `--treat-missing-data notBreaching` keeps no runs from looking
  like a failure.

## Assessment and capstone
Duration: 60:00

You have built a whole pipeline. This stage proves it stuck. First, review questions across
every prior stage, each with its answer. Second, a hands-on capstone: one end-to-end run,
raw to gold, validated by a real gold query. Third, a self-grading rubric.

### The concept visual

Open the assessment scorecard. One segment per topic, color-coded by concept hue, with a
readiness ring that fills as you tick off what you have mastered.

Visual: [`assets/06-assessment-scorecard.html`](../assets/06-assessment-scorecard.html)

### Review: role, functions, lifecycle

**Q1.** In one sentence, what is a data engineer responsible for delivering?

Positive
: **Answer:** Trustworthy data, delivered on time, to the analysts, dashboards, and models
downstream. Everything else exists to serve that single outcome.

**Q2 (multiple choice).** Which is *not* one of the six key functions?
A. Ingest from various sources  B. Train the production ML model  C. Catalog and document
datasets  D. Ensure quality, security, and compliance

Positive
: **Answer: B.** Training the model is the data scientist's job, downstream of you. The six
functions are build infrastructure, ingest, prepare, catalog, automate, and govern.

**Q3.** A stakeholder says "it would be nice if the dashboard were live." Build a streaming
pipeline?

Positive
: **Answer:** No, not on that basis. "Nice to have" is not a latency requirement. Batch is
simpler and cheaper and is the right default for reporting. Reach for streaming only when a
real requirement needs freshness batch cannot meet.

### Review: discovery, crawlers, the catalog

**Q4 (multiple choice).** What does a Glue **crawler** produce?
A. A cleaned copy of the data  B. Table definitions in the Glue Data Catalog  C. A loaded
Redshift table  D. A CloudWatch dashboard

Positive
: **Answer: B.** A crawler infers schema and partitions and registers table metadata. It
does not move the data; the rows stay in S3.

**Q5.** Athena queried the raw CSVs without you loading them anywhere. What makes that
possible?

Positive
: **Answer:** Athena reads directly from S3 using the schema in the Glue catalog. This is
schema-on-read: describe once, query in place.

### Review: storage, Medallion, Parquet, partitioning

**Q6.** Put the Medallion layers in order with the one-line job of each.

Positive
: **Answer:** raw, bronze, silver, gold. Raw is the untouched original. Bronze is that data
ingested with typed columns. Silver is cleaned, conformed, partitioned. Gold is
business-ready aggregates.

**Q7 (multiple choice).** Why convert silver and gold to **Parquet** instead of CSV?
A. Human-readable  B. Columnar and compressed, so queries scan less and cost less  C. No
schema needed  D. Athena cannot read CSV

Positive
: **Answer: B.** Parquet stores by column and compresses, so a query reads only the columns
it needs. Athena bills by bytes scanned.

**Q8.** Your gold table is partitioned by `region`. A query filters `WHERE region='West'`.
What does partitioning save you?

Positive
: **Answer:** Partition pruning. Athena reads only the `region=West` files and skips the
rest. Less data scanned means faster, cheaper.

### Review: transform with Glue ETL

**Q9 (multiple choice).** Your Glue job reads `raw/` and writes `silver/`. What should it do?
A. Copy bytes unchanged  B. Drop bad rows, fix types, standardize values, write partitioned
Parquet  C. Delete raw  D. Load Redshift

Positive
: **Answer: B.** Silver is where cleaning happens. Raw is never deleted; loading Redshift is
a later serve step.

**Q10.** Glue ETL is "serverless." What does that buy you versus Spark on your own EC2?

Positive
: **Answer:** No cluster to provision, patch, or keep running. Glue spins up workers, runs
your script, tears them down, and you pay only for the time used.

### Review: serve, Redshift, the lake house

**Q11 (multiple choice).** What does an Athena **CTAS** do here?
A. Defines an empty table  B. Runs a SELECT over silver and writes a new gold table in S3
C. Crawls to infer schema  D. Copies data into Redshift

Positive
: **Answer: B.** CTAS runs the SELECT, materializes Parquet in S3, and registers the table
in the catalog in one statement.

**Q12.** When push gold into **Redshift** rather than querying S3 with Athena?

Positive
: **Answer:** When you need consistent low-latency, high-concurrency serving. Athena is
ideal for ad-hoc and pipeline queries; Redshift is tuned for fast, repeated, concurrent
reads. Together they are the lake house.

### Review: orchestration

**Q13 (multiple choice).** Run a crawler, then a Glue job, then an Athena query in order
with retries and branching. Which fits best?
A. A cron job on EC2  B. AWS Step Functions  C. S3 event notifications alone  D. A Lambda
that sleeps between steps

Positive
: **Answer: B.** Step Functions sequences tasks, waits, retries, and branches as managed
infrastructure.

**Q14.** Division of labor between **Step Functions** and **EventBridge**?

Positive
: **Answer:** Step Functions defines *what* runs and in what order. EventBridge decides
*when* it runs. EventBridge starts the state machine; Step Functions takes it from there.

### Review: security and monitoring

**Q15 (multiple choice).** Your Glue job reads `raw/` and writes `silver/` in one bucket.
Which follows least privilege?
A. `AdministratorAccess`  B. Only `s3:GetObject` on `raw/*` and `s3:PutObject` on `silver/*`
for that one bucket  C. Make the bucket public  D. Use root credentials

Positive
: **Answer: B.** Least privilege means exactly what the job needs and nothing more, scoped
to the one bucket.

**Q16.** Name one thing **Lake Formation**, **KMS**, and **CloudTrail** each contribute.

Positive
: **Answer:** Lake Formation gives table- and column-level access control. KMS encrypts data
at rest with keys you control. CloudTrail records who called which API and when. Together:
access control, encryption, audit.

### Capstone: run the pipeline end to end

Confirm the pieces still exist, then trigger one full run.

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
aws s3 ls s3://hvt-retail-datalake-$ACCOUNT_ID/
aws glue get-database --name hvt_retail_db --query 'Database.Name' --output text
aws glue get-crawler  --name hvt-retail-raw-crawler --query 'Crawler.Name' --output text
aws glue get-job      --job-name hvt-retail-bronze-to-silver --query 'Job.Name' --output text
```

**Plan A: trigger the Step Functions workflow**

**Console path**

1. Open **Step Functions**, the `hvt-retail-pipeline` state machine, **Start execution**,
   input `{ "bucket": "hvt-retail-datalake-<your-account-id>" }`, start it.
2. Watch each state turn green: crawl raw, run the raw-to-silver ETL, then the gold CTAS.

**AWS CLI**

```bash
SM_ARN=$(aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" \
  --output text)

EXEC_ARN=$(aws stepfunctions start-execution \
  --state-machine-arn "$SM_ARN" \
  --name "capstone-$(date +%Y%m%d-%H%M%S)" \
  --input "{\"bucket\": \"hvt-retail-datalake-$ACCOUNT_ID\"}" \
  --query executionArn --output text)

aws stepfunctions describe-execution --execution-arn "$EXEC_ARN" --query 'status' --output text
```

Re-run the last command until it reads `SUCCEEDED`.

**Plan B: run the three stages by hand** (only if you do not have the state machine)

```bash
aws glue start-crawler --name hvt-retail-raw-crawler
aws glue get-crawler --name hvt-retail-raw-crawler --query 'Crawler.State' --output text

RUN_ID=$(aws glue start-job-run \
  --job-name hvt-retail-bronze-to-silver \
  --query JobRunId --output text)
aws glue get-job-run \
  --job-name hvt-retail-bronze-to-silver --run-id "$RUN_ID" \
  --query 'JobRun.JobRunState' --output text
```

Wait for the crawler to reach `READY` and the job to reach `SUCCEEDED`, then build gold with
the CTAS below.

Negative
: Run the stages in order and let each finish before starting the next. Kicking off the ETL
before the crawler reaches `READY`, or the gold query before the ETL reaches `SUCCEEDED`,
reads stale or missing data. The Step Functions workflow enforces this ordering for you.

### Capstone: build and validate the gold query

If Plan A ran the CTAS, `hvt_retail_db.daily_region_sales` already exists; skip to the
validation query. If you used Plan B, build it first.

```sql
CREATE TABLE hvt_retail_db.daily_region_sales
WITH (
  format = 'PARQUET',
  parquet_compression = 'SNAPPY',
  external_location = 's3://hvt-retail-datalake-<your-account-id>/gold/daily_region_sales/'
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

Now the validation query: total revenue by region.

```sql
SELECT region, SUM(revenue) AS total_revenue, SUM(order_count) AS order_count
FROM hvt_retail_db.daily_region_sales
GROUP BY region
ORDER BY total_revenue DESC;
```

**AWS CLI**

```bash
QID=$(aws athena start-query-execution \
  --work-group hvt-retail-wg \
  --query-string "SELECT region, SUM(revenue) AS total_revenue, SUM(order_count) AS order_count FROM hvt_retail_db.daily_region_sales GROUP BY region ORDER BY total_revenue DESC;" \
  --query-execution-context Database=hvt_retail_db \
  --query QueryExecutionId --output text)

aws athena get-query-results --query-execution-id "$QID" \
  --query 'ResultSet.Rows[].Data[].VarCharValue' --output text
```

### Checkpoint: confirm the gold result and score yourself

The dataset seed is fixed, so everyone gets exactly these numbers:

```text
region    total_revenue    order_count
Central       300566.18            458
East          267418.05            408
North         214381.36            331
South         259365.20            393
West          267214.20            404
```

Total recognized revenue (orders that `completed` or `shipped`) across all regions is
**1,308,944.99**. Confirm it with one line:

```sql
SELECT SUM(revenue) AS grand_total FROM hvt_retail_db.daily_region_sales;
```

Positive
: If the per-region totals match and the grand total reads `1308944.99`, your pipeline is
correct end to end. You ingested, cataloged, transformed, and served real data, and the
output reconciles to the source.

Negative
: If your totals are higher, your silver or CTAS step probably kept every order instead of
filtering to `completed` and `shipped`. If they are lower or a region is missing, the
crawler or ETL did not process all the raw data. Re-run the offending stage and re-validate.

### Score your readiness

Tick every box you can honestly check off without the codelab open, then add up.

| Topic | I can do this | Pts |
|---|---|---|
| Foundation | Set up an account safely with an IAM admin user, budget, and billing alarm | 1 |
| Role | Name the six functions and place a task in one; explain batch vs streaming | 1 |
| Catalog | Crawl raw data and query it in place with Athena via the Glue catalog | 1 |
| Storage | Explain the Medallion layers and why Parquet and partitioning save cost | 1 |
| Transform | Read what a Glue PySpark raw-to-silver job does and why it is serverless | 1 |
| Serve | Build a gold table with CTAS and say when to use Redshift over Athena | 1 |
| Automate | Trigger the Step Functions workflow and explain its split with EventBridge | 1 |
| Protect | Write a least-privilege S3 policy and name what Lake Formation, KMS, CloudTrail do | 1 |
| Capstone | Ran the pipeline end to end and the gold query reconciled to 1,308,944.99 | 2 |

| Score | Readiness |
|---|---|
| 9 to 10 | **Pipeline-ready.** You can build and reason about the whole lake house. |
| 7 to 8 | **Nearly there.** Revisit the one or two topics you could not check, then re-score. |
| 4 to 6 | **Foundations solid, gaps remain.** Redo the transform or serve steps hands-on. |
| 0 to 3 | **Walk it again.** Restart from the first unchecked topic and run each step yourself. |

## Conclusion and teardown
Duration: 30:00

You made it. You became the first data engineer at HitaVir Retail and built a real, working
lake house: one dataset moving through a Medallion lake on S3, cataloged, transformed,
served, scheduled, secured, and watched. This final stage recaps what you built, gives you a
one-page architecture summary and where to go next, then runs the complete teardown.

### Recap, mapped to the six functions

| Stage | What you built | Key function |
|---|---|---|
| Workbench | AWS account, `hvt-admin` IAM user, billing alarm, budget, CLI | Build infrastructure |
| Role + quick win | The lake bucket and `raw/` landing zone, three CSVs uploaded | Build infrastructure, Ingest |
| Discovery | Glue crawler, `hvt_retail_db` catalog database, Athena queries | Catalog |
| Storage | The S3 Medallion layout and a lifecycle rule | Build infrastructure |
| Transform | Glue ETL job raw to silver, with its own IAM role | Prepare |
| Serve | Athena gold table via CTAS, Redshift Serverless to serve | Prepare, Serve |
| Orchestration | Step Functions state machine, EventBridge schedule | Automate |
| Security | Least-privilege IAM, Lake Formation, KMS, CloudWatch, CloudTrail | Govern and secure |

Read that table top to bottom and you have described the job: a data engineer **builds the
infrastructure**, **ingests** from sources, **prepares** raw data into analytics-ready form,
**catalogs** it, **automates** the whole thing, and **governs** quality, access, and audit
end to end. You did all six, on real services, against one dataset.

### The architecture, on one page

Open the pipeline recap alongside this section to see the same picture drawn out.

Visual: [`assets/07-pipeline-recap.html`](../assets/07-pipeline-recap.html)

**The lake is the spine.** Everything reads from and writes to one S3 bucket,
`hvt-retail-datalake-<your-account-id>`, organized as a Medallion lake: **raw** (untouched
source), **bronze** (columnar copies), **silver** (cleaned, typed, partitioned), **gold**
(business aggregates).

**Catalog sits over the lake.** A Glue crawler infers schemas into the catalog database
`hvt_retail_db`, so every engine reads table definitions from there and the lake is
self-describing.

**Compute moves the data forward.** A Glue ETL job in PySpark reads bronze and writes
silver. Athena CTAS turns silver into gold tables in the lake. Redshift Serverless serves
gold to warehouse-style queries.

**Automation wraps the flow.** A Step Functions state machine chains crawler, ETL, and gold
build in order; an EventBridge schedule triggers it on a cadence.

**Governance wraps the flow.** Least-privilege IAM, Lake Formation table- and column-level
grants, a KMS key for encryption at rest, and CloudWatch plus CloudTrail for alarms and
audit.

Read it as one sentence: **raw to bronze to silver to gold, cataloged by Glue, transformed
by Glue ETL and Athena, served by Athena and Redshift, automated by Step Functions and
EventBridge, and secured by IAM, Lake Formation, and KMS while CloudWatch and CloudTrail
watch.** That is a modern AWS lake house, and you built it.

### Where to go next

- **AWS Certified Data Engineer - Associate** (exam DEA-C01) validates exactly what you
  practiced: ingestion, transformation, the Glue and Athena ecosystem, orchestration, and
  data security. Use the official exam guide to find your gaps.
- **Amazon EMR** — when Glue jobs outgrow Glue, EMR gives you full, tunable Spark clusters
  for large-scale processing.
- **Amazon Kinesis** — this whole track was batch. Kinesis is the entry point to
  **streaming**: process events the moment they arrive.
- **Lake Formation governance, dbt, and Apache Iceberg** — go deeper on fine-grained
  permissions, modern table formats with ACID transactions and time travel, and
  software-engineering discipline for SQL transforms.

Positive
: Pick one and build something small with it on top of what you have — right after you
finish the teardown below.

### Complete teardown: delete everything

This is the big one. You will now delete **every resource created across the entire track**,
in an order that respects dependencies, so nothing is left billing.

Negative
: Run these steps **in order**. A workgroup must go before its namespace, roles must be
detached before they delete, and the S3 bucket must be emptied and deleted **last** because
almost everything else points at it.

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
echo "Tearing down for account $ACCOUNT_ID, bucket $BUCKET"
```

**Step 1 — Delete the EventBridge schedule** (kill the trigger first):

```bash
aws scheduler delete-schedule --name hvt-retail-daily-pipeline

# If you used the classic rules API instead:
aws events remove-targets --rule hvt-retail-daily-pipeline --ids hvt-pipeline
aws events delete-rule --name hvt-retail-daily-pipeline
```

**Step 2 — Delete the Step Functions state machine:**

```bash
SM_ARN=$(aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" \
  --output text)

aws stepfunctions delete-state-machine --state-machine-arn "$SM_ARN"
```

**Step 3 — Delete Redshift Serverless: workgroup, then namespace.** Order matters.

```bash
aws redshift-serverless delete-workgroup --workgroup-name hvt-retail-wg

# Wait until the workgroup is fully gone, then:
aws redshift-serverless delete-namespace --namespace-name hvt-retail-ns
```

Positive
: If the namespace delete returns a conflict, the workgroup is still tearing down. Wait a
minute and re-run. Deleting these stops the only resources in the track that bill
meaningfully while idle.

**Step 4 — Delete the Glue job, crawler, and database:**

```bash
aws glue delete-job --job-name hvt-retail-bronze-to-silver
aws glue delete-crawler --name hvt-retail-raw-crawler
aws glue delete-database --name hvt_retail_db
```

**Step 5 — Delete the Athena workgroup:**

```bash
aws athena delete-work-group --work-group hvt-retail-wg --recursive-delete-option
```

**Step 6 — Delete the CloudWatch alarm and CloudTrail trail:**

```bash
aws cloudwatch delete-alarms --alarm-names hvt-retail-glue-job-failures

aws cloudtrail stop-logging --name hvt-retail-audit
aws cloudtrail delete-trail --name hvt-retail-audit
```

**Step 7 — Revoke Lake Formation grants:**

```bash
aws lakeformation revoke-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::$ACCOUNT_ID:user/hvt-retail-analyst \
  --permissions SELECT \
  --resource '{ "TableWithColumns": { "DatabaseName": "hvt_retail_db", "Name": "customers", "ColumnWildcard": { "ExcludedColumnNames": ["email"] } } }'
```

Negative
: If a revoke errors because the grant was already removed when you deleted the Glue
database in step 4, that is fine — there is nothing left to revoke. Move on.

**Step 8 — Delete the IAM policies and roles.** Detach and delete inline policies first.

```bash
# Analyst user and its policy (security stage).
aws iam detach-user-policy --user-name hvt-retail-analyst \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/hvt-retail-analyst-readonly
aws iam delete-policy --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/hvt-retail-analyst-readonly
aws iam delete-user --user-name hvt-retail-analyst

# Glue ETL role.
aws iam delete-role-policy --role-name hvt-retail-glue-etl-role --policy-name hvt-retail-glue-s3
aws iam detach-role-policy --role-name hvt-retail-glue-etl-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole
aws iam delete-role --role-name hvt-retail-glue-etl-role

# Glue crawler role.
aws iam delete-role-policy --role-name hvt-retail-glue-crawler-role --policy-name hvt-retail-glue-s3-read
aws iam detach-role-policy --role-name hvt-retail-glue-crawler-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole
aws iam delete-role --role-name hvt-retail-glue-crawler-role

# Redshift serving role.
aws iam detach-role-policy --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
aws iam detach-role-policy --role-name hvt-retail-redshift-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonAthenaFullAccess
aws iam delete-role --role-name hvt-retail-redshift-role

# Step Functions states role.
aws iam delete-role-policy --role-name hvt-retail-states-role --policy-name hvt-retail-states-permissions
aws iam delete-role --role-name hvt-retail-states-role

# EventBridge scheduler role.
aws iam delete-role-policy --role-name hvt-retail-scheduler-role --policy-name hvt-retail-scheduler-start
aws iam delete-role --role-name hvt-retail-scheduler-role
```

**Step 9 — Schedule the KMS key for deletion** (minimum 7-day window):

```bash
KEY_ID=$(aws kms describe-key --key-id alias/hvt-retail-lake \
  --query 'KeyMetadata.KeyId' --output text)

aws kms schedule-key-deletion --key-id "$KEY_ID" --pending-window-in-days 7
aws kms delete-alias --alias-name alias/hvt-retail-lake
```

**Step 10 — Empty and delete the S3 buckets, last:**

```bash
# Empty all data, then remove the lake bucket.
aws s3 rm "s3://$BUCKET" --recursive
aws s3 rb "s3://$BUCKET"

# The CloudTrail log bucket from the security stage.
aws s3 rm "s3://hvt-retail-cloudtrail-$ACCOUNT_ID" --recursive
aws s3 rb "s3://hvt-retail-cloudtrail-$ACCOUNT_ID"
```

Negative
: Deleting the bucket is irreversible and takes your raw data with it. That is the intended
end state. If you want to keep a copy, download `raw/` first, or regenerate it any time with
`python dataset/generate_data.py`.

### Verify the account is empty

```bash
aws s3 ls | grep hvt-retail || echo "No hvt-retail buckets — good."
aws glue get-databases --query "DatabaseList[?Name=='hvt_retail_db']"
aws redshift-serverless list-workgroups --query "workgroups[?workgroupName=='hvt-retail-wg']"
aws redshift-serverless list-namespaces --query "namespaces[?namespaceName=='hvt-retail-ns']"
aws stepfunctions list-state-machines --query "stateMachines[?name=='hvt-retail-pipeline']"
aws scheduler list-schedules --query "Schedules[?Name=='hvt-retail-daily-pipeline']"
aws cloudwatch describe-alarms --alarm-names hvt-retail-glue-job-failures --query "MetricAlarms"
aws cloudtrail describe-trails --query "trailList[?Name=='hvt-retail-audit']"
```

Empty results everywhere mean the pipeline is fully gone.

Positive
: Open **Billing and Cost Management**, then **Cost Explorer**, over the next day or two.
With everything deleted, your `project=hvt-retail` cost should trend to zero. The KMS key
shows a small charge until its seven-day deletion window closes, then it too goes to zero.

Negative
: One thing you should **keep**: the `hvt-admin` IAM user, the budget, and the billing alarm
from the workbench stage. They cost nothing and protect your account. Only the data pipeline
resources come down.

Thank you for working through **Data Engineering on AWS**. You built a complete, automated,
governed AWS lake house for HitaVir Retail — raw to bronze to silver to gold, cataloged,
transformed, served, scheduled, and secured — and then tore it all down cleanly so it costs
you nothing. Pick one where-to-go-next direction and keep building.

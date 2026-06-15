authors: HitaVirTech
summary: Profile unknown raw data, crawl it with AWS Glue to infer a schema, fix the wrong guessed types in the Glue Data Catalog, then explore the data with Amazon Athena.
id: hvt-de-aws-02-data-discovery
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# How to perform data discovery on AWS

## Overview
Duration: 4:00

In the last lab you uploaded the HitaVir Retail raw CSVs to
`s3://hvt-retail-datalake-<account-id>/raw/`. Right now those files are just bytes
in a bucket. Nothing in AWS knows they are tables, what columns they hold, or what
types those columns are. **Data discovery** is the work of answering exactly that:
profiling unknown data, inferring its structure, and recording the result so every
later service can read it without guessing.

In this lab you become the detective. You will point a crawler at the raw prefix,
let it propose a schema, correct the types it guesses wrong, and then ask the data
real questions with SQL.

### What you'll learn

- What data discovery is and why it comes before any transformation.
- How to create a **Glue Data Catalog** database and run a **crawler** over S3.
- How to read an inferred **schema** and fix types that were guessed wrong.
- How to profile data (row counts, distinct values, nulls) and explore it with
  **Athena**.

### Prerequisites

- Codelab 00 finished: AWS account, `hvt-admin` IAM user, and a configured AWS CLI.
- Codelab 01 finished: the raw CSVs already live under
  `s3://hvt-retail-datalake-<account-id>/raw/`.
- Your account id handy. Get it any time with `aws sts get-caller-identity`.

### Services used

AWS Glue (crawler and Data Catalog), Amazon Athena, Amazon S3, IAM.

### Cost and time

- **Cost:** a few cents at most. A Glue crawler bills per second only while it runs,
  and over this tiny dataset it finishes in under a minute. Athena bills per data
  scanned and rounds up to 10 MB per query, so a few dozen queries cost well under
  a penny. The data is kept tiny on purpose.
- **Time:** about 50 minutes.

### The concept visual

Open the discovery loop before you start. It shows the three stages you are about
to run as a cycle, plus the before-and-after of the schema you will correct.

Visual: [`assets/02-data-discovery-loop.html`](../assets/02-data-discovery-loop.html)

## Setup: confirm the raw data is there
Duration: 4:00

Before discovering anything, prove the raw data exists and set two shell variables
you will reuse in every command below.

**AWS CLI**

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET=hvt-retail-datalake-$ACCOUNT_ID
echo "Using bucket: $BUCKET"
```

List the raw prefix and confirm three CSV files are present.

```bash
aws s3 ls s3://$BUCKET/raw/
```

You should see `customers.csv`, `orders.csv`, and `products.csv`.

**Console path**

1. Open **S3** in the console.
2. Choose your `hvt-retail-datalake-<account-id>` bucket, then the **raw/** prefix.
3. Confirm the three CSV objects are listed.

Negative
: If the `raw/` prefix is empty or missing, go back and finish codelab 01. The
crawler has nothing to discover until the files are uploaded.

The crawler needs an IAM role it can assume to read your bucket and write to the
catalog. Create a least-privilege role for Glue now.

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
```

Attach the managed Glue service policy, then add a tight inline policy that grants
read access only to your bucket.

```bash
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
: The managed `AWSGlueServiceRole` covers the catalog actions Glue needs. The inline
policy is the least-privilege part: the crawler can read your bucket and nothing
else. This is the habit you will formalize in codelab 05.

## Create a Glue database
Duration: 4:00

A **Glue Data Catalog** is AWS's central metadata store: a place that holds the
definitions of your tables (their names, columns, types, and where the data lives)
without holding the data itself. Inside it, a **database** is just a namespace that
groups related tables. Create one for HitaVir Retail.

**Console path**

1. Open **AWS Glue** in the console.
2. In the left menu under **Data Catalog**, choose **Databases**.
3. Choose **Add database**, name it `hvt_retail_db`, and create it.

**AWS CLI**

```bash
aws glue create-database \
  --database-input '{"Name": "hvt_retail_db", "Description": "HitaVir Retail discovery catalog"}'
```

Confirm it exists.

```bash
aws glue get-database --name hvt_retail_db --query 'Database.Name' --output text
```

Negative
: Glue database and table names allow lowercase letters, numbers, and underscores
only. Use `hvt_retail_db`, not `hvt-retail-db`. Athena follows the same rule, so a
hyphen here will bite you two steps later.

## Run a crawler over the raw data
Duration: 8:00

A **crawler** is a Glue job that walks a data location, samples the files it finds,
and writes a proposed table definition into the catalog for you. Point it at your
`raw/` prefix and it will produce one table per CSV file, complete with a guessed
**schema** (the list of columns and their data types).

**Console path**

1. In **AWS Glue**, choose **Crawlers**, then **Create crawler**.
2. Name it `hvt-retail-raw-crawler`.
3. For the data source, choose **S3** and set the path to
   `s3://hvt-retail-datalake-<account-id>/raw/`.
4. For the IAM role, choose the existing `hvt-retail-glue-crawler-role`.
5. For the output, choose the `hvt_retail_db` database.
6. Leave the schedule **On demand**, create the crawler, then choose **Run**.

**AWS CLI**

```bash
aws glue create-crawler \
  --name hvt-retail-raw-crawler \
  --role hvt-retail-glue-crawler-role \
  --database-name hvt_retail_db \
  --targets "{\"S3Targets\": [{\"Path\": \"s3://$BUCKET/raw/\"}]}" \
  --tags project=hvt-retail,env=dev
```

Start it.

```bash
aws glue start-crawler --name hvt-retail-raw-crawler
```

Watch its state until it returns to `READY`. The crawler moves through `RUNNING`
and `STOPPING` first.

```bash
aws glue get-crawler --name hvt-retail-raw-crawler \
  --query 'Crawler.State' --output text
```

When it reads `READY` again, list the tables it created.

```bash
aws glue get-tables --database-name hvt_retail_db \
  --query 'TableList[].Name' --output text
```

You should see three tables: `orders`, `customers`, and `products`.

Positive
: The crawler names each table after the file it found, so `orders.csv` becomes the
`orders` table. Because all three CSVs sit directly under `raw/`, you get three
clean tables in one run.

## Inspect the inferred schema
Duration: 6:00

The crawler guessed a schema for each table. CSV files carry no type information, so
a crawler infers types by sampling values. It often gets text columns right and
gets dates and some numbers wrong. Look at what it decided for `orders`.

**Console path**

1. In **AWS Glue**, open **Tables**, then the `orders` table.
2. Read the **Schema** section: each column with its inferred data type.

**AWS CLI**

```bash
aws glue get-table --database-name hvt_retail_db --name orders \
  --query 'Table.StorageDescriptor.Columns[].{name:Name,type:Type}' \
  --output table
```

Look closely at three columns:

- `order_date` was likely inferred as `string`. It should be `date`.
- `amount` and `unit_price` may be `string` when they should be `double`.
- `quantity` may be `string` when it should be `int`.

Negative
: Until these types are fixed, `order_date` cannot be compared as a date and
`amount` cannot be summed as a number. You would be doing math on text. Fixing the
schema is the whole point of the discovery loop.

## Fix the wrong types
Duration: 8:00

Correct the guessed types so the columns mean what they are. You will set
`order_date` to `date`, the money columns to `double`, and `quantity` to `int`.

**Console path**

1. In the `orders` table, choose **Edit schema**.
2. Change `order_date` to **date**, `amount` and `unit_price` to **double**, and
   `quantity` to **int**.
3. Save the table.

**AWS CLI**

Editing a column type from the CLI means resending the full table definition with
the corrected columns. First capture the current definition.

```bash
aws glue get-table --database-name hvt_retail_db --name orders \
  --query 'Table' > orders-table.json
```

Open `orders-table.json` and, inside `StorageDescriptor.Columns`, set the types so
the relevant entries read like this. Leave the genuinely text columns
(`order_id`, `customer_id`, `product_id`, `status`, `region`) as `string`.

```json
{ "Name": "order_date", "Type": "date" },
{ "Name": "quantity",   "Type": "int" },
{ "Name": "unit_price", "Type": "double" },
{ "Name": "amount",     "Type": "double" }
```

Glue's `update-table` accepts only the input shape, not the read-back metadata, so
strip the server-managed fields before sending it. This one-liner keeps just the
fields `update-table` expects.

```bash
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

Confirm the new types stuck.

```bash
aws glue get-table --database-name hvt_retail_db --name orders \
  --query 'Table.StorageDescriptor.Columns[?Name==`order_date` || Name==`amount` || Name==`quantity`].{name:Name,type:Type}' \
  --output table
```

Positive
: You only need to fix `orders` for the checkpoint. As an exercise, repeat the same
edit on `customers` (`signup_date` to `date`) and `products` (`unit_price` to
`double`, `in_stock` to `boolean`). The technique is identical.

## Set up Athena and explore the data
Duration: 8:00

**Athena** is a serverless query engine that runs standard SQL directly over data
in S3, using the schema from the Glue Data Catalog. It bills per data scanned and
needs one thing configured first: a place in S3 to write its results.

Create the results location and tell Athena to use it.

```bash
aws s3api put-object --bucket $BUCKET --key athena-results/

aws athena create-work-group \
  --name hvt-retail-wg \
  --configuration "ResultConfiguration={OutputLocation=s3://$BUCKET/athena-results/}" \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev
```

**Console path**

1. Open **Athena**, then **Query editor**.
2. Choose **Settings**, then **Manage**, and set the query result location to
   `s3://hvt-retail-datalake-<account-id>/athena-results/`.
3. In the editor, pick `AwsDataCatalog` and the `hvt_retail_db` database.

Now profile the data with SQL. Start with a row count.

```sql
SELECT count(*) AS order_rows FROM hvt_retail_db.orders;
```

Profile distinct values and nulls in one pass. Because `order_date` is now a real
date and `amount` a real number, these aggregates work.

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

The same query from the CLI is a start-then-fetch pattern. Kick off the query and
capture its id.

```bash
QID=$(aws athena start-query-execution \
  --query-string "SELECT count(*) AS order_rows FROM hvt_retail_db.orders;" \
  --work-group hvt-retail-wg \
  --query-execution-context Database=hvt_retail_db \
  --query 'QueryExecutionId' --output text)
echo "Query id: $QID"
```

Wait for it to reach `SUCCEEDED`.

```bash
aws athena get-query-execution --query-execution-id $QID \
  --query 'QueryExecution.Status.State' --output text
```

Fetch the result.

```bash
aws athena get-query-results --query-execution-id $QID \
  --query 'ResultSet.Rows[1].Data[0].VarCharValue' --output text
```

That value should be `3000`.

## Checkpoint: query the cataloged data
Duration: 4:00

You have discovered the data end to end. Prove it with two results from Athena.

First, the row count. Run this in the query editor (or via the CLI pattern above).

```sql
SELECT count(*) AS order_rows FROM hvt_retail_db.orders;
```

Expected result:

```text
order_rows
----------
3000
```

Second, a sample that shows the corrected types in action: dates filter as dates
and amounts sort as numbers.

```sql
SELECT order_id, order_date, quantity, unit_price, amount, status
FROM hvt_retail_db.orders
WHERE order_date >= DATE '2026-01-01'
ORDER BY amount DESC
LIMIT 5;
```

You should get five rows back, ordered by the largest `amount` first, with real
dates in `order_date`.

Positive
: If the row count is `3000` and the sample returns sorted rows with real dates, the
discovery loop is complete: the raw CSVs are profiled, their schema is inferred and
corrected, and they are cataloged and queryable. That is the foundation every later
lesson builds on.

## Troubleshooting
Duration: 4:00

- **Crawler ends with `0 tables created` or stays in `STOPPING`** — the S3 target
  path is wrong or the role cannot read it. Confirm the path ends in `/raw/` and
  that `hvt-retail-glue-crawler-role` has the inline read policy for your bucket.

- **`SYNTAX_ERROR: line 1:1: Schema hvt-retail-db does not exist`** — you used a
  hyphenated name somewhere. Glue and Athena require underscores. The database is
  `hvt_retail_db`.

- **Athena: `No output location provided`** — the workgroup or query settings have
  no results location. Set it to `s3://<bucket>/athena-results/`, either in the
  workgroup config or under the Athena **Settings** tab.

- **`sum(amount)` fails with a type error or returns text** — the type fix did not
  take. Re-run `get-table` and confirm `amount` reads `double`, not `string`. The
  edit must be saved before Athena sees it.

- **`update-table` rejects the file with `Unknown field`** — you sent the raw
  `get-table` output, which includes server-managed fields like `CreateTime` and
  `DatabaseName`. Use the Python snippet above to keep only the input fields.

## Cleanup
Duration: 3:00

Delete everything this lab created. None of it costs much idle, but cleaning up is
the discipline that keeps your bill at zero. Leave the raw data in S3 — later
lessons use it.

**Console path**

1. **AWS Glue**, **Crawlers**: delete `hvt-retail-raw-crawler`.
2. **AWS Glue**, **Databases**: delete `hvt_retail_db` (this removes its tables too).
3. **Athena**, **Workgroups**: delete `hvt-retail-wg`.
4. **S3**: empty the `athena-results/` prefix in your bucket.
5. **IAM**, **Roles**: delete `hvt-retail-glue-crawler-role`.

**AWS CLI**

```bash
aws glue delete-crawler --name hvt-retail-raw-crawler

aws glue delete-database --name hvt_retail_db

aws athena delete-work-group --work-group hvt-retail-wg --recursive-delete-option

aws s3 rm s3://$BUCKET/athena-results/ --recursive

aws iam delete-role-policy \
  --role-name hvt-retail-glue-crawler-role \
  --policy-name hvt-retail-glue-s3-read
aws iam detach-role-policy \
  --role-name hvt-retail-glue-crawler-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole
aws iam delete-role --role-name hvt-retail-glue-crawler-role
```

Negative
: Deleting the Glue database removes the table definitions only, not the underlying
S3 data. Your raw CSVs stay safe under `raw/`, which is exactly what you want before
moving on.

## What's next
Duration: 1:00

You can now take an unknown pile of files and turn it into a cataloged, queryable
dataset. That skill is the entry point to everything else: you cannot transform or
serve data you have not first described.

Next you will design the storage layer properly, turning these raw CSVs into the
bronze layer of the Medallion lake.

Continue to **Codelab 03-1: Storage and the data lake**.

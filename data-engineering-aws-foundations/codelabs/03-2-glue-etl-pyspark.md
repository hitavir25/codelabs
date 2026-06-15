authors: HitaVirTech
summary: Build an AWS Glue ETL job in PySpark that moves orders from raw to bronze to silver, casting types, dropping duplicates, and writing partitioned Parquet.
id: hvt-de-aws-03-2-glue-etl
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Transform with AWS Glue ETL (PySpark)

## Overview
Duration: 5:00

In the last lab you built the data lake and landed the HitaVir Retail raw CSVs in
S3. Raw data is faithful but messy: every column is text, duplicate orders sneak in,
and some rows are missing keys. In this lab you turn that raw data into something
trustworthy by running your first **transform** job.

You will use **AWS Glue ETL** (AWS's serverless extract-transform-load service) to
run a **PySpark** script (Python on Apache Spark, the distributed engine Glue runs
under the hood). The job moves orders along the Medallion path from **raw to bronze
to silver**: it lands a clean Parquet copy in bronze, then produces a silver table
that is correctly typed, deduplicated, and written as **partitioned Parquet**.

### What you'll build

- An **IAM role** the Glue job assumes (so the job has its own least-privilege
  identity and you never hardcode credentials).
- An **AWS Glue ETL job** that runs your PySpark script.
- A **bronze** orders dataset: the raw rows, stored as Parquet.
- A **silver** orders dataset: typed, deduplicated, and partitioned by region and
  order date, at `s3://hvt-retail-datalake-<account-id>/silver/orders/`.

### What you'll learn

- What AWS Glue ETL and PySpark are, and how a Glue job is structured.
- The difference between a Glue **DynamicFrame** and a Spark **DataFrame**.
- How to cast types, **dedup** (remove duplicate rows), and drop null keys.
- Why **partitioned Parquet** makes later queries cheap and fast.

### Prerequisites

- Codelab 03-1 finished: the bucket `hvt-retail-datalake-<account-id>` exists with
  raw CSVs under `raw/` and empty `bronze/`, `silver/`, and `gold/` prefixes.
- The AWS CLI configured for `us-east-1` (codelab 00).
- Basic comfort reading Python.

### Services used

AWS Glue (ETL jobs), IAM, Amazon S3.

### Cost and time

- **Cost:** a few cents. Glue ETL bills per **DPU-hour** (a DPU is one Spark
  worker unit). This job uses the smallest worker setup and finishes in a couple of
  minutes, so expect well under $0.10. The mandatory cleanup deletes the job.
- **Time:** about 60 minutes.

### The concept visual

Open the lake house architecture diagram. It shows how raw, bronze, silver, and
gold sit on S3 and where Glue fits as the transform engine between them.

Visual: [`assets/03-lakehouse-architecture.html`](../assets/03-lakehouse-architecture.html)

Negative
: Glue ETL is not free tier. It bills per DPU-hour while a job runs. Keep the job
tiny, let it use the minimum workers, never leave a job running, and complete the
cleanup step at the end of this lab.

## Setup
Duration: 4:00

Set two shell variables so every command below is copy-paste ready. Replace the
account id with your own.

```bash
export ACCOUNT_ID=<your-account-id>
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
```

Confirm the raw orders file is in place from the last lab:

```bash
aws s3 ls s3://$BUCKET/raw/
```

You should see `orders.csv` (and the customers and products CSVs). If `raw/` is
empty, go back and finish codelab 03-1 before continuing.

Upload the PySpark job script to the lake so Glue can find it. The script lives at
`scripts/glue_bronze_to_silver.py` in this repo:

```bash
aws s3 cp scripts/glue_bronze_to_silver.py \
  s3://$BUCKET/scripts/glue_bronze_to_silver.py
```

## Create the Glue IAM role
Duration: 10:00

A Glue job needs an identity of its own. You give it an **IAM role** — a set of
permissions a service can assume — instead of pasting your access keys into the job.
This role lets Glue run and lets it read and write only this one bucket.

### Trust policy

A role needs a **trust policy** that says who may assume it. Here, only the Glue
service may. Save this as `glue-trust.json`:

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

### Least-privilege bucket policy

The job only touches the data lake bucket, so scope its S3 access to exactly that
bucket. Save this as `glue-s3-policy.json` (replace `<your-account-id>`):

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

1. Open **IAM**, choose **Roles**, then **Create role**.
2. For trusted entity choose **AWS service**, then pick **Glue**.
3. Attach the AWS managed policy **AWSGlueServiceRole**.
4. Add an inline policy with the bucket JSON above so the job can read and write
   your lake.
5. Name the role `hvt-retail-glue-etl-role` and create it.

**AWS CLI**

Create the role from the trust policy, attach the managed Glue policy, and add the
scoped bucket policy inline:

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

Positive
: The managed `AWSGlueServiceRole` grants the Glue runtime what it needs to operate;
your inline policy grants data access to one bucket only. Together that is
least privilege: the job can do its work and nothing more.

## Read the PySpark job
Duration: 8:00

Before you run anything, understand what the script does. It is the file you already
uploaded, `scripts/glue_bronze_to_silver.py`.

```python
args = getResolvedOptions(sys.argv, ["JOB_NAME", "BUCKET"])
bucket = args["BUCKET"]

sc = SparkContext()
glue_context = GlueContext(sc)
spark = glue_context.spark_session
job = Job(glue_context)
job.init(args["JOB_NAME"], args)
```

`getResolvedOptions` reads job parameters, so the bucket name is passed in at run
time as `--BUCKET` and never hardcoded. `GlueContext` wraps a Spark session and adds
Glue features.

Glue can hand you data as a **DynamicFrame** (its own self-describing table type that
tolerates messy, schema-drifting data) or you can drop down to a Spark **DataFrame**
(the standard Spark table with a fixed schema and the full SQL-style API). For
straightforward casting and dedup the DataFrame API is the clearest, so this job
reads with Spark directly.

```python
raw = spark.read.option("header", "true").csv(raw_path)
raw.write.mode("overwrite").parquet(bronze_path)
```

That is **raw to bronze**: read the header CSV and write it back as **Parquet**, a
columnar file format that is compressed and fast to scan. Bronze keeps the data
as-is, just in a better format.

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

That is **bronze to silver**. Every CSV column arrived as text, so the job casts
`order_date` to a real date, `quantity` to an integer, and `unit_price` and `amount`
to doubles. **Dedup** means removing duplicate rows: `dropDuplicates(["order_id"])`
keeps one row per order. `dropna` drops rows missing a key you cannot work without.

```python
silver.write.mode("overwrite") \
    .partitionBy("region", "order_date") \
    .parquet(silver_path)
```

Finally it writes **partitioned Parquet**. A **partition** stores rows in folders by
column value, here `region=.../order_date=.../`. Later, a query filtered to one
region reads only that folder instead of the whole table, which is faster and
cheaper.

## Create the Glue ETL job
Duration: 8:00

Now register a Glue job that points at your uploaded script and runs as the role you
created.

**Console path**

1. Open **AWS Glue**, choose **ETL jobs**, then **Script editor**, then **Create**.
2. Choose **Author from an existing script** and set the script path to
   `s3://hvt-retail-datalake-<account-id>/scripts/glue_bronze_to_silver.py`.
3. On the **Job details** tab, set:
   - **Name**: `hvt-retail-bronze-to-silver`
   - **IAM Role**: `hvt-retail-glue-etl-role`
   - **Glue version**: 4.0, **Language**: Python 3
   - **Worker type**: G.1X, **Requested number of workers**: 2
4. Under **Job parameters**, add the key `--BUCKET` with value
   `hvt-retail-datalake-<account-id>`.
5. Save the job.

**AWS CLI**

Create the job in one call. The `--default-arguments` map passes the `--BUCKET`
parameter your script reads, and `NumberOfWorkers` is kept at the minimum so the job
stays cheap:

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
```

Positive
: Two G.1X workers is the smallest practical Glue setup. Our dataset is tiny, so it
finishes in a couple of minutes. Right-sizing workers is the single biggest lever on
Glue cost.

## Run the job
Duration: 7:00

**Console path**

1. Open the `hvt-retail-bronze-to-silver` job and choose **Run**.
2. Watch the **Runs** tab. The run moves from **Running** to **Succeeded**.

**AWS CLI**

Start the run and capture its id:

```bash
RUN_ID=$(aws glue start-job-run \
  --job-name hvt-retail-bronze-to-silver \
  --query JobRunId --output text)
echo "Started run: $RUN_ID"
```

Poll until the run finishes. Re-run this until the state is `SUCCEEDED`:

```bash
aws glue get-job-run \
  --job-name hvt-retail-bronze-to-silver \
  --run-id $RUN_ID \
  --query "JobRun.JobRunState" --output text
```

While it runs, the state is `RUNNING`; a clean finish is `SUCCEEDED`. If you see
`FAILED`, check the Troubleshooting section below.

## Checkpoint: silver is partitioned Parquet
Duration: 5:00

Confirm the job wrote a typed, partitioned silver table. List the silver prefix:

```bash
aws s3 ls s3://$BUCKET/silver/orders/
```

You should see partition folders keyed by region, like:

```text
                           PRE region=East/
                           PRE region=North/
                           PRE region=South/
                           PRE region=West/
```

Drill into one region to see the date partitions and the Parquet files:

```bash
aws s3 ls s3://$BUCKET/silver/orders/region=West/ --recursive
```

```text
silver/orders/region=West/order_date=2026-01-04/part-00000-....snappy.parquet
silver/orders/region=West/order_date=2026-02-27/part-00000-....snappy.parquet
```

Seeing the `region=.../order_date=.../ ... .parquet` layout proves the transform
worked: the data is typed, deduplicated, and partitioned. That is a silver table.

Positive
: This folder-per-value layout is what later labs query with Athena. Because the
partitions are real folders, a query for one region scans one folder, not the lake.

## Troubleshooting
Duration: 4:00

- **`AccessDenied` writing to S3** — the inline bucket policy is missing or has the
  wrong account id. Confirm `glue-s3-policy.json` names your bucket and re-run
  `aws iam put-role-policy`.
- **Run fails with `getResolvedOptions ... BUCKET`** — the `--BUCKET` job parameter
  was not set. In the console, add it under **Job parameters**; with the CLI, confirm
  it is in `--default-arguments` as `--BUCKET`.
- **`EntityNotFoundException` on the role** — IAM is eventually consistent. Wait a
  few seconds after creating the role, then create or run the job again.
- **Output looks wrong or duplicated on a re-run** — the job uses `overwrite` mode,
  so a clean re-run replaces bronze and silver. If a previous run failed mid-write,
  just run the job again.
- **Run stuck in `RUNNING` far too long** — for this tiny dataset that is unusual.
  Open the run's CloudWatch logs from the Glue console to see the Spark error, then
  fix and re-run. Do not leave a stuck job running; it bills per DPU-hour.

## Cleanup
Duration: 4:00

Glue jobs bill while they run, so tear everything down now. This is mandatory.

Delete the Glue job:

```bash
aws glue delete-job --job-name hvt-retail-bronze-to-silver
```

Delete the job's IAM role. You must detach managed policies and remove inline
policies before the role can be deleted:

```bash
aws iam delete-role-policy \
  --role-name hvt-retail-glue-etl-role \
  --policy-name hvt-retail-glue-s3

aws iam detach-role-policy \
  --role-name hvt-retail-glue-etl-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole

aws iam delete-role --role-name hvt-retail-glue-etl-role
```

Remove the bronze and silver objects this lab produced. Leave `raw/` and the bucket
in place — later labs reuse them:

```bash
aws s3 rm s3://$BUCKET/bronze/ --recursive
aws s3 rm s3://$BUCKET/silver/ --recursive
```

Positive
: Keep the bucket, the raw data, and the uploaded script. The next lab rebuilds
silver and gold, so you can re-run this job any time.

## What's next
Duration: 1:00

You ran a real Spark transform on AWS Glue and produced a clean, typed, partitioned
silver table from raw CSV. That is the heart of the data engineering workflow.

Next you will point query engines at this lake. You will catalog the silver table
and run SQL over it with **Amazon Athena**, then load curated data into **Amazon
Redshift** for warehouse-style analytics.

Continue to **Codelab 03-3: Serve and query (Athena, Redshift)**.

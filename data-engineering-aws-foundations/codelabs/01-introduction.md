authors: HitaVirTech
summary: Learn what a data engineer actually does, the six key functions and the pipeline lifecycle, then get a quick win by landing the HitaVir Retail raw CSVs in your S3 data lake.
id: hvt-de-aws-01-introduction
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# What a data engineer does

## Overview
Duration: 4:00

You set up a safe AWS workbench in the last codelab. Now you will learn what the
job is actually about, and then do the very first piece of it for **HitaVir Retail**:
land the raw data in your lake.

A **data engineer** builds and runs the systems that move data from where it is
created to where it can be used. Analysts, dashboards, and machine-learning models
all sit downstream of you. When the data is late, wrong, or missing, they are stuck.
Your job is to make sure clean, well-described, trustworthy data shows up reliably.

This codelab is mostly conceptual, but it ends with a concrete action. You will
create the data lake bucket and upload the three raw CSVs that the rest of the track
builds on.

### What you'll build

- A mental model of the **six key functions** of data engineering.
- A clear picture of the **data pipeline lifecycle** and where AWS fits.
- The `raw/` landing zone of your data lake on Amazon S3, holding the three
  HitaVir Retail source files.

### What you'll learn

- The role and responsibilities of a data engineer.
- The six key functions: build infrastructure, ingest, prepare, catalog, automate,
  and govern.
- The pipeline lifecycle, and the difference between **batch** and **streaming**.
- Which AWS services cover each function.

### Prerequisites

- Codelab 00 finished: an AWS account, the `hvt-admin` IAM user, and a configured
  AWS CLI in `us-east-1`.
- The dataset from [`dataset/`](../dataset/) on your machine (`orders.csv`,
  `customers.csv`, `products.csv`).

### Services used

Amazon S3, AWS CLI. (The rest of the track adds Glue, Athena, Redshift, and more;
here you only need storage.)

### Cost and time

- **Cost:** $0. Three small CSVs in S3 are far inside the free tier.
- **Time:** about 40 minutes.

### The concept visual

Open the key-functions visual. It lays out the six functions as a pipeline: four
flow left to right (build infrastructure, ingest, prepare, catalog), while automate
rides above and govern rides below, wrapping every stage.

Visual: [`assets/01-key-functions.html`](../assets/01-key-functions.html)

## The role and responsibilities
Duration: 4:00

Think of a data engineer as the plumber and the city planner of data, at the same
time. You lay the pipes, and you decide where they should go.

On any given week you might be doing all of this:

- Standing up storage and compute so data has somewhere to live and be processed.
- Pulling data out of source systems: databases, files, APIs, event streams.
- Cleaning and reshaping that data so it is actually usable for analytics.
- Writing down what each dataset means so others can find and trust it.
- Wiring these steps into pipelines that run on their own, on schedule.
- Guarding quality, security, and compliance the whole way through.

The output you are responsible for is **trustworthy data, delivered on time**. The
six key functions below are just that responsibility broken into pieces you can act
on.

Positive
: A useful sanity check for any task: which of the six functions am I doing right
now? If you cannot place it, you are probably about to solve the wrong problem.

## The six key functions
Duration: 6:00

These six functions show up in every data platform, on any cloud. The whole track
is organized around them, and the visual for this lesson maps each one to a color
you will see again and again.

### 1. Build and manage data infrastructure

Set up the storage and compute the platform runs on, and keep it healthy. On AWS
this is your S3 data lake, the IAM roles that grant access, and the engines that
process data. You do this part today by creating the lake bucket.

### 2. Ingest from various sources

Bring data in from wherever it lives: relational databases, flat files, third-party
APIs, and real-time event streams. The shape and cadence of each source differs, so
ingestion is rarely one-size-fits-all. Today the source is three CSV files.

### 3. Prepare data for analytics

Raw data is messy: missing values, wrong types, duplicates, inconsistent formats.
Preparing it means cleaning, validating, and reshaping it into something analysts
and models can use directly. This is where the **raw to bronze to silver to gold**
journey happens across the track.

### 4. Catalog and document datasets

A dataset nobody can find or understand is worthless. Cataloging records what each
table and column means, where it came from, and how fresh it is, so others can
discover and trust it. On AWS the AWS Glue Data Catalog does this job.

### 5. Automate workflows

Doing the above by hand once is a demo. Doing it reliably every day is engineering.
Automation turns the steps into pipelines that run on a schedule or in response to
an event, with no human clicking buttons.

### 6. Ensure quality, security, and compliance

Validate that the data is correct, control who can see and change it, encrypt it,
and keep an audit trail. This is not a final step bolted on at the end. It wraps
every other function, which is exactly why the visual draws it as a rail running
under the whole pipeline.

Negative
: A common beginner mistake is treating security and quality as a later chore. By
then the bad data has already reached a dashboard and the wrong people have already
had access. Build both in from the first object you store.

## The data pipeline lifecycle
Duration: 4:00

A **pipeline** is the path a piece of data travels from its source to a place where
it creates value. The lifecycle is the ordered set of stages along that path:

1. **Ingest** — pull data from the source into your platform.
2. **Store** — land it durably, usually in a data lake, before you touch it.
3. **Transform** — clean, validate, and reshape it into analytics-ready form.
4. **Catalog** — register the result so it is discoverable and described.
5. **Serve** — expose it to queries, dashboards, and models.

Two cross-cutting concerns run alongside every stage: **orchestration** decides the
order and timing of the work, and **governance** keeps it secure, correct, and
compliant. That is why the visual shows automate and govern as rails wrapping the
flow rather than as single boxes in the line.

You are starting at the very front of this lifecycle. Landing the raw CSVs in S3 is
the *store* stage for already-ingested data. The rest of the track walks the data
forward one stage at a time.

## Batch versus streaming
Duration: 3:00

Data moves through a pipeline in one of two cadences, and choosing correctly shapes
every tool decision after it.

**Batch** processing handles data in chunks on a schedule: every night, every hour,
every time a file lands. It is simpler, cheaper, and the right default for reporting
and analytics where minutes or hours of delay are fine. HitaVir Retail's daily order
export is a batch source, and this whole track is a batch pipeline.

**Streaming** processing handles each event the moment it arrives, continuously, so
results are near real-time. It is more complex and costs more to run. You reach for
it when freshness genuinely matters: live fraud detection, real-time inventory, an
operational dashboard that cannot be an hour stale.

Positive
: Start with batch unless a real requirement forces streaming. "It would be nice if
it were live" is not a requirement. Latency you actually need is.

## Where AWS fits
Duration: 3:00

Each function maps to managed AWS services, so you assemble a platform instead of
running servers yourself.

| Function | AWS service | Role |
|---|---|---|
| Build infrastructure | Amazon S3, IAM | Durable storage for the lake; identity and access. |
| Ingest | AWS Glue, AWS DMS, Amazon Kinesis | Batch loads, database replication, and streaming. |
| Prepare | AWS Glue ETL | Clean and reshape data at scale with PySpark. |
| Catalog | AWS Glue Data Catalog | Central record of tables, schemas, and locations. |
| Automate | AWS Glue Workflows, Step Functions, EventBridge | Schedule and chain the steps into one pipeline. |
| Govern | IAM, Lake Formation, KMS, CloudTrail | Least-privilege access, encryption, and audit. |

Notice that **S3 is the foundation** every other service reads from and writes to.
That is why your first real action is to create the S3 lake and land the raw data.

## Setup: confirm your workbench
Duration: 2:00

Before the quick win, confirm the CLI from codelab 00 still works and capture your
account id.

```bash
aws sts get-caller-identity --query Account --output text
```

This prints just your 12-digit account id. Copy it; the bucket name needs it.

Positive
: To save typing, store it in a shell variable for this session. On macOS or Linux:
`ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)`. The
commands below show the literal `<your-account-id>` so the path is clear either way.

## Quick win: create the lake and land the raw data
Duration: 6:00

Now the first piece of real data engineering work: build the infrastructure
(function 1) and ingest the source files (function 2).

You will create the bucket `hvt-retail-datalake-<your-account-id>` and upload the
three CSVs to the `raw/` prefix. A **prefix** is S3's version of a folder; the key
`raw/orders.csv` simply groups objects under `raw/`. The `raw/` zone holds data
exactly as it arrived, untouched, so you always have an original to reprocess.

### Create the bucket

**Console path**

1. Open the **S3** console.
2. Choose **Create bucket**.
3. Set **Bucket name** to `hvt-retail-datalake-<your-account-id>` and **Region** to
   **US East (N. Virginia) us-east-1**.
4. Leave **Block all public access** on. Choose **Create bucket**.
5. Open the new bucket, go to **Properties**, find **Tags**, and add
   `project=hvt-retail` and `env=dev`.

**AWS CLI**

```bash
aws s3 mb s3://hvt-retail-datalake-<your-account-id> --region us-east-1
```

Tag the bucket so cleanup and cost tracking work later:

```bash
aws s3api put-bucket-tagging \
  --bucket hvt-retail-datalake-<your-account-id> \
  --tagging 'TagSet=[{Key=project,Value=hvt-retail},{Key=env,Value=dev}]'
```

Negative
: `us-east-1` is the one region where `aws s3 mb` does not take a location
constraint. Pass only `--region us-east-1`. In any other region you would also need
`--create-bucket-configuration LocationConstraint=<region>`, which is a common
first-bucket error.

### Upload the raw CSVs

From the folder that contains the dataset (adjust the path if yours differs):

**Console path**

1. In your bucket, choose **Create folder**, name it `raw`, and save.
2. Open the `raw/` folder, choose **Upload**, then **Add files**.
3. Select `orders.csv`, `customers.csv`, and `products.csv`, then **Upload**.

**AWS CLI**

```bash
aws s3 cp dataset/orders.csv    s3://hvt-retail-datalake-<your-account-id>/raw/orders.csv
aws s3 cp dataset/customers.csv s3://hvt-retail-datalake-<your-account-id>/raw/customers.csv
aws s3 cp dataset/products.csv  s3://hvt-retail-datalake-<your-account-id>/raw/products.csv
```

Positive
: You only need the three CSVs in this track. The `orders.json` in `dataset/` is an
alternate format for later experiments; leave it out of `raw/` for now.

## Checkpoint: see the raw zone
Duration: 2:00

List the `raw/` prefix and confirm all three files are there.

```bash
aws s3 ls s3://hvt-retail-datalake-<your-account-id>/raw/
```

You should see exactly three objects:

```text
2026-06-16 10:00:00      20902 customers.csv
2026-06-16 10:00:00     192475 orders.csv
2026-06-16 10:00:00       2151 products.csv
```

If the three CSVs are listed, the raw zone of your data lake is live and the next
codelabs have data to work with. That is your validation for this lesson: a concrete,
observable result you can see in the lake.

## Troubleshooting
Duration: 3:00

- **`BucketAlreadyExists` or `BucketAlreadyOwnedByYou`** — S3 bucket names are
  global across all AWS accounts. If you skipped the `-<your-account-id>` suffix,
  someone else may hold the plain name. Add your account id and retry.
- **`IllegalLocationConstraintException` on create** — you are in `us-east-1` but
  passed a `LocationConstraint`, or you are in another region and omitted one. In
  `us-east-1`, use only `--region us-east-1`.
- **`The user ... is not authorized to perform: s3:CreateBucket`** — your CLI is
  using a profile without admin rights. Run `aws sts get-caller-identity` and
  confirm the ARN is the `hvt-admin` user from codelab 00.
- **`The specified bucket does not exist` on upload** — a typo between the create
  and copy commands. The bucket name must match exactly, account id included.
- **Nothing lists at `raw/`** — the upload ran from the wrong directory, so the
  local path did not resolve. `cd` into the folder holding `dataset/` and rerun the
  `cp` commands, or use absolute paths.

## Cleanup
Duration: 2:00

You will **reuse this bucket in every later codelab**, so keep the bucket. You only
need to remove the objects you uploaded if you want to stop here.

To empty just the `raw/` prefix and leave the bucket in place:

**Console path**

1. Open the bucket, select the `raw/` folder.
2. Choose **Delete**, type the confirmation phrase, and delete. The bucket itself
   stays.

**AWS CLI**

```bash
aws s3 rm s3://hvt-retail-datalake-<your-account-id>/raw/ --recursive
```

Negative
: Do not run `aws s3 rb` (remove bucket) here. The next codelab expects this bucket
to exist. Only remove the bucket at the very end of the track, in codelab 07.

If you are continuing straight to the next lesson, do nothing. Leave the three CSVs
in `raw/`; the next codelab reads them.

## What's next
Duration: 1:00

You now know what the job is, the six functions it breaks into, and the lifecycle
data travels. You also did functions one and two for real: you built the lake and
ingested the raw HitaVir Retail data.

Next you will catalog and explore that raw data: crawl it with AWS Glue to infer its
schema, register it in the Data Catalog, and run your first queries with Amazon
Athena.

Continue to **Codelab 02: Data discovery on AWS**.

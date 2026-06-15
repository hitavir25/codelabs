author: HitaVirTech
summary: Review every prior lesson with answered questions, then run the whole pipeline end to end as a capstone and grade your own readiness with a rubric.
id: hvt-de-aws-06-assessment
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Assessment and capstone

## Overview
Duration: 5:00

You have built a whole pipeline across this track. You landed raw data, crawled
and cataloged it, designed a Medallion lake, transformed raw into silver with
Glue, served gold with Athena and Redshift, orchestrated the run with Step
Functions and EventBridge, and secured and monitored the lot. This lesson proves
it stuck.

It has three parts. First, a set of **review questions** that walk back through
every lesson, each with the answer and a short explanation right below it.
Second, a **hands-on capstone**: one end-to-end run of the pipeline, raw to
bronze to silver to gold, validated by a real gold-layer query. Third, a
**self-grading rubric** so you can score your own readiness and see exactly which
lesson, if any, to revisit.

Nothing here introduces a new service. The point is to wire the pieces you
already built into one confident pass and measure where you stand.

### What you'll build

- A graded self-assessment across lessons 00 through 05.
- One validated end-to-end pipeline run that produces a gold revenue-by-region
  table.
- A readiness score you compute from the rubric, plus a per-lesson checklist.

### What you'll learn

- Whether you can explain the why behind each service, not just click through it.
- How the orchestration, transform, catalog, and serve steps chain into one run.
- How to validate a pipeline by its output, the way you would in production.

### Prerequisites

- Codelabs 00 through 05 finished: the `hvt-retail-datalake-<your-account-id>`
  bucket with `raw/` populated, a Glue database and crawler, a Glue ETL job that
  writes silver, an Athena workgroup, and the Step Functions state machine and
  EventBridge schedule from codelab 04.
- The AWS CLI configured in `us-east-1` as your `hvt-admin` user.

### Services used

AWS Step Functions, AWS Glue (crawler and ETL), Amazon Athena, Amazon S3, Amazon
EventBridge. No new resources are created.

### Cost and time

- **Cost:** a few cents at most. One Glue job run, one crawler run, and a handful
  of Athena scans over a tiny dataset stay inside or near the free tier.
- **Time:** about 60 minutes.

### The concept visual

Open the assessment scorecard. It is an achievement dashboard: one segment per
lesson, color-coded by that lesson's concept hue, with a readiness ring that
fills as you tick off what you have mastered.

Visual: [`assets/06-assessment-scorecard.html`](../assets/06-assessment-scorecard.html)

## Setup: confirm the pipeline is in place
Duration: 4:00

Before the capstone you will run the pipeline, so confirm the pieces from earlier
labs still exist. Capture your account id first.

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "$ACCOUNT_ID"
```

Confirm the lake bucket and its layers:

```bash
aws s3 ls s3://hvt-retail-datalake-$ACCOUNT_ID/
```

You should see at least the `raw/` prefix. The `bronze/`, `silver/`, and `gold/`
prefixes appear once the capstone run completes.

Confirm the Glue database, the crawler, and the ETL job from codelabs 02 and 03:

```bash
aws glue get-database --name hvt_retail_db --query 'Database.Name' --output text
aws glue get-crawler  --name hvt-retail-raw-crawler --query 'Crawler.Name' --output text
aws glue get-job      --job-name hvt-retail-bronze-to-silver --query 'Job.Name' --output text
```

Confirm the orchestration from codelab 04:

```bash
aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" \
  --output text
```

Positive
: If any name above differs in your account, substitute your own. The track's
naming convention is `hvt-retail-...`, so list with
`aws glue list-crawlers` or `aws stepfunctions list-state-machines` and match by
sight. The capstone only needs the names to be correct, not memorized.

Negative
: If the state machine does not exist, you can still complete the capstone by
running the three stages by hand in the "Plan B" section below. But finish
codelab 04 first if you can — orchestration is on the assessment.

## Review: role, functions, and the lifecycle
Duration: 5:00

These cover codelab 01. Answer each in your head before you read the answer.

**Q1 (short answer).** In one sentence, what is a data engineer responsible for
delivering?

Positive
: **Answer:** Trustworthy data, delivered on time, to the analysts, dashboards,
and models downstream. Everything else — storage, pipelines, catalogs — exists to
serve that single outcome.

**Q2 (multiple choice).** Which is *not* one of the six key functions of data
engineering?

A. Ingest from various sources
B. Train the production machine-learning model
C. Catalog and document datasets
D. Ensure quality, security, and compliance

Positive
: **Answer: B.** Training the model is the data scientist's job; it sits
downstream of you. The six functions are build infrastructure, ingest, prepare,
catalog, automate, and govern. You serve the model team clean data, you do not
build their model.

**Q3 (short answer).** A stakeholder says "it would be nice if the dashboard were
live." Should you build a streaming pipeline? Why or why not?

Positive
: **Answer:** No, not on that basis. "Nice to have" is not a latency requirement.
Batch is simpler and cheaper and is the right default for reporting. Reach for
streaming only when a real requirement — fraud detection, live inventory — needs
freshness that batch cannot meet.

## Review: discovery, crawlers, and the catalog
Duration: 5:00

These cover codelab 02.

**Q4 (multiple choice).** What does a Glue **crawler** produce?

A. A cleaned copy of the data in a new bucket
B. Table definitions (schema, types, partitions) in the Glue Data Catalog
C. A Redshift table loaded with rows
D. A CloudWatch dashboard

Positive
: **Answer: B.** A crawler reads a sample of your data, infers its schema and
partitions, and registers **table metadata** in the Data Catalog. It does not
move or copy the data itself — the rows stay in S3; only the description of them
lands in the catalog.

**Q5 (short answer).** Athena queried the raw CSVs without you loading them
anywhere first. What makes that possible?

Positive
: **Answer:** Athena reads directly from S3 using the schema in the Glue Data
Catalog. The catalog tells Athena where the files are and how to interpret their
columns, so query-on-read needs no prior load. This is the schema-on-read model:
describe once, query in place.

## Review: storage, Medallion, Parquet, partitioning
Duration: 6:00

These cover codelab 03 part 1.

**Q6 (short answer).** Put the Medallion layers in order and give the one-line job
of each.

Positive
: **Answer:** raw, bronze, silver, gold. **Raw** is the untouched original you can
always reprocess. **Bronze** is that data ingested into the lake with typed
columns. **Silver** is cleaned, conformed, and partitioned. **Gold** is
business-ready aggregates that analysts query directly.

**Q7 (multiple choice).** Why convert silver and gold data to **Parquet** instead
of leaving it as CSV?

A. Parquet is human-readable in a text editor
B. Parquet is columnar and compressed, so queries scan less data and cost less
C. Parquet does not need a schema
D. Athena cannot read CSV

Positive
: **Answer: B.** Parquet stores data by column and compresses it, so a query that
needs three columns reads only those three. Athena bills by **bytes scanned**, so
columnar Parquet is both faster and cheaper. CSV is row-based and reads the whole
file every time.

**Q8 (short answer).** Your gold orders table is partitioned by `region`. A query
filters `WHERE region = 'West'`. What does partitioning save you?

Positive
: **Answer:** Partition pruning. Because each region's data sits under its own
S3 prefix, Athena reads only the `region=West` files and skips the rest. Less
data scanned means a faster, cheaper query. Partition on the columns you filter
by most.

## Review: transform with Glue ETL
Duration: 5:00

These cover codelab 03 part 2.

**Q9 (multiple choice).** Your Glue PySpark job reads `raw/` and writes `silver/`.
Which best describes what the job should do?

A. Copy bytes unchanged from raw to silver
B. Drop bad rows, fix types, standardize values, then write partitioned Parquet
C. Delete the raw data once silver exists
D. Load the data into Redshift

Positive
: **Answer: B.** Silver is where cleaning happens: drop or quarantine bad rows,
cast columns to correct types, standardize values like status and region, and
write partitioned Parquet. Raw is never deleted — it is your reprocessing safety
net — and loading Redshift is a later serve step.

**Q10 (short answer).** Glue ETL is called "serverless." What does that buy you
compared with running Spark on your own EC2 cluster?

Positive
: **Answer:** No cluster to provision, patch, or keep running. Glue spins up
Spark workers for the job, runs your script, and tears them down, and you pay only
for the time used (measured in DPU-hours). You manage the transform logic, not the
infrastructure under it.

## Review: serve with Athena CTAS, Redshift, and the lake house
Duration: 6:00

These cover codelab 03 part 3.

**Q11 (multiple choice).** What does an Athena **CTAS** (`CREATE TABLE AS SELECT`)
statement do in this pipeline?

A. Defines an empty table with no data
B. Runs a SELECT over silver and writes the result as a new gold table in S3
C. Crawls the data to infer schema
D. Copies data into Redshift

Positive
: **Answer: B.** CTAS runs the SELECT, materializes the result as files in S3
(Parquet, optionally partitioned), and registers the new table in the catalog in
one statement. That is exactly how you build the gold revenue-by-region table in
the capstone.

**Q12 (short answer).** When would you push gold data into **Amazon Redshift**
rather than just querying it in S3 with Athena?

Positive
: **Answer:** When you need consistent low-latency, high-concurrency serving —
many dashboard users hitting the same tables repeatedly. Athena is serverless and
ideal for ad-hoc and pipeline queries; Redshift is a warehouse tuned for fast,
repeated, concurrent reads. Together they are the **lake house**: one lake in S3,
queried by the right engine for each job.

## Review: orchestration and automation
Duration: 5:00

These cover codelab 04.

**Q13 (multiple choice).** You need to run a crawler, then a Glue ETL job, then an
Athena query in order, with retries and branching on failure. Which service fits
best?

A. A single cron job on an EC2 box
B. AWS Step Functions
C. Amazon S3 event notifications alone
D. A Lambda function that sleeps between steps

Positive
: **Answer: B.** Step Functions is built for exactly this: a state machine that
sequences tasks, waits for each to finish, retries on error, and branches on
failure, all as managed infrastructure. Cron and sleep-in-Lambda have no real
failure handling or visibility.

**Q14 (short answer).** What is the division of labor between **Step Functions**
and **EventBridge** in your pipeline?

Positive
: **Answer:** Step Functions defines *what* runs and in what order (the workflow).
EventBridge decides *when* it runs (the schedule or triggering event). EventBridge
starts the state machine on a cron schedule; Step Functions takes it from there.

## Review: security and monitoring
Duration: 5:00

These cover codelab 05.

**Q15 (multiple choice).** Your Glue job needs to read `raw/` and write `silver/`
in one bucket. Which IAM approach follows least privilege?

A. Attach `AdministratorAccess` to the Glue role
B. Grant the Glue role only `s3:GetObject` on `raw/*` and `s3:PutObject` on
   `silver/*` for that one bucket
C. Make the bucket public so the job can reach it
D. Use the root user's credentials in the job

Positive
: **Answer: B.** Least privilege means the role can do exactly what the job needs
and nothing more — read the raw prefix, write the silver prefix, scoped to the one
bucket. Admin, public buckets, and root credentials all grant far more access than
the task requires.

**Q16 (short answer).** Name one thing **Lake Formation**, one thing **KMS**, and
one thing **CloudTrail** each contribute to governing the lake.

Positive
: **Answer:** Lake Formation gives fine-grained, table- and column-level access
control over catalog data. KMS encrypts the data at rest with keys you control.
CloudTrail records an audit trail of who called which API and when. Together they
cover access control, encryption, and audit.

## Capstone: run the pipeline end to end
Duration: 12:00

Now the hands-on part. You will trigger one full run, raw to bronze to silver to
gold, then validate it with a gold query in the next step.

The cleanest path is to start the Step Functions workflow from codelab 04, which
chains the crawler, the Glue ETL job, and the gold CTAS for you. If you do not
have the state machine, use Plan B to run the three stages by hand.

### Plan A: trigger the Step Functions workflow

**Console path**

1. Open the **Step Functions** console.
2. Choose the **hvt-retail-pipeline** state machine.
3. Choose **Start execution**, leave the input as `{}`, and start it.
4. Watch the graph. Each state turns green as it completes: crawl raw, run the
   raw-to-silver ETL, then the gold CTAS.

**AWS CLI**

```bash
SM_ARN=$(aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" \
  --output text)

EXEC_ARN=$(aws stepfunctions start-execution \
  --state-machine-arn "$SM_ARN" \
  --name "capstone-$(date +%Y%m%d-%H%M%S)" \
  --input '{}' \
  --query executionArn --output text)

echo "$EXEC_ARN"
```

Poll until it finishes. `SUCCEEDED` means the whole pipeline ran:

```bash
aws stepfunctions describe-execution \
  --execution-arn "$EXEC_ARN" \
  --query 'status' --output text
```

Positive
: Re-run while you wait; the status moves from `RUNNING` to `SUCCEEDED`. On a tiny
dataset the run typically completes in a couple of minutes, most of it Glue
startup time.

### Plan B: run the three stages by hand

Use this only if you do not have the state machine. It does exactly what the
workflow does, one CLI call per stage.

```bash
# 1. Crawl raw so the catalog is current
aws glue start-crawler --name hvt-retail-raw-crawler

# wait until it is back to READY before the next stage
aws glue get-crawler --name hvt-retail-raw-crawler \
  --query 'Crawler.State' --output text
```

```bash
# 2. Run the raw-to-silver ETL job
RUN_ID=$(aws glue start-job-run \
  --job-name hvt-retail-bronze-to-silver \
  --query JobRunId --output text)

aws glue get-job-run \
  --job-name hvt-retail-bronze-to-silver --run-id "$RUN_ID" \
  --query 'JobRun.JobRunState' --output text
```

Wait until the job state is `SUCCEEDED`, then build the gold table with the CTAS
in the next step.

Negative
: Run the stages in order and let each finish before starting the next. Kicking
off the ETL before the crawler reaches `READY`, or the gold query before the ETL
reaches `SUCCEEDED`, reads stale or missing data. The Step Functions workflow
enforces this ordering for you, which is the whole point of orchestration.

## Capstone: build and validate the gold query
Duration: 10:00

Now produce the gold result that proves the pipeline worked: **total revenue by
region**, counting only recognized revenue (orders that `completed` or `shipped`).

If Plan A ran the gold CTAS for you, the `hvt_retail_db.daily_region_sales`
table already exists and you can skip straight to the validation query. If you
used Plan B, run the CTAS first.

### Build the gold table (Plan B, or to rebuild)

**Console path**

1. Open the **Athena** console and select your `hvt-retail-wg` and the
   `hvt_retail_db` database.
2. Paste the CTAS below and run it. It writes Parquet to `gold/` and registers the
   table.

```sql
CREATE TABLE hvt_retail_db.daily_region_sales
WITH (
  format = 'PARQUET',
  external_location = 's3://hvt-retail-datalake-<your-account-id>/gold/revenue_by_region/',
  partitioned_by = ARRAY['region']
) AS
SELECT
  sum(amount) AS total_revenue,
  count(*)    AS order_count,
  region
FROM hvt_retail_db.silver_orders
WHERE status IN ('completed', 'shipped')
GROUP BY region;
```

**AWS CLI**

```bash
aws athena start-query-execution \
  --work-group hvt-retail-wg \
  --query-string "CREATE TABLE hvt_retail_db.daily_region_sales
    WITH (format='PARQUET',
          external_location='s3://hvt-retail-datalake-$ACCOUNT_ID/gold/revenue_by_region/',
          partitioned_by=ARRAY['region']) AS
    SELECT sum(amount) AS total_revenue, count(*) AS order_count, region
    FROM hvt_retail_db.silver_orders
    WHERE status IN ('completed','shipped')
    GROUP BY region;" \
  --query QueryExecutionId --output text
```

### Validate: query the gold table

This is the checkpoint query. Run it in the console or via the CLI.

**Console path**

1. In Athena, run the validation query:

```sql
SELECT region, total_revenue, order_count
FROM hvt_retail_db.daily_region_sales
ORDER BY total_revenue DESC;
```

**AWS CLI**

```bash
QID=$(aws athena start-query-execution \
  --work-group hvt-retail-wg \
  --query-string "SELECT region, total_revenue, order_count
    FROM hvt_retail_db.daily_region_sales
    ORDER BY total_revenue DESC;" \
  --query QueryExecutionId --output text)

# wait until SUCCEEDED, then read the rows
aws athena get-query-results \
  --query-execution-id "$QID" \
  --query 'ResultSet.Rows[].Data[].VarCharValue' \
  --output text
```

## Checkpoint: confirm the gold result and score yourself
Duration: 6:00

### Confirm the revenue-by-region result

Your gold query should return five regions with these totals. The dataset seed is
fixed, so everyone gets exactly these numbers:

```text
region    total_revenue    order_count
Central       300566.18            458
East          267418.05            408
North         214381.36            331
South         259365.20            393
West          267214.20            404
```

Total recognized revenue across all regions is **1,308,944.99**. Confirm it with a
one-line query:

```sql
SELECT sum(total_revenue) AS grand_total
FROM hvt_retail_db.daily_region_sales;
```

Positive
: If the per-region totals match and the grand total reads `1308944.99`, your
pipeline is correct end to end. You ingested, cataloged, transformed, and served
real data, and the output reconciles to the source. That is the validation for
this capstone.

Negative
: If your totals are higher than these, your silver step probably kept every
order instead of filtering to `completed` and `shipped`. If they are lower or a
region is missing, the crawler or ETL may not have processed all the raw data.
Re-run the offending stage and re-validate.

### Score your readiness

Tick every box you can honestly check off, then add up.

| Lesson | I can do this | Pts |
|---|---|---|
| 00 Foundation | Set up an account safely with an IAM admin user, budget, and billing alarm | 1 |
| 01 Role | Name the six functions and place a task in one; explain batch vs streaming | 1 |
| 02 Catalog | Crawl raw data and query it in place with Athena via the Glue catalog | 1 |
| 03-1 Storage | Explain the Medallion layers and why Parquet and partitioning save cost | 1 |
| 03-2 Transform | Read what a Glue PySpark raw-to-silver job does and why it is serverless | 1 |
| 03-3 Serve | Build a gold table with CTAS and say when to use Redshift over Athena | 1 |
| 04 Automate | Trigger the Step Functions workflow and explain its split with EventBridge | 1 |
| 05 Protect | Write a least-privilege S3 policy and name what Lake Formation, KMS, CloudTrail do | 1 |
| Capstone | Ran the pipeline end to end and the gold query reconciled to 1,308,944.99 | 2 |

Add your points out of **10** and read your band:

| Score | Readiness |
|---|---|
| 9 to 10 | **Pipeline-ready.** You can build and reason about the whole lake house. Move on to codelab 07. |
| 7 to 8 | **Nearly there.** Revisit the one or two lessons you could not check, then re-score. |
| 4 to 6 | **Foundations solid, gaps remain.** Redo the transform or serve labs hands-on before moving on. |
| 0 to 3 | **Walk it again.** Restart from the first unchecked lesson and run each capstone step yourself. |

Positive
: A box only counts if you can do it *without* the lab open. Re-reading the steps
is fine; needing them in front of you means revisit that lesson. Honest scoring
here saves you from a surprise on a real project.

## Troubleshooting
Duration: 4:00

- **State machine not found** — the name differs or codelab 04 is incomplete. List
  with `aws stepfunctions list-state-machines` and match by sight, or use Plan B to
  run the stages by hand.
- **`Table not found: silver_orders`** — the Glue ETL job has not produced silver
  yet, or the crawler has not cataloged it. Run the crawler, confirm it reaches
  `READY`, then run the ETL job and wait for `SUCCEEDED`.
- **CTAS fails with `location already exists`** — the `gold/revenue_by_region/`
  prefix has leftover files from a prior run. Drop the table with
  `DROP TABLE hvt_retail_db.daily_region_sales`, delete the S3 prefix, and
  re-run the CTAS.
- **Totals do not match the expected numbers** — your silver step kept cancelled
  or returned orders. Confirm the ETL and the CTAS both filter
  `status IN ('completed','shipped')`, then rebuild silver and gold.
- **`AccessDenied` on Athena results** — the workgroup's query-result location or
  your role lost write access to it. Confirm the `hvt-retail-wg` output
  location and that your `hvt-admin` user can write there.

## Cleanup
Duration: 3:00

Keep everything for now. The next codelab does the **full teardown** of every
resource in this track, so deleting here just means rebuilding in lesson 07.

The one thing worth doing now: make sure nothing runs unattended overnight. Your
EventBridge schedule from codelab 04 will keep firing the pipeline on its cron
unless you stop it. Disable the rule so it costs nothing while idle.

**AWS CLI**

```bash
aws events disable-rule --name hvt-retail-daily-pipeline
```

Confirm it is off:

```bash
aws events describe-rule \
  --name hvt-retail-daily-pipeline \
  --query 'State' --output text
```

You want it to read `DISABLED`. You can re-enable it any time with
`aws events enable-rule --name hvt-retail-daily-pipeline`.

Positive
: Disabling the rule keeps the whole pipeline intact but parks it, so no run
fires on its own. This is the right move whenever you step away from an automated
pipeline you are not actively watching.

Negative
: Do not delete the bucket, the Glue resources, or the state machine here. Codelab
07 walks the full, ordered teardown so nothing is left billing. Tearing down out
of order now risks orphaned resources you forget about.

## What's next
Duration: 1:00

You reviewed every lesson, ran the pipeline end to end, validated it against a
known gold result, and scored your own readiness. If you landed in the top band,
you can build and reason about a real lake house on AWS.

One lesson remains. In codelab 07 you will recap the full architecture you built,
look at where to take these skills next, and do the complete, ordered teardown so
your account returns to zero cost.

Continue to **Codelab 07: Conclusion and teardown**.

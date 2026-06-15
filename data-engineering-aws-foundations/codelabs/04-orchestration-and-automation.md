author: HitaVirTech
summary: Compare five AWS orchestration options, then wire the crawler, Glue ETL job, and an Athena CTAS into one retryable Step Functions workflow on a daily EventBridge schedule.
id: hvt-de-aws-04-orchestration
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Orchestration and automation options

## Overview
Duration: 5:00

So far you have run each piece of the HitaVir Retail pipeline by hand: you started
the crawler, launched the Glue ETL job, then ran an Athena query to build gold. That
works once. It does not work every night while you sleep.

This lab is about **orchestration** — coordinating several steps into one reliable,
repeatable run, with order, error handling, and retries built in. You will first
compare the AWS options and learn when to reach for each. Then you will build the one
that fits this pipeline: a single **AWS Step Functions** workflow that crawls, transforms,
and queries, and you will put it on a daily schedule with **Amazon EventBridge**.

### What you'll build

- One **Step Functions state machine** named `hvt-retail-pipeline` that runs the
  crawler, the Glue ETL job, and an Athena CTAS in order, each with its own retry policy.
- A least-privilege **IAM role** that lets only that state machine call only those services.
- A daily **EventBridge schedule** that starts the workflow on a clock.

### What you'll learn

- The five AWS orchestration options and the one trade-off that decides each.
- How **service integrations** let Step Functions call Glue and Athena with no code.
- How **retry and backoff** turn a flaky transient error into a non-event.
- How to trigger a workflow on a schedule and confirm it ran.

### Prerequisites

- You finished lessons 01 through 03: the raw data is in S3, the crawler
  `hvt-retail-raw-crawler` and database `hvt_retail_db` exist, the Glue ETL job
  `hvt-retail-bronze-to-silver` exists, and you have produced a gold table from silver
  at least once by hand.
- The AWS CLI is configured for `us-east-1` (lesson 00).
- Your data lake bucket is `hvt-retail-datalake-<your-account-id>`.

### Services used

AWS Step Functions, AWS Glue, Amazon Athena, Amazon EventBridge Scheduler, AWS IAM.

### Cost and time

- **Cost:** about $0. Step Functions, EventBridge, and Lambda are effectively free at
  this scale; you pay only the same tiny Glue and Athena charges as before. The one
  option that is **not** free is Amazon MWAA, and you will not provision it.
- **Time:** about 55 minutes.

### The concept visual

Open the orchestration comparison and the workflow state diagram side by side. The five
color-coded cards each carry a one-line "pick when", and the diagram shows the exact
crawler, ETL, and CTAS flow you are about to build, with its retry indicators.

Visual: [`assets/04-orchestration-options.html`](../assets/04-orchestration-options.html)

## Compare the orchestration options
Duration: 8:00

Before building, know your menu. All five of these run pipelines, but they answer
different needs. The single most useful question is: *what triggers the run, and how
much coordination do the steps need?*

| Option | What it is | Strengths | Pick when | Cost at this scale |
|---|---|---|---|---|
| **AWS Step Functions** | A serverless state machine that chains tasks, with retry, catch, branching, and wait built in. **Service integrations** call Glue and Athena directly, no code. | Visual, retryable, least-privilege, no servers. | You want a few AWS services run in order with first-class error handling. **This lab.** | Basically free (per state transition). |
| **AWS Glue Workflows** | Chains Glue crawlers and Glue jobs with triggers, all inside Glue. | Nothing new to learn if you live in Glue. | Every step is a Glue crawler or Glue job. | No charge for the workflow; you pay for Glue runs. |
| **Amazon MWAA** (managed Airflow) | Managed Apache Airflow. Python DAGs, a large operator ecosystem, rich backfills. | Most powerful for complex, cross-system, interdependent pipelines. | You run many DAGs and your team knows Airflow. | **Not free — bills hourly even when idle.** |
| **Amazon EventBridge schedule** | A cron or rate timer that fires a target. It is the trigger, not the workflow. | Dead simple scheduling; pairs with anything. | You need to run a pipeline on a clock. **You add this on top.** | Basically free. |
| **AWS Lambda trigger** | A short function that reacts to an event and starts work. | Event-driven, a little custom logic. | A run should start from an event (a new S3 file), not a clock. | Basically free within the free tier. |

A useful mental model: **Step Functions** and **Glue Workflows** *are* the workflow;
**EventBridge** and **Lambda** *start* a workflow (on a clock or on an event); **MWAA**
is the heavyweight you grow into when one workflow is no longer enough.

Negative
: Do **not** create an Amazon MWAA environment for this lab. Unlike the serverless
options, an MWAA environment bills per hour the moment it exists, whether or not a DAG
runs. It is the right tool for large, interdependent pipelines, but for three steps it
is expensive overkill. We compare it so you know when to choose it later, not so you
provision it now.

Positive
: This lab uses **Step Functions** for the workflow and **EventBridge** for the daily
trigger. That pairing is the common, cost-aware default for AWS-native data pipelines.

## Setup
Duration: 4:00

Set two shell variables so every command below is copy-paste ready. Replace the account
id with your own.

```bash
export ACCOUNT_ID=<your-account-id>
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
export AWS_REGION=us-east-1
```

Confirm the resources from earlier labs exist. Each of these should return without error:

```bash
aws glue get-crawler --name hvt-retail-raw-crawler --query 'Crawler.Name'
aws glue get-job --job-name hvt-retail-bronze-to-silver --query 'Job.Name'
aws glue get-database --name hvt_retail_db --query 'Database.Name'
```

Positive
: The state machine definition lives in the repo at
[`scripts/stepfunctions_pipeline.asl.json`](../scripts/stepfunctions_pipeline.asl.json),
written in **Amazon States Language** (ASL) — the JSON dialect that describes a state
machine. The schedule config is in
[`scripts/eventbridge_daily_schedule.json`](../scripts/eventbridge_daily_schedule.json).
Both contain the placeholder `ACCOUNT_ID`; you will substitute your real id before use.

## Create a least-privilege IAM role for the state machine
Duration: 8:00

A **state machine** needs an **IAM role** so it can call the services in its definition
on your behalf. Give it exactly the permissions it needs and nothing more — that is
**least privilege**.

First, the trust policy that lets Step Functions assume the role. Save it as
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

Next, the permissions policy. It allows only the crawler, the one Glue job, the Athena
CTAS, and the S3 and Glue catalog access those need. Save it as `states-permissions.json`
(replace `ACCOUNT_ID` and keep the bucket name in sync):

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

**AWS CLI**

```bash
# Create the role with the trust policy
aws iam create-role \
  --role-name hvt-retail-states-role \
  --assume-role-policy-document file://states-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

# Attach the least-privilege permissions inline
aws iam put-role-policy \
  --role-name hvt-retail-states-role \
  --policy-name hvt-retail-states-permissions \
  --policy-document file://states-permissions.json
```

**Console path**

1. Open **IAM**, choose **Roles**, then **Create role**.
2. For trusted entity, pick **AWS service**, then **Step Functions**.
3. On the permissions page, skip the managed policies for now and create the role
   named `hvt-retail-states-role`.
4. Open the new role, choose **Add permissions**, then **Create inline policy**, switch
   to the **JSON** tab, and paste the permissions policy above (with your account id).

Note the role ARN; you need it in the next step:

```bash
aws iam get-role --role-name hvt-retail-states-role --query 'Role.Arn' --output text
```

Negative
: It is tempting to attach a broad managed policy like `AWSStepFunctionsFullAccess` or
`AdministratorAccess` to "just make it work". Don't. A pipeline role that can only touch
its own crawler, job, table, and bucket cannot be turned into a foothold if anything
about the workflow is ever compromised.

## Create the Step Functions state machine
Duration: 10:00

The definition in
[`scripts/stepfunctions_pipeline.asl.json`](../scripts/stepfunctions_pipeline.asl.json)
describes the whole workflow:

- **StartCrawler** then a wait-and-poll loop, so the asynchronous crawler finishes before
  the ETL begins.
- **StartGlueETL** using the `glue:startJobRun.sync` **service integration** — the `.sync`
  pattern means Step Functions blocks until the Glue run actually completes, instead of
  firing and forgetting.
- **AthenaCTAS** using `athena:startQueryExecution.sync` to run the CREATE TABLE AS SELECT
  that rebuilds the gold table, again blocking until the query finishes.

Every task carries a **Retry** block, so a transient error (a brief throttle, a
concurrent-run clash) waits and tries again with **backoff** — each retry waits longer
than the last — instead of failing the run. Every task also has a **Catch** that routes
any unrecoverable error to a single `PipelineFailed` state, so failures are obvious in
the execution history.

Here is the shape of one task, so you can read the file with confidence:

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

First substitute your account id into the definition. The file ships with the placeholder
`ACCOUNT_ID` in the Athena CTAS paths:

```bash
sed "s/ACCOUNT_ID/$ACCOUNT_ID/g" \
  scripts/stepfunctions_pipeline.asl.json > /tmp/pipeline.asl.json
```

**AWS CLI**

```bash
ROLE_ARN=$(aws iam get-role --role-name hvt-retail-states-role --query 'Role.Arn' --output text)

aws stepfunctions create-state-machine \
  --name hvt-retail-pipeline \
  --definition file:///tmp/pipeline.asl.json \
  --role-arn "$ROLE_ARN" \
  --type STANDARD \
  --tags key=project,value=hvt-retail key=env,value=dev
```

**Console path**

1. Open **Step Functions**, choose **State machines**, then **Create state machine**.
2. Choose **Write your workflow in code**, type **Standard**.
3. Paste the contents of your substituted `pipeline.asl.json` into the definition editor.
   The graph on the right should show the crawler, ETL, and CTAS in order.
4. Name it `hvt-retail-pipeline`, pick the existing role `hvt-retail-states-role`, add the
   `project=hvt-retail` and `env=dev` tags, and create it.

Capture the state machine ARN for later:

```bash
SM_ARN=$(aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" --output text)
echo "$SM_ARN"
```

## Run it once by hand
Duration: 6:00

Before scheduling, prove the workflow runs end to end. The input passes the bucket name
that the Glue job and the diagram expect.

**AWS CLI**

```bash
aws stepfunctions start-execution \
  --state-machine-arn "$SM_ARN" \
  --name "manual-$(date +%Y%m%d-%H%M%S)" \
  --input "{\"bucket\": \"$BUCKET\"}"
```

**Console path**

1. Open the `hvt-retail-pipeline` state machine and choose **Start execution**.
2. For input, paste `{ "bucket": "hvt-retail-datalake-<your-account-id>" }` and start it.
3. Watch the graph light up: the crawler, then the ETL, then the CTAS turn green in turn.

The run takes a few minutes, mostly the Glue job. The crawler poll loop means the graph
will sit on the wait-and-check states briefly before the ETL starts; that is expected.

Positive
: This is the same workflow EventBridge will run for you nightly. Running it once by hand
first means that when the schedule fires at 2 a.m., you already know it works.

## Schedule it daily with EventBridge
Duration: 6:00

A workflow you must remember to run is not automated. **EventBridge Scheduler** fires a
target on a clock — here, once a day at 02:00 UTC. The schedule needs its own small IAM
role that is allowed only to start this one state machine.

First the scheduler's role. Save the trust policy as `scheduler-trust.json`:

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
# Role the schedule assumes
aws iam create-role \
  --role-name hvt-retail-scheduler-role \
  --assume-role-policy-document file://scheduler-trust.json \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev

# Allow it to start only the pipeline state machine
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

Now create the schedule. The config is in
[`scripts/eventbridge_daily_schedule.json`](../scripts/eventbridge_daily_schedule.json);
substitute your account id, then create it.

**AWS CLI (EventBridge Scheduler)**

```bash
sed "s/ACCOUNT_ID/$ACCOUNT_ID/g" \
  scripts/eventbridge_daily_schedule.json > /tmp/schedule.json

aws scheduler create-schedule --cli-input-json file:///tmp/schedule.json
```

If you prefer the classic EventBridge rules API instead of Scheduler, the equivalent is:

```bash
# A daily rule
aws events put-rule \
  --name hvt-retail-daily-pipeline \
  --schedule-expression "cron(0 2 * * ? *)" \
  --state ENABLED

# Point it at the state machine (reusing the scheduler role)
ROLE_ARN=$(aws iam get-role --role-name hvt-retail-scheduler-role --query 'Role.Arn' --output text)
aws events put-targets \
  --rule hvt-retail-daily-pipeline \
  --targets "Id=hvt-pipeline,Arn=$SM_ARN,RoleArn=$ROLE_ARN,Input={\"bucket\":\"$BUCKET\"}"
```

**Console path**

1. Open **EventBridge**, choose **Scheduler**, then **Schedules**, then **Create schedule**.
2. Name it `hvt-retail-daily-pipeline`. Choose a **recurring** schedule, cron based,
   `cron(0 2 * * ? *)`, timezone **UTC**.
3. For target, pick **AWS Step Functions StartExecution**, select `hvt-retail-pipeline`,
   and set the input to `{ "bucket": "hvt-retail-datalake-<your-account-id>" }`.
4. Let it use or create the `hvt-retail-scheduler-role`, then create the schedule.

Negative
: The cron expression `cron(0 2 * * ? *)` is in **UTC**, not your local time. 02:00 UTC is
late evening or early morning depending on where you are. Set the time to land after your
source data has arrived for the day.

## Checkpoint: prove the pipeline succeeded
Duration: 4:00

You do not have to wait until 2 a.m. Confirm the manual run you started earlier reached
`SUCCEEDED`, and that gold was refreshed.

Find your latest execution and check its status:

```bash
EXEC_ARN=$(aws stepfunctions list-executions \
  --state-machine-arn "$SM_ARN" \
  --max-results 1 --query 'executions[0].executionArn' --output text)

aws stepfunctions describe-execution \
  --execution-arn "$EXEC_ARN" \
  --query '{status: status, started: startDate, stopped: stopDate}'
```

You want to see `"status": "SUCCEEDED"`. If you see `RUNNING`, give the Glue job a
minute and re-run the command. If you see `FAILED`, open the execution in the console and
read the `PipelineFailed` step's cause — the troubleshooting section below covers the
usual culprits.

Now confirm gold actually refreshed. The CTAS rebuilt `daily_region_sales`:

```bash
aws s3 ls "s3://$BUCKET/gold/orders_by_region/"
```

You should see Parquet objects with a fresh timestamp. The pipeline ran, end to end,
unattended.

Positive
: A `SUCCEEDED` execution plus fresh objects under `gold/` is the whole point of this
lesson: a pipeline that runs itself, recovers from transient errors, and leaves proof it
worked.

## Troubleshooting
Duration: 4:00

- **`AccessDeniedException` starting the crawler or job** — the state machine's role is
  missing a permission, or the resource ARN in the policy does not match. Re-check
  `states-permissions.json` against the real crawler, job, database, and bucket names,
  then re-run `put-role-policy`.
- **Execution stuck looping on the wait states** — the crawler is still `RUNNING`. The
  `CrawlerDone` choice loops back to wait until the state is `READY`. A first crawl of a
  new prefix can take a couple of minutes; this is normal, not a hang.
- **`Glue.ConcurrentRunsExceededException`** — a previous Glue run of
  `hvt-retail-bronze-to-silver` is still going. The Retry block backs off and tries again;
  if it persists, stop the stray run with `aws glue batch-stop-job-run`.
- **Athena CTAS fails with "table already exists"** — `CREATE TABLE AS` will not overwrite.
  Drop the gold table first (`DROP TABLE hvt_retail_db.daily_region_sales`) or have the
  workflow target a fresh location. For a nightly job, dropping then recreating is fine.
- **Schedule never fires** — confirm the schedule is `ENABLED` and that
  `hvt-retail-scheduler-role` is allowed `states:StartExecution` on this exact state
  machine ARN. Check `aws scheduler get-schedule --name hvt-retail-daily-pipeline`.

## Cleanup
Duration: 4:00

Delete everything you created in this lab, in dependency order. None of this is expensive,
but leaving a daily schedule running will quietly re-run the pipeline every night.

```bash
# 1. Delete the daily schedule (EventBridge Scheduler)
aws scheduler delete-schedule --name hvt-retail-daily-pipeline

# If you used the classic rules API instead, remove the target then the rule:
aws events remove-targets --rule hvt-retail-daily-pipeline --ids hvt-pipeline
aws events delete-rule --name hvt-retail-daily-pipeline

# 2. Delete the state machine
aws stepfunctions delete-state-machine --state-machine-arn "$SM_ARN"

# 3. Delete the scheduler role (inline policy first)
aws iam delete-role-policy \
  --role-name hvt-retail-scheduler-role \
  --policy-name hvt-retail-scheduler-start
aws iam delete-role --role-name hvt-retail-scheduler-role

# 4. Delete the state machine role (inline policy first)
aws iam delete-role-policy \
  --role-name hvt-retail-states-role \
  --policy-name hvt-retail-states-permissions
aws iam delete-role --role-name hvt-retail-states-role
```

Positive
: Leave the crawler, the Glue job, the database, and the data lake bucket in place — later
lessons still use them. You are only removing the orchestration layer you added here.

Negative
: Run the schedule deletion first. A role cannot always be deleted while something still
references it, and more importantly, a forgotten schedule keeps invoking the pipeline and
re-running Glue every night.

## What's next
Duration: 1:00

You turned three manual steps into one workflow that runs itself, retries through
transient errors, and proves it succeeded. That is the difference between a demo and a
pipeline.

Next you will make that pipeline safe to operate: least-privilege IAM done properly, Lake
Formation, encryption, and the monitoring with CloudWatch and CloudTrail that tells you
when a nightly run fails before your stakeholders do.

Continue to **Codelab 05: Security and monitoring**.

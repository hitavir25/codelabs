authors: HitaVirTech
summary: Recap the full HitaVir Retail pipeline you built across the track, see the one-page architecture, plan where to go next, then run the complete teardown that deletes every resource so nothing keeps billing.
id: hvt-de-aws-07-conclusion
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Conclusion and teardown

## Overview
Duration: 4:00

You made it to the end. Across this track you became the first data engineer at
**HitaVir Retail** and built a real, working lake house: one dataset moving through
a Medallion lake on Amazon S3, from **raw to bronze to silver to gold**, cataloged,
transformed, served, scheduled, secured, and watched.

This final codelab does three things. First it **recaps** what you built and learned,
tied back to the six key functions and the role of a data engineer. Then it gives you
a **one-page architecture summary** of the whole pipeline and points you to **where to
go next**. Finally it walks the **complete teardown**: the single most important
cleanup in the track, deleting every resource you created across all lessons, in a
safe order, so your bill returns to zero.

### What you'll do

- Review the full pipeline and the six functions it exercised.
- Read a one-page summary of the end-to-end architecture in plain words.
- Pick a concrete next step: the AWS certification path or a deeper service.
- Run a **mandatory, thorough teardown** that removes every billable resource.

### What you'll learn

- How the pieces you built lesson by lesson fit into one coherent system.
- The safe order to delete resources so dependencies do not block you.
- How to verify your account is empty and confirm no ongoing charges.

### Prerequisites

- The earlier codelabs completed, so the resources named below exist to delete.
- Your configured AWS CLI in `us-east-1` and your 12-digit account id.
- Your data lake bucket `hvt-retail-datalake-<your-account-id>`.

### Services used

Every service from the track, here only to **delete**: Amazon S3, AWS Glue, Amazon
Athena, Amazon Redshift Serverless, AWS Step Functions, Amazon EventBridge
Scheduler, AWS IAM, AWS Lake Formation, AWS KMS, Amazon CloudWatch, and AWS
CloudTrail.

### Cost and time

- **Cost:** $0. This lesson only removes resources. Running the teardown is what
  guarantees you stop paying.
- **Time:** about 30 minutes.

### The concept visual

Open the pipeline recap. It draws the full end-to-end architecture as one picture —
the raw to bronze to silver to gold flow with Glue, Athena, and Redshift on it, the
automate and protect rails wrapping it, and a small where-to-go-next roadmap. It is
the bookend to the roadmap you opened in lesson 00.

Visual: [`assets/07-pipeline-recap.html`](../assets/07-pipeline-recap.html)

Positive
: If you want to keep the pipeline running a while longer to explore, skip ahead to
the teardown later — but do come back. An idle Redshift Serverless namespace, a KMS
key, and a CloudTrail trail all carry small ongoing costs. The only way to truly stop
the bill is the teardown at the end of this lesson.

## Recap: what you built and learned
Duration: 6:00

You started in lesson 00 with nothing but an email address. You now have a complete,
automated, governed data platform. Here is the journey, mapped to the **six key
functions** of data engineering from lesson 01.

| Lesson | What you built | Key function |
|---|---|---|
| 00 | AWS account, `hvt-admin` IAM user, billing alarm, budget, CLI | Build infrastructure |
| 01 | The lake bucket and the `raw/` landing zone, three CSVs uploaded | Build infrastructure, Ingest |
| 02 | Glue crawler, the `hvt_retail_db` catalog database, Athena queries | Catalog |
| 03-1 | The S3 Medallion lake layout and a lifecycle rule | Build infrastructure |
| 03-2 | Glue ETL job raw to silver, with its own IAM role | Prepare |
| 03-3 | Athena gold tables via CTAS, Redshift Serverless to serve | Prepare, Serve |
| 04 | Step Functions state machine, EventBridge schedule | Automate |
| 05 | Least-privilege IAM, Lake Formation, KMS, CloudWatch, CloudTrail | Govern and secure |

Read that table top to bottom and you have described the job. A data engineer
**builds the infrastructure**, **ingests** from sources, **prepares** raw data into
analytics-ready form, **catalogs** it so others can find and trust it, **automates**
the whole thing so it runs without a human, and **governs** quality, access, and
audit end to end. You did all six, on real services, against one dataset.

The output you were responsible for, stated back in lesson 01, was **trustworthy
data, delivered on time**. Your gold tables are exactly that: clean, described,
refreshed on a schedule, access-controlled, encrypted, and auditable. That is the
whole point of the role, and you have now done it end to end.

Positive
: The single most valuable habit you practiced was cost discipline. You set a budget
before spending a cent, tagged every resource `project=hvt-retail` and `env=dev`, and
ended every lesson with a cleanup. That discipline is what this final teardown
completes.

## The architecture, on one page
Duration: 5:00

Here is the entire HitaVir Retail pipeline in words. Open the visual alongside this
section to see the same picture drawn out.

**The lake is the spine.** Everything reads from and writes to one S3 bucket,
`hvt-retail-datalake-<your-account-id>`, organized as a Medallion lake:

- **raw** — the source CSVs exactly as they arrived, never edited, always replayable.
- **bronze** — the same data landed in a columnar, query-friendly form.
- **silver** — cleaned, typed, de-duplicated, partitioned, analytics-ready.
- **gold** — business-level aggregates built for reporting and serving.

**Catalog sits over the lake.** An AWS Glue crawler infers schemas and registers
them in the Glue Data Catalog database `hvt_retail_db`. Every query engine reads
table definitions from there, so the lake is self-describing rather than a pile of
anonymous files.

**Compute moves the data forward.** An AWS Glue ETL job, written in PySpark, reads
bronze and writes silver. Amazon Athena runs CTAS statements that turn silver into
gold tables directly in the lake. Amazon Redshift Serverless serves the gold layer to
BI-style queries when you want a warehouse engine instead of lake queries.

**Automation wraps the flow — the emerald rail.** An AWS Step Functions state machine
chains the steps in order: run the crawler, run the ETL job, build gold. An Amazon
EventBridge schedule triggers that state machine on a cadence, so the pipeline
refreshes itself with no one clicking buttons.

**Governance wraps the flow — the rose rail.** Least-privilege IAM roles and policies
control who and what can act. AWS Lake Formation grants table- and column-level
access over the catalog. An AWS KMS key encrypts the data at rest. Amazon CloudWatch
alarms watch for trouble and cost, and AWS CloudTrail records every API call for
audit.

Read it as one sentence: **raw to bronze to silver to gold, cataloged by Glue,
transformed by Glue ETL and Athena, served by Athena and Redshift, automated by Step
Functions and EventBridge, and secured by IAM, Lake Formation, and KMS while
CloudWatch and CloudTrail watch.** That is a modern AWS lake house, and you built it.

## Where to go next
Duration: 4:00

You have the foundations. Here is how to deepen them.

### The certification path

The natural next milestone is the **AWS Certified Data Engineer - Associate**
(exam code DEA-C01). It validates exactly the skills you practiced here: ingestion,
transformation, the Glue and Athena ecosystem, orchestration, and data security and
governance. Because you built a real pipeline rather than only reading about one, you
already have hands-on context for most of the domains. Use the official exam guide to
find your gaps, then close them with focused labs.

### Go deeper on the services

- **Amazon EMR** — when your Glue jobs outgrow Glue, EMR gives you full, tunable
  Apache Spark clusters for large-scale processing. Reach for it when data volume and
  custom Spark control matter more than serverless simplicity.
- **Amazon Kinesis** — this whole track was **batch**. Kinesis is the entry point to
  **streaming**: ingest and process events the moment they arrive, for real-time
  dashboards, fraud detection, and live inventory.
- **AWS Lake Formation governance** — you used it lightly. Go deeper into
  fine-grained, column- and row-level permissions, LF-Tags, and cross-account data
  sharing to govern a real multi-team lake.
- **dbt and Apache Iceberg** — modern table formats and transformation frameworks.
  **Iceberg** brings ACID transactions, schema evolution, and time travel to your S3
  tables; **dbt** brings software-engineering discipline (version control, tests,
  documentation) to your SQL transformations.

Positive
: Pick one and build something small with it on top of what you have. A streaming
ingest into the same lake, or one silver table re-modeled as Iceberg, will teach you
more than a week of reading. The lake you built is a perfect sandbox — right after you
finish the teardown below, that is.

## Complete teardown: delete everything
Duration: 8:00

This is the big one. You will now delete **every resource created across the entire
track**, in an order that respects dependencies, so nothing is left billing. This
teardown is **mandatory**. Several resources here — a Redshift Serverless namespace, a
KMS key, a CloudTrail trail — accrue small ongoing charges even when idle.

Negative
: Run these steps **in order**. Resources have dependencies: a workgroup must go
before its namespace, roles must be detached before they delete, and the S3 bucket
must be emptied and deleted **last** because almost everything else points at it.

Set up your shell variables first so the commands below are copy-paste ready:

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
echo "Tearing down for account $ACCOUNT_ID, bucket $BUCKET"
```

### Step 1 — Stop and delete the EventBridge schedule

Kill the trigger first so nothing re-launches the pipeline while you tear it down.

```bash
aws scheduler delete-schedule --name hvt-retail-daily-pipeline
```

### Step 2 — Delete the Step Functions state machine

```bash
SM_ARN=$(aws stepfunctions list-state-machines \
  --query "stateMachines[?name=='hvt-retail-pipeline'].stateMachineArn" \
  --output text)

aws stepfunctions delete-state-machine --state-machine-arn "$SM_ARN"
```

### Step 3 — Delete Redshift Serverless: workgroup, then namespace

The workgroup depends on the namespace, so delete the workgroup first. The namespace
will not delete while a workgroup still references it.

```bash
aws redshift-serverless delete-workgroup --workgroup-name hvt-retail-wg

# Wait until the workgroup is gone before deleting the namespace.
aws redshift-serverless delete-namespace --namespace-name hvt-retail-ns
```

Positive
: If the namespace delete returns a conflict, the workgroup is still tearing down.
Wait a minute and re-run the namespace command. Deleting these stops the only
resources in the track that bill meaningfully while idle.

### Step 4 — Delete the Glue jobs, crawler, and database

```bash
aws glue delete-job --job-name hvt-retail-bronze-to-silver

aws glue delete-crawler --name hvt-retail-raw-crawler

# Deleting the database removes all its table definitions too.
aws glue delete-database --name hvt_retail_db
```

### Step 5 — Delete the Athena workgroup

```bash
aws athena delete-work-group --work-group hvt-retail-wg --recursive-delete-option
```

### Step 6 — Delete the CloudWatch alarm and CloudTrail trail

```bash
aws cloudwatch delete-alarms --alarm-names hvt-retail-cost-alarm

# Stop logging first, then delete the trail.
aws cloudtrail stop-logging --name hvt-retail-trail
aws cloudtrail delete-trail --name hvt-retail-trail
```

### Step 7 — Revoke Lake Formation grants

Revoke the permissions you granted so the principals no longer hold catalog access.
Replace the principal ARN with the one you granted to in lesson 05.

```bash
aws lakeformation revoke-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::$ACCOUNT_ID:user/hvt-admin \
  --resource '{ "Database": { "Name": "hvt_retail_db" } }' \
  --permissions "ALL"
```

Negative
: If a revoke errors because the grant was already removed when you deleted the Glue
database in step 4, that is fine — there is nothing left to revoke. Move on.

### Step 8 — Delete the IAM policies and roles

Detach managed policies and delete inline policies before deleting each role, or the
delete is rejected. Delete the standalone analyst policy from lesson 05 too.

```bash
# Standalone customer-managed policy from lesson 05.
aws iam delete-policy \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/hvt-retail-analyst-policy

# Glue ETL role (lesson 03-2).
aws iam delete-role-policy --role-name hvt-retail-glue-etl-role --policy-name hvt-retail-glue-s3
aws iam detach-role-policy --role-name hvt-retail-glue-etl-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole
aws iam delete-role --role-name hvt-retail-glue-etl-role

# Glue crawler role (lesson 02).
aws iam delete-role-policy --role-name hvt-retail-glue-crawler-role --policy-name hvt-retail-glue-s3-read
aws iam detach-role-policy --role-name hvt-retail-glue-crawler-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole
aws iam delete-role --role-name hvt-retail-glue-crawler-role

# Redshift serving role (lesson 03-3).
aws iam delete-role --role-name hvt-retail-redshift-role

# Step Functions states role (lesson 04).
aws iam delete-role-policy --role-name hvt-retail-states-role --policy-name hvt-retail-states-invoke
aws iam delete-role --role-name hvt-retail-states-role
```

Positive
: If a role has other attached policies you added while experimenting, the delete
will name them. List them with `aws iam list-attached-role-policies --role-name <name>`
and `aws iam list-role-policies --role-name <name>`, detach or delete each, then retry.

### Step 9 — Schedule the KMS key for deletion

You cannot delete a KMS key instantly; you schedule it. Use the minimum seven-day
window. The key stops being usable immediately and bills nothing once deletion
completes.

```bash
KEY_ID=$(aws kms describe-key --key-id alias/hvt-retail-lake-key \
  --query 'KeyMetadata.KeyId' --output text)

aws kms schedule-key-deletion --key-id "$KEY_ID" --pending-window-in-days 7

# Remove the alias so the name is free.
aws kms delete-alias --alias-name alias/hvt-retail-lake-key
```

### Step 10 — Empty and delete the S3 bucket, last

Everything else is gone, so the lake can finally come down. Empty it first — a bucket
with objects refuses to delete — then remove the bucket itself.

```bash
# Empty all data: raw, bronze, silver, gold, scripts, athena-results.
aws s3 rm "s3://$BUCKET" --recursive

# If you ever enabled versioning, also purge versions and delete markers, then re-run
# the line above. Finally, remove the now-empty bucket.
aws s3 rb "s3://$BUCKET"
```

Negative
: Deleting the bucket is irreversible and takes your raw data with it. That is the
intended end state for this track. If you want to keep a copy, download `raw/` before
you run step 10, or regenerate it any time with `python dataset/generate_data.py`.

## Verify the account is empty
Duration: 2:00

Confirm the teardown worked. Each of these should come back empty (or without your
HitaVir Retail resources).

```bash
# No bucket — should error "NoSuchBucket" or simply not list yours.
aws s3 ls | grep hvt-retail || echo "No hvt-retail buckets — good."

# No catalog database.
aws glue get-databases --query "DatabaseList[?Name=='hvt_retail_db']"

# No Redshift Serverless workgroups or namespaces.
aws redshift-serverless list-workgroups --query "workgroups[?workgroupName=='hvt-retail-wg']"
aws redshift-serverless list-namespaces --query "namespaces[?namespaceName=='hvt-retail-ns']"

# No state machine, schedule, alarm, or trail.
aws stepfunctions list-state-machines --query "stateMachines[?name=='hvt-retail-pipeline']"
aws scheduler list-schedules --query "Schedules[?Name=='hvt-retail-daily-pipeline']"
aws cloudwatch describe-alarms --alarm-names hvt-retail-cost-alarm --query "MetricAlarms"
aws cloudtrail describe-trails --query "trailList[?Name=='hvt-retail-trail']"
```

Empty results everywhere mean the pipeline is fully gone. The `aws s3 ls`,
`aws glue get-databases`, and `aws redshift-serverless list-workgroups` checks coming
back without any `hvt-retail` entries are your three headline confirmations.

Positive
: Finally, open **Billing and Cost Management**, then **Cost Explorer**, and look at
the next day or two. With every resource deleted, your `project=hvt-retail` cost tag
should trend to zero. The KMS key shows a small charge until its seven-day deletion
window closes, then it too goes to zero. If anything is still costing money, work back
through the steps above to find what survived.

Negative
: One thing you should **keep**: the `hvt-admin` IAM user, the budget, and the billing
alarm from lesson 00. They cost nothing and they protect your account. Only the data
pipeline resources come down.

## What's next
Duration: 1:00

That is the whole track. You built a complete, automated, governed AWS lake house for
HitaVir Retail — raw to bronze to silver to gold, cataloged, transformed, served,
scheduled, and secured — and then you tore it all down cleanly so it costs you nothing.

You now know what a data engineer does, you have done all six key functions for real,
and you have a running mental model of the modern AWS data architecture. Take the
where-to-go-next list, pick one direction, and keep building.

Thank you for working through **Data Engineering on AWS: Foundations**. Share feedback
or say hello at [github.com/hitavirtech](https://github.com/hitavirtech).

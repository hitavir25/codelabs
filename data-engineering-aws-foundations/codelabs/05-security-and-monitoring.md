author: HitaVirTech
summary: Lock down the HitaVir Retail lake with least-privilege IAM, Lake Formation column permissions, and KMS encryption, then watch it with CloudWatch, CloudTrail, and cost tags.
id: hvt-de-aws-05-security
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Data engineering security and monitoring

## Overview
Duration: 5:00

Your HitaVir Retail lake works. Raw data lands, Glue ETL refines it from **raw to
bronze to silver to gold**, the Glue catalog (`hvt_retail_db`) describes it, and
Athena queries the gold tables. So far you have been the only user, working as a
full admin. That is fine for building. It is not fine for running.

In this lab you wrap the lake in layers of protection and put eyes on it. You give
an analyst exactly the access they need and nothing more, hide a sensitive column
from them, encrypt the data at rest, and wire up alarms and an audit trail so you
notice trouble before your users do.

### What you'll build

- A **least-privilege** IAM policy: read-only on the lake bucket plus Athena, and
  nothing else.
- A **Lake Formation** grant that lets an analyst read the `customers` table but
  hides the `email` column from them.
- **Default encryption at rest** on the lake bucket using a **KMS** key you own.
- A **CloudWatch** alarm that fires on Glue job failures, and a **CloudTrail** trail
  that records every API call for audit.
- The **cost allocation tag** scheme `project=hvt-retail` and `env=dev`, activated
  so spend shows up per project.

### What you'll learn

- How to write and attach a tight IAM policy instead of handing out admin.
- How Lake Formation governs the lake down to the column.
- The difference between encryption at rest and encryption in transit.
- How CloudWatch and CloudTrail together give you metrics, logs, alarms, and audit.
- How tags turn into a cost view you can read.

### Prerequisites

- Codelabs 00 through 04 completed: a configured AWS CLI, the lake bucket
  `hvt-retail-datalake-<your-account-id>`, the Glue database `hvt_retail_db`, and
  gold tables you can query in Athena.
- You are working as your `hvt-admin` user, not root.

### Services used

IAM, AWS Lake Formation, AWS KMS, Amazon S3, Amazon Athena, Amazon CloudWatch,
AWS CloudTrail, AWS Cost Explorer / cost allocation tags.

### Cost and time

- **Cost:** about **$1/month** while this lab's resources exist, almost all of it
  the KMS key. Your first CloudTrail trail and basic CloudWatch metrics and alarms
  are free tier. The mandatory cleanup at the end removes the recurring cost.
- **Time:** about 55 minutes.

### The concept visual

Open the defense-in-layers visual. It shows IAM, Lake Formation, KMS, CloudWatch,
and CloudTrail as protective rings wrapping the data lake, each labeled with the one
job it does.

Visual: [`assets/05-security-layers.html`](../assets/05-security-layers.html)

Negative
: One service here is not free. **KMS** charges roughly **$1 per month** for each
customer-managed key, plus a tiny per-request fee. That is the price of owning your
own encryption key. The cleanup step schedules the key for deletion so the charge
stops.

## Setup
Duration: 3:00

Set a few shell variables so every command below is copy-paste ready. Run these in
the terminal where your `hvt-admin` profile is configured.

```bash
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export REGION=us-east-1
export BUCKET=hvt-retail-datalake-$ACCOUNT_ID
export DB=hvt_retail_db

echo "Account: $ACCOUNT_ID   Bucket: $BUCKET   Region: $REGION"
```

Confirm the lake and catalog from earlier labs are reachable. Both commands should
return without error.

```bash
aws s3 ls s3://$BUCKET/
aws glue get-database --name $DB --query 'Database.Name' --output text
```

Positive
: Everything in this lab stays in `us-east-1` and is named with the `hvt-retail-`
prefix and tagged `project=hvt-retail env=dev`. That consistency is what makes the
cleanup step a quick, complete sweep.

## Write and attach a least-privilege IAM policy
Duration: 10:00

**Least privilege** is the principle of granting an identity only the permissions it
truly needs, and no more. An **IAM policy** is the JSON document that lists those
permissions. Right now anyone using `hvt-admin` can delete the whole lake. An analyst
who only runs `SELECT` queries should never be able to do that.

You will create a read-only analyst user and give it a policy that allows reading the
lake bucket and running Athena queries, but denies every write and delete.

### Create the analyst user

**Console path**

1. Open **IAM**, choose **Users**, then **Create user**.
2. Name the user `hvt-retail-analyst`. Leave console access off; this is an API user.
3. Skip permissions for now (you attach the custom policy next). Create the user.

**AWS CLI**

```bash
aws iam create-user \
  --user-name hvt-retail-analyst \
  --tags Key=project,Value=hvt-retail Key=env,Value=dev
```

### Write the policy

Save this as `analyst-readonly.json`. It allows listing and reading objects in the
lake bucket, the Athena and Glue catalog read actions a query needs, and the Athena
query-results workgroup location. It allows no `Put`, no `Delete`, no `Create`.

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

Substitute your real account id into the resource ARNs, then create and attach the
policy.

**AWS CLI**

```bash
# Replace the placeholder with your real account id
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

1. In **IAM**, choose **Policies**, then **Create policy**.
2. Switch to the **JSON** tab and paste the document above (with your account id).
3. Name it `hvt-retail-analyst-readonly` and create it.
4. Open **Users**, select `hvt-retail-analyst`, choose **Add permissions**, then
   **Attach policies directly**, and attach `hvt-retail-analyst-readonly`.

Positive
: Because the policy lists only read actions, you do not need an explicit `Deny`
for writes. IAM denies everything that is not explicitly allowed. The analyst simply
has no path to `s3:DeleteObject`.

## Govern the lake with Lake Formation column permissions
Duration: 12:00

**AWS Lake Formation** is a governance service that sits on top of the Glue catalog
and controls who can read which databases, tables, and even which columns. The IAM
policy above controls access to the *bucket and the query engine*. Lake Formation
controls access to the *data the catalog describes*, and it can do something IAM
alone cannot: a **column-level permission**, where you grant access to a table but
withhold specific columns.

The `customers` table has an `email` column. An analyst studying loyalty tiers by
region has no business reading customer emails. You will grant them `SELECT` on
`customers` for every column except `email`.

### Register the bucket with Lake Formation

Lake Formation can only govern data it manages. Register the lake bucket once so
Lake Formation, not raw IAM, brokers access to its catalog data.

**Console path**

1. Open **Lake Formation**. If prompted, add yourself (`hvt-admin`) as a
   **Data lake administrator**.
2. Choose **Administration**, then **Data lake locations**, then **Register location**.
3. Set the S3 path to `s3://hvt-retail-datalake-<your-account-id>` and use the
   **AWSServiceRoleForLakeFormationDataAccess** service-linked role. Register it.

**AWS CLI**

```bash
aws lakeformation register-resource \
  --resource-arn arn:aws:s3:::$BUCKET \
  --use-service-linked-role
```

### Grant the analyst a column-filtered SELECT

Grant `SELECT` on the `customers` table to the analyst, excluding the `email`
column. Lake Formation supports an `EXCLUDED_COLUMN_NAMES` filter so you name the
columns to hide rather than listing every column to allow.

**AWS CLI**

```bash
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

1. In **Lake Formation**, choose **Data permissions**, then **Grant**.
2. Under **Principals**, pick the IAM user `hvt-retail-analyst`.
3. Under **LF-Tags or catalog resources**, choose the database `hvt_retail_db` and
   the table `customers`.
4. For **Table permissions**, check **Select**.
5. For **Data permissions**, choose **Column-based access**, then
   **Exclude columns**, and select `email`.
6. Grant.

Negative
: Registering a location in Lake Formation means Lake Formation now arbitrates
access to that data. If a previously working query suddenly returns
`Insufficient Lake Formation permissions`, it is because the grant has not been made
yet, not because the data moved. Grant `SELECT` to the principals that need it.

## Encrypt the lake at rest with KMS
Duration: 8:00

Encryption comes in two forms, and a secure lake uses both.

- **Encryption at rest** scrambles the bytes while they sit on disk in S3, so a
  stolen drive or a misconfigured bucket leaks nothing readable.
- **Encryption in transit** protects data moving over the network. AWS already does
  this for you: every S3 and Athena API call uses **TLS** (the protocol behind
  HTTPS) by default, so data in flight is encrypted without any action on your part.

**KMS** (AWS Key Management Service) creates and controls encryption keys. You will
make a customer-managed KMS key and set it as the bucket's default, so S3
automatically encrypts every new object with it. This is **SSE-KMS**:
server-side encryption with a KMS key.

### Create a KMS key

**AWS CLI**

```bash
export KEY_ID=$(aws kms create-key \
  --description "hvt-retail lake data encryption key" \
  --tags TagKey=project,TagValue=hvt-retail TagKey=env,TagValue=dev \
  --query 'KeyMetadata.KeyId' --output text)

# A friendly alias so you never juggle the raw key id
aws kms create-alias \
  --alias-name alias/hvt-retail-lake \
  --target-key-id $KEY_ID

echo "KMS key: $KEY_ID"
```

**Console path**

1. Open **KMS**, choose **Customer managed keys**, then **Create key**.
2. Choose **Symmetric**, then **Encrypt and decrypt**. Next.
3. Alias it `hvt-retail-lake`. Add tags `project=hvt-retail` and `env=dev`.
4. Set yourself (`hvt-admin`) as key administrator and key user. Finish.

### Set the bucket's default encryption to SSE-KMS

Save this as `encryption.json`:

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

1. Open **S3**, choose the bucket `hvt-retail-datalake-<your-account-id>`.
2. Open the **Properties** tab, find **Default encryption**, choose **Edit**.
3. Pick **Server-side encryption with AWS KMS keys (SSE-KMS)**, choose the
   `hvt-retail-lake` key, enable **Bucket Key**, and save.

Positive
: `BucketKeyEnabled` is a free win. It cuts the number of KMS calls S3 makes by
caching a bucket-level data key, which trims the per-request KMS cost without
weakening encryption.

## Watch the lake with CloudWatch and CloudTrail
Duration: 9:00

**CloudWatch** is AWS's monitoring service: it collects metrics, stores logs, and
fires **alarms** when a metric crosses a threshold you set. **CloudTrail** is the
audit service: it records who called which API, when, and from where. CloudWatch
tells you *something is wrong*; CloudTrail tells you *who did what*.

### Alarm on Glue job failures

Glue publishes a `glue.driver.aggregate.numFailedTasks` metric. Alarm when a job in
your ETL pipeline fails so you hear about a broken run from CloudWatch, not from a
user staring at stale gold tables.

**AWS CLI**

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

**Console path**

1. Open **CloudWatch**, choose **Alarms**, then **Create alarm**, then
   **Select metric**.
2. Choose the **Glue** namespace and the `numFailedTasks` metric for your job.
3. Set the condition to **Greater/Equal** to **1** over a 5-minute period.
4. Optionally add an SNS email notification, then name it
   `hvt-retail-glue-job-failures` and create.

Positive
: You can alarm on cost the same way. In `us-east-1`, the Billing namespace exposes
`EstimatedCharges`; an alarm at, say, greater than 5 USD gives you a real-time
tripwire that complements the monthly budget from codelab 00.

### Turn on a CloudTrail audit trail

A trail records every management API call into an S3 bucket so you have a permanent,
queryable record of who registered a location, granted a permission, or deleted an
object. Your first trail is free.

**AWS CLI**

```bash
# A dedicated, private bucket to hold the audit logs
aws s3api create-bucket --bucket hvt-retail-cloudtrail-$ACCOUNT_ID --region $REGION

# Allow CloudTrail to write to it (save as trail-bucket-policy.json first)
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

**Console path**

1. Open **CloudTrail**, choose **Trails**, then **Create trail**.
2. Name it `hvt-retail-audit`, let it create a new S3 bucket for the logs.
3. Keep **Management events** on, then create the trail. Logging starts automatically.

## Apply the cost allocation tag scheme
Duration: 4:00

A **cost allocation tag** is a tag AWS recognizes in billing, so spend can be sliced
by tag value. You have been tagging resources `project=hvt-retail` and `env=dev` all
along. The last step is to *activate* those tags in billing so they show up as a cost
dimension in Cost Explorer.

**Console path**

1. Open **Billing and Cost Management**, then **Cost allocation tags**.
2. Find `project` and `env` under **User-defined cost allocation tags**.
3. Select both and choose **Activate**.

**AWS CLI**

```bash
aws ce update-cost-allocation-tags-status \
  --cost-allocation-tags-status \
      TagKey=project,Status=Active \
      TagKey=env,Status=Active
```

Once active, you can group costs by the `project` tag in Cost Explorer and see
exactly what HitaVir Retail spends.

Positive
: Tag activation is not retroactive — it starts attributing cost from activation
forward. Activate cost tags early in a real project so the history is there when you
need it.

## Checkpoint
Duration: 3:00

Prove the layers work. First, confirm the bucket reports SSE-KMS as its default
encryption.

```bash
aws s3api get-bucket-encryption --bucket $BUCKET \
  --query 'ServerSideEncryptionConfiguration.Rules[0].ApplyServerSideEncryptionByDefault'
```

You should see `"SSEAlgorithm": "aws:kms"`. Encryption at rest is on.

Now prove least privilege. Create an access key for the analyst and a temporary CLI
profile for it.

```bash
aws iam create-access-key --user-name hvt-retail-analyst
# Configure a throwaway profile named "analyst" with the returned keys
aws configure --profile analyst
```

As the analyst, a read succeeds:

```bash
aws s3 ls s3://$BUCKET/ --profile analyst
```

As the analyst, a write is **denied** — this is the result you want to see:

```bash
echo "should fail" > deny-test.txt
aws s3 cp deny-test.txt s3://$BUCKET/deny-test.txt --profile analyst
# Expected: An error occurred (AccessDenied) ...
```

If the read returns the lake contents and the write returns `AccessDenied`, your
least-privilege policy is correct. In Athena, the same analyst can `SELECT` from
`customers` but the `email` column is hidden by Lake Formation.

Positive
: That asymmetry — read works, write is denied, one column is invisible — is the
whole point of this lab. The analyst can do their job and cannot do anyone else's.

## Troubleshooting
Duration: 3:00

- **`AccessDenied` when the analyst runs a valid `SELECT` in Athena** — Athena also
  needs a place to write query results. Confirm the analyst's workgroup has an output
  location they can read, and that the bucket policy does not block it.
- **`Insufficient Lake Formation permissions` on `customers`** — registering the
  bucket put Lake Formation in charge. Grant the analyst `SELECT` (with the column
  filter) as shown above; the IAM policy alone is not enough once a location is
  registered.
- **`KMS.DisabledException` or `AccessDenied` reading objects after encryption** — the
  principal reading the object also needs `kms:Decrypt` on the key. Add the analyst
  as a key user, or include `kms:Decrypt` in their policy for the key ARN.
- **CloudTrail `InsufficientS3BucketPolicyException`** — the log bucket policy is
  missing or has the wrong account id. Re-apply `trail-bucket-policy.json` with your
  real account id substituted in both ARNs.
- **The Glue alarm sits in `INSUFFICIENT_DATA`** — that metric only appears after a
  Glue job has run at least once. Trigger your codelab 04 job, and use
  `--treat-missing-data notBreaching` so no runs does not look like a failure.

## Cleanup
Duration: 5:00

This lab created the only recurring charge in the track (the KMS key), so cleanup is
mandatory. Run these in order.

```bash
# 1. Detach and delete the least-privilege policy, then the analyst user
aws iam detach-user-policy --user-name hvt-retail-analyst \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/hvt-retail-analyst-readonly
aws iam delete-policy \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/hvt-retail-analyst-readonly
# Delete any access keys you created for the analyst, then the user
aws iam delete-user --user-name hvt-retail-analyst

# 2. Revoke the Lake Formation grant
aws lakeformation revoke-permissions \
  --principal DataLakePrincipalIdentifier=arn:aws:iam::$ACCOUNT_ID:user/hvt-retail-analyst \
  --permissions SELECT \
  --resource '{ "TableWithColumns": { "DatabaseName": "'"$DB"'", "Name": "customers", "ColumnWildcard": { "ExcludedColumnNames": ["email"] } } }'

# 3. Delete the CloudWatch alarm
aws cloudwatch delete-alarms --alarm-names hvt-retail-glue-job-failures

# 4. Stop and delete the CloudTrail trail
aws cloudtrail stop-logging --name hvt-retail-audit
aws cloudtrail delete-trail --name hvt-retail-audit

# 5. Schedule the KMS key for deletion (minimum 7-day waiting period)
aws kms delete-alias --alias-name alias/hvt-retail-lake
aws kms schedule-key-deletion --key-id $KEY_ID --pending-window-in-days 7
```

Negative
: KMS will not delete a key instantly — the minimum **waiting period is 7 days**, a
safety net so you cannot lose data by deleting a key in haste. The key is *disabled*
during the window and the monthly charge stops once it is scheduled. If you change
your mind, run `aws kms cancel-key-deletion --key-id $KEY_ID` before the window ends.

Optionally, you can leave the bucket's default encryption pointed at a key you keep,
or reset it to S3-managed encryption (SSE-S3, which is free) so new objects stay
encrypted at no cost:

```bash
aws s3api put-bucket-encryption --bucket $BUCKET \
  --server-side-encryption-configuration \
  '{ "Rules": [ { "ApplyServerSideEncryptionByDefault": { "SSEAlgorithm": "AES256" } } ] }'
```

Leave the cost allocation tags active; they cost nothing and keep your billing view
useful.

## What's next
Duration: 1:00

Your lake is now governed, encrypted, watched, and audited. You gave an analyst
exactly the access they need, hid a sensitive column, encrypted the data at rest,
and put alarms and an audit trail in place — the same controls a real data platform
runs in production.

Next you will put the whole track together: an assessment to check your understanding,
then a capstone where you build the full pipeline end to end and grade yourself.

Continue to **Codelab 06: Assessment and capstone**.

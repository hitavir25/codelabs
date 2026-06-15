authors: HitaVirTech
summary: Design the HitaVir Retail data lake on S3 — Medallion layers, partitioning, storage classes, lifecycle rules, and Parquet versus CSV.
id: hvt-de-aws-03-1-storage
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Storage and the data lake

## Overview
Duration: 5:00

In the last labs you uploaded the HitaVir Retail raw files to Amazon S3 and let a
crawler catalog them. Now you turn that pile of files into a **data lake**: a single
storage layer that holds raw and refined data side by side, cheaply, and lets many
tools query the same bytes. This is the foundation every later lab builds on.

You will design the lake the way real teams do — in **Medallion** layers, where data
moves from **raw to bronze to silver to gold**, getting cleaner and more query-ready
at each step. You will lay out partitioned prefixes, pick storage classes, automate
cost with a lifecycle rule, and learn why **Parquet** beats CSV for analytics.

### What you'll learn

- What a data lake is and why the Medallion layout (raw, bronze, silver, gold) keeps it sane.
- How to partition data so queries scan less and cost less.
- The S3 storage classes and how a lifecycle rule moves data between them automatically.
- Why Parquet is cheaper and faster to query than CSV.

### What you'll build

- The `bronze/`, `silver/`, and `gold/` prefixes under your lake bucket.
- A partitioned-prefix layout for `silver/orders/`.
- An S3 lifecycle rule that transitions raw data to a cheaper storage class after 30 days.

### Prerequisites

- Codelab 00 finished: an `hvt-admin` IAM user and a configured AWS CLI.
- The lake bucket `hvt-retail-datalake-<your-account-id>` with raw CSVs already at
  `s3://hvt-retail-datalake-<account-id>/raw/` (from codelab 01).

### Services used

Amazon S3, S3 Lifecycle, AWS CLI.

### Cost and time

- **Cost:** about $0. S3 storage for this tiny dataset is a fraction of a cent, and
  the free tier covers it. Lifecycle rules are free.
- **Time:** about 50 minutes.

### The concept visual

Open the lake-house diagram. It shows the Medallion layers color-coded and the
service stack that sits on top of S3 — the same picture for this lab and the next two.

Visual: [`assets/03-lakehouse-architecture.html`](../assets/03-lakehouse-architecture.html)

## Setup
Duration: 4:00

Set two shell variables so every command below is copy-paste ready. Find your account
id from codelab 00, or read it back now.

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET="hvt-retail-datalake-${ACCOUNT_ID}"
echo "$BUCKET"
```

Confirm the bucket exists and the raw data is there. An object listing under `raw/`
means you are ready.

```bash
aws s3 ls "s3://${BUCKET}/raw/"
```

Positive
: A **data lake** is a single storage layer (here, one S3 bucket) that holds data in
its native format at any scale, so many engines — Athena, Glue, Redshift — can read
the same files without copying them around.

## Design the lake: the Medallion layers
Duration: 7:00

Before you create anything, understand the layout you are building. The **Medallion**
design splits the lake into quality tiers, named after medals, so anyone can tell how
trustworthy a dataset is by which prefix it lives in.

- **raw** — the original source files, byte-for-byte, never edited. Your safety net.
- **bronze** — raw copied into the lake and given proper column types. Still messy,
  but now inside the lake's structure.
- **silver** — cleaned, de-duplicated, conformed, and **partitioned**. This is what
  most queries read.
- **gold** — business-ready aggregates, like daily sales by region, ready to serve.

Each layer is just a **prefix** (a path segment, like a folder) in the one bucket.
The full lake looks like this:

```text
s3://hvt-retail-datalake-<account-id>/
├── raw/        already here  — untouched source CSVs
├── bronze/     you create    — typed copies
├── silver/     you create    — cleaned + partitioned
└── gold/       you create    — aggregates to serve
```

Negative
: Never let a tool write back into `raw/`. The whole point of the raw layer is that
it is immutable, so you can always rebuild every other layer from it.

## Create the lake prefixes
Duration: 5:00

S3 has no real folders — a "prefix" is created the moment an object exists under it.
To make the layers visible and self-documenting, drop a tiny zero-byte marker object
into each one.

**Console path**

1. Open the **S3** console and choose your bucket `hvt-retail-datalake-<account-id>`.
2. Choose **Create folder**, name it `bronze`, and create it. S3 stores this as a
   zero-byte object named `bronze/`.
3. Repeat for `silver` and `gold`.

**AWS CLI**

Create an empty local marker and copy it into each layer prefix.

```bash
touch .keep

for layer in bronze silver gold; do
  aws s3 cp .keep "s3://${BUCKET}/${layer}/.keep"
done

rm .keep
```

Confirm all four layers now exist at the top of the bucket.

```bash
aws s3 ls "s3://${BUCKET}/"
```

You should see `raw/`, `bronze/`, `silver/`, and `gold/`.

## Partition the silver layer
Duration: 8:00

A **partition** is a way of splitting a dataset into folders by the value of a column,
so a query that filters on that column can skip every folder it does not need. Instead
of scanning all orders, a query for one region on one day reads only that one slice.

For HitaVir Retail you partition `orders` by `region` and `order_date`, because almost
every business question filters on one or both. The convention is `key=value` in the
prefix — Athena and Glue read these names automatically and turn them into queryable
columns.

```text
silver/orders/
├── region=us-east/
│   ├── order_date=2025-01-01/  part-0000.parquet
│   └── order_date=2025-01-02/  part-0000.parquet
├── region=us-west/
│   └── order_date=2025-01-01/  part-0000.parquet
└── region=eu-central/
    └── order_date=2025-01-01/  part-0000.parquet
```

You will not write the Parquet files yet — that is the Glue ETL job in codelab 03-2.
Here, just create one example partition prefix so the layout is concrete and you can
see the `key=value` pattern in a listing.

```bash
touch .keep
aws s3 cp .keep \
  "s3://${BUCKET}/silver/orders/region=us-east/order_date=2025-01-01/.keep"
rm .keep

aws s3 ls "s3://${BUCKET}/silver/orders/" --recursive
```

Positive
: Good partition keys are columns you filter on often and that have a moderate number
of values. `region` (a handful of values) and `order_date` (one per day) are ideal.
Partitioning on `order_id`, which is unique per row, would create millions of tiny
folders and make things slower, not faster.

## Choose a storage class
Duration: 6:00

A **storage class** is the tier S3 keeps an object in, trading retrieval speed and
access cost against storage price. You pick the class per object, and you can change
it over time. The ones that matter for a lake:

| Storage class | Best for | Relative storage cost |
|---|---|---|
| S3 Standard | Hot data queried often (silver, gold) | Baseline |
| S3 Standard-IA | Infrequent access, kept warm (aging raw, bronze) | Lower storage, small retrieval fee |
| S3 Glacier Instant Retrieval | Rarely read, but needed instantly | Much lower |
| S3 Glacier Deep Archive | Compliance archive, retrieval in hours | Lowest |

New objects land in **S3 Standard** by default, which is right for data you query
constantly. The trick is to not pay Standard prices forever for cold raw files. You
do not move them by hand — you let a lifecycle rule do it, next.

## Apply a lifecycle rule
Duration: 8:00

A **lifecycle rule** is an automatic policy on the bucket that moves or deletes objects
as they age, with no code and no scheduler. You will add one rule: raw data older than
30 days transitions from S3 Standard to **S3 Standard-IA**, cutting its storage cost
once it stops being hot.

**Console path**

1. In the **S3** console, open your bucket and go to the **Management** tab.
2. Choose **Create lifecycle rule**.
3. Name it `hvt-retail-raw-to-ia`.
4. Under **Choose a rule scope**, select **Limit the scope** and set the prefix to
   `raw/`.
5. Under **Lifecycle rule actions**, check **Move current versions of objects between
   storage classes**.
6. Choose **Standard-IA**, set **Days after object creation** to `30`, and save.

**AWS CLI**

Save this policy as `lifecycle.json`. It scopes the rule to the `raw/` prefix and
transitions matching objects to Standard-IA after 30 days.

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

Apply it to the bucket:

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket "$BUCKET" \
  --lifecycle-configuration file://lifecycle.json
```

Positive
: The rule applies to existing objects too, by age. A raw file uploaded 31 days ago
moves at the next daily evaluation; a fresh upload moves 30 days from now. S3 evaluates
lifecycle rules once a day, so transitions are not instant.

## Parquet versus CSV
Duration: 5:00

Your raw files are CSV — fine for landing data, wrong for querying it at scale. From
the silver layer on, this track stores data as **Parquet**.

**Parquet** is a columnar, compressed file format built for analytics. "Columnar"
means values from the same column are stored together, instead of row by row like CSV.
That one difference drives every advantage:

| | CSV | Parquet |
|---|---|---|
| Layout | Row by row | Column by column |
| Reads only needed columns | No — scans whole rows | Yes — skips unused columns |
| Compression | Poor (mixed types per row) | Strong (one type per column) |
| Schema and types | None, all text | Stored in the file |
| Athena scan cost | High | Low |

Because Athena bills by **bytes scanned**, a query like `SELECT amount FROM orders`
reads only the `amount` column from Parquet but the entire file from CSV. On real
datasets that is the difference between scanning megabytes and gigabytes — Parquet is
both cheaper and faster for the same query.

Negative
: Parquet is a poor fit for the raw landing zone, where you want the source format
untouched and human-readable. Keep raw as CSV; convert to Parquet on the way into
silver. That conversion is the Glue ETL job in the next codelab.

## Checkpoint: prove the lake is laid out
Duration: 3:00

Two checks. First, confirm all four Medallion prefixes exist.

```bash
aws s3 ls "s3://${BUCKET}/"
```

You should see `raw/`, `bronze/`, `silver/`, and `gold/`, plus the partitioned
`silver/orders/region=us-east/order_date=2025-01-01/` path under a recursive listing.

Second, confirm the lifecycle rule is live by reading it back from the bucket.

```bash
aws s3api get-bucket-lifecycle-configuration --bucket "$BUCKET"
```

You should see the `hvt-retail-raw-to-ia` rule, `Enabled`, scoped to `raw/`, with a
30-day transition to `STANDARD_IA`. If both checks pass, your lake is designed.

## Troubleshooting
Duration: 3:00

- **`NoSuchLifecycleConfiguration` on get** — the `put` did not land. Re-run the
  `put-bucket-lifecycle-configuration` command and confirm `lifecycle.json` is valid
  JSON in the directory you ran from.
- **`MalformedXML` or a schema error on put** — a typo in `lifecycle.json`, often a
  wrong key like `StorageClasss` or a missing `Status`. Compare against the snippet above.
- **Prefixes do not appear in `aws s3 ls`** — the `.keep` markers did not upload.
  Re-run the create-prefixes loop and check `aws s3 ls "s3://${BUCKET}/" --recursive`.
- **`AccessDenied`** — your CLI is not the `hvt-admin` user, or you are in the wrong
  account. Run `aws sts get-caller-identity` and confirm the account id matches `$BUCKET`.
- **Transition seems to do nothing** — that is expected. Lifecycle rules evaluate once
  a day and only act on objects past the age threshold. Nothing transitions instantly.

## Cleanup
Duration: 3:00

This lab creates no billable resources worth deleting, but clean up the rule and the
empty marker prefixes so the bucket stays tidy for the next labs.

Remove the lifecycle rule:

```bash
aws s3api delete-bucket-lifecycle --bucket "$BUCKET"
```

Remove the empty marker objects you added (this leaves `raw/` and its data untouched):

```bash
aws s3 rm "s3://${BUCKET}/bronze/.keep"
aws s3 rm "s3://${BUCKET}/silver/.keep"
aws s3 rm "s3://${BUCKET}/gold/.keep"
aws s3 rm "s3://${BUCKET}/silver/orders/region=us-east/order_date=2025-01-01/.keep"
```

Negative
: Keep the bucket itself. Every later lab writes into this same
`hvt-retail-datalake-<account-id>` lake — do **not** delete the bucket or the `raw/`
data. You only removed the lifecycle rule and the empty placeholder markers.

## What's next
Duration: 1:00

Your lake is designed: four Medallion layers, a partitioned silver layout, a storage
class plan, and a lifecycle rule keeping cold data cheap. You also know why Parquet is
the right format for everything above raw.

Next you fill the lake. In **Codelab 03-2: Transform with Glue ETL (PySpark)** you
write a Glue job that reads raw CSV, cleans and types it, partitions it by region and
order date, and writes Parquet into the silver layer you just laid out.

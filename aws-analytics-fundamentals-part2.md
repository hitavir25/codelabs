summary: Fundamentals of Analytics on AWS - Part 2 - Data Lakes, Data Warehouses, and Modern Data Architecture
id: aws-analytics-fundamentals-part2
categories: AWS, Analytics, Cloud, Data Engineering
tags: aws, analytics, data-lake, data-warehouse, lake-house, modern-data-architecture, redshift, s3, lake-formation, glue, athena, quicksight, beginner, fundamentals
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Fundamentals of Analytics on AWS - Part 2

## Overview
Duration: 5:00

![AWS](aws-icons/aws.png)

```
  +============================================================+
  |                                                            |
  |      AWS ANALYTICS FUNDAMENTALS - PART 2                   |
  |                                                            |
  |  Data Lakes  -  Data Warehouses  -  Modern Architecture    |
  |                                                            |
  |                 Powered by HitaVir Tech                    |
  +============================================================+
```

Welcome to **Fundamentals of Analytics on AWS - Part 2** by **HitaVir Tech**!

In Part 1 you built the mental model — analytics concepts, the 5 Vs, and the AWS services that solve each V. In Part 2 you will zoom out and learn **how those services combine** into production architectures used by real companies today.

### Where Part 1 Ends and Part 2 Begins

| Part 1 — The Ingredients | Part 2 — The Recipe |
|--------------------------|---------------------|
| 🧠 What is analytics / ML? | 🏛️ What is a data warehouse? |
| 📏 The 5 Vs diagnostic | 🪣 What is a data lake? |
| ☁️ One service per V | 🧩 How they combine into a Lake House |
| 🛠️ S3 → Glue → Athena mini lab | 🗺️ Reference architectures for 6 real use cases |

### What You Will Master

| Pillar | Topics |
|--------|--------|
| 🪣 **Data Lakes** | What, why, zones, governance |
| 🏛️ **Data Warehouses** | Columnar MPP, star schemas, Redshift |
| 🏡 **Modern Data Architecture** | Lake House — combining both worlds |
| ☁️ **AWS Services** | S3, Lake Formation, Redshift, Glue, Athena, Kinesis, QuickSight |
| 🗺️ **Reference Architectures** | Batch BI, Streaming, ML, Log analytics, 360° customer, Data mesh |
| 🎯 **Common Use Cases** | When to pick which pattern |

### Why Architecture Matters More Than Services

```
  +================================================================+
  |                                                                |
  |   Services are Lego bricks.   Architecture is the castle.      |
  |                                                                |
  |   Any junior can spin up S3 + Redshift.                        |
  |   Seniors know WHEN to use which, WHY, and HOW they join.      |
  |                                                                |
  +================================================================+
```

### Estimated Duration

**2-3 hours** (concept-heavy, no new hands-on required — uses Part 1 lab as the anchor)

### How to Use This Codelab

| If you are... | Do this |
|---------------|---------|
| 🎓 A student new to cloud | Read top-to-bottom; pause at each reference architecture |
| 🛠️ A working engineer | Skim sections 1-3, deep-read the reference architectures for patterns you ship |
| 🏗️ A solution architect | Use the reference diagrams as whiteboard starters with stakeholders |
| 🔖 A reference reader | Jump to the Quiz, the Cheat Sheet, and the Appendix of Resources |

> 💡 **HitaVir Tech says:** "Services change names every few years — Glue was DataPipeline, Kinesis was Kafka-on-AWS, SageMaker was ML-on-EC2. But the **shapes** of data architectures stay stable for decades. Master the shapes. You will pick up the services in a week."

## Prerequisites
Duration: 3:00

### What You Should Know

**Required**
- ✅ **Part 1 of this codelab** (5 Vs + AWS services per V)
- 💻 Laptop with a modern browser
- ☁️ AWS account (free tier; only for the optional hands-on snippets)
- 🧮 Basic SQL (SELECT, FROM, JOIN, GROUP BY)

**Helpful**
- 📝 Completed the Part 1 S3 → Glue → Athena lab
- 📚 Familiarity with JSON / CSV / Parquet

### Mental Model You Already Have (From Part 1)

```
  +--------------------------------------------------------------+
  |   5 Vs framework          AWS service toolkit                |
  |   -------------------     ----------------------             |
  |   Volume                  S3, Glacier, Redshift, EMR         |
  |   Variety                 Glue, Athena, Rekognition, ...     |
  |   Velocity                Kinesis, Firehose, Lambda, MSK     |
  |   Veracity                DataBrew, Glue DQ, Macie, ...      |
  |   Value                   QuickSight, SageMaker, Forecast    |
  +--------------------------------------------------------------+
```

In Part 2 we **compose** these services into proven shapes.

### No Paid Resources Required

Part 2 is concept-heavy. Every diagram is annotated with the services you already met in Part 1. The Part 1 hands-on lab is the practical anchor — this codelab teaches the architectures that scale it up.

> ⚠️ **If you choose to experiment** with Redshift or Kinesis: they can exit the free tier quickly. Use serverless modes and destroy resources the same day.

## Course Map
Duration: 3:00

```
  +==============================================================+
  |         SECTION  1  -  ARCHITECTURES (the big three)         |
  +==============================================================+
```

Three architecture patterns power **95% of modern analytics** in production:

```
                    +----------------------+
                    |  1.  DATA LAKE       |
                    |  Store anything,     |
                    |  cheap and forever   |
                    +----------+-----------+
                               |
                               | grew alongside
                               v
                    +----------------------+
                    |  2.  DATA WAREHOUSE  |
                    |  Fast SQL on         |
                    |  curated tables      |
                    +----------+-----------+
                               |
                               | combined into
                               v
                    +----------------------+
                    |  3.  LAKE HOUSE      |
                    |  (Modern Data Arch.) |
                    |  Best of both        |
                    +----------------------+
```

**Part 2 tours each architecture**, shows the AWS services that implement it, then demonstrates how real companies blend all three for different use cases.

## Introduction to Data Lakes
Duration: 8:00

```
  +==============================================================+
  |              ARCHITECTURE  1   -   DATA  LAKE                |
  |              "Store first, schema later."                    |
  +==============================================================+
```

![S3](aws-icons/s3.png) ![Lake Formation](aws-icons/lake-formation.png) ![Glue Catalog](aws-icons/glue-catalog.png)

### What is a Data Lake?

🪣 A **data lake** is a centralized repository that stores **any type of data** — structured, semi-structured, unstructured — **at any scale**, in its **native format**, typically on cheap object storage like Amazon S3.

The defining move: you **ingest now** and **decide the schema later** (called *schema-on-read*). Contrast with warehouses, which demand *schema-on-write*.

### Data Lake — The Core Idea

```
  +------------------------------------------------------------+
  |                                                            |
  |   ANY DATA  --->   S3 (object store)   --->  ANY ENGINE    |
  |                                                            |
  |   CSV, JSON,        cheap, durable,         Athena,        |
  |   Parquet, logs,    infinite scale,         Redshift,      |
  |   images, PDFs,     one source of truth     EMR,           |
  |   Kafka events                              SageMaker      |
  |                                                            |
  +------------------------------------------------------------+
```

One lake. Many engines. That is the core promise.

### Why Data Lakes Emerged

Before ~2010, analytics meant **warehouses** — expensive, schema-strict, row-limited. Then data exploded:

| Problem With Warehouse-Only World | Who Felt It |
|-----------------------------------|-------------|
| 💸 Warehouse storage cost $1000s / TB / month | Every CFO |
| 🚫 Could not store PDFs, images, videos | Healthcare, retail, media |
| 🐢 Schema changes took weeks | Fast-moving startups |
| ⛔ Historical data deleted to save cost | Regulated industries |

Data lakes fixed this by leveraging **cheap object storage** (S3 at ~$0.023 / GB / month) and **decoupling compute from storage**.

### Data Lake Zones — The Medallion Pattern

```
  s3://hitavirtech-lake/
    |
    +-- raw/          <--  BRONZE:  untouched, as ingested
    |                      + source of truth
    |                      + can replay anything from here
    |
    +-- curated/      <--  SILVER:  cleaned, typed, Parquet
    |                      + deduped, quality-checked
    |                      + partitioned for fast scans
    |
    +-- analytics/    <--  GOLD:    pre-aggregated, BI-ready
                           + joins done once
                           + powers dashboards and ML features
```

| Zone | Icon | Shape | Readers |
|------|:---:|-------|---------|
| **Raw / Bronze** | 🥉 | Original bytes — CSV, JSON, images, dumps | Data engineers only |
| **Curated / Silver** | 🥈 | Cleaned, typed, often Parquet + partitions | Analysts, ML engineers |
| **Analytics / Gold** | 🥇 | Aggregated, ready for dashboards and models | Business users, BI tools |

### Data Lake on AWS — The Service Stack

![S3](aws-icons/s3.png) ![Lake Formation](aws-icons/lake-formation.png) ![Glue](aws-icons/glue.png) ![Glue Catalog](aws-icons/glue-catalog.png) ![Athena](aws-icons/athena.png)

| Layer | Icon | Purpose | Service |
|-------|:---:|---------|---------|
| **Storage** | 🪣 | Raw bytes, infinite scale | Amazon S3 |
| **Governance** | 🔐 | Permissions, row/column security | AWS Lake Formation |
| **Cataloging** | 📚 | Schema + partitions metadata | AWS Glue Data Catalog |
| **ETL** | 🕸️ | Move raw → curated → analytics | AWS Glue ETL, EMR |
| **Query** | 🔍 | SQL on lake files | Amazon Athena |
| **ML** | 🤖 | Train on lake data directly | Amazon SageMaker |

### Service Spotlight — AWS Lake Formation

![Lake Formation](aws-icons/lake-formation.png)

```
  +--------------------------------------------------------------+
  |  AWS  LAKE  FORMATION  -  Governance for S3 Data Lakes       |
  +--------------------------------------------------------------+
  |  Permissions :  Table / column / row-level grants            |
  |  Discovery   :  Blueprint ingestion from DBs, logs           |
  |  Auditing    :  Every access logged to CloudTrail            |
  |  Catalog     :  Wraps the Glue Data Catalog with RBAC        |
  |                                                              |
  |  Turns a raw S3 bucket into a governed, multi-tenant lake.   |
  +--------------------------------------------------------------+
```

Lake Formation is what lets **one S3 bucket serve 20 teams** without everyone seeing everyone else's columns.

### Data Lake Strengths and Weaknesses

| Strength | Icon | Weakness | Icon |
|----------|:---:|----------|:---:|
| Cheap per GB | 💰 | Can become a "data swamp" without governance | 🐊 |
| Any format | 🧩 | Query performance < a warehouse on the same data | 🐢 |
| Separates storage and compute | 🔀 | Schema enforcement is optional (and often skipped) | 🫥 |
| Multi-engine access (Athena, Spark, Redshift, ML) | 🌐 | Harder for business users to self-serve | 😵 |

### The Data Swamp — How Lakes Fail

```
  +--------------------------------------------------------------+
  |                                                              |
  |   NO CATALOG         ->  "Which bucket has customers?"       |
  |   NO QUALITY RULES   ->  "Why are 40% of amounts negative?"  |
  |   NO GOVERNANCE      ->  "Who deleted last quarter's data?"  |
  |   NO LIFECYCLE       ->  "We're paying for 2014 clickstream" |
  |                                                              |
  |             ==>  DATA SWAMP  (useless, expensive)            |
  +--------------------------------------------------------------+
```

Every successful data lake is paired with **Glue Catalog + Lake Formation + quality rules + lifecycle policies**. Skip these and your lake drowns.

> 💡 **HitaVir Tech says:** "A data lake without a catalog is a data swamp. A data lake without quality rules is a liability. Governance is not optional — it is the difference between an asset and a landfill."

> 🪣 **Data lake in one line:** store everything cheaply, govern it strictly, query it from any engine.

## Introduction to Data Warehousing
Duration: 8:00

```
  +==============================================================+
  |           ARCHITECTURE  2   -   DATA  WAREHOUSE              |
  |           "Fast SQL on curated, trusted data."               |
  +==============================================================+
```

![Redshift](aws-icons/redshift.png) ![EMR](aws-icons/emr.png)

### What is a Data Warehouse?

🏛️ A **data warehouse** is a centralized, highly-structured database optimized for **analytical queries** — aggregations, joins, and scans across billions of rows — at interactive speeds.

Key properties:

| Property | Icon | What It Means |
|----------|:---:|---------------|
| **Schema-on-write** | 📝 | Every row fits a predefined schema at load time |
| **Columnar storage** | 📊 | Stores columns together, not rows — 10-100× faster scans |
| **MPP (Massively Parallel Processing)** | ⚡ | Splits work across many nodes automatically |
| **Optimized for reads** | 📖 | Writes are slower; reads are lightning-fast |
| **Business-user friendly** | 👥 | Clean star schemas; analysts can self-serve SQL |

### Row vs Columnar Storage

```
  ROW STORE (OLTP, e.g. MySQL)
  ----------------------------
  [id | name | country | amount]  <-- each row stored together

  Great for:  "Get everything about order 1042"
  Bad for:    "SUM(amount) across 1B rows"

  COLUMNAR STORE (OLAP, e.g. Redshift, Parquet)
  ---------------------------------------------
  [id][id][id]...
  [name][name][name]...
  [country][country][country]...
  [amount][amount][amount]...      <-- each column stored together

  Great for:  "SUM(amount) across 1B rows"  (scan only one column)
  Bad for:    "Get everything about order 1042"
```

**Warehouses use columnar.** That one design choice is why they can aggregate billions of rows in seconds.

### Star Schema — The Warehouse Language

Most warehouse tables follow the **star schema**:

```
                    +---------------------+
                    |   DIM_CUSTOMER      |
                    |   (who bought)      |
                    +----------+----------+
                               |
                               |
  +---------------+    +---------------+    +---------------+
  | DIM_PRODUCT   |----|  FACT_SALES   |----|  DIM_DATE     |
  | (what sold)   |    |  (the event)  |    | (when sold)   |
  +---------------+    +-------+-------+    +---------------+
                               |
                               |
                    +----------+----------+
                    |   DIM_STORE         |
                    |   (where sold)      |
                    +---------------------+
```

- 🌟 **Fact table** — the measurable events (one row per sale, click, payment)
- 📐 **Dimension tables** — the context (who, what, when, where)

Star schemas make queries fast AND readable: `SELECT country, SUM(amount) FROM fact_sales JOIN dim_store ...`.

### Service Spotlight — Amazon Redshift

![Redshift](aws-icons/redshift.png)

```
  +--------------------------------------------------------------+
  |  AMAZON  REDSHIFT  -  AWS's Managed Data Warehouse           |
  +--------------------------------------------------------------+
  |  Category     :  Columnar MPP warehouse                      |
  |  Modes        :  Serverless  |  Provisioned (RA3)            |
  |  Scale        :  GBs to petabytes                            |
  |  SQL dialect  :  PostgreSQL-flavored                         |
  |  Superpowers  :  Redshift Spectrum, Redshift ML, Data Share  |
  |                                                              |
  |  The engine behind Nasdaq, McDonald's, Yelp analytics.       |
  +--------------------------------------------------------------+
```

### Redshift Spectrum — Warehouse Queries Over the Lake

```
                 +----------------------------+
                 |  Redshift Cluster          |
                 |  (hot, curated tables)     |
                 +-------------+--------------+
                               |
                               | joins across
                               v
                 +----------------------------+
                 |  S3 Data Lake via Spectrum |
                 |  (cold, historical data)   |
                 +----------------------------+
```

One SQL query spans **both** the warehouse (recent, hot) and the lake (years of history). No duplicate storage, no duplicate pipelines.

### Redshift Loading Patterns

| Source | Icon | Loader | Speed |
|--------|:---:|--------|:-----:|
| S3 files | 🪣 | `COPY` command (parallel) | 🚀 |
| Kinesis Streams | 🌊 | Redshift streaming ingestion | 🚀 |
| Operational DBs (MySQL, Postgres) | 🗄️ | AWS DMS + CDC | 🏃 |
| SaaS apps (Salesforce, etc.) | ☁️ | AWS AppFlow or partner tools | 🚶 |

### Data Warehouse Strengths and Weaknesses

| Strength | Icon | Weakness | Icon |
|----------|:---:|----------|:---:|
| Sub-second SQL on billions of rows | ⚡ | Expensive per TB stored | 💸 |
| Business-analyst friendly | 👥 | Rigid schema — changes need migrations | 🔒 |
| Mature BI tool ecosystem | 📊 | Only handles structured data | 📋 |
| ACID transactions and governance baked-in | 🛡️ | Locked into one vendor's engine | 🔗 |

### Lake vs Warehouse — The Canonical Comparison

```
  +--------------------+------------------------+------------------------+
  |  ATTRIBUTE         |  DATA  LAKE            |  DATA  WAREHOUSE       |
  +--------------------+------------------------+------------------------+
  |  Data type         |  Anything              |  Structured only       |
  |  Schema            |  On read               |  On write              |
  |  Cost / TB stored  |  $  (cheap)            |  $$$$  (expensive)     |
  |  Query speed       |  Medium                |  Fast                  |
  |  Users             |  Engineers, data sci.  |  Analysts, business    |
  |  AWS example       |  S3 + Glue + Athena    |  Redshift              |
  +--------------------+------------------------+------------------------+
```

> 💡 **HitaVir Tech says:** "Warehouses are optimized for the answers you know you want. Lakes are optimized for the answers you haven't invented questions for yet. Real companies need both. The next section shows how to stop choosing and combine them."

> 🏛️ **Warehouse in one line:** columnar + MPP + star schema = fast answers for business users.

## Introduction to Modern Data Architecture
Duration: 10:00

```
  +==============================================================+
  |       ARCHITECTURE  3   -   MODERN  DATA  ARCHITECTURE       |
  |          (aka the "Lake House" pattern)                      |
  +==============================================================+
```

![S3](aws-icons/s3.png) ![Lake Formation](aws-icons/lake-formation.png) ![Redshift](aws-icons/redshift.png) ![Athena](aws-icons/athena.png) ![Glue](aws-icons/glue.png) ![QuickSight](aws-icons/quicksight.png) ![SageMaker](aws-icons/sagemaker.png)

### The Problem Modern Data Architecture Solves

By 2018, most companies had **both** a lake and a warehouse — and suffered:

| Pain | Icon | Symptom |
|------|:---:|---------|
| Two copies of the truth | 👯 | Lake says one number, warehouse says another |
| Pipeline sprawl | 🕸️ | 200 jobs shuffling data between them |
| Permission chaos | 🔐 | IAM for S3, Redshift grants, separate audits |
| Skill silos | 🧑‍💻 | Data engineers in Spark, analysts in SQL, no common tool |
| ML engineers stuck | 🤖 | Data scientists denied warehouse access, scraping lakes by hand |

### The Modern Data Architecture Idea

```
  +==============================================================+
  |                                                              |
  |    ONE GOVERNED PLATFORM                                     |
  |                                                              |
  |    - Unified storage  (S3 data lake = source of truth)       |
  |    - Purpose-built engines  (pick the right tool per job)    |
  |    - Shared catalog + governance  (Lake Formation)           |
  |    - Seamless movement  (Spectrum, Athena, zero-ETL)         |
  |    - Common security model  (IAM + Lake Formation + KMS)     |
  |                                                              |
  +==============================================================+
```

Instead of lake **or** warehouse, you get lake **and** warehouse — unified by one catalog, one permission model, one lineage.

### The Five Pillars of Modern Data Architecture

```
     +--------+     +--------+     +--------+     +--------+     +--------+
     |   1    |     |   2    |     |   3    |     |   4    |     |   5    |
     | SCALABLE|    |PURPOSE-|    |SEAMLESS|    |UNIFIED |    |FUTURE- |
     |   DATA  |    |  BUILT |    |  DATA  |    |GOVERN- |    |  PROOF |
     |   LAKE  |    | ENGINES|    |MOVEMENT|    |  ANCE  |    |   ML   |
     +---------+    +--------+    +--------+    +--------+    +--------+
         |              |              |              |              |
         v              v              v              v              v
       S3 +         Athena,        Spectrum,      Lake Form.    SageMaker,
       Lake         Redshift,      Zero-ETL,      + IAM +       Bedrock,
       Form.        EMR, OS,       Federated      KMS + Q       Glue ML
                    DynamoDB        query
```

### Pillar 1 — A Scalable Data Lake at the Core

![S3](aws-icons/s3.png)

Every modern architecture **starts from S3**. Why S3?

| Reason | Icon | Impact |
|--------|:---:|--------|
| Infinite scale | ♾️ | Never outgrow it |
| 11 nines durability | 🛡️ | Your data is safer than on any disk |
| Pennies per GB | 💰 | Keep history forever |
| Native reader for Athena, Redshift, EMR, Glue, SageMaker | 🌐 | One source, many consumers |

### Pillar 2 — Purpose-Built Engines

One-size-fits-all is dead. Pick the right engine per workload:

| Workload | Icon | Engine | Why |
|----------|:---:|--------|-----|
| Ad-hoc SQL on lake files | 🔍 | **Athena** | Pay per query, zero setup |
| Dashboards on curated tables | 🏛️ | **Redshift** | Sub-second BI |
| Petabyte Spark jobs | 🐘 | **EMR** | Custom transforms at scale |
| Sub-ms lookups | ⚡ | **DynamoDB** | Key-value queries |
| Full-text + log search | 🔎 | **OpenSearch** | Observability and logs |
| Real-time aggregation | 🎯 | **Kinesis Data Analytics** | Streaming SQL / Flink |

### Pillar 3 — Seamless Data Movement

Instead of 200 brittle ETL jobs, modern architectures rely on:

- 🚀 **Zero-ETL integrations** — e.g. Aurora → Redshift with no pipeline code
- 🌐 **Federated queries** — Redshift and Athena querying live RDS, DynamoDB, and S3
- 🔭 **Redshift Spectrum** — warehouse SQL reaches into lake files
- 📡 **Kinesis to Redshift / OpenSearch streaming ingestion**
- 🔗 **Redshift Data Sharing** — share live tables across accounts, no copies

### Pillar 4 — Unified Governance

![Lake Formation](aws-icons/lake-formation.png) ![IAM](aws-icons/iam.png) ![KMS](aws-icons/kms.png) ![Macie](aws-icons/macie.png) ![CloudTrail](aws-icons/cloudtrail.png)

| Layer | Icon | Service | Purpose |
|-------|:---:|---------|---------|
| Identity | 🔑 | IAM | Who you are |
| Fine-grained access | 🔐 | Lake Formation | What columns / rows you see |
| Encryption | 🔒 | KMS | At-rest and in-transit |
| PII scanning | 🕵️ | Macie | Find sensitive data in S3 |
| Audit | 📜 | CloudTrail | Every API call, every query |
| Data discovery | 🧭 | DataZone | Business-friendly data catalog |

### Pillar 5 — Built-in AI / ML

![SageMaker](aws-icons/sagemaker.png) ![Bedrock](aws-icons/bedrock.png)

ML is no longer a bolt-on — it lives **inside** the platform:

| Capability | Icon | Service |
|------------|:---:|---------|
| Full ML lifecycle | 🤖 | SageMaker |
| Foundation models (Claude, Llama, Titan) | 🧠 | Bedrock |
| SQL-native ML in the warehouse | 🔮 | Redshift ML |
| No-code ML in the lake | 📈 | SageMaker Canvas |
| Natural-language BI | 💬 | Amazon Q in QuickSight |

### The Modern Data Architecture — One Picture

```
  +==================================================================+
  |                                                                  |
  |   +---------+   +---------+   +---------+   +---------+          |
  |   | Batch   |   | Stream  |   | OpTx DB |   | SaaS    |          |
  |   | files   |   | events  |   | (CDC)   |   | apps    |          |
  |   +----+----+   +----+----+   +----+----+   +----+----+          |
  |        |             |             |             |               |
  |        +-------------+-------------+-------------+               |
  |                             |                                    |
  |                             v                                    |
  |     +-----------------------------------------------------+      |
  |     |    AMAZON S3  --- Centralized Data Lake             |      |
  |     |    Raw  ->  Curated  ->  Analytics  (Parquet)       |      |
  |     +---------------------------+-------------------------+      |
  |                                 |                                |
  |                  governed by    |                                |
  |                                 v                                |
  |     +-----------------------------------------------------+      |
  |     |  LAKE FORMATION + GLUE CATALOG + IAM + KMS + MACIE  |      |
  |     +-----------------------------------------------------+      |
  |                                 |                                |
  |       +------------+------------+------------+-------------+     |
  |       |            |            |            |             |    |
  |       v            v            v            v             v    |
  |   +-------+   +---------+   +-----+   +-----------+   +------+  |
  |   | Athena|   |Redshift |   | EMR |   | OpenSearch|   |Sage- |  |
  |   |  SQL  |   |  MPP    |   |Spark|   |   Search  |   |Maker |  |
  |   +---+---+   +----+----+   +--+--+   +-----+-----+   +--+---+  |
  |       |            |           |             |           |      |
  |       +------------+-----------+-------------+-----------+      |
  |                                 |                                |
  |                                 v                                |
  |            +----------------------------------------+            |
  |            |   VALUE  =  QuickSight + Amazon Q + apps|           |
  |            +----------------------------------------+            |
  |                                                                  |
  +==================================================================+
```

Look carefully: **every service from Part 1 has a home.** That is modern data architecture.

### Modern Data Architecture — In One Sentence

> **Centralize storage in a governed S3 lake. Use the best engine for each workload. Let data move frictionlessly between them. Secure it all uniformly. Build ML natively on top.**

> 💡 **HitaVir Tech says:** "Don't build one monolith. Don't build 20 silos. Build one lake, with many engines, one catalog, one security model. That's how AWS's biggest analytics customers run."

> 🏡 **Lake House in one line:** one lake for storage, many engines for compute, one catalog for trust.

## AWS Services for Modern Data Architecture
Duration: 10:00

```
  +==============================================================+
  |         THE  COMPLETE  AWS  SERVICE  MAP                     |
  |            for Modern Data Architecture                      |
  +==============================================================+
```

### The Headline Cast for Part 2

![S3](aws-icons/s3.png) ![Lake Formation](aws-icons/lake-formation.png) ![Glue](aws-icons/glue.png) ![Athena](aws-icons/athena.png) ![Redshift](aws-icons/redshift.png) ![EMR](aws-icons/emr.png) ![Kinesis Streams](aws-icons/kinesis-streams.png) ![Firehose](aws-icons/kinesis-firehose.png) ![OpenSearch](aws-icons/opensearch.png) ![QuickSight](aws-icons/quicksight.png) ![SageMaker](aws-icons/sagemaker.png) ![DataZone](aws-icons/datazone.png)

Each service answers a specific question in the modern architecture:

| Layer | Question | Service | Icon |
|-------|----------|---------|:---:|
| Storage | Where does my data live? | Amazon S3 | 🪣 |
| Governance | Who can see what? | AWS Lake Formation | 🏗️ |
| Catalog | What data do we have? | AWS Glue Data Catalog | 📚 |
| ETL | How do I shape it? | AWS Glue ETL, EMR | 🕸️ |
| SQL on lake | How do I explore? | Amazon Athena | 🔍 |
| SQL on warehouse | How do I serve BI? | Amazon Redshift | 🏛️ |
| Stream ingest | How do I handle real time? | Kinesis + Firehose + MSK | 🌊 |
| Search | How do I query logs? | Amazon OpenSearch | 🔎 |
| BI | How do people see it? | Amazon QuickSight | 📊 |
| ML | How do we predict? | Amazon SageMaker | 🤖 |
| Discovery | How do business users find data? | Amazon DataZone | 🧭 |

### Service Spotlight — Amazon DataZone

![DataZone](aws-icons/datazone.png)

```
  +--------------------------------------------------------------+
  |  AMAZON  DATAZONE  -  Business-Friendly Data Catalog         |
  +--------------------------------------------------------------+
  |  Audience    :  Business analysts, product managers          |
  |  Features    :  Search by business term, request access      |
  |  Integrates  :  Glue Catalog, Redshift, S3, third-party      |
  |  ML assist   :  Auto-generate descriptions for tables        |
  |                                                              |
  |  Bridges the "I need data" gap between teams and engineers.  |
  +--------------------------------------------------------------+
```

### Zero-ETL — The Quiet Revolution

Classic ETL means writing code to extract-transform-load between systems. Zero-ETL makes AWS **automatically** replicate curated data between services:

```
  +----------------+           +-----------------------+
  | Aurora MySQL   |  ==ETL==> | Redshift (analytics)  |
  |  (app DB)      |  managed  |                       |
  +----------------+           +-----------------------+

  Supported today:
  - Aurora  -> Redshift
  - RDS     -> Redshift
  - DynamoDB -> OpenSearch
  - S3      -> Redshift  (auto-copy)
```

Fewer pipelines to maintain. Fresher analytics. Less on-call pain.

### AWS Glue — The Connective Tissue

![Glue](aws-icons/glue.png) ![Crawler](aws-icons/glue-crawler.png) ![Catalog](aws-icons/glue-catalog.png) ![DataBrew](aws-icons/glue-databrew.png) ![Data Quality](aws-icons/glue-dq.png)

In a modern architecture, Glue is **everywhere**:

| Capability | Icon | Role |
|------------|:---:|------|
| Crawlers | 🕷️ | Auto-discover schemas in S3 |
| Data Catalog | 📚 | The shared metadata layer |
| ETL jobs (Spark / Python) | 🕸️ | Transform raw → curated |
| DataBrew | 🧪 | No-code cleaning for analysts |
| Data Quality | 🛡️ | Rules enforced on every run |
| Workflows | 🧭 | Orchestrate multi-job pipelines |

### A Mental Shortcut — The Service Lookup Table

When someone describes a problem, scan this table first:

| Problem Sounds Like... | Reach For |
|------------------------|-----------|
| "We have terabytes piling up and need cheap storage" | 🪣 S3 + 🧊 Glacier |
| "Analysts want SQL on 1B rows, must return in seconds" | 🏛️ Redshift |
| "We dump random files hourly, want ad-hoc SQL" | 🔍 Athena + 🕸️ Glue |
| "Events come at 1M / sec and drive a live dashboard" | 🌊 Kinesis + 🎯 K. Analytics |
| "Logs need to be searchable with keyword filters" | 🔎 OpenSearch |
| "We keep 2 copies of the same data in lake and warehouse" | 🔭 Redshift Spectrum / Zero-ETL |
| "We need to share a slice with another AWS account" | 🔗 Redshift Data Sharing / Lake Formation grants |
| "Non-engineers can't find any data" | 🧭 DataZone |
| "We want the CEO to ask questions in English" | 💬 Amazon Q in QuickSight |

> 💡 **HitaVir Tech says:** "When a junior asks 'which AWS service should we use?', the senior reply is another question — 'what is the actual pattern?' Service choice without pattern = tech for tech's sake."

## Common Use Cases
Duration: 10:00

```
  +==============================================================+
  |         SECTION  2   -   COMMON  USE  CASES                  |
  |           (where the patterns show up in real life)          |
  +==============================================================+
```

Most real-world analytics work on AWS falls into **six repeatable patterns**. Recognize them and you'll know which reference architecture to reach for.

### The Six Patterns

```
  +-----------------------------------------------------------+
  |  1.  BATCH  BI           - nightly dashboards             |
  |  2.  REAL-TIME  ANALYTICS- live metrics, fraud, IoT       |
  |  3.  LOG  /  APP  OBS.   - search + troubleshoot logs     |
  |  4.  CUSTOMER  360       - unify profiles across sources  |
  |  5.  ML  /  PREDICTIVE   - forecast, recommend, score     |
  |  6.  DATA  MESH          - domain-owned, shared data      |
  +-----------------------------------------------------------+
```

### Use Case 1 — Batch Business Intelligence

**Who needs it:** Every company with a CFO.

**Shape:** Operational databases + flat files → data lake → warehouse → dashboards.

| Trait | Value |
|-------|-------|
| Freshness | Daily or hourly |
| Volume | GB to TB |
| Velocity V | 🐢 Batch |
| Core service | 🏛️ Redshift |

**Example prompt:** "Revenue by region compared to last quarter, refreshed every morning at 8 am."

### Use Case 2 — Real-Time Analytics

**Who needs it:** Rideshare, fintech, ad-tech, IoT, online gaming.

**Shape:** Events → Kinesis → stream processor → live dashboard **and** S3 for history.

| Trait | Value |
|-------|-------|
| Freshness | Sub-second to seconds |
| Volume | Millions of events / sec |
| Velocity V | ⚡ Streaming |
| Core service | 🌊 Kinesis + 🎯 Kinesis Analytics |

**Example prompt:** "Alert the risk team the moment any card transaction looks fraudulent."

### Use Case 3 — Log & Application Observability

**Who needs it:** Every engineering team at scale.

**Shape:** Application logs → Firehose → OpenSearch + S3 archive.

| Trait | Value |
|-------|-------|
| Freshness | Seconds |
| Volume | TB/day in logs |
| Velocity V | ⚡ Streaming |
| Core service | 🔎 OpenSearch |

**Example prompt:** "Search the last 30 days of production logs for any mention of this request ID."

### Use Case 4 — Customer 360

**Who needs it:** Retail, banking, telecom, SaaS.

**Shape:** Unify profiles from CRM, web, mobile, support into one view, served to marketing + ML.

| Trait | Value |
|-------|-------|
| Freshness | Hourly |
| Volume | TB |
| Dominant V | 🧩 Variety |
| Core service | 🪣 S3 + 🕸️ Glue + 🏛️ Redshift |

**Example prompt:** "Show one customer's full lifetime journey — ads seen, orders placed, tickets filed."

### Use Case 5 — ML / Predictive Analytics

**Who needs it:** Forecasting, recommendations, fraud, churn, dynamic pricing.

**Shape:** Lake → feature store → model training → model endpoint → prediction served in app or BI.

| Trait | Value |
|-------|-------|
| Freshness | Training weekly, inference real-time |
| Volume | GB to PB of history |
| Dominant V | 💎 Value |
| Core service | 🤖 SageMaker + 🪣 S3 |

**Example prompt:** "Predict which customers will churn next month so we can retain them."

### Use Case 6 — Data Mesh

**Who needs it:** Enterprises with many product teams owning their own data.

**Shape:** Each domain team curates its own data products on S3; a central catalog (Lake Formation + DataZone) makes them discoverable and access-controlled.

| Trait | Value |
|-------|-------|
| Freshness | Per-domain |
| Ownership | Distributed to domain teams |
| Dominant V | 🛡️ Veracity + 💎 Value |
| Core service | 🏗️ Lake Formation + 🧭 DataZone |

**Example prompt:** "The Finance team owns 'invoices', Marketing owns 'campaigns', but anyone at the company can discover and request access."

### Picking the Right Pattern — Decision Cheat

```
                What is the dominant question?
                            |
       +-------+---+-----+----+-----+----+-------+
       |       |         |         |    |       |
    Weekly   Instant  Find a    One     Predict  Federated
    KPIs     alerts   log line  360 view future   ownership
       |       |         |         |    |       |
       v       v         v         v    v       v
     BATCH   REAL-    LOG      CUSTOMER  ML /   DATA
      BI     TIME     OBS.      360      PRED.   MESH
```

> 💡 **HitaVir Tech says:** "New engineers try to force every problem into the pattern they already know. Seniors look at the dominant V and pick the shape — then fill in services. Diagnose first. Build second."

## Reference Architecture
Duration: 12:00

```
  +==============================================================+
  |           SECTION  3  -  REFERENCE  ARCHITECTURES            |
  +==============================================================+
```

For each use case, here is a whiteboard-ready AWS architecture you can copy, adapt, and defend in a design review.

### Reference 1 — Batch BI on a Lake House

![S3](aws-icons/s3.png) ![Glue](aws-icons/glue.png) ![Redshift](aws-icons/redshift.png) ![QuickSight](aws-icons/quicksight.png)

```
  Operational DBs (RDS, Aurora)      SaaS apps (Salesforce)
           |                                |
           +---- AWS DMS (CDC) ----+  AppFlow
                                   |
                                   v
            +--------------------------------------+
            |     Amazon S3 Data Lake              |
            |     raw -> curated (Parquet)         |
            +---------------+----------------------+
                            |
                            v  (Glue ETL, Data Quality, Catalog)
                            |
            +---------------+----------------------+
            |   Amazon Redshift (curated tables)   |
            |   - Star schemas                     |
            |   - Nightly loads via COPY           |
            +---------------+----------------------+
                            |
                            v
                   Amazon QuickSight
                     (SPICE dashboards)
                            |
                            v
                        Executives
```

**When to pick it:** Finance, ops, exec reporting. Stable queries, predictable loads.

### Reference 2 — Real-Time Analytics

![Kinesis Streams](aws-icons/kinesis-streams.png) ![Firehose](aws-icons/kinesis-firehose.png) ![Kinesis Analytics](aws-icons/kinesis-analytics.png) ![Lambda](aws-icons/lambda.png) ![OpenSearch](aws-icons/opensearch.png) ![S3](aws-icons/s3.png) ![QuickSight](aws-icons/quicksight.png)

```
  Producers (apps, IoT, clickstream)
             |
             v
   +-------------------------+
   |  Kinesis Data Streams   |
   |  (durable, ordered)     |
   +------------+------------+
                |
    +-----------+------------+------------+
    |                        |            |
    v                        v            v
 Kinesis Analytics         Lambda       Firehose
 (continuous SQL)       (alerting on    |
    |                    anomalies)     v
    |                        |        S3 lake
    v                        v      (Parquet, hist.)
 Live dashboard            SNS/SQS          |
 (QuickSight or              |              v
 OpenSearch dash.)        Ops team      Athena
                          phone          ad-hoc
```

**When to pick it:** Fraud detection, live pricing, real-time personalization, IoT.

### Reference 3 — Log & Application Observability

![CloudTrail](aws-icons/cloudtrail.png) ![Firehose](aws-icons/kinesis-firehose.png) ![OpenSearch](aws-icons/opensearch.png) ![S3](aws-icons/s3.png)

```
  App servers / containers / Lambda / CloudTrail
                      |
                      v
              Kinesis Firehose
                      |
           +----------+-----------+
           |                      |
           v                      v
      OpenSearch               S3 (cold)
      (hot, 30 days)           (cheap, years)
           |                      |
           v                      v
      Kibana / OS           Athena for historical
      Dashboards            search and audits
```

**When to pick it:** SRE and platform teams, security logs, microservice observability.

### Reference 4 — Customer 360

![S3](aws-icons/s3.png) ![Glue](aws-icons/glue.png) ![Redshift](aws-icons/redshift.png) ![SageMaker](aws-icons/sagemaker.png)

```
  CRM        Web events     Mobile app     Support tickets
    |            |              |                |
    +------------+------+-------+----------------+
                        |
                        v
             S3 Data Lake (raw)
                        |
                        v  Glue ETL + Data Quality
                        |
             S3 Data Lake (curated)
                        |
                        v
      +-----------------+------------------+
      |                                    |
      v                                    v
   Redshift                          SageMaker
   Unified Customer                  Features + Models
   table (serving BI)               (churn, LTV, NBA)
      |                                    |
      v                                    v
   QuickSight 360                  Marketing automation
   dashboard                       (personalized offers)
```

**When to pick it:** Retail, banking, telecom, subscription SaaS.

### Reference 5 — ML / Predictive Analytics

![S3](aws-icons/s3.png) ![Glue](aws-icons/glue.png) ![SageMaker](aws-icons/sagemaker.png) ![Lambda](aws-icons/lambda.png)

```
  +----------------------+
  |   S3 Data Lake       |
  |   (historical data)  |
  +----------+-----------+
             |
             v
  +----------------------+
  |  Glue / EMR          |
  |  Feature engineering |
  +----------+-----------+
             |
             v
  +-------------------------+
  |  SageMaker Feature Store|
  +-----+-----------+-------+
        |           |
  (training)    (serving)
        v           v
  SageMaker      Real-time
  Training        endpoint
   Jobs           (low-latency)
        |           |
        v           v
     Models    Mobile / web app
                (personalized UX)
```

**When to pick it:** Recommenders, fraud detection, demand forecasting, dynamic pricing.

### Reference 6 — Data Mesh

![Lake Formation](aws-icons/lake-formation.png) ![DataZone](aws-icons/datazone.png) ![S3](aws-icons/s3.png)

```
  Domain A (Orders)      Domain B (Marketing)     Domain C (Finance)
  owns its own pipes     owns its own pipes       owns its own pipes
     |                       |                         |
     v                       v                         v
  S3 bucket + Glue        S3 bucket + Glue          S3 bucket + Glue
  Catalog (Orders)        Catalog (Marketing)       Catalog (Finance)
     |                       |                         |
     +-----------+-----------+-------------------------+
                 |
                 v
       +-----------------------------------+
       |   Lake Formation  (central RBAC)  |
       |   + Amazon DataZone  (discovery)  |
       +---------------+-------------------+
                       |
          +------------+------------+
          |            |            |
          v            v            v
        Analyst    Data sci.    Executive
       (Athena)   (SageMaker)   (QS / Q)
```

**When to pick it:** Large enterprises where domain teams must own their data products, but a central platform team guarantees governance.

### Reference Architecture Comparison

| # | Pattern | Primary V | Storage | Compute | Serve |
|:-:|---------|:-------:|---------|---------|-------|
| 1 | Batch BI | Volume | S3 + Redshift | Glue, Redshift | QuickSight |
| 2 | Real-Time | Velocity | Kinesis + S3 | Kinesis Analytics, Lambda | OpenSearch, QuickSight |
| 3 | Log Obs. | Velocity + Variety | OpenSearch + S3 | Firehose | Kibana, Athena |
| 4 | 360 | Variety + Value | S3 + Redshift | Glue | QuickSight + apps |
| 5 | ML | Value | S3 | Glue, SageMaker | Endpoint in app |
| 6 | Mesh | Veracity + Value | Distributed S3 | Per-domain | Lake Formation + DataZone |

> 💡 **HitaVir Tech says:** "Architects don't memorize 50 services — they memorize 6 shapes. When someone brings a new problem, they map it to a shape first, then pick services to fit. Copy these six patterns. Most of your career, you'll be adapting one of them."

## Quiz
Duration: 7:00

```
  +==============================================================+
  |             QUIZ  -   TEST  YOUR  UNDERSTANDING              |
  +==============================================================+
```

Answer each question before revealing. No peeking — this is how you build real recall.

### Question 1 — Data Lake Fundamentals

**Which of the following best describes a data lake?**

- A. A database optimized for OLTP workloads
- B. Centralized storage for raw, varied data at any scale, queried by many engines
- C. A real-time stream processor
- D. A managed Kafka cluster

> **Answer:** B. A lake holds *any* data in native format; multiple engines (Athena, Redshift, EMR, SageMaker) read from it.

### Question 2 — Data Warehouse Property

**Which property is specific to data warehouses, not data lakes?**

- A. Schema-on-read
- B. Object storage foundation
- C. Columnar storage with MPP
- D. Storing raw unstructured data

> **Answer:** C. Columnar + MPP is the warehouse signature, enabling fast aggregation on billions of rows.

### Question 3 — Medallion Zones

**Match each zone to its typical reader:**

| Zone | Readers |
|------|---------|
| Raw (Bronze) | ? |
| Curated (Silver) | ? |
| Analytics (Gold) | ? |

> **Answer:** Raw = data engineers only. Curated = analysts and ML engineers. Analytics = business users and BI tools.

### Question 4 — Lake House Core Service

**In an AWS Modern Data Architecture, which service is the "source of truth" storage layer?**

- A. Amazon Redshift
- B. Amazon S3
- C. Amazon DynamoDB
- D. Amazon RDS

> **Answer:** B. S3. Every other analytics engine on AWS reads from it.

### Question 5 — Redshift Spectrum

**What does Redshift Spectrum enable?**

- A. Encrypting Redshift at rest
- B. Training ML models inside Redshift
- C. Running Redshift SQL directly against S3 lake files
- D. Auto-scaling the Redshift cluster

> **Answer:** C. Spectrum lets you query lake data from the warehouse — no duplicate storage.

### Question 6 — Governance

**Which service provides fine-grained (column/row) permissions on the S3 data lake?**

- A. IAM alone
- B. AWS Lake Formation
- C. Amazon Macie
- D. CloudTrail

> **Answer:** B. Lake Formation. IAM provides coarse identity; Macie finds PII; CloudTrail audits; Lake Formation **enforces** column and row-level access.

### Question 7 — Pattern Matching

**A fraud team needs to block bad transactions within 200 ms. Which pattern fits?**

- A. Batch BI (nightly Redshift)
- B. Real-Time Analytics (Kinesis + Kinesis Analytics + Lambda)
- C. Data Mesh
- D. Log Observability

> **Answer:** B. Real-time analytics with streaming + serverless alerting.

### Question 8 — Zero-ETL

**Zero-ETL between Aurora and Redshift eliminates the need to:**

- A. Pay for storage
- B. Write custom replication pipelines
- C. Create Redshift tables
- D. Secure the data

> **Answer:** B. Zero-ETL replicates changes automatically — no pipeline code to maintain.

### Question 9 — Business Data Discovery

**Which service helps non-engineers discover datasets using business terms instead of table names?**

- A. AWS Glue Crawler
- B. Amazon Macie
- C. Amazon DataZone
- D. AWS CloudTrail

> **Answer:** C. DataZone provides a business-friendly catalog on top of the Glue Catalog.

### Question 10 — Anti-Pattern

**A company stores 5 years of clickstream JSON in S3 but has no Glue Catalog, no Lake Formation, no quality rules. What is this?**

- A. A modern data lake
- B. A data swamp
- C. Data mesh
- D. Medallion architecture

> **Answer:** B. A data swamp — no catalog, no governance, no trust. Storage alone is not an architecture.

### Score Yourself

| Score | Meaning |
|:-----:|---------|
| 9-10 | 🎓 You are ready for production design reviews |
| 7-8 | 🧠 Solid. Re-read the reference architectures section |
| 5-6 | 📚 Review the three architecture chapters and retake |
| < 5 | 🔄 Re-do Part 1 first — the 5 Vs are the foundation |

> 💡 **HitaVir Tech says:** "Don't guess. The questions here are the same ones that show up in every AWS analytics interview. Know them cold."

## Course Summary
Duration: 4:00

```
  +==============================================================+
  |          CONGRATULATIONS  -  PART 2 DONE!                    |
  +==============================================================+
```

### What You Learned

**🪣 Data Lakes**

| Topic | Icon |
|-------|:---:|
| What a lake is (schema-on-read) | 📖 |
| The medallion zones (raw, curated, analytics) | 🥉🥈🥇 |
| Why lakes become swamps without governance | 🐊 |

**🏛️ Data Warehouses**

| Topic | Icon |
|-------|:---:|
| Schema-on-write, columnar, MPP | 📊 |
| Star schemas (fact + dimensions) | ⭐ |
| Redshift serverless vs provisioned | 🏛️ |
| Redshift Spectrum (querying the lake) | 🔭 |

**🏡 Modern Data Architecture (Lake House)**

| Pillar | Icon |
|--------|:---:|
| Scalable data lake | 🪣 |
| Purpose-built engines | 🧰 |
| Seamless movement (Spectrum, zero-ETL) | 🔀 |
| Unified governance | 🔐 |
| Built-in AI / ML | 🤖 |

**🗺️ Six Reference Architectures**

| # | Pattern | Core Service |
|:-:|---------|--------------|
| 1 | Batch BI | 🏛️ Redshift + 📊 QuickSight |
| 2 | Real-Time | 🌊 Kinesis + 🎯 K. Analytics |
| 3 | Log Observability | 🔎 OpenSearch |
| 4 | Customer 360 | 🪣 S3 + 🕸️ Glue + 🏛️ Redshift |
| 5 | ML / Predictive | 🤖 SageMaker + 🪣 S3 |
| 6 | Data Mesh | 🏗️ Lake Formation + 🧭 DataZone |

### The Mental Upgrade From Part 1 to Part 2

| Part 1 Gave You... | Part 2 Gave You... |
|--------------------|--------------------|
| 📏 A diagnostic framework (5 Vs) | 🗺️ Reference architectures |
| ☁️ One service per V | 🧩 Combinations that scale |
| 🛠️ A basic S3 → Glue → Athena lab | 🏡 The full Lake House picture |
| 🎯 What to pick for each bottleneck | 🎯 Which shape fits each real-world problem |

### What To Do Next

1. 🔎 **Draw one of the six reference architectures** for a project you know.
2. 💬 **Walk a teammate through it** — teaching cements understanding.
3. 🧪 **Extend the Part 1 lab:** add Glue ETL to move `raw/` → `curated/` as Parquet.
4. 📚 **Read the AWS Well-Architected Analytics Lens** (link in the Appendix).
5. 🎓 **Try the free AWS Skill Builder course** to reinforce the concepts in a different voice.

### Final Thoughts

```
  +==============================================================+
  |                                                              |
  |   Part 1  =  the 5 Vs  +  one service per V                  |
  |   Part 2  =  three architectures  +  six reference shapes    |
  |                                                              |
  |   Together  =  you can design and defend                     |
  |               an analytics platform on AWS.                  |
  |                                                              |
  +==============================================================+
```

> 💡 **HitaVir Tech says:** "You just completed the same journey a new hire at a top cloud team makes in their first three months. Keep the cheat sheet, apply the patterns, and your architecture reviews will sound like a 5-year veteran's. Fundamentals compound."

🎓 Welcome to the Lake House. See you in **Part 3** — hands-on Glue ETL, Redshift loading, and a capstone project.

— **HitaVir Tech** ☁️

## Appendix of Resources
Duration: 3:00

```
  +==============================================================+
  |               RESOURCES  AND  NEXT  STEPS                    |
  +==============================================================+
```

### Official AWS Documentation

| Topic | Icon | Where to Read |
|-------|:---:|---------------|
| Amazon S3 | 🪣 | docs.aws.amazon.com/s3 |
| AWS Lake Formation | 🏗️ | docs.aws.amazon.com/lake-formation |
| AWS Glue | 🕸️ | docs.aws.amazon.com/glue |
| Amazon Athena | 🔍 | docs.aws.amazon.com/athena |
| Amazon Redshift | 🏛️ | docs.aws.amazon.com/redshift |
| Amazon Kinesis | 🌊 | docs.aws.amazon.com/kinesis |
| Amazon OpenSearch | 🔎 | docs.aws.amazon.com/opensearch-service |
| Amazon QuickSight | 📊 | docs.aws.amazon.com/quicksight |
| Amazon SageMaker | 🤖 | docs.aws.amazon.com/sagemaker |
| Amazon DataZone | 🧭 | docs.aws.amazon.com/datazone |

### AWS Whitepapers (Free, Highly Recommended)

| Whitepaper | Icon | Why Read It |
|------------|:---:|-------------|
| AWS Well-Architected Framework — Analytics Lens | 📐 | The canonical design checklist |
| Modern Data Architecture on AWS | 🏡 | The lake house, explained by AWS itself |
| Data Analytics Lens — Reference Architectures | 🗺️ | AWS-blessed reference diagrams |
| Building a Data Lake on AWS | 🪣 | Zone design, governance patterns |
| Streaming Data Solutions | 🌊 | Choosing between Kinesis, MSK, Firehose |

### Free Training

| Resource | Icon | Provider |
|----------|:---:|----------|
| AWS Skill Builder — Analytics Learning Plan | 🎓 | aws.amazon.com/training |
| AWS Solutions Architect — Associate path | 🎯 | AWS Training |
| AWS Data Analytics Specialty certification | 🏆 | AWS Certification |

### Hands-on Labs to Try Next

- 🧪 AWS Glue Studio tutorial — visual ETL
- 🪣 Lake Formation Getting Started workshop
- 🏛️ Redshift Serverless Getting Started
- 🌊 Kinesis Data Streams Hello World
- 📊 QuickSight 10-minute demo

### Books

| Book | Why |
|------|-----|
| *Designing Data-Intensive Applications* — Martin Kleppmann | The single best data engineering book ever written |
| *The Data Warehouse Toolkit* — Ralph Kimball | Star schemas, dimensional modeling, classics |
| *Fundamentals of Data Engineering* — Joe Reis | Modern, cloud-era data engineering |

### Community

- 🐦 **#AWS** and **#DataEngineering** hashtags on LinkedIn / X
- 💬 **r/dataengineering** on Reddit — real-world war stories
- 🎥 **AWS re:Invent** talks on YouTube (free)
- 🎓 **HitaVir Tech** — stay tuned for Part 3 and capstone workshops

## Cheat Sheet - The One-Page Summary
Duration: 3:00

```
  +==============================================================+
  |           AWS  ANALYTICS  -  PART 2  CHEAT  SHEET            |
  |                  (screenshot and keep)                       |
  +==============================================================+
```

### 🪣 Data Lake in 30 Seconds

```
  Store ANY data  --->  S3 (raw | curated | analytics)
  Schema-on-READ  --->  decided at query time
  Read by         --->  Athena, Redshift, EMR, SageMaker
  Governed by     --->  Lake Formation + Glue Catalog
```

### 🏛️ Data Warehouse in 30 Seconds

```
  Columnar + MPP  --->  fast aggregation on billions of rows
  Schema-on-WRITE --->  decided before load
  Star schema     --->  fact + dimensions
  AWS service     --->  Amazon Redshift (serverless or RA3)
```

### 🏡 Modern Data Architecture in 30 Seconds

```
  One lake  +  many engines  +  one catalog  +  one security model  +  native ML
```

| Pillar | Icon | Services |
|--------|:---:|----------|
| Scalable lake | 🪣 | S3 |
| Purpose-built engines | 🧰 | Athena, Redshift, EMR, OpenSearch, DynamoDB |
| Seamless movement | 🔀 | Spectrum, Zero-ETL, Federated query |
| Unified governance | 🔐 | Lake Formation, IAM, KMS, Macie, CloudTrail |
| Built-in ML | 🤖 | SageMaker, Redshift ML, Bedrock, Amazon Q |

### 🗺️ The Six Reference Architectures

| # | Pattern | When | Core |
|:-:|---------|------|------|
| 1 | Batch BI | Daily dashboards | 🏛️ Redshift + 📊 QuickSight |
| 2 | Real-Time | Fraud, IoT, live | 🌊 Kinesis + 🎯 Analytics |
| 3 | Log Obs. | Search production logs | 🔎 OpenSearch |
| 4 | 360 | Unify customer view | 🪣 S3 + 🕸️ Glue + 🏛️ Redshift |
| 5 | ML | Predict & personalize | 🤖 SageMaker |
| 6 | Data Mesh | Enterprise domain ownership | 🏗️ Lake Formation + 🧭 DataZone |

### 🎯 The Golden Rules

- 🪣 **S3 is always the floor.** Never start an analytics platform on anything else.
- 📚 **No catalog = data swamp.** Glue Catalog + Lake Formation from day one.
- 🗂️ **Parquet + partitioning** — 10-100× cheaper queries.
- 🔭 **Use Spectrum** before duplicating lake data into Redshift.
- 🚀 **Try Zero-ETL** before writing any new replication pipeline.
- 🛡️ **Enforce data quality at ingest** — not in a dashboard post-mortem.
- 🗺️ **Map every new project to one of the six patterns** — don't invent a seventh without very good reason.
- 💰 **Watch the bill weekly** — serverless + lifecycle policies + cleanup.

### 🧠 The One-Sentence Takeaways

- 📦 **Volume** — design for 100× (Part 1).
- 🧩 **Variety** — structure is created, not found (Part 1).
- 🌊 **Velocity** — match speed to decisions, no faster (Part 1).
- 🛡️ **Veracity** — quality rules are pipeline-level (Part 1).
- 💎 **Value** — start from the decision, work backwards (Part 1).
- 🪣 **Data Lake** — store everything cheaply, govern strictly (Part 2).
- 🏛️ **Warehouse** — columnar + MPP + star schema (Part 2).
- 🏡 **Lake House** — one lake, many engines, one catalog (Part 2).

### 📈 Next Steps

1. Redraw one of the six architectures for a project in your current job.
2. Extend the Part 1 lab: add a Glue ETL job to convert CSV to Parquet.
3. Try Redshift Serverless with the sample `tickit` dataset.
4. Read the AWS Well-Architected Analytics Lens end-to-end.
5. Move to **Part 3** — Hands-On Lake House (Glue ETL + Redshift + QuickSight capstone).

---

*AWS service icons used in this codelab are from the official AWS Architecture Icons deck, freely distributed by Amazon Web Services for use in architecture diagrams and educational materials.*

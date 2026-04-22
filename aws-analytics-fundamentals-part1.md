summary: Fundamentals of Analytics on AWS - Part 1 - Beginner Friendly Introduction
id: aws-analytics-fundamentals-part1
categories: AWS, Analytics, Cloud, Data Engineering
tags: aws, analytics, s3, glue, athena, redshift, quicksight, beginner, fundamentals
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Fundamentals of Analytics on AWS - Part 1

## Overview
Duration: 5:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws.svg" height="80" alt="AWS"/>
</p>

Welcome to **Fundamentals of Analytics on AWS - Part 1** by **HitaVir Tech**!

This codelab is your entry point into the world of cloud analytics on Amazon Web Services. You will learn what analytics actually means in a cloud context, understand the AWS service landscape, and build your first analytics pipeline end-to-end.

This is a **fundamentals course**. No prior AWS experience is required. We build the mental model first, then the hands-on skills.

### The Pipeline You Will Build

```
   🪣                   🕷️                  📚                   🔍                  💡
  ┌────────┐         ┌─────────┐        ┌──────────┐        ┌─────────┐       ┌──────────┐
  │   S3   │ ──────> │  Glue   │ ─────> │ Catalog  │ ─────> │ Athena  │ ────> │ Insights │
  │ Bucket │         │ Crawler │        │  Table   │        │   SQL   │       │          │
  └────────┘         └─────────┘        └──────────┘        └─────────┘       └──────────┘
   Raw data       Auto-detect schema    Metadata layer     Serverless SQL      Business
```

### What You Will Learn

- What analytics is and why businesses invest in it
- The difference between structured, semi-structured, and unstructured data
- Batch processing vs streaming — when to use each
- OLTP vs OLAP — why you can't use the same database for both
- Amazon S3 as the storage foundation for analytics
- Data lakes vs data warehouses — key differences
- AWS Glue Data Catalog — the metadata layer
- Amazon Athena — query data directly in S3 using SQL
- Amazon Redshift and QuickSight — at a conceptual level
- Security and cost basics every analytics engineer must know

### What You Will Build

A complete **serverless analytics pipeline** in AWS — no servers to manage, no clusters to spin up, pay only for what you query.

**The journey of one CSV file:**

```
   📄 sales.csv
       │
       │  (upload)
       ▼
   🪣  Amazon S3 bucket ─────────────── stores your raw file
       │
       │  (point crawler at it)
       ▼
   🕷️  AWS Glue Crawler ─────────────── scans & auto-detects schema
       │
       │  (writes metadata)
       ▼
   📚  Glue Data Catalog ────────────── holds the table definition
       │
       │  (read by query engine)
       ▼
   🔍  Amazon Athena ────────────────── runs SQL over the raw file
       │
       │  (returns rows)
       ▼
   💡  Business insight ✨
```

### Skills You Will Gain

| Skill | Level |
|-------|-------|
| Understanding cloud analytics concepts | Beginner |
| Amazon S3 for data storage | Beginner |
| Working with the AWS Console | Beginner |
| AWS Glue Data Catalog | Beginner |
| Running SQL queries with Athena | Beginner |
| Thinking in data lakes | Intermediate |
| IAM permissions for analytics | Intermediate |
| Cost-aware analytics design | Intermediate |

### Why Learn AWS Analytics?

AWS is the **largest cloud provider** in the world, and analytics is one of its fastest-growing workloads.

1. **Every modern company runs on data** — dashboards, ML models, reports, product decisions all require an analytics stack
2. **AWS dominates the enterprise cloud market** — most Fortune 500 companies use AWS for at least part of their data platform
3. **Serverless analytics is cheap** — Athena, Glue, and S3 cost cents for small workloads
4. **Strong job market** — "AWS + SQL + Python" is one of the most in-demand combinations in data engineering
5. **Foundation for advanced work** — you cannot meaningfully do ML, real-time analytics, or data lakehouse work on AWS without these fundamentals

### Estimated Duration

**3-4 hours** (read-along and hands-on lab combined).

> **HitaVir Tech says:** "Cloud analytics is not about knowing every AWS service. It is about knowing which service solves which problem. Master the fundamentals, and the rest becomes easy."

## Prerequisites
Duration: 3:00

### Required

- A laptop or desktop (Windows, Mac, or Linux all work)
- An **AWS account** (free tier is enough for this entire codelab)
- A credit card for AWS sign-up (you will not be charged for anything we do here if you stay in free-tier limits)
- Basic familiarity with SQL (SELECT, FROM, WHERE) — if not, finish the MySQL Workbench Setup codelab first
- A web browser (Chrome, Edge, or Firefox)

### Helpful But Not Required

- Any prior exposure to Python or spreadsheets
- Experience with another cloud (Azure, GCP) — the concepts translate

### No Servers, No Installs

One great thing about AWS analytics is you don't need to install anything locally. Everything we do in this codelab runs in the AWS web console in your browser.

### Cost Warning

AWS is a paid service. Everything in this codelab stays **inside the AWS Free Tier** if you follow the instructions. The Free Tier gives you:

- 5 GB of S3 storage for free (we will use < 10 MB)
- 1 million free Athena queries (we will run < 20)
- Free Glue Data Catalog (for the first 1 million objects)

**However**, if you leave resources running after the lab, you may be charged. The last step of this codelab is a **cleanup section** — follow it.

> **HitaVir Tech says:** "Cloud mistakes are written in dollars. Always tag, monitor, and clean up your resources. Good engineers think about the bill from day one."

## What is Analytics?
Duration: 8:00

Before we touch a single AWS service, let's make sure we agree on what analytics actually is.

### A Simple Definition

**Analytics** is the practice of turning raw data into useful insights that help people make better decisions.

That's it. Everything else — dashboards, SQL queries, machine learning models, data lakes — is just tooling to make that core activity faster, cheaper, or more scalable.

### Real-World Example

Imagine a chain of coffee shops with 50 locations across India.

Every day, each store generates data:

- Sales transactions (time, items sold, payment method)
- Inventory movements (coffee beans, milk, cups used)
- Staff hours
- Customer loyalty swipes

By itself, one transaction is meaningless. A customer bought a cappuccino at 9:47 AM. So what?

But when you **aggregate** data across all 50 stores for a year, patterns emerge:

- "Mondays are our slowest day — we should run a promotion"
- "Store #23 sells twice as many pastries as average — why?"
- "Cappuccino sales drop 40% in summer — push cold brew instead"

That transformation — from raw data to business decisions — is analytics.

### The Four Levels of Analytics

The analytics industry classifies work into four levels of maturity:

| Level | Question It Answers | Example |
|-------|--------------------|---------| 
| **Descriptive** | What happened? | "We sold 12,400 cappuccinos last month" |
| **Diagnostic** | Why did it happen? | "Sales dropped because we ran out of beans for 3 days" |
| **Predictive** | What will happen? | "Based on trends, June sales will rise 15%" |
| **Prescriptive** | What should we do? | "Order 200 kg of beans by May 25 to meet June demand" |

Most companies live in levels 1 and 2 (descriptive + diagnostic). Analytics engineers build the **foundation** that makes levels 3 and 4 possible later.

### What Analytics Is NOT

Let's clear up some confusion.

- Analytics is **not** the same as data engineering. Data engineering builds the pipes; analytics drinks from them.
- Analytics is **not** the same as business intelligence (BI). BI is mainly dashboards and reports; analytics is broader.
- Analytics is **not** machine learning. ML is a specialized branch that predicts the future; most analytics is about understanding the past.

In practice, job titles blur all of this. A "Data Analyst" at one company does what a "Business Intelligence Engineer" does at another. Focus on the skills, not the titles.

> **HitaVir Tech says:** "Never be the person who produces dashboards that nobody looks at. Always start with the question: what decision will this insight change? If the answer is 'none,' don't build it."

## The AWS Analytics Service Landscape
Duration: 10:00

AWS has over **200 services**. For analytics, you need to know roughly **15 of them well**. For fundamentals (this codelab), only **5 or 6 matter**.

Let's map the landscape by stage of the data lifecycle.

### The Analytics Pipeline — A Generic View

Every analytics system, whether on AWS, Azure, GCP, or on-premise, follows the same general shape:

```
  INGEST → STORE → CATALOG → PROCESS → QUERY → VISUALIZE → ACT
```

Data comes in (ingest), gets saved somewhere (store), gets described (catalog), gets cleaned or joined (process), gets queried (query), gets displayed (visualize), and finally someone makes a decision (act).

AWS has a service for each stage.

### AWS Services by Stage

| Stage | Icon | Primary AWS Service | One-line Purpose |
|-------|:---:|--------------------|--------------------|
| Ingest (batch) | 🕸️ | **AWS Glue** | Extract-Transform-Load (ETL) service |
| Ingest (streaming) | 🌊 | **Amazon Kinesis** | Real-time data streams |
| Ingest (database) | 🚚 | **AWS DMS** | Database migration and replication |
| Store | 🪣 | **Amazon S3** | Object storage, the "data lake" |
| Store (warehouse) | 🏛️ | **Amazon Redshift** | Columnar data warehouse |
| Catalog | 📚 | **AWS Glue Data Catalog** | Metadata repository (what data you have) |
| Process | ⚙️ | **AWS Glue (Spark)** | Scalable data transformation |
| Process (big data) | 🐘 | **Amazon EMR** | Managed Hadoop / Spark clusters |
| Query | 🔍 | **Amazon Athena** | Serverless SQL on S3 |
| Query (warehouse) | 🏛️ | **Amazon Redshift** | Warehouse SQL |
| Visualize | 📊 | **Amazon QuickSight** | Dashboards and BI |
| Orchestrate | 🗓️ | **Amazon MWAA (Airflow)** | Pipeline scheduling |

Don't try to memorize this. You will pick it up naturally as you build projects.

### Visual Map of the Analytics Pipeline

```
  ┌──────────────────── INGEST ────────────────────┐   ┌────── STORE ──────┐   ┌── CATALOG ──┐
  │                                                 │   │                   │   │             │
  │  🕸️ Glue ETL    🌊 Kinesis    🚚 DMS            │   │  🪣 S3 Lake       │   │ 📚 Glue     │
  │  (batch)        (streaming)   (database CDC)    │   │  🏛️ Redshift WH  │   │    Catalog  │
  │                                                 │   │                   │   │             │
  └─────────────────────────────────────────────────┘   └───────────────────┘   └─────────────┘
                                                                   │
                         ┌─────────────────────────────────────────┤
                         ▼                                         ▼
         ┌────── PROCESS ──────┐                    ┌──────── QUERY ─────────┐
         │                     │                    │                        │
         │  ⚙️ Glue (Spark)    │                    │  🔍 Athena (serverless)│
         │  🐘 EMR (big)       │                    │  🏛️ Redshift SQL      │
         │                     │                    │                        │
         └─────────────────────┘                    └────────────────────────┘
                                                                   │
                                                                   ▼
                                                   ┌────── VISUALIZE ───────┐
                                                   │                        │
                                                   │  📊 QuickSight         │
                                                   │  (BI dashboards)       │
                                                   │                        │
                                                   └────────────────────────┘
```

### The 5 Services We Will Focus On

For Part 1, we care about:

| # | Icon | Service | What It Does |
|---|:---:|---------|--------------|
| 1 | 🪣 | **Amazon S3** | Where all the data lives |
| 2 | 📚 | **AWS Glue Data Catalog** | Where the metadata lives |
| 3 | 🔍 | **Amazon Athena** | Where you run SQL |
| 4 | 🏛️ | **Amazon Redshift** | Conceptual here; hands-on in Part 2 |
| 5 | 📊 | **Amazon QuickSight** | Conceptual here; hands-on in Part 2 |

Plus a quick mention of:

- 🔐 **AWS IAM** — how permissions work
- 💰 **AWS Billing** — how to not get surprised

### The Serverless Stack vs the Cluster Stack

One important split to understand:

⚡ **Serverless stack** (what Part 1 focuses on):
- 🪣 S3 + 📚 Glue Catalog + 🔍 Athena + 📊 QuickSight
- No servers to manage
- Pay per query / per GB
- Best for: small-to-medium analytics, ad-hoc queries, cost-sensitive workloads

🖥️ **Cluster stack** (covered in Part 2):
- 🐘 EMR, 🏛️ Redshift Provisioned, 🌊 Kinesis Data Streams
- You provision and manage capacity
- Pay for uptime (whether you use it or not)
- Best for: high-throughput, predictable workloads

> **HitaVir Tech says:** "Start serverless. Most analytics workloads never grow big enough to need a cluster. Don't pay for idle servers when Athena charges you only for the queries you run."

## Types of Data
Duration: 6:00

Before storing data, you need to know what kind of data you have. The shape of the data determines the tools you can use.

### Three Categories

| Type | Icon | Description | Example | Where It Lives |
|------|:---:|-------------|---------|----------------|
| **Structured** | 📊 | Fixed schema, rows and columns | SQL tables, CSV | 🗄️ RDS, 🏛️ Redshift |
| **Semi-structured** | 🧩 | Flexible schema, self-describing | JSON, XML, Parquet | 🪣 S3, document DBs |
| **Unstructured** | 🎞️ | No predefined schema | Images, video, PDF, raw text | 🪣 S3, object storage |

### Structured Data

Everything fits neatly into rows and columns. Every row has the same fields.

```csv
order_id,customer,amount,date
1001,Ravi,450.00,2026-04-01
1002,Priya,1200.50,2026-04-01
1003,Amit,89.00,2026-04-02
```

- Easy to query with SQL
- Easy to validate (you know what to expect)
- Rigid — adding a new field means updating the schema everywhere

This is the traditional world of relational databases: MySQL, PostgreSQL, Oracle, SQL Server.

### Semi-Structured Data

Has structure, but it's flexible. Each record might have different fields.

```json
{
  "order_id": 1001,
  "customer": "Ravi",
  "items": [
    { "name": "Cappuccino", "qty": 2 },
    { "name": "Croissant", "qty": 1 }
  ],
  "loyalty_tier": "Gold",
  "notes": "Regular customer, prefers window seat"
}
```

- Flexible — each record can have different fields
- Still queryable (with the right tools)
- Common in APIs, logs, and modern data platforms

Formats: JSON, XML, Avro, Parquet, ORC.

### Unstructured Data

No schema at all. The content has meaning, but not in a tabular way.

- Photos
- Video recordings
- PDFs (contracts, invoices)
- Audio files
- Long-form text (emails, reviews)

These live in object storage (S3). You usually process them with specialized tools (OCR, computer vision, NLP) to extract structured features, then analyze the features.

### Why This Matters for AWS

Different AWS services handle different data types:

| Data Type | Icon | Best AWS Service |
|-----------|:---:|------------------|
| Structured (small, transactional) | 🗄️ | Amazon RDS (MySQL/PostgreSQL) |
| Structured (large, analytical) | 🏛️ | Amazon Redshift |
| Semi-structured (analytical) | 🔍 | S3 + Athena |
| Unstructured (storage) | 🪣 | S3 |
| Unstructured (AI features) | 🤖 | Amazon Rekognition, Textract, Comprehend |

> **HitaVir Tech says:** "90% of the world's data is unstructured. But 90% of analytics happens on structured or semi-structured data. Your job as an analytics engineer is often to convert unstructured chaos into structured order."

## Batch vs Streaming
Duration: 5:00

Two fundamental processing patterns. You must understand the difference.

```
  📦 BATCH                              🌊 STREAMING
  ─────────────                         ──────────────
  ┌───┐┌───┐┌───┐                       → → → → → → → →
  │ █ ││ █ ││ █ │  processed together   one event at a time
  └───┘└───┘└───┘                       → → → → → → → →
  run at schedule                       always on
  data minutes-hours old                data seconds old
```

### Batch Processing

Data arrives in chunks. You process a big chunk at once.

**Example:** Every night at 2:00 AM, a job runs that:
1. Loads yesterday's sales data
2. Cleans and transforms it
3. Updates the reporting tables
4. Refreshes the morning dashboard

The dashboard is never "live" — it's always showing yesterday's numbers.

**Pros:**
- Simpler to build and debug
- Cheaper (fewer compute hours)
- Easier to reprocess if something goes wrong

**Cons:**
- Data is stale (minutes, hours, or a day old)

**AWS services for batch:** 🕸️ Glue • 🐘 EMR • 🏛️ Redshift • 🔍 Athena • ⚡ Lambda

### Streaming Processing

Data is processed as soon as it arrives — one record at a time, or in tiny micro-batches.

**Example:** A fraud detection system:
1. Every credit card swipe is sent as a stream event
2. The system evaluates each transaction within 100 milliseconds
3. If suspicious, it blocks the transaction before it completes

The system must respond in **real time**, or the business value is zero.

**Pros:**
- Near-instant insights
- Enables real-time actions (alerts, blocks, promotions)

**Cons:**
- Harder to build
- More expensive
- Harder to debug (you can't replay the world)

**AWS services for streaming:** 🌊 Kinesis Data Streams • 🚒 Kinesis Firehose • 🪐 MSK (Kafka) • ⚡ Lambda

### Which Should You Use?

Ask one question: **"How fresh does the data need to be?"**

| Freshness Need | Use |
|----------------|-----|
| "Next business day is fine" | Batch (run overnight) |
| "Within the next hour" | Mini-batch (run every 15 min) |
| "Within a few minutes" | Micro-batch or streaming |
| "Within seconds" | Streaming (Kinesis, Kafka) |

Most analytics needs are satisfied by batch. Don't reach for streaming unless the business truly cannot wait.

> **HitaVir Tech says:** "Streaming is fashionable. Batch is profitable. 80% of real-world analytics runs on batch, and that is completely fine."

## OLTP vs OLAP
Duration: 6:00

This is one of the most important mental models in all of data engineering. If you skip it, nothing else will make sense.

```
    🛒  OLTP                              📈  OLAP
    ─────────────                         ──────────────
    "Run the business"                    "Understand the business"

    Many tiny writes/lookups              Few huge aggregations
    ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐                   ┌──────────────────┐
    └─┘└─┘└─┘└─┘└─┘└─┘                   │  SUM / AVG /     │
    fast, row-by-row                     │  COUNT / JOIN    │
                                         └──────────────────┘
    🗄️ MySQL, DynamoDB                    🏛️ Redshift, 🔍 Athena
```

### OLTP — Online Transaction Processing

**Purpose:** Run the day-to-day operations of the business.

**Examples:**
- A customer places an order on Amazon.com
- A patient's medical record is updated in a hospital system
- An ATM withdrawal is recorded

**Characteristics:**
- Many small, fast transactions per second
- Each transaction touches a few rows
- Data is always up-to-date (current state)
- Optimized for **writing** and **looking up specific records**

**Example databases:** 🐬 MySQL • 🐘 PostgreSQL • 🅾️ Oracle • 🗄️ Amazon RDS • ⚡ DynamoDB

**Sample query:**

```sql
-- OLTP: find one customer's recent orders
SELECT order_id, amount, date
FROM orders
WHERE customer_id = 42
ORDER BY date DESC
LIMIT 5;
```

Fast. Touches a handful of rows. Runs millions of times per day.

### OLAP — Online Analytical Processing

**Purpose:** Analyze historical data to find patterns.

**Examples:**
- "What were our top 10 products last quarter?"
- "Compare sales across regions year-over-year"
- "Which customer segment has the highest lifetime value?"

**Characteristics:**
- Few, large queries
- Each query scans millions or billions of rows
- Data can be slightly stale (hours or a day old)
- Optimized for **reading** and **aggregation** (SUM, AVG, COUNT, GROUP BY)

**Example databases:** 🏛️ Amazon Redshift • ❄️ Snowflake • 🔎 BigQuery • 🔍 Athena (on S3)

**Sample query:**

```sql
-- OLAP: find top 10 products across all orders
SELECT product_name, SUM(amount) AS total_revenue
FROM orders_fact
JOIN products_dim USING (product_id)
WHERE date >= '2026-01-01'
GROUP BY product_name
ORDER BY total_revenue DESC
LIMIT 10;
```

Scans all orders for the year. Groups, aggregates, sorts. May process gigabytes.

### Side-by-Side Comparison

| Dimension | OLTP | OLAP |
|-----------|------|------|
| Primary users | Applications, customers | Analysts, BI tools, ML models |
| Query pattern | Many small, fast | Few, large, complex |
| Data volume per query | Few rows | Millions of rows |
| Writes vs reads | Heavy on writes | Heavy on reads |
| Data freshness | Real-time | Minutes to hours old |
| Schema design | Normalized (3NF) | Denormalized (star/snowflake) |
| Storage layout | Row-oriented | Column-oriented |
| Example | MySQL, DynamoDB, RDS | Redshift, Athena, Snowflake |

### Why Not One Database for Both?

A natural question: why can't we just use one database for everything?

Because they are built with **opposite priorities**:

- OLTP stores data in **rows** so it can write one record fast.
- OLAP stores data in **columns** so it can read one column across millions of rows fast.

If you run OLAP-style queries on an OLTP database, you will slow down your production application (because the aggregation scans lock rows). If you run OLTP-style lookups on an OLAP system, each query will be expensive because column stores aren't optimized for single-row access.

The modern solution: **copy data from OLTP to OLAP** periodically. That copy job is your ETL pipeline.

```
   🗄️ OLTP: RDS MySQL              🕸️ Glue / 🚚 DMS              🪣 OLAP: S3 + 🔍 Athena
   ┌────────────────────┐          ┌─────────────────┐          ┌────────────────────────┐
   │ • Orders table     │ ──────>  │ Nightly ETL     │ ──────>  │ • orders_fact          │
   │ • Customers table  │          │ (batch job)     │          │ • customers_dim        │
   │ • Products table   │          │                 │          │ • products_dim         │
   └────────────────────┘          └─────────────────┘          └────────────────────────┘
   Live app, always now            Copy & transform              Historical, for analytics
```

> **HitaVir Tech says:** "OLTP runs the business. OLAP understands the business. You need both, but you never run them on the same server."

## Amazon S3 - The Foundation
Duration: 10:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws-s3.svg" height="80" alt="Amazon S3"/>
</p>

If you remember only one AWS service from this codelab, make it **🪣 Amazon S3**.

### What is S3?

**Amazon S3** (Simple Storage Service) is AWS's **object storage** service. It stores files — any kind of file, any size — at massive scale.

Think of S3 as:
- A giant, globally accessible hard drive
- Infinitely scalable (store one file or one trillion files)
- Extremely durable (99.999999999% — eleven nines — durability)
- Cheap (starts at ~2 cents per GB per month)
- Accessible from anywhere (with the right permissions)

### Key S3 Concepts

```
  🌏 Region (ap-south-1 = Mumbai)
      │
      └── 🪣 Bucket (hitavirtech-analytics-raw)
            │
            ├── 📄 Object: sales/2026/04/22/orders.csv
            ├── 📄 Object: inventory/2026/04/22/stock.json
            └── 📄 Object: logs/2026/04/22/access.log
```

- 🪣 **Bucket** — A top-level container for objects. Names are globally unique across all of AWS.
- 📄 **Object** — A file stored in a bucket. Has a **key** (path-like name) and **data** (contents).
- 🔑 **Key** — The unique identifier for an object. Looks like a path, but S3 is flat — no real folders.
- 🌏 **Region** — Geographic location of the bucket (`ap-south-1` = Mumbai). Pick the closest one.
- 🏷️ **Storage Class** — The tier of storage (covered below).

### Why S3 is the Foundation of Cloud Analytics

Five reasons every analytics engineer should know:

1. **Scale** — S3 can hold any amount of data. Petabytes. Exabytes. No limits for practical purposes.
2. **Durability** — 11 nines means if you store 1 billion objects, you can expect to lose one object every 10,000 years.
3. **Decoupling** — storage is separate from compute. You can scale them independently.
4. **Universal access** — every AWS analytics service reads from S3. Glue, Athena, EMR, Redshift Spectrum, SageMaker — all of them.
5. **Cost** — storing data at rest is cheap. You only pay more when you access or move it.

### S3 Storage Classes

Not all data needs the same performance. S3 offers multiple tiers — think of a pyramid:

```
                   🔥  S3 Standard             Hot data, highest cost
                 ─────────────────
                🌡️ Intelligent-Tiering        Auto-moves hot/cold
              ─────────────────────
             ❄️ Standard-IA / One Zone-IA    Cold, cheaper
           ─────────────────────────
          🧊 Glacier Instant Retrieval      Icy, rare access
        ─────────────────────────────
       🗄️ Glacier Flexible Retrieval       Frozen, minutes-hours
     ─────────────────────────────────
    🏔️  Glacier Deep Archive              Deep freeze, compliance only
  ─────────────────────────────────────
```

| Class | Icon | Purpose | Relative Cost |
|-------|:---:|---------|:-------------:|
| **S3 Standard** | 🔥 | Frequently accessed data | $$$$ |
| **S3 Intelligent-Tiering** | 🌡️ | Auto-moves data between tiers | $$$ |
| **S3 Standard-IA** | ❄️ | Accessed monthly or so | $$ |
| **S3 One Zone-IA** | ❄️ | Non-critical, infrequent | $ |
| **S3 Glacier Instant Retrieval** | 🧊 | Archive, rare access | $ |
| **S3 Glacier Flexible Retrieval** | 🗄️ | Archive, minutes-hours to retrieve | ¢ |
| **S3 Glacier Deep Archive** | 🏔️ | Long-term compliance archive | ¢ |

For analytics, you'll mostly use **S3 Standard** for active data and **Intelligent-Tiering** for anything older than 30 days.

### How Data is Organized in an S3 Data Lake

A common convention is to organize buckets into three zones — the "medallion" architecture:

```
  🪣 s3://hitavirtech-analytics/
   │
   ├── 🥉 raw/             ← Source data as-is, never modified
   │     ├── sales/2026/04/22/orders.csv
   │     └── inventory/2026/04/22/stock.json
   │
   ├── 🥈 curated/         ← Cleaned, typed, joined data (Parquet)
   │     └── sales_fact/year=2026/month=04/day=22/part-001.parquet
   │
   └── 🥇 analytics/       ← Pre-aggregated, ready for BI
         └── daily_revenue/year=2026/month=04/day=22/part-001.parquet
```

- 🥉 **Raw zone (bronze)** — the data lake's truth. If anything goes wrong, you reprocess from here.
- 🥈 **Curated zone (silver)** — cleaned and typed. Uses **Parquet** (columnar) for fast analytics.
- 🥇 **Analytics zone (gold)** — pre-aggregated. Powers dashboards.

### Parquet — The Magic Columnar Format

📄 **CSV** is human-readable but terrible for analytics:
- Text takes lots of space
- No schema enforcement
- Must scan entire file for one column

🗂️ **Apache Parquet** is the go-to format for analytics on S3:
- 🧱 **Columnar** — each column stored separately; query 3 of 50 columns → read only those 3
- 🗜️ **Compressed** — often 5-10x smaller than CSV
- 🏷️ **Typed** — knows integer from string
- ✂️ **Splittable** — parallel readers each take a chunk

```
  Row-oriented (CSV)              Column-oriented (Parquet)
  ────────────────────            ───────────────────────────
  [id|name|age|city]              [id: 1,2,3,4,5,6,...]
  [id|name|age|city]              [name: A,B,C,D,E,F,...]
  [id|name|age|city]              [age:  20,30,25,...]
  [id|name|age|city]              [city: MUM,DEL,...]

  Read all bytes even             Read only the columns
  if you want 1 column.           you ask for. Much cheaper.
```

Every modern AWS analytics service reads Parquet natively. **Learn to love Parquet.**

> **HitaVir Tech says:** "S3 + Parquet is the most underrated combo in analytics. It gives you 90% of what a data warehouse does, at 10% of the cost. Start here before spending on Redshift."

## Data Lakes vs Data Warehouses
Duration: 7:00

```
       🏞️ DATA LAKE                           🏛️ DATA WAREHOUSE
       ─────────────                         ──────────────────
   ┌───────────────────────┐               ┌───────────────────────┐
   │  📄 CSV               │               │  Structured tables    │
   │  🧩 JSON / Parquet    │               │  Strict schema        │
   │  🎞️ Images / logs     │   vs.         │  Fast SQL             │
   │  Schema on READ       │               │  Schema on WRITE      │
   │  Cheap, infinite      │               │  Fast, costly         │
   └───────────────────────┘               └───────────────────────┘
   🪣 Amazon S3                             🏛️ Amazon Redshift
```

This is one of the most debated topics in the industry. Here's a clear take.

### Data Warehouse

A 🏛️ **data warehouse** is a purpose-built database for OLAP analytics.

Examples: 🏛️ Amazon Redshift • ❄️ Snowflake • 🔎 Google BigQuery • 🔷 Azure Synapse.

Characteristics:
- Structured data only
- Schema-on-write (you must define the schema before loading data)
- Very fast queries (optimized storage + compute)
- Higher cost per GB stored
- Governance and security are mature

**Good for:** known reporting, finance, dashboards where speed matters.

### Data Lake

A 🏞️ **data lake** is a storage-first approach. You dump all data into object storage (S3) in its original format, and query it later when needed.

Examples: 🪣 Amazon S3 • 🔷 Azure Data Lake Storage • 🔎 Google Cloud Storage.

Characteristics:
- Any data type (structured, semi, unstructured)
- Schema-on-read (you define schema at query time)
- Cheaper storage
- Queries can be slower (depending on format and organization)
- Flexibility — store first, decide later

**Good for:** raw data staging, ML training data, data science exploration, storing data whose future use you don't know yet.

### Side-by-Side

| Dimension | Data Warehouse | Data Lake |
|-----------|----------------|-----------|
| Storage | Integrated with compute | Independent (S3) |
| Data types | Structured | Any |
| Schema | On-write (strict) | On-read (flexible) |
| Cost per TB | High | Low |
| Query speed | Very fast | Variable |
| Users | Analysts, BI tools | Data scientists, engineers |
| Example | Amazon Redshift | Amazon S3 + Athena |

### The Modern Answer — Data Lakehouse

Why choose? Modern architectures combine both:

```
       🏞️ LAKE  +  🏛️ WAREHOUSE  =  🏕️ LAKEHOUSE
```

- 🪣 **Storage on S3** — cheap, infinitely scalable
- 🧊 **Table formats** (Apache Iceberg, Delta Lake, Apache Hudi) add ACID transactions, schema evolution, and time travel on top of S3 files
- 🔍 **Query engines** (Athena, Redshift Spectrum, EMR Spark) read these table formats

This is the **lakehouse** — the flexibility of a lake with the discipline of a warehouse.

AWS's preferred path: 🪣 **S3 + 🕸️ Glue + 🔍 Athena + (optionally) 🧊 Iceberg tables**.

> **HitaVir Tech says:** "For most new analytics projects in 2026, start with a lakehouse pattern on S3. You get warehouse-like queries at lake-like prices, and you are never stuck with the wrong tool."

## AWS Glue Data Catalog
Duration: 8:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws-glue.svg" height="80" alt="AWS Glue"/>
</p>

S3 stores the raw bytes. But how does a query engine know that `orders.csv` has three columns called `order_id`, `customer`, and `amount`? That knowledge is the **metadata**, and it lives in the 📚 **Glue Data Catalog**.

### What is the Glue Data Catalog?

The 📚 **AWS Glue Data Catalog** is a managed, persistent metadata store. It holds:

- 🗂️ **Databases** — logical groupings of tables (e.g., `sales_db`)
- 📋 **Tables** — schema definitions that point to data files in S3
- 🏷️ **Columns** — names, types, and descriptions
- 🧩 **Partitions** — subdivisions of a table (e.g., by date)
- 🔌 **Connections** — how to reach JDBC sources like RDS

> 💡 **Analogy:** Think of it as the **library catalog**. 🪣 S3 is the library shelves with the physical books. 📚 Glue Catalog is the catalog card that tells you which shelf the book is on, what pages it has, and who wrote it.

### Why You Need It

Without a catalog, every query engine would need to re-discover your data schema. The catalog centralizes this so:

```
                            📚 Glue Data Catalog
                           (one metadata store)
                                  │
              ┌───────────────┬───┴───┬────────────────┐
              ▼               ▼       ▼                ▼
           🔍 Athena   🏛️ Redshift   🐘 EMR         📊 QuickSight
           (SQL on S3)   Spectrum   (Spark/Hive)    (dashboards)
```

**One metadata store. Many engines. Consistent views.**

### Glue Crawlers

Writing schemas by hand is tedious. A 🕷️ **Glue Crawler** is a managed job that:

```
   🕷️ Crawler
       │
       ▼
   🪣 points at S3 folder
       │
       ▼
   📄 samples a few files
       │
       ▼
   🔬 detects: format (CSV/JSON/Parquet), columns, types, partitions
       │
       ▼
   📚 writes a table into the Glue Catalog
```

You run a crawler when new data arrives (or on a schedule), and the catalog stays up to date.

### Databases vs Tables

Just like a traditional database:

```
  📚 Glue Data Catalog
   │
   ├── 🗂️ Database: sales_db
   │    ├── 📋 Table: orders       ──→ 🪣 s3://my-bucket/sales/raw/orders/
   │    └── 📋 Table: customers    ──→ 🪣 s3://my-bucket/sales/raw/customers/
   │
   └── 🗂️ Database: inventory_db
        └── 📋 Table: stock_daily  ──→ 🪣 s3://my-bucket/inventory/stock/
```

> 🔥 **Key insight:** Tables are just **pointers**. The data itself stays in S3. You can drop and recreate a table without losing data.

### Partitions — The Secret to Fast Queries

A 🧩 **partition** is a subdivision of a table based on column values, usually represented by folder structure:

```
  🪣 s3://my-bucket/sales/orders/
     │
     └── 📁 year=2026/
           │
           └── 📁 month=04/
                 │
                 ├── 📁 day=20/  📄 orders.parquet
                 ├── 📁 day=21/  📄 orders.parquet
                 └── 📁 day=22/  📄 orders.parquet   ← WHERE day=22 reads only here!
```

When you query `WHERE year=2026 AND month=04 AND day=22`, Athena only scans that one folder. This is called ✂️ **partition pruning** and it can make your query **100x cheaper and faster**.

> 🌟 Partition design is one of the highest-impact skills in analytics engineering.

### Typical Partitioning Conventions

| Data Pattern | Good Partition Keys |
|--------------|--------------------|
| Time-series events | `year`, `month`, `day` (or `date`) |
| Regional sales | `country`, then `year/month` |
| Multi-tenant SaaS | `tenant_id`, then date |
| Product catalog | `category`, `subcategory` |

Avoid partitioning by high-cardinality columns (e.g., `user_id` for a SaaS with 10 million users) — you'll create too many tiny files, which S3 hates.

> **HitaVir Tech says:** "Good partitioning is the difference between a $10 query and a $1,000 query. Always partition by the columns you filter on most often."

## Amazon Athena - Serverless SQL
Duration: 8:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws-athena.svg" height="80" alt="Amazon Athena"/>
</p>

Now the payoff. All that S3 storage and Glue cataloging exists so you can do one thing: **run SQL**.

### What is Amazon Athena?

🔍 **Amazon Athena** is a serverless query engine. You give it SQL, it reads from S3 (using the Glue Catalog for schema), and returns results — no servers, no clusters, no infrastructure.

Under the hood, Athena runs on **Presto / Trino**, an open-source distributed SQL engine.

### How It Works

```
  👨‍💻 You write SQL
        │
        ▼
  🔍 Athena asks 📚 Glue Catalog: "where are the files? what's the schema?"
        │
        ▼
  🪣 Athena streams the matching S3 files
        │
        ▼
  ⚡ Distributed workers filter / join / aggregate in-memory
        │
        ▼
  📋 Results returned to you (and saved to S3)
```

### Pricing — Pay Per Query

💰 Athena's pricing is beautifully simple:

> **$5 per TB scanned** (as of 2026 pricing in most regions — check the current AWS price list)

Three consequences:

1. 🐣 If your data is small, your bill is tiny. Scanning 1 GB costs half a cent.
2. ✂️ Partition pruning saves money. If a query scans 1 GB instead of 1 TB, you save $5.
3. 🧱 Columnar formats save money. Reading 2 columns of a 50-column Parquet file scans 2/50th of the bytes.

### SQL You Can Run

Athena supports standard ANSI SQL plus many Presto/Trino extensions:

```sql
-- Basic SELECT
SELECT customer, amount
FROM sales_db.orders
WHERE date >= DATE '2026-04-01'
LIMIT 10;

-- Aggregations
SELECT product_name, SUM(amount) AS revenue
FROM sales_db.orders
GROUP BY product_name
ORDER BY revenue DESC;

-- Joins
SELECT o.order_id, c.customer_name, o.amount
FROM sales_db.orders o
JOIN sales_db.customers c ON o.customer_id = c.customer_id;

-- Window functions
SELECT
  product_id,
  date,
  amount,
  AVG(amount) OVER (PARTITION BY product_id ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS weekly_avg
FROM sales_db.orders;

-- Array and JSON functions
SELECT order_id, element_at(items, 1) AS first_item
FROM sales_db.orders_nested;
```

### Best Practices for Athena

| # | Practice | Why |
|---|----------|-----|
| 1 | 🗂️ Convert to Parquet | 5-10x cheaper than CSV |
| 2 | 🧩 Partition smartly | Skip irrelevant files |
| 3 | 🗜️ Compress (SNAPPY / ZSTD) | Fewer bytes = less cost |
| 4 | 🎯 Avoid `SELECT *` | Read only columns you need |
| 5 | 🧪 `LIMIT` during exploration | Don't scan everything |
| 6 | 👀 Watch "Data scanned" | It's your bill — shrink it |
| 7 | 🔄 Use CTAS to rewrite | Create optimized tables |

### When NOT to Use Athena

Athena is great but not universal. Skip it when:

- You need sub-second dashboard queries → use Redshift or a purpose-built DB
- You're doing heavy joins across billions of rows frequently → Redshift may be cheaper overall
- You need transactional writes (INSERT/UPDATE/DELETE) → use Redshift or Iceberg tables
- Your workload is very predictable and continuous → a dedicated cluster may beat pay-per-query

> **HitaVir Tech says:** "Athena is the Swiss Army knife of AWS analytics. You won't always need it, but when you do, nothing else is as quick to set up or as cheap to run for occasional queries."

## Hands-on Lab - Your First Analytics Pipeline
Duration: 30:00

🛠️ Time to build. You will create the complete pipeline:

```
   Step 1         Step 2-3        Step 4-5          Step 6          Step 7-8
  ┌──────┐       ┌──────┐        ┌──────────┐    ┌────────┐     ┌──────────┐
  │ 📄   │ ────> │ 🪣   │ ─────> │ 🕷️       │ ──> │ 📚     │ ──> │ 🔍       │
  │ CSV  │       │  S3  │        │ Crawler  │    │Catalog │     │ Athena   │
  └──────┘       └──────┘        └──────────┘    └────────┘     └──────────┘
   Prepare       Upload         Create & run      Table auto    Run SQL,
   sample data   to bucket       crawler          populated     get insights
```

### 📄 Step 1 — Prepare Your Sample Data

On your local machine, create a file called `sales.csv` with this content:

```csv
order_id,customer,product,quantity,amount,order_date
1001,Ravi,Laptop,1,75000.00,2026-04-01
1002,Priya,Mouse,2,1500.00,2026-04-01
1003,Amit,Keyboard,1,3500.00,2026-04-02
1004,Ravi,Monitor,1,18000.00,2026-04-02
1005,Sneha,Headphones,1,4500.00,2026-04-03
1006,Priya,Laptop,1,75000.00,2026-04-03
1007,Vikram,USB Cable,3,900.00,2026-04-04
1008,Neha,Webcam,1,5000.00,2026-04-04
1009,Ravi,Mouse,1,750.00,2026-04-05
1010,Amit,Monitor,1,18000.00,2026-04-05
```

Save it. We will upload this file to S3 in a minute.

### 🪣 Step 2 — Create an S3 Bucket

1. Sign in to the AWS Management Console
2. In the search bar at the top, type **S3** and click the S3 service
3. Click **Create bucket**
4. Bucket name: `hitavirtech-analytics-yourname` (must be globally unique — add your name or a random suffix)
5. AWS Region: choose the region closest to you (e.g., `ap-south-1` for Mumbai)
6. Leave all other settings as default
7. Click **Create bucket**

You should now see your bucket in the S3 buckets list.

### ⬆️ Step 3 — Upload the Sample Data

1. Click your new bucket to open it
2. Click **Create folder** → name it `raw`
3. Enter the `raw/` folder → create another subfolder `sales/`
4. Enter `raw/sales/` and click **Upload**
5. Select the `sales.csv` file from your computer
6. Click **Upload**

Your object is now at `s3://hitavirtech-analytics-yourname/raw/sales/sales.csv`.

### 🕸️ Step 4 — Create the Glue Database and Crawler

1. In the AWS console search bar, type **Glue** and click **AWS Glue**
2. On the left menu, click **Databases** → **Add database**
3. Database name: `hitavirtech_sales_db`
4. Click **Create database**

Now the crawler:

1. On the left menu, click **Crawlers** → **Create crawler**
2. Crawler name: `hitavirtech-sales-crawler`
3. Click **Next**
4. Source type: **Not yet** → click **Add a data source**
5. Data source: **S3**
6. S3 path: browse to `s3://hitavirtech-analytics-yourname/raw/sales/`
7. Click **Add S3 data source**, then **Next**
8. IAM role: click **Create new IAM role** → name it `AWSGlueServiceRole-hitavirtech` → **Create**
9. Click **Next**
10. Target database: `hitavirtech_sales_db`
11. Crawler schedule: **On demand**
12. Click **Next**, review, and **Create crawler**

### 🕷️ Step 5 — Run the Crawler

1. From the crawlers list, select `hitavirtech-sales-crawler`
2. Click **Run crawler**
3. Wait ~1-2 minutes until the status says **Completed** and "Table changes" shows 1 created

### 📚 Step 6 — Verify the Table in the Catalog

1. In Glue, click **Tables** on the left
2. You should see a new table (named something like `sales`) in the `hitavirtech_sales_db` database
3. Click the table name and inspect:
   - Columns: `order_id`, `customer`, `product`, `quantity`, `amount`, `order_date`
   - Data types: inferred by the crawler (likely string, bigint, double)
   - Location: points to your S3 folder

Glue just auto-discovered your CSV's schema.

### 🔍 Step 7 — Query with Athena

1. In the AWS console search bar, type **Athena** and open it
2. If it's your first time in Athena, it asks you to set a query results location → pick your bucket: `s3://hitavirtech-analytics-yourname/athena-results/`
3. In the query editor:
   - Data source: `AwsDataCatalog`
   - Database: `hitavirtech_sales_db`
4. Run your first query:

```sql
SELECT * FROM sales LIMIT 5;
```

Click **Run**. You should see 5 rows from your CSV.

### 💡 Step 8 — More Interesting Queries

Try these:

```sql
-- Total revenue per customer
SELECT customer, SUM(amount) AS total_spent
FROM sales
GROUP BY customer
ORDER BY total_spent DESC;
```

```sql
-- Best-selling products
SELECT product, SUM(quantity) AS units_sold
FROM sales
GROUP BY product
ORDER BY units_sold DESC;
```

```sql
-- Daily revenue
SELECT order_date, SUM(amount) AS daily_revenue
FROM sales
GROUP BY order_date
ORDER BY order_date;
```

You just ran analytical SQL over files in an object store, with zero servers provisioned, and paid less than 1 cent to do it.

### 💰 Step 9 — Check the "Data scanned" Number

At the bottom of each query result, Athena shows:

> "Data scanned: 412 B" (or similar)

This is what you pay for. Notice how small it is for our tiny CSV. For production workloads, this number guides all your optimization work — partitioning, Parquet, column pruning, and so on.

### 🧹 Step 10 — Cleanup (Important!)

If you leave resources running, AWS will charge you — especially once free-tier usage ends.

1. **Athena** — no cleanup needed (no persistent resources)
2. **Glue** — delete the crawler:
   - Glue → Crawlers → select `hitavirtech-sales-crawler` → Delete
3. **Glue** — (optional) delete the database:
   - Glue → Databases → select `hitavirtech_sales_db` → Delete
4. **S3** — empty and delete the bucket:
   - S3 → select your bucket → **Empty** → type confirmation → **Empty**
   - After it empties, select the bucket again → **Delete** → type the bucket name → **Delete**

Double-check the **Billing Dashboard** a day later to confirm no unexpected charges.

> **HitaVir Tech says:** "The 5-minute cleanup at the end of a lab is the most valuable 5 minutes of the entire lab. Engineers who skip it end up with surprise AWS bills."

## Amazon Redshift - A Conceptual Tour
Duration: 6:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws-redshift.svg" height="80" alt="Amazon Redshift"/>
</p>

We will do hands-on Redshift in Part 2, but every analytics engineer should have a mental model of what it is.

### What is Redshift?

🏛️ **Amazon Redshift** is AWS's **data warehouse** service. It is a relational database purpose-built for **OLAP** workloads — the big, complex, aggregate queries that power reporting and BI.

Think "Amazon's answer to ❄️ Snowflake, 🔎 BigQuery, and traditional Oracle/Teradata warehouses."

### Key Characteristics

- 🧱 **Columnar storage** — data stored by column → aggregations fly
- ⚙️ **Massively parallel processing (MPP)** — queries span many nodes
- 🐘 **SQL interface** — PostgreSQL-flavored SQL
- 📏 **Petabyte scale** — tested at exabyte scale by the largest AWS customers
- 🪣 **Integrates with S3** — query S3 data directly via **Redshift Spectrum**

### Redshift Serverless vs Provisioned

AWS offers two flavors:

| | Provisioned | Serverless |
|-|-|-|
| Model | You choose cluster size | Scales automatically |
| Cost | Hourly (even idle) | Per-query usage |
| Best for | Predictable, steady load | Variable or bursty load |
| Complexity | Higher (manage cluster) | Lower |

For most new projects in 2026, start with **Redshift Serverless** unless you have a strong reason not to.

### When to Use Redshift vs Athena

| Question | Athena | Redshift |
|----------|--------|----------|
| "Occasional queries on data already in S3" | YES | Overkill |
| "BI dashboards with sub-second response needed" | Sometimes slow | YES |
| "Predictable, high-volume analytical workload" | Gets expensive | Cheaper at scale |
| "Need to join massive tables frequently" | Slower | Optimized |
| "Data is small and you want simplicity" | YES | Overkill |
| "Heavy concurrent user load" | Query throttling | Better concurrency |

Rule of thumb:
- Start with Athena. Move workloads to Redshift when they need consistent speed or concurrency.

### Redshift Spectrum — The Bridge

You don't have to choose. **Redshift Spectrum** lets Redshift query S3 data directly (via the Glue Catalog):

```
         🏛️ Redshift Cluster                🪣 S3 Data Lake
         ┌─────────────────┐              ┌─────────────────┐
         │  🔥 Hot data    │              │  ❄️ Cold data   │
         │  (last 90 days) │              │  (history)      │
         │                 │              │                 │
         └────────┬────────┘              └────────┬────────┘
                  │                                │
                  └───────────┬────────────────────┘
                              ▼
                   🔍 One SQL query, both sources
                         (Redshift Spectrum)
```

- ❄️ Keep cold data on S3 (cheap)
- 🔥 Keep hot data in Redshift (fast)
- 🔗 Query both in a single SQL statement

This is the foundation of a 🏕️ **lakehouse on AWS**.

> **HitaVir Tech says:** "Redshift and Athena are friends, not rivals. Mature data platforms use both — Athena for flexible exploration, Redshift for production dashboards."

## Amazon QuickSight - Visualization
Duration: 5:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws-quicksight.svg" height="80" alt="Amazon QuickSight"/>
</p>

Data and queries are only useful if people can see the answers. That's where 📊 **Amazon QuickSight** comes in.

### What is QuickSight?

📊 **Amazon QuickSight** is AWS's **business intelligence (BI)** service — a managed tool for building dashboards, charts, and interactive analytics.

Think "AWS's answer to 📈 Tableau, 📉 Power BI, or 👁️ Looker."

### Key Features

- 🔌 **Connects to many sources** — S3 (via Athena), Redshift, RDS, Aurora, Salesforce, Excel, and more
- 🌶️ **SPICE engine** — in-memory columnar cache for fast dashboards
- 🧠 **Auto-narratives** — AI-generated natural-language insights
- 💬 **Q (Natural language)** — ask questions in English; QuickSight answers
- 🧩 **Embedded analytics** — embed dashboards into your own app

### QuickSight Editions

| Edition | For |
|---------|-----|
| **Standard** | Basic BI for a single user or small team |
| **Enterprise** | Full features, SSO, row-level security, embedding |

### Typical QuickSight Workflow

```
  🔍 Athena table  ──>  🌶️ SPICE cache  ──>  📊 Visuals  ──>  🖥️ Dashboard  ──>  👥 Share
     (data source)       (in-memory)       (charts/KPIs)     (compose)        (or embed)
```

1. 🔌 Connect a data source (e.g., your Athena table from earlier)
2. 🌶️ Import into SPICE (or use direct query)
3. 📊 Build visuals — bar charts, line charts, KPIs, tables
4. 🖥️ Compose them into dashboards
5. 👥 Share with users or embed in an app

### Hands-on in Part 2

We'll connect QuickSight to the Athena table you just created and build a dashboard of top customers, best products, and daily revenue.

> **HitaVir Tech says:** "A beautiful dashboard with bad data loses trust. An ugly dashboard with good data builds trust. Always prioritize correctness over aesthetics — then polish."

## Security Basics for Analytics
Duration: 6:00

<p align="center">
  <img src="https://api.iconify.design/logos:aws-iam.svg" height="80" alt="AWS IAM"/>
</p>

Analytics and security are not opposite goals. A good analytics platform makes the right data accessible to the right people — nothing more.

### AWS Identity and Access Management (IAM)

🔐 **IAM** is the permissions system for AWS. It defines:

- 👤 **Users** — human or programmatic identities
- 👥 **Groups** — collections of users
- 🎭 **Roles** — temporary identities services (like Glue or Athena) assume
- 📜 **Policies** — JSON documents that describe what's allowed/denied

```
   👤 User ──┐
   👥 Group ─┼──> 📜 Policy (JSON) ──> "Can READ s3://my-bucket/sales/"
   🎭 Role ──┘
```

### The Principle of Least Privilege

> 🌟 Give every user and service **only** the permissions they need — no more.

In analytics, common examples:

| Identity | Icon | Typical Permissions |
|----------|:---:|--------------------|
| Data engineer | 🛠️ | Read/write S3 lake, run Glue jobs, query Athena |
| Analyst | 📊 | Read Athena tables, use QuickSight, read specific S3 prefixes |
| Dashboard user | 👁️ | View QuickSight dashboards only |
| Glue service role | 🎭 | Read source S3, write curated S3, update Glue Catalog |

Never give `AdministratorAccess` to everyone. Design roles narrowly.

### S3 Bucket Policies vs IAM Policies

S3 has two overlapping permission mechanisms:

- **IAM policies** — attached to users or roles ("who can do what")
- **Bucket policies** — attached to the bucket ("who can access this bucket and how")

Modern best practice:
- Use IAM policies for user and role permissions
- Use bucket policies for organization-wide rules (e.g., "deny all unencrypted uploads")
- **Block public access** at the account level unless you truly need a public bucket

### Encryption

Two types:

- 💾 **Encryption at rest** — data on disk is encrypted. S3 does this automatically with **SSE-S3** (AWS keys) or **SSE-KMS** (your keys via AWS KMS)
- 🌐 **Encryption in transit** — data moving between services is encrypted with TLS

> 🛡️ **Default rule:** enable SSE-S3 on every bucket. If compliance requires, use SSE-KMS.

### Data Classification

Before you give someone access, know what the data is:

| Classification | Icon | Examples | Access |
|----------------|:---:|----------|--------|
| Public | 🟢 | Marketing metrics | Everyone |
| Internal | 🟡 | Sales summaries | Employees |
| Confidential | 🟠 | Customer PII | Specific roles only |
| Restricted | 🔴 | Payment card data | Heavily audited, encrypted |

Use different buckets (or bucket prefixes) for different classifications and tag them.

> **HitaVir Tech says:** "Security failures in analytics are almost never because of hackers. They're because someone inside the company had access to data they shouldn't have had. Start with least privilege and you avoid 95% of problems."

## Cost Considerations
Duration: 5:00

💰 Cloud analytics can be incredibly cheap — or surprisingly expensive. Understanding costs is an analytics engineering skill.

### The Three Cost Buckets

For our stack (🪣 S3 + 🕸️ Glue + 🔍 Athena), there are three costs to watch:

**1. 🪣 S3 storage**
- ~$0.023 per GB per month (S3 Standard, varies by region)
- Lifecycle policies auto-move older data to 🌡️ Intelligent-Tiering or 🧊 Glacier

**2. 🕸️ Glue**
- Crawlers: ~$0.44 per DPU-hour (small crawlers run in minutes)
- Data Catalog storage: free up to 1M objects, then ~$1 per 100K objects/month
- Glue ETL jobs: ~$0.44 per DPU-hour

**3. 🔍 Athena**
- $5 per TB scanned
- $0 per query structure — only scanning costs money

### The Four Levers That Reduce Cost

| # | Lever | Icon | Impact |
|---|-------|:---:|--------|
| 1 | Partition your data | 🧩 | Scan less per query |
| 2 | Use Parquet + compression | 🗂️ | Fewer bytes per column |
| 3 | Project only columns needed | 🎯 | Never `SELECT *` in prod |
| 4 | Filter early with `WHERE` | 🪤 | Push conditions to partitions |

### A Real Example — Same Data, 3,000x Cheaper

Imagine you have 1 TB of sales data:

| Storage format | Icon | Query scans | Cost |
|----------------|:---:|-------------|:----:|
| One big CSV, unpartitioned | 📄 | 1,000 GB | 💸 $5.00 |
| CSV partitioned by day | 📁 | ~2.7 GB | 💰 1.3¢ |
| Parquet partitioned by day | 🗂️ | ~0.3 GB | 🪙 0.15¢ |

> 🌟 Same data, same query, same result — **~3,000x cheaper** with the right storage design.

### AWS Cost Tools

- 📋 **Billing Dashboard** — check current month spend
- 📈 **AWS Cost Explorer** — visualize spending trends
- 🔔 **AWS Budgets** — set an alert when you exceed a threshold
- 🏷️ **Tagging** — tag every resource with a cost-center to track spend

> ⚠️ **Do this now:** create a **$5 monthly budget** on your account as a guardrail.

> **HitaVir Tech says:** "Cost awareness is not about being cheap — it's about being responsible. A data platform that costs more than the decisions it enables is a failure, no matter how beautiful the architecture is."

## Summary and What's Next
Duration: 3:00

🎉 You just covered the foundations of analytics on AWS. That was a lot. Let's recap.

### What You Learned

| Topic | Icon |
|-------|:---:|
| Analytics fundamentals — the four maturity levels | 📈 |
| AWS analytics landscape — 15 services, 5 that matter most | ☁️ |
| Data types — structured, semi-structured, unstructured | 🧩 |
| Batch vs streaming — when to use each | 📦 🌊 |
| OLTP vs OLAP — the most important dichotomy | 🛒 📊 |
| Amazon S3 — the storage foundation | 🪣 |
| Data lakes vs data warehouses — and the lakehouse | 🏞️ 🏛️ |
| AWS Glue Data Catalog — metadata, crawlers, partitions | 📚 🕷️ |
| Amazon Athena — serverless SQL on S3 | 🔍 |
| Amazon Redshift — when to move beyond Athena | 🏛️ |
| Amazon QuickSight — visualization | 📊 |
| IAM and security basics — least privilege | 🔐 |
| Cost awareness — the four levers | 💰 |

### Hands-On Skills You Now Have

- 🪣 Creating an S3 bucket
- ⬆️ Uploading data to S3
- 🕷️ Creating a Glue crawler
- 📚 Viewing tables in the Glue Data Catalog
- 🔍 Running SQL queries with Athena
- 🧹 Cleaning up AWS resources

That is a real, production-style analytics pipeline. You could genuinely use this pattern for small-to-medium analytics workloads at a real company.

### What's Coming in Part 2

🚀 Part 2 — **Fundamentals of Analytics on AWS - Part 2** — will cover:

- ⚙️ Transforming data with Glue ETL (Spark)
- 🧪 Data quality and schema evolution
- 🧩 Partitioning, Parquet conversion, and optimization in depth
- 🏛️ Redshift hands-on — provisioning, loading, querying
- 🔗 Redshift Spectrum — queries spanning S3 and the warehouse
- 📊 Building a real QuickSight dashboard
- 🗓️ Scheduling and orchestration basics
- 🌊 Streaming ingestion with Kinesis
- 🛡️ Data governance with Lake Formation
- 🎯 A capstone project

### What You Should Do Next

1. **Explore on your own** — upload a different CSV (a Kaggle dataset, for example) and repeat the lab
2. **Read the AWS docs** — specifically, the Athena and Glue user guides
3. **Watch your AWS bill for a few days** — confirm your cleanup worked
4. **Prepare for Part 2** — make sure your AWS account is still active and in free tier

### Final Thoughts

The entire modern data stack — from Snowflake to Databricks to Fabric — is built on the same handful of concepts you just learned. Storage layers. Catalogs. Query engines. Columnar formats. Partitions. IAM. Cost levers.

AWS is just one flavor. Azure and GCP have direct equivalents. Once you have the mental model, you can learn any cloud's analytics stack in a week.

> **HitaVir Tech says:** "Analytics is not about tools. Tools change every two years. Analytics is about asking the right question, finding the right data, and presenting an insight people can act on. Master the fundamentals, and every new tool becomes just another syntax."

🎓 Welcome to cloud analytics. See you in Part 2.

— **HitaVir Tech** ☁️

summary: Fundamentals of Analytics on AWS - Part 1 - Analytics Concepts and the 5 Vs of Big Data
id: aws-analytics-fundamentals-part1
categories: AWS, Analytics, Cloud, Data Engineering
tags: aws, analytics, big-data, 5vs, s3, glue, athena, redshift, kinesis, quicksight, beginner, fundamentals
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Fundamentals of Analytics on AWS - Part 1

## Overview
Duration: 5:00

```
    ╔═══════════════════════════════════════════════════════╗
    ║     ☁️   AWS  ANALYTICS  FUNDAMENTALS  —  PART 1   ☁️    ║
    ║                                                       ║
    ║     Concepts  •  The 5 Vs  •  AWS Service Mapping     ║
    ╚═══════════════════════════════════════════════════════╝
```

Welcome to **Fundamentals of Analytics on AWS - Part 1** by **HitaVir Tech**!

This codelab builds your mental model for analytics in the cloud — one concept at a time, one AWS service at a time. No prior AWS experience required.

### What You Will Learn

**🧠 Analytics Concepts**
- What **Analytics** is and why it matters
- What **Machine Learning** is and how it relates to analytics
- The **5 Vs of Big Data** — Volume, Variety, Velocity, Veracity, Value

**☁️ AWS Services for Analytics**
- AWS services that handle **Volume** (scale)
- AWS services that handle **Variety** (formats)
- AWS services that handle **Velocity** (speed)
- AWS services that handle **Veracity** (quality)
- AWS services that handle **Value** (outcomes)

**🛠️ Hands-on**
- Build a mini analytics pipeline on AWS (S3 → Glue → Athena)

### The Big Picture

```
                        📊  ANALYTICS
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
      🧠 Thinking      📏 The 5 Vs         ☁️ AWS Services
       (concepts)      (what makes         (what solves
                        it hard)             each challenge)

                     ┌─────┬─────┬─────┬─────┬─────┐
                     │  V  │  V  │  V  │  V  │  V  │
                     │ ol  │ ar  │ el  │ er  │ al  │
                     │ u   │ i   │ o   │ a   │ u   │
                     │ m   │ e   │ c   │ c   │ e   │
                     │ e   │ t   │ i   │ i   │     │
                     │     │ y   │ t   │ t   │     │
                     │     │     │ y   │ y   │     │
                     └─────┴─────┴─────┴─────┴─────┘
                       📦    🧩    🌊    🛡️    💎
```

### Why This Matters for Your Career

Every modern data engineer, analyst, or ML practitioner encounters these challenges every day:

- 📦 "How do we store 500 TB of logs?" → **Volume problem**
- 🧩 "We have CSVs, JSON, images, and audio — one pipeline?" → **Variety problem**
- 🌊 "We need dashboards to update every 30 seconds" → **Velocity problem**
- 🛡️ "Half our timestamps are malformed" → **Veracity problem**
- 💎 "Who actually uses this dashboard?" → **Value problem**

The 5 Vs give you a **framework** to diagnose any data project. AWS gives you a **toolbox** to solve each V.

### Estimated Duration

**3 - 4 hours** (concepts + hands-on lab).

> **HitaVir Tech says:** "The 5 Vs aren't just an academic framework — they're the checklist every senior engineer runs in their head when someone says 'we have a data problem.' Learn to speak this language."

## Prerequisites
Duration: 3:00

### Required

- 💻 A laptop (Windows, Mac, or Linux)
- 🌐 A web browser (Chrome, Edge, or Firefox)
- ☁️ An **AWS account** — free tier is more than enough for this codelab
- 💳 A credit card (required for AWS sign-up; no charges if you stay in free tier)
- 🧮 Basic SQL familiarity (`SELECT`, `FROM`, `WHERE`) — the MySQL Workbench codelab is a good warm-up

### Helpful But Not Required

- 📝 Any exposure to Python or spreadsheets
- 🟦 Experience with another cloud (Azure, GCP) — the concepts map across

### No Local Installs

Everything in this codelab runs in the **AWS web console** in your browser. Nothing to install.

### ⚠️ Cost Awareness

AWS is a paid service. Every step in this codelab stays inside the **AWS Free Tier**, which includes:

| Free Tier Allowance | What We Use |
|---------------------|-------------|
| 🪣 5 GB S3 storage | < 1 MB |
| 🔍 Athena queries (very cheap) | < 10 queries, < 1 cent total |
| 📚 Glue Data Catalog (free for first 1M objects) | 1 table |

> ⚠️ **Important:** Don't leave resources running. The last step is a **cleanup section**. Follow it to avoid surprise bills.

## Analytics Concepts
Duration: 4:00

```
   ┌──────────────────────────────────────────────────┐
   │   🧠   SECTION  1  —  ANALYTICS  CONCEPTS   🧠    │
   └──────────────────────────────────────────────────┘
```

Before we touch AWS, let's agree on what the core words mean. Three ideas anchor everything:

1. 📊 **Analytics** — turning data into decisions
2. 🤖 **Machine Learning** — algorithms that learn patterns from data
3. 📏 **The 5 Vs of Big Data** — the challenges that make it hard

Each concept builds on the previous one. Let's go.

## Analytics
Duration: 6:00

### What is Analytics?

📊 **Analytics** is the practice of turning raw data into useful insights that help people make better decisions.

That's the one-line definition. Everything else — SQL queries, dashboards, data lakes, ML models — is just tooling in service of that one activity.

### Real-World Example: A Coffee Shop Chain

Imagine **HitaVir Coffee** — 50 locations across India. Every day, each store generates data:

```
   ☕ Orders       💰 Transactions    👥 Loyalty swipes
   📦 Inventory   🕐 Staff hours     🌡️ Equipment logs
```

Each data point alone is meaningless. A customer bought a cappuccino at 9:47 AM — so what?

But aggregate across all stores for a year, and patterns emerge:

| Question | Insight | Action |
|----------|---------|--------|
| "Which day is slowest?" | Mondays | Run a promotion |
| "Which store sells 2x pastries?" | Store #23 | Copy their layout |
| "When do cappuccinos drop?" | Summer | Push cold brew |

That journey — **from raw events to business decisions** — is analytics.

### The Four Levels of Analytics

The industry classifies analytics into four levels of maturity:

```
            Level 4  🎯  PRESCRIPTIVE    What should we do?
                          ▲
            Level 3  🔮  PREDICTIVE      What will happen?
                          ▲
            Level 2  🕵️  DIAGNOSTIC       Why did it happen?
                          ▲
            Level 1  📸  DESCRIPTIVE      What happened?
```

| Level | Icon | Question | Example |
|-------|:---:|----------|---------|
| **1. Descriptive** | 📸 | What happened? | "We sold 12,400 cappuccinos last month" |
| **2. Diagnostic** | 🕵️ | Why did it happen? | "Sales dropped because we ran out of beans for 3 days" |
| **3. Predictive** | 🔮 | What will happen? | "Based on trends, June sales will rise 15%" |
| **4. Prescriptive** | 🎯 | What should we do? | "Order 200 kg of beans by May 25 to meet June demand" |

Most companies live at levels 1 and 2. **Analytics engineers build the foundation** that makes levels 3 and 4 possible.

### What Analytics Is NOT

- ❌ Analytics is **not** the same as data engineering. Data engineering builds the pipes; analytics drinks from them.
- ❌ Analytics is **not** the same as BI. BI is mainly dashboards; analytics is broader.
- ❌ Analytics is **not** machine learning. ML is a specialized branch that predicts the future; most analytics is about understanding the past.

> **HitaVir Tech says:** "Never build a dashboard nobody looks at. Always ask: *what decision will this insight change?* If the answer is 'none,' don't build it."

## Machine Learning
Duration: 6:00

### What is Machine Learning?

🤖 **Machine Learning (ML)** is a branch of AI where algorithms **learn patterns from data** instead of being explicitly programmed.

### Traditional Programming vs Machine Learning

```
   TRADITIONAL PROGRAMMING              MACHINE LEARNING
   ─────────────────────────            ──────────────────────
   Rules + Data ──> Program ──> Answer  Data + Answers ──> Program ──> Rules

   You write the rules.                 The machine learns the rules.
   Example: if amount > 50000,          Example: feed 1M past fraud
   flag as suspicious.                  cases; model learns patterns.
```

- In **traditional programming**, a human writes `if-else` logic.
- In **machine learning**, the machine reads historical data and **figures out the logic itself**.

### Three Flavors of ML

```
   🎯 SUPERVISED          🔎 UNSUPERVISED       🎮 REINFORCEMENT
   ───────────────        ────────────────      ────────────────
   Data has labels        Data has no labels    Agent tries actions
   ("this is spam")       Find structure        Gets rewards/penalties

   Predict price,         Cluster customers,    Game AI, robotics,
   detect fraud,          anomaly detection,    recommendation systems
   image classification   topic discovery
```

| Type | Icon | What It Does | AWS Service |
|------|:---:|--------------|-------------|
| Supervised | 🎯 | Learn from labeled examples | Amazon SageMaker |
| Unsupervised | 🔎 | Find structure in raw data | Amazon SageMaker, Comprehend |
| Reinforcement | 🎮 | Learn by trial-and-error rewards | SageMaker RL, DeepRacer |

### How ML Relates to Analytics

Remember the four levels of analytics? **ML powers levels 3 and 4:**

```
   Descriptive ── Diagnostic ──► Predictive ──► Prescriptive
      📸              🕵️            🔮 ML          🎯 ML+Optim
    (SQL)           (SQL)          (model)        (model + rules)
```

- 📊 **Analytics** says: "Sales dropped 20% last quarter in the South."
- 🤖 **ML** says: "Here's a model that predicts next quarter's sales per region, ±3%."

You cannot have good ML without good analytics foundations — the 5 Vs problems apply to ML even more sharply.

> **HitaVir Tech says:** "ML is not magic. It's statistics at scale. If your analytics foundations are shaky, your ML models will be too. Clean data first, cool models second."

## The 5 Vs of Big Data
Duration: 5:00

```
   ┌──────────────────────────────────────────────────┐
   │   📏   SECTION  2  —  THE  5  Vs  OF  BIG DATA   │
   └──────────────────────────────────────────────────┘
```

### Where the 5 Vs Came From

In 2001, analyst **Doug Laney** described data challenges with three Vs: **Volume, Variety, Velocity**. Over the years, the industry added two more: **Veracity** (quality/trust) and **Value** (outcome).

Together, they form a checklist you can run against any data project.

### The 5 Vs at a Glance

```
                         📊 BIG DATA

         📦 VOLUME                         🧩 VARIETY
       How much is it?                 How many formats?

                    ╲                    ╱
                     ╲                  ╱
                      ╲                ╱
           🌊 VELOCITY  ─── 💎 VALUE ─── 🛡️ VERACITY
           How fast?       Worth it?      Can we trust it?
```

| V | Icon | Meaning | Core Question |
|---|:---:|---------|---------------|
| 1 | 📦 | **Volume** | How much data? |
| 2 | 🧩 | **Variety** | How many formats? |
| 3 | 🌊 | **Velocity** | How fast does it arrive / need to be processed? |
| 4 | 🛡️ | **Veracity** | How trustworthy is it? |
| 5 | 💎 | **Value** | What business outcome does it drive? |

Miss any one V and your data platform has a hole. Let's tour them.

## Volume
Duration: 6:00

```
   ┌─────────────────────────────────────────────┐
   │   📦   THE  1st  V  —  VOLUME   📦           │
   │         "How much data do we have?"         │
   └─────────────────────────────────────────────┘
```

### What is Volume?

📦 **Volume** is the size of your data — how many bytes, rows, events, or files you need to store, move, and process.

### The Scale Ladder

```
   🐣 Byte (B)           1
   🐥 Kilobyte (KB)      1,000        1 text email
   🐤 Megabyte (MB)      10⁶          1 MP3 song
   🐔 Gigabyte (GB)      10⁹          A DVD movie
   🦅 Terabyte (TB)      10¹²         A company's year of sales
   🐘 Petabyte (PB)      10¹⁵         YouTube uploads per day
   🐋 Exabyte (EB)       10¹⁸         All of Netflix's streaming data
   🦖 Zettabyte (ZB)     10²¹         The entire internet per year
```

### Why Volume is Hard

A traditional database happily runs on one server up to ~1-10 TB. Beyond that, things break:

- 💥 A single disk is too small
- 💥 A single CPU can't scan it in reasonable time
- 💥 Backups take days
- 💥 Failures become likely (any one disk in a fleet of 1000 fails often)

At big-data scale, you need **distributed** systems — hundreds of machines sharing the load.

### Real-World Volume Examples

| Company | Daily Volume |
|---------|--------------|
| 📱 Instagram | ~100+ million photos uploaded |
| 🛒 Amazon | Billions of events per day |
| 🚗 Uber | Tens of terabytes of trip data |
| 🎬 Netflix | Petabytes of logs and streams |

### The Questions Volume Forces You to Ask

- Where do I **store** 500 TB affordably?
- How do I **scan** 10 TB in minutes, not days?
- How do I **back up** a multi-petabyte system?
- How do I **pay** for this without going bankrupt?

> **HitaVir Tech says:** "Volume changes the rules. What works on 10 GB of data will catastrophically fail at 10 TB. Always ask: *how does this scale at 100x?*"

## Variety
Duration: 6:00

```
   ┌─────────────────────────────────────────────┐
   │   🧩   THE  2nd  V  —  VARIETY   🧩           │
   │        "How many kinds of data?"            │
   └─────────────────────────────────────────────┘
```

### What is Variety?

🧩 **Variety** is the diversity of your data — in formats, schemas, and sources.

Twenty years ago, "data" meant **rows in a database**. Today, "data" includes:

```
   📊 Structured      🧩 Semi-structured     🎞️ Unstructured
   ────────────        ──────────────────    ─────────────────
   • SQL tables       • JSON from APIs      • Images
   • CSV files        • XML                 • Videos
   • Spreadsheets     • Parquet / Avro      • Audio / voice
                      • Logs                • PDFs
                                            • Free-text reviews
```

### Three Data Categories

| Type | Icon | Description | Example |
|------|:---:|-------------|---------|
| **Structured** | 📊 | Fixed rows + columns | Sales table, CSV |
| **Semi-structured** | 🧩 | Flexible, self-describing | JSON from an API |
| **Unstructured** | 🎞️ | No predefined schema | Photos, videos, PDFs |

### Why Variety is Hard

Each format needs different tools:

- SQL for tables
- JSON parsers for APIs
- OCR for scanned PDFs
- Computer vision for images
- NLP for free text

And most real projects combine them: "Correlate customer support **emails** (text) with **call recordings** (audio) and **order history** (tables)." That's **three completely different pipelines** feeding one insight.

### Real-World Variety Examples

| Industry | Variety Mix |
|----------|-------------|
| 🏥 Healthcare | Patient records (SQL) + X-ray images + doctor's notes |
| 🛒 Retail | Orders (SQL) + product photos + customer reviews (text) |
| 🏦 Banking | Transactions (SQL) + scanned checks + call transcripts |
| 🚗 Autonomous vehicles | Sensor data (numeric) + video + LiDAR + map tiles |

### The Questions Variety Forces You to Ask

- Can **one storage system** hold all my data types?
- How do I **catalog** schemas that keep changing?
- Which engine queries **JSON, CSV, and Parquet** in one SQL statement?
- How do I extract insights from **unstructured** data?

> **HitaVir Tech says:** "90% of the world's data is unstructured. But 90% of analytics happens on structured or semi-structured data. Your job as an engineer is often to convert chaos into order."

## Velocity
Duration: 6:00

```
   ┌─────────────────────────────────────────────┐
   │   🌊   THE  3rd  V  —  VELOCITY   🌊          │
   │           "How fast is the data?"           │
   └─────────────────────────────────────────────┘
```

### What is Velocity?

🌊 **Velocity** is the speed at which data **arrives**, **moves**, and **must be processed** to deliver value.

### The Velocity Spectrum

```
   🐌 BATCH              🐇 MINI-BATCH         🚀 STREAMING        ⚡ REAL-TIME
   ───────────           ─────────────         ──────────────      ─────────────
   Hourly / daily        Every 1-15 min        Seconds             Sub-millisecond
   "Yesterday's sales"   "Hour-old metrics"    "Live dashboard"    "Fraud in 50ms"
```

| Freshness Need | Icon | Approach | Example Use Case |
|----------------|:---:|----------|------------------|
| Next business day | 🐌 | Batch (nightly) | Finance reports |
| Within the hour | 🐇 | Mini-batch | Ops dashboards |
| Within seconds | 🚀 | Streaming | Live pricing |
| Sub-millisecond | ⚡ | Real-time | Fraud detection |

### Why Velocity is Hard

Fast data means you can't wait:

- Disks are too slow — data must live in memory or distributed caches
- Batch SQL isn't enough — you need **stream-processing engines**
- One machine can't keep up — systems must **scale out horizontally**
- Failures become catastrophic — if the stream lags by 10 minutes, the business misses events

### Real-World Velocity Examples

| Scenario | Required Velocity |
|----------|-------------------|
| 💳 Credit card fraud detection | Sub-100 ms |
| 📈 Stock trading | Microseconds |
| 📱 Social media feed | Seconds |
| 🚚 Delivery tracking | Minutes |
| 📊 Executive BI dashboard | Hourly refresh |
| 🧾 Monthly close reports | Daily batch |

### The Questions Velocity Forces You to Ask

- Do we really need **real-time**, or is a 5-minute delay fine?
- How do we handle **late-arriving** events?
- What if the **stream falls behind** during a spike?
- How do we **replay** events if a downstream system fails?

> **HitaVir Tech says:** "Streaming is fashionable. Batch is profitable. 80% of real-world analytics runs on batch and that is completely fine. Don't reach for streaming unless the business truly cannot wait."

## Veracity
Duration: 6:00

```
   ┌─────────────────────────────────────────────┐
   │   🛡️   THE  4th  V  —  VERACITY   🛡️          │
   │       "Can we trust the data?"              │
   └─────────────────────────────────────────────┘
```

### What is Veracity?

🛡️ **Veracity** is the quality, accuracy, and trustworthiness of your data.

Big volumes and fast pipelines are useless if the data is **wrong**.

### The Veracity Enemies

```
   🦠 Missing values        🗑️ Duplicate rows     🎭 Inconsistent formats
   "NULL in half the rows"  "Same order 3x"       "2024-01-05 vs 01/05/24"

   📉 Outliers              🪙 Unit mismatches     🪞 Biased sampling
   "Age = 347"              "USD mixed with INR"   "Only US users"

   🪤 Stale data            📎 Broken joins        🎲 Random noise
   "Last updated 2019"      "Order without user"   "Flaky sensors"
```

### The GIGO Principle

> **GIGO — Garbage In, Garbage Out.**

A beautiful dashboard built on bad data is worse than no dashboard — it creates **false confidence**. The most dangerous insight is a wrong insight a stakeholder believed.

### How to Measure Veracity

Data quality isn't a single number. Professionals measure it across dimensions:

| Dimension | Icon | Question |
|-----------|:---:|----------|
| **Completeness** | 🧩 | Are all required fields populated? |
| **Accuracy** | 🎯 | Does the data reflect reality? |
| **Consistency** | 🧭 | Do related systems agree? |
| **Timeliness** | ⏰ | Is the data current enough? |
| **Validity** | ✅ | Does it conform to formats/rules? |
| **Uniqueness** | 🔢 | Are there unintended duplicates? |

### Real-World Veracity Failures

| Incident | Consequence |
|----------|-------------|
| 🛰️ NASA Mars Climate Orbiter (1999) | Lost $125M due to metric-vs-imperial unit mismatch |
| 🏦 Knight Capital (2012) | $440M loss in 45 minutes from bad trading data |
| 📊 Google Flu Trends | Overestimated flu peaks by 100%+ due to search bias |

### The Questions Veracity Forces You to Ask

- Do we have **data quality rules** that run on every pipeline?
- Are we **monitoring** schema changes from upstream systems?
- How do we know our data **matches source** systems?
- Who **owns** the quality of each dataset?

> **HitaVir Tech says:** "Senior engineers obsess over data quality. Junior engineers obsess over cool tools. Guess which group builds systems that actually work in production."

## Value
Duration: 6:00

```
   ┌─────────────────────────────────────────────┐
   │   💎   THE  5th  V  —  VALUE   💎             │
   │      "What business outcome does it drive?" │
   └─────────────────────────────────────────────┘
```

### What is Value?

💎 **Value** is the business outcome your data and analytics actually deliver — revenue gained, cost saved, risk reduced, customer experience improved.

Without Value, the other four Vs are just expensive hobbies.

### The Value Pyramid

```
                      💎 VALUE
                     (outcome)
                    ▲
                    │
                    │  enabled by
                    │
            🧠 Insights & decisions
                    ▲
                    │  enabled by
                    │
              📊 Analytics + ML
                    ▲
                    │  enabled by
                    │
          🛡️ Trustworthy (Veracity) data
                    ▲
                    │  moved at the right
                    │  🌊 speed (Velocity)
                    │
             🧩 across varieties
                    ▲
                    │
                    │
           📦 stored at scale (Volume)
```

### Examples of Value

| Industry | Analytics Value |
|----------|-----------------|
| 🛒 Retail | Recommendation engine → +20% revenue |
| 🏦 Banking | Fraud detection → millions saved |
| 🚚 Logistics | Route optimization → -15% fuel cost |
| 🏥 Healthcare | Early diagnosis models → better outcomes |
| 🎬 Streaming | Personalized content → higher retention |

### The Dashboard Graveyard

Most companies have folders full of unused dashboards — the "dashboard graveyard." Every one of them cost engineering time, storage, and compute.

The difference between a **valuable** dashboard and a **graveyard** dashboard is one question:

> 🎯 **"What decision will change because of this?"**

If nobody can answer that, don't build it.

### Measuring Value

Value is hard to quantify but you can proxy it:

- 🔁 **Adoption** — how many people actively use this daily/weekly?
- 💰 **Business metric movement** — did conversion go up after this dashboard?
- ⏱️ **Time saved** — does this replace hours of manual work?
- 🎯 **Decisions influenced** — is leadership using it in meetings?

### The Questions Value Forces You to Ask

- **Who** uses this, and **how often**?
- What **decision** would be different without it?
- What's the **ROI** vs the cost to build and maintain?
- When should we **retire** outdated reports?

> **HitaVir Tech says:** "A data platform that costs more than the decisions it enables is a failure, no matter how beautiful the architecture is. Always lead with Value."

## AWS Services for Analytics - Overview
Duration: 3:00

```
   ┌──────────────────────────────────────────────────┐
   │   ☁️  SECTION  3  —  AWS  SERVICES  BY  THE  5 Vs │
   └──────────────────────────────────────────────────┘
```

Now we map **each V** to the **AWS services** that solve it.

### The 5 Vs → AWS Service Map

```
   📦 VOLUME        🧩 VARIETY       🌊 VELOCITY      🛡️ VERACITY      💎 VALUE
   ──────────       ──────────       ──────────       ──────────       ──────────
   🪣 S3            🪣 S3            🌊 Kinesis       🕸️ Glue          📊 QuickSight
   🏛️ Redshift     🕸️ Glue          🚒 Firehose      DataBrew         🤖 SageMaker
   🐘 EMR           🔍 Athena        🪐 MSK (Kafka)   🛡️ Glue DQ       🔮 Forecast
   🧊 Glacier       🤖 Rekognition   ⚡ Lambda        🏗️ Lake Form.    🎯 Personalize
   📋 Lake Form.    📝 Textract      🎯 Kinesis       🔍 CloudTrail    🧠 Redshift ML
   🗃️ Redshift     🔊 Transcribe    Analytics
                   💭 Comprehend
```

### Remember — the Golden Rule

Every analytics stack on AWS follows the same shape:

```
   INGEST ──► STORE ──► CATALOG ──► PROCESS ──► QUERY ──► VISUALIZE ──► DECIDE
```

The **5 Vs** tell you **where your project's bottleneck is**. The **AWS services** tell you **what solves it**. Let's walk through each V.

## AWS Services for Volume
Duration: 8:00

```
   ┌─────────────────────────────────────────────┐
   │   📦   AWS  FOR  VOLUME   📦                 │
   │    "Store any amount of data, affordably."  │
   └─────────────────────────────────────────────┘
```

### The Volume Toolkit

| Service | Icon | Purpose |
|---------|:---:|---------|
| **Amazon S3** | 🪣 | Object storage — the data lake foundation (infinite scale) |
| **Amazon S3 Glacier** | 🧊 | Cheapest archive tier for cold data |
| **Amazon Redshift** | 🏛️ | Petabyte-scale columnar data warehouse |
| **Amazon EMR** | 🐘 | Managed Spark / Hadoop clusters for huge batch jobs |
| **AWS Lake Formation** | 🏗️ | Manage, govern, and secure a data lake on S3 |
| **Amazon EBS / EFS** | 💾 | Block and file storage for compute workloads |

### 🪣 Amazon S3 — The Volume Hero

S3 is AWS's **object storage** service. Think of it as a limitless, globally accessible hard drive.

- **11 nines** of durability (99.999999999%)
- **Infinite scale** — no practical upper limit
- **Cheap** — ~$0.023 per GB/month for Standard tier
- Every AWS analytics service reads from S3

```
   🪣 s3://hitavirtech-analytics/
      ├── 🥉 raw/         ← untouched source
      ├── 🥈 curated/     ← cleaned Parquet
      └── 🥇 analytics/   ← aggregated for BI
```

### 🧊 Amazon S3 Storage Classes

Not all volume is equal. S3 has tiered storage:

```
    🔥 Standard                  (hot, frequently accessed)     $$$$
    🌡️ Intelligent-Tiering      (auto-moves hot/cold)          $$$
    ❄️ Standard-IA              (monthly access)               $$
    🧊 Glacier Instant          (rare access)                   $
    🗄️ Glacier Flexible         (hours to retrieve)             ¢
    🏔️ Glacier Deep Archive     (compliance vault)              ¢
```

Lifecycle rules auto-move data — hot today, archived next year.

### 🏛️ Amazon Redshift — Petabyte Warehouse

When you need **fast SQL** over huge structured data:

- Columnar storage — blazing aggregations
- Massively parallel processing (MPP)
- Scales to petabytes
- **Redshift Serverless** — pay per query, no cluster to manage
- **RA3 nodes** — storage separate from compute

### 🐘 Amazon EMR — Big-Data Batch

For massive ETL jobs beyond what Glue can handle:

- Managed Hadoop / Spark / Presto / HBase clusters
- Scales to thousands of nodes
- Spot instances drop compute cost by up to 90%
- Ideal for petabyte-scale Spark jobs

### 🏗️ AWS Lake Formation

Once your S3 lake grows, you need governance:

- Centralized permissions across accounts
- Fine-grained access (row-level, column-level)
- Data filters — control who sees what
- Integrates with Glue, Athena, Redshift Spectrum

### Volume Decision Tree

```
   How much data?
         │
         ├── < 1 TB           → 🏛️ Redshift Serverless or RDS
         ├── 1 - 100 TB        → 🪣 S3 + 🔍 Athena (most common)
         ├── 100 TB - 10 PB    → 🪣 S3 + 🏛️ Redshift + 🐘 EMR
         └── > 10 PB           → 🪣 S3 + 🏗️ Lake Formation + 🐘 EMR + 🏛️ Redshift
```

> **HitaVir Tech says:** "Start with S3. S3 is the universal storage layer. Every analytics service on AWS reads from it. You will never regret putting data into S3 — you may regret putting it anywhere else first."

## AWS Services for Variety
Duration: 8:00

```
   ┌─────────────────────────────────────────────┐
   │   🧩   AWS  FOR  VARIETY   🧩                 │
   │    "Handle any data format, elegantly."      │
   └─────────────────────────────────────────────┘
```

### The Variety Toolkit

| Service | Icon | Purpose |
|---------|:---:|---------|
| **Amazon S3** | 🪣 | Holds every format — CSV, JSON, Parquet, images, video |
| **AWS Glue** | 🕸️ | ETL for all formats; crawlers auto-detect schema |
| **AWS Glue Data Catalog** | 📚 | Metadata layer — one view across formats |
| **Amazon Athena** | 🔍 | SQL on CSV, JSON, Parquet, ORC, Avro — all the same |
| **Amazon DynamoDB** | ⚡ | NoSQL for flexible, semi-structured docs |
| **Amazon Rekognition** | 🤖 | Turns images/video into structured labels |
| **Amazon Textract** | 📝 | Extracts text and tables from PDFs and scans |
| **Amazon Transcribe** | 🔊 | Converts speech to text |
| **Amazon Comprehend** | 💭 | NLP: sentiment, entities, topics from text |
| **Amazon OpenSearch** | 🔎 | Full-text search and log analytics |

### 🕸️ AWS Glue — The Variety Engine

Glue is a **serverless ETL** service that speaks every common data format natively:

```
   IN  ──►  🕷️ Glue Crawler  ──►  📚 Glue Catalog  ──►  ⚙️ Glue ETL Job  ──►  OUT
   CSV                             (schema +                                 Parquet
   JSON                            partitions)                              (optimized)
   Parquet
   Avro
   ORC
   Database
```

- 🕷️ **Crawlers** — auto-detect schema for new S3 folders
- 📚 **Data Catalog** — central metadata store (used by Athena, Redshift, EMR)
- ⚙️ **ETL Jobs** — Python or Spark code to transform data
- 🧪 **DataBrew** — visual, no-code data prep

### 🔍 Amazon Athena — One SQL, Many Formats

```sql
SELECT *
FROM csv_orders
JOIN json_customers USING (customer_id)
JOIN parquet_products USING (product_id);
```

Athena reads CSV, JSON, Parquet, ORC, Avro — all via the Glue Catalog. You never leave SQL.

### 🎞️ Handling Unstructured Data

For data with no built-in schema, AWS provides **AI extractors**:

```
   🖼️ Images      ──►  🤖 Rekognition    ──►  Labels, faces, text, moderation
   📄 PDFs/scans   ──►  📝 Textract       ──►  Extracted text, key-value, tables
   🎤 Audio        ──►  🔊 Transcribe     ──►  Text transcripts
   🌐 Text         ──►  💭 Comprehend     ──►  Sentiment, entities, topics
   🌍 Any language ──►  🗣️ Translate      ──►  Translated text
```

This is the **magic** step: unstructured data goes in, **structured features** come out, and then you can put those into S3 / Athena / Redshift as normal.

### Real-World Example: E-Commerce Review Pipeline

```
   💬 Customer review (unstructured text)
              │
              ▼
        💭 Comprehend  ──►  sentiment: negative
              │            topic: shipping
              ▼
        📚 Glue Catalog table: reviews_enriched
              │
              ▼
        🔍 Athena SQL: "avg sentiment per product last month"
              │
              ▼
        📊 QuickSight dashboard
```

### Variety Decision Tree

```
   What format is my data?
            │
            ├── Tabular (CSV / tables)     → 🪣 S3 + 🕸️ Glue + 🔍 Athena
            ├── JSON / semi-structured     → 🪣 S3 + 🔍 Athena, or ⚡ DynamoDB
            ├── Images / video             → 🪣 S3 + 🤖 Rekognition
            ├── PDFs / scanned docs        → 🪣 S3 + 📝 Textract
            ├── Audio / voice              → 🪣 S3 + 🔊 Transcribe
            └── Free text / reviews        → 🪣 S3 + 💭 Comprehend
```

> **HitaVir Tech says:** "The magic of modern analytics is that unstructured data can be turned into structured features in minutes using AWS AI services. What took PhDs and years 10 years ago, today is an API call."

## AWS Services for Velocity
Duration: 8:00

```
   ┌─────────────────────────────────────────────┐
   │   🌊   AWS  FOR  VELOCITY   🌊                │
   │      "Move and process data in real time."  │
   └─────────────────────────────────────────────┘
```

### The Velocity Toolkit

| Service | Icon | Purpose |
|---------|:---:|---------|
| **Amazon Kinesis Data Streams** | 🌊 | Real-time event stream (like Kafka) |
| **Amazon Kinesis Data Firehose** | 🚒 | Buffered streaming delivery to S3 / Redshift |
| **Amazon Managed Streaming for Kafka (MSK)** | 🪐 | Managed Apache Kafka |
| **Amazon Kinesis Data Analytics** | 🎯 | SQL / Flink on streams in real time |
| **AWS Lambda** | ⚡ | Event-driven serverless functions |
| **Amazon DynamoDB Streams** | 🔁 | Change data capture from DynamoDB |
| **Amazon EventBridge** | 🚌 | Serverless event bus across AWS |
| **Amazon SQS / SNS** | 📬 | Queue / pub-sub messaging |

### 🌊 Amazon Kinesis Data Streams — The Real-Time Backbone

Think of Kinesis as a **high-speed conveyor belt** for events:

```
   📱 App events          🌊 Kinesis Data Stream          🧠 Consumers
   🌐 Clickstreams  ──►   ┌──────────────────────┐  ──►  ⚡ Lambda
   📟 IoT sensors         │  ⏩ ⏩ ⏩ ⏩ ⏩ ⏩ ⏩ │       🎯 Kinesis Analytics
   🛒 Transactions        └──────────────────────┘       🏛️ Redshift
                          (durable, ordered, 24h-365d)   🔎 OpenSearch
```

Kinesis holds events durably for 24 hours (up to 365 days) so multiple consumers can read the same stream independently.

### 🚒 Kinesis Data Firehose — The Easy Button

Firehose is the **serverless, zero-management** way to stream into storage:

- **Input:** JSON records via SDK / agent
- **Buffers:** holds for 60 sec or 5 MB
- **Transforms:** optional Lambda enrichment
- **Lands:** S3 (Parquet!) / Redshift / OpenSearch / HTTP endpoint

```
   📱 Producers ──► 🚒 Firehose ──► 🗜️ Convert to Parquet ──► 🪣 S3
                    (no servers,
                     auto-scale)
```

No code. No cluster. It just works.

### 🪐 Amazon MSK — Managed Kafka

If your company already uses **Apache Kafka**, MSK gives you managed Kafka with AWS integrations — the same APIs, without you running ZooKeeper.

### 🎯 Kinesis Data Analytics — Stream SQL

Run **SQL or Apache Flink** on streaming data for continuous analytics:

```sql
CREATE STREAM fraud_alerts AS
SELECT user_id, amount, location
FROM transactions_stream
WHERE amount > 10000 OR is_foreign = TRUE;
```

Results in **milliseconds** — not after the nightly batch.

### ⚡ AWS Lambda — The Universal Glue

Lambda runs a short function every time an event occurs:

```
   🪣 S3 new file  ─┐
   🌊 Kinesis event ├──►  ⚡ Lambda  ──►  🏛️ Redshift load
   🔁 DynamoDB row ─┤            │
   🚌 EventBridge   ┘            └──►  📣 SNS alert
```

Perfect for: reacting to events, enrichment, lightweight transforms, alerting.

### Real-World Velocity Pipeline

```
   🚗 Rideshare app (1M events/sec)
              │
              ▼
       🌊 Kinesis Data Streams
              │
        ┌─────┴─────┬─────────┐
        ▼           ▼         ▼
   ⚡ Lambda   🎯 Analytics  🚒 Firehose
   fraud flag  SQL alerts   (to S3 Parquet)
        │           │           │
        ▼           ▼           ▼
   📣 SNS      📊 Live         🔍 Athena
   to ops      dashboard       historical
```

### Velocity Decision Tree

```
   How fresh must the data be?
            │
            ├── Next day is fine         → 🗓️ Nightly 🕸️ Glue batch
            ├── Every 15 minutes         → 🚒 Firehose → 🪣 S3 + 🔍 Athena
            ├── Seconds                  → 🌊 Kinesis + ⚡ Lambda
            ├── Sub-second               → 🌊 Kinesis + 🎯 Analytics (Flink)
            └── Kafka already in use     → 🪐 MSK
```

> **HitaVir Tech says:** "Every team thinks they need real-time until they see the bill. Start with Firehose and 5-minute micro-batches. You can graduate to full streaming later — most of the time you won't need to."

## AWS Services for Veracity
Duration: 8:00

```
   ┌─────────────────────────────────────────────┐
   │   🛡️   AWS  FOR  VERACITY   🛡️                │
   │     "Make sure the data is trustworthy."     │
   └─────────────────────────────────────────────┘
```

### The Veracity Toolkit

| Service | Icon | Purpose |
|---------|:---:|---------|
| **AWS Glue DataBrew** | 🧪 | Visual data cleaning and profiling |
| **AWS Glue Data Quality** | 🛡️ | Rule-based data-quality checks |
| **Amazon Deequ (library)** | 🔬 | Unit tests for data on Spark |
| **AWS Lake Formation** | 🏗️ | Governance and fine-grained permissions |
| **AWS CloudTrail** | 📜 | Audit every API call (who did what) |
| **AWS Config** | ⚙️ | Track resource configuration drift |
| **Amazon Macie** | 🕵️ | Discover and classify PII in S3 |
| **AWS KMS** | 🔐 | Manage encryption keys |

### 🧪 AWS Glue DataBrew — Clean Visually

DataBrew is a **no-code data prep** tool:

```
   🧪 Load data  ──►  📊 Profile  ──►  🔧 Apply 250+ transforms  ──►  💾 Export
                      (column stats,      (null fill, dedupe,
                       distributions,      standardize, parse dates)
                       anomalies)
```

- Detects anomalies: nulls, outliers, duplicates
- 250+ built-in transformations
- Creates **recipes** that can be scheduled as jobs
- No Python/Spark knowledge needed

### 🛡️ AWS Glue Data Quality — Rules That Guard Your Lake

Define rules; Glue checks them as data flows in:

```
   Rules ──►   order_id IS NOT NULL                 ✅
               amount BETWEEN 0 AND 1_000_000        ✅
               customer_id IN customers.customer_id  ✅
               COUNT(DISTINCT order_id) = COUNT(*)   ❌ 23 duplicates
```

Failing rules can **block the pipeline** or **alert** the team. Quality becomes a pipeline concern, not a tribal one.

### 🏗️ AWS Lake Formation — Governance

Tracks who can access what **at column and row level**:

```
   🏗️ Lake Formation
        │
        ├── 👤 Analyst role: read orders_public (no PII columns)
        ├── 🛠️ Engineer role: read/write all tables
        └── 👁️ Auditor role: read all columns, no writes
```

### 🕵️ Amazon Macie — PII Detection

Macie uses ML to find sensitive data (credit cards, SSNs, names, emails) hidden in S3 buckets. If analytics data contains customer PII by accident, Macie flags it.

### 📜 AWS CloudTrail + AWS Config

For audit and compliance:

- 📜 **CloudTrail** — logs every API call ("who clicked what, when")
- ⚙️ **AWS Config** — snapshots resource configuration over time ("was this bucket ever public?")

Essential for regulated industries (finance, healthcare).

### The Data Quality Lifecycle

```
   🧪 Profile         ──►  Understand what's in the data
   ✍️ Define rules     ──►  "Expected" shape of clean data
   🛡️ Enforce          ──►  Check on every pipeline run
   🚨 Alert            ──►  Fail fast, tell owners
   🔧 Remediate        ──►  Fix source or add transforms
   📊 Monitor over time ──►  Score trends, dashboards
```

### Real-World Example: Sales Lake Quality

```
   📊 Raw sales CSV from 50 stores
        │
        ▼
   🕸️ Glue ETL reads it
        │
        ▼
   🛡️ Glue Data Quality checks:
        - order_id unique?          ✅
        - amount in [0, 1M]?        ✅
        - store_id in valid list?   ❌ 12 bad rows
        │
        ▼
   🚨 Bad rows → quarantine bucket + SNS alert
   ✅ Good rows → curated zone in Parquet
```

> **HitaVir Tech says:** "Every pipeline must have data quality rules. Not 'someday' — from day one. It's 10x cheaper to catch bad data at ingestion than to explain a wrong dashboard to the CEO."

## AWS Services for Value
Duration: 8:00

```
   ┌─────────────────────────────────────────────┐
   │   💎   AWS  FOR  VALUE   💎                   │
   │     "Turn data into decisions and ROI."      │
   └─────────────────────────────────────────────┘
```

### The Value Toolkit

| Service | Icon | Purpose |
|---------|:---:|---------|
| **Amazon QuickSight** | 📊 | Dashboards, BI, natural-language analytics |
| **Amazon SageMaker** | 🤖 | Build, train, deploy ML models |
| **Amazon Forecast** | 🔮 | No-code time-series forecasting |
| **Amazon Personalize** | 🎯 | Recommendation engines |
| **Amazon Fraud Detector** | 🚨 | Fraud-prediction models |
| **Amazon Q in QuickSight** | 💬 | Ask data questions in natural language |
| **Amazon Bedrock** | 🧠 | Foundation models (Claude, Llama, etc.) |
| **Redshift ML** | 🧠 | Train and run ML using SQL in Redshift |
| **Amazon Lookout for Metrics** | 👁️ | Auto-detect anomalies in business KPIs |

### 📊 Amazon QuickSight — BI for Everyone

QuickSight is AWS's **business intelligence** service — the consumer of all your pipelines:

- Connects to S3 (via Athena), Redshift, RDS, Aurora, Salesforce, Excel
- **SPICE** — in-memory cache for blazing dashboard speed
- 📊 Charts, KPIs, pivot tables, maps
- 👥 Embedded analytics inside your own apps
- 💬 **Amazon Q** — ask "What were top products last month?" in plain English

```
   🔍 Athena / 🏛️ Redshift  ──►  🌶️ SPICE  ──►  📊 Visuals  ──►  🖥️ Dashboard
```

### 🤖 Amazon SageMaker — ML at Scale

For custom machine learning:

- **SageMaker Studio** — full IDE for ML in the browser
- **Built-in algorithms** — 17+ algorithms ready to go
- **AutoPilot** — auto-ML (tries many models, picks the best)
- **Pipelines** — train, evaluate, deploy models as code
- **Model Monitor** — catch model drift in production

### 🔮 Amazon Forecast — No-Code Time-Series ML

Predict demand, sales, traffic — without writing ML code:

```
   📈 Historical sales + 🌡️ weather + 🎉 holidays
                       │
                       ▼
                 🔮 Forecast (AutoML picks the best model)
                       │
                       ▼
              Daily predictions per SKU per store
```

Uses the same tech Amazon uses internally for demand forecasting.

### 🎯 Amazon Personalize — Recommendations

Build Netflix-style recommendations in hours:

```
   User ─┐
   Item ─┼──► 🎯 Personalize ──►  "You might like: ..."
   Event─┘
```

### 💬 Amazon Q in QuickSight — Natural-Language BI

```
   User types: "Show me top 5 products last quarter"
               │
               ▼
   💬 Q interprets, writes SQL, runs, visualizes
               │
               ▼
   📊 Bar chart appears in 2 seconds
```

Analysts no longer gatekeep simple questions.

### 🧠 Redshift ML — SQL-Native ML

Train models using SQL, in your data warehouse:

```sql
CREATE MODEL churn_model
FROM customer_features
TARGET churned
FUNCTION predict_churn
IAM_ROLE DEFAULT
SETTINGS (S3_BUCKET 'my-ml-bucket');
```

Then:

```sql
SELECT customer_id, predict_churn(features) AS risk
FROM customers;
```

ML without ever leaving your warehouse.

### The Value Stack

```
   🛠️  BUILD LAYER       Data engineers → pipelines & lakes
         ▲
         │
   🧪  ANALYSIS LAYER    Analysts → SQL, dashboards, reports (QuickSight, Athena)
         ▲
         │
   🤖  ML LAYER          Data scientists → predictions (SageMaker, Forecast)
         ▲
         │
   🎯  APPLICATION LAYER Product teams → features (Personalize, Fraud Detector)
         ▲
         │
   💎  BUSINESS VALUE    Executives → decisions → revenue, savings, growth
```

> **HitaVir Tech says:** "The best data platform in the world is worthless if nobody uses the outputs. Start from Value and work backwards — who sees which insight, and what decision changes? Design everything else to serve that."

## Putting It All Together
Duration: 5:00

```
   ┌─────────────────────────────────────────────┐
   │   🔗   END-TO-END  ANALYTICS  ON  AWS   🔗    │
   └─────────────────────────────────────────────┘
```

Let's combine all 5 Vs into one architecture:

```
                         📦 VOLUME                 🧩 VARIETY
                     ┌──────────────┐           ┌──────────────┐
                     │   🪣  S3      │           │   🕸️ Glue    │
   🌊 VELOCITY       │  Data Lake   │   📚     │   Crawlers   │
  ┌──────────────┐   │  (raw/curat/ │  Catalog  │  auto-detect │
  │ 🌊 Kinesis    │──►│   analytics)│◄──────────│   schemas    │
  │ 🚒 Firehose   │   └──────┬──────┘           └──────────────┘
  │ ⚡ Lambda     │          │
  └──────────────┘          │
                            ▼                    🛡️ VERACITY
                   ┌──────────────────┐        ┌──────────────────┐
                   │  🕸️  Glue ETL    │        │  🛡️ Glue DQ      │
                   │  (transform)    │◄───────│  🧪 DataBrew     │
                   │                 │        │  🏗️ Lake Formation│
                   └────────┬────────┘        └──────────────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │  🪣  S3 curated  │
                   │    (Parquet)     │
                   └────────┬─────────┘
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
          🔍 Athena   🏛️ Redshift   🤖 SageMaker
         (SQL on S3)  (warehouse)   (ML models)
                │           │           │
                └───────────┴───────────┘
                            │
                            ▼
                     💎 VALUE LAYER
                ┌─────────────────────┐
                │  📊 QuickSight      │
                │  💬 Q (natural lang)│
                │  🔮 Forecast        │
                │  🎯 Personalize     │
                └─────────────────────┘
                            │
                            ▼
                     🧠 DECISIONS
                     💰 REVENUE
                     🎯 ACTIONS
```

Every arrow is a service. Every box is a V. Together they form a complete analytics platform.

## Hands-on Lab - Your First Analytics Pipeline
Duration: 25:00

```
   ┌─────────────────────────────────────────────┐
   │   🛠️   HANDS-ON  LAB  —  S3 + GLUE + ATHENA │
   └─────────────────────────────────────────────┘
```

Time to build. You will create a mini pipeline that touches **Volume** (S3), **Variety** (CSV auto-cataloged), and **Value** (SQL insights):

```
   Step 1         Step 2-3         Step 4-5           Step 6          Step 7-9
  ┌──────┐       ┌──────┐         ┌──────────┐     ┌────────┐      ┌──────────┐
  │ 📄   │ ────> │ 🪣   │ ──────> │ 🕷️       │ ───>│ 📚     │ ──── │ 🔍       │
  │ CSV  │       │ S3   │         │ Crawler  │     │Catalog │      │ Athena   │
  └──────┘       └──────┘         └──────────┘     └────────┘      └──────────┘
   Prepare       Upload          Create & run      Table auto      Run SQL,
   sample data   to bucket        crawler          populated       get insights
```

### 📄 Step 1 — Prepare Sample Data

On your laptop, create a file called `sales.csv`:

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

### 🪣 Step 2 — Create an S3 Bucket

1. Sign in to the **AWS Management Console**
2. Search for **S3** in the top search bar
3. Click **Create bucket**
4. Bucket name: `hitavirtech-analytics-yourname` (must be globally unique — add your name)
5. Region: choose the closest (`ap-south-1` = Mumbai)
6. Leave defaults; click **Create bucket**

### ⬆️ Step 3 — Upload the CSV

1. Open your bucket → **Create folder** → `raw`
2. Inside `raw/`, **Create folder** → `sales`
3. Inside `raw/sales/` → **Upload** → select `sales.csv` → **Upload**

Your object is now at:
```
🪣 s3://hitavirtech-analytics-yourname/raw/sales/sales.csv
```

### 🕸️ Step 4 — Create Glue Database and Crawler

1. Search for **Glue** in the AWS Console
2. Left menu → **Databases** → **Add database**
3. Name: `hitavirtech_sales_db` → **Create database**
4. Left menu → **Crawlers** → **Create crawler**
5. Name: `hitavirtech-sales-crawler` → **Next**
6. **Add a data source** → S3 → path: `s3://hitavirtech-analytics-yourname/raw/sales/` → **Add**
7. **Next** → **Create new IAM role** named `AWSGlueServiceRole-hitavirtech` → **Create**
8. **Next** → Target database: `hitavirtech_sales_db` → Schedule: **On demand** → **Next** → **Create**

### 🕷️ Step 5 — Run the Crawler

1. Select `hitavirtech-sales-crawler` → **Run crawler**
2. Wait 1-2 minutes until **Status = Completed** and **Table changes = 1 created**

### 📚 Step 6 — Verify the Table

1. Glue → **Tables** → open the new `sales` table
2. Inspect:
   - Columns: `order_id`, `customer`, `product`, `quantity`, `amount`, `order_date`
   - Types: inferred automatically (bigint, string, double)
   - Location: your S3 folder

Glue just auto-discovered the schema.

### 🔍 Step 7 — Query with Athena

1. Open **Athena** in the AWS Console
2. If first time: **Edit settings** → set query results location to `s3://hitavirtech-analytics-yourname/athena-results/`
3. In the editor: Data source = `AwsDataCatalog`, Database = `hitavirtech_sales_db`
4. Run:

```sql
SELECT * FROM sales LIMIT 5;
```

You should see 5 rows. 🎉

### 💡 Step 8 — Run Analytical Queries

```sql
-- Top customers by revenue
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

### 💰 Step 9 — Notice the "Data Scanned" Number

At the bottom of every result: **"Data scanned: 412 B"** or similar.

That number is your bill. At scale, this is the metric every analytics engineer watches. Partitioning + Parquet shrinks it 100-1000x.

### 🧹 Step 10 — Cleanup

> ⚠️ **Important:** forgetting cleanup = surprise AWS bill.

1. **Glue** → Crawlers → delete `hitavirtech-sales-crawler`
2. **Glue** → Databases → delete `hitavirtech_sales_db`
3. **S3** → your bucket → **Empty** (confirm) → then **Delete** (confirm with bucket name)
4. Check **Billing Dashboard** the next day to confirm $0 charges

> **HitaVir Tech says:** "The last 5 minutes of the lab (cleanup) are the most valuable 5 minutes of the entire lab. Engineers who skip it end up with $300 surprise bills."

## Summary and What's Next
Duration: 3:00

```
   ┌─────────────────────────────────────────────┐
   │   🎉   CONGRATULATIONS  —  PART  1  DONE!  🎉│
   └─────────────────────────────────────────────┘
```

You just covered the foundations of analytics on AWS.

### What You Learned

**🧠 Analytics Concepts**

| Topic | Icon |
|-------|:---:|
| Analytics and the four levels | 📊 |
| Machine Learning and its three flavors | 🤖 |

**📏 The 5 Vs of Big Data**

| V | Icon | Question |
|---|:---:|----------|
| Volume | 📦 | How much data? |
| Variety | 🧩 | How many formats? |
| Velocity | 🌊 | How fast? |
| Veracity | 🛡️ | Can we trust it? |
| Value | 💎 | What outcome does it deliver? |

**☁️ AWS Services Mapped to Each V**

| V | Key Services |
|---|--------------|
| 📦 Volume | 🪣 S3 • 🏛️ Redshift • 🐘 EMR • 🧊 Glacier • 🏗️ Lake Formation |
| 🧩 Variety | 🕸️ Glue • 🔍 Athena • 🤖 Rekognition • 📝 Textract • 🔊 Transcribe • 💭 Comprehend |
| 🌊 Velocity | 🌊 Kinesis • 🚒 Firehose • 🪐 MSK • 🎯 Kinesis Analytics • ⚡ Lambda |
| 🛡️ Veracity | 🧪 DataBrew • 🛡️ Glue DQ • 🏗️ Lake Formation • 🕵️ Macie • 📜 CloudTrail |
| 💎 Value | 📊 QuickSight • 🤖 SageMaker • 🔮 Forecast • 🎯 Personalize • 🧠 Redshift ML |

**🛠️ Hands-on Skills**

- 🪣 Created an S3 bucket
- ⬆️ Uploaded data
- 🕷️ Ran a Glue crawler
- 📚 Viewed the Data Catalog
- 🔍 Ran SQL with Athena
- 🧹 Cleaned up AWS resources

### What's Coming in Part 2

🚀 **Fundamentals of Analytics on AWS - Part 2** will cover:

- ⚙️ Transforming data with Glue ETL (Spark)
- 🛡️ Data quality rules in production (Veracity deep-dive)
- 🧩 Partitioning and Parquet optimization (Volume + Velocity)
- 🏛️ Redshift hands-on — load, query, Redshift Spectrum
- 🌊 Streaming ingestion lab with Kinesis Firehose
- 📊 Building a real QuickSight dashboard (Value)
- 🤖 Intro to SageMaker and Redshift ML
- 🎯 A capstone project

### What To Do Next

1. 🔄 **Repeat the lab** with a different dataset (a Kaggle CSV, for example)
2. 📖 **Read the AWS Athena and Glue documentation**
3. 💰 **Watch your AWS bill** for a few days to confirm cleanup
4. 🧠 **Apply the 5 Vs** to a project you work on — identify the bottleneck V

### Final Thoughts

The 5 Vs give you a **universal lens** for every data challenge. AWS gives you a **complete toolbox** — one service for each V and every combination. Once you've internalized this framework, you can pick up **any cloud's** analytics stack in a week, because they all follow the same pattern.

> **HitaVir Tech says:** "Analytics is not about tools. Tools change every two years. Analytics is about asking the right question, finding the right data, and presenting an insight people can act on. Master the fundamentals — Volume, Variety, Velocity, Veracity, Value — and every new tool becomes just another syntax."

🎓 Welcome to cloud analytics. See you in **Part 2**.

— **HitaVir Tech** ☁️

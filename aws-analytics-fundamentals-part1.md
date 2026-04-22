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

![AWS](aws-icons/aws.png)

```
   ╔════════════════════════════════════════════════════════════╗
   ║                                                            ║
   ║        ☁️   AWS ANALYTICS FUNDAMENTALS — PART 1    ☁️        ║
   ║                                                            ║
   ║     Concepts  •  The 5 Vs of Big Data  •  AWS Mapping       ║
   ║                                                            ║
   ║                  Powered by HitaVir Tech                    ║
   ╚════════════════════════════════════════════════════════════╝
```

Welcome to **Fundamentals of Analytics on AWS - Part 1** by **HitaVir Tech**!

This codelab builds your mental model for analytics in the cloud — one concept at a time, one AWS service at a time. No prior AWS experience required.

### What You Will Master

```
  ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
  │   🧠  CONCEPTS      │   │   📏  THE  5  Vs    │   │   ☁️  AWS SERVICES │
  ├─────────────────────┤   ├─────────────────────┤   ├─────────────────────┤
  │                     │   │                     │   │                     │
  │  • Analytics        │   │  • Volume     📦    │   │  • for Volume       │
  │  • Machine Learning │   │  • Variety    🧩    │   │  • for Variety      │
  │  • Core framework   │   │  • Velocity   🌊    │   │  • for Velocity     │
  │                     │   │  • Veracity   🛡️    │   │  • for Veracity     │
  │                     │   │  • Value      💎    │   │  • for Value        │
  │                     │   │                     │   │                     │
  └─────────────────────┘   └─────────────────────┘   └─────────────────────┘
                │                     │                     │
                └─────────────────────┼─────────────────────┘
                                      ▼
                           ┌─────────────────────┐
                           │   🛠️  HANDS-ON LAB  │
                           │   S3 → Glue → Athena│
                           └─────────────────────┘
```

### Why the 5 Vs Framework Matters

Every data challenge you will ever face maps to **one of five questions**:

```
   📦 "How do we store 500 TB?"               → Volume problem
   🧩 "We have CSVs, JSON, images — help!"     → Variety problem
   🌊 "Dashboards must refresh every second"  → Velocity problem
   🛡️ "Half our timestamps are malformed"      → Veracity problem
   💎 "Who actually uses this dashboard?"      → Value problem
```

The 5 Vs give you a **framework** to diagnose. AWS gives you a **toolbox** to solve each V.

### Estimated Duration

**3-4 hours** (concepts + hands-on lab)

> 💡 **HitaVir Tech says:** "The 5 Vs aren't academic jargon — they're the mental checklist every senior engineer runs when someone says 'we have a data problem.' Learn to speak this language and every cloud will feel familiar."

## Prerequisites
Duration: 3:00

### What You Need

```
   ┌──────────────────────────────────────────────────────────┐
   │  REQUIRED                                                 │
   │  ─────────                                                │
   │  💻  Laptop — Windows, Mac, or Linux                      │
   │  🌐  A modern web browser (Chrome, Edge, Firefox)          │
   │  ☁️  AWS account — free tier is enough                    │
   │  💳  Credit card for AWS sign-up (no charges expected)     │
   │  🧮  Basic SQL (SELECT, FROM, WHERE)                       │
   │                                                           │
   │  HELPFUL                                                  │
   │  ────────                                                 │
   │  📝  Spreadsheet or Python exposure                        │
   │  🟦  Any other cloud experience                            │
   └──────────────────────────────────────────────────────────┘
```

### No Local Installs Required

Everything in this codelab runs in the **AWS web console** in your browser. Zero software installation on your machine.

### ⚠️ Cost Awareness

Every step stays inside the **AWS Free Tier**:

```
   ┌──────────────────────────────────────────────────────────┐
   │  FREE TIER BUDGET                  USAGE IN THIS CODELAB  │
   │  ─────────────────                  ──────────────────────  │
   │  🪣  S3 storage — 5 GB              <  1 MB                 │
   │  🔍  Athena — pay per query         <  1¢ total             │
   │  📚  Glue Data Catalog — 1M objects 1 table                 │
   │  💰  Estimated total cost           $0.00                    │
   └──────────────────────────────────────────────────────────┘
```

> ⚠️ **Always clean up.** Step 10 of the lab is a **cleanup ritual**. Skip it and AWS will happily bill you for forgotten resources.

## Analytics Concepts
Duration: 4:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃         🧠   SECTION  1   —   ANALYTICS  CONCEPTS   🧠     ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Before we touch AWS, we need three anchor ideas:

```
                    ┌─────────────────────┐
                    │   📊  ANALYTICS     │
                    │   turn data into    │
                    │     decisions       │
                    └──────────┬──────────┘
                               │
                               │ powered by
                               ▼
                    ┌─────────────────────┐
                    │  🤖 MACHINE LEARNING│
                    │  algorithms that    │
                    │  learn patterns     │
                    └──────────┬──────────┘
                               │
                               │ challenged by
                               ▼
                    ┌─────────────────────┐
                    │  📏  THE 5 Vs       │
                    │  of Big Data        │
                    └─────────────────────┘
```

## Analytics
Duration: 6:00

### What is Analytics?

📊 **Analytics** is the practice of turning raw data into useful insights that help people make better decisions.

That one line is the whole discipline. SQL queries, dashboards, ML models, data lakes — all of it is just tooling in service of that idea.

### Real-World Example — HitaVir Coffee

Imagine **HitaVir Coffee** — 50 locations across India. Every day, each store generates data:

```
   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │    ☕     │   │    💰     │   │    👥     │   │    📦     │
   │  Orders   │   │ Payments  │   │ Loyalty   │   │ Inventory │
   └───────────┘   └───────────┘   └───────────┘   └───────────┘
   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │    🕐     │   │    🌡️     │   │    🚚     │   │    ⭐     │
   │   Shifts   │   │ Equipment │   │ Deliveries│   │  Reviews  │
   └───────────┘   └───────────┘   └───────────┘   └───────────┘
```

One transaction alone is meaningless. But **aggregate across 50 stores for a year** and patterns emerge:

| Observation | Action |
|-------------|--------|
| 🐢 Mondays are slowest | 🎯 Launch "Monday Bogo" |
| 📈 Store #23 sells 2× pastries | 🔍 Copy their layout |
| 📉 Cappuccinos drop in summer | 🧊 Push cold brew |

That journey — **from raw events to actions** — is analytics.

### The Four Levels of Analytics

```
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║        L4  🎯  PRESCRIPTIVE   "What should we do?"         ║
   ║                                                           ║
   ║                     ▲                                     ║
   ║                     │                                     ║
   ║        L3  🔮  PREDICTIVE    "What will happen?"           ║
   ║                                                           ║
   ║                     ▲                                     ║
   ║                     │                                     ║
   ║        L2  🕵️  DIAGNOSTIC    "Why did it happen?"         ║
   ║                                                           ║
   ║                     ▲                                     ║
   ║                     │                                     ║
   ║        L1  📸  DESCRIPTIVE   "What happened?"              ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

| Level | Icon | Question | Example | Powered By |
|-------|:---:|----------|---------|------------|
| **L1 Descriptive** | 📸 | What happened? | "Sold 12,400 cappuccinos" | 🔍 SQL / BI |
| **L2 Diagnostic** | 🕵️ | Why did it happen? | "Bean shortage hit week 3" | 🔍 SQL + drill-down |
| **L3 Predictive** | 🔮 | What will happen? | "June sales ↑ 15%" | 🤖 Machine learning |
| **L4 Prescriptive** | 🎯 | What should we do? | "Order 200kg by May 25" | 🤖 ML + optimization |

Most companies live at L1–L2. **Analytics engineers build the foundation** that makes L3–L4 possible.

### What Analytics Is NOT

```
   ❌  Data engineering (that builds the pipes — analytics drinks from them)
   ❌  Business Intelligence alone (BI is a subset of analytics)
   ❌  Machine Learning alone (ML is a specialized branch)
```

> 💡 **HitaVir Tech says:** "Never build a dashboard nobody looks at. Always ask — *what decision will this insight change?* If the answer is 'none', don't build it."

## Machine Learning
Duration: 6:00

### What is Machine Learning?

🤖 **Machine Learning (ML)** is a branch of AI where algorithms **learn patterns from data** instead of being explicitly programmed.

### Traditional Programming vs Machine Learning

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃   🧑‍💻  TRADITIONAL              ┃     ┃   🤖  MACHINE  LEARNING      ┃
   ┃ ────────────────────────────── ┃     ┃ ────────────────────────────── ┃
   ┃                                ┃     ┃                                ┃
   ┃   Rules + Data                 ┃     ┃   Data + Answers               ┃
   ┃          │                     ┃     ┃          │                     ┃
   ┃          ▼                     ┃     ┃          ▼                     ┃
   ┃     ⚙️ Program                 ┃     ┃     🧠 Learned Model          ┃
   ┃          │                     ┃     ┃          │                     ┃
   ┃          ▼                     ┃     ┃          ▼                     ┃
   ┃     ✨ Answer                  ┃     ┃     ✨ Rules (weights)         ┃
   ┃                                ┃     ┃                                ┃
   ┃  You write the rules           ┃     ┃  The machine learns the rules  ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Three Flavors of ML

```
   ┏━━━━━━━━━━━━━━━┓    ┏━━━━━━━━━━━━━━━━━┓    ┏━━━━━━━━━━━━━━━━━┓
   ┃  🎯           ┃    ┃  🔎              ┃    ┃  🎮              ┃
   ┃ SUPERVISED    ┃    ┃ UNSUPERVISED    ┃    ┃ REINFORCEMENT   ┃
   ┃ ─────────────  ┃    ┃ ───────────────  ┃    ┃ ───────────────  ┃
   ┃ Labels given  ┃    ┃ No labels       ┃    ┃ Rewards/penalt. ┃
   ┃               ┃    ┃                 ┃    ┃                 ┃
   ┃ e.g.          ┃    ┃ e.g.            ┃    ┃ e.g.            ┃
   ┃ • Spam filter ┃    ┃ • Segmentation  ┃    ┃ • Game AI       ┃
   ┃ • Fraud detect┃    ┃ • Anomaly detect┃    ┃ • Robotics      ┃
   ┃ • Image class ┃    ┃ • Topic model   ┃    ┃ • Recommenders  ┃
   ┗━━━━━━━━━━━━━━━┛    ┗━━━━━━━━━━━━━━━━━┛    ┗━━━━━━━━━━━━━━━━━┛
```

| Type | Icon | Data Needed | AWS Service |
|------|:---:|-------------|-------------|
| Supervised | 🎯 | Labeled examples | 🤖 SageMaker |
| Unsupervised | 🔎 | Raw, unlabeled | 🤖 SageMaker • 💭 Comprehend |
| Reinforcement | 🎮 | Reward signals | 🤖 SageMaker RL • 🏎️ DeepRacer |

### How ML Powers Analytics

The four analytics levels → ML becomes essential as you climb:

```
   Level  Where SQL stops          Where ML starts
   ─────  ─────────────────────    ─────────────────────
   L1    📸 Descriptive  ✅        
   L2    🕵️ Diagnostic    ✅        
   L3    🔮 Predictive                🤖 ML models
   L4    🎯 Prescriptive              🤖 ML + optimization
```

> 💡 **HitaVir Tech says:** "ML is not magic — it's statistics at scale. If your analytics foundations are shaky, your ML models will be too. Clean data first, cool models second."

## The 5 Vs of Big Data
Duration: 5:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃       📏  SECTION  2  —  THE  5  Vs  OF  BIG  DATA   📏   ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Where the 5 Vs Come From

In 2001, analyst **Doug Laney** described big-data challenges with three Vs: **Volume, Variety, Velocity**. Later the industry added **Veracity** (trust) and **Value** (outcome). Together they form the universal diagnostic checklist.

### The 5 Vs Star

```
                          ⭐
                     📦 VOLUME
                  "How much is it?"
                       /   \
                      /     \
                     /       \
                    /         \
          🧩 VARIETY           🌊 VELOCITY
       "How many formats?"   "How fast?"
                 \            /
                  \          /
                   \        /
                    \      /
             🛡️ VERACITY     💎 VALUE
         "Can we trust it?"  "Worth it?"
```

### The 5 Vs at a Glance

```
   ┏━━━━━━┓  ┏━━━━━━┓  ┏━━━━━━┓  ┏━━━━━━┓  ┏━━━━━━┓
   ┃  📦  ┃  ┃  🧩  ┃  ┃  🌊  ┃  ┃  🛡️  ┃  ┃  💎  ┃
   ┃ VOL  ┃  ┃ VAR  ┃  ┃ VEL  ┃  ┃ VER  ┃  ┃ VAL  ┃
   ┃ UME  ┃  ┃ IETY ┃  ┃ OCITY┃  ┃ ACITY┃  ┃ UE   ┃
   ┗━━━━━━┛  ┗━━━━━━┛  ┗━━━━━━┛  ┗━━━━━━┛  ┗━━━━━━┛
    scale     formats   speed     trust     outcome
```

Miss any one V and your data platform has a hole. Let's tour each.

## Volume
Duration: 6:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              📦   THE  1st  V   —   VOLUME    📦           ┃
   ┃                                                           ┃
   ┃              "How much data do we have?"                   ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### What is Volume?

📦 **Volume** is the size of your data — how many bytes, rows, events, or files you must store, move, and process.

### The Scale Ladder

```
   🐣  Byte (B)        =   1                 a letter
   🐥  KB              =   10³                1 email
   🐤  MB              =   10⁶                1 song
   🐔  GB              =   10⁹                1 DVD
   🦅  TB              =   10¹²               1 year of company sales
   🐘  PB              =   10¹⁵               1 day of YouTube uploads
   🐋  EB              =   10¹⁸               all of Netflix streaming
   🦖  ZB              =   10²¹               the entire internet / year
```

### Why Volume is Hard

A traditional database runs fine up to ~1–10 TB. Past that, things break:

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃  💥  Single disk too small to hold it                      ┃
   ┃  💥  Single CPU too slow to scan it in reasonable time     ┃
   ┃  💥  Backups take days                                     ┃
   ┃  💥  Failures become likely (1-in-1000 → every day)        ┃
   ┃  💥  Cost spirals out of control                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

At big-data scale, you need **distributed** systems — hundreds of machines sharing the load.

### Real-World Volume

| Company | Daily Volume |
|---------|--------------|
| 📱 Instagram | 100M+ photos uploaded |
| 🛒 Amazon | Billions of events |
| 🚗 Uber | 10s of TB of trip data |
| 🎬 Netflix | PB of logs and streams |
| 🔎 Google | Unimaginable |

### Questions Volume Forces You to Ask

- 💾 Where do I **store** 500 TB affordably?
- ⚡ How do I **scan** 10 TB in minutes, not days?
- 💼 How do I **back up** a multi-PB system?
- 💰 How do I **afford** this without going bankrupt?

> 💡 **HitaVir Tech says:** "What works at 10 GB catastrophically fails at 10 TB. Always ask — *how does this scale at 100×?*"

## Variety
Duration: 6:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              🧩   THE  2nd  V   —   VARIETY   🧩           ┃
   ┃                                                           ┃
   ┃              "How many kinds of data?"                     ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### What is Variety?

🧩 **Variety** is the diversity of data — formats, schemas, and sources.

Twenty years ago, "data" meant rows in a database. Today:

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃   📊 STRUCTURED      🧩 SEMI-STRUCTURED   🎞️ UNSTRUCTURED  ┃
   ┃   ──────────────      ─────────────────    ─────────────── ┃
   ┃   • SQL tables        • JSON from APIs     • Images        ┃
   ┃   • CSV files         • XML                • Videos        ┃
   ┃   • Spreadsheets      • Parquet / Avro     • Audio         ┃
   ┃   • Fixed schema      • Flexible schema    • PDFs          ┃
   ┃                                             • Free text     ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Why Variety is Hard

Each format needs different tooling:

```
   Format          Tool Needed
   ──────          ──────────────────────
   SQL tables  →   Relational engine
   JSON        →   Document parser
   PDF         →   OCR
   Image       →   Computer vision
   Audio       →   Speech-to-text
   Free text   →   NLP / embeddings
```

Most real projects combine these. Example — "Correlate support emails + call recordings + order history into one insight." **Three completely different pipelines** feeding one answer.

### Real-World Variety

| Industry | Variety Mix |
|----------|-------------|
| 🏥 Healthcare | 📊 Patient records + 🖼️ X-rays + 📝 Doctor's notes |
| 🛒 Retail | 📊 Orders + 🖼️ Product photos + ⭐ Reviews |
| 🏦 Banking | 📊 Transactions + 📄 Scanned checks + 🔊 Call transcripts |
| 🚗 Autonomous cars | 📊 Sensors + 🎞️ Video + 🗺️ Maps + 📡 LiDAR |

### Questions Variety Forces You to Ask

- 🪣 Can **one storage system** hold all my types?
- 📚 How do I **catalog** schemas that keep changing?
- 🔍 Which engine queries **JSON, CSV, Parquet** in one SQL?
- 🤖 How do I extract insights from **unstructured** data?

> 💡 **HitaVir Tech says:** "90% of the world's data is unstructured. But 90% of analytics happens on structured data. Your job is often to convert chaos into order."

## Velocity
Duration: 6:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              🌊   THE  3rd  V   —   VELOCITY   🌊          ┃
   ┃                                                           ┃
   ┃              "How fast is the data?"                       ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### What is Velocity?

🌊 **Velocity** is the speed at which data **arrives**, **moves**, and must be **processed** to deliver value.

### The Velocity Spectrum

```
   ┏━━━━━━━━━━┓  ┏━━━━━━━━━━━┓  ┏━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━┓
   ┃   🐌     ┃  ┃   🐇      ┃  ┃   🚀      ┃  ┃    ⚡       ┃
   ┃  BATCH   ┃  ┃ MINI-BATCH┃  ┃ STREAMING ┃  ┃  REAL-TIME  ┃
   ┃──────────┃  ┃───────────┃  ┃───────────┃  ┃─────────────┃
   ┃ Nightly  ┃  ┃ 1-15 min  ┃  ┃ Seconds   ┃  ┃ Sub-100ms   ┃
   ┃ reports  ┃  ┃ dashboards┃  ┃ live dash ┃  ┃ fraud / HFT ┃
   ┗━━━━━━━━━━┛  ┗━━━━━━━━━━━┛  ┗━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━┛
     yesterday   ~15 min old     ~sec old      happening now
```

| Freshness | Icon | Approach | Use Case |
|-----------|:---:|----------|----------|
| Next day | 🐌 | Batch | Finance reports |
| Every hour | 🐇 | Mini-batch | Ops dashboards |
| Seconds | 🚀 | Streaming | Live pricing |
| Sub-ms | ⚡ | Real-time | Fraud detection, HFT |

### Why Velocity is Hard

```
   Problem                        Solution
   ─────────                      ────────────────────────
   Disks too slow           →     In-memory / caches
   Batch SQL too slow       →     Stream-processing engines
   One machine too small    →     Horizontal auto-scaling
   Failures = data loss     →     Durable logs (Kafka/Kinesis)
```

### Real-World Velocity

| Scenario | Required |
|----------|----------|
| 💳 Credit card fraud | < 100 ms |
| 📈 Stock trading | microseconds |
| 📱 Social feed | seconds |
| 🚚 Delivery tracking | minutes |
| 📊 Exec dashboard | hourly |
| 🧾 Month close | daily batch |

### Questions Velocity Forces You to Ask

- 🕒 Do we **really** need real-time, or is 5 min fine?
- 🐌 How do we handle **late-arriving** events?
- 📈 What if the stream **falls behind** during a spike?
- 🔁 How do we **replay** events on failure?

> 💡 **HitaVir Tech says:** "Streaming is fashionable. Batch is profitable. 80% of real-world analytics runs on batch — don't reach for streaming unless the business truly cannot wait."

## Veracity
Duration: 6:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              🛡️   THE  4th  V   —   VERACITY   🛡️          ┃
   ┃                                                           ┃
   ┃              "Can we trust the data?"                      ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### What is Veracity?

🛡️ **Veracity** is the accuracy, consistency, and trustworthiness of your data.

Big volumes and fast pipelines are useless if the data is **wrong**.

### The Veracity Enemies

```
   ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓
   ┃  🦠 MISSING   ┃  ┃  🗑️ DUPLICATE ┃  ┃  🎭 INCONSIST.┃
   ┃  NULL fields  ┃  ┃  Same row × N ┃  ┃  Date formats ┃
   ┗━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━┛
   ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓
   ┃  📉 OUTLIERS  ┃  ┃  🪙 UNITS      ┃  ┃  🪞 BIAS       ┃
   ┃  Age = 347    ┃  ┃  USD mixed INR ┃  ┃  US-only users ┃
   ┗━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━┛
   ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━┓
   ┃  🪤 STALE     ┃  ┃  📎 BROKEN    ┃  ┃  🎲 NOISE     ┃
   ┃ Updated 2019  ┃  ┃  Order no user┃  ┃  Flaky sensor  ┃
   ┗━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━┛
```

### GIGO — Garbage In, Garbage Out

> A beautiful dashboard built on bad data is worse than no dashboard — it creates **false confidence**. The most dangerous insight is a wrong insight someone believes.

### Six Dimensions of Data Quality

| Dimension | Icon | Question |
|-----------|:---:|----------|
| **Completeness** | 🧩 | Required fields populated? |
| **Accuracy** | 🎯 | Data reflects reality? |
| **Consistency** | 🧭 | Related systems agree? |
| **Timeliness** | ⏰ | Is it current enough? |
| **Validity** | ✅ | Matches formats / rules? |
| **Uniqueness** | 🔢 | Any unintended duplicates? |

### Real-World Veracity Failures

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃  🛰️ NASA Mars Climate Orbiter (1999)                      ┃
   ┃     Lost $125M — metric vs imperial unit mismatch         ┃
   ┃                                                           ┃
   ┃  🏦 Knight Capital (2012)                                 ┃
   ┃     $440M loss in 45 minutes — bad trading data           ┃
   ┃                                                           ┃
   ┃  🤧 Google Flu Trends                                     ┃
   ┃     Overestimated flu peaks 100%+ due to search bias      ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Questions Veracity Forces You to Ask

- 🛡️ Do we have **quality rules** running on every pipeline?
- 👁️ Are we **monitoring** upstream schema changes?
- 🪞 Does our data **match source systems**?
- 🧑 Who **owns** the quality of each dataset?

> 💡 **HitaVir Tech says:** "Senior engineers obsess over data quality. Juniors obsess over cool tools. Guess which group builds systems that actually work in production."

## Value
Duration: 6:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              💎   THE  5th  V   —   VALUE   💎             ┃
   ┃                                                           ┃
   ┃          "What business outcome does it drive?"            ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### What is Value?

💎 **Value** is the business outcome your data and analytics actually deliver — revenue gained, cost saved, risk reduced, customer experience improved.

Without Value, the other four Vs are expensive hobbies.

### The Value Pyramid

```
                        💎 VALUE
                       (outcome)
                          ▲
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
                          │  at the right
                          │  🌊 speed (Velocity)
                          │
                   🧩 across Varieties
                          ▲
                          │  stored at
                          │
                    📦 the right scale (Volume)
```

### Examples of Real Value

| Industry | Analytics Value |
|----------|-----------------|
| 🛒 Retail | Recommendation engine → **+20% revenue** |
| 🏦 Banking | Fraud detection → **millions saved** |
| 🚚 Logistics | Route optimization → **-15% fuel cost** |
| 🏥 Healthcare | Early diagnosis models → **better outcomes** |
| 🎬 Streaming | Personalized content → **higher retention** |

### The Dashboard Graveyard

Most companies have folders full of unused dashboards — the **dashboard graveyard**. Every one cost engineering time, storage, and compute.

The difference between a valuable dashboard and a graveyard dashboard:

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃         🎯  "What decision will change because           ┃
   ┃                of this dashboard?"                         ┃
   ┃                                                           ┃
   ┃         If nobody can answer → DON'T BUILD IT.             ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### How to Measure Value

- 🔁 **Adoption** — active daily / weekly users
- 💰 **Metric movement** — did conversion rise?
- ⏱️ **Time saved** — replaces manual work?
- 🎯 **Decisions influenced** — used in leadership meetings?

### Questions Value Forces You to Ask

- 👥 **Who** uses this, and **how often**?
- 🎯 What **decision** would be different without it?
- 💰 What's the **ROI** vs build + maintain cost?
- 🗑️ When should we **retire** outdated reports?

> 💡 **HitaVir Tech says:** "A data platform that costs more than the decisions it enables is a failure, no matter how beautiful the architecture. Lead with Value."

## AWS Services for Analytics
Duration: 3:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃     ☁️  SECTION 3  —  AWS SERVICES BY THE 5 Vs   ☁️         ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Headline Cast

![S3](aws-icons/s3.png) ![Redshift](aws-icons/redshift.png) ![EMR](aws-icons/emr.png) ![Glue](aws-icons/glue.png) ![Athena](aws-icons/athena.png) ![Kinesis](aws-icons/kinesis-streams.png) ![Firehose](aws-icons/kinesis-firehose.png) ![Lambda](aws-icons/lambda.png) ![QuickSight](aws-icons/quicksight.png) ![SageMaker](aws-icons/sagemaker.png)

Now we map **each V** to the **AWS services** that solve it.

### The Golden Rule — Every Stack Follows One Shape

```
   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
   │ 🧲  │──>│ 🪣  │──>│ 📚  │──>│ ⚙️  │──>│ 🔍  │──>│ 📊  │──>│ 🧠  │
   │INGST│   │STORE│   │CATLG│   │PROCS│   │QUERY│   │VIEW │   │ACT  │
   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘
```

The **5 Vs** tell you where the bottleneck is. The **AWS services** tell you what solves it. Let's walk each V.

## AWS Services for Volume
Duration: 8:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃            📦   AWS   FOR   VOLUME   📦                    ┃
   ┃                                                           ┃
   ┃        "Store any amount of data, affordably."             ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Volume Lineup

![S3](aws-icons/s3.png) ![Glacier](aws-icons/glacier.png) ![Redshift](aws-icons/redshift.png) ![EMR](aws-icons/emr.png) ![Lake Formation](aws-icons/lake-formation.png)

**S3** • **Glacier** • **Redshift** • **EMR** • **Lake Formation**

### The Volume Toolkit — Service Grid

```
   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃       🪣         ┃  ┃       🏛️         ┃  ┃       🐘         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃    Amazon S3     ┃  ┃ Amazon Redshift  ┃  ┃   Amazon EMR     ┃
   ┃   ─────────────  ┃  ┃   ─────────────  ┃  ┃   ─────────────  ┃
   ┃  Object Storage  ┃  ┃  Data Warehouse  ┃  ┃  Big Data Engine ┃
   ┃  Infinite scale  ┃  ┃  Petabyte SQL    ┃  ┃  Spark / Hadoop  ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃       🧊         ┃  ┃       🏗️          ┃  ┃       💾         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃  S3 Glacier      ┃  ┃  Lake Formation  ┃  ┃  EBS / EFS       ┃
   ┃  ─────────────   ┃  ┃  ──────────────  ┃  ┃  ─────────────   ┃
   ┃  Archive tier    ┃  ┃  Lake governance ┃  ┃  Compute storage ┃
   ┃  Cents per GB    ┃  ┃  Fine permissions┃  ┃  Fast attached   ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛
```

### Service Spotlight — Amazon S3

![S3](aws-icons/s3.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🪣  AMAZON  S3  —  Simple Storage Service                 ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Category     │  Object storage / data lake                 ║
   ║  Durability    │  99.999999999%  (11 nines)                 ║
   ║  Scale         │  Unlimited (practically)                    ║
   ║  Pricing       │  ~$0.023 / GB / month (Standard)            ║
   ║  Read by       │  Athena, Redshift, EMR, SageMaker, QuickSight║
   ║                                                             ║
   ║  💡 If you remember only one AWS service — make it S3.      ║
   ╚═══════════════════════════════════════════════════════════╝
```

### S3 Storage Classes — The Cost Pyramid

```
       🔥 Standard                 hot, frequent access       $$$$
      ─────────────────
     🌡️ Intelligent-Tiering       auto hot/cold moves         $$$
    ─────────────────────
   ❄️ Standard-IA                 monthly access              $$
  ─────────────────────────
 🧊 Glacier Instant              rare access, instant          $
─────────────────────────────
🗄️ Glacier Flexible              hours to retrieve             ¢
─────────────────────────────────
🏔️ Glacier Deep Archive          compliance vault              ¢
```

### Service Spotlight — Amazon Redshift

![Redshift](aws-icons/redshift.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🏛️  AMAZON  REDSHIFT  —  Data Warehouse                   ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Category      │  Columnar MPP data warehouse               ║
   ║  Scale         │  Petabytes (exabytes tested)                ║
   ║  SQL           │  PostgreSQL-flavored                        ║
   ║  Modes         │  Serverless • Provisioned (RA3 nodes)       ║
   ║  Superpower    │  Sub-second queries over billions of rows   ║
   ║                                                             ║
   ║  💡 Use when you need fast SQL on huge structured data.     ║
   ╚═══════════════════════════════════════════════════════════╝
```

### Service Spotlight — Amazon EMR

![EMR](aws-icons/emr.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🐘  AMAZON  EMR  —  Elastic MapReduce                     ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Category      │  Managed Hadoop / Spark / Presto clusters ║
   ║  Scale         │  Thousands of nodes                        ║
   ║  Pricing       │  Per-instance-hour (spot = 90% off)         ║
   ║                                                             ║
   ║  💡 Use for petabyte-scale custom Spark jobs.                ║
   ╚═══════════════════════════════════════════════════════════╝
```

### S3 Data Lake — Medallion Architecture

```
   🪣 s3://hitavirtech-analytics/
      │
      ├── 🥉 raw/             ← Untouched source data
      │     ├── sales/2026/04/22/orders.csv
      │     └── inventory/2026/04/22/stock.json
      │
      ├── 🥈 curated/         ← Cleaned, typed Parquet
      │     └── sales_fact/year=2026/month=04/day=22/part-001.parquet
      │
      └── 🥇 analytics/       ← Pre-aggregated for BI
            └── daily_revenue/year=2026/month=04/day=22/part-001.parquet
```

### Volume Decision Tree

```
                       📦 How much data?
                              │
          ┌───────────────────┼───────────────────────────┐
          │                   │                           │
       < 1 TB              1-100 TB                    > 100 TB
          │                   │                           │
          ▼                   ▼                           ▼
     🗄️ 🏛️                   🪣 🔍                         🪣 🐘 🏛️ 🏗️
   RDS or                    S3 +                      S3 + EMR +
 Redshift Serverless        Athena                    Redshift + LakeForm
 (small + cheap)          (most common)            (huge analytics platform)
```

> 💡 **HitaVir Tech says:** "Start with S3. Every analytics service on AWS reads from it. You'll never regret putting data into S3 — you may regret putting it anywhere else first."

## AWS Services for Variety
Duration: 8:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              🧩   AWS   FOR   VARIETY   🧩                 ┃
   ┃                                                           ┃
   ┃         "Handle any data format, elegantly."              ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Variety Lineup

![Glue](aws-icons/glue.png) ![Athena](aws-icons/athena.png) ![DynamoDB](aws-icons/dynamodb.png) ![Rekognition](aws-icons/rekognition.png) ![Textract](aws-icons/textract.png) ![Transcribe](aws-icons/transcribe.png) ![Comprehend](aws-icons/comprehend.png) ![OpenSearch](aws-icons/opensearch.png)

**Glue** • **Athena** • **DynamoDB** • **Rekognition** • **Textract** • **Transcribe** • **Comprehend** • **OpenSearch**

### The Variety Toolkit — Service Grid

```
   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🕸️          ┃  ┃       📚         ┃  ┃       🔍         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃   AWS Glue       ┃  ┃  Glue Catalog    ┃  ┃  Amazon Athena   ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Serverless ETL  ┃  ┃  Metadata store  ┃  ┃  Serverless SQL  ┃
   ┃  Any format      ┃  ┃  All engines use ┃  ┃  CSV JSON Parquet┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       ⚡         ┃  ┃       🤖         ┃  ┃       📝         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃   DynamoDB       ┃  ┃  Rekognition     ┃  ┃  Textract        ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  NoSQL flexible  ┃  ┃  Images & video  ┃  ┃  PDFs & scans    ┃
   ┃  docs & JSON     ┃  ┃  → labels        ┃  ┃  → text & tables ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🔊         ┃  ┃       💭         ┃  ┃       🔎         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃   Transcribe     ┃  ┃  Comprehend      ┃  ┃  OpenSearch      ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Audio → text    ┃  ┃  NLP: sentiment, ┃  ┃  Search & log    ┃
   ┃                  ┃  ┃  entities, topics┃  ┃  analytics       ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛
```

### Service Spotlight — AWS Glue

![Glue](aws-icons/glue.png) ![Crawler](aws-icons/glue-crawler.png) ![Catalog](aws-icons/glue-catalog.png) ![DataBrew](aws-icons/glue-databrew.png) ![Data Quality](aws-icons/glue-dq.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🕸️  AWS  GLUE  —  Serverless ETL + Data Catalog          ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  🕷️ Crawlers   │  Auto-detect schema for new S3 folders    ║
   ║  📚 Catalog    │  Central metadata (Athena, Redshift, EMR) ║
   ║  ⚙️ ETL Jobs   │  Python / Spark transformations            ║
   ║  🧪 DataBrew   │  No-code visual data prep                   ║
   ║  🛡️ Data Quality│  Rule-based DQ checks                      ║
   ║                                                             ║
   ║  💡 The "nervous system" of your AWS data lake.            ║
   ╚═══════════════════════════════════════════════════════════╝
```

### Glue Flow

```
   INPUT                                                      OUTPUT
   ──────                                                     ──────

   📄 CSV        ┐                                           ┌ 🗂️ Parquet
   🧩 JSON       ├──► 🕷️ Crawler ──► 📚 Catalog ──► ⚙️ Job ──┤
   🗂️ Parquet    │                   (schema)                │ 📚 Updated
   🗄️ Database   ┘                                           └    tables
```

### 🔍 Athena — One SQL, Many Formats

```sql
SELECT *
FROM   csv_orders
JOIN   json_customers   USING (customer_id)
JOIN   parquet_products USING (product_id);
```

Athena reads **CSV, JSON, Parquet, ORC, Avro** — all via the Glue Catalog. You never leave SQL.

### Unstructured → Structured: The AI Extractor Pipeline

![Rekognition](aws-icons/rekognition.png) ![Textract](aws-icons/textract.png) ![Transcribe](aws-icons/transcribe.png) ![Comprehend](aws-icons/comprehend.png) ![Translate](aws-icons/translate.png)

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃  🖼️ Images       ──►  🤖 Rekognition  ──►  🏷️ Labels       ┃
   ┃  📄 PDFs/scans    ──►  📝 Textract     ──►  📋 Text+Tables  ┃
   ┃  🎤 Audio         ──►  🔊 Transcribe   ──►  📃 Transcripts  ┃
   ┃  💬 Free text     ──►  💭 Comprehend   ──►  😊 Sentiment    ┃
   ┃  🌍 Translations  ──►  🗣️ Translate    ──►  🇯🇵 Languages    ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Magic step: **chaos in → structured features out** → then into S3 / Athena / Redshift as normal.

### Real-World Example — E-commerce Review Pipeline

```
   💬 Customer review (raw text)
         │
         ▼
   💭 Comprehend  ──► sentiment=negative, topic=shipping
         │
         ▼
   🪣 S3 (enriched)
         │
         ▼
   🕷️ Glue Crawler  ──►  📚 Catalog
         │
         ▼
   🔍 Athena: "avg sentiment per product / month"
         │
         ▼
   📊 QuickSight dashboard for the CX team
         │
         ▼
   🎯 Action: fix shipping partner in Region X
```

### Variety Decision Tree

```
                        🧩 What's my data?
                               │
        ┌───────────────┬──────┼──────┬───────────────┐
        ▼               ▼      ▼      ▼               ▼
      📊 Tabular   🧩 JSON   🖼️ Images  📄 PDFs     🎤 Audio/💬 Text
        │               │      │      │               │
        ▼               ▼      ▼      ▼               ▼
      🪣+🕸️+🔍         🪣+🔍    🤖      📝              🔊 / 💭
   S3+Glue+Athena   S3+Athena Rek.  Textract    Transcribe/Comprehend
                    or ⚡ DDB
```

> 💡 **HitaVir Tech says:** "The magic of modern analytics — unstructured data becomes structured features in minutes via AWS AI services. What took PhDs years a decade ago is now an API call."

## AWS Services for Velocity
Duration: 8:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              🌊   AWS   FOR   VELOCITY   🌊                ┃
   ┃                                                           ┃
   ┃         "Move and process data in real time."             ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Velocity Lineup

![Kinesis Streams](aws-icons/kinesis-streams.png) ![Firehose](aws-icons/kinesis-firehose.png) ![Kinesis Analytics](aws-icons/kinesis-analytics.png) ![MSK](aws-icons/msk.png) ![Lambda](aws-icons/lambda.png) ![EventBridge](aws-icons/eventbridge.png) ![SNS](aws-icons/sns.png) ![SQS](aws-icons/sqs.png)

**Kinesis Streams** • **Firehose** • **Kinesis Analytics** • **MSK** • **Lambda** • **EventBridge** • **SNS** • **SQS**

### The Velocity Toolkit — Service Grid

```
   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🌊         ┃  ┃       🚒         ┃  ┃       🪐         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃   Kinesis Data   ┃  ┃  Kinesis         ┃  ┃   Amazon MSK     ┃
   ┃   Streams        ┃  ┃  Firehose        ┃  ┃                  ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Real-time stream┃  ┃  Buffered deliver┃  ┃  Managed Kafka   ┃
   ┃  MS latency      ┃  ┃  S3/Redshift/ES  ┃  ┃  Kafka API       ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🎯         ┃  ┃       ⚡         ┃  ┃       🚌         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃  Kinesis Data    ┃  ┃  AWS Lambda      ┃  ┃  EventBridge     ┃
   ┃  Analytics       ┃  ┃                  ┃  ┃                  ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  SQL/Flink on    ┃  ┃  Event-driven    ┃  ┃  Serverless      ┃
   ┃  streams         ┃  ┃  functions       ┃  ┃  event bus       ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛
```

### Service Spotlight — Amazon Kinesis Data Streams

![Kinesis Data Streams](aws-icons/kinesis-streams.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🌊  KINESIS  DATA  STREAMS  —  Real-time Event Stream    ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Latency      │  Sub-second                                 ║
   ║  Retention    │  24 hours (up to 365 days)                  ║
   ║  Throughput   │  MB/sec per shard, scale by sharding        ║
   ║  Ordering     │  Per-shard ordered                          ║
   ║                                                             ║
   ║  💡 The "high-speed conveyor belt" for events.              ║
   ╚═══════════════════════════════════════════════════════════╝
```

### Kinesis in Action — The Conveyor Belt

```
   📱 Producers                🌊 KINESIS                  🧠 Consumers
   ──────────────               ──────────                 ──────────────

   📱 App events           ┌───────────────────────┐      ⚡ Lambda
   🌐 Clickstreams  ──►   │  ⏩ ⏩ ⏩ ⏩ ⏩ ⏩ ⏩ │ ──►  🎯 K.Analytics
   📟 IoT sensors          │ durable, ordered,     │      🚒 Firehose→🪣
   🛒 Transactions         │ up to 365d retention  │      🔎 OpenSearch
   💳 Card swipes          └───────────────────────┘      🏛️ Redshift
```

Kinesis holds events **durably**. Multiple consumers read the same stream **independently**.

### Service Spotlight — Kinesis Firehose

![Firehose](aws-icons/kinesis-firehose.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🚒  KINESIS  FIREHOSE  —  The Easy Button                ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Model        │  Serverless, fully managed                  ║
   ║  Buffer       │  60 sec or 5 MB (whichever first)           ║
   ║  Transforms   │  Optional Lambda enrichment                   ║
   ║  Sinks        │  S3 (Parquet!), Redshift, OpenSearch, HTTP  ║
   ║                                                             ║
   ║  💡 No code, no cluster — the laziest streaming on AWS.     ║
   ╚═══════════════════════════════════════════════════════════╝
```

```
   📱 Producers  ──►  🚒 Firehose  ──► 🗜️ Convert → Parquet  ──►  🪣 S3
                     (no servers,
                      auto-scale)
```

### 🎯 Kinesis Data Analytics — Continuous SQL

```sql
CREATE STREAM fraud_alerts AS
SELECT user_id, amount, location
FROM   transactions_stream
WHERE  amount > 10000 OR is_foreign = TRUE;
```

Results in **milliseconds** — not after the nightly batch.

### ⚡ AWS Lambda — The Universal Event Glue

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃   🪣 S3 new file  ─┐                                      ┃
   ┃   🌊 Kinesis event ├──►  ⚡ Lambda  ──► 🏛️ Redshift load  ┃
   ┃   🔁 DynamoDB row ─┤            │                         ┃
   ┃   🚌 EventBridge   ┘            └──► 📣 SNS / 📨 SQS alert┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Perfect for: event reactions, enrichment, alerting, small transforms.

### Real-World Velocity Pipeline — Rideshare App

```
   🚗 Rideshare app  (1 million events/sec)
              │
              ▼
       🌊 Kinesis Data Streams
              │
        ┌─────┼─────┬─────────┐
        ▼     ▼     ▼         ▼
    ⚡ Lambda  🎯 Analytics  🚒 Firehose
    fraud     real-time     buffer →
    flag      aggregates    🪣 S3 (Parquet)
        │         │             │
        ▼         ▼             ▼
    📣 SNS    📊 QuickSight  🔍 Athena
    alert ops  live dash.   historical BI
```

### Velocity Decision Tree

```
                        🌊 How fresh must the data be?
                                     │
        ┌────────────────┬───────────┼──────────┬──────────────┐
        ▼                ▼           ▼          ▼              ▼
     Next day        15 minutes    Seconds    Sub-second    Kafka shop
        │                │           │          │              │
        ▼                ▼           ▼          ▼              ▼
      🕸️ Glue         🚒 Firehose  🌊 Kinesis  🎯 Analytics   🪐 MSK
      batch           → 🪣 S3      + ⚡ Lambda  (Flink)
```

> 💡 **HitaVir Tech says:** "Every team thinks they need real-time until they see the bill. Start with Firehose and 5-minute micro-batches — graduate later. Most of the time, you won't need to."

## AWS Services for Veracity
Duration: 8:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              🛡️   AWS   FOR   VERACITY   🛡️                 ┃
   ┃                                                           ┃
   ┃         "Make sure the data is trustworthy."               ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Veracity Lineup

![DataBrew](aws-icons/glue-databrew.png) ![Glue DQ](aws-icons/glue-dq.png) ![Lake Formation](aws-icons/lake-formation.png) ![Macie](aws-icons/macie.png) ![CloudTrail](aws-icons/cloudtrail.png) ![Config](aws-icons/config.png) ![IAM](aws-icons/iam.png) ![KMS](aws-icons/kms.png)

**DataBrew** • **Glue Data Quality** • **Lake Formation** • **Macie** • **CloudTrail** • **Config** • **IAM** • **KMS**

### The Veracity Toolkit — Service Grid

```
   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🧪          ┃  ┃       🛡️         ┃  ┃       🔬         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃  Glue DataBrew   ┃  ┃ Glue Data Quality┃  ┃  Deequ (lib)     ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Visual cleaning ┃  ┃  Rule-based checks┃ ┃  Unit tests for  ┃
   ┃  No-code         ┃  ┃  Block bad data  ┃  ┃  Spark data      ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🏗️          ┃  ┃       🕵️          ┃  ┃       📜         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃ Lake Formation   ┃  ┃  Macie           ┃  ┃  CloudTrail      ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Governance,     ┃  ┃  Discover PII    ┃  ┃  API audit log   ┃
   ┃  fine-grained AC ┃  ┃  in S3 buckets   ┃  ┃  Who did what    ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛
```

### Service Spotlight — AWS Glue DataBrew

![DataBrew](aws-icons/glue-databrew.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🧪  GLUE  DATABREW  —  No-Code Data Prep                 ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Interface    │  Visual, spreadsheet-like                   ║
   ║  Transforms   │  250+ built-in (nulls, dupes, dates, etc.)  ║
   ║  Profiling    │  Auto column stats, anomaly flags           ║
   ║  Recipes      │  Save + schedule as jobs                    ║
   ║                                                             ║
   ║  💡 Hand this to business analysts — no Spark needed.        ║
   ╚═══════════════════════════════════════════════════════════╝
```

```
   🧪 Load  ──►  📊 Profile  ──►  🔧 Apply transforms  ──►  💾 Export
                (stats,           (fill nulls, parse        (to S3 or
                 anomalies)        dates, standardize)       Redshift)
```

### Service Spotlight — Glue Data Quality

![Glue Data Quality](aws-icons/glue-dq.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🛡️  GLUE  DATA  QUALITY  —  Rules That Guard the Lake    ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Rule types   │  Completeness, uniqueness, ranges, custom  ║
   ║  Enforcement  │  Block pipeline OR quarantine OR alert      ║
   ║  ML-assisted  │  Recommends rules from sample data          ║
   ║                                                             ║
   ║  💡 Data quality becomes a pipeline concern, not tribal.    ║
   ╚═══════════════════════════════════════════════════════════╝
```

```
   RULES                                         CHECK RESULT
   ──────                                        ─────────────
   order_id IS NOT NULL                  ...  ✅ pass
   amount BETWEEN 0 AND 1_000_000        ...  ✅ pass
   customer_id IN customers              ...  ✅ pass
   COUNT(DISTINCT order_id) = COUNT(*)   ...  ❌ 23 duplicates — ALERT!
```

### Service Spotlight — Amazon Macie

![Macie](aws-icons/macie.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🕵️  AMAZON  MACIE  —  PII Detective                       ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Method       │  ML-based classification of S3 contents    ║
   ║  Finds        │  Credit cards, SSNs, emails, addresses     ║
   ║  Output       │  Severity alerts → Security Hub             ║
   ║                                                             ║
   ║  💡 Sniffs sensitive data hiding in your data lake.         ║
   ╚═══════════════════════════════════════════════════════════╝
```

### CloudTrail + Config — The Audit Twins

![CloudTrail](aws-icons/cloudtrail.png) ![Config](aws-icons/config.png)

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃  📜 CloudTrail  =  "Who did WHAT and WHEN?"               ┃
   ┃                   Every API call logged.                   ┃
   ┃                                                           ┃
   ┃  ⚙️ AWS Config  =  "What did it LOOK like then?"         ┃
   ┃                   Resource config snapshots over time.     ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Essential for regulated industries (finance, healthcare, gov).

### The Data Quality Lifecycle

```
   🧪 PROFILE  ──► ✍️ DEFINE RULES ──► 🛡️ ENFORCE ──► 🚨 ALERT ──► 🔧 FIX ──► 📊 MONITOR
   (understand)    (expected shape)    (every run)   (fail fast) (remediate) (trends)
            │                                                                    │
            └─────────────────────────── loop ────────────────────────────────┘
```

### Real-World Example — Sales Lake Quality Gate

```
   📊 Raw sales CSV from 50 stores
        │
        ▼
   🕸️ Glue ETL reads it
        │
        ▼
   🛡️ Glue Data Quality runs rules:
        ✅ order_id unique
        ✅ amount in [0, 1M]
        ❌ store_id in valid list — 12 rows failed
        │
        ▼
   ┌──────┴──────┐
   ▼             ▼
❌ Quarantine   ✅ Curated
   bucket +     zone
   📣 SNS alert  (Parquet)
```

> 💡 **HitaVir Tech says:** "Every pipeline must have quality rules — not 'someday', from day one. 10× cheaper to catch bad data at ingest than to explain a wrong dashboard to the CEO."

## AWS Services for Value
Duration: 8:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃              💎   AWS   FOR   VALUE   💎                   ┃
   ┃                                                           ┃
   ┃       "Turn data into decisions and ROI."                  ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Value Lineup

![QuickSight](aws-icons/quicksight.png) ![SageMaker](aws-icons/sagemaker.png) ![Forecast](aws-icons/forecast.png) ![Personalize](aws-icons/personalize.png) ![Fraud Detector](aws-icons/fraud-detector.png) ![Bedrock](aws-icons/bedrock.png)

**QuickSight** • **SageMaker** • **Forecast** • **Personalize** • **Fraud Detector** • **Bedrock**

### The Value Toolkit — Service Grid

```
   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       📊         ┃  ┃       🤖         ┃  ┃       🔮         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃   QuickSight     ┃  ┃  SageMaker       ┃  ┃  Forecast        ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  BI dashboards   ┃  ┃  Build/train ML  ┃  ┃  Time-series ML  ┃
   ┃  Natural-lang Q  ┃  ┃  End-to-end ML   ┃  ┃  No code         ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       🎯         ┃  ┃       🚨         ┃  ┃       🧠         ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃  Personalize     ┃  ┃ Fraud Detector   ┃  ┃  Redshift ML     ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Netflix-style   ┃  ┃  Pre-built fraud ┃  ┃  Train ML in SQL ┃
   ┃  recommendations ┃  ┃  ML models       ┃  ┃                  ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛

   ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━┓
   ┃       💬         ┃  ┃       🧠         ┃  ┃       👁️          ┃
   ┃                  ┃  ┃                  ┃  ┃                  ┃
   ┃  Q in QuickSight ┃  ┃  Bedrock         ┃  ┃ Lookout Metrics  ┃
   ┃  ──────────────  ┃  ┃  ──────────────  ┃  ┃  ──────────────  ┃
   ┃  Ask in English  ┃  ┃  Foundation LLMs ┃  ┃  KPI anomaly     ┃
   ┃  (Claude, etc)   ┃  ┃                  ┃  ┃  detection       ┃
   ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━━┛
```

### Service Spotlight — Amazon QuickSight

![QuickSight](aws-icons/quicksight.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  📊  AMAZON  QUICKSIGHT  —  Business Intelligence          ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Sources      │  S3 via Athena, Redshift, RDS, Excel...   ║
   ║  Engine       │  SPICE (in-memory columnar cache)           ║
   ║  Superpowers  │  Amazon Q (natural language) • Embedded     ║
   ║  Editions     │  Standard • Enterprise                      ║
   ║                                                             ║
   ║  💡 Your "Tableau / Power BI" on AWS, with AI built in.     ║
   ╚═══════════════════════════════════════════════════════════╝
```

### QuickSight Flow

```
   🔍 Athena / 🏛️ Redshift ──► 🌶️ SPICE ──► 📊 Visuals ──► 🖥️ Dashboard ──► 👥 Share/Embed
   (data source)              (cached)     (charts)      (compose)      (consume)
```

### Service Spotlight — Amazon SageMaker

![SageMaker](aws-icons/sagemaker.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🤖  AMAZON  SAGEMAKER  —  Full-Lifecycle ML               ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Studio       │  Browser IDE for ML                         ║
   ║  AutoPilot    │  AutoML — tries many models                 ║
   ║  Pipelines    │  Train/evaluate/deploy as code              ║
   ║  Monitor      │  Catch model drift in production             ║
   ║                                                             ║
   ║  💡 From raw data to deployed model — one platform.          ║
   ╚═══════════════════════════════════════════════════════════╝
```

### Service Spotlight — Amazon Forecast

![Forecast](aws-icons/forecast.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🔮  AMAZON  FORECAST  —  No-Code Time-Series ML           ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Inputs       │  Historical + related series + metadata    ║
   ║  AutoML       │  Tries multiple algorithms, picks best      ║
   ║  Accuracy     │  Typically 50% better than Excel baselines  ║
   ║                                                             ║
   ║  💡 Same tech Amazon uses internally for demand planning.    ║
   ╚═══════════════════════════════════════════════════════════╝
```

```
   📈 Past sales + 🌡️ Weather + 🎉 Holidays
                    │
                    ▼
              🔮 Forecast (AutoML)
                    │
                    ▼
      📅 Daily predictions per SKU per store
```

### Service Spotlight — Amazon Personalize

![Personalize](aws-icons/personalize.png)

```
   ╔═══════════════════════════════════════════════════════════╗
   ║  🎯  AMAZON  PERSONALIZE  —  Netflix-Style Recs            ║
   ║ ───────────────────────────────────────────────────────── ║
   ║  Inputs       │  Users + items + interaction events        ║
   ║  Use cases    │  "You may like…", "Related items…"          ║
   ║  Real-time    │  Inference in milliseconds                  ║
   ║                                                             ║
   ║  💡 Same ML powering Amazon.com recommendations.             ║
   ╚═══════════════════════════════════════════════════════════╝
```

### 💬 Amazon Q in QuickSight — Natural-Language BI

```
   User types:   "Show me top 5 products last quarter"
                        │
                        ▼
         💬 Q interprets → writes SQL → runs → visualizes
                        │
                        ▼
            📊 Bar chart appears in 2 seconds
```

Analysts no longer gatekeep simple questions.

### 🧠 Redshift ML — SQL-Native Machine Learning

```sql
CREATE MODEL churn_model
FROM   customer_features
TARGET churned
FUNCTION predict_churn
IAM_ROLE DEFAULT
SETTINGS (S3_BUCKET 'my-ml-bucket');

-- then use it
SELECT customer_id, predict_churn(features) AS risk
FROM   customers
WHERE  risk > 0.8;
```

ML without leaving your data warehouse.

### The Value Stack

```
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║   💎  BUSINESS  VALUE     revenue • savings • growth       ║
   ║          ▲                                                 ║
   ║          │                                                 ║
   ║   🎯  APPLICATION LAYER    features: Personalize, Fraud   ║
   ║          ▲                                                 ║
   ║          │                                                 ║
   ║   🤖  ML LAYER             SageMaker, Forecast, Redshift ML║
   ║          ▲                                                 ║
   ║          │                                                 ║
   ║   🧪  ANALYSIS LAYER       Athena + QuickSight + Redshift  ║
   ║          ▲                                                 ║
   ║          │                                                 ║
   ║   🛠️  BUILD LAYER          S3 + Glue + Kinesis + Lake Fm  ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

> 💡 **HitaVir Tech says:** "The best data platform is worthless if nobody uses the outputs. Start from Value and work backwards — who sees which insight, and what decision changes? Design everything else to serve that."

## Putting It All Together
Duration: 5:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃         🔗   END-TO-END  AWS  ANALYTICS  STACK  🔗         ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Let's combine all 5 Vs into one living architecture:

```
   🌊 VELOCITY LAYER                     🧩 VARIETY LAYER
   ┌──────────────────────┐             ┌──────────────────────┐
   │  🌊 Kinesis Streams  │             │  🕸️ Glue Crawlers     │
   │  🚒 Firehose          │             │  🤖 Rekognition       │
   │  ⚡ Lambda            │             │  📝 Textract          │
   │  🪐 MSK (Kafka)       │             │  🔊 Transcribe        │
   └───────────┬──────────┘             │  💭 Comprehend        │
               │                         └───────────┬──────────┘
               ▼                                     │
          ╔══════════════════════════════════════════╪═══════╗
          ║            📦 VOLUME LAYER               │       ║
          ║ ┌──────────────────────┐   ┌─────────────▼─────┐ ║
          ║ │   🪣 Amazon S3       │◄──│  📚 Glue Catalog  │ ║
          ║ │   Data Lake          │   │  (metadata)       │ ║
          ║ │   raw / curated /    │   └───────────────────┘ ║
          ║ │   analytics          │                         ║
          ║ └──────────┬───────────┘                         ║
          ║            │                                      ║
          ║            ▼                                      ║
          ║ ┌──────────────────────┐                          ║
          ║ │  ⚙️ Glue ETL          │ ◄─── 🛡️ Glue DQ         ║
          ║ │  🐘 EMR               │ ◄─── 🧪 DataBrew        ║
          ║ │  (transform)         │ ◄─── 🏗️ Lake Formation   ║
          ║ └──────────┬───────────┘       (VERACITY LAYER)   ║
          ║            ▼                                      ║
          ║ ┌──────────────────────┐                          ║
          ║ │  🪣 S3 Curated       │                          ║
          ║ │  (Parquet)           │                          ║
          ║ └──────────┬───────────┘                          ║
          ╚════════════╪══════════════════════════════════════╝
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
  ┌─────────┐    ┌─────────┐    ┌─────────┐
  │  🔍     │    │  🏛️      │    │  🤖     │
  │ Athena  │    │ Redshift │    │SageMaker│
  │ (SQL)   │    │ (MPP)    │    │  (ML)   │
  └────┬────┘    └────┬─────┘    └────┬────┘
       │              │                │
       └──────────────┼────────────────┘
                      ▼
   ╔═══════════════════════════════════════════════╗
   ║              💎 VALUE LAYER                    ║
   ║  ┌──────────────┐  ┌──────────────┐           ║
   ║  │ 📊 QuickSight │  │ 🔮 Forecast  │           ║
   ║  │ 💬 Q          │  │ 🎯 Personal. │           ║
   ║  └──────┬───────┘  └──────┬───────┘           ║
   ║         └─────────┬────────┘                    ║
   ║                   ▼                             ║
   ║        🧠 Decisions  •  💰 Revenue              ║
   ╚═══════════════════════════════════════════════╝
```

Every box maps to a V. Every arrow is a managed AWS service. Together they form a complete cloud analytics platform.

## Hands-on Lab - Your First AWS Analytics Pipeline
Duration: 25:00

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃                                                           ┃
   ┃    🛠️   HANDS-ON  LAB  —  S3  →  GLUE  →  ATHENA   🛠️     ┃
   ┃                                                           ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### The Services We'll Touch

![S3](aws-icons/s3.png) ![Glue](aws-icons/glue.png) ![Crawler](aws-icons/glue-crawler.png) ![Glue Catalog](aws-icons/glue-catalog.png) ![Athena](aws-icons/athena.png)

You will build a mini pipeline that touches **Volume** (S3), **Variety** (CSV auto-cataloged), and **Value** (SQL insights).

```
   Step 1         Step 2-3        Step 4-5          Step 6          Step 7-9
  ┌──────┐       ┌──────┐        ┌──────────┐    ┌────────┐      ┌──────────┐
  │ 📄   │ ────> │ 🪣   │ ─────> │ 🕷️        │ ──>│ 📚     │ ──── │ 🔍       │
  │ CSV  │       │  S3  │        │ Crawler  │    │Catalog │      │ Athena   │
  └──────┘       └──────┘        └──────────┘    └────────┘      └──────────┘
   Prepare       Upload         Create & run      Table auto     Run SQL,
   sample data   to bucket       crawler          populated      get insights
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
2. Search **S3** in the top search bar
3. Click **Create bucket**
4. Bucket name: `hitavirtech-analytics-yourname` (globally unique — add your name)
5. Region: closest to you (`ap-south-1` = Mumbai)
6. Leave defaults → **Create bucket**

### ⬆️ Step 3 — Upload the CSV

1. Open your bucket → **Create folder** → `raw`
2. Inside `raw/` → **Create folder** → `sales`
3. Inside `raw/sales/` → **Upload** → select `sales.csv` → **Upload**

Your object now lives at:

```
🪣 s3://hitavirtech-analytics-yourname/raw/sales/sales.csv
```

### 🕸️ Step 4 — Create Glue Database and Crawler

1. Search **Glue** in the AWS Console
2. Left menu → **Databases** → **Add database**
3. Name: `hitavirtech_sales_db` → **Create**
4. Left menu → **Crawlers** → **Create crawler**
5. Name: `hitavirtech-sales-crawler` → **Next**
6. **Add a data source** → S3 → path: `s3://hitavirtech-analytics-yourname/raw/sales/` → **Add**
7. **Next** → **Create new IAM role** `AWSGlueServiceRole-hitavirtech` → **Create**
8. **Next** → Target database `hitavirtech_sales_db` → Schedule **On demand** → **Next** → **Create**

### 🕷️ Step 5 — Run the Crawler

1. Select `hitavirtech-sales-crawler` → **Run crawler**
2. Wait 1–2 minutes until **Status = Completed** and **Table changes = 1 created**

### 📚 Step 6 — Verify the Table

1. Glue → **Tables** → open the new `sales` table
2. Inspect:
   - Columns: `order_id, customer, product, quantity, amount, order_date`
   - Types: inferred automatically (bigint, string, double)
   - Location: your S3 folder

Glue just auto-discovered the schema. 🎉

### 🔍 Step 7 — Query with Athena

1. Open **Athena** in the AWS Console
2. First time: **Edit settings** → set query results location to `s3://hitavirtech-analytics-yourname/athena-results/`
3. In the editor: Data source = `AwsDataCatalog`, Database = `hitavirtech_sales_db`
4. Run:

```sql
SELECT * FROM sales LIMIT 5;
```

You should see 5 rows. 🎉

### 💡 Step 8 — Analytical Queries

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

### 💰 Step 9 — The "Data Scanned" Number

At the bottom of every result: **"Data scanned: 412 B"** or similar.

That number is your bill. At scale, every analytics engineer watches it. Partitioning + Parquet shrinks it 100–1000×.

### 🧹 Step 10 — Cleanup (Mandatory!)

> ⚠️ Forgetting cleanup = surprise AWS bill.

```
   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
   ┃  1. 🕸️ Glue → Crawlers → delete hitavirtech-sales-crawler  ┃
   ┃  2. 🕸️ Glue → Databases → delete hitavirtech_sales_db      ┃
   ┃  3. 🪣 S3 → your bucket → Empty → then Delete              ┃
   ┃  4. 💰 Check Billing Dashboard next day → confirm $0       ┃
   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

> 💡 **HitaVir Tech says:** "The last 5 minutes of cleanup are the most valuable 5 minutes of the entire lab. Engineers who skip it end up with $300 surprise bills."

## Summary and What's Next
Duration: 3:00

```
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║          🎉   CONGRATULATIONS  —  PART 1 DONE!   🎉        ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

### What You Learned

**🧠 Analytics Concepts**

| Topic | Icon |
|-------|:---:|
| Analytics and four maturity levels | 📊 |
| Machine Learning — three flavors | 🤖 |

**📏 The 5 Vs of Big Data**

```
   ┏━━━━━━━━┓ ┏━━━━━━━━┓ ┏━━━━━━━━┓ ┏━━━━━━━━┓ ┏━━━━━━━━┓
   ┃   📦   ┃ ┃   🧩   ┃ ┃   🌊   ┃ ┃   🛡️   ┃ ┃   💎   ┃
   ┃ VOLUME ┃ ┃VARIETY ┃ ┃VELOCITY┃ ┃VERACITY┃ ┃ VALUE  ┃
   ┗━━━━━━━━┛ ┗━━━━━━━━┛ ┗━━━━━━━━┛ ┗━━━━━━━━┛ ┗━━━━━━━━┛
    Scale     Formats    Speed      Trust      Outcome
```

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
- ⬆️ Uploaded data to S3
- 🕷️ Ran a Glue crawler
- 📚 Viewed the Data Catalog
- 🔍 Ran SQL with Athena
- 🧹 Cleaned up AWS resources

### What's Coming in Part 2

```
   🚀  PART 2 — ADVANCED ANALYTICS ON AWS
       ─────────────────────────────────────
       ⚙️  Glue ETL with Spark
       🛡️  Production data quality rules
       🧩  Partitioning + Parquet deep-dive
       🏛️  Redshift hands-on — load, query, Spectrum
       🌊  Streaming lab with Kinesis Firehose
       📊  Real QuickSight dashboard
       🤖  Intro to SageMaker + Redshift ML
       🎯  Capstone project
```

### What To Do Next

1. 🔄 **Repeat this lab** with a different dataset (try a Kaggle CSV)
2. 📖 **Read the AWS Athena and Glue docs**
3. 💰 **Watch your AWS bill** for a few days
4. 🧠 **Apply the 5 Vs** to a project you work on — identify the bottleneck V

### Final Thoughts

```
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║    📏 The 5 Vs = universal data challenge framework        ║
   ║    ☁️ AWS = complete toolbox for each V                    ║
   ║                                                           ║
   ║    Learn both → you can pick up any cloud's analytics     ║
   ║    stack in a week.                                       ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

> 💡 **HitaVir Tech says:** "Analytics is not about tools. Tools change every two years. Analytics is about asking the right question, finding the right data, and presenting an insight people can act on. Master the fundamentals — Volume, Variety, Velocity, Veracity, Value — and every new tool becomes just another syntax."

🎓 Welcome to cloud analytics. See you in **Part 2**.

— **HitaVir Tech**  ☁️

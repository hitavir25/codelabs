# Data Engineering on AWS: Foundations

A hands-on Google Codelabs track by **HitaVirTech**. It mirrors the official AWS
*Data Engineering on AWS: Foundations* course lesson for lesson, but every lesson
here is something you **do**, not just read. You build one real end-to-end pipeline
on a single shared dataset, and every concept ships with a custom visual so the
ideas stick.

By the end you will understand what a data engineer does, how to perform data
discovery, and which AWS services run, automate, and secure data solutions — and
you will have built a working lake house for a fictional online store.

## Who this is for

**HitaVir Tech Code** — a beginner-to-intermediate engineer who knows some Python
and SQL but is new to AWS data services. Every new term (data lake, Parquet,
partition, crawler, COPY, serverless, lake house) is defined the first time it
appears, then used normally.

## The storyline

You are the first data engineer at **HitaVir Retail**, an online store. You work
one dataset across the whole track — three logical tables: `orders`, `customers`,
and `products` — and move it through a Medallion data lake on Amazon S3:
**raw to bronze to silver to gold**. Each lesson adds one real capability to that
pipeline.

The data lives in [`dataset/`](dataset/). Regenerate it any time — the seed is
fixed, so everyone gets identical rows and identical query results:

```bash
cd dataset
python generate_data.py
```

## Learning path

| # | Codelab | Official AWS lesson | Duration |
|---|---------|---------------------|----------|
| 00 | [Course navigation](codelabs/00-course-navigation.md) | Lesson 0 — Course Navigation | 45 min |
| 01 | [What a data engineer does](codelabs/01-introduction.md) | Lesson 1 — Introduction | 40 min |
| 02 | [Data discovery on AWS](codelabs/02-data-discovery.md) | Lesson 2 — Data Discovery | 50 min |
| 03-1 | [Storage and the data lake](codelabs/03-1-storage-and-data-lake.md) | Lesson 3 — AWS Data Services and the Modern Data Architecture | 50 min |
| 03-2 | [Transform with Glue ETL (PySpark)](codelabs/03-2-glue-etl-pyspark.md) | Lesson 3 (continued) | 60 min |
| 03-3 | [Serve and query (Athena, Redshift)](codelabs/03-3-serve-athena-redshift.md) | Lesson 3 (continued) | 60 min |
| 04 | [Orchestration and automation](codelabs/04-orchestration-and-automation.md) | Lesson 4 — Orchestration and Automation Options | 55 min |
| 05 | [Security and monitoring](codelabs/05-security-and-monitoring.md) | Lesson 5 — Security and Monitoring | 55 min |
| 06 | [Assessment and capstone](codelabs/06-assessment.md) | Lesson 6 — Assessment | 60 min |
| 07 | [Conclusion and teardown](codelabs/07-conclusion.md) | Lesson 7 — Conclusion | 30 min |

Do them in order the first time. After that, each lab is self-contained enough to
revisit on its own.

## Prerequisites

- An AWS account you can create resources in (codelab 00 walks you through setup,
  IAM, billing alarms, and a budget).
- The AWS CLI installed and configured (also covered in codelab 00).
- Basic comfort with Python, SQL, and a terminal.
- A code editor. VS Code is fine.

## Conventions and assumptions

These hold across every lab so resources are easy to find and easy to delete:

- **Region:** `us-east-1` (N. Virginia) — broadest service and free-tier coverage.
  If you use another region, change it everywhere consistently.
- **Resource prefix:** everything is named `hvt-retail-...` so you can find and
  delete it fast.
- **Data lake bucket:** `hvt-retail-datalake-<your-account-id>` (S3 bucket names
  are global, so the account id keeps it unique).
- **Tags:** every resource gets `project=hvt-retail` and `env=dev` for cost
  tracking and cleanup.
- **Cost:** the track favors free-tier and serverless services and keeps the
  dataset tiny. Anything that bills is called out in the lab, and every lab ends
  with a mandatory cleanup section.

## The visuals

Every lesson ships a self-contained concept visual in [`assets/`](assets/) — open
them in a browser on their own, or view them embedded in the codelab. They all
import [`assets/design-tokens.css`](assets/design-tokens.css), so the palette,
fonts, and motion are one source of truth. Color carries meaning and is reused for
the same concept across the whole track:

- Foundation / infrastructure — indigo
- Inflow / ingest — cyan
- Transform / prepare — amber
- Organize / catalog — violet
- Automate / orchestrate — emerald
- Protect / govern / security — rose

## Render and preview locally with claat

[`claat`](https://github.com/googlecodelabs/tools) is Google's Codelabs export
tool. From the repo root:

```bash
# Export a single codelab to HTML
claat export codelabs/00-course-navigation.md

# Export the whole track
claat export codelabs/*.md

# Preview in your browser (serves the exported folders)
claat serve
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for installing claat and authoring rules.

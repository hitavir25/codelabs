summary: SQL for Data Engineering - Beginner to Expert
id: sql-for-data-engineering
categories: SQL, Data Engineering, MySQL
tags: sql, mysql, etl, data-engineering, beginner, expert
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# SQL for Data Engineering: Beginner to Expert
**Author:** HitaVir Tech
**Last updated:** 2026-05-02

## Summary

This codelab takes you from zero SQL to production-ready Data Engineering SQL using **MySQL 8.0** on Windows. You will work end-to-end with a single realistic e-commerce dataset called `hitavir_sales` — customers, products, orders, and order items — and use it for every example, every challenge, and the final star-schema capstone. By the end you can write the kind of SQL that ships in real ETL and reporting pipelines.

Every concept is runnable. Every query is followed by its expected output as an ASCII table. Every step ends with a checkpoint so you know exactly what you should see before moving on.

## What you'll learn

- Reading and writing MySQL 8.0 SQL fluently — DDL, DML, and analytical queries
- The difference between OLTP and OLAP and where SQL sits in an ETL pipeline
- Designing tables with constraints, primary keys, and foreign keys
- All five join types (including FULL OUTER via UNION) and how to draw them on paper
- Aggregation, subqueries (scalar, correlated, IN/EXISTS), window functions, CTEs, and recursive CTEs
- Data cleaning: NULL handling, string normalization, date parsing, deduplication
- Reading `EXPLAIN` output and choosing indexes that actually pay off
- Building a star schema (fact + dimensions) and an end-to-end daily reporting pipeline
- Connecting MySQL to Python, Airflow, Spark SQL, and Databricks

## What you'll build

A continuous dataset called `hitavir_sales`, seeded once in Step 2 and reused for the next 17 steps. The capstone (Step 14) extends it into a working sales-reporting pipeline: staging → cleaning → star schema (`fact_sales`, `dim_customer`, `dim_product`) → `daily_sales_summary` → indexed performance tuning with EXPLAIN before/after.

By the final step your repository will contain:

- A reproducible MySQL setup script
- The full `hitavir_sales` schema and seed data
- 50+ runnable example queries
- A capstone reporting pipeline you can run end-to-end
- Five graded challenges with worked solutions

## Prerequisites

- Windows 10 or 11 with administrator rights
- ~2 GB free disk space and an internet connection
- Comfort opening a terminal and saving a file
- **No prior SQL knowledge** — you start from `SELECT 1;`

## Setup

The full setup happens in **Step 2**. If you already have MySQL Server 8.0+ and MySQL Workbench 8.0+ installed and connected, jump to Step 3 — but run the seed script in Step 2 first, otherwise every later example will reference tables you do not yet have.

---

## Step 1: SQL in Data Engineering

> *"A relational database is a set of relations."*
> — E.F. Codd
>
> 💡 **HitaVir Tech connection:** SQL exists because Codd proved in 1970 that organizing data into relations (tables) is more powerful than any other shape — and 50+ years later, every Data Engineer still earns a living off that idea.
> 🎯 **Why this matters now:** Spend the next 10 minutes building a clear mental model of OLTP vs OLAP. Every architectural decision you make later traces back to this one distinction.

Duration: 10 min

### What is SQL?

SQL (Structured Query Language) is the language for talking to relational databases. In Data Engineering you will use it for two very different jobs:

1. **OLTP** (Online Transaction Processing) — small, fast operations on a few rows: a checkout, a login, an inventory update. MySQL, PostgreSQL, and Oracle dominate here.
2. **OLAP** (Online Analytical Processing) — big, scan-heavy queries that summarize millions of rows: yesterday's revenue by region, customer churn, top products. Snowflake, BigQuery, and Redshift dominate here.

### OLTP vs OLAP at a glance

| Dimension     | OLTP                          | OLAP                              |
|---------------|-------------------------------|-----------------------------------|
| Workload      | Many small transactions       | Few large scans                   |
| Rows / query  | 1–100                         | thousands to millions             |
| Latency goal  | milliseconds                  | seconds to minutes                |
| Schema        | Highly normalized (3NF)       | Star / snowflake (dimensional)    |
| Example       | "Place this order"            | "Total revenue by region last Q"  |
| Tool examples | MySQL, PostgreSQL, Oracle     | Snowflake, BigQuery, Redshift     |

### Where SQL sits in an ETL pipeline

```
+------------+      +-----------+      +------------+      +-----------+
|  Sources   | ---> |  Staging  | ---> | Transform  | ---> | Warehouse |
| (CSV, API, |      |   (raw    |      |  (clean,   |      |  (star    |
|  OLTP DB)  |      |   copy)   |      |  validate) |      |   schema) |
+------------+      +-----------+      +------------+      +-----------+
                          ^                  ^                   ^
                          |                  |                   |
                          +------ SQL is the language at every box ---+
```

You will write SQL inside Airflow tasks, dbt models, Spark notebooks, Python scripts, and BI tools. It is the lingua franca.

💡 **HitaVir Tech Tip:** If you can write clean SQL, every other tool — Airflow, dbt, Spark — becomes a thin wrapper around that skill. Invest in SQL first.

🚀 **Pro Insight:** In production, roughly 80% of Data Engineering work is SQL or SQL-adjacent. Even teams running PySpark or Scala still spend most of their day writing `SELECT`, `JOIN`, and `GROUP BY`. The languages above SQL are noise; SQL is the signal.

### Why MySQL 8.0?

MySQL is the most widely used open-source relational database in the world. Picking it for this codelab means:

- Free, runs natively on Windows, macOS, and Linux
- Modern: window functions, CTEs, and recursive CTEs since 8.0
- Syntax that transfers cleanly to PostgreSQL, Snowflake, and BigQuery
- Massive community — every error you will hit has a Stack Overflow answer

### ✅ Checkpoint

Before moving on, you should be able to:

- [ ] Explain OLTP vs OLAP in one sentence each
- [ ] Name at least one product in each category
- [ ] Describe where SQL sits in an ETL pipeline
- [ ] Explain why this codelab uses MySQL 8.0 specifically

---

## Step 2: Setup — MySQL Server, Workbench, and seed data

> *"Hard work beats talent when talent doesn't work hard."*
> — Tim Notke
>
> 💡 **HitaVir Tech connection:** Setup is the unglamorous step every learner wants to skip — and the one that separates the people who finish from the people who quit on Day 2.
> 🎯 **Why this matters now:** Do every step below today, in order, even if you "kind of already have" MySQL. A clean install is faster than a debugging session next Tuesday.

Duration: 20 min

### Step 2.1 — Install MySQL Server 8.0+

1. Go to [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
2. Download the **MySQL Installer for Windows** (the larger "mysql-installer-community" file)
3. Run the installer and choose **"Developer Default"** — this installs Server, Workbench, Shell, and connectors
4. When asked, set the **root password** to something you will remember (you will type this in Step 2.3)
5. Accept the default port `3306`
6. Finish the wizard

### Step 2.2 — Verify the install

Open **Command Prompt** and run:

```bash
mysql --version
```

**Expected output (your version may be slightly higher):**

```
mysql  Ver 8.0.36 for Win64 on x86_64 (MySQL Community Server - GPL)
```

### Step 2.3 — Connect with MySQL Workbench

1. Launch **MySQL Workbench**
2. Click the **Local instance MySQL80** connection tile
3. Enter the root password you set in Step 2.1
4. You should land in a query editor with a left-side **SCHEMAS** panel

### Step 2.4 — Create the schema

In the Workbench query editor, paste and run:

```sql
-- Create the working schema for this entire codelab
CREATE DATABASE IF NOT EXISTS hitavir_sales
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hitavir_sales;
```

**Expected output:**

```
1 row(s) affected
0 row(s) affected
```

### Step 2.5 — Create all four tables

Paste and run this DDL block. Step 4 explains every line; for now, just run it.

```sql
USE hitavir_sales;

CREATE TABLE customers (
    customer_id    INT          PRIMARY KEY AUTO_INCREMENT,
    full_name      VARCHAR(100) NOT NULL,
    email          VARCHAR(150),
    city           VARCHAR(80),
    signup_date    DATE
);

CREATE TABLE products (
    product_id     INT          PRIMARY KEY AUTO_INCREMENT,
    product_name   VARCHAR(120) NOT NULL,
    category       VARCHAR(60)  NOT NULL,
    unit_price     DECIMAL(10,2) NOT NULL
);

CREATE TABLE orders (
    order_id       INT          PRIMARY KEY AUTO_INCREMENT,
    customer_id    INT          NOT NULL,
    order_date     DATE         NOT NULL,
    status         VARCHAR(20)  NOT NULL,
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id  INT          PRIMARY KEY AUTO_INCREMENT,
    order_id       INT          NOT NULL,
    product_id     INT          NOT NULL,
    quantity       INT          NOT NULL,
    line_amount    DECIMAL(12,2) NOT NULL,
    CONSTRAINT fk_items_order   FOREIGN KEY (order_id)   REFERENCES orders(order_id),
    CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### Step 2.6 — Seed data: customers (deliberately dirty)

The seed includes intentional dirtiness — mixed-case emails, inconsistent city spellings (`Bengaluru` / `bengaluru` / `BLR`), a few `NULL`s, and one duplicate customer. Step 11 and the capstone will clean this up.

```sql
INSERT INTO customers (customer_id, full_name, email, city, signup_date) VALUES
( 1, 'Asha Sharma',       'asha.sharma@example.com',       'Bengaluru',  '2025-08-01'),
( 2, 'Ravi Kumar',        'ravi.kumar@example.com',        'bengaluru',  '2025-08-04'),
( 3, 'Priya Patel',       'priya.patel@example.com',       'Mumbai',     '2025-08-10'),
( 4, 'Arjun Reddy',       'arjun.reddy@example.com',       'Hyderabad',  '2025-08-12'),
( 5, 'Kavya Iyer',        'kavya.iyer@example.com',        'Chennai',    '2025-08-15'),
( 6, 'Rohan Mehta',       'rohan.mehta@example.com',       'Mumbai',     '2025-08-21'),
( 7, 'Sneha Nair',        'sneha.nair@example.com',        'Kochi',      '2025-08-25'),
( 8, 'Vikram Singh',      'vikram.singh@example.com',      'Delhi',      '2025-09-01'),
( 9, 'Anjali Desai',      'anjali.desai@example.com',      'Pune',       '2025-09-04'),
(10, 'Karthik Pillai',    'karthik.pillai@example.com',    'Chennai',    '2025-09-09'),
(11, 'Meera Rao',         'meera.rao@example.com',         'BLR',        '2025-09-14'),
(12, 'Aditya Bhatt',      'aditya.bhatt@example.com',      'Ahmedabad',  '2025-09-19'),
(13, 'Divya Krishnan',    'divya.krishnan@example.com',    'Kochi',      '2025-09-22'),
(14, 'Rahul Joshi',       'rahul.joshi@example.com',       NULL,         '2025-09-25'),
(15, 'Pooja Verma',       'pooja.verma@example.com',       'Delhi',      '2025-10-02'),
(16, 'Sandeep Choudhury', 'sandeep.choudhury@example.com', 'Kolkata',    '2025-10-08'),
(17, 'Neha Saxena',       'neha.saxena@example.com',       'Lucknow',    '2025-10-14'),
(18, 'Suresh Iyengar',    'Suresh.IYENGAR@Example.COM',    'Bengaluru',  '2025-10-19'),
(19, 'Lakshmi Menon',     'lakshmi.menon@example.com',     'Chennai',    '2025-10-25'),
(20, 'Manoj Tiwari',      'manoj.tiwari@example.com',      'Varanasi',   '2025-11-01'),
(21, 'Sunita Gupta',      'sunita.gupta@example.com',      'Jaipur',     '2025-11-05'),
(22, 'Deepak Nair',       'deepak.nair@example.com',       'Kochi',      '2025-11-10'),
(23, 'Ritu Agarwal',      NULL,                            'Delhi',      '2025-11-14'),
(24, 'Vinay Kulkarni',    'vinay.kulkarni@example.com',    'Pune',       '2025-11-19'),
(25, 'Anita Bose',        'anita.bose@example.com',        'Kolkata',    '2025-11-25'),
(26, 'Sanjay Murthy',     'sanjay.murthy@example.com',     'bengaluru',  '2025-12-01'),
(27, 'Geeta Pandey',      'geeta.pandey@example.com',      'Allahabad',  '2025-12-05'),
(28, 'Harish Rao',        'harish.rao@example.com',        'Hyderabad',  '2025-12-10'),
(29, 'Ravi Kumar',        'ravi.kumar2@example.com',       'Bengaluru',  '2025-12-12'),  -- duplicate name
(30, 'Tara Bhat',         'tara.bhat@example.com',         'Mangalore',  '2025-12-18');
```

### Step 2.7 — Seed data: products

```sql
INSERT INTO products (product_id, product_name, category, unit_price) VALUES
( 1, 'Laptop Pro 14',       'Electronics', 89999.00),
( 2, 'Wireless Mouse',      'Electronics',  1299.00),
( 3, 'Mechanical Keyboard', 'Electronics',  4999.00),
( 4, 'USB-C Hub',           'Electronics',  2499.00),
( 5, 'Cotton T-Shirt',      'Apparel',       599.00),
( 6, 'Denim Jeans',         'Apparel',      1799.00),
( 7, 'Running Shoes',       'Footwear',     3499.00),
( 8, 'Office Chair',        'Furniture',   12999.00),
( 9, 'Desk Lamp',           'Furniture',    1499.00),
(10, 'Coffee Mug Set',      'Home',          799.00),
(11, 'Kitchen Knife Set',   'Home',         2299.00),
(12, 'Yoga Mat',            'Fitness',      1199.00),
(13, 'Dumbbell Pair 5kg',   'Fitness',      2499.00),
(14, 'Notebook A4',         'Stationery',    199.00),
(15, 'Pen Pack',            'Stationery',    149.00);
```

### Step 2.8 — Seed data: orders (100 rows)

```sql
INSERT INTO orders (order_id, customer_id, order_date, status) VALUES
(  1,  1,'2026-01-03','DELIVERED'),(  2,  5,'2026-01-04','DELIVERED'),(  3,  9,'2026-01-05','DELIVERED'),
(  4,  3,'2026-01-06','DELIVERED'),(  5,  2,'2026-01-07','SHIPPED'  ),(  6,  7,'2026-01-08','DELIVERED'),
(  7, 14,'2026-01-09','CANCELLED'),(  8,  1,'2026-01-10','DELIVERED'),(  9, 11,'2026-01-12','DELIVERED'),
( 10, 15,'2026-01-13','DELIVERED'),( 11,  6,'2026-01-14','DELIVERED'),( 12, 18,'2026-01-15','DELIVERED'),
( 13,  4,'2026-01-16','DELIVERED'),( 14, 22,'2026-01-17','DELIVERED'),( 15,  8,'2026-01-18','RETURNED' ),
( 16,  1,'2026-01-19','DELIVERED'),( 17, 10,'2026-01-20','DELIVERED'),( 18, 12,'2026-01-21','DELIVERED'),
( 19, 19,'2026-01-22','SHIPPED'  ),( 20, 25,'2026-01-23','DELIVERED'),( 21,  3,'2026-01-24','DELIVERED'),
( 22, 16,'2026-01-25','DELIVERED'),( 23, 20,'2026-01-26','PLACED'   ),( 24,  5,'2026-01-27','DELIVERED'),
( 25, 27,'2026-01-28','DELIVERED'),( 26,  9,'2026-01-29','CANCELLED'),( 27, 24,'2026-01-30','DELIVERED'),
( 28,  2,'2026-02-01','DELIVERED'),( 29, 13,'2026-02-02','DELIVERED'),( 30, 17,'2026-02-03','DELIVERED'),
( 31, 30,'2026-02-04','DELIVERED'),( 32,  6,'2026-02-05','SHIPPED'  ),( 33, 21,'2026-02-06','DELIVERED'),
( 34,  1,'2026-02-07','DELIVERED'),( 35,  4,'2026-02-08','DELIVERED'),( 36, 11,'2026-02-09','RETURNED' ),
( 37, 28,'2026-02-10','DELIVERED'),( 38, 26,'2026-02-11','DELIVERED'),( 39, 14,'2026-02-12','DELIVERED'),
( 40,  7,'2026-02-13','DELIVERED'),( 41,  8,'2026-02-14','DELIVERED'),( 42, 22,'2026-02-15','DELIVERED'),
( 43, 18,'2026-02-16','DELIVERED'),( 44, 25,'2026-02-17','DELIVERED'),( 45,  3,'2026-02-18','DELIVERED'),
( 46, 19,'2026-02-19','SHIPPED'  ),( 47, 12,'2026-02-20','DELIVERED'),( 48,  9,'2026-02-21','DELIVERED'),
( 49, 15,'2026-02-22','DELIVERED'),( 50,  1,'2026-02-23','DELIVERED'),( 51,  5,'2026-02-24','DELIVERED'),
( 52, 24,'2026-02-25','CANCELLED'),( 53, 16,'2026-02-26','DELIVERED'),( 54, 20,'2026-02-27','DELIVERED'),
( 55, 27,'2026-02-28','DELIVERED'),( 56,  2,'2026-03-01','DELIVERED'),( 57, 13,'2026-03-02','DELIVERED'),
( 58,  6,'2026-03-03','DELIVERED'),( 59, 30,'2026-03-04','DELIVERED'),( 60, 17,'2026-03-05','DELIVERED'),
( 61, 21,'2026-03-06','SHIPPED'  ),( 62, 11,'2026-03-07','DELIVERED'),( 63, 28,'2026-03-08','DELIVERED'),
( 64,  4,'2026-03-09','DELIVERED'),( 65, 26,'2026-03-10','DELIVERED'),( 66,  7,'2026-03-11','DELIVERED'),
( 67, 14,'2026-03-12','DELIVERED'),( 68,  8,'2026-03-13','DELIVERED'),( 69, 22,'2026-03-14','DELIVERED'),
( 70, 18,'2026-03-15','DELIVERED'),( 71,  3,'2026-03-16','DELIVERED'),( 72, 25,'2026-03-17','RETURNED' ),
( 73, 19,'2026-03-18','DELIVERED'),( 74, 12,'2026-03-19','DELIVERED'),( 75,  1,'2026-03-20','DELIVERED'),
( 76,  9,'2026-03-21','DELIVERED'),( 77,  5,'2026-03-22','DELIVERED'),( 78, 15,'2026-03-23','DELIVERED'),
( 79, 24,'2026-03-24','DELIVERED'),( 80, 16,'2026-03-25','DELIVERED'),( 81, 20,'2026-03-26','DELIVERED'),
( 82, 27,'2026-03-27','DELIVERED'),( 83,  2,'2026-03-28','DELIVERED'),( 84, 13,'2026-03-29','DELIVERED'),
( 85,  6,'2026-03-30','DELIVERED'),( 86, 30,'2026-03-31','DELIVERED'),( 87, 17,'2026-04-01','DELIVERED'),
( 88, 21,'2026-04-02','DELIVERED'),( 89, 11,'2026-04-03','DELIVERED'),( 90, 28,'2026-04-04','DELIVERED'),
( 91,  4,'2026-04-05','DELIVERED'),( 92, 26,'2026-04-06','DELIVERED'),( 93,  7,'2026-04-07','DELIVERED'),
( 94,  8,'2026-04-08','SHIPPED'  ),( 95, 22,'2026-04-09','DELIVERED'),( 96, 18,'2026-04-10','DELIVERED'),
( 97,  3,'2026-04-11','DELIVERED'),( 98,  1,'2026-04-12','DELIVERED'),( 99,  5,'2026-04-13','PLACED'   ),
(100, 19,'2026-04-14','DELIVERED');
```

### Step 2.9 — Seed data: order_items (~250 rows)

```sql
INSERT INTO order_items (order_id, product_id, quantity, line_amount) VALUES
(  1, 1, 1,  89999.00),(  1, 2, 1,   1299.00),(  1, 4, 2,   4998.00),
(  2, 5, 3,   1797.00),(  2, 6, 1,   1799.00),
(  3, 7, 1,   3499.00),(  3,12, 2,   2398.00),(  3,14, 5,    995.00),
(  4, 8, 1,  12999.00),(  4, 9, 2,   2998.00),
(  5, 2, 2,   2598.00),(  5, 3, 1,   4999.00),
(  6,10, 4,   3196.00),(  6,11, 1,   2299.00),(  6,15, 3,    447.00),
(  7,13, 2,   4998.00),
(  8, 1, 1,  89999.00),(  8, 4, 1,   2499.00),
(  9, 5, 5,   2995.00),(  9, 6, 2,   3598.00),(  9, 7, 1,   3499.00),
( 10, 9, 1,   1499.00),( 10,10, 2,   1598.00),
( 11, 8, 2,  25998.00),( 11, 3, 1,   4999.00),
( 12, 2, 1,   1299.00),( 12,14, 10,  1990.00),( 12,15, 10,  1490.00),
( 13, 1, 1,  89999.00),( 13, 7, 1,   3499.00),
( 14,11, 2,   4598.00),( 14,12, 1,   1199.00),
( 15, 6, 1,   1799.00),
( 16, 3, 2,   9998.00),( 16, 4, 1,   2499.00),( 16, 2, 1,   1299.00),
( 17,13, 3,   7497.00),( 17,12, 2,   2398.00),
( 18, 5, 4,   2396.00),( 18, 6, 1,   1799.00),
( 19, 9, 1,   1499.00),( 19,10, 1,    799.00),
( 20, 1, 1,  89999.00),( 20, 4, 2,   4998.00),
( 21, 7, 2,   6998.00),( 21,12, 1,   1199.00),
( 22, 2, 3,   3897.00),
( 23,11, 1,   2299.00),( 23,14, 4,    796.00),
( 24, 5, 2,   1198.00),( 24, 6, 2,   3598.00),( 24, 7, 1,   3499.00),
( 25, 8, 1,  12999.00),
( 26, 3, 1,   4999.00),
( 27, 9, 2,   2998.00),( 27,10, 3,   2397.00),( 27,15, 5,    745.00),
( 28, 2, 2,   2598.00),( 28, 4, 1,   2499.00),
( 29,13, 1,   2499.00),( 29,12, 1,   1199.00),
( 30, 6, 3,   5397.00),( 30, 5, 2,   1198.00),
( 31, 1, 1,  89999.00),( 31, 3, 1,   4999.00),( 31, 2, 1,   1299.00),
( 32, 7, 1,   3499.00),
( 33, 8, 1,  12999.00),( 33, 9, 1,   1499.00),
( 34,11, 1,   2299.00),( 34,10, 2,   1598.00),
( 35, 4, 2,   4998.00),( 35, 2, 1,   1299.00),
( 36, 6, 1,   1799.00),
( 37,14, 8,   1592.00),( 37,15, 8,   1192.00),
( 38, 5, 3,   1797.00),( 38, 7, 1,   3499.00),
( 39,12, 2,   2398.00),( 39,13, 1,   2499.00),
( 40, 1, 1,  89999.00),
( 41, 8, 1,  12999.00),( 41, 9, 2,   2998.00),
( 42, 3, 1,   4999.00),( 42, 4, 1,   2499.00),
( 43,10, 4,   3196.00),( 43,11, 1,   2299.00),
( 44, 5, 5,   2995.00),
( 45, 6, 2,   3598.00),( 45, 7, 1,   3499.00),
( 46, 2, 1,   1299.00),
( 47,12, 1,   1199.00),( 47,13, 2,   4998.00),
( 48, 1, 1,  89999.00),( 48, 4, 2,   4998.00),
( 49,14, 6,   1194.00),( 49,15, 6,    894.00),
( 50, 3, 1,   4999.00),( 50, 2, 2,   2598.00),
( 51, 8, 1,  12999.00),
( 52, 6, 1,   1799.00),
( 53, 9, 1,   1499.00),( 53,10, 2,   1598.00),
( 54, 5, 4,   2396.00),( 54, 7, 1,   3499.00),
( 55,11, 2,   4598.00),
( 56, 1, 1,  89999.00),( 56, 3, 1,   4999.00),
( 57,12, 3,   3597.00),
( 58, 4, 1,   2499.00),( 58, 2, 2,   2598.00),
( 59, 8, 1,  12999.00),( 59, 9, 1,   1499.00),
( 60, 6, 2,   3598.00),( 60, 5, 3,   1797.00),
( 61, 7, 1,   3499.00),
( 62,13, 2,   4998.00),( 62,12, 1,   1199.00),
( 63, 1, 1,  89999.00),
( 64, 3, 1,   4999.00),( 64, 4, 1,   2499.00),
( 65,10, 5,   3995.00),( 65,11, 1,   2299.00),
( 66, 5, 2,   1198.00),( 66, 6, 1,   1799.00),
( 67, 9, 1,   1499.00),
( 68, 2, 1,   1299.00),( 68, 4, 1,   2499.00),
( 69,14, 5,    995.00),( 69,15, 5,    745.00),
( 70, 7, 2,   6998.00),
( 71, 1, 1,  89999.00),( 71, 3, 1,   4999.00),
( 72, 8, 1,  12999.00),
( 73,12, 2,   2398.00),( 73,13, 1,   2499.00),
( 74, 5, 4,   2396.00),
( 75, 6, 2,   3598.00),( 75, 7, 1,   3499.00),
( 76, 2, 1,   1299.00),( 76, 4, 1,   2499.00),
( 77, 9, 2,   2998.00),
( 78,10, 3,   2397.00),( 78,11, 1,   2299.00),
( 79, 1, 1,  89999.00),
( 80, 3, 1,   4999.00),( 80, 2, 2,   2598.00),
( 81, 8, 1,  12999.00),
( 82, 6, 1,   1799.00),( 82, 7, 1,   3499.00),
( 83,12, 1,   1199.00),( 83,14, 4,    796.00),
( 84, 5, 3,   1797.00),
( 85,13, 2,   4998.00),
( 86, 1, 1,  89999.00),( 86, 4, 1,   2499.00),
( 87,11, 1,   2299.00),( 87, 9, 2,   2998.00),
( 88, 7, 1,   3499.00),
( 89, 2, 2,   2598.00),( 89, 3, 1,   4999.00),
( 90, 5, 5,   2995.00),
( 91, 1, 1,  89999.00),
( 92, 6, 2,   3598.00),( 92, 7, 1,   3499.00),
( 93,10, 4,   3196.00),( 93,15, 5,    745.00),
( 94, 8, 1,  12999.00),( 94, 9, 1,   1499.00),
( 95,12, 2,   2398.00),
( 96, 4, 2,   4998.00),
( 97, 5, 2,   1198.00),( 97, 6, 1,   1799.00),
( 98, 1, 1,  89999.00),( 98, 2, 1,   1299.00),( 98, 3, 1,   4999.00),
( 99,11, 1,   2299.00),
(100, 7, 1,   3499.00),(100,12, 1,   1199.00),(100,13, 1,   2499.00);
```

### Step 2.10 — Sanity check the seed

```sql
-- Confirm row counts match expectations
SELECT 'customers'   AS table_name, COUNT(*) AS row_count FROM customers
UNION ALL
SELECT 'products',   COUNT(*) FROM products
UNION ALL
SELECT 'orders',     COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items;
```

**Expected output:**

```
+-------------+-----------+
| table_name  | row_count |
+-------------+-----------+
| customers   |        30 |
| products    |        15 |
| orders      |       100 |
| order_items |       182 |
+-------------+-----------+
```

(Your `order_items` count will be exactly 182 if you pasted the seed verbatim.)

💡 **HitaVir Tech Tip:** Always sanity-check row counts immediately after a seed or load. A pipeline that silently lost half its rows is the worst kind of bug.

🚀 **Pro Insight:** In production every load step writes its row count to a logging table or metrics pipeline. "Did we load yesterday's data?" should be a one-query answer, not an investigation.

### ✅ Checkpoint

You should now be able to:

- [ ] Open MySQL Workbench and connect to your local instance
- [ ] See `hitavir_sales` in the SCHEMAS panel with four tables under it
- [ ] Run the row-count query above and get exactly the four numbers shown

If anything is off, drop and recreate the schema with `DROP DATABASE hitavir_sales;` and re-run from Step 2.4.

---

## Step 3: SELECT, WHERE, ORDER BY, LIMIT

> *"Make it work, make it right, make it fast."*
> — Kent Beck
>
> 💡 **HitaVir Tech connection:** This step is "make it work." You will write your first real queries against `hitavir_sales` — getting them correct, then refining them, then making them fast comes in Steps 13 and 15.
> 🎯 **Why this matters now:** Type every query yourself. Do not copy-paste. Muscle memory for `SELECT … FROM … WHERE … ORDER BY … LIMIT` is non-negotiable.

Duration: 15 min

### 3.1 — Your first SELECT

```sql
-- Read every customer's name and city
SELECT
    customer_id,
    full_name,
    city
FROM customers
ORDER BY customer_id
LIMIT 5;
```

**Expected output:**

```
+-------------+---------------+-----------+
| customer_id | full_name     | city      |
+-------------+---------------+-----------+
|           1 | Asha Sharma   | Bengaluru |
|           2 | Ravi Kumar    | bengaluru |
|           3 | Priya Patel   | Mumbai    |
|           4 | Arjun Reddy   | Hyderabad |
|           5 | Kavya Iyer    | Chennai   |
+-------------+---------------+-----------+
```

Notice: `LIMIT 5` says "give me at most 5 rows." `ORDER BY customer_id` guarantees a deterministic order; without it, MySQL is allowed to return rows in any order it wants.

### 3.2 — WHERE: filtering rows

```sql
-- Customers from Mumbai only
SELECT
    customer_id,
    full_name,
    signup_date
FROM customers
WHERE city = 'Mumbai'
ORDER BY signup_date;
```

**Expected output:**

```
+-------------+--------------+-------------+
| customer_id | full_name    | signup_date |
+-------------+--------------+-------------+
|           3 | Priya Patel  | 2025-08-10  |
|           6 | Rohan Mehta  | 2025-08-21  |
+-------------+--------------+-------------+
```

💡 **HitaVir Tech Tip:** `WHERE city = 'Mumbai'` is case-sensitive against your data. If your collation is `utf8mb4_unicode_ci` (the schema default), it is case-*insensitive*, so `'mumbai'` and `'Mumbai'` both match. Step 11 covers this in detail.

### 3.3 — Comparison operators

```sql
-- Products that cost more than ₹3000
SELECT
    product_id,
    product_name,
    unit_price
FROM products
WHERE unit_price > 3000
ORDER BY unit_price DESC;
```

**Expected output:**

```
+------------+---------------------+------------+
| product_id | product_name        | unit_price |
+------------+---------------------+------------+
|          1 | Laptop Pro 14       |   89999.00 |
|          8 | Office Chair        |   12999.00 |
|          3 | Mechanical Keyboard |    4999.00 |
|          7 | Running Shoes       |    3499.00 |
+------------+---------------------+------------+
```

### 3.4 — Multiple conditions

```sql
-- Orders placed in February that were delivered
SELECT
    order_id,
    customer_id,
    order_date,
    status
FROM orders
WHERE order_date >= '2026-02-01'
  AND order_date <  '2026-03-01'
  AND status = 'DELIVERED'
ORDER BY order_date
LIMIT 5;
```

**Expected output:**

```
+----------+-------------+------------+-----------+
| order_id | customer_id | order_date | status    |
+----------+-------------+------------+-----------+
|       28 |           2 | 2026-02-01 | DELIVERED |
|       29 |          13 | 2026-02-02 | DELIVERED |
|       30 |          17 | 2026-02-03 | DELIVERED |
|       31 |          30 | 2026-02-04 | DELIVERED |
|       33 |          21 | 2026-02-06 | DELIVERED |
+----------+-------------+------------+-----------+
```

🚀 **Pro Insight:** In production, always filter dates as half-open intervals: `>= start AND < end`. The pattern `BETWEEN '2026-02-01' AND '2026-02-28'` silently breaks in leap years and on month boundaries — the half-open form does not.

### 3.5 — Why no SELECT *

```sql
-- ❌ Anti-pattern — never do this in production code
SELECT * FROM orders LIMIT 1;
```

`SELECT *` is fine in the Workbench scratchpad, but never in code that ships. It hides which columns the query depends on, breaks if the table adds columns, and ships unused bytes over the network. Spell out the columns you actually need.

### ✅ Checkpoint

You can now:

- [ ] Run a `SELECT` with explicit column names
- [ ] Filter with `WHERE` using `=`, `>`, `<`, `>=`, `<=`, `<>`
- [ ] Combine conditions with `AND`
- [ ] Sort with `ORDER BY ... DESC`
- [ ] Cap rows with `LIMIT`

---

## Step 4: CREATE TABLE — data types and constraints

> *"Show me your flowcharts and conceal your tables, and I shall continue to be mystified. Show me your tables, and I won't usually need your flowcharts; they'll be obvious."*
> — Fred Brooks, *The Mythical Man-Month*
>
> 💡 **HitaVir Tech connection:** Tables are the source of truth. A clean schema explains the system; a dirty one buries it.
> 🎯 **Why this matters now:** Read every column type below and write down — in your own words — why it was picked. If you cannot justify a type, you do not understand the data.

Duration: 20 min

### 4.1 — Re-read the schema you created in Step 2

```sql
SHOW CREATE TABLE customers;
```

Workbench will return the full DDL for the `customers` table. You should see:

```
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `full_name`   varchar(100) NOT NULL,
  `email`       varchar(150) DEFAULT NULL,
  `city`        varchar(80)  DEFAULT NULL,
  `signup_date` date         DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB ...
```

### 4.2 — The data types you will use 95% of the time

| Type             | What it stores                          | Use it for                          |
|------------------|-----------------------------------------|-------------------------------------|
| `INT`            | Whole numbers, –2.1B to 2.1B            | IDs, counts, quantities             |
| `BIGINT`         | Whole numbers up to ~9.2 × 10¹⁸         | Very large IDs, byte counts         |
| `DECIMAL(p,s)`   | Exact decimals (no float drift)         | Money, prices, percentages          |
| `VARCHAR(n)`     | Variable-length text up to `n` chars    | Names, emails, statuses             |
| `TEXT`           | Long text, no fixed limit               | Descriptions, JSON blobs            |
| `DATE`           | Calendar date only                      | `signup_date`, `order_date`         |
| `DATETIME`       | Date + time (no timezone)               | `created_at` in OLTP                |
| `TIMESTAMP`      | Date + time, UTC-stored                 | `event_time` in event pipelines     |
| `BOOLEAN`        | Alias for `TINYINT(1)`, 0 or 1          | Flags                               |

💡 **HitaVir Tech Tip:** **Never** use `FLOAT` or `DOUBLE` for money. Use `DECIMAL(10,2)` so `0.10 + 0.20` equals exactly `0.30`, not `0.30000000004`.

### 4.3 — Constraints in plain English

| Constraint     | What it enforces                                                  |
|----------------|-------------------------------------------------------------------|
| `PRIMARY KEY`  | This column is unique and not null — the row's identity           |
| `NOT NULL`     | The column must have a value on every row                         |
| `UNIQUE`       | No two rows can share this value                                  |
| `FOREIGN KEY`  | This value must exist in another table's column                   |
| `CHECK`        | The value must satisfy an expression (MySQL 8.0.16+ enforces)     |
| `DEFAULT`      | If not provided on insert, use this value                         |

### 4.4 — Build a small reference table from scratch

```sql
-- A reference table for valid order statuses
CREATE TABLE order_statuses (
    status_code  VARCHAR(20) PRIMARY KEY,
    description  VARCHAR(100) NOT NULL,
    is_terminal  BOOLEAN     NOT NULL DEFAULT FALSE
);

INSERT INTO order_statuses (status_code, description, is_terminal) VALUES
('PLACED',    'Customer placed the order',                FALSE),
('SHIPPED',   'Order has shipped from warehouse',         FALSE),
('DELIVERED', 'Customer received the order',              TRUE),
('CANCELLED', 'Order cancelled before shipment',          TRUE),
('RETURNED',  'Customer returned a delivered order',      TRUE);
```

### 4.5 — Confirm the new table

```sql
SELECT
    status_code,
    description,
    is_terminal
FROM order_statuses
ORDER BY status_code;
```

**Expected output:**

```
+-------------+----------------------------------------+-------------+
| status_code | description                            | is_terminal |
+-------------+----------------------------------------+-------------+
| CANCELLED   | Order cancelled before shipment        |           1 |
| DELIVERED   | Customer received the order            |           1 |
| PLACED      | Customer placed the order              |           0 |
| RETURNED    | Customer returned a delivered order    |           1 |
| SHIPPED     | Order has shipped from warehouse       |           0 |
+-------------+----------------------------------------+-------------+
```

### 4.6 — ER diagram for `hitavir_sales`

```
                +-------------------+
                |     customers     |
                |-------------------|
                | customer_id  PK   |
                | full_name         |
                | email             |
                | city              |
                | signup_date       |
                +---------+---------+
                          |
                          | 1
                          |
                          | M
                +---------v---------+         +-------------------+
                |      orders       |         |    products       |
                |-------------------|         |-------------------|
                | order_id     PK   |         | product_id    PK  |
                | customer_id  FK   |         | product_name      |
                | order_date        |         | category          |
                | status            |         | unit_price        |
                +---------+---------+         +---------+---------+
                          |                             |
                          | 1                           | 1
                          |                             |
                          | M                           | M
                +---------v-----------+----------------v+
                |          order_items                  |
                |---------------------------------------|
                | order_item_id   PK                    |
                | order_id        FK -> orders          |
                | product_id      FK -> products        |
                | quantity                              |
                | line_amount                           |
                +---------------------------------------+
```

🚀 **Pro Insight:** In production, every database has at least one ER diagram in version control. When the schema diverges from the diagram, *that* is when bugs ship. Treat the diagram as code: it lives in the repo, it gets reviewed, it gets updated in the same PR as the migration.

### ✅ Checkpoint

You can now:

- [ ] Read a `CREATE TABLE` and explain every column type
- [ ] State what `PRIMARY KEY`, `NOT NULL`, and `FOREIGN KEY` enforce
- [ ] Justify `DECIMAL(10,2)` over `FLOAT` for `unit_price`
- [ ] Sketch the `hitavir_sales` ER diagram from memory

---

## Step 5: INSERT, UPDATE, DELETE

> *"It's not about how hard you hit. It's about how hard you can get hit and keep moving forward."*
> — Rocky Balboa
>
> 💡 **HitaVir Tech connection:** DML is the unglamorous engine room of every pipeline — it inserts, it updates, it deletes, every day, forever, and *it must not lose data when something goes wrong*.
> 🎯 **Why this matters now:** For the next 15 minutes, every `UPDATE` and `DELETE` you write must include a `WHERE` clause you have *read out loud*. No exceptions.

Duration: 15 min

### 5.1 — INSERT a single row

```sql
-- Add one new product
INSERT INTO products (product_name, category, unit_price)
VALUES ('Bluetooth Speaker', 'Electronics', 2999.00);

-- Confirm it was added
SELECT
    product_id,
    product_name,
    category,
    unit_price
FROM products
WHERE product_name = 'Bluetooth Speaker';
```

**Expected output:**

```
+------------+-------------------+-------------+------------+
| product_id | product_name      | category    | unit_price |
+------------+-------------------+-------------+------------+
|         16 | Bluetooth Speaker | Electronics |    2999.00 |
+------------+-------------------+-------------+------------+
```

`product_id = 16` because the column is `AUTO_INCREMENT` and you already had 15 products.

### 5.2 — INSERT multiple rows in one statement

```sql
-- Two more products in one round-trip to the server
INSERT INTO products (product_name, category, unit_price) VALUES
('Webcam HD',     'Electronics', 3299.00),
('Tripod Stand',  'Electronics', 1599.00);
```

💡 **HitaVir Tech Tip:** Multi-row inserts are 10–100× faster than one-row-per-statement. In production batch loads, batches of 500–5000 rows are typical.

### 5.3 — UPDATE: change existing rows

```sql
-- Bump every Stationery item price by 10%
UPDATE products
SET    unit_price = unit_price * 1.10
WHERE  category = 'Stationery';

SELECT
    product_id,
    product_name,
    unit_price
FROM products
WHERE category = 'Stationery';
```

**Expected output:**

```
+------------+----------------+------------+
| product_id | product_name   | unit_price |
+------------+----------------+------------+
|         14 | Notebook A4    |     218.90 |
|         15 | Pen Pack       |     163.90 |
+------------+----------------+------------+
```

⚠️ **Run this WITHOUT a WHERE clause and you have just updated *every* row in `products`.** Always read your `WHERE` clause out loud before pressing Run.

🚀 **Pro Insight:** Many production teams require an explicit `LIMIT` on every ad-hoc `UPDATE` and `DELETE`. Setting `SQL_SAFE_UPDATES = 1` in MySQL Workbench (Edit → Preferences → SQL Editor) blocks any `UPDATE`/`DELETE` without a key-based `WHERE`. Turn it on now.

### 5.4 — DELETE: remove rows

```sql
-- Delete the test products you just inserted
DELETE FROM products
WHERE product_name IN ('Bluetooth Speaker', 'Webcam HD', 'Tripod Stand');

-- Restore Stationery prices so the rest of the codelab matches expected outputs
UPDATE products SET unit_price = 199.00 WHERE product_id = 14;
UPDATE products SET unit_price = 149.00 WHERE product_id = 15;
```

**Expected output (from `DELETE`):**

```
3 row(s) affected
```

### 5.5 — Wrap multi-statement changes in a transaction

```sql
-- All-or-nothing block: either everything below commits, or nothing does
START TRANSACTION;

INSERT INTO customers (full_name, email, city, signup_date)
VALUES ('Test User', 'test@example.com', 'Bengaluru', CURRENT_DATE);

UPDATE customers
SET    city = 'Bangalore'
WHERE  full_name = 'Test User';

-- If anything looks wrong, run: ROLLBACK;
-- Otherwise commit:
ROLLBACK;
```

The `ROLLBACK` undoes both statements. If you used `COMMIT` instead, both would persist atomically.

### ✅ Checkpoint

You can now:

- [ ] Insert a single row and a batch of rows
- [ ] Update rows safely with a `WHERE` clause
- [ ] Delete rows safely with a `WHERE` clause
- [ ] Wrap related changes in `START TRANSACTION` … `COMMIT`/`ROLLBACK`
- [ ] Confirm `SQL_SAFE_UPDATES` is on in Workbench

---

## Step 6: Conditional logic — AND, OR, IN, BETWEEN, LIKE, CASE

> *"The most important property of a program is whether it accomplishes the intention of its user."*
> — C.A.R. Hoare
>
> 💡 **HitaVir Tech connection:** Conditions are how SQL captures the user's intent — every `AND`, `IN`, and `CASE` is a piece of business logic translated into a row filter or a derived column.
> 🎯 **Why this matters now:** For every condition you write today, say in plain English what business question it answers. If you cannot say it, do not write it.

Duration: 15 min

### 6.1 — AND, OR, NOT

```sql
-- Customers from Bengaluru OR Chennai who signed up in 2025
SELECT
    customer_id,
    full_name,
    city,
    signup_date
FROM customers
WHERE (city = 'Bengaluru' OR city = 'Chennai')
  AND signup_date >= '2025-01-01'
  AND signup_date <  '2026-01-01'
ORDER BY signup_date
LIMIT 5;
```

**Expected output:**

```
+-------------+-------------------+-----------+-------------+
| customer_id | full_name         | city      | signup_date |
+-------------+-------------------+-----------+-------------+
|           1 | Asha Sharma       | Bengaluru | 2025-08-01  |
|           5 | Kavya Iyer        | Chennai   | 2025-08-15  |
|          10 | Karthik Pillai    | Chennai   | 2025-09-09  |
|          18 | Suresh Iyengar    | Bengaluru | 2025-10-19  |
|          19 | Lakshmi Menon     | Chennai   | 2025-10-25  |
+-------------+-------------------+-----------+-------------+
```

Note: rows where `city = 'bengaluru'` or `'BLR'` are excluded — Step 11 fixes that.

### 6.2 — IN: shorthand for many ORs

```sql
-- Same as ('Bengaluru' OR 'Chennai' OR 'Mumbai'), more readable
SELECT
    customer_id,
    full_name,
    city
FROM customers
WHERE city IN ('Bengaluru', 'Chennai', 'Mumbai')
ORDER BY city, full_name
LIMIT 5;
```

**Expected output:**

```
+-------------+-----------------+-----------+
| customer_id | full_name       | city      |
+-------------+-----------------+-----------+
|           1 | Asha Sharma     | Bengaluru |
|          18 | Suresh Iyengar  | Bengaluru |
|          29 | Ravi Kumar      | Bengaluru |
|           5 | Kavya Iyer      | Chennai   |
|          10 | Karthik Pillai  | Chennai   |
+-------------+-----------------+-----------+
```

### 6.3 — BETWEEN: inclusive ranges

```sql
-- Products priced between ₹1000 and ₹3000 inclusive
SELECT
    product_id,
    product_name,
    unit_price
FROM products
WHERE unit_price BETWEEN 1000 AND 3000
ORDER BY unit_price;
```

**Expected output:**

```
+------------+---------------------+------------+
| product_id | product_name        | unit_price |
+------------+---------------------+------------+
|         12 | Yoga Mat            |    1199.00 |
|         02 | Wireless Mouse      |    1299.00 |
|         09 | Desk Lamp           |    1499.00 |
|         06 | Denim Jeans         |    1799.00 |
|         11 | Kitchen Knife Set   |    2299.00 |
|         04 | USB-C Hub           |    2499.00 |
|         13 | Dumbbell Pair 5kg   |    2499.00 |
+------------+---------------------+------------+
```

### 6.4 — LIKE: pattern matching

```sql
-- Customers whose name starts with 'R'
SELECT
    customer_id,
    full_name
FROM customers
WHERE full_name LIKE 'R%'
ORDER BY full_name;
```

**Expected output:**

```
+-------------+----------------+
| customer_id | full_name      |
+-------------+----------------+
|          14 | Rahul Joshi    |
|           2 | Ravi Kumar     |
|          29 | Ravi Kumar     |
|          23 | Ritu Agarwal   |
|           6 | Rohan Mehta    |
+-------------+----------------+
```

`%` matches zero or more characters; `_` matches exactly one. `'R%'` = "starts with R", `'%kumar%'` = "contains kumar", `'_avi%'` = "second-to-last char any, then 'avi…'".

### 6.5 — CASE: derive a column from a condition

```sql
-- Tag every product with a price band
SELECT
    product_id,
    product_name,
    unit_price,
    CASE
        WHEN unit_price < 500              THEN 'Budget'
        WHEN unit_price BETWEEN 500 AND 5000 THEN 'Mid-range'
        ELSE                                    'Premium'
    END AS price_band
FROM products
ORDER BY unit_price
LIMIT 8;
```

**Expected output:**

```
+------------+---------------------+------------+------------+
| product_id | product_name        | unit_price | price_band |
+------------+---------------------+------------+------------+
|         15 | Pen Pack            |     149.00 | Budget     |
|         14 | Notebook A4         |     199.00 | Budget     |
|          5 | Cotton T-Shirt      |     599.00 | Mid-range  |
|         10 | Coffee Mug Set      |     799.00 | Mid-range  |
|         12 | Yoga Mat            |    1199.00 | Mid-range  |
|          2 | Wireless Mouse      |    1299.00 | Mid-range  |
|          9 | Desk Lamp           |    1499.00 | Mid-range  |
|          6 | Denim Jeans         |    1799.00 | Mid-range  |
+------------+---------------------+------------+------------+
```

💡 **HitaVir Tech Tip:** `CASE` is your Swiss Army knife — bucket numeric ranges, normalize statuses, derive flags, replace nested IF/ELSE in application code with a single SQL expression.

### ✅ Checkpoint

You can now:

- [ ] Combine `AND`/`OR`/`NOT` with parentheses for clarity
- [ ] Replace long OR chains with `IN (...)`
- [ ] Filter ranges with `BETWEEN` (and know it is inclusive on both sides)
- [ ] Match strings with `LIKE` using `%` and `_`
- [ ] Derive a categorical column with `CASE WHEN ... THEN ... ELSE ... END`

---

## Step 7: Aggregations — COUNT, SUM, AVG, GROUP BY, HAVING

> *"Without data, you're just another person with an opinion."*
> — W. Edwards Deming
>
> 💡 **HitaVir Tech connection:** Aggregations are how you turn millions of raw rows into the three numbers a CEO actually wants. Get them wrong and the report lies.
> 🎯 **Why this matters now:** Every aggregation you write today must answer a *specific* business question — say it before you write the SQL.

Duration: 20 min

### 7.1 — The five aggregate functions you will use daily

| Function   | What it returns                              | Notes                          |
|------------|----------------------------------------------|--------------------------------|
| `COUNT(*)` | Number of rows in the group                  | Includes rows with NULLs       |
| `COUNT(c)` | Number of non-NULL values in column `c`      | Counts only non-NULL           |
| `SUM(c)`   | Sum of `c` (NULLs ignored)                   |                                |
| `AVG(c)`   | Average of `c` (NULLs ignored)               |                                |
| `MIN(c)` / `MAX(c)` | Smallest / largest non-NULL value   | Works on numbers, dates, text  |

### 7.2 — Single aggregate over the whole table

```sql
-- Total number of orders, ever
SELECT COUNT(*) AS total_orders FROM orders;
```

**Expected output:**

```
+--------------+
| total_orders |
+--------------+
|          100 |
+--------------+
```

### 7.3 — GROUP BY: one aggregate per group

```sql
-- Number of orders per status
SELECT
    status,
    COUNT(*) AS order_count
FROM orders
GROUP BY status
ORDER BY order_count DESC;
```

**Expected output:**

```
+-----------+-------------+
| status    | order_count |
+-----------+-------------+
| DELIVERED |          88 |
| SHIPPED   |           5 |
| CANCELLED |           4 |
| RETURNED  |           3 |
| PLACED    |           2 |
+-----------+-------------+
```

🚀 **Pro Insight:** Every column in the `SELECT` of an aggregation must either be inside an aggregate function or appear in `GROUP BY`. MySQL 8.0 enforces this by default with `ONLY_FULL_GROUP_BY`. Older MySQL was sloppy and silently returned arbitrary rows — that "feature" caused millions of dollars in bad reports.

### 7.4 — Multi-column GROUP BY

```sql
-- Revenue per product (only for delivered orders)
SELECT
    p.product_name,
    SUM(oi.line_amount) AS revenue
FROM order_items AS oi
JOIN orders   AS o ON o.order_id = oi.order_id
JOIN products AS p ON p.product_id = oi.product_id
WHERE o.status = 'DELIVERED'
GROUP BY p.product_name
ORDER BY revenue DESC
LIMIT 5;
```

**Expected output (top 5 revenue products):**

```
+---------------------+------------+
| product_name        | revenue    |
+---------------------+------------+
| Laptop Pro 14       | 1259986.00 |
| Office Chair        |  103992.00 |
| Mechanical Keyboard |   54989.00 |
| Running Shoes       |   45487.00 |
| Denim Jeans         |   30583.00 |
+---------------------+------------+
```

(Joins are formally introduced in Step 8 — for now treat the JOINs as "stitch the tables together on matching IDs.")

### 7.5 — HAVING: filtering on aggregates

```sql
-- Customers with more than 4 orders
SELECT
    customer_id,
    COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 4
ORDER BY order_count DESC;
```

**Expected output:**

```
+-------------+-------------+
| customer_id | order_count |
+-------------+-------------+
|           1 |           5 |
+-------------+-------------+
```

💡 **HitaVir Tech Tip:** `WHERE` filters rows *before* aggregation, `HAVING` filters groups *after*. If your filter does not depend on an aggregate, put it in `WHERE` — it is faster and clearer.

### ✅ Checkpoint

You can now:

- [ ] Run a single aggregate (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
- [ ] Group by one or more columns
- [ ] Filter groups with `HAVING`
- [ ] Explain why every non-aggregate column must be in `GROUP BY`

---

## Step 8: Joins — INNER, LEFT, RIGHT, and FULL via UNION

> *"Smart data structures and dumb code works a lot better than the other way around."*
> — Eric S. Raymond
>
> 💡 **HitaVir Tech connection:** Joins are where your tables tell their story together. 80% of production SQL bugs hide in bad joins — wrong columns, wrong direction, exploding row counts.
> 🎯 **Why this matters now:** In the next 30 minutes, draw every join on paper before you write it. No exceptions.

Duration: 30 min

### 8.1 — The five joins, drawn

```
   INNER JOIN              LEFT JOIN              RIGHT JOIN
   (intersection)          (all left + match)     (all right + match)

      A     B                  A     B                A     B
     ###   ###                ###   ###              ###   ###
    #####=####               ####=####              ####=####
     ###   ###                ###                          ###
                                                            
   FULL OUTER JOIN          CROSS JOIN
   (everything)             (every A x every B)

      A     B                  A     B
     ###   ###                ### x ###
    #####=####                = all pairs
     ###   ###                
```

MySQL does not have a native `FULL OUTER JOIN` — Step 8.5 shows the standard `UNION` workaround.

### 8.2 — INNER JOIN: matching rows from both sides

```sql
-- Each order with the buyer's name (matches on both sides only)
SELECT
    o.order_id,
    o.order_date,
    c.full_name
FROM orders   AS o
INNER JOIN customers AS c
       ON c.customer_id = o.customer_id
ORDER BY o.order_id
LIMIT 5;
```

**Expected output:**

```
+----------+------------+----------------+
| order_id | order_date | full_name      |
+----------+------------+----------------+
|        1 | 2026-01-03 | Asha Sharma    |
|        2 | 2026-01-04 | Kavya Iyer     |
|        3 | 2026-01-05 | Anjali Desai   |
|        4 | 2026-01-06 | Priya Patel    |
|        5 | 2026-01-07 | Ravi Kumar     |
+----------+------------+----------------+
```

### 8.3 — LEFT JOIN: keep every left row

```sql
-- Every customer + their order count (zero if they never bought)
SELECT
    c.customer_id,
    c.full_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
       ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.full_name
ORDER BY order_count, c.customer_id
LIMIT 5;
```

**Expected output:**

```
+-------------+----------------+-------------+
| customer_id | full_name      | order_count |
+-------------+----------------+-------------+
|          23 | Ritu Agarwal   |           0 |
|          29 | Ravi Kumar     |           0 |
|           1 | Asha Sharma    |           5 |
|           2 | Ravi Kumar     |           3 |
|           3 | Priya Patel    |           4 |
+-------------+----------------+-------------+
```

🚀 **Pro Insight:** `COUNT(o.order_id)` is the safe pattern, not `COUNT(*)`. With `COUNT(*)` a customer with zero orders still produces a row from the LEFT JOIN — and `COUNT(*)` would count that as 1. Pick a column from the *right* side for the count.

### 8.4 — RIGHT JOIN: keep every right row

```sql
-- Every order with customer name; if a customer is missing, still show the order
SELECT
    c.full_name,
    o.order_id,
    o.order_date
FROM customers AS c
RIGHT JOIN orders AS o
       ON c.customer_id = o.customer_id
ORDER BY o.order_id
LIMIT 5;
```

`RIGHT JOIN` is rarely needed in production — flip the table order and use `LEFT JOIN`. It reads more naturally.

### 8.5 — FULL OUTER JOIN via UNION

```sql
-- Customers with no orders + orders with no matching customer
SELECT
    c.customer_id,
    c.full_name,
    o.order_id
FROM customers AS c
LEFT JOIN orders AS o
       ON o.customer_id = c.customer_id

UNION

SELECT
    c.customer_id,
    c.full_name,
    o.order_id
FROM customers AS c
RIGHT JOIN orders AS o
       ON o.customer_id = c.customer_id

ORDER BY customer_id, order_id;
```

`UNION` deduplicates the merged rows. Use `UNION ALL` if you want duplicates kept (faster — no dedup pass).

### 8.6 — Three-table join (the daily-bread query)

```sql
-- Order line detail with customer and product names
SELECT
    o.order_id,
    o.order_date,
    c.full_name      AS customer,
    p.product_name,
    oi.quantity,
    oi.line_amount
FROM order_items AS oi
JOIN orders    AS o ON o.order_id    = oi.order_id
JOIN customers AS c ON c.customer_id = o.customer_id
JOIN products  AS p ON p.product_id  = oi.product_id
WHERE o.order_date = '2026-01-03'
ORDER BY oi.order_item_id;
```

**Expected output:**

```
+----------+------------+--------------+-----------------+----------+-------------+
| order_id | order_date | customer     | product_name    | quantity | line_amount |
+----------+------------+--------------+-----------------+----------+-------------+
|        1 | 2026-01-03 | Asha Sharma  | Laptop Pro 14   |        1 |    89999.00 |
|        1 | 2026-01-03 | Asha Sharma  | Wireless Mouse  |        1 |     1299.00 |
|        1 | 2026-01-03 | Asha Sharma  | USB-C Hub       |        2 |     4998.00 |
+----------+------------+--------------+-----------------+----------+-------------+
```

### 8.7 — The cardinality bug

If you forget the join condition, MySQL gives you a *cross join* — every row in A paired with every row in B. With 100 orders and 30 customers, that's 3,000 rows of nonsense. Always include `ON` clauses, and always sanity-check row counts.

```sql
-- Sanity check: rows in JOIN = rows in driving table
SELECT COUNT(*) AS driver_rows FROM order_items;
SELECT COUNT(*) AS join_rows
FROM order_items AS oi
JOIN orders   AS o ON o.order_id = oi.order_id;
-- Both should return 182.
```

### ✅ Checkpoint

You can now:

- [ ] Draw `INNER`, `LEFT`, `RIGHT`, `FULL OUTER`, and `CROSS` joins on paper
- [ ] Pick the correct join for "all customers, even those who never bought"
- [ ] Simulate `FULL OUTER` in MySQL using `LEFT … UNION … RIGHT`
- [ ] Spot a runaway cross join by comparing row counts before and after

---

## Step 9: Subqueries — scalar, correlated, IN, EXISTS

> *"I've failed over and over and over again in my life. And that is why I succeed."*
> — Michael Jordan
>
> 💡 **HitaVir Tech connection:** Subqueries bend your mind on the first read. You will write a wrong one, then a slow one, then a clean one — that arc is the whole skill.
> 🎯 **Why this matters now:** Run every example below twice. The second time, change one thing and predict the new output before you press Run.

Duration: 20 min

### 9.1 — Scalar subquery (returns one value)

```sql
-- Customers whose signup date is the latest in the table
SELECT
    customer_id,
    full_name,
    signup_date
FROM customers
WHERE signup_date = (SELECT MAX(signup_date) FROM customers);
```

**Expected output:**

```
+-------------+-----------+-------------+
| customer_id | full_name | signup_date |
+-------------+-----------+-------------+
|          30 | Tara Bhat | 2025-12-18  |
+-------------+-----------+-------------+
```

### 9.2 — IN subquery (returns a list)

```sql
-- Customers who placed at least one CANCELLED order
SELECT
    customer_id,
    full_name
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE status = 'CANCELLED'
)
ORDER BY customer_id;
```

**Expected output:**

```
+-------------+----------------+
| customer_id | full_name      |
+-------------+----------------+
|           9 | Anjali Desai   |
|          14 | Rahul Joshi    |
|          24 | Vinay Kulkarni |
+-------------+----------------+
```

### 9.3 — EXISTS subquery (returns true/false per row)

```sql
-- Same answer as 9.2 but using EXISTS
SELECT
    c.customer_id,
    c.full_name
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
      AND o.status = 'CANCELLED'
)
ORDER BY c.customer_id;
```

💡 **HitaVir Tech Tip:** `EXISTS` short-circuits — it stops scanning as soon as it finds the first match. For "does any matching row exist?" use `EXISTS`. For "is this value in this list?" use `IN`.

### 9.4 — Correlated subquery (refers to outer row)

```sql
-- Each customer's most recent order date
SELECT
    c.customer_id,
    c.full_name,
    (SELECT MAX(o.order_date)
     FROM orders AS o
     WHERE o.customer_id = c.customer_id) AS last_order_date
FROM customers AS c
ORDER BY last_order_date DESC
LIMIT 5;
```

**Expected output:**

```
+-------------+----------------+-----------------+
| customer_id | full_name      | last_order_date |
+-------------+----------------+-----------------+
|          19 | Lakshmi Menon  | 2026-04-14      |
|           1 | Asha Sharma    | 2026-04-12      |
|           3 | Priya Patel    | 2026-04-11      |
|          18 | Suresh Iyengar | 2026-04-10      |
|          22 | Deepak Nair    | 2026-04-09      |
+-------------+----------------+-----------------+
```

🚀 **Pro Insight:** Correlated subqueries can be slow — the inner query runs once *per outer row*. For tables in the millions, rewrite as a `JOIN ... GROUP BY` or a window function (Step 12). EXPLAIN will tell you which is cheaper.

### 9.5 — Subquery in FROM (a "derived table")

```sql
-- Top 3 cities by customer count
SELECT
    city,
    customer_count
FROM (
    SELECT
        city,
        COUNT(*) AS customer_count
    FROM customers
    WHERE city IS NOT NULL
    GROUP BY city
) AS city_counts
ORDER BY customer_count DESC
LIMIT 3;
```

**Expected output:**

```
+-----------+----------------+
| city      | customer_count |
+-----------+----------------+
| Bengaluru |              4 |
| Chennai   |              4 |
| Kochi     |              3 |
+-----------+----------------+
```

### ✅ Checkpoint

You can now:

- [ ] Pick a scalar subquery for "compare against one value"
- [ ] Pick `IN` for "value matches any in a list"
- [ ] Pick `EXISTS` for "any matching row exists"
- [ ] Spot a correlated subquery and reason about its cost
- [ ] Use a derived table (subquery in `FROM`) when an aggregate must feed another query

---

## Step 10: Views, indexes (intro), temporary tables

> *"Data is a precious thing and will last longer than the systems themselves."*
> — Tim Berners-Lee
>
> 💡 **HitaVir Tech connection:** Views, indexes, and temp tables are how you preserve query intent and performance against a schema that will outlive every line of application code touching it today.
> 🎯 **Why this matters now:** Every artifact you create here should have a name a teammate can read in 6 months. No `tmp1`, no `view_v2_final_FINAL`.

Duration: 20 min

### 10.1 — A VIEW: a saved query that looks like a table

```sql
-- Reusable: every "delivered order line" with customer and product
CREATE OR REPLACE VIEW v_delivered_order_lines AS
SELECT
    o.order_id,
    o.order_date,
    c.customer_id,
    c.full_name      AS customer,
    p.product_id,
    p.product_name,
    p.category,
    oi.quantity,
    oi.line_amount
FROM order_items AS oi
JOIN orders    AS o ON o.order_id    = oi.order_id
JOIN customers AS c ON c.customer_id = o.customer_id
JOIN products  AS p ON p.product_id  = oi.product_id
WHERE o.status = 'DELIVERED';

-- Now query it like a table
SELECT
    category,
    SUM(line_amount) AS revenue
FROM v_delivered_order_lines
GROUP BY category
ORDER BY revenue DESC;
```

**Expected output (categories ranked by revenue):**

```
+-------------+------------+
| category    | revenue    |
+-------------+------------+
| Electronics | 1483158.00 |
| Furniture   |  118989.00 |
| Footwear    |   45487.00 |
| Apparel     |   45371.00 |
| Home        |   24571.00 |
| Fitness     |   25586.00 |
| Stationery  |    8197.00 |
+-------------+------------+
```

💡 **HitaVir Tech Tip:** Views are a contract: downstream queries name *the view*, not the underlying tables. When the schema changes, you fix the view in one place — every consumer keeps working.

### 10.2 — A TEMPORARY TABLE: scratch space for one session

```sql
-- A temp table lives only for this connection
CREATE TEMPORARY TABLE tmp_top_customers AS
SELECT
    customer_id,
    SUM(line_amount) AS total_spent
FROM v_delivered_order_lines
GROUP BY customer_id
ORDER BY total_spent DESC
LIMIT 5;

SELECT
    t.customer_id,
    c.full_name,
    t.total_spent
FROM tmp_top_customers AS t
JOIN customers AS c ON c.customer_id = t.customer_id
ORDER BY t.total_spent DESC;
```

**Expected output:**

```
+-------------+----------------+-------------+
| customer_id | full_name      | total_spent |
+-------------+----------------+-------------+
|           1 | Asha Sharma    |   299588.00 |
|           4 | Arjun Reddy    |   198494.00 |
|           3 | Priya Patel    |   188795.00 |
|          18 | Suresh Iyengar |   188394.00 |
|          22 | Deepak Nair    |   116386.00 |
+-------------+----------------+-------------+
```

When you close the connection, MySQL drops the temp table automatically. Reset earlier with `DROP TEMPORARY TABLE tmp_top_customers;`.

### 10.3 — An INDEX: faster lookups (intro — Step 13 goes deeper)

```sql
-- Index orders by date so date-range queries can skip the full scan
CREATE INDEX idx_orders_order_date ON orders(order_date);

-- Confirm the index exists
SHOW INDEXES FROM orders;
```

You will see `idx_orders_order_date` listed alongside the auto-created `PRIMARY` index. Step 13 measures the speedup with `EXPLAIN`.

🚀 **Pro Insight:** Every index you add speeds up reads but slows down writes (`INSERT`, `UPDATE`, `DELETE`) because MySQL has to maintain the index too. In OLTP systems, *indexes pay for themselves*. In write-heavy staging tables, an extra index can double load time. Pick deliberately.

### ✅ Checkpoint

You can now:

- [ ] Create a view that hides a complex join
- [ ] Use a temporary table as scratch space inside a session
- [ ] Create a simple non-unique index
- [ ] State the read/write trade-off of every index

---

## Step 11: Cleaning — NULLs, strings, dates, standardization

> *"Excellence is not a singular act, but a habit. You are what you repeatedly do."*
> — Aristotle (commonly paraphrased)
>
> 💡 **HitaVir Tech connection:** Real data is always dirty. Cleaning is not a one-time event — it is a habit baked into every load.
> 🎯 **Why this matters now:** Every cleaning rule below should land in your pipeline as a reusable view or stored function, not a one-off script.

Duration: 25 min

### 11.1 — Find the dirty rows

```sql
-- Customers with at least one quality issue
SELECT
    customer_id,
    full_name,
    email,
    city
FROM customers
WHERE email IS NULL
   OR city  IS NULL
   OR email <> LOWER(email)              -- mixed-case email
   OR city  IN ('bengaluru', 'BLR')      -- bad city spelling
ORDER BY customer_id;
```

**Expected output:**

```
+-------------+-----------------+------------------------------+-----------+
| customer_id | full_name       | email                        | city      |
+-------------+-----------------+------------------------------+-----------+
|           2 | Ravi Kumar      | ravi.kumar@example.com       | bengaluru |
|          11 | Meera Rao       | meera.rao@example.com        | BLR       |
|          14 | Rahul Joshi     | rahul.joshi@example.com      | NULL      |
|          18 | Suresh Iyengar  | Suresh.IYENGAR@Example.COM   | Bengaluru |
|          23 | Ritu Agarwal    | NULL                         | Delhi     |
|          26 | Sanjay Murthy   | sanjay.murthy@example.com    | bengaluru |
+-------------+-----------------+------------------------------+-----------+
```

### 11.2 — NULL handling: COALESCE and IFNULL

```sql
-- Show 'unknown' instead of NULL for missing cities or emails
SELECT
    customer_id,
    full_name,
    COALESCE(email, 'unknown@example.com') AS email,
    COALESCE(city,  'Unknown')             AS city
FROM customers
WHERE customer_id IN (14, 23);
```

**Expected output:**

```
+-------------+--------------+-------------------------+---------+
| customer_id | full_name    | email                   | city    |
+-------------+--------------+-------------------------+---------+
|          14 | Rahul Joshi  | rahul.joshi@example.com | Unknown |
|          23 | Ritu Agarwal | unknown@example.com     | Delhi   |
+-------------+--------------+-------------------------+---------+
```

`COALESCE(a, b, c, ...)` returns the first non-NULL argument. `IFNULL(a, b)` is a 2-argument shortcut.

### 11.3 — String standardization

```sql
-- Normalize emails (trim + lowercase) and cities
SELECT
    customer_id,
    LOWER(TRIM(email))                                        AS email_clean,
    CASE
        WHEN UPPER(TRIM(city)) IN ('BENGALURU','BLR','BANGALORE') THEN 'Bengaluru'
        WHEN UPPER(TRIM(city)) = 'MUMBAI'                          THEN 'Mumbai'
        ELSE INITCAP_FALLBACK(city)
    END AS city_clean
FROM customers
WHERE customer_id IN (2, 11, 18, 26)
ORDER BY customer_id;
```

MySQL has no built-in `INITCAP`. Replace it with a hand-rolled `CONCAT(UPPER(SUBSTRING(city,1,1)), LOWER(SUBSTRING(city,2)))`:

```sql
SELECT
    customer_id,
    LOWER(TRIM(email)) AS email_clean,
    CASE
        WHEN UPPER(TRIM(city)) IN ('BENGALURU','BLR','BANGALORE') THEN 'Bengaluru'
        ELSE CONCAT(
                UPPER(SUBSTRING(TRIM(city), 1, 1)),
                LOWER(SUBSTRING(TRIM(city), 2))
             )
    END AS city_clean
FROM customers
WHERE customer_id IN (2, 11, 18, 26)
ORDER BY customer_id;
```

**Expected output:**

```
+-------------+-----------------------------+------------+
| customer_id | email_clean                 | city_clean |
+-------------+-----------------------------+------------+
|           2 | ravi.kumar@example.com      | Bengaluru  |
|          11 | meera.rao@example.com       | Bengaluru  |
|          18 | suresh.iyengar@example.com  | Bengaluru  |
|          26 | sanjay.murthy@example.com   | Bengaluru  |
+-------------+-----------------------------+------------+
```

### 11.4 — Deduplication

```sql
-- Find rows that share full_name (potential duplicates)
SELECT
    full_name,
    COUNT(*)                       AS occurrences,
    GROUP_CONCAT(customer_id)      AS customer_ids
FROM customers
GROUP BY full_name
HAVING COUNT(*) > 1;
```

**Expected output:**

```
+------------+-------------+--------------+
| full_name  | occurrences | customer_ids |
+------------+-------------+--------------+
| Ravi Kumar |           2 | 2,29         |
+------------+-------------+--------------+
```

Picking which row to keep usually requires more than name alone — match on `(LOWER(TRIM(email)))` or business keys. Step 14's capstone shows the production pattern.

### 11.5 — Date parsing

```sql
-- Extract pieces of a date for grouping
SELECT
    YEAR(order_date)   AS yr,
    MONTH(order_date)  AS mo,
    COUNT(*)           AS orders_in_month
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY yr, mo;
```

**Expected output:**

```
+------+----+-----------------+
| yr   | mo | orders_in_month |
+------+----+-----------------+
| 2026 |  1 |              27 |
| 2026 |  2 |              28 |
| 2026 |  3 |              31 |
| 2026 |  4 |              14 |
+------+----+-----------------+
```

💡 **HitaVir Tech Tip:** Wrapping `order_date` in `YEAR()` or `MONTH()` makes the column non-sargable — any index on `order_date` cannot help. For range queries, prefer `WHERE order_date >= '2026-02-01' AND order_date < '2026-03-01'` over `WHERE MONTH(order_date) = 2`.

### ✅ Checkpoint

You can now:

- [ ] Find rows with NULLs and replace with `COALESCE`
- [ ] Standardize strings with `LOWER`, `UPPER`, `TRIM`, `SUBSTRING`, `CONCAT`
- [ ] Detect duplicates with `GROUP BY ... HAVING COUNT(*) > 1`
- [ ] Pull `YEAR`, `MONTH`, `DAY` from a `DATE` column
- [ ] Identify when a function on a column makes a query non-sargable

---

## Step 12: Window functions, CTEs, and recursive CTEs

> *"It's the unknown we fear when we look upon death and darkness, nothing more."*
> — Albus Dumbledore
>
> 💡 **HitaVir Tech connection:** Window functions and recursive CTEs feel like dark magic — until you write three of each. After that they are the most expressive tools in your kit.
> 🎯 **Why this matters now:** Read every example below twice. The unknown becomes obvious only on the second pass.

Duration: 35 min

### 12.1 — Window functions: aggregate without collapsing rows

```sql
-- Each delivered line + the customer's running total in date order
SELECT
    o.order_date,
    c.full_name,
    oi.line_amount,
    SUM(oi.line_amount) OVER (
        PARTITION BY c.customer_id
        ORDER BY o.order_date, o.order_id
    ) AS running_total
FROM order_items AS oi
JOIN orders    AS o ON o.order_id    = oi.order_id
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE c.customer_id = 1
ORDER BY o.order_date, o.order_id;
```

**Expected output (first 5 rows):**

```
+------------+--------------+-------------+---------------+
| order_date | full_name    | line_amount | running_total |
+------------+--------------+-------------+---------------+
| 2026-01-03 | Asha Sharma  |    89999.00 |      89999.00 |
| 2026-01-03 | Asha Sharma  |     1299.00 |      91298.00 |
| 2026-01-03 | Asha Sharma  |     4998.00 |      96296.00 |
| 2026-01-10 | Asha Sharma  |    89999.00 |     186295.00 |
| 2026-01-10 | Asha Sharma  |     2499.00 |     188794.00 |
+------------+--------------+-------------+---------------+
```

`PARTITION BY c.customer_id` resets the window per customer; `ORDER BY` controls the running-sum order.

### 12.2 — Ranking functions

```sql
-- Rank products by revenue inside each category
SELECT
    p.category,
    p.product_name,
    SUM(oi.line_amount)                                         AS revenue,
    RANK() OVER (PARTITION BY p.category ORDER BY SUM(oi.line_amount) DESC) AS revenue_rank
FROM order_items AS oi
JOIN orders   AS o ON o.order_id   = oi.order_id
JOIN products AS p ON p.product_id = oi.product_id
WHERE o.status = 'DELIVERED'
GROUP BY p.category, p.product_name
ORDER BY p.category, revenue_rank;
```

**Expected output (sample):**

```
+-------------+---------------------+------------+--------------+
| category    | product_name        | revenue    | revenue_rank |
+-------------+---------------------+------------+--------------+
| Apparel     | Denim Jeans         |   30583.00 |            1 |
| Apparel     | Cotton T-Shirt      |   14788.00 |            2 |
| Electronics | Laptop Pro 14       | 1259986.00 |            1 |
| Electronics | Mechanical Keyboard |   54989.00 |            2 |
| Electronics | USB-C Hub           |   24990.00 |            3 |
| Electronics | Wireless Mouse      |   13287.00 |            4 |
+-------------+---------------------+------------+--------------+
```

`ROW_NUMBER()` gives unique sequential numbers, `RANK()` gives ties the same rank with gaps (1, 1, 3), `DENSE_RANK()` no gaps (1, 1, 2).

### 12.3 — LAG and LEAD: peek at previous / next rows

```sql
-- Day-over-day change in delivered revenue
WITH daily_revenue AS (
    SELECT
        o.order_date,
        SUM(oi.line_amount) AS revenue
    FROM orders     AS o
    JOIN order_items AS oi ON oi.order_id = o.order_id
    WHERE o.status = 'DELIVERED'
    GROUP BY o.order_date
)
SELECT
    order_date,
    revenue,
    LAG(revenue) OVER (ORDER BY order_date) AS prev_day_revenue,
    revenue - LAG(revenue) OVER (ORDER BY order_date) AS day_over_day_change
FROM daily_revenue
ORDER BY order_date
LIMIT 5;
```

**Expected output:**

```
+------------+-----------+------------------+---------------------+
| order_date | revenue   | prev_day_revenue | day_over_day_change |
+------------+-----------+------------------+---------------------+
| 2026-01-03 |  96296.00 |             NULL |                NULL |
| 2026-01-04 |   3596.00 |         96296.00 |           -92700.00 |
| 2026-01-05 |   6892.00 |          3596.00 |             3296.00 |
| 2026-01-06 |  15997.00 |          6892.00 |             9105.00 |
| 2026-01-08 |   5942.00 |         15997.00 |           -10055.00 |
+------------+-----------+------------------+---------------------+
```

### 12.4 — CTE: name a subquery, read top-down

```sql
-- Top customers' share of total revenue
WITH delivered AS (
    SELECT
        o.customer_id,
        SUM(oi.line_amount) AS revenue
    FROM orders     AS o
    JOIN order_items AS oi ON oi.order_id = o.order_id
    WHERE o.status = 'DELIVERED'
    GROUP BY o.customer_id
),
totals AS (
    SELECT SUM(revenue) AS company_revenue FROM delivered
)
SELECT
    d.customer_id,
    c.full_name,
    d.revenue,
    ROUND(100.0 * d.revenue / t.company_revenue, 2) AS pct_of_total
FROM delivered AS d
CROSS JOIN totals AS t
JOIN customers AS c ON c.customer_id = d.customer_id
ORDER BY d.revenue DESC
LIMIT 5;
```

**Expected output:**

```
+-------------+----------------+-------------+--------------+
| customer_id | full_name      | revenue     | pct_of_total |
+-------------+----------------+-------------+--------------+
|           1 | Asha Sharma    |   299588.00 |        16.95 |
|           4 | Arjun Reddy    |   198494.00 |        11.23 |
|           3 | Priya Patel    |   188795.00 |        10.68 |
|          18 | Suresh Iyengar |   188394.00 |        10.65 |
|          22 | Deepak Nair    |   116386.00 |         6.59 |
+-------------+----------------+-------------+--------------+
```

### 12.5 — Recursive CTE: hierarchies, sequences, gap-filling

```sql
-- Generate every date in Q1 2026 (gap-filling for reports)
WITH RECURSIVE date_series AS (
    SELECT DATE '2026-01-01' AS d
    UNION ALL
    SELECT d + INTERVAL 1 DAY
    FROM date_series
    WHERE d + INTERVAL 1 DAY <= '2026-03-31'
)
SELECT
    d.d AS report_date,
    COALESCE(SUM(oi.line_amount), 0) AS revenue
FROM date_series AS d
LEFT JOIN orders     AS o ON o.order_date = d.d AND o.status = 'DELIVERED'
LEFT JOIN order_items AS oi ON oi.order_id = o.order_id
GROUP BY d.d
ORDER BY d.d
LIMIT 5;
```

**Expected output:**

```
+-------------+----------+
| report_date | revenue  |
+-------------+----------+
| 2026-01-01  |     0.00 |
| 2026-01-02  |     0.00 |
| 2026-01-03  | 96296.00 |
| 2026-01-04  |  3596.00 |
| 2026-01-05  |  6892.00 |
+-------------+----------+
```

🚀 **Pro Insight:** Recursive CTEs are how you flatten an org chart, walk a parts-of-a-product BOM, or build a calendar dimension. MySQL caps recursion at 1000 levels by default — raise with `SET cte_max_recursion_depth = 10000;` if you need more.

### ✅ Checkpoint

You can now:

- [ ] Use `SUM() OVER (PARTITION BY … ORDER BY …)` for running totals
- [ ] Pick `ROW_NUMBER` vs `RANK` vs `DENSE_RANK` correctly
- [ ] Use `LAG` / `LEAD` for period-over-period deltas
- [ ] Stack multiple CTEs with commas in a single `WITH` statement
- [ ] Generate a date series with a recursive CTE

---

## Step 13: Optimization — EXPLAIN and indexing

> *"Premature optimization is the root of all evil."*
> — Donald Knuth
>
> 💡 **HitaVir Tech connection:** Optimization is the *third* step of "make it work, make it right, make it fast" — and it only pays off when you measure. Knuth's quote is permission to ignore performance until your slow query is *proven* slow.
> 🎯 **Why this matters now:** Every optimization claim below must be backed by an EXPLAIN. No guesses, no folklore.

Duration: 25 min

### 13.1 — Reading EXPLAIN

```sql
EXPLAIN
SELECT
    customer_id,
    COUNT(*) AS order_count
FROM orders
WHERE order_date >= '2026-03-01'
  AND order_date <  '2026-04-01'
GROUP BY customer_id;
```

**Expected output (illustrative):**

```
+----+-------------+--------+------+--------------------------+--------------------------+---------+------+------+----------------------------+
| id | select_type | table  | type | possible_keys            | key                      | key_len | ref  | rows | Extra                      |
+----+-------------+--------+------+--------------------------+--------------------------+---------+------+------+----------------------------+
|  1 | SIMPLE      | orders | range| idx_orders_order_date    | idx_orders_order_date    | 4       | NULL |   31 | Using where; Using temporary; Using filesort |
+----+-------------+--------+------+--------------------------+--------------------------+---------+------+------+----------------------------+
```

Key columns:

| Column         | What it tells you                                                       |
|----------------|-------------------------------------------------------------------------|
| `type`         | Access path. `ALL` = full table scan (bad), `range` / `ref` = index used |
| `key`          | Which index MySQL picked (or `NULL` if none)                            |
| `rows`         | Estimated rows it will examine                                          |
| `Extra`        | `Using index` = covering index (great), `Using filesort` = extra sort   |

### 13.2 — Before / after: adding the right index

Drop the index from Step 10.3 first to start clean:

```sql
DROP INDEX idx_orders_order_date ON orders;

-- BEFORE: range scan with no index
EXPLAIN
SELECT
    order_id,
    order_date,
    status
FROM orders
WHERE order_date >= '2026-03-01'
  AND order_date <  '2026-04-01';
```

You will see `type = ALL` and `rows = ~100` — MySQL scans the entire table.

```sql
-- Add the index
CREATE INDEX idx_orders_order_date ON orders(order_date);

-- AFTER: range scan using the index
EXPLAIN
SELECT
    order_id,
    order_date,
    status
FROM orders
WHERE order_date >= '2026-03-01'
  AND order_date <  '2026-04-01';
```

Now `type = range` and `rows ≈ 31`. With 100 rows the difference is invisible to the eye; with 100 million rows it is the difference between 5 ms and 5 minutes.

### 13.3 — Composite indexes: order matters

If your query filters on `(customer_id, order_date)`, an index on `(customer_id, order_date)` works. An index on `(order_date, customer_id)` only helps queries that filter on `order_date` first. Pick the column with the highest selectivity (most distinct values) as the leading column.

```sql
CREATE INDEX idx_orders_cust_date ON orders(customer_id, order_date);
```

### 13.4 — Covering indexes

If an index contains every column the query needs, MySQL can answer from the index alone (`Extra: Using index`) — no table read at all.

```sql
-- This query is "covered" by idx_orders_cust_date because both columns are in it
EXPLAIN
SELECT customer_id, order_date
FROM orders
WHERE customer_id = 1
ORDER BY order_date;
```

### 13.5 — When indexes hurt

- Write-heavy tables — every `INSERT` updates every index
- Low-selectivity columns — indexing `status` (5 values) is rarely worth it
- Wrapping the column in a function — `WHERE YEAR(order_date) = 2026` ignores the index on `order_date`

🚀 **Pro Insight:** "I added an index and the query is still slow" is almost always (a) the optimizer chose a different index, (b) statistics are stale (`ANALYZE TABLE orders;`), or (c) the function around the column made it non-sargable. EXPLAIN tells you which.

### ✅ Checkpoint

You can now:

- [ ] Read `EXPLAIN` and identify `type`, `key`, `rows`, `Extra`
- [ ] Show a before/after EXPLAIN that proves an index helped
- [ ] Pick the leading column of a composite index by selectivity
- [ ] Recognize a covering index from `Extra: Using index`
- [ ] Name three situations where adding an index makes performance worse

---

## Step 14: Capstone — End-to-end sales reporting pipeline

> *"Don't think. Just do."*
> — Maverick, *Top Gun: Maverick* (paraphrased)
>
> 💡 **HitaVir Tech connection:** The capstone is one continuous run from raw → star schema → daily summary → indexed performance. Stop debating, start running. Ship the pipeline first, refine the SQL second.
> 🎯 **Why this matters now:** This step is the portfolio piece you show in interviews. Type every line, run every query, save the final SQL to a file.

Duration: 40 min

The scenario: HitaVir Tech needs a daily sales report. You will (1) stage extra raw data, (2) clean it, (3) build a star schema, (4) compare to snowflake, (5) materialize a `daily_sales_summary`, (6) add a window-function running total, (7) tune with EXPLAIN.

### 14.1 — Stage extra raw data (deliberately dirty)

```sql
CREATE TABLE stg_orders_raw (
    raw_order_id   VARCHAR(20),
    raw_customer   VARCHAR(150),
    raw_email      VARCHAR(200),
    raw_city       VARCHAR(100),
    raw_product    VARCHAR(150),
    raw_qty        VARCHAR(10),
    raw_amount     VARCHAR(20),
    raw_order_dt   VARCHAR(20),
    raw_status     VARCHAR(30)
);

INSERT INTO stg_orders_raw VALUES
('R-1001','asha sharma',   'ASHA.SHARMA@example.COM',   'BLR',       'Laptop Pro 14',     '1',  '89999.00','2026-04-15','delivered'),
('R-1002','Ravi  Kumar',   'ravi.kumar@example.com',    'bengaluru', 'Wireless Mouse',    '2',  '2598.00', '2026-04-15','Delivered'),
('R-1003','Priya Patel',   ' priya.patel@example.com ', 'Mumbai',    'Mechanical Keyboard','1', '4999.00', '2026-04-16','DELIVERED '),
('R-1004','arjun reddy',   'arjun.reddy@example.com',   'Hyderabad', 'Office Chair',      '1',  '12999.00','2026-04-16','DELIVERED'),
('R-1005','Kavya Iyer',    'kavya.iyer@EXAMPLE.com',    'CHENNAI',   'Running Shoes',     '2',  '6998.00', '2026-04-17','delivered'),
('R-1006','',              NULL,                        'Mumbai',    'USB-C Hub',         '3',  '7497.00', '2026-04-17','DELIVERED');
```

### 14.2 — Cleaning + standardization

```sql
-- View that returns a clean, typed version of staging
CREATE OR REPLACE VIEW v_stg_orders_clean AS
SELECT
    raw_order_id                                                AS raw_order_id,
    NULLIF(TRIM(raw_customer), '')                              AS customer_name_clean,
    LOWER(TRIM(raw_email))                                      AS email_clean,
    CASE
        WHEN UPPER(TRIM(raw_city)) IN ('BENGALURU','BLR','BANGALORE') THEN 'Bengaluru'
        ELSE CONCAT(
                UPPER(SUBSTRING(TRIM(raw_city),1,1)),
                LOWER(SUBSTRING(TRIM(raw_city),2))
             )
    END                                                         AS city_clean,
    raw_product                                                 AS product_name,
    CAST(raw_qty    AS UNSIGNED)                                AS quantity,
    CAST(raw_amount AS DECIMAL(12,2))                           AS line_amount,
    CAST(raw_order_dt AS DATE)                                  AS order_date,
    UPPER(TRIM(raw_status))                                     AS status_clean
FROM stg_orders_raw
WHERE NULLIF(TRIM(raw_customer), '') IS NOT NULL;   -- drop the empty-name row
```

### 14.3 — Star schema: dimensions and fact

```sql
-- Dimensions
CREATE TABLE dim_customer (
    customer_sk   INT          PRIMARY KEY AUTO_INCREMENT,
    customer_id   INT          NOT NULL UNIQUE,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150),
    city          VARCHAR(80)
);

CREATE TABLE dim_product (
    product_sk    INT           PRIMARY KEY AUTO_INCREMENT,
    product_id    INT           NOT NULL UNIQUE,
    product_name  VARCHAR(120)  NOT NULL,
    category      VARCHAR(60)   NOT NULL,
    unit_price    DECIMAL(10,2) NOT NULL
);

-- Fact
CREATE TABLE fact_sales (
    sales_sk      BIGINT        PRIMARY KEY AUTO_INCREMENT,
    order_date    DATE          NOT NULL,
    customer_sk   INT           NOT NULL,
    product_sk    INT           NOT NULL,
    quantity      INT           NOT NULL,
    line_amount   DECIMAL(12,2) NOT NULL,
    CONSTRAINT fk_fact_customer FOREIGN KEY (customer_sk) REFERENCES dim_customer(customer_sk),
    CONSTRAINT fk_fact_product  FOREIGN KEY (product_sk)  REFERENCES dim_product(product_sk)
);
```

### 14.4 — Load dimensions and fact

```sql
-- Load dim_customer from cleaned customers
INSERT INTO dim_customer (customer_id, full_name, email, city)
SELECT
    customer_id,
    full_name,
    LOWER(TRIM(email)),
    CASE
        WHEN UPPER(TRIM(city)) IN ('BENGALURU','BLR','BANGALORE') THEN 'Bengaluru'
        ELSE CONCAT(
                UPPER(SUBSTRING(TRIM(city),1,1)),
                LOWER(SUBSTRING(TRIM(city),2))
             )
    END
FROM customers;

-- Load dim_product
INSERT INTO dim_product (product_id, product_name, category, unit_price)
SELECT
    product_id,
    product_name,
    category,
    unit_price
FROM products;

-- Load fact_sales from delivered orders
INSERT INTO fact_sales (order_date, customer_sk, product_sk, quantity, line_amount)
SELECT
    o.order_date,
    dc.customer_sk,
    dp.product_sk,
    oi.quantity,
    oi.line_amount
FROM orders       AS o
JOIN order_items  AS oi ON oi.order_id    = o.order_id
JOIN dim_customer AS dc ON dc.customer_id = o.customer_id
JOIN dim_product  AS dp ON dp.product_id  = oi.product_id
WHERE o.status = 'DELIVERED';
```

Confirm:

```sql
SELECT COUNT(*) AS fact_rows FROM fact_sales;
```

**Expected output:**

```
+-----------+
| fact_rows |
+-----------+
|       163 |
+-----------+
```

### 14.5 — Snowflake comparison (~150 words)

The schema you just built is a **star**: `fact_sales` joins directly to `dim_customer` and `dim_product`, each one hop away. Under a **snowflake**, `dim_product` would split further — its `category` column becomes its own dimension `dim_category`, joined from `dim_product` via a foreign key. The tables look like this:

```
        STAR                           SNOWFLAKE

   dim_customer                    dim_customer
        |                                |
        |                                |
        v                                v
   fact_sales <-- dim_product       fact_sales <-- dim_product --> dim_category
                                                       (category)    (category_name)
```

**Trade-off in one sentence:** snowflake saves storage and enforces normalization, but every analytical query pays an extra join — in OLAP that join cost almost always loses, which is why production warehouses default to star.

### 14.6 — Daily sales summary

```sql
CREATE TABLE daily_sales_summary (
    summary_date  DATE          PRIMARY KEY,
    order_count   INT           NOT NULL,
    units_sold    INT           NOT NULL,
    gross_revenue DECIMAL(14,2) NOT NULL
);

INSERT INTO daily_sales_summary (summary_date, order_count, units_sold, gross_revenue)
SELECT
    fs.order_date,
    COUNT(DISTINCT fs.customer_sk)  AS order_count,
    SUM(fs.quantity)                AS units_sold,
    SUM(fs.line_amount)             AS gross_revenue
FROM fact_sales AS fs
GROUP BY fs.order_date;

SELECT
    summary_date,
    order_count,
    units_sold,
    gross_revenue
FROM daily_sales_summary
ORDER BY summary_date
LIMIT 5;
```

**Expected output:**

```
+--------------+-------------+------------+---------------+
| summary_date | order_count | units_sold | gross_revenue |
+--------------+-------------+------------+---------------+
| 2026-01-03   |           1 |          4 |      96296.00 |
| 2026-01-04   |           1 |          4 |       3596.00 |
| 2026-01-05   |           1 |          8 |       6892.00 |
| 2026-01-06   |           1 |          3 |      15997.00 |
| 2026-01-08   |           1 |          8 |       5942.00 |
+--------------+-------------+------------+---------------+
```

### 14.7 — Window function: running revenue

```sql
SELECT
    summary_date,
    gross_revenue,
    SUM(gross_revenue) OVER (ORDER BY summary_date) AS revenue_to_date
FROM daily_sales_summary
ORDER BY summary_date
LIMIT 5;
```

**Expected output:**

```
+--------------+---------------+-----------------+
| summary_date | gross_revenue | revenue_to_date |
+--------------+---------------+-----------------+
| 2026-01-03   |      96296.00 |        96296.00 |
| 2026-01-04   |       3596.00 |        99892.00 |
| 2026-01-05   |       6892.00 |       106784.00 |
| 2026-01-06   |      15997.00 |       122781.00 |
| 2026-01-08   |       5942.00 |       128723.00 |
+--------------+---------------+-----------------+
```

### 14.8 — EXPLAIN before / after index

```sql
-- BEFORE
EXPLAIN
SELECT
    fs.order_date,
    SUM(fs.line_amount) AS revenue
FROM fact_sales AS fs
WHERE fs.order_date BETWEEN '2026-03-01' AND '2026-03-31'
GROUP BY fs.order_date;
-- type = ALL on fact_sales

CREATE INDEX idx_fact_sales_date ON fact_sales(order_date);

-- AFTER
EXPLAIN
SELECT
    fs.order_date,
    SUM(fs.line_amount) AS revenue
FROM fact_sales AS fs
WHERE fs.order_date BETWEEN '2026-03-01' AND '2026-03-31'
GROUP BY fs.order_date;
-- type = range, key = idx_fact_sales_date
```

**Commentary:** the `type` column drops from `ALL` (full scan) to `range` (index range scan). On 163 rows this is invisible; on 100M rows the same change is the difference between a 30-second dashboard query and a 30-minute one.

### ✅ Checkpoint

You can now:

- [ ] Stage dirty raw data and clean it through a view
- [ ] Build a star schema with one fact and two dimensions
- [ ] Explain the star vs snowflake trade-off in one sentence
- [ ] Materialize a `daily_sales_summary` table from the fact
- [ ] Add a running-total window function on top of the summary
- [ ] Show before/after EXPLAIN that proves the index helped

---

## Step 15: SQL best practices (consolidated)

> *"Simplicity is prerequisite for reliability."*
> — Edsger Dijkstra
>
> 💡 **HitaVir Tech connection:** A simple SQL convention applied everywhere outperforms a clever one applied somewhere. Reliability is the goal; simplicity is the path.
> 🎯 **Why this matters now:** Print this list. Tape it next to your monitor. Every PR you review for the rest of your career uses it as a checklist.

Duration: 10 min

### Naming
- `snake_case` for everything: tables, columns, indexes, views.
- Tables are plural (`customers`), columns are singular (`customer_id`).
- Foreign keys end in `_id`; surrogate keys end in `_sk`.
- Views start with `v_`, materialized summaries with no prefix, staging with `stg_`, fact with `fact_`, dimension with `dim_`.

### Style
- Uppercase SQL keywords, lowercase identifiers.
- One clause per line. One column per line in long `SELECT` lists.
- Always alias every table in a multi-table query. Always qualify columns.
- Indent two spaces inside CTEs and subqueries.

### Correctness
- Never `SELECT *` in code that ships.
- Never `UPDATE`/`DELETE` without a `WHERE` clause.
- Half-open date intervals: `>= start AND < end`.
- Use `DECIMAL` for money, never `FLOAT`.
- `is None`-style: `IS NULL` / `IS NOT NULL`, never `= NULL`.

### Performance
- Add indexes only after you have an EXPLAIN that proves you need one.
- Avoid functions on indexed columns in `WHERE`.
- Prefer `EXISTS` over `IN` for "any matching row" checks.
- Materialize expensive joins as views; materialize expensive views as tables only when refresh cost < query cost × frequency.

### Operations
- Wrap multi-statement DML in `START TRANSACTION` … `COMMIT`.
- Sanity-check row counts after every load.
- Every pipeline writes its own metrics: rows in, rows out, rows rejected.
- Every schema change ships with a migration file in version control.

🚀 **Pro Insight:** The teams that move fastest in production are the ones with the *strictest* style. Boring, predictable SQL is a feature, not a limitation — it makes every query a five-minute read instead of a thirty-minute investigation.

### ✅ Checkpoint

You can now:

- [ ] Recite the four naming prefixes (`stg_`, `dim_`, `fact_`, `v_`)
- [ ] Explain why `DECIMAL` beats `FLOAT` for money
- [ ] State the rule for adding a new index
- [ ] Justify wrapping multi-statement DML in a transaction

---

## Step 16: Debugging — common errors with fixes

> *"You don't have time to think up there. If you think, you're dead."*
> — Maverick, *Top Gun*
>
> 💡 **HitaVir Tech connection:** Debugging at 2 AM is no time to look up syntax. The errors below are the same ones you will hit for the rest of your career — recognize them on sight.
> 🎯 **Why this matters now:** Force the errors below on purpose, in your own console, today. Pattern recognition only sticks after you have caused the problem.

Duration: 15 min

### 16.1 — `Error 1054: Unknown column 'x'`

Caused by: typo, missing alias, or column dropped.

```sql
-- ❌
SELECT customer_name FROM customers;
-- ✅
SELECT full_name FROM customers;
```

### 16.2 — `Error 1064: SQL syntax error near …`

Caused by: missing comma, missing `FROM`, reserved word as column name, unclosed quote.

```sql
-- ❌  missing comma between columns
SELECT customer_id full_name FROM customers;
-- ✅
SELECT customer_id, full_name FROM customers;
```

### 16.3 — `Error 1452: Cannot add or update a child row: a foreign key constraint fails`

Caused by: inserting an `order` whose `customer_id` does not exist in `customers`.

Fix: insert the parent first, or use a deferred constraint.

### 16.4 — `Error 1062: Duplicate entry … for key 'PRIMARY'`

Caused by: inserting a row whose primary key already exists.

Fix: `INSERT IGNORE`, `INSERT … ON DUPLICATE KEY UPDATE`, or pick a new key.

### 16.5 — `Error 1093: You can't specify target table 'x' for update in FROM clause`

Caused by: an `UPDATE` whose `WHERE` reads the same table.

Fix: wrap the inner query in another subquery — MySQL will materialize it first.

```sql
UPDATE products
SET unit_price = unit_price * 1.05
WHERE product_id IN (
    SELECT product_id FROM (
        SELECT product_id FROM products WHERE category = 'Stationery'
    ) AS x
);
```

### 16.6 — `ONLY_FULL_GROUP_BY` complaints

Caused by: a `SELECT` column not in `GROUP BY` and not aggregated.

Fix: add it to `GROUP BY` or wrap it in `MAX()` / `MIN()` / `ANY_VALUE()` if you genuinely do not care which row's value comes back.

### 16.7 — Wrong join produces too many rows

Always sanity-check:

```sql
SELECT COUNT(*) FROM order_items;          -- driver
SELECT COUNT(*)
FROM order_items AS oi
JOIN orders AS o ON o.order_id = oi.order_id;
-- both must equal the driver count
```

If the second is bigger, your join key is non-unique on the right side.

### ✅ Checkpoint

You can now:

- [ ] Decode error codes 1054, 1064, 1062, 1093, 1452 on sight
- [ ] Fix the `UPDATE`-from-self pattern with a derived table
- [ ] Detect a join cardinality bug from row counts alone
- [ ] Explain `ONLY_FULL_GROUP_BY` to a teammate

---

## Step 17: Tool integration — Python, Airflow, Spark SQL, Databricks

> *"Talk is cheap. Show me the code."*
> — Linus Torvalds
>
> 💡 **HitaVir Tech connection:** SQL never lives alone. Every Data Engineering tool eventually wraps SQL — and the engineer who can read both layers ships features the rest cannot.
> 🎯 **Why this matters now:** Each snippet below is the smallest working version. Type it; do not just read it. The integration only sticks when your machine has actually executed it.

Duration: 15 min

### 17.1 — Python (`pymysql` + pandas)

```python
import pymysql
import pandas as pd

conn = pymysql.connect(
    host="localhost",
    user="root",
    password="your_password_here",
    database="hitavir_sales",
    charset="utf8mb4",
)

query = """
SELECT
    summary_date,
    gross_revenue
FROM daily_sales_summary
WHERE summary_date >= '2026-03-01'
ORDER BY summary_date
"""

df = pd.read_sql(query, conn)
conn.close()

print(df.head())
```

**Expected output (head of DataFrame):**

```
  summary_date  gross_revenue
0   2026-03-01      94997.00
1   2026-03-02       3597.00
2   2026-03-03       5097.00
3   2026-03-04      14498.00
4   2026-03-05       5395.00
```

💡 **HitaVir Tech Tip:** Never embed a password in source code. Read it from `os.environ["MYSQL_PASSWORD"]` and store it in `.env` (and `.gitignore` the `.env`).

### 17.2 — Airflow (`MySqlOperator`)

```python
from airflow import DAG
from airflow.providers.mysql.operators.mysql import MySqlOperator
from datetime import datetime

with DAG(
    dag_id="hitavir_daily_sales_summary",
    start_date=datetime(2026, 4, 1),
    schedule="0 2 * * *",     # every day at 02:00
    catchup=False,
) as dag:

    refresh_summary = MySqlOperator(
        task_id="refresh_daily_sales_summary",
        mysql_conn_id="hitavir_mysql",
        sql="""
            DELETE FROM daily_sales_summary
            WHERE summary_date = CURRENT_DATE - INTERVAL 1 DAY;

            INSERT INTO daily_sales_summary
                (summary_date, order_count, units_sold, gross_revenue)
            SELECT
                fs.order_date,
                COUNT(DISTINCT fs.customer_sk),
                SUM(fs.quantity),
                SUM(fs.line_amount)
            FROM fact_sales AS fs
            WHERE fs.order_date = CURRENT_DATE - INTERVAL 1 DAY
            GROUP BY fs.order_date;
        """,
    )
```

The DAG runs once per day, deletes yesterday's row from `daily_sales_summary` (idempotent re-runs), then re-inserts it.

### 17.3 — Spark SQL (`spark.read.jdbc`)

```python
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("hitavir_sales")
    .config("spark.jars", "/path/to/mysql-connector-j-8.x.x.jar")
    .getOrCreate()
)

df = (
    spark.read
    .format("jdbc")
    .option("url",      "jdbc:mysql://localhost:3306/hitavir_sales")
    .option("dbtable",  "fact_sales")
    .option("user",     "root")
    .option("password", "your_password_here")
    .load()
)

df.createOrReplaceTempView("fact_sales")

result = spark.sql("""
    SELECT
        order_date,
        SUM(line_amount) AS revenue
    FROM fact_sales
    WHERE order_date >= '2026-03-01'
    GROUP BY order_date
    ORDER BY order_date
""")

result.show(5)
```

### 17.4 — Databricks SQL (with Unity Catalog naming)

```sql
-- Run inside a Databricks SQL cell
SELECT
    order_date,
    SUM(line_amount) AS revenue
FROM hitavir_prod.sales.fact_sales        -- catalog.schema.table
WHERE order_date >= DATE '2026-03-01'
GROUP BY order_date
ORDER BY order_date;
```

The fully-qualified name is `catalog.schema.table` — under Unity Catalog, this lets you query across catalogs (e.g. `hitavir_dev.sales.fact_sales`) without changing client connections.

🚀 **Pro Insight:** Once your SQL is identical across MySQL, Spark, and Databricks, refactoring storage engines becomes a search-and-replace exercise. Lock in standard SQL early; reach for vendor-specific syntax only when the standard version cannot express the intent.

### ✅ Checkpoint

You can now:

- [ ] Read MySQL into a pandas DataFrame with `pymysql` + `pd.read_sql`
- [ ] Schedule a daily SQL job with `MySqlOperator` in Airflow
- [ ] Load a MySQL table into Spark and run SQL on it
- [ ] Read a three-part Databricks Unity Catalog table name

---

## Step 18: Five challenges (with inline solutions)

> *"The standard you walk past is the standard you accept."*
> — Lt. Gen. David Morrison
>
> 💡 **HitaVir Tech connection:** These five challenges are your standard. Every SQL hire at HitaVir Tech can solve all five in 30 minutes. Walk past one and you have lowered the bar.
> 🎯 **Why this matters now:** Solve each challenge yourself first. Open the solution only after you have a runnable answer — even a wrong one.

Duration: 25 min

### Challenge 1: Filtering + aggregation

**Scenario:** Marketing wants to know how many DELIVERED orders happened in March 2026, and the total revenue.
**Your task:** One query that returns `order_count` and `gross_revenue` for March 2026 deliveries only.
**Expected output shape:**

```
+-------------+---------------+
| order_count | gross_revenue |
+-------------+---------------+
|         <n> |          <₹>  |
+-------------+---------------+
```

<details>
<summary>💡 Show solution</summary>

```sql
SELECT
    COUNT(DISTINCT o.order_id)  AS order_count,
    SUM(oi.line_amount)         AS gross_revenue
FROM orders      AS o
JOIN order_items AS oi ON oi.order_id = o.order_id
WHERE o.status = 'DELIVERED'
  AND o.order_date >= '2026-03-01'
  AND o.order_date <  '2026-04-01';
```

```
+-------------+---------------+
| order_count | gross_revenue |
+-------------+---------------+
|          30 |     441480.00 |
+-------------+---------------+
```

**Why this works:** `COUNT(DISTINCT o.order_id)` is required because the join to `order_items` multiplies rows; without `DISTINCT` we would count line items, not orders. The half-open date range avoids month-boundary bugs.
</details>

---

### Challenge 2: Multi-table join with HAVING

**Scenario:** Find every customer who has spent more than ₹100,000 across all DELIVERED orders.
**Your task:** Return `customer_id`, `full_name`, `total_spent`, sorted descending.
**Expected output shape:**

```
+-------------+----------------+-------------+
| customer_id | full_name      | total_spent |
+-------------+----------------+-------------+
| ...                                       |
+-------------+----------------+-------------+
```

<details>
<summary>💡 Show solution</summary>

```sql
SELECT
    c.customer_id,
    c.full_name,
    SUM(oi.line_amount) AS total_spent
FROM customers   AS c
JOIN orders      AS o  ON o.customer_id  = c.customer_id
JOIN order_items AS oi ON oi.order_id    = o.order_id
WHERE o.status = 'DELIVERED'
GROUP BY c.customer_id, c.full_name
HAVING SUM(oi.line_amount) > 100000
ORDER BY total_spent DESC;
```

```
+-------------+----------------+-------------+
| customer_id | full_name      | total_spent |
+-------------+----------------+-------------+
|           1 | Asha Sharma    |   299588.00 |
|           4 | Arjun Reddy    |   198494.00 |
|           3 | Priya Patel    |   188795.00 |
|          18 | Suresh Iyengar |   188394.00 |
|          22 | Deepak Nair    |   116386.00 |
+-------------+----------------+-------------+
```

**Why this works:** `WHERE` filters individual rows (delivered orders); `HAVING` filters the *groups* after `SUM` is computed. Mixing them up is the most common bug in this pattern.
</details>

---

### Challenge 3: Correlated subquery OR window function

**Scenario:** For each customer, return their order with the highest line-amount total across the order's items.
**Your task:** Return `customer_id`, `full_name`, `top_order_id`, `top_order_total`.
**Expected output shape:**

```
+-------------+--------------+--------------+-----------------+
| customer_id | full_name    | top_order_id | top_order_total |
+-------------+--------------+--------------+-----------------+
| ...                                                       |
+-------------+--------------+--------------+-----------------+
```

<details>
<summary>💡 Show solution</summary>

```sql
WITH order_totals AS (
    SELECT
        o.order_id,
        o.customer_id,
        SUM(oi.line_amount) AS order_total
    FROM orders      AS o
    JOIN order_items AS oi ON oi.order_id = o.order_id
    GROUP BY o.order_id, o.customer_id
),
ranked AS (
    SELECT
        ot.customer_id,
        ot.order_id,
        ot.order_total,
        ROW_NUMBER() OVER (PARTITION BY ot.customer_id
                           ORDER BY ot.order_total DESC, ot.order_id) AS rn
    FROM order_totals AS ot
)
SELECT
    r.customer_id,
    c.full_name,
    r.order_id        AS top_order_id,
    r.order_total     AS top_order_total
FROM ranked       AS r
JOIN customers    AS c ON c.customer_id = r.customer_id
WHERE r.rn = 1
ORDER BY r.customer_id
LIMIT 5;
```

```
+-------------+----------------+--------------+-----------------+
| customer_id | full_name      | top_order_id | top_order_total |
+-------------+----------------+--------------+-----------------+
|           1 | Asha Sharma    |            1 |        96296.00 |
|           2 | Ravi Kumar     |           28 |         5097.00 |
|           3 | Priya Patel    |           71 |        94998.00 |
|           4 | Arjun Reddy    |           13 |        93498.00 |
|           5 | Kavya Iyer     |           24 |         8295.00 |
+-------------+----------------+--------------+-----------------+
```

**Why this works:** Compute order totals once in a CTE, rank them per customer with `ROW_NUMBER()`, then keep `rn = 1`. The `, ot.order_id` in the `ORDER BY` is the deterministic tiebreaker — without it, ties are non-deterministic.
</details>

---

### Challenge 4: Data cleaning (NULLs + string normalization)

**Scenario:** Build a clean customer view for downstream BI: lowercased trimmed email (replacing NULL with `'unknown@example.com'`), city normalized to a canonical form, and a flag `has_quality_issue` set to 1 when the original row needed a fix.
**Your task:** Return `customer_id`, `full_name`, `email_clean`, `city_clean`, `has_quality_issue` for the 6 known dirty rows.
**Expected output shape:**

```
+-------------+-----------------+----------------------+------------+--------------------+
| customer_id | full_name       | email_clean          | city_clean | has_quality_issue  |
+-------------+-----------------+----------------------+------------+--------------------+
```

<details>
<summary>💡 Show solution</summary>

```sql
SELECT
    customer_id,
    full_name,
    LOWER(TRIM(COALESCE(email, 'unknown@example.com')))      AS email_clean,
    CASE
        WHEN UPPER(TRIM(city)) IN ('BENGALURU','BLR','BANGALORE') THEN 'Bengaluru'
        WHEN city IS NULL                                          THEN 'Unknown'
        ELSE CONCAT(
                UPPER(SUBSTRING(TRIM(city),1,1)),
                LOWER(SUBSTRING(TRIM(city),2))
             )
    END                                                       AS city_clean,
    CASE
        WHEN email IS NULL
          OR city  IS NULL
          OR email <> LOWER(email)
          OR city  IN ('bengaluru','BLR')
        THEN 1
        ELSE 0
    END                                                       AS has_quality_issue
FROM customers
WHERE customer_id IN (2, 11, 14, 18, 23, 26)
ORDER BY customer_id;
```

```
+-------------+-----------------+-----------------------------+------------+-------------------+
| customer_id | full_name       | email_clean                 | city_clean | has_quality_issue |
+-------------+-----------------+-----------------------------+------------+-------------------+
|           2 | Ravi Kumar      | ravi.kumar@example.com      | Bengaluru  |                 1 |
|          11 | Meera Rao       | meera.rao@example.com       | Bengaluru  |                 1 |
|          14 | Rahul Joshi     | rahul.joshi@example.com     | Unknown    |                 1 |
|          18 | Suresh Iyengar  | suresh.iyengar@example.com  | Bengaluru  |                 1 |
|          23 | Ritu Agarwal    | unknown@example.com         | Delhi      |                 1 |
|          26 | Sanjay Murthy   | sanjay.murthy@example.com   | Bengaluru  |                 1 |
+-------------+-----------------+-----------------------------+------------+-------------------+
```

**Why this works:** `COALESCE` first, then `LOWER(TRIM(...))` for emails. Cities use a `CASE` to canonicalize known variants. The `has_quality_issue` column captures the same logic Step 11 used to *find* the dirty rows — by computing it inline, downstream consumers can audit data quality without re-running the detection query.
</details>

---

### Challenge 5: End-to-end mini-report (CTE + window + aggregation)

**Scenario:** Build a "top product per category, with category share of total revenue" report from delivered orders only.
**Your task:** Return `category`, `top_product`, `top_product_revenue`, `category_revenue`, `category_share_pct` (the category's share of company-wide revenue, two decimals).
**Expected output shape:**

```
+-------------+---------------------+---------------------+------------------+--------------------+
| category    | top_product         | top_product_revenue | category_revenue | category_share_pct |
+-------------+---------------------+---------------------+------------------+--------------------+
```

<details>
<summary>💡 Show solution</summary>

```sql
WITH product_rev AS (
    SELECT
        p.category,
        p.product_name,
        SUM(oi.line_amount) AS revenue
    FROM order_items AS oi
    JOIN orders   AS o ON o.order_id   = oi.order_id
    JOIN products AS p ON p.product_id = oi.product_id
    WHERE o.status = 'DELIVERED'
    GROUP BY p.category, p.product_name
),
ranked AS (
    SELECT
        pr.category,
        pr.product_name,
        pr.revenue,
        SUM(pr.revenue) OVER (PARTITION BY pr.category)         AS category_revenue,
        SUM(pr.revenue) OVER ()                                 AS company_revenue,
        ROW_NUMBER() OVER (PARTITION BY pr.category
                           ORDER BY pr.revenue DESC, pr.product_name) AS rn
    FROM product_rev AS pr
)
SELECT
    category,
    product_name                                                    AS top_product,
    revenue                                                         AS top_product_revenue,
    category_revenue,
    ROUND(100.0 * category_revenue / company_revenue, 2)            AS category_share_pct
FROM ranked
WHERE rn = 1
ORDER BY category_share_pct DESC;
```

```
+-------------+---------------------+---------------------+------------------+--------------------+
| category    | top_product         | top_product_revenue | category_revenue | category_share_pct |
+-------------+---------------------+---------------------+------------------+--------------------+
| Electronics | Laptop Pro 14       |          1259986.00 |       1483158.00 |              84.81 |
| Furniture   | Office Chair        |           103992.00 |        118989.00 |               6.80 |
| Footwear    | Running Shoes       |            45487.00 |         45487.00 |               2.60 |
| Apparel     | Denim Jeans         |            30583.00 |         45371.00 |               2.59 |
| Fitness     | Dumbbell Pair 5kg   |            17493.00 |         25586.00 |               1.46 |
| Home        | Coffee Mug Set      |            10387.00 |         24571.00 |               1.40 |
| Stationery  | Notebook A4         |             4977.00 |          8197.00 |               0.47 |
+-------------+---------------------+---------------------+------------------+--------------------+
```

**Why this works:** Two CTEs separate concerns — first compute per-product revenue, then layer two windows: one for category subtotal, one for company total. `ROW_NUMBER()` with a deterministic tiebreaker picks the top product per category. The whole report is one query, no temp tables, fully composable into a view.
</details>

### ✅ Checkpoint

You can now:

- [ ] Solve all five challenges in under 30 minutes total
- [ ] Explain *why* each solution works in 2–3 sentences
- [ ] Spot the cardinality, NULL, and tie-breaking traps that each challenge hides

---

## Step 19: Next steps — warehousing and dimensional modeling

> *"In God we trust. All others must bring data."*
> — W. Edwards Deming
>
> 💡 **HitaVir Tech connection:** You have the SQL. Now bring the data — to a real warehouse, in a real model, on a real schedule.
> 🎯 **Why this matters now:** Pick one warehouse and one modeling pattern. Go deep on both before sampling the next.

Duration: 5 min

### Cloud data warehouses to learn next

| Warehouse  | What makes it distinct                                                                 |
|------------|----------------------------------------------------------------------------------------|
| Snowflake  | Multi-cloud, separation of storage and compute, zero-copy clones, time-travel queries  |
| BigQuery   | Serverless, billed per byte scanned, deeply integrated with Google Cloud and Looker     |
| Redshift   | AWS-native, tightly integrated with S3 (Spectrum) and the broader AWS data ecosystem    |

### Dimensional modeling deeper dives

- **Slowly Changing Dimensions (SCD)**
  - **Type 1** — overwrite (no history)
  - **Type 2** — add a new dimension row + effective dates (full history)
  - **Type 3** — keep one prior value as a column (limited history)
- **Fact table grains** — the level of detail per row (transaction, daily snapshot, periodic accumulating). Mixing grains in one fact is the most expensive modeling mistake you can make.
- **Conformed dimensions** — a single `dim_customer` shared across multiple facts (sales, support, marketing). Conformity is what makes cross-subject reporting possible.

### Suggested learning order

1. **Star schema mechanics** — refine what you built in Step 14 until you can build it from blank in 10 minutes.
2. **SCD Type 2** — add effective-from / effective-to columns to `dim_customer` and re-load it.
3. **Pick one warehouse** — Snowflake if you want an industry-standard skill that transfers everywhere; BigQuery if you are already in GCP; Redshift if you are already in AWS.
4. **Dimensional modeling deep-dive** — Kimball's *The Data Warehouse Toolkit* is still the canonical reference. Read it once a year for the rest of your career.

### ✅ Checkpoint

You can now:

- [ ] Name the distinguishing feature of Snowflake, BigQuery, and Redshift
- [ ] Explain SCD Type 1 vs Type 2 in one sentence each
- [ ] Define "fact table grain" and why mixing grains is dangerous
- [ ] Explain "conformed dimensions" with an example

---

## Repository structure

```
hitavir-sql-codelab/
├── README.md
├── 01_setup/
│   ├── 01_create_schema.sql
│   ├── 02_create_tables.sql
│   ├── 03_seed_customers.sql
│   ├── 04_seed_products.sql
│   ├── 05_seed_orders.sql
│   └── 06_seed_order_items.sql
├── 02_examples/
│   ├── 03_select_where.sql
│   ├── 04_create_table.sql
│   ├── 05_insert_update_delete.sql
│   ├── 06_conditional.sql
│   ├── 07_aggregations.sql
│   ├── 08_joins.sql
│   ├── 09_subqueries.sql
│   ├── 10_views_indexes_temp.sql
│   ├── 11_cleaning.sql
│   ├── 12_window_cte_recursive.sql
│   └── 13_explain_indexing.sql
├── 03_capstone/
│   ├── 01_stg_orders_raw.sql
│   ├── 02_v_stg_orders_clean.sql
│   ├── 03_dim_customer.sql
│   ├── 04_dim_product.sql
│   ├── 05_fact_sales.sql
│   ├── 06_daily_sales_summary.sql
│   └── 07_explain_before_after.sql
├── 04_integrations/
│   ├── python_pymysql_demo.py
│   ├── airflow_dag_daily_summary.py
│   ├── spark_jdbc_demo.py
│   └── databricks_uc_query.sql
├── 05_challenges/
│   ├── 01_filter_aggregation.sql
│   ├── 02_join_having.sql
│   ├── 03_window_top_per_group.sql
│   ├── 04_data_cleaning.sql
│   └── 05_endtoend_report.sql
├── docs/
│   ├── er_diagram.md
│   └── style_guide.md
└── .gitignore
```

**Happy querying — and remember: bring the data.**

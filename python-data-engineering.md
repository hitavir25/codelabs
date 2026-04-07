summary: Python Programming Language for Data Engineering - Beginner to Intermediate
id: python-data-engineering
categories: Python, Data Engineering, Programming
tags: python, data-engineering, etl, pandas, beginner, intermediate
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Python Programming Language for Data Engineering - Beginner to Intermediate

## Overview
Duration: 5:00

Welcome to **Python Programming for Data Engineering** by **HitaVir Tech**!

This hands-on codelab takes you from zero Python knowledge to building real data pipelines. Every concept is taught through the lens of Data Engineering — you will not learn Python in a vacuum, you will learn it the way data engineers actually use it.

### What You Will Learn

- Python fundamentals (variables, data types, control flow, functions)
- Data structures used in pipelines (lists, dicts, JSON)
- File handling (CSV, JSON, text files)
- Error handling and logging for production pipelines
- pandas and numpy for data transformation
- Building a complete ETL pipeline from scratch
- Industry best practices for data engineering code

### What You Will Build

A complete **Sales Data ETL Pipeline** for HitaVir Tech:

```
  Raw CSV Data → Extract → Clean → Transform → Aggregate → Report
       │              │          │          │           │          │
  sales_raw.csv   Load file  Fix nulls  Add cols   Summarize  output.csv
```

### Skills You Will Gain

| Skill | Level |
|-------|-------|
| Python syntax, variables, types | Beginner |
| Control flow (if/else, loops) | Beginner |
| Functions and modular code | Beginner |
| Data structures (lists, dicts) | Beginner |
| File I/O (CSV, JSON, text) | Intermediate |
| Error handling and logging | Intermediate |
| pandas data manipulation | Intermediate |
| ETL pipeline development | Intermediate |
| Industry best practices | Intermediate |

### Why Python for Data Engineering?

Python is the **number one language** in Data Engineering because:

1. **Every tool supports it** — Spark, Airflow, Databricks, AWS Glue, dbt
2. **Massive library ecosystem** — pandas, numpy, PySpark, SQLAlchemy
3. **Easy to learn** — readable syntax that looks like English
4. **Industry standard** — required in 95% of DE job postings
5. **Automation** — script anything from file processing to API calls

### Estimated Duration

**5-7 hours** (go at your own pace — every section builds on the previous one)

> **HitaVir Tech says:** "Python is not just a programming language — it is the glue that holds modern data platforms together. Master it, and every data tool becomes accessible to you."

## Prerequisites
Duration: 3:00

### Required

- A computer running **Windows 10 or 11**
- Administrator access (to install software)
- At least **2 GB** free disk space
- Internet connection (for downloading packages)

### No Prior Knowledge Needed

This codelab assumes **zero Python experience**. We start from installing Python itself.

### Helpful but Not Required

- Basic familiarity with the command line (covered in our Linux Basics codelab)
- Understanding of what data and files are

> **HitaVir Tech says:** "If you can use a calculator and save a file, you are ready to learn Python. Everything else, we teach you step by step."

## Environment Setup
Duration: 10:00

Let us set up a professional Python development environment on Windows.

### Step 1 — Install Python

Go to [https://www.python.org/downloads/](https://www.python.org/downloads/) and download the latest Python 3.x installer.

**CRITICAL during installation:**

1. **Check the box** that says **"Add Python to PATH"** (at the bottom of the first screen)
2. Click **"Install Now"**

If you miss the PATH checkbox, Python commands will not work in your terminal.

### Step 2 — Verify Python Installation

Open **Git Bash** (or Command Prompt) and run:

```bash
python --version
```

**Expected output:**

```
Python 3.12.3
```

Also verify pip (Python's package manager):

```bash
pip --version
```

**Expected output:**

```
pip 24.0 from ... (python 3.12)
```

### Step 3 — Install VS Code

Download from [https://code.visualstudio.com/](https://code.visualstudio.com/) and install with default settings.

### Step 4 — Install Python Extension for VS Code

1. Open VS Code
2. Press `Ctrl + Shift + X` (Extensions panel)
3. Search for **"Python"** by Microsoft
4. Click **Install**

### Step 5 — Create Your Project Folder

```bash
mkdir -p ~/python-de-learning
cd ~/python-de-learning
```

### Step 6 — Create a Virtual Environment

A virtual environment keeps your project's packages separate from other projects:

```bash
python -m venv venv
```

Activate it:

**Git Bash:**

```bash
source venv/Scripts/activate
```

**Command Prompt:**

```cmd
venv\Scripts\activate
```

You should see `(venv)` at the beginning of your prompt:

```
(venv) user@COMPUTER ~/python-de-learning
$
```

### Step 7 — Install Essential Packages

```bash
pip install pandas numpy requests
```

Save your dependencies:

```bash
pip freeze > requirements.txt
cat requirements.txt
```

### Step 8 — Verify Everything Works

Create a test file:

```bash
cat > test_setup.py << 'EOF'
import sys
import pandas as pd
import numpy as np

print(f"Python version: {sys.version}")
print(f"pandas version: {pd.__version__}")
print(f"numpy version: {np.__version__}")
print("\nHitaVir Tech - Setup Complete!")
print("You are ready to learn Python for Data Engineering!")
EOF
```

Run it:

```bash
python test_setup.py
```

**Expected output:**

```
Python version: 3.12.3 (tags/v3.12.3:...)
pandas version: 2.2.1
numpy version: 1.26.4

HitaVir Tech - Setup Complete!
You are ready to learn Python for Data Engineering!
```

### Your Project Structure So Far

```
python-de-learning/
├── venv/              ← Virtual environment (do not edit)
├── requirements.txt   ← Package list
└── test_setup.py      ← Setup verification
```

> **HitaVir Tech says:** "Always use virtual environments. In the real world, different projects need different package versions. Virtual environments prevent them from conflicting."

### Common Setup Mistakes

| Problem | Fix |
|---------|-----|
| `python not found` | Reinstall Python with "Add to PATH" checked |
| `pip not found` | Run `python -m pip install --upgrade pip` |
| Wrong Python version | Use `python3` instead of `python` |
| `venv` activation fails | Use the correct command for your terminal |

## Python Basics — Variables and Data Types
Duration: 10:00

Let us write real Python code. Create a new file for each section.

### Variables — Storing Data

A variable is a **name that points to a value**. Think of it as a labeled box.

```bash
cat > basics_variables.py << 'PYEOF'
# ============================================
# HitaVir Tech - Python Variables
# ============================================

# Strings — text data (names, cities, log messages)
pipeline_name = "HitaVir Sales ETL"
data_source = "postgres"
status = "running"

print(f"Pipeline: {pipeline_name}")
print(f"Source: {data_source}")
print(f"Status: {status}")

# Integers — whole numbers (counts, IDs, ports)
total_records = 15000
batch_size = 500
port = 5432

print(f"\nTotal records: {total_records}")
print(f"Batch size: {batch_size}")
print(f"Database port: {port}")

# Floats — decimal numbers (percentages, measurements)
success_rate = 99.7
processing_time = 3.45
data_quality_score = 0.95

print(f"\nSuccess rate: {success_rate}%")
print(f"Processing time: {processing_time}s")
print(f"Quality score: {data_quality_score}")

# Booleans — True/False (flags, conditions)
is_production = True
has_errors = False
pipeline_active = True

print(f"\nProduction mode: {is_production}")
print(f"Has errors: {has_errors}")
print(f"Pipeline active: {pipeline_active}")

# None — represents "no value" (null in databases)
last_error = None
print(f"\nLast error: {last_error}")
PYEOF
```

Run it:

```bash
python basics_variables.py
```

**Expected output:**

```
Pipeline: HitaVir Sales ETL
Source: postgres
Status: running

Total records: 15000
Batch size: 500
Database port: 5432

Success rate: 99.7%
Processing time: 3.45s
Quality score: 0.95

Production mode: True
Has errors: False
Pipeline active: True

Last error: None
```

### Data Types Summary

| Type | Example | Data Engineering Use |
|------|---------|---------------------|
| `str` | `"hello"` | Column names, log messages, file paths |
| `int` | `42` | Row counts, IDs, batch sizes |
| `float` | `3.14` | Metrics, percentages, measurements |
| `bool` | `True` | Flags, conditions, validations |
| `None` | `None` | Missing values, null handling |

### Type Checking and Conversion

```bash
cat > basics_types.py << 'PYEOF'
# ============================================
# HitaVir Tech - Type Checking & Conversion
# ============================================

# Check types
record_count = 1500
pipeline_name = "ETL Pipeline"
is_active = True

print(f"type of record_count: {type(record_count)}")   # <class 'int'>
print(f"type of pipeline_name: {type(pipeline_name)}") # <class 'str'>
print(f"type of is_active: {type(is_active)}")         # <class 'bool'>

# Type conversion (common in data pipelines)
# String to integer (e.g., reading CSV data)
raw_value = "2500"
numeric_value = int(raw_value)
print(f"\nConverted '{raw_value}' to integer: {numeric_value}")

# Integer to string (e.g., building log messages)
count = 1500
message = "Processed " + str(count) + " records"
print(message)

# String to float (e.g., parsing decimal data)
price_str = "29.99"
price = float(price_str)
print(f"Price: ${price}")

# f-strings — the best way to format strings in Python
name = "HitaVir Tech"
records = 5000
time_taken = 2.3
print(f"\n{name} processed {records} records in {time_taken}s")
PYEOF

python basics_types.py
```

### Operators

```bash
cat > basics_operators.py << 'PYEOF'
# ============================================
# HitaVir Tech - Operators
# ============================================

# Arithmetic
total = 1000 + 500       # Addition
remaining = 1000 - 300   # Subtraction
total_size = 500 * 3     # Multiplication
avg = 1500 / 3           # Division (returns float)
batches = 1500 // 500    # Floor division (returns int)
leftover = 1500 % 500    # Modulo (remainder)
squared = 2 ** 10        # Exponentiation

print(f"Total: {total}")
print(f"Remaining: {remaining}")
print(f"Total size: {total_size}")
print(f"Average: {avg}")
print(f"Batches needed: {batches}")
print(f"Leftover records: {leftover}")
print(f"2^10 = {squared}")

# Comparison (used in data validation)
row_count = 1500
threshold = 1000
print(f"\nRow count > threshold: {row_count > threshold}")   # True
print(f"Row count == 1500: {row_count == 1500}")             # True
print(f"Row count != 0: {row_count != 0}")                   # True

# Logical (used in pipeline conditions)
has_data = True
is_valid = True
has_errors = False

print(f"\nReady to process: {has_data and is_valid}")        # True
print(f"Any issues: {has_errors or not is_valid}")           # False
print(f"No errors: {not has_errors}")                        # True
PYEOF

python basics_operators.py
```

### User Input

```bash
cat > basics_input.py << 'PYEOF'
# ============================================
# HitaVir Tech - User Input
# ============================================

# input() always returns a string
name = input("Enter your name: ")
batch = input("Enter your batch number: ")
batch_num = int(batch)  # Convert to integer

print(f"\nWelcome to HitaVir Tech, {name}!")
print(f"You are in Batch {batch_num}")
print(f"Let's learn Python for Data Engineering!")
PYEOF

python basics_input.py
```

> **HitaVir Tech says:** "In data engineering, you rarely use input(). Instead, you read from files, databases, and APIs. But understanding input/output flow is fundamental to programming."

### Exercise

Create a file called `exercise_basics.py` that calculates pipeline statistics:

```python
# Calculate: If a pipeline processes 50,000 records per hour,
# how many records in 8 hours? What is the per-minute rate?
# Print results using f-strings.
```

## Control Flow — Making Decisions
Duration: 10:00

Data pipelines constantly make decisions: Is the data valid? Should we retry? Which path to take?

### if-else — Conditional Logic

```bash
cat > control_if.py << 'PYEOF'
# ============================================
# HitaVir Tech - Control Flow: if-else
# ============================================

# --- Data Quality Check ---
null_percentage = 0.03  # 3% nulls
threshold = 0.05        # 5% max allowed

if null_percentage <= threshold:
    print("PASS: Data quality check passed")
    print(f"  Null rate: {null_percentage:.1%} (threshold: {threshold:.1%})")
else:
    print("FAIL: Data quality check failed")
    print(f"  Null rate: {null_percentage:.1%} exceeds threshold: {threshold:.1%}")

# --- Pipeline Status Router ---
print("\n--- Pipeline Status Router ---")
status_code = 200

if status_code == 200:
    print("SUCCESS: Pipeline completed normally")
elif status_code == 202:
    print("ACCEPTED: Pipeline queued for processing")
elif status_code == 400:
    print("ERROR: Bad request - check input data")
elif status_code == 500:
    print("CRITICAL: Server error - alert on-call engineer")
else:
    print(f"UNKNOWN: Unexpected status code {status_code}")

# --- Environment Selector ---
print("\n--- Environment Selector ---")
env = "production"

if env == "development":
    db_host = "localhost"
    log_level = "DEBUG"
elif env == "staging":
    db_host = "staging-db.hitavir.tech"
    log_level = "INFO"
elif env == "production":
    db_host = "prod-db.hitavir.tech"
    log_level = "WARNING"
else:
    db_host = "localhost"
    log_level = "DEBUG"

print(f"Environment: {env}")
print(f"Database: {db_host}")
print(f"Log level: {log_level}")

# --- Data Type Validator ---
print("\n--- Data Type Validator ---")
value = "12345"

if value.isdigit():
    print(f"'{value}' is a valid integer")
    converted = int(value)
elif value.replace(".", "", 1).isdigit():
    print(f"'{value}' is a valid float")
    converted = float(value)
else:
    print(f"'{value}' is a string (non-numeric)")
PYEOF

python control_if.py
```

### Loops — Processing Data

```bash
cat > control_loops.py << 'PYEOF'
# ============================================
# HitaVir Tech - Control Flow: Loops
# ============================================

# --- for loop: Process a batch of records ---
print("--- Processing Transaction Batch ---")
transactions = [150.00, 230.50, 45.99, 1200.00, 89.95, 567.25]

total = 0
for i, amount in enumerate(transactions, 1):
    total += amount
    print(f"  Transaction {i}: ${amount:>10.2f}  |  Running total: ${total:>10.2f}")

print(f"\n  Batch total: ${total:.2f}")
print(f"  Average: ${total / len(transactions):.2f}")

# --- for loop with range: Batch processing ---
print("\n--- Batch Processing Simulation ---")
total_records = 1500
batch_size = 500

for batch_num in range(0, total_records, batch_size):
    end = min(batch_num + batch_size, total_records)
    print(f"  Processing records {batch_num + 1} to {end}...")

print("  All batches processed!")

# --- while loop: Retry logic ---
print("\n--- Connection Retry Logic ---")
max_retries = 3
attempt = 0
connected = False

while attempt < max_retries and not connected:
    attempt += 1
    print(f"  Attempt {attempt}/{max_retries}: Connecting to database...")
    if attempt == 3:
        connected = True
        print("  Connected successfully!")

if not connected:
    print("  FAILED: Could not connect after max retries")

# --- break and continue ---
print("\n--- Data Filtering with break/continue ---")
records = [
    {"id": 1, "name": "Alice", "status": "active"},
    {"id": 2, "name": "Bob", "status": "inactive"},
    {"id": 3, "name": "Charlie", "status": "active"},
    {"id": 4, "name": "STOP", "status": "signal"},
    {"id": 5, "name": "Diana", "status": "active"},
]

active_users = []
for record in records:
    if record["name"] == "STOP":
        print(f"  Stop signal received at record {record['id']}")
        break
    if record["status"] != "active":
        print(f"  Skipping inactive user: {record['name']}")
        continue
    active_users.append(record["name"])
    print(f"  Added active user: {record['name']}")

print(f"\n  Active users found: {active_users}")
PYEOF

python control_loops.py
```

> **HitaVir Tech says:** "In data engineering, loops process records, retry failed connections, and iterate through batches. The for loop is your workhorse. The while loop is your retry mechanism. Master both."

## Functions — Reusable Code
Duration: 15:00

Functions let you write code once and use it everywhere. In data engineering, functions are the building blocks of every pipeline. This section covers **every type of function** you need to know.

### Types of Functions in Python

| Type | Description | Example |
|------|-------------|---------|
| Basic function | No parameters, no return | `def greet():` |
| Parameterized function | Accepts inputs | `def add(a, b):` |
| Function with return | Sends back a result | `return a + b` |
| Default parameters | Parameters with fallback values | `def connect(port=5432):` |
| Keyword arguments | Call by name | `connect(port=3306)` |
| `*args` | Variable number of positional args | `def func(*args):` |
| `**kwargs` | Variable number of keyword args | `def func(**kwargs):` |
| Lambda function | One-line anonymous function | `lambda x: x * 2` |
| Nested function | Function inside a function | `def outer(): def inner():` |
| Recursive function | Function that calls itself | `def factorial(n):` |
| Generator function | Yields values lazily | `def gen(): yield value` |
| Decorator function | Wraps another function | `@decorator` |

Let us learn each one with real Data Engineering examples.

### Part 1 — Basic Functions

```bash
cat > func_01_basics.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 1: Basic Functions
# ============================================

# --- 1A. Function with no parameters, no return ---
def print_pipeline_header():
    """Print a standard header for pipeline output."""
    print("=" * 50)
    print("  HitaVir Tech - Data Pipeline")
    print("=" * 50)

print_pipeline_header()

# --- 1B. Function with parameters ---
def greet_engineer(name):
    """Greet a data engineer by name."""
    print(f"Welcome to HitaVir Tech, {name}!")

greet_engineer("Alice")
greet_engineer("Bob")

# --- 1C. Function with return value ---
def calculate_total(price, quantity):
    """Calculate total amount for an order."""
    total = price * quantity
    return total

result = calculate_total(999.99, 3)
print(f"\nOrder total: ${result:,.2f}")

# --- 1D. Function returning multiple values ---
def get_pipeline_stats(total, failed):
    """Return multiple statistics from a pipeline run."""
    success = total - failed
    rate = (success / total) * 100
    return success, failed, rate    # Returns a tuple

s, f, r = get_pipeline_stats(10000, 23)
print(f"\nPipeline: {s} success, {f} failed, {r:.1f}% rate")

# --- 1E. Function returning a dictionary ---
def build_record(id, name, amount):
    """Build a standardized data record."""
    return {
        "id": id,
        "name": name.strip().title(),
        "amount": round(amount, 2),
        "status": "valid" if amount > 0 else "invalid"
    }

record = build_record(1, "  alice johnson  ", 150.50)
print(f"\nRecord: {record}")
PYEOF

python func_01_basics.py
```

### Part 2 — Default Parameters and Keyword Arguments

```bash
cat > func_02_defaults_kwargs.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 2: Defaults & Keyword Args
# ============================================

# --- 2A. Default parameters ---
# Parameters with = have default values (used if not provided)
def connect_database(host, port=5432, database="hitavir_db", timeout=30):
    """Connect to database with sensible defaults."""
    print(f"Connecting to {database} at {host}:{port} (timeout: {timeout}s)")
    return True

print("--- Default Parameters ---")
# All defaults used:
connect_database("prod-db.hitavir.tech")

# Override some defaults:
connect_database("staging-db.hitavir.tech", port=5433, database="staging_db")

# Override all:
connect_database("dev-db.hitavir.tech", 3306, "dev_db", 10)

# --- 2B. Keyword arguments (call by name) ---
# You can pass arguments BY NAME in any order
def create_pipeline(name, source, destination, schedule="daily", retries=3):
    """Create a pipeline configuration."""
    print(f"\n  Pipeline: {name}")
    print(f"  Source: {source} → Destination: {destination}")
    print(f"  Schedule: {schedule} | Retries: {retries}")

print("\n--- Keyword Arguments ---")

# Positional (order matters):
create_pipeline("ETL-1", "postgres", "s3")

# Keyword (order does NOT matter):
create_pipeline(
    destination="bigquery",
    name="ETL-2",
    source="mysql",
    schedule="hourly",
    retries=5
)

# Mix positional + keyword (positional must come first):
create_pipeline("ETL-3", "api", "redshift", retries=10)

# --- 2C. Mutable default argument trap ---
# WRONG — mutable default is shared across all calls:
def bad_append(item, lst=[]):
    lst.append(item)
    return lst

# CORRECT — use None and create inside:
def good_append(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print("\n--- Mutable Default Trap ---")
print(f"Bad call 1: {bad_append('a')}")   # ['a']
print(f"Bad call 2: {bad_append('b')}")   # ['a', 'b'] — BUG! List is shared!

print(f"Good call 1: {good_append('a')}") # ['a']
print(f"Good call 2: {good_append('b')}") # ['b'] — Correct! Fresh list each time
PYEOF

python func_02_defaults_kwargs.py
```

> **HitaVir Tech says:** "Default parameters are incredibly common in data engineering. Database connections, API timeouts, retry counts — they all have sensible defaults that you override when needed."

### Part 3 — *args (Variable Positional Arguments)

```bash
cat > func_03_args.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 3: *args
# ============================================
# *args lets a function accept ANY NUMBER of positional arguments.
# Inside the function, args is a TUPLE.

# --- 3A. Basic *args ---
def sum_all(*numbers):
    """Sum any number of values."""
    print(f"  Received {len(numbers)} args: {numbers}")
    return sum(numbers)

print("--- *args Basics ---")
print(f"Sum of 1,2,3: {sum_all(1, 2, 3)}")
print(f"Sum of 10,20,30,40,50: {sum_all(10, 20, 30, 40, 50)}")
print(f"Sum of single: {sum_all(100)}")
print(f"Sum of nothing: {sum_all()}")

# --- 3B. *args in data engineering: Process multiple files ---
def process_files(*filepaths):
    """Process any number of data files."""
    print(f"\n--- Processing {len(filepaths)} files ---")
    results = []
    for i, filepath in enumerate(filepaths, 1):
        result = {"file": filepath, "status": "processed", "rows": i * 100}
        results.append(result)
        print(f"  [{i}] {filepath} → {result['rows']} rows")
    return results

process_files("sales_jan.csv", "sales_feb.csv", "sales_mar.csv")
process_files("users.csv")  # Works with any count

# --- 3C. Combining regular params + *args ---
def run_pipeline(pipeline_name, *tables):
    """Run a pipeline on one or more tables."""
    print(f"\n--- Pipeline: {pipeline_name} ---")
    print(f"  Tables to process: {list(tables)}")
    for table in tables:
        print(f"  Processing table: {table}")

run_pipeline("Daily ETL", "users", "orders", "products", "payments")
run_pipeline("Hourly Sync", "events")

# --- 3D. Unpacking a list into *args ---
quarterly_files = [
    "q1_sales.csv",
    "q2_sales.csv",
    "q3_sales.csv",
    "q4_sales.csv"
]

# The * unpacks the list into separate arguments:
process_files(*quarterly_files)

# Without * it would pass the entire list as ONE argument
PYEOF

python func_03_args.py
```

### Part 4 — **kwargs (Variable Keyword Arguments)

```bash
cat > func_04_kwargs.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 4: **kwargs
# ============================================
# **kwargs lets a function accept ANY NUMBER of keyword arguments.
# Inside the function, kwargs is a DICTIONARY.

# --- 4A. Basic **kwargs ---
def print_config(**settings):
    """Print any configuration key-value pairs."""
    print(f"  Received {len(settings)} settings:")
    for key, value in settings.items():
        print(f"    {key} = {value}")

print("--- **kwargs Basics ---")
print_config(host="localhost", port=5432, database="hitavir_db")
print()
print_config(name="ETL Pipeline", version="2.0", author="HitaVir Tech", debug=True)

# --- 4B. **kwargs for flexible database connection ---
def connect(**connection_params):
    """Connect to any database with flexible parameters."""
    db_type = connection_params.get("type", "postgres")
    host = connection_params.get("host", "localhost")
    port = connection_params.get("port", 5432)
    database = connection_params.get("database", "default")
    username = connection_params.get("username", "admin")
    ssl = connection_params.get("ssl", False)

    print(f"\n  Connecting: {db_type}://{username}@{host}:{port}/{database}")
    print(f"  SSL: {'enabled' if ssl else 'disabled'}")
    return True

print("\n--- Flexible Database Connection ---")
connect(type="postgres", host="prod-db.hitavir.tech", database="analytics", ssl=True)
connect(type="mysql", host="mysql.hitavir.tech", port=3306, database="reporting")
connect()  # Uses all defaults

# --- 4C. Combining regular params, *args, and **kwargs ---
def execute_query(query, *params, **options):
    """Execute a database query with parameters and options.

    Args:
        query (str): SQL query string
        *params: Query parameters (for parameterized queries)
        **options: Execution options (timeout, retries, etc.)
    """
    timeout = options.get("timeout", 30)
    retries = options.get("retries", 3)
    log_query = options.get("log", True)

    print(f"\n  Query: {query}")
    print(f"  Params: {params}")
    print(f"  Timeout: {timeout}s | Retries: {retries} | Logging: {log_query}")

print("\n--- Combined: regular + *args + **kwargs ---")
execute_query(
    "SELECT * FROM users WHERE region = %s AND status = %s",
    "North", "active",              # *args — query params
    timeout=60, retries=5, log=True # **kwargs — options
)

execute_query("SELECT COUNT(*) FROM orders")  # No args or kwargs

# --- 4D. Unpacking a dictionary into **kwargs ---
prod_config = {
    "type": "postgres",
    "host": "prod-db.hitavir.tech",
    "port": 5432,
    "database": "hitavir_prod",
    "username": "etl_service",
    "ssl": True
}

# The ** unpacks the dict into keyword arguments:
connect(**prod_config)

# --- 4E. Building flexible pipeline config ---
def create_pipeline_config(name, source, destination, **overrides):
    """Create a pipeline config with default values and optional overrides."""
    config = {
        "name": name,
        "source": source,
        "destination": destination,
        "batch_size": 1000,
        "retries": 3,
        "timeout": 300,
        "log_level": "INFO",
        "notify_on_failure": True
    }
    # Override any defaults with provided kwargs
    config.update(overrides)
    return config

print("\n--- Flexible Pipeline Config ---")
config1 = create_pipeline_config("Sales ETL", "postgres", "s3")
config2 = create_pipeline_config(
    "Real-time Events", "kafka", "bigquery",
    batch_size=100, timeout=30, log_level="DEBUG"
)

print("Config 1 (defaults):")
for k, v in config1.items():
    print(f"  {k}: {v}")

print("\nConfig 2 (with overrides):")
for k, v in config2.items():
    print(f"  {k}: {v}")
PYEOF

python func_04_kwargs.py
```

> **HitaVir Tech says:** "*args and **kwargs are the backbone of flexible Python code. Every major framework uses them — Django, Flask, pandas, Spark. When you see `**options` or `*args` in library docs, you now know exactly what they mean."

### Part 5 — Advanced Function Types

```bash
cat > func_05_advanced.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 5: Advanced Function Types
# ============================================

# --- 5A. Lambda Functions (Anonymous Functions) ---
print("=" * 50)
print("LAMBDA FUNCTIONS")
print("=" * 50)

# Regular function:
def double(x):
    return x * 2

# Lambda equivalent (one-line anonymous function):
double_lambda = lambda x: x * 2

print(f"Regular: {double(5)}")       # 10
print(f"Lambda: {double_lambda(5)}") # 10

# Lambdas are most useful with sort, map, filter:
sales = [
    {"product": "Laptop", "revenue": 4999.95},
    {"product": "Mouse", "revenue": 149.95},
    {"product": "Monitor", "revenue": 899.98},
    {"product": "Keyboard", "revenue": 239.97},
]

# Sort by revenue using lambda as the key function:
sorted_sales = sorted(sales, key=lambda x: x["revenue"], reverse=True)
print("\nSales by revenue (descending):")
for s in sorted_sales:
    print(f"  {s['product']:>10}: ${s['revenue']:>10,.2f}")

# filter() — keep only items matching a condition:
big_sales = list(filter(lambda x: x["revenue"] > 500, sales))
print(f"\nBig sales (>$500): {[s['product'] for s in big_sales]}")

# map() — apply a function to every item:
prices = [100, 200, 300, 400, 500]
with_tax = list(map(lambda p: round(p * 1.18, 2), prices))
print(f"\nPrices with 18% tax: {with_tax}")

# --- 5B. Nested Functions (Inner Functions) ---
print(f"\n{'=' * 50}")
print("NESTED FUNCTIONS")
print("=" * 50)

def create_data_cleaner(null_replacement="N/A", trim=True):
    """Create a customized data cleaning function."""

    def clean(value):
        """Inner function that does the actual cleaning."""
        if value is None or value == "":
            return null_replacement
        if trim and isinstance(value, str):
            return value.strip().title()
        return value

    return clean  # Return the inner function

# Create specialized cleaners:
name_cleaner = create_data_cleaner(null_replacement="Unknown")
code_cleaner = create_data_cleaner(null_replacement="NONE", trim=False)

raw_names = ["  alice  ", None, "BOB SMITH", "", "  charlie  "]
cleaned = [name_cleaner(n) for n in raw_names]
print(f"Raw:     {raw_names}")
print(f"Cleaned: {cleaned}")

# --- 5C. Recursive Functions ---
print(f"\n{'=' * 50}")
print("RECURSIVE FUNCTIONS")
print("=" * 50)

def flatten_nested_data(data, prefix=""):
    """Flatten a nested dictionary (common in JSON/API data)."""
    flat = {}
    for key, value in data.items():
        full_key = f"{prefix}{key}" if not prefix else f"{prefix}.{key}"
        if isinstance(value, dict):
            flat.update(flatten_nested_data(value, full_key))  # Recursive call
        else:
            flat[full_key] = value
    return flat

# Nested API response:
api_response = {
    "user": {
        "name": "Alice",
        "address": {
            "city": "Bangalore",
            "state": "Karnataka",
            "country": "India"
        },
        "scores": {
            "python": 95,
            "sql": 88
        }
    },
    "status": "active"
}

flat = flatten_nested_data(api_response)
print("Flattened JSON:")
for key, value in flat.items():
    print(f"  {key}: {value}")

# --- 5D. Generator Functions (yield) ---
print(f"\n{'=' * 50}")
print("GENERATOR FUNCTIONS")
print("=" * 50)

def read_in_batches(data, batch_size):
    """Yield data in batches — memory efficient for large datasets."""
    for i in range(0, len(data), batch_size):
        batch = data[i:i + batch_size]
        yield batch  # yield pauses and returns one batch at a time

all_records = list(range(1, 16))  # 15 records
print(f"Total records: {all_records}")

for batch_num, batch in enumerate(read_in_batches(all_records, batch_size=4), 1):
    print(f"  Batch {batch_num}: {batch}")

# Generators are memory-efficient — they do NOT load all data at once
# Perfect for processing millions of rows from databases or files

# --- 5E. Decorator Functions ---
print(f"\n{'=' * 50}")
print("DECORATOR FUNCTIONS")
print("=" * 50)

import time

def timer(func):
    """Decorator that measures how long a function takes."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start
        print(f"  [{func.__name__}] completed in {duration:.4f}s")
        return result
    return wrapper

def retry(max_attempts=3):
    """Decorator that retries a function on failure."""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"  [{func.__name__}] Attempt {attempt} failed: {e}")
                    if attempt == max_attempts:
                        raise
        return wrapper
    return decorator

@timer
def process_data(records):
    """Simulate processing data."""
    total = sum(records)
    return total

@timer
def slow_query():
    """Simulate a slow database query."""
    time.sleep(0.1)
    return "query result"

result = process_data([1, 2, 3, 4, 5])
print(f"  Result: {result}")

result = slow_query()
print(f"  Result: {result}")
PYEOF

python func_05_advanced.py
```

### Part 6 — Putting It All Together: Pipeline Functions

```bash
cat > func_06_pipeline.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 6: Complete Pipeline Example
# Using all function types together
# ============================================

import time

# --- Decorator for logging ---
def log_step(func):
    """Decorator: log the start and end of each pipeline step."""
    def wrapper(*args, **kwargs):
        print(f"\n[START] {func.__name__}")
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"[DONE]  {func.__name__} ({elapsed:.3f}s)")
        return result
    return wrapper

# --- Extract: uses default params ---
@log_step
def extract(source, limit=None):
    """Extract data from source."""
    data = [
        {"id": 1, "product": "Laptop", "price": 999.99, "quantity": 5},
        {"id": 2, "product": "Mouse", "price": 29.99, "quantity": 100},
        {"id": 3, "product": "Keyboard", "price": 79.99, "quantity": 50},
        {"id": 4, "product": "Monitor", "price": 449.99, "quantity": 10},
        {"id": 5, "product": "Headphones", "price": 149.99, "quantity": 30},
    ]
    if limit:
        data = data[:limit]
    print(f"  Loaded {len(data)} records from {source}")
    return data

# --- Transform: uses *args for multiple transform steps ---
@log_step
def transform(records, *steps):
    """Apply multiple transform steps to records."""
    for step_func in steps:
        records = step_func(records)
    return records

# Individual transform functions (passed as *args):
def add_total(records):
    """Add total column."""
    for r in records:
        r["total"] = round(r["price"] * r["quantity"], 2)
    print(f"  Added 'total' column to {len(records)} records")
    return records

def add_category(records):
    """Add price category."""
    for r in records:
        r["category"] = "Premium" if r["price"] >= 200 else "Standard"
    print(f"  Added 'category' column to {len(records)} records")
    return records

def filter_valid(records):
    """Keep only records with positive quantity."""
    valid = [r for r in records if r["quantity"] > 0]
    print(f"  Filtered: {len(valid)}/{len(records)} records valid")
    return valid

# --- Load: uses **kwargs for flexible options ---
@log_step
def load(records, destination, **options):
    """Load records to destination with flexible options."""
    format_type = options.get("format", "csv")
    compress = options.get("compress", False)
    partition_by = options.get("partition_by", None)

    print(f"  Destination: {destination}")
    print(f"  Format: {format_type} | Compressed: {compress}")
    if partition_by:
        print(f"  Partitioned by: {partition_by}")
    print(f"  Loaded {len(records)} records")
    return True

# --- Run the pipeline ---
print("=" * 50)
print("  HitaVir Tech - Complete Pipeline")
print("=" * 50)

# Extract with defaults
data = extract("postgres://hitavir-db/sales")

# Transform with multiple *args steps
data = transform(data, add_total, add_category, filter_valid)

# Load with **kwargs options
load(
    data,
    "s3://hitavir-warehouse/output/",
    format="parquet",
    compress=True,
    partition_by="category"
)

# Display results
print(f"\n--- Final Data ---")
for r in data:
    print(f"  {r['product']:>12} | ${r['total']:>10,.2f} | {r['category']}")

print(f"\nPipeline complete!")
PYEOF

python func_06_pipeline.py
```

### Function Types Summary

| Type | Syntax | When to Use |
|------|--------|-------------|
| Basic | `def func():` | Simple, single-purpose tasks |
| With params | `def func(a, b):` | Configurable behavior |
| With defaults | `def func(a, b=10):` | Sensible fallbacks |
| `*args` | `def func(*args):` | Unknown number of inputs (file lists, tables) |
| `**kwargs` | `def func(**kwargs):` | Flexible config options (DB connections, settings) |
| Combined | `def func(a, *args, **kwargs):` | Maximum flexibility (frameworks, libraries) |
| Lambda | `lambda x: x * 2` | Quick inline transformations (sort keys, map/filter) |
| Nested | `def outer(): def inner():` | Factory pattern, closures (custom cleaners) |
| Recursive | `def func(): func()` | Tree structures, nested JSON flattening |
| Generator | `def func(): yield x` | Memory-efficient batch processing |
| Decorator | `@decorator` | Cross-cutting concerns (logging, timing, retry) |

### The argument order rule

When combining all argument types, they **must** appear in this order:

```python
def func(regular, default=val, *args, keyword_only, **kwargs):
    pass

# Example:
def pipeline(name, mode="batch", *sources, notify=True, **options):
    pass
```

> **HitaVir Tech says:** "Functions are the atoms of programming — everything is built from them. Every data pipeline is just extract(), transform(), load(). Every API endpoint is a function. Every automation script is a collection of functions. Master functions and you master Python."

## Data Structures
Duration: 10:00

Data structures are how you organize data in memory. Data engineers use them constantly.

```bash
cat > data_structures.py << 'PYEOF'
# ============================================
# HitaVir Tech - Data Structures
# ============================================

# ====== LISTS ======
# Ordered, mutable collection — like rows in a table
print("=" * 50)
print("LISTS — Ordered Collections")
print("=" * 50)

# List of database tables to process
tables = ["users", "orders", "products", "payments"]
print(f"Tables to process: {tables}")
print(f"First table: {tables[0]}")
print(f"Last table: {tables[-1]}")
print(f"Number of tables: {len(tables)}")

# Add and remove
tables.append("logs")
print(f"After append: {tables}")

tables.remove("logs")
print(f"After remove: {tables}")

# Slicing
print(f"First two: {tables[:2]}")
print(f"Last two: {tables[-2:]}")

# List of numbers — common in data processing
scores = [85, 92, 78, 95, 88, 76, 91]
print(f"\nScores: {scores}")
print(f"Average: {sum(scores) / len(scores):.1f}")
print(f"Max: {max(scores)}")
print(f"Min: {min(scores)}")
print(f"Sorted: {sorted(scores)}")

# ====== TUPLES ======
# Ordered, immutable — like a fixed record
print(f"\n{'=' * 50}")
print("TUPLES — Immutable Records")
print("=" * 50)

# Database connection config (should not change)
db_config = ("prod-db.hitavir.tech", 5432, "hitavir_prod")
host, port, database = db_config  # Tuple unpacking
print(f"Host: {host}")
print(f"Port: {port}")
print(f"Database: {database}")

# Coordinates, pairs, fixed data
column_mapping = [
    ("first_name", "fname"),
    ("last_name", "lname"),
    ("email_address", "email"),
]
print("\nColumn mapping:")
for old_name, new_name in column_mapping:
    print(f"  {old_name} → {new_name}")

# ====== DICTIONARIES ======
# Key-value pairs — like a row in a database
print(f"\n{'=' * 50}")
print("DICTIONARIES — Key-Value Data")
print("=" * 50)

# A single record (like one row from a database)
employee = {
    "id": 101,
    "name": "Priya Sharma",
    "department": "Data Engineering",
    "salary": 85000,
    "skills": ["Python", "SQL", "Spark"],
    "is_active": True
}

print(f"Name: {employee['name']}")
print(f"Department: {employee['department']}")
print(f"Skills: {', '.join(employee['skills'])}")

# Safe access with .get()
print(f"Manager: {employee.get('manager', 'Not assigned')}")

# Iterate over dictionary
print("\nEmployee record:")
for key, value in employee.items():
    print(f"  {key}: {value}")

# Pipeline configuration (common in real projects)
pipeline_config = {
    "name": "sales_etl",
    "source": {
        "type": "postgres",
        "host": "db.hitavir.tech",
        "port": 5432
    },
    "destination": {
        "type": "s3",
        "bucket": "hitavir-warehouse"
    },
    "schedule": "0 6 * * *",
    "retry_count": 3
}

print(f"\nPipeline: {pipeline_config['name']}")
print(f"Source: {pipeline_config['source']['type']}://{pipeline_config['source']['host']}")
print(f"Destination: {pipeline_config['destination']['type']}://{pipeline_config['destination']['bucket']}")

# ====== SETS ======
# Unique values only — great for deduplication
print(f"\n{'=' * 50}")
print("SETS — Unique Values")
print("=" * 50)

raw_emails = [
    "alice@hitavir.tech", "bob@hitavir.tech",
    "alice@hitavir.tech", "charlie@hitavir.tech",
    "bob@hitavir.tech", "diana@hitavir.tech"
]

unique_emails = set(raw_emails)
print(f"Raw count: {len(raw_emails)}")
print(f"Unique count: {len(unique_emails)}")
print(f"Duplicates removed: {len(raw_emails) - len(unique_emails)}")

# Set operations — comparing datasets
db_users = {"alice", "bob", "charlie", "diana"}
api_users = {"charlie", "diana", "eve", "frank"}

print(f"\nIn DB only: {db_users - api_users}")
print(f"In API only: {api_users - db_users}")
print(f"In both: {db_users & api_users}")
print(f"In either: {db_users | api_users}")

# ====== LIST OF DICTIONARIES ======
# The most common data structure in data engineering
print(f"\n{'=' * 50}")
print("LIST OF DICTS — The Data Engineering Standard")
print("=" * 50)

sales_data = [
    {"date": "2026-04-01", "product": "Laptop", "amount": 999.99, "region": "North"},
    {"date": "2026-04-01", "product": "Mouse", "amount": 29.99, "region": "South"},
    {"date": "2026-04-02", "product": "Keyboard", "amount": 79.99, "region": "North"},
    {"date": "2026-04-02", "product": "Monitor", "amount": 449.99, "region": "East"},
    {"date": "2026-04-03", "product": "Laptop", "amount": 999.99, "region": "West"},
]

# Filter: sales above $100
big_sales = [s for s in sales_data if s["amount"] > 100]
print(f"Sales > $100: {len(big_sales)}")

# Calculate total
total_revenue = sum(s["amount"] for s in sales_data)
print(f"Total revenue: ${total_revenue:,.2f}")

# Group by region
from collections import defaultdict
by_region = defaultdict(float)
for sale in sales_data:
    by_region[sale["region"]] += sale["amount"]

print("\nRevenue by region:")
for region, total in sorted(by_region.items()):
    print(f"  {region}: ${total:,.2f}")
PYEOF

python data_structures.py
```

> **HitaVir Tech says:** "A list of dictionaries is the bread and butter of data engineering. It is how APIs return data, how you process CSV rows, and how you pass data between pipeline stages. Master this pattern."

### Data Structure Comparison Table — Interview Reference

This table is asked in **every Python interview** for Data Engineering roles. Memorize it.

#### Core Comparison

| Feature | List | Tuple | Set | Dictionary |
|---------|------|-------|-----|------------|
| **Syntax** | `[1, 2, 3]` | `(1, 2, 3)` | `{1, 2, 3}` | `{"a": 1}` |
| **Mutable?** | Yes | No | Yes | Yes |
| **Ordered?** | Yes | Yes | No | Yes (3.7+) |
| **Duplicates?** | Allowed | Allowed | Not allowed | Keys unique |
| **Indexing?** | Yes `[0]` | Yes `[0]` | No | By key `["a"]` |
| **Slicing?** | Yes `[1:3]` | Yes `[1:3]` | No | No |
| **Use case** | Collections of items | Fixed records | Unique values | Key-value mapping |

#### Performance Comparison (Big-O)

| Operation | List | Tuple | Set | Dict |
|-----------|------|-------|-----|------|
| Access by index | O(1) | O(1) | N/A | N/A |
| Access by key | N/A | N/A | N/A | O(1) |
| Search (in) | O(n) | O(n) | **O(1)** | **O(1)** |
| Append / Add | O(1) | N/A | O(1) | O(1) |
| Insert at position | O(n) | N/A | N/A | N/A |
| Delete | O(n) | N/A | O(1) | O(1) |
| Memory usage | Medium | **Low** | High | High |

#### When to Use What — Data Engineering Guide

| Scenario | Use This | Why |
|----------|----------|-----|
| Rows from a CSV file | List of dicts | Each row is a dict, collection is a list |
| Database connection config | Tuple or dict | Config should not change (tuple) or needs named access (dict) |
| Column names to process | List | Ordered, may have duplicates |
| Unique customer IDs | Set | Automatic deduplication, O(1) lookup |
| API response / JSON data | Dict | Key-value structure matches JSON |
| Mapping old column names to new | Dict | `{"old_name": "new_name"}` |
| Batch of records for processing | List of dicts | Industry standard for tabular data |
| Immutable function return values | Tuple | Cannot be accidentally modified |
| Checking if value exists in large dataset | Set | O(1) vs O(n) for lists |
| Environment variables / settings | Dict | Named access: `config["DB_HOST"]` |
| Coordinates or fixed pairs | Tuple | `(latitude, longitude)` — immutable |
| Pipeline of transformation steps | List of functions | `[clean, validate, transform]` |

#### Quick Memory Aid for Interviews

```
List  = Shopping cart     → ordered, changeable, duplicates OK
Tuple = ID card           → ordered, fixed, cannot be changed
Set   = Unique stamps     → unordered, no duplicates, fast lookup
Dict  = Phone book        → name→number pairs, fast lookup by key
```

> **HitaVir Tech says:** "In interviews, they will ask: 'When would you use a set instead of a list?' The answer: when you need unique values and fast O(1) lookups. A set checks membership instantly; a list scans every element. For 10 million records, that is the difference between milliseconds and minutes."

## File Handling — CSV, JSON, and Text
Duration: 12:00

Reading and writing files is the foundation of every data pipeline.

### Create Sample Data Files

```bash
cat > create_sample_data.py << 'PYEOF'
"""
HitaVir Tech - Create sample data files for practice
"""
import csv
import json

# --- Create CSV file ---
sales_data = [
    ["order_id", "customer", "product", "quantity", "price", "date", "region"],
    [1001, "Alice Johnson", "Laptop", 1, 999.99, "2026-04-01", "North"],
    [1002, "Bob Smith", "Mouse", 5, 29.99, "2026-04-01", "South"],
    [1003, "Charlie Brown", "Keyboard", 2, 79.99, "2026-04-01", "North"],
    [1004, "", "Monitor", 1, 449.99, "2026-04-02", "East"],
    [1005, "Diana Prince", "Laptop", 2, 999.99, "2026-04-02", "West"],
    [1006, "Eve Wilson", "", 3, 29.99, "2026-04-02", "South"],
    [1007, "Frank Miller", "Keyboard", 0, 79.99, "2026-04-03", "North"],
    [1008, "Grace Lee", "Headphones", 1, 149.99, "2026-04-03", "East"],
    [1009, "Henry Davis", "Monitor", 1, 449.99, "2026-04-03", "West"],
    [1010, "Ivy Chen", "Laptop", 1, -999.99, "2026-04-03", "North"],
]

with open("sales_raw.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(sales_data)
print("Created: sales_raw.csv")

# --- Create JSON config ---
config = {
    "pipeline_name": "HitaVir Sales ETL",
    "version": "1.0.0",
    "source": {
        "type": "csv",
        "path": "sales_raw.csv"
    },
    "rules": {
        "max_null_percent": 0.05,
        "min_quantity": 1,
        "min_price": 0.01
    },
    "output": {
        "path": "sales_cleaned.csv",
        "report_path": "pipeline_report.json"
    }
}

with open("pipeline_config.json", "w") as f:
    json.dump(config, f, indent=2)
print("Created: pipeline_config.json")

# --- Create log file ---
logs = """[2026-04-05 08:00:01] INFO: Pipeline started
[2026-04-05 08:00:02] INFO: Loading sales_raw.csv
[2026-04-05 08:00:03] WARNING: Found 2 records with missing customer names
[2026-04-05 08:00:04] ERROR: Record 1010 has negative price
[2026-04-05 08:00:05] INFO: Cleaned 10 records, 2 rejected
[2026-04-05 08:00:06] INFO: Pipeline completed in 5.2s
"""

with open("pipeline.log", "w") as f:
    f.write(logs)
print("Created: pipeline.log")

print("\nAll sample files created successfully!")
PYEOF

python create_sample_data.py
```

### Reading and Writing CSV Files

```bash
cat > file_csv.py << 'PYEOF'
"""
HitaVir Tech - CSV File Handling
"""
import csv

# --- READ CSV ---
print("=" * 60)
print("READING CSV FILE")
print("=" * 60)

records = []
with open("sales_raw.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        records.append(row)

print(f"Loaded {len(records)} records\n")
print("First 3 records:")
for i, record in enumerate(records[:3]):
    print(f"  {i+1}. Order {record['order_id']}: "
          f"{record['customer']} bought {record['quantity']}x {record['product']} "
          f"@ ${record['price']}")

# --- PROCESS CSV ---
print(f"\n{'=' * 60}")
print("PROCESSING CSV DATA")
print("=" * 60)

cleaned = []
rejected = []

for record in records:
    # Convert numeric fields
    record["quantity"] = int(record["quantity"])
    record["price"] = float(record["price"])

    # Validation
    issues = []
    if not record["customer"]:
        issues.append("missing customer")
    if not record["product"]:
        issues.append("missing product")
    if record["quantity"] <= 0:
        issues.append(f"invalid quantity: {record['quantity']}")
    if record["price"] <= 0:
        issues.append(f"invalid price: {record['price']}")

    if issues:
        record["rejection_reason"] = "; ".join(issues)
        rejected.append(record)
        print(f"  REJECTED Order {record['order_id']}: {record['rejection_reason']}")
    else:
        record["total"] = round(record["price"] * record["quantity"], 2)
        cleaned.append(record)

print(f"\nCleaned: {len(cleaned)} records")
print(f"Rejected: {len(rejected)} records")

# --- WRITE CSV ---
print(f"\n{'=' * 60}")
print("WRITING CLEANED CSV")
print("=" * 60)

fieldnames = ["order_id", "customer", "product", "quantity", "price", "total", "date", "region"]

with open("sales_cleaned.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(cleaned)

print(f"Saved {len(cleaned)} records to sales_cleaned.csv")

# Display results
total_revenue = sum(r["total"] for r in cleaned)
print(f"Total revenue: ${total_revenue:,.2f}")
PYEOF

python file_csv.py
```

### Reading and Writing JSON Files

```bash
cat > file_json.py << 'PYEOF'
"""
HitaVir Tech - JSON File Handling
"""
import json

# --- READ JSON ---
print("=" * 60)
print("READING JSON CONFIG")
print("=" * 60)

with open("pipeline_config.json", "r") as f:
    config = json.load(f)

print(f"Pipeline: {config['pipeline_name']}")
print(f"Version: {config['version']}")
print(f"Source: {config['source']['path']}")
print(f"Max null %: {config['rules']['max_null_percent']}")

# --- CREATE PIPELINE REPORT (JSON) ---
print(f"\n{'=' * 60}")
print("GENERATING PIPELINE REPORT")
print("=" * 60)

report = {
    "pipeline": config["pipeline_name"],
    "run_date": "2026-04-05",
    "status": "completed",
    "metrics": {
        "total_input_records": 10,
        "cleaned_records": 7,
        "rejected_records": 3,
        "success_rate": 70.0,
        "total_revenue": 4339.89,
        "processing_time_seconds": 5.2
    },
    "top_products": [
        {"product": "Laptop", "revenue": 2999.97, "orders": 3},
        {"product": "Monitor", "revenue": 449.99, "orders": 1},
        {"product": "Headphones", "revenue": 149.99, "orders": 1}
    ],
    "rejections": [
        {"order_id": 1004, "reason": "missing customer"},
        {"order_id": 1006, "reason": "missing product"},
        {"order_id": 1007, "reason": "invalid quantity: 0"},
        {"order_id": 1010, "reason": "invalid price: -999.99"}
    ]
}

with open("pipeline_report.json", "w") as f:
    json.dump(report, f, indent=2)

print("Report saved to pipeline_report.json")
print(f"\nPipeline Status: {report['status']}")
print(f"Success Rate: {report['metrics']['success_rate']}%")
print(f"Revenue: ${report['metrics']['total_revenue']:,.2f}")
PYEOF

python file_json.py
```

### Reading Text/Log Files

```bash
cat > file_logs.py << 'PYEOF'
"""
HitaVir Tech - Log File Analysis
"""

# --- Read and analyze log file ---
print("=" * 60)
print("LOG FILE ANALYSIS")
print("=" * 60)

with open("pipeline.log", "r") as f:
    lines = f.readlines()

info_count = 0
warning_count = 0
error_count = 0
errors = []

for line in lines:
    line = line.strip()
    if not line:
        continue
    if "INFO:" in line:
        info_count += 1
    elif "WARNING:" in line:
        warning_count += 1
    elif "ERROR:" in line:
        error_count += 1
        errors.append(line)

print(f"Total log entries: {len([l for l in lines if l.strip()])}")
print(f"INFO: {info_count}")
print(f"WARNING: {warning_count}")
print(f"ERROR: {error_count}")

if errors:
    print(f"\nError details:")
    for err in errors:
        print(f"  {err}")
PYEOF

python file_logs.py
```

> **HitaVir Tech says:** "File handling is where theory meets reality. Every data pipeline starts with reading a file and ends with writing a file. CSV and JSON are the two formats you will use most."

## Error Handling and Logging
Duration: 8:00

Production pipelines must handle errors gracefully and log everything for debugging.

```bash
cat > error_handling.py << 'PYEOF'
"""
HitaVir Tech - Error Handling & Logging
"""
import logging
from datetime import datetime

# --- Setup logging ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler("etl_pipeline.log"),
        logging.StreamHandler()  # Also print to console
    ]
)

logger = logging.getLogger("HitaVirETL")

# --- try-except basics ---
print("=" * 60)
print("ERROR HANDLING BASICS")
print("=" * 60)

# Division by zero
try:
    result = 100 / 0
except ZeroDivisionError:
    logger.error("Cannot divide by zero!")

# File not found
try:
    with open("nonexistent_file.csv", "r") as f:
        data = f.read()
except FileNotFoundError:
    logger.warning("File not found — using default data")

# Type conversion error
try:
    value = int("not_a_number")
except ValueError as e:
    logger.error(f"Type conversion failed: {e}")

# --- Real pipeline with error handling ---
print(f"\n{'=' * 60}")
print("PRODUCTION-GRADE PIPELINE")
print("=" * 60)

def safe_extract(filepath):
    """Extract data with error handling."""
    logger.info(f"Starting extraction from {filepath}")
    try:
        with open(filepath, "r") as f:
            import csv
            reader = csv.DictReader(f)
            records = list(reader)
        logger.info(f"Extracted {len(records)} records")
        return records
    except FileNotFoundError:
        logger.error(f"Source file not found: {filepath}")
        return []
    except Exception as e:
        logger.critical(f"Unexpected error during extraction: {e}")
        return []

def safe_transform(records):
    """Transform data with per-record error handling."""
    logger.info(f"Starting transformation of {len(records)} records")
    cleaned = []
    errors = 0

    for i, record in enumerate(records):
        try:
            record["price"] = float(record.get("price", 0))
            record["quantity"] = int(record.get("quantity", 0))

            if record["price"] <= 0 or record["quantity"] <= 0:
                raise ValueError("Invalid price or quantity")

            record["total"] = round(record["price"] * record["quantity"], 2)
            cleaned.append(record)
        except (ValueError, TypeError) as e:
            errors += 1
            logger.warning(f"Record {i+1} skipped: {e}")

    logger.info(f"Transformation complete: {len(cleaned)} valid, {errors} errors")
    return cleaned

def safe_load(records, output_path):
    """Load data with error handling."""
    logger.info(f"Loading {len(records)} records to {output_path}")
    try:
        import csv
        fieldnames = ["order_id", "customer", "product", "quantity", "price", "total", "date", "region"]
        with open(output_path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(records)
        logger.info(f"Successfully saved to {output_path}")
        return True
    except Exception as e:
        logger.critical(f"Failed to save output: {e}")
        return False

# --- Run the pipeline ---
logger.info("=" * 40)
logger.info("HitaVir Tech ETL Pipeline Starting")
logger.info("=" * 40)

start_time = datetime.now()

data = safe_extract("sales_raw.csv")
if data:
    cleaned = safe_transform(data)
    if cleaned:
        success = safe_load(cleaned, "sales_output.csv")

end_time = datetime.now()
duration = (end_time - start_time).total_seconds()

logger.info(f"Pipeline finished in {duration:.2f}s")
logger.info("=" * 40)

print(f"\nLog file saved to: etl_pipeline.log")
PYEOF

python error_handling.py
```

> **HitaVir Tech says:** "In production, errors WILL happen. The question is not if, but when. Good error handling means your pipeline fails gracefully, logs the problem, and makes debugging easy."

## Working with pandas
Duration: 12:00

pandas is the most important Python library for data engineering. It handles tabular data like a spreadsheet on steroids.

```bash
cat > pandas_basics.py << 'PYEOF'
"""
HitaVir Tech - pandas for Data Engineering
"""
import pandas as pd

# --- READ CSV INTO DATAFRAME ---
print("=" * 60)
print("LOADING DATA WITH PANDAS")
print("=" * 60)

df = pd.read_csv("sales_raw.csv")

print(f"Shape: {df.shape[0]} rows x {df.shape[1]} columns")
print(f"\nColumn names: {list(df.columns)}")
print(f"\nData types:\n{df.dtypes}")
print(f"\nFirst 5 rows:")
print(df.head())

# --- EXPLORE DATA ---
print(f"\n{'=' * 60}")
print("DATA EXPLORATION")
print("=" * 60)

print("\nBasic statistics:")
print(df.describe())

print(f"\nMissing values per column:")
print(df.isnull().sum())

print(f"\nUnique products: {df['product'].nunique()}")
print(f"Unique regions: {df['region'].nunique()}")
print(f"Date range: {df['date'].min()} to {df['date'].max()}")

# --- CLEAN DATA ---
print(f"\n{'=' * 60}")
print("DATA CLEANING")
print("=" * 60)

# Remove rows with missing customer or product
df_clean = df.dropna(subset=["customer", "product"])
print(f"After dropping nulls: {len(df_clean)} rows (was {len(df)})")

# Remove invalid data
df_clean = df_clean[df_clean["quantity"] > 0]
df_clean = df_clean[df_clean["price"] > 0]
print(f"After removing invalid: {len(df_clean)} rows")

# --- TRANSFORM DATA ---
print(f"\n{'=' * 60}")
print("DATA TRANSFORMATION")
print("=" * 60)

# Add calculated columns
df_clean = df_clean.copy()
df_clean["total"] = (df_clean["price"] * df_clean["quantity"]).round(2)
df_clean["price_category"] = df_clean["price"].apply(
    lambda p: "Premium" if p >= 200 else ("Mid" if p >= 50 else "Budget")
)

print(df_clean[["order_id", "product", "price", "quantity", "total", "price_category"]])

# --- AGGREGATE DATA ---
print(f"\n{'=' * 60}")
print("DATA AGGREGATION")
print("=" * 60)

# Revenue by region
print("\nRevenue by Region:")
region_summary = df_clean.groupby("region")["total"].agg(["sum", "count", "mean"]).round(2)
region_summary.columns = ["revenue", "orders", "avg_order"]
print(region_summary)

# Revenue by product
print("\nRevenue by Product:")
product_summary = df_clean.groupby("product")["total"].sum().sort_values(ascending=False)
print(product_summary)

# --- SAVE OUTPUT ---
print(f"\n{'=' * 60}")
print("SAVING RESULTS")
print("=" * 60)

df_clean.to_csv("sales_pandas_cleaned.csv", index=False)
print("Saved: sales_pandas_cleaned.csv")

region_summary.to_csv("region_report.csv")
print("Saved: region_report.csv")

print(f"\nTotal revenue: ${df_clean['total'].sum():,.2f}")
print(f"Average order value: ${df_clean['total'].mean():,.2f}")
print(f"Top product: {product_summary.index[0]} (${product_summary.iloc[0]:,.2f})")
PYEOF

python pandas_basics.py
```

> **HitaVir Tech says:** "pandas is to data engineers what a stethoscope is to doctors — you cannot work without it. Learn read_csv, groupby, merge, and apply, and you can handle 90% of data tasks."

## Data Engineering Mini Project — Complete ETL Pipeline
Duration: 15:00

Time to build a **real, production-quality ETL pipeline** that combines everything you have learned.

### The Scenario

HitaVir Tech receives daily sales CSV files. You need to build an automated pipeline that:

1. Reads the raw CSV
2. Validates every record
3. Cleans and transforms the data
4. Generates summary reports
5. Saves outputs with proper logging

```bash
mkdir -p pipeline_project/input pipeline_project/output pipeline_project/logs
```

### The Pipeline Code

```bash
cat > pipeline_project/etl_pipeline.py << 'PYEOF'
"""
HitaVir Tech - Sales Data ETL Pipeline
=======================================
A production-quality ETL pipeline that processes daily sales data.

Usage:
    python etl_pipeline.py

Author: HitaVir Tech
Version: 1.0.0
"""

import csv
import json
import logging
import os
from datetime import datetime
from collections import defaultdict

# ============================================================
# CONFIGURATION
# ============================================================

CONFIG = {
    "input_file": "input/sales_raw.csv",
    "output_file": "output/sales_cleaned.csv",
    "report_file": "output/daily_report.json",
    "rejected_file": "output/rejected_records.csv",
    "log_file": "logs/pipeline.log",
    "rules": {
        "required_fields": ["order_id", "customer", "product", "quantity", "price"],
        "min_quantity": 1,
        "min_price": 0.01,
        "max_price": 100000,
        "valid_regions": ["North", "South", "East", "West"]
    }
}

# ============================================================
# LOGGING SETUP
# ============================================================

def setup_logging(log_file):
    """Configure logging for the pipeline."""
    os.makedirs(os.path.dirname(log_file), exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)-8s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )
    return logging.getLogger("HitaVirETL")

# ============================================================
# EXTRACT
# ============================================================

def extract(filepath, logger):
    """
    Extract: Read raw CSV data from source file.

    Returns:
        list[dict]: List of records, or empty list on failure.
    """
    logger.info(f"[EXTRACT] Reading from {filepath}")

    if not os.path.exists(filepath):
        logger.error(f"[EXTRACT] File not found: {filepath}")
        return []

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            records = list(reader)

        logger.info(f"[EXTRACT] Loaded {len(records)} records with columns: {reader.fieldnames}")
        return records
    except Exception as e:
        logger.critical(f"[EXTRACT] Failed to read file: {e}")
        return []

# ============================================================
# VALIDATE
# ============================================================

def validate_record(record, rules):
    """
    Validate a single record against business rules.

    Returns:
        tuple: (is_valid: bool, errors: list[str])
    """
    errors = []

    # Check required fields
    for field in rules["required_fields"]:
        if not record.get(field, "").strip():
            errors.append(f"Missing required field: {field}")

    # Validate numeric fields
    try:
        qty = int(record.get("quantity", 0))
        if qty < rules["min_quantity"]:
            errors.append(f"Quantity {qty} below minimum {rules['min_quantity']}")
    except ValueError:
        errors.append(f"Invalid quantity: {record.get('quantity')}")

    try:
        price = float(record.get("price", 0))
        if price < rules["min_price"]:
            errors.append(f"Price {price} below minimum {rules['min_price']}")
        if price > rules["max_price"]:
            errors.append(f"Price {price} above maximum {rules['max_price']}")
    except ValueError:
        errors.append(f"Invalid price: {record.get('price')}")

    # Validate region
    region = record.get("region", "").strip()
    if region and region not in rules["valid_regions"]:
        errors.append(f"Invalid region: {region}")

    return len(errors) == 0, errors

# ============================================================
# TRANSFORM
# ============================================================

def transform(records, rules, logger):
    """
    Transform: Clean, validate, and enrich records.

    Returns:
        tuple: (cleaned_records, rejected_records)
    """
    logger.info(f"[TRANSFORM] Processing {len(records)} records")

    cleaned = []
    rejected = []

    for record in records:
        is_valid, errors = validate_record(record, rules)

        if not is_valid:
            record["rejection_reasons"] = "; ".join(errors)
            rejected.append(record)
            logger.warning(f"[TRANSFORM] Rejected order {record.get('order_id', '?')}: {errors}")
            continue

        # Type conversion
        record["quantity"] = int(record["quantity"])
        record["price"] = float(record["price"])

        # Enrichment
        record["total"] = round(record["price"] * record["quantity"], 2)
        record["customer"] = record["customer"].strip().title()
        record["product"] = record["product"].strip().title()

        # Categorization
        if record["total"] >= 1000:
            record["tier"] = "Enterprise"
        elif record["total"] >= 200:
            record["tier"] = "Business"
        else:
            record["tier"] = "Consumer"

        cleaned.append(record)

    logger.info(f"[TRANSFORM] Result: {len(cleaned)} valid, {len(rejected)} rejected")
    return cleaned, rejected

# ============================================================
# LOAD
# ============================================================

def load(cleaned, rejected, config, logger):
    """
    Load: Save cleaned data and rejected records to files.
    """
    os.makedirs("output", exist_ok=True)

    # Save cleaned records
    if cleaned:
        fieldnames = ["order_id", "customer", "product", "quantity",
                       "price", "total", "tier", "date", "region"]
        with open(config["output_file"], "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(cleaned)
        logger.info(f"[LOAD] Saved {len(cleaned)} cleaned records to {config['output_file']}")

    # Save rejected records
    if rejected:
        fieldnames = ["order_id", "customer", "product", "quantity",
                       "price", "date", "region", "rejection_reasons"]
        with open(config["rejected_file"], "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(rejected)
        logger.info(f"[LOAD] Saved {len(rejected)} rejected records to {config['rejected_file']}")

# ============================================================
# REPORT
# ============================================================

def generate_report(cleaned, rejected, duration, config, logger):
    """Generate pipeline run report."""
    total_input = len(cleaned) + len(rejected)
    success_rate = (len(cleaned) / total_input * 100) if total_input > 0 else 0

    # Aggregate metrics
    revenue_by_region = defaultdict(float)
    revenue_by_product = defaultdict(float)
    tier_counts = defaultdict(int)

    for record in cleaned:
        revenue_by_region[record["region"]] += record["total"]
        revenue_by_product[record["product"]] += record["total"]
        tier_counts[record["tier"]] += 1

    report = {
        "pipeline": "HitaVir Tech Sales ETL",
        "run_timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "duration_seconds": round(duration, 2),
        "summary": {
            "total_input": total_input,
            "cleaned": len(cleaned),
            "rejected": len(rejected),
            "success_rate": round(success_rate, 1)
        },
        "revenue": {
            "total": round(sum(r["total"] for r in cleaned), 2),
            "by_region": dict(sorted(revenue_by_region.items())),
            "by_product": dict(sorted(revenue_by_product.items(),
                                       key=lambda x: x[1], reverse=True))
        },
        "tier_distribution": dict(tier_counts)
    }

    with open(config["report_file"], "w") as f:
        json.dump(report, f, indent=2)
    logger.info(f"[REPORT] Saved to {config['report_file']}")

    return report

# ============================================================
# MAIN — ORCHESTRATOR
# ============================================================

def run_pipeline():
    """Main pipeline orchestrator."""
    logger = setup_logging(CONFIG["log_file"])

    logger.info("=" * 60)
    logger.info("HitaVir Tech Sales ETL Pipeline — Starting")
    logger.info("=" * 60)

    start_time = datetime.now()

    # EXTRACT
    raw_data = extract(CONFIG["input_file"], logger)
    if not raw_data:
        logger.error("No data extracted. Pipeline aborted.")
        return

    # TRANSFORM
    cleaned, rejected = transform(raw_data, CONFIG["rules"], logger)

    # LOAD
    load(cleaned, rejected, CONFIG, logger)

    # REPORT
    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()
    report = generate_report(cleaned, rejected, duration, CONFIG, logger)

    # SUMMARY
    logger.info("=" * 60)
    logger.info("PIPELINE COMPLETE")
    logger.info(f"  Input: {report['summary']['total_input']} records")
    logger.info(f"  Cleaned: {report['summary']['cleaned']} records")
    logger.info(f"  Rejected: {report['summary']['rejected']} records")
    logger.info(f"  Success rate: {report['summary']['success_rate']}%")
    logger.info(f"  Total revenue: ${report['revenue']['total']:,.2f}")
    logger.info(f"  Duration: {duration:.2f}s")
    logger.info("=" * 60)


if __name__ == "__main__":
    run_pipeline()
PYEOF
```

### Copy Sample Data and Run

```bash
cp sales_raw.csv pipeline_project/input/
cd pipeline_project
python etl_pipeline.py
```

### Verify Outputs

```bash
echo "--- Cleaned Data ---"
cat output/sales_cleaned.csv

echo -e "\n--- Rejected Records ---"
cat output/rejected_records.csv

echo -e "\n--- Pipeline Report ---"
cat output/daily_report.json

echo -e "\n--- Pipeline Log ---"
cat logs/pipeline.log
```

### Project Structure

```
pipeline_project/
├── etl_pipeline.py          ← Main pipeline script
├── input/
│   └── sales_raw.csv        ← Raw input data
├── output/
│   ├── sales_cleaned.csv    ← Cleaned output
│   ├── rejected_records.csv ← Failed records
│   └── daily_report.json    ← Summary report
└── logs/
    └── pipeline.log         ← Execution log
```

> **HitaVir Tech says:** "This is a real ETL pipeline. It extracts, validates, transforms, loads, reports, and logs. This exact pattern scales from 10 records to 10 million. Add PySpark and you are ready for Big Data."

```bash
cd ~/python-de-learning
```

## Intermediate Concepts
Duration: 10:00

Level up your Python with patterns used daily in data engineering.

```bash
cat > intermediate.py << 'PYEOF'
"""
HitaVir Tech - Intermediate Python for Data Engineering
"""

# ====== LIST COMPREHENSIONS ======
print("=" * 60)
print("LIST COMPREHENSIONS")
print("=" * 60)

# Traditional loop
prices = [999.99, 29.99, 79.99, 449.99, 149.99]
high_value = []
for p in prices:
    if p > 100:
        high_value.append(p)

# Same thing with list comprehension (Pythonic way)
high_value_lc = [p for p in prices if p > 100]
print(f"High value items: {high_value_lc}")

# Transform and filter in one line
discounted = [round(p * 0.9, 2) for p in prices if p > 100]
print(f"10% discount on premium items: {discounted}")

# Dictionary comprehension
products = ["Laptop", "Mouse", "Keyboard", "Monitor"]
prices = [999.99, 29.99, 79.99, 449.99]
catalog = {product: price for product, price in zip(products, prices)}
print(f"\nCatalog: {catalog}")

# ====== LAMBDA FUNCTIONS ======
print(f"\n{'=' * 60}")
print("LAMBDA FUNCTIONS")
print("=" * 60)

# Named function
def calculate_tax(amount):
    return round(amount * 0.18, 2)

# Lambda equivalent (inline function)
tax = lambda amount: round(amount * 0.18, 2)

print(f"Tax on $100: ${tax(100)}")

# Common use: sorting complex data
sales = [
    {"product": "Laptop", "revenue": 4999.95},
    {"product": "Mouse", "revenue": 149.95},
    {"product": "Monitor", "revenue": 449.99},
]

# Sort by revenue (descending)
sorted_sales = sorted(sales, key=lambda x: x["revenue"], reverse=True)
print("\nSales sorted by revenue:")
for s in sorted_sales:
    print(f"  {s['product']}: ${s['revenue']:,.2f}")

# Common use: map and filter
amounts = [100, 250, 50, 800, 30, 1200]
large_with_tax = list(map(lambda x: round(x * 1.18, 2), filter(lambda x: x > 200, amounts)))
print(f"\nLarge amounts with 18% tax: {large_with_tax}")

# ====== BASIC OOP ======
print(f"\n{'=' * 60}")
print("CLASSES (BASIC OOP)")
print("=" * 60)

class DataPipeline:
    """A reusable data pipeline class."""

    def __init__(self, name, source, destination):
        self.name = name
        self.source = source
        self.destination = destination
        self.records = []
        self.status = "initialized"

    def extract(self):
        """Simulate data extraction."""
        self.status = "extracting"
        self.records = [
            {"id": 1, "value": 100},
            {"id": 2, "value": 200},
            {"id": 3, "value": 300},
        ]
        print(f"  [{self.name}] Extracted {len(self.records)} records from {self.source}")
        return self

    def transform(self, multiplier=1.0):
        """Transform records."""
        self.status = "transforming"
        for record in self.records:
            record["value"] = record["value"] * multiplier
        print(f"  [{self.name}] Transformed {len(self.records)} records (x{multiplier})")
        return self

    def load(self):
        """Load records to destination."""
        self.status = "completed"
        print(f"  [{self.name}] Loaded {len(self.records)} records to {self.destination}")
        return self

    def run(self):
        """Run the full pipeline."""
        print(f"\nRunning pipeline: {self.name}")
        return self.extract().transform(multiplier=1.18).load()

    def __str__(self):
        return f"Pipeline('{self.name}', status={self.status}, records={len(self.records)})"

# Use the class
pipeline = DataPipeline(
    name="Sales ETL",
    source="postgres://hitavir-db",
    destination="s3://hitavir-warehouse"
)

pipeline.run()
print(f"Result: {pipeline}")

# ====== WORKING WITH APIs ======
print(f"\n{'=' * 60}")
print("WORKING WITH APIs")
print("=" * 60)

try:
    import requests

    response = requests.get("https://api.github.com/repos/python/cpython")
    if response.status_code == 200:
        data = response.json()
        print(f"Repo: {data['full_name']}")
        print(f"Stars: {data['stargazers_count']:,}")
        print(f"Language: {data['language']}")
        print(f"Open issues: {data['open_issues_count']:,}")
    else:
        print(f"API returned status: {response.status_code}")
except ImportError:
    print("requests not installed — run: pip install requests")
except Exception as e:
    print(f"API call failed: {e}")
PYEOF

python intermediate.py
```

> **HitaVir Tech says:** "List comprehensions, lambdas, and classes are the intermediate trifecta. Comprehensions make your code concise. Lambdas make sorting and filtering elegant. Classes make your pipelines reusable and testable."

## Best Practices and Project Structure
Duration: 5:00

How real data engineering teams organize their code.

```bash
cat > best_practices.py << 'PYEOF'
"""
HitaVir Tech - Python Best Practices for Data Engineering
"""

# ====== NAMING CONVENTIONS ======
# Variables and functions: snake_case
pipeline_name = "sales_etl"
total_record_count = 1500

def calculate_success_rate(total, failed):
    return round((total - failed) / total * 100, 2)

# Classes: PascalCase
class DataPipeline:
    pass

class SalesTransformer:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_RETRY_COUNT = 3
DEFAULT_BATCH_SIZE = 1000
DATABASE_TIMEOUT = 30

# ====== DOCSTRINGS ======
def process_batch(records, batch_size=500):
    """
    Process records in batches.

    Args:
        records (list): List of dictionaries containing record data.
        batch_size (int): Number of records per batch. Defaults to 500.

    Returns:
        list: Processed records.

    Raises:
        ValueError: If records is empty.
    """
    if not records:
        raise ValueError("Records list cannot be empty")

    processed = []
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        processed.extend(batch)
    return processed

print("Best practices loaded successfully!")
print(f"Max retries: {MAX_RETRY_COUNT}")
print(f"Default batch size: {DEFAULT_BATCH_SIZE}")
PYEOF

python best_practices.py
```

### Professional Project Structure

```
hitavir-data-project/
├── README.md                  ← Project documentation
├── requirements.txt           ← Package dependencies
├── .gitignore                 ← Files to exclude from Git
├── setup.py                   ← Package configuration
│
├── src/                       ← Source code
│   ├── __init__.py
│   ├── extract.py             ← Extraction logic
│   ├── transform.py           ← Transformation logic
│   ├── load.py                ← Loading logic
│   ├── validate.py            ← Validation rules
│   └── utils.py               ← Utility functions
│
├── config/                    ← Configuration files
│   ├── dev.yaml
│   ├── staging.yaml
│   └── prod.yaml
│
├── tests/                     ← Test files
│   ├── test_extract.py
│   ├── test_transform.py
│   └── test_validate.py
│
├── data/                      ← Data files (gitignored)
│   ├── input/
│   └── output/
│
└── logs/                      ← Log files (gitignored)
```

> **HitaVir Tech says:** "Code is read 10 times more than it is written. Follow naming conventions, write docstrings, and organize your projects. Your future self and your teammates will thank you."

## Debugging and Troubleshooting
Duration: 5:00

Common issues Windows users face and how to fix them.

### Common Python Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `ModuleNotFoundError` | Package not installed | `pip install package_name` |
| `FileNotFoundError` | Wrong file path | Use `os.path.exists()` to check first |
| `IndentationError` | Mixed tabs and spaces | Use VS Code's "Convert Indentation" |
| `TypeError` | Wrong data type | Use `type()` to debug, convert types |
| `KeyError` | Dict key missing | Use `.get(key, default)` instead of `[key]` |
| `UnicodeDecodeError` | File encoding issue | Add `encoding="utf-8"` to `open()` |

### Windows-Specific Issues

| Issue | Fix |
|-------|-----|
| `python` not found | Use `python3` or reinstall with PATH checked |
| Path uses backslash | Use forward slashes: `"C:/Users/..."` or raw strings: `r"C:\Users\..."` |
| Permission denied | Run terminal as Administrator |
| `venv` won't activate | Use `venv\Scripts\activate` (Command Prompt) or `source venv/Scripts/activate` (Git Bash) |

### Debugging Technique

```python
# When something is wrong, add print statements:
print(f"DEBUG: variable = {variable}")
print(f"DEBUG: type = {type(variable)}")
print(f"DEBUG: len = {len(data)}")

# Or use the built-in debugger:
# python -m pdb your_script.py
```

> **HitaVir Tech says:** "Every bug is a lesson. Read the error message carefully — Python tells you exactly what went wrong and on which line. The traceback is your best debugging friend."

## Python Interview Questions for Data Engineering
Duration: 10:00

These questions are frequently asked in Python Data Engineering interviews at companies hiring through **LinkedIn, Naukri, Indeed**, and at institutes like **Simplilearn, Intellipaat, Coursera, DataCamp, Great Learning**, and **Scaler Academy**. They cover the exact topics you learned in this codelab.

### Category 1 — Python Fundamentals

**Q1: What is the difference between a list and a tuple?**

**Answer:** A list is mutable (can be changed after creation) while a tuple is immutable (cannot be changed). Lists use square brackets `[]`, tuples use parentheses `()`. Use tuples for fixed data like database connection configs `(host, port, db)` and lists for collections that change like rows from a query result. Tuples are slightly faster and use less memory.

**Q2: What are `*args` and `**kwargs`? Give a real example.**

**Answer:** `*args` allows a function to accept any number of positional arguments as a tuple. `**kwargs` allows any number of keyword arguments as a dictionary. Real example: a database connection function uses `**kwargs` so callers can pass `host`, `port`, `ssl`, `timeout` — any combination without the function needing to define every parameter explicitly.

```python
def connect_db(**kwargs):
    host = kwargs.get("host", "localhost")
    port = kwargs.get("port", 5432)
    # flexible — caller decides which params to pass
```

**Q3: What is the difference between `==` and `is`?**

**Answer:** `==` checks if two values are equal (same content). `is` checks if two variables point to the exact same object in memory (same identity). For data engineering: use `==` for value comparison, use `is` only for checking `None` (`if value is None`).

**Q4: What are list comprehensions? Why are they preferred?**

**Answer:** List comprehensions are a concise way to create lists from existing iterables. They are preferred because they are faster than traditional for loops (optimized internally by Python) and more readable for simple transformations.

```python
# Traditional loop
results = []
for x in data:
    if x > 0:
        results.append(x * 2)

# List comprehension (faster, cleaner)
results = [x * 2 for x in data if x > 0]
```

**Q5: Explain mutable vs immutable types with examples.**

**Answer:** Mutable objects can be changed after creation: `list`, `dict`, `set`. Immutable objects cannot: `int`, `float`, `str`, `tuple`, `frozenset`. This matters in data engineering when passing data between functions — mutable objects can be accidentally modified by a function, causing bugs. Use tuples for data that must not change.

### Category 2 — Data Handling and File I/O

**Q6: How do you read a CSV file in Python? Compare csv module vs pandas.**

**Answer:** The `csv` module is built-in and lightweight — good for simple row-by-row processing. pandas `read_csv()` loads the entire file into a DataFrame — good for analysis, transformation, and aggregation. For small files or streaming, use `csv`. For analytics and transformation pipelines, use pandas.

```python
# csv module (row by row, low memory)
import csv
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        process(row)

# pandas (full DataFrame, powerful but uses more memory)
import pandas as pd
df = pd.read_csv("data.csv")
```

**Q7: How do you handle missing values in a dataset?**

**Answer:** Detect with `df.isnull().sum()`. Handle by either: (1) dropping rows: `df.dropna()`, (2) filling with default: `df.fillna(0)` or `df.fillna(method="ffill")`, (3) filling with statistics: `df.fillna(df["column"].mean())`. The strategy depends on business rules — for financial data, you might reject rows; for sensor data, you might forward-fill.

**Q8: What is the difference between `json.load()` and `json.loads()`?**

**Answer:** `json.load()` reads from a file object. `json.loads()` reads from a string. Similarly, `json.dump()` writes to a file, `json.dumps()` converts to a string. The "s" stands for "string."

```python
import json

# From file
with open("config.json") as f:
    data = json.load(f)

# From string
data = json.loads('{"key": "value"}')
```

**Q9: How would you process a 10 GB CSV file that does not fit in memory?**

**Answer:** Use chunked reading with pandas: `pd.read_csv("huge.csv", chunksize=10000)` which returns an iterator of DataFrames. Or use the `csv` module for row-by-row processing. For production, use PySpark or Dask which distribute processing across multiple machines. You can also use generator functions with `yield` to process batches lazily.

### Category 3 — Functions and OOP

**Q10: What is a decorator? Give a data engineering use case.**

**Answer:** A decorator is a function that wraps another function to add behavior without modifying the original. In data engineering, common use cases are: timing pipeline steps (`@timer`), retrying on failure (`@retry(max=3)`), logging function calls (`@log_execution`), and caching results (`@lru_cache`).

```python
def retry(max_attempts=3):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    if attempt == max_attempts - 1:
                        raise
        return wrapper
    return decorator

@retry(max_attempts=3)
def fetch_data_from_api(url):
    # automatically retries up to 3 times on failure
    pass
```

**Q11: What is the difference between `@staticmethod` and `@classmethod`?**

**Answer:** `@staticmethod` does not receive `self` or `cls` — it is a utility function that lives inside a class. `@classmethod` receives `cls` (the class itself) and can create instances. In a data pipeline class, you might use `@classmethod` as a factory method: `Pipeline.from_config("config.yaml")` and `@staticmethod` for utility: `Pipeline.validate_path(path)`.

**Q12: What are generators? When would you use them in data engineering?**

**Answer:** Generators use `yield` instead of `return` and produce values lazily — one at a time, without loading everything into memory. Essential for processing large datasets, reading database cursors row-by-row, or streaming data. They are memory-efficient because only one item exists in memory at a time.

```python
def read_batches(filepath, batch_size=1000):
    batch = []
    with open(filepath) as f:
        for line in f:
            batch.append(line)
            if len(batch) == batch_size:
                yield batch
                batch = []
        if batch:
            yield batch
```

### Category 4 — Error Handling and Production Code

**Q13: How do you handle errors in a production data pipeline?**

**Answer:** Use `try-except` blocks with specific exception types (never bare `except:`). Log errors with the `logging` module (not `print`). Implement retry logic for transient failures (network, database timeouts). Use `finally` blocks for cleanup (closing connections). Store failed records separately for investigation rather than silently dropping them.

**Q14: What is the difference between `raise` and `raise from`?**

**Answer:** `raise` re-raises or creates an exception. `raise NewError() from original_error` chains exceptions — preserving the original traceback while wrapping it in a more meaningful error. This is useful in pipelines to add context: "Failed to process batch 42" while still showing the original "Connection refused" error.

**Q15: How do you implement logging in Python?**

**Answer:** Use the built-in `logging` module with appropriate levels: `DEBUG` for development, `INFO` for normal operations, `WARNING` for unexpected but handled situations, `ERROR` for failures, `CRITICAL` for system-level failures. Configure with `basicConfig()` or handler-based setup for file + console output. Never use `print()` in production pipelines.

### Category 5 — pandas and Data Transformation

**Q16: What is the difference between `loc` and `iloc` in pandas?**

**Answer:** `loc` selects by label (column names, index labels). `iloc` selects by integer position. `df.loc[0:5, "name"]` selects rows 0 through 5 of column "name" (inclusive). `df.iloc[0:5, 0]` selects the first 5 rows of the first column (exclusive of end).

**Q17: How do you merge two DataFrames? Explain join types.**

**Answer:** Use `pd.merge(df1, df2, on="key", how="inner")`. Join types: `inner` (matching rows only), `left` (all from left, matching from right), `right` (all from right), `outer` (all from both). This mirrors SQL JOIN behavior. Use `left` when you want to keep all records from your primary table and enrich with data from a lookup table.

**Q18: How do you handle duplicate rows in pandas?**

**Answer:** Detect with `df.duplicated().sum()`. Remove with `df.drop_duplicates()`. For specific columns: `df.drop_duplicates(subset=["email"])`. Keep first or last: `df.drop_duplicates(keep="last")`. In data engineering, always check for duplicates after merging datasets or loading incremental data.

**Q19: What is the `apply()` function in pandas?**

**Answer:** `apply()` runs a function on every row or column of a DataFrame. Use it for custom transformations that cannot be done with built-in pandas methods. It is slower than vectorized operations but more flexible.

```python
# Apply to each row
df["full_name"] = df.apply(lambda row: f"{row['first']} {row['last']}", axis=1)

# Apply to a column
df["category"] = df["price"].apply(lambda p: "Premium" if p > 500 else "Standard")
```

**Q20: What is the difference between `groupby().agg()` and `groupby().transform()`?**

**Answer:** `agg()` returns a reduced DataFrame (one row per group) — used for summary reports. `transform()` returns a DataFrame with the same shape as the original — each row gets the group's aggregated value. Use `transform()` when you need group statistics as a new column alongside individual rows.

```python
# agg: one row per region (summary)
df.groupby("region")["revenue"].agg(["sum", "mean", "count"])

# transform: adds group mean to every row (enrichment)
df["region_avg"] = df.groupby("region")["revenue"].transform("mean")
```

### Category 6 — Architecture and Best Practices

**Q21: How do you structure a Python data engineering project?**

**Answer:** Use a modular structure separating concerns: `src/` for source code (extract.py, transform.py, load.py), `config/` for environment configs, `tests/` for unit tests, `data/` for input/output (gitignored), `logs/` for pipeline logs. Include `requirements.txt` for dependencies, `.gitignore` for secrets and data files, and `README.md` for documentation.

**Q22: What is the difference between a virtual environment and a conda environment?**

**Answer:** Both isolate project dependencies. `venv` is built into Python, lightweight, and uses pip. Conda manages both Python packages and non-Python dependencies (like C libraries), and can manage Python versions. For data engineering: use `venv` for pure Python projects, use `conda` when you need complex scientific libraries (NumPy with MKL, CUDA for GPU).

**Q23: How do you make a pipeline idempotent?**

**Answer:** Idempotent means running the pipeline twice produces the same result. Techniques: use `INSERT ... ON CONFLICT DO UPDATE` (upsert) instead of plain `INSERT`, use `CREATE TABLE IF NOT EXISTS`, delete-then-insert for full refreshes, use partition overwriting for incremental loads, and always use deterministic transformations (no random values without seeds).

**Q24: What is the difference between ETL and ELT?**

**Answer:** ETL (Extract-Transform-Load) transforms data before loading into the warehouse — used when compute is cheaper at the pipeline level. ELT (Extract-Load-Transform) loads raw data first and transforms inside the warehouse — used with powerful cloud warehouses like BigQuery, Snowflake, Redshift that can handle heavy SQL transformations. Modern data engineering favors ELT.

**Q25: How do you handle secrets (passwords, API keys) in Python projects?**

**Answer:** Never hardcode secrets in source code. Use environment variables (`os.environ["DB_PASSWORD"]`), `.env` files with `python-dotenv` (gitignored), or secret managers (AWS Secrets Manager, Azure Key Vault). Always add `.env` and credential files to `.gitignore`. In CI/CD, use pipeline secrets (GitHub Secrets, GitLab CI Variables).

### Interview Preparation Tips

| Tip | Why |
|-----|-----|
| Always give a **data engineering example** | Shows you understand the domain, not just syntax |
| Mention **trade-offs** | "Lists are flexible but sets are faster for lookups" |
| Talk about **production concerns** | Error handling, logging, memory, scalability |
| Know **pandas deeply** | groupby, merge, apply, pivot_table are asked most |
| Practice **coding on paper** | Many interviews have whiteboard or live coding rounds |
| Understand **Big-O basics** | O(1) vs O(n) matters when processing millions of rows |

> **HitaVir Tech says:** "These 25 questions cover 90% of what you will face in a Python Data Engineering interview. But knowing the answer is not enough — practice explaining them out loud. An interview is a conversation, not a written exam."

## Summary and Next Steps
Duration: 3:00

Congratulations! You have completed **Python for Data Engineering** by **HitaVir Tech**!

### What You Mastered

| Module | Skills |
|--------|--------|
| Basics | Variables, types, operators, f-strings |
| Control Flow | if/else, for/while loops, break/continue |
| Functions | Parameters, returns, validation functions |
| Data Structures | Lists, dicts, sets, tuples, list of dicts |
| File I/O | CSV read/write, JSON handling, log parsing |
| Error Handling | try/except, logging, graceful failures |
| pandas | DataFrames, cleaning, transformation, aggregation |
| ETL Pipeline | Complete extract-transform-load with reporting |
| Intermediate | Comprehensions, lambdas, OOP, APIs |
| Best Practices | Naming, structure, docstrings, .gitignore |

### What to Learn Next

| Topic | Why |
|-------|-----|
| SQL with Python | Database queries using SQLAlchemy |
| Apache Spark (PySpark) | Big Data processing |
| Apache Airflow | Pipeline orchestration |
| Databricks | Cloud data engineering |
| Docker | Containerize your pipelines |
| Unit Testing (pytest) | Test your pipeline code |
| AWS (boto3) | Cloud storage and services |

### The Data Engineer Learning Path

```
Python Basics (you are here!)
    │
    ▼
SQL + Database Design
    │
    ▼
pandas + Data Transformation
    │
    ▼
Apache Spark (PySpark)
    │
    ▼
Airflow (Pipeline Orchestration)
    │
    ▼
Cloud Platforms (AWS / Azure / GCP)
    │
    ▼
Databricks + Delta Lake
```

> **HitaVir Tech says:** "You now have the Python foundation that every data engineer needs. The language is your tool — data is your mission. Go build pipelines that move data, transform businesses, and create value."

## Congratulations
Duration: 1:00

You have successfully completed **Python Programming for Data Engineering** by **HitaVir Tech**!

### What You Built

- A complete development environment
- Multiple hands-on Python scripts
- A production-quality ETL pipeline with logging and error handling
- Data cleaning and transformation workflows
- Automated report generation

### Your Files

```
python-de-learning/
├── venv/
├── requirements.txt
├── test_setup.py
├── basics_variables.py
├── basics_types.py
├── basics_operators.py
├── basics_input.py
├── control_if.py
├── control_loops.py
├── functions.py
├── data_structures.py
├── create_sample_data.py
├── file_csv.py
├── file_json.py
├── file_logs.py
├── error_handling.py
├── pandas_basics.py
├── intermediate.py
├── best_practices.py
├── pipeline_project/
│   ├── etl_pipeline.py
│   ├── input/sales_raw.csv
│   ├── output/
│   └── logs/
└── (data files created during exercises)
```

Keep coding, keep building pipelines, and keep growing with HitaVir Tech!

**Happy engineering!**

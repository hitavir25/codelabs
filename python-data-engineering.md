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

This hands-on codelab is built for **complete beginners from a non-technical background**. Every concept is explained in plain English first, then shown through real Data Engineering examples. You will not just learn Python — you will learn the way data engineers actually use it.

> **Promise to the learner:** If you can use Excel and save a file, you can finish this codelab. We define every term, show every command, and explain every line.

### What You Will Learn

- Python fundamentals (variables, data types, control flow, functions)
- Data structures used in pipelines (lists, dicts, sets, tuples, JSON)
- File handling for Data Engineering (CSV, JSON, log files)
- Error handling and logging for production pipelines
- pandas for data cleaning, transformation, and aggregation
- Building a complete ETL (Extract-Transform-Load) pipeline from scratch
- Interview-ready Python concepts for Data Engineering jobs

### What You Will Build

A complete **Sales Data ETL Pipeline** for HitaVir Tech:

```
  Raw CSV Data → Extract → Clean → Transform → Aggregate → Report
       │            │        │          │           │          │
  sales_raw.csv  Load file  Fix nulls  Add cols   Summarize  output.csv
```

### Skills You Will Gain

| Skill | Level |
|-------|-------|
| Python syntax, variables, types | Beginner |
| Control flow (if/else, loops) | Beginner |
| Functions and modular code | Beginner |
| Data structures (lists, dicts, sets, tuples) | Beginner |
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
4. **Industry standard** — required in 95% of Data Engineering job postings
5. **Automation** — script anything from file processing to API calls

### Quick Glossary — Bookmark This

You will see these words throughout the codelab. Read them once now; they will sink in as you practice.

| Term | Plain-English meaning | Used for in Data Engineering |
|------|-----------------------|-------------------------------|
| **Script** | A `.py` file that runs Python code top-to-bottom | Running an ETL job, cleaning a CSV |
| **Variable** | A named container for a value | Holding a record count, file path, status |
| **Data type** | The kind of value (number, text, true/false) | Validating that "price" is a number |
| **Function** | A reusable block of code with a name | `extract()`, `clean()`, `load()` |
| **Argument** | A value you pass into a function | `read_csv("sales.csv")` — the filename is an argument |
| **Return value** | What a function gives back to you | A cleaned list, a row count, a DataFrame |
| **List** | An ordered collection in `[ ]` brackets | A list of rows from a CSV |
| **Dictionary** | Key-value pairs in `{ }` braces | One row of data, a config file |
| **Loop** | Repeating an action for each item | Looping over every row in a file |
| **Library** | Pre-written Python code you import | `pandas`, `csv`, `json`, `logging` |
| **DataFrame** | A spreadsheet inside Python (from pandas) | The main object data engineers work with |
| **ETL** | **E**xtract → **T**ransform → **L**oad — the standard pipeline pattern | Reading raw data, cleaning it, saving the clean version |
| **CSV** | Comma-Separated Values — a plain-text spreadsheet | The most common file format in Data Engineering |
| **JSON** | JavaScript Object Notation — text format for nested data | API responses, pipeline configs |
| **Pipeline** | A sequence of steps that move and transform data | Your daily sales-data job |
| **Log** | A line-by-line record of what your program did | Debugging failures, audit trails |

### Estimated Duration

**5–7 hours total** — go at your own pace. Each section builds on the last.

> **HitaVir Tech says:** "Python is not just a programming language — it is the glue that holds modern data platforms together. Master it, and every data tool becomes accessible to you."

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Explain why Python is the **#1 language** in Data Engineering
- Define every term in the Glossary (script, variable, ETL, DataFrame, etc.) in plain English
- Describe what you will build by the end of this codelab — a real Sales ETL Pipeline
- Estimate your study plan around the ~5–7 hour total duration

### PEP 8 — The Style Promise You Make Today

This codelab is built on top of **PEP 8**, the universal Python Style Guide. From this page onward, you commit to:

- Treating PEP 8 not as a suggestion but as the **bare minimum of professionalism**
- Writing code that humans (your teammates) can read first, machines second
- Running `black` and `flake8` on every script before you call it "done"

> **Inspiration for the road ahead:**
>
> *"Programs must be written for people to read, and only incidentally for machines to execute."*
> — Harold Abelson, *Structure and Interpretation of Computer Programs*

## Prerequisites
Duration: 3:00

### Required

- A computer running **Windows 10 or 11**
- Administrator access (to install software)
- At least **2 GB** free disk space
- Internet connection (for downloading packages)

### No Prior Knowledge Needed

This codelab assumes **zero Python experience and zero programming background**. We start from installing Python itself.

### Helpful but Not Required

- Basic familiarity with the command line (covered in our Linux Basics codelab)
- Understanding of what data and files are (you already do — every Excel sheet is data!)

> **HitaVir Tech says:** "If you can use a calculator and save a file, you are ready to learn Python. Everything else, we teach you step by step."

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- List the **hardware and software prerequisites** (Windows 10/11, 2 GB free disk, internet)
- Explain that **no prior programming knowledge** is required to start
- Recognise that the only "must-have" skills are using a computer and saving a file

### PEP 8 — Set Yourself Up for Strict Style From Day One

Before you write a single line of Python, decide that **every** file you create in this codelab will follow PEP 8. The earliest habits are the strongest.

- Plan to indent with **4 spaces** (never tabs)
- Plan to keep lines **≤ 88 characters** wide (the Black formatter default)
- Plan to install **`black`** and **`flake8`** in the very next page

> **Inspiration for the road ahead:**
>
> *"The expert in anything was once a beginner."*
> — Helen Hayes

## Environment Setup
Duration: 10:00

**What is an "environment"?**

An environment is the set of tools your code runs inside — Python itself, an editor to write code in, and a sandbox to install libraries. We will set up all three on Windows.

Let us set up a professional Python development environment.

### Step 1 — Install Python

Go to [https://www.python.org/downloads/](https://www.python.org/downloads/) and download the latest Python 3.x installer.

**CRITICAL during installation:**

1. **Check the box** that says **"Add Python to PATH"** (at the bottom of the first screen)
2. Click **"Install Now"**

**What does "Add to PATH" mean?**

PATH is a list of folders Windows searches when you type a command. If Python is on PATH, typing `python` anywhere in any terminal works. If you skip this, Python will be installed but invisible to your terminal.

If you miss the PATH checkbox, Python commands will not work — reinstall and check it.

### Step 2 — Verify Python Installation

Open **Git Bash** (or Command Prompt) and run:

```bash
python --version
```

**Expected output:**

```
Python 3.12.3
```

Now check **pip**, Python's package installer (it ships with Python):

```bash
pip --version
```

**Expected output:**

```
pip 24.0 from ... (python 3.12)
```

**What is pip?**

`pip` is the tool that downloads and installs Python libraries (extra code other people wrote that you can reuse). Think of it like the App Store, but for Python code.

### Step 3 — Install VS Code

VS Code is a free code editor from Microsoft. Download from [https://code.visualstudio.com/](https://code.visualstudio.com/) and install with default settings.

**Why VS Code?**

A code editor is a souped-up Notepad: it color-codes your Python so it is easier to read, catches typos as you type, and runs your scripts with one click.

### Step 4 — Install the Python Extension for VS Code

1. Open VS Code
2. Press `Ctrl + Shift + X` (Extensions panel)
3. Search for **"Python"** by Microsoft
4. Click **Install**

### Step 5 — Set VS Code to the Dark+ Theme

Every code example in this codelab is written and explained against the **Dark+ (default dark)** theme. Set the same theme so what you see on screen matches what you see here.

1. Press `Ctrl + K` then `Ctrl + T` to open the Color Theme picker
2. Choose **"Dark+ (default dark)"** (or **"Default Dark Modern"** on newer VS Code versions)
3. Press `Enter` to confirm

Why dark theme for long study sessions? Less eye strain, better contrast on syntax colors, and it matches every screenshot in this codelab.

#### What Your Code Will Look Like in VS Code Dark+

When you paste any Python code from this codelab into a `.py` file in VS Code, the syntax highlighter colors it like this:

| Token type | Color in Dark+ | Example |
|------------|----------------|---------|
| **Keywords** | pink / magenta | `def`, `if`, `for`, `return`, `import`, `class` |
| **Strings** | orange / salmon | `"HitaVir Tech"`, `'sales.csv'` |
| **Numbers** | light green | `1500`, `99.7`, `0.05` |
| **Function names** (definition) | yellow | `extract`, `transform`, `validate_record` |
| **Function calls** | yellow | `print(...)`, `len(...)` |
| **Built-ins** | sky blue | `int`, `float`, `str`, `True`, `False`, `None` |
| **Comments** | green (italic) | `# this is a comment` |
| **Class names** | teal / mint | `DataPipeline`, `SalesTransformer` |
| **Operators** | white | `+ - * / = == != < >` |
| **Decorators** | yellow | `@timer`, `@retry` |

If your code shows up white-on-black with no colors, the Python extension is probably not active — make sure the file is saved with a `.py` extension and the bottom-right of VS Code shows "Python" as the language mode.

### Step 6 — Create Your Project Folder

```bash
mkdir -p ~/python-de-learning
cd ~/python-de-learning
```

**What did that do?**

`mkdir` makes a new folder. `~` is your home folder (e.g., `C:/Users/YourName`). `cd` moves into the folder. From now on, every file you create lives here.

### Step 7 — Create a Virtual Environment

```bash
python -m venv venv
```

**What is a virtual environment, and why?**

A virtual environment (`venv`) is a private sandbox of Python libraries for **this project only**. Different projects need different versions of libraries — without a venv, they would conflict. The venv folder holds its own Python and its own libraries, isolated from everything else.

Activate it:

**Git Bash:**

```bash
source venv/Scripts/activate
```

**Command Prompt:**

```cmd
venv\Scripts\activate
```

You should see `(venv)` at the beginning of your prompt — that means it is active:

```
(venv) user@COMPUTER ~/python-de-learning
$
```

### Step 8 — Install Essential Packages

```bash
pip install pandas numpy requests
```

**What did we just install?**

- **pandas** — the spreadsheet-in-Python library every data engineer uses
- **numpy** — fast number-crunching (pandas is built on top of it)
- **requests** — for calling APIs to pull data over the internet

Save your dependency list so anyone can recreate your environment:

```bash
pip freeze > requirements.txt
cat requirements.txt
```

**What is requirements.txt?**

`requirements.txt` is a plain-text file listing every library your project uses, with versions. When you share your project, others run `pip install -r requirements.txt` to get the exact same setup.

### Step 9 — Verify Everything Works

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

### Setup Checkpoint — You Should Now Be Able To...

```
+--------------------------------------------------------------+
|  [ ]  Open a terminal and run `python --version` successfully |
|  [ ]  Activate a virtual environment and see (venv) prompt    |
|  [ ]  Run `pip install pandas` without errors                 |
|  [ ]  Open VS Code and run a .py file with one click          |
|  [ ]  Recreate this setup on any new Windows machine          |
+--------------------------------------------------------------+
```

If any box is unchecked, revisit the step above before moving on.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- **Install Python** with PATH enabled and verify with `python --version`
- Use **pip** to install third-party libraries
- **Install VS Code**, the Python extension, and switch to **Dark+ (default dark)** theme
- Create a **virtual environment** (`venv`) and activate it
- Run `pip install pandas` inside the venv without errors
- Recreate this entire setup on any new Windows machine

### PEP 8 — Configure Your Editor to Enforce Style Automatically

A great environment is one where **PEP 8 is enforced for you, every save**. Set this up *now* — never type indentation by hand again.

- In VS Code, set **Editor: Tab Size = 4** and **Insert Spaces = true**
- Search settings for **Render Whitespace** → set to `all` (so tabs vs. spaces are visible)
- Install the **Black Formatter** and **Flake8** extensions
- Enable **Format On Save** with Black as the default formatter
- Group your imports: stdlib → third-party → local, **one blank line between groups**

> **Inspiration for the road ahead:**
>
> *"Give me six hours to chop down a tree, and I will spend the first four sharpening the axe."*
> — Abraham Lincoln

## PEP 8 — Python's Style Guide for Professional Code
Duration: 15:00

**What is PEP 8?**

PEP 8 is the official **Style Guide for Python Code** — a set of rules that tells you HOW to format your code so every Python developer in the world can read it. PEP stands for "Python Enhancement Proposal." PEP 8 was written in 2001 by Guido van Rossum (Python's creator) and is the universal standard.

Read the full document any time at: [https://peps.python.org/pep-0008/](https://peps.python.org/pep-0008/)

**Why does this matter for Data Engineers?**

Code is read 10 times more than it is written. Every team you join — banks, startups, FAANG, consultancies — expects PEP 8-compliant code. Tools like `black`, `flake8`, `ruff`, and `pylint` check it automatically in CI/CD. If your pull request fails the style check, it does not merge.

### The Big Picture — The 7 Pillars of PEP 8

```
+-----------------------------------------------------------------+
|                  THE 7 PILLARS OF PEP 8                         |
+-----------------------------------------------------------------+
|   1. Indentation        4 spaces, never tabs                    |
|   2. Line Length        79 chars (88 with Black formatter)      |
|   3. Imports            Top of file, grouped, alphabetized      |
|   4. Naming             snake_case, PascalCase, UPPER_SNAKE     |
|   5. Whitespace         Around operators, after commas          |
|   6. Comments           Block, inline, docstrings               |
|   7. Recommendations    `is None`, `isinstance`, `enumerate`    |
+-----------------------------------------------------------------+
```

Let us walk through each pillar with Data Engineering examples.

### Pillar 1 — Indentation

> **The rule:** **4 spaces** per indentation level. Never tabs. Never mix.

Python uses indentation to know what code is "inside" a function, loop, or `if`. Consistent indentation is not a suggestion — it is a syntax requirement.

**CORRECT — 4 spaces per level**

```python
def transform(records):
    for record in records:
        if record["valid"]:
            record["total"] = record["price"] * record["quantity"]
    return records
```

**WRONG — 2 spaces (works but breaks the standard)**

```python
def transform(records):
  for record in records:
    if record["valid"]:
      record["total"] = record["price"] * record["quantity"]
  return records
```

**FATAL — mixing tabs and spaces (Python crashes with `TabError`)**

```python
def transform(records):
    for record in records:    # ← spaces
        if record["valid"]:   # ← tab here = invisible bug
            ...
```

> **VS Code fix:** Open Settings, search for `render whitespace`, set it to `all`. Tabs and spaces become visible so you can spot the mix instantly.

### Pillar 2 — Line Length

**The rule:**

- **PEP 8 default**: 79 characters (a 1980s legacy from VT100 terminals)
- **Black formatter**: 88 characters (the modern compromise)
- **Many teams**: 120 characters (matches a wide monitor)

Pick one limit per project and stick to it. Long lines are painful to review side-by-side in a pull request diff.

**WRONG — 130+ characters, hard to scan**

```python
result = pd.merge(sales_df, customer_df, left_on="customer_id", right_on="id", how="left", validate="many_to_one")
```

**CORRECT — wrapped at 88 chars, every argument on its own line**

```python
result = pd.merge(
    sales_df,
    customer_df,
    left_on="customer_id",
    right_on="id",
    how="left",
    validate="many_to_one",
)
```

### Pillar 3 — Imports

**The rule:** Imports go at the **top of the file**, on **separate lines**, grouped in this order, with **one blank line** between groups:

1. **Standard library** — `os`, `csv`, `json`, `logging`
2. **Third-party libraries** — `pandas`, `numpy`, `requests`
3. **Local modules** — `from src.transform import clean`

**CORRECT — three groups, separated by blank lines**

```python
import csv
import json
import logging
from datetime import datetime

import numpy as np
import pandas as pd

from src.extract import extract_csv
from src.transform import clean_records
```

**WRONG — common beginner mistakes**

```python
from pandas import *           # wildcard pollutes the namespace
import os, sys, json           # multiple imports on one line
import pandas, csv, datetime   # mixes stdlib and third-party
```

### Pillar 4 — Naming Conventions

> **The naming cheat sheet that fits in your head:**

| Element | Convention | Data Engineering example |
|---------|------------|---------------------------|
| Variable | `snake_case` | `total_records`, `customer_id` |
| Function | `snake_case` | `read_csv()`, `validate_record()` |
| Class | `PascalCase` | `DataPipeline`, `SalesTransformer` |
| Constant | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `BATCH_SIZE` |
| Module / file | `snake_case.py` | `etl_pipeline.py`, `validators.py` |
| Package / folder | `lowercase` | `src/`, `config/` |
| Internal (private) | `_leading_underscore` | `_internal_cache`, `_helper()` |
| Strongly private | `__double_underscore` | `__name_mangled` (advanced) |

**CORRECT**

```python
MAX_BATCH_SIZE = 1000   # constant — UPPER_SNAKE_CASE

def calculate_total(price, quantity):   # function — snake_case
    return price * quantity

class SalesPipeline:                    # class — PascalCase
    def __init__(self, source_path):
        self.source_path = source_path
        self._records_cache = []        # internal — leading underscore
```

**WRONG**

```python
maxBatchSize = 1000           # camelCase is JavaScript, not Python
def CalculateTotal(p, q):     # PascalCase belongs to classes
    return p * q
class sales_pipeline:         # snake_case belongs to functions/vars
    pass
```

> **PITFALL:** Single-letter variables (`x`, `i`, `tmp`, `c`) are acceptable inside short loops or list comprehensions only. In a real pipeline, `customer_id` always beats `c`. Future-you will thank present-you.

### Pillar 5 — Whitespace

> **Where to use spaces (and where NOT to):**

```python
# CORRECT — spaces around binary operators
total = price * quantity + tax

# CORRECT — space after every comma
process(records, batch_size, retries)

# CORRECT — spaces around assignment in normal code
threshold = 0.05

# CORRECT — NO spaces around = in keyword arguments / defaults
def connect(host, port=5432):
    pass

connect(host="localhost", port=5432)

# CORRECT — NO spaces inside brackets
records[0]
{"key": "value"}
```

```python
# WRONG — common whitespace mistakes
total=price*quantity+tax            # missing spaces around operators
process(records,batch_size,retries) # missing spaces after commas
threshold=0.05                       # missing spaces around =
def connect(host, port = 5432):     # extra spaces around = in default
    pass
records[ 0 ]                         # extra spaces inside brackets
{ "key" : "value" }                  # extra spaces inside braces
```

### Pillar 6 — Comments and Docstrings

> **Three kinds of comments — know when to use which:**

| Type | Where | Purpose |
|------|-------|---------|
| Block comment | Above code, full line(s) starting with `#` | Explain WHY a block exists |
| Inline comment | After code, 2+ spaces from it, then `#` | Clarify a tricky line |
| Docstring | First lines of function/class/module, triple-quoted | API contract — args, returns, raises |

```python
# CORRECT — block comment explains WHY
# Group every order by region and sum the revenue.
# Used by the daily executive dashboard.
revenue_by_region = df.groupby("region")["total"].sum()


def validate_record(record, rules):
    """
    Validate a single record against business rules.

    Args:
        record (dict): The record to check.
        rules (dict): Validation rules from config.

    Returns:
        tuple: (is_valid: bool, errors: list[str])
    """
    ...
```

```python
# CORRECT — inline comment explains WHY, not WHAT
total = price * quantity  # tax added later by enrichment step

# WRONG — useless restatement of the code
total = price * quantity  # multiply price by quantity
```

### Pillar 7 — Programming Recommendations

> **The "Pythonic" rules every Data Engineer should know:**

| Topic | CORRECT | WRONG |
|-------|---------|-------|
| Compare to None | `if value is None:` | `if value == None:` |
| Type check | `if isinstance(x, (int, float)):` | `if type(x) == int or type(x) == float:` |
| Empty check | `if not records:` | `if len(records) == 0:` |
| Index loop | `for i, record in enumerate(records):` | `for i in range(len(records)):` |
| Parallel walk | `for name, age in zip(names, ages):` | indexing both lists by `i` |
| Boolean test | `if is_valid:` | `if is_valid == True:` |
| String join | `", ".join(items)` | `s = ""; for x in items: s += x + ", "` |
| Default dict get | `config.get("port", 5432)` | `if "port" in config: ... else: ...` |

### The PEP 8 Toolchain — Tools That Check (and Fix) Your Code

You do not memorize PEP 8 by heart — you install tools that check (and even fix) it for you.

| Tool | What it does | Install |
|------|-------------|---------|
| **`black`** | Auto-formats your code to PEP 8 (opinionated, one true style) | `pip install black` |
| **`isort`** | Sorts and groups imports correctly | `pip install isort` |
| **`flake8`** | Reports PEP 8 violations | `pip install flake8` |
| **`ruff`** | Modern, fast linter+formatter (replaces black + flake8 + isort) | `pip install ruff` |
| **`mypy`** | Type-checks your annotations | `pip install mypy` |

**The 60-second setup for any DE project:**

```bash
# Install everything
pip install black isort flake8 ruff

# Auto-format your code (run before every commit)
black .
isort .

# Or use the modern, single-tool approach
ruff format .
ruff check . --fix
```

Add these to a `requirements-dev.txt` so every teammate uses the same versions.

### Putting It All Together — A Real Refactor

The same logic, before and after PEP 8 is applied. Read both — feel the difference.

**BEFORE — works, but painful**

```python
import pandas as pd,numpy as np,csv,json,logging
def TransformData( records,Threshold=100 ):
  Cleaned=[]
  for i in range(len(records)):
    r=records[i]
    if r["price"]==None:continue
    if r["price"]>Threshold:
      r["total"]=r["price"]*r["qty"];r["category"]="premium"
      Cleaned.append( r )
  return Cleaned
```

**AFTER — PEP 8 compliant**

```python
import csv
import json
import logging

import numpy as np
import pandas as pd


def transform_data(records, threshold=100):
    """Filter premium records and compute totals."""
    cleaned = []
    for record in records:
        if record["price"] is None:
            continue
        if record["price"] > threshold:
            record["total"] = record["price"] * record["qty"]
            record["category"] = "premium"
            cleaned.append(record)
    return cleaned
```

#### What changed?

| Issue in BEFORE | Fix in AFTER |
|------------------|--------------|
| Imports on one line, mixed groups | One per line, grouped, alphabetized |
| `TransformData` (PascalCase) | `transform_data` (snake_case) |
| `Threshold=100` (mixed case + spaces) | `threshold=100` (snake_case, no space around `=`) |
| 2-space indent | 4-space indent |
| `r` is too cryptic | `record` (descriptive) |
| `==None` | `is None` |
| `range(len(records))` | direct iteration over `records` |
| Two statements on one line (`;`) | One per line |
| No docstring | Docstring describing intent |

### Try It — Format the Bad Code Yourself

```bash
# Save the BAD example into a file:
cat > bad_style.py << 'PYEOF'
import pandas as pd,numpy as np,csv,json,logging
def TransformData( records,Threshold=100 ):
  Cleaned=[]
  for i in range(len(records)):
    r=records[i]
    if r["price"]==None:continue
    if r["price"]>Threshold:
      r["total"]=r["price"]*r["qty"];r["category"]="premium"
      Cleaned.append( r )
  return Cleaned
PYEOF

# Install black and run it:
pip install black
black bad_style.py

# Open the file — it has been auto-fixed for indentation, spacing, and line breaks.
# (Naming and the `==None` are flagged by flake8, not by black.)

pip install flake8
flake8 bad_style.py
```

You will see flake8 print the remaining issues — naming and `== None`. Fix those by hand and run flake8 again until it prints nothing. **That silence is the goal.**

### PEP 8 Cheat Card — Tape This Above Your Monitor

```
+----------------------------------------------------------+
|  PEP 8 QUICK REFERENCE  -  for Data Engineers            |
+----------------------------------------------------------+
|  Indent       | 4 spaces, no tabs                        |
|  Line length  | 79  (or 88 if using Black)               |
|  Blank lines  | 2 between top-level defs, 1 between meth |
|  Imports      | stdlib  ->  third-party  ->  local       |
|  Strings      | "double quotes" preferred for text       |
|  Variables    | snake_case                               |
|  Functions    | snake_case()                             |
|  Classes      | PascalCase                               |
|  Constants    | UPPER_SNAKE                              |
|  Privates     | _leading_underscore                      |
|  None check   | `if x is None:`  not  `== None`          |
|  Type check   | `isinstance(x, int)`  not  `type(x)==int`|
|  Empty check  | `if not records:`  not  `len() == 0`     |
|  Format       | run `black .` before every commit        |
|  Lint         | run `flake8 .` or `ruff check .`         |
+----------------------------------------------------------+
```

### Best-Practice Standards Beyond PEP 8

PEP 8 is style. These are the **engineering practices** every Data Engineer follows on top of it.

| Practice | Why it matters in DE |
|----------|----------------------|
| **Type hints** (`def f(x: int) -> str:`) | Catch type bugs before runtime; IDE autocomplete |
| **Docstrings on every public function** | New teammates can read the API without reading the body |
| **One function = one job** (Single Responsibility) | Easier to test, easier to reuse |
| **No magic numbers** | `THRESHOLD = 100` at the top, not `if x > 100:` buried in code |
| **Fail loudly, log clearly** | Silent failures destroy trust in pipelines |
| **Keep functions under ~50 lines** | If it does not fit on one screen, split it |
| **Pure functions when possible** | Same input, same output, no side effects = trivial to test |
| **Use `pathlib` over `os.path`** | Modern, cross-platform, readable |
| **F-strings over `%` and `.format()`** | Readable, fast, the recommended style since Python 3.6 |
| **Never `except:`; always `except Exception` or specific** | Bare `except` swallows `Ctrl-C` and hides bugs |

### PEP 8 Checkpoint — You Should Now Be Able To...

```
+----------------------------------------------------------------+
|  [ ]  Explain what PEP 8 is and why it exists                  |
|  [ ]  Apply 4-space indentation correctly                      |
|  [ ]  Group imports in stdlib / third-party / local order      |
|  [ ]  Pick the right naming style for vars, funcs, classes     |
|  [ ]  Place spaces around operators but not in default params  |
|  [ ]  Write a function with a proper docstring                 |
|  [ ]  Run `black` and `flake8` to auto-check your code         |
+----------------------------------------------------------------+
```

> **HitaVir Tech says:** "PEP 8 is to Python what tabs and bullet points are to a resume — non-negotiable polish. Once your editor formats your code with `black` on every save, you stop thinking about style and focus on logic. That is the goal."

### Assignment 0 — Style-Refactor Drill

**Goal:** Take the bad-style code from this section and clean it up by hand. Then verify with the tools.

**Tasks:**

1. Create a new file `assignment_00_pep8.py` and paste in this messy code:

```python
import pandas as pd,numpy as np,csv,json,logging
def TransformData( records,Threshold=100 ):
  Cleaned=[]
  for i in range(len(records)):
    r=records[i]
    if r["price"]==None:continue
    if r["price"]>Threshold:
      r["total"]=r["price"]*r["qty"];r["category"]="premium"
      Cleaned.append( r )
  return Cleaned
```

2. **Without running tools yet**, rewrite it by hand to fix:
   - Indentation (4 spaces)
   - Imports (one per line, grouped: stdlib, third-party, local)
   - Function name (`snake_case`)
   - Parameter name (`threshold`, lowercase, no spaces around `=`)
   - Variable names (`record` instead of `r`, `cleaned` instead of `Cleaned`)
   - Loop pattern (use `for record in records:`, not `range(len(...))`)
   - `== None` -> `is None`
   - Two statements per line -> one per line
   - Add a docstring
3. Now install and run the tools:

```bash
pip install black flake8
black assignment_00_pep8.py
flake8 assignment_00_pep8.py
```

4. Fix any remaining `flake8` warnings until it prints **nothing**.

**Success criteria:**

- [ ] All 9 issues from the "what changed" table fixed by hand
- [ ] `black` makes no further changes (file is already formatted)
- [ ] `flake8` reports zero warnings
- [ ] Function still produces the same output for the same input

**Stretch goal:** Add type hints (`list[dict]`, `int`, etc.) and run `mypy` to confirm they are correct.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Explain what **PEP 8** is, who wrote it (Guido van Rossum, 2001), and why it is universal
- Apply all **7 Pillars** of PEP 8 (indentation, line length, imports, naming, whitespace, comments, recommendations)
- Pick the right naming style: `snake_case`, `PascalCase`, `UPPER_SNAKE`, `_private`
- Run `black` to auto-format and `flake8` to lint until **flake8 prints nothing**
- Recognise the **engineering practices beyond PEP 8** — type hints, docstrings, single responsibility, no magic numbers

### Your Lifetime PEP 8 Commitment

From this page on, every single Python file you write in this codelab — and beyond — will be:

- Auto-formatted with **`black`** before commit
- Lint-clean under **`flake8`** (zero warnings)
- Reviewed against the **PEP 8 Cheat Card** above

> **Inspiration for the road ahead:**
>
> *"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."*
> — Martin Fowler

## Python Basics — Variables and Data Types
Duration: 12:00

**What is a variable?**

A variable is a **name that points to a value**. Think of it as a labeled box: you write a label on the box (the variable name), put something inside (the value), and later refer to the box by its label.

Example: `total_records = 15000` means "make a labeled box named `total_records` and put the number 15000 inside it."

**What is a data type?**

The data type tells Python **what kind of value** is in the box — a number, some text, a true/false flag, etc. Python figures this out automatically when you assign a value.

### Visual Mental Model — Variables in Memory

```
        Your code                   What Python does in memory
        ---------                   --------------------------

   pipeline_name = "Sales ETL"
                                    +-----------------+      +-----------+
   total_records = 15000            | pipeline_name   | ---> | "Sales ETL"|
                                    +-----------------+      +-----------+
   success_rate  = 99.7
                                    +-----------------+      +-----------+
   is_production = True             | total_records   | ---> |   15000   |
                                    +-----------------+      +-----------+
                                    +-----------------+      +-----------+
                                    | success_rate    | ---> |   99.7    |
                                    +-----------------+      +-----------+
                                    +-----------------+      +-----------+
                                    | is_production   | ---> |   True    |
                                    +-----------------+      +-----------+

           NAME (label)                         VALUE (the data)
```

The variable name is a sticker on a box. Python remembers which box each sticker is attached to.

Let us write real Python code. Create a new file for each section.

### The Five Core Data Types You Use Every Day in Data Engineering

| Type | Python name | Example | What it represents in DE |
|------|-------------|---------|--------------------------|
| **String** | `str` | `"sales_etl"` | Text — names, file paths, log messages, column names |
| **Integer** | `int` | `15000` | Whole numbers — row counts, IDs, ports, batch sizes |
| **Float** | `float` | `99.7` | Decimal numbers — prices, percentages, rates |
| **Boolean** | `bool` | `True` / `False` | Yes/no flags — `is_valid`, `has_errors` |
| **None** | `NoneType` | `None` | "No value yet" — equivalent to `NULL` in databases |

### Variables — Storing Data

```bash
cat > basics_variables.py << 'PYEOF'
# ============================================
# HitaVir Tech - Python Variables
# ============================================
# This script shows the five core data types
# you will use in every data pipeline.

# --- Strings — text data (names, cities, log messages) ---
pipeline_name = "HitaVir Sales ETL"
data_source = "postgres"
status = "running"

print(f"Pipeline: {pipeline_name}")
print(f"Source: {data_source}")
print(f"Status: {status}")

# --- Integers — whole numbers (counts, IDs, ports) ---
total_records = 15000
batch_size = 500
port = 5432

print(f"\nTotal records: {total_records}")
print(f"Batch size: {batch_size}")
print(f"Database port: {port}")

# --- Floats — decimal numbers (percentages, measurements) ---
success_rate = 99.7
processing_time = 3.45
data_quality_score = 0.95

print(f"\nSuccess rate: {success_rate}%")
print(f"Processing time: {processing_time}s")
print(f"Quality score: {data_quality_score}")

# --- Booleans — True/False (flags, conditions) ---
is_production = True
has_errors = False
pipeline_active = True

print(f"\nProduction mode: {is_production}")
print(f"Has errors: {has_errors}")
print(f"Pipeline active: {pipeline_active}")

# --- None — represents "no value" (NULL in databases) ---
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

**What is an f-string?**

An f-string (formatted string) is text starting with `f"..."` that lets you drop variables straight into the text using `{ }`. Example: `f"Total: {total_records}"` becomes `"Total: 15000"`. This is the modern, recommended way to build strings in Python.

### Naming Rules for Variables

| Rule | Good | Bad |
|------|------|-----|
| Use lowercase with underscores | `total_records` | `TotalRecords`, `totalrecords` |
| Start with a letter or underscore | `_internal`, `count` | `1count`, `2records` |
| Be descriptive | `customer_email` | `x`, `tmp`, `data1` |
| Avoid Python keywords | `pipeline_class` | `class`, `if`, `def` |

### Type Checking and Conversion

**What is type conversion?**

Often a value comes in one type but you need it in another. For example, when reading a CSV, every cell starts as a string `"500"`. Before you can add it, you must convert it to an integer `500`. This is type conversion.

```bash
cat > basics_types.py << 'PYEOF'
# ============================================
# HitaVir Tech - Type Checking & Conversion
# ============================================

# --- Check the type of a variable ---
record_count = 1500
pipeline_name = "ETL Pipeline"
is_active = True

print(f"type of record_count: {type(record_count)}")   # <class 'int'>
print(f"type of pipeline_name: {type(pipeline_name)}") # <class 'str'>
print(f"type of is_active: {type(is_active)}")         # <class 'bool'>

# --- String to integer (e.g., reading CSV columns) ---
raw_value = "2500"            # CSV cells are always strings
numeric_value = int(raw_value)
print(f"\nConverted '{raw_value}' to integer: {numeric_value}")

# --- Integer to string (e.g., building log messages) ---
count = 1500
message = "Processed " + str(count) + " records"
print(message)

# --- String to float (e.g., parsing decimal data) ---
price_str = "29.99"
price = float(price_str)
print(f"Price: ${price}")

# --- f-strings: the recommended way to build strings ---
name = "HitaVir Tech"
records = 5000
time_taken = 2.3
print(f"\n{name} processed {records} records in {time_taken}s")
PYEOF

python basics_types.py
```

### Operators

**What is an operator?**

An operator is a symbol that performs an action on values: `+` adds, `==` compares, `and` combines two truths. Operators are how you do math, compare data, and check conditions in your pipeline.

```bash
cat > basics_operators.py << 'PYEOF'
# ============================================
# HitaVir Tech - Operators
# ============================================

# --- Arithmetic operators (math) ---
total = 1000 + 500       # Addition           → 1500
remaining = 1000 - 300   # Subtraction        → 700
total_size = 500 * 3     # Multiplication     → 1500
avg = 1500 / 3           # Division (float)   → 500.0
batches = 1500 // 500    # Floor division     → 3
leftover = 1500 % 500    # Modulo (remainder) → 0
squared = 2 ** 10        # Exponentiation     → 1024

print(f"Total: {total}")
print(f"Remaining: {remaining}")
print(f"Total size: {total_size}")
print(f"Average: {avg}")
print(f"Batches needed: {batches}")
print(f"Leftover records: {leftover}")
print(f"2^10 = {squared}")

# --- Comparison operators (used in data validation) ---
row_count = 1500
threshold = 1000
print(f"\nRow count > threshold: {row_count > threshold}")   # True
print(f"Row count == 1500: {row_count == 1500}")             # True
print(f"Row count != 0: {row_count != 0}")                   # True

# --- Logical operators (used in pipeline conditions) ---
has_data = True
is_valid = True
has_errors = False

print(f"\nReady to process: {has_data and is_valid}")        # True
print(f"Any issues: {has_errors or not is_valid}")           # False
print(f"No errors: {not has_errors}")                        # True
PYEOF

python basics_operators.py
```

#### Operator Cheat Sheet

| Category | Operators | Example | Result |
|----------|-----------|---------|--------|
| Arithmetic | `+ - * / // % **` | `7 // 2` | `3` (integer division) |
| Comparison | `== != > < >= <=` | `5 > 3` | `True` |
| Logical | `and or not` | `True and False` | `False` |
| Membership | `in`, `not in` | `"ETL" in "ETL Pipeline"` | `True` |
| Identity | `is`, `is not` | `value is None` | True/False |

### User Input

```bash
cat > basics_input.py << 'PYEOF'
# ============================================
# HitaVir Tech - User Input
# ============================================

# input() always returns a string — convert if you need a number
name = input("Enter your name: ")
batch = input("Enter your batch number: ")
batch_num = int(batch)  # Convert string → integer

print(f"\nWelcome to HitaVir Tech, {name}!")
print(f"You are in Batch {batch_num}")
print(f"Let's learn Python for Data Engineering!")
PYEOF

python basics_input.py
```

> **HitaVir Tech says:** "In data engineering, you rarely use `input()`. Instead, you read from files, databases, and APIs. But understanding input/output flow is fundamental to programming."

### Assignment 1 — Pipeline Stats Calculator

**Goal:** Practice every data type, type conversion, operators, and f-strings by building a small pipeline reporter.

**The scenario:** HitaVir Tech's overnight sales pipeline finished. Your job is to write a script that prints a clean stats summary the on-call engineer can read in 5 seconds.

**Tasks:**

1. Open VS Code and create a new file: `assignment_01_basics.py`.
2. Define these variables (use the right data type for each):
   - `pipeline_name` = `"HitaVir Sales ETL"`
   - `total_records` = `50000`
   - `failure_rate` = `0.023`
   - `is_production` = `True`
   - `last_error` = `None`
3. Compute `failed_records` = `total_records * failure_rate` (cast to `int`).
4. Compute `success_rate` = `(1 - failure_rate) * 100`.
5. Print this exact format using f-strings:

```text
============================================
  HitaVir Tech - Pipeline Stats
============================================
Pipeline       : HitaVir Sales ETL
Mode           : PRODUCTION
Records read   : 50,000
Failed records : 1,150
Success rate   : 97.7%
Last error     : None
============================================
```

**Success criteria:**

- [ ] All 5 data types used (str, int, float, bool, None)
- [ ] Numbers use thousands separator (`{x:,}`)
- [ ] Success rate has 1 decimal place (`{x:.1f}`)
- [ ] "PRODUCTION" or "DEVELOPMENT" picked from `is_production` using a conditional
- [ ] Output matches the format above exactly

**Stretch goal:** Read each value with `input()` and convert the strings to the right types before printing.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Define **variables** and assign values of the **5 core data types** — `str`, `int`, `float`, `bool`, `None`
- Use `type()` to inspect a value and convert types with `int()`, `float()`, `str()`
- Apply **arithmetic, comparison, logical, membership, and identity operators**
- Build readable strings with **f-strings** (`f"Total: {x:,}"`) and format numbers (`{x:.2f}`, `{x:,}`)
- Read user input with `input()` and convert it to the right type

### PEP 8 — Style Rules to Apply Strictly to Variables and Types

Professional Python coders **never** name a variable like `TotalRecords` or `data1`. Apply these rules every single time you declare a value:

- **Variable names** → `snake_case` (e.g., `total_records`, `pipeline_name`) — never `camelCase` or `PascalCase`
- **Constants** → `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES = 3`)
- **Be descriptive** — `customer_email`, never `x` or `tmp`
- **Spaces around `=`** for normal assignment: `total = 1500` (not `total=1500`)
- **No spaces around `=`** in function default args: `def f(x=10):` (not `def f(x = 10):`)
- **Prefer "double quotes"** for strings (Black's standard)
- **Prefer f-strings** over `+` concatenation or `%` formatting
- **Use `is None` / `is not None`** — never `== None`

> **Inspiration for the road ahead:**
>
> *"Simple is better than complex. Complex is better than complicated."*
> — Tim Peters, *The Zen of Python*

## Control Flow — Making Decisions
Duration: 12:00

**What is "control flow"?**

Control flow is how Python decides **which lines of code to run, and how many times to run them**. Without control flow, Python just runs everything top-to-bottom, once. With it, your script can make decisions (`if-else`) and repeat work (`for`, `while`).

Real-life analogy: when you cook, your recipe says "if the water is boiling, add the pasta. Repeat stirring every 30 seconds for 8 minutes." Those `if`s and `repeats` are control flow.

Data pipelines constantly make decisions: Is the data valid? Should we retry? Which path to take? Control flow is how you express that logic.

### `if-else` — Conditional Logic

**What is the if-else statement?**

`if` runs a block of code **only when a condition is true**. `elif` ("else if") checks another condition. `else` is the fallback when nothing else matched.

Real-life analogy: "If it is raining, take an umbrella. Else if it is hot, wear sunglasses. Else, just go."

```bash
cat > control_if.py << 'PYEOF'
# ============================================
# HitaVir Tech - Control Flow: if-else
# ============================================

# --- Data Quality Check ---
# Reject the batch if more than 5% of rows have null values
null_percentage = 0.03  # 3% nulls
threshold = 0.05        # 5% max allowed

if null_percentage <= threshold:
    print("PASS: Data quality check passed")
    print(f"  Null rate: {null_percentage:.1%} (threshold: {threshold:.1%})")
else:
    print("FAIL: Data quality check failed")
    print(f"  Null rate: {null_percentage:.1%} exceeds threshold: {threshold:.1%}")

# --- Pipeline Status Router ---
# An API or service typically returns a status code; we route the response
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
# Pick the right database based on dev/staging/prod environment
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
# Decide whether a value is an integer, float, or string
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

> **Pay attention to indentation!** Python uses 4 spaces of indentation to know what code is "inside" the `if`. Mixing tabs and spaces, or wrong indentation, is the #1 beginner error.

### Loops — Processing Data

**What is a loop?**

A loop runs the same block of code **multiple times** — once per item. Without loops, processing 10 million CSV rows would mean writing 10 million lines of code. With a loop, you write the row-handling code once.

Two kinds of loops:
- **`for` loop** — repeats once for each item in a collection ("for each row in the file…")
- **`while` loop** — repeats as long as a condition is true ("while not connected, retry…")

```bash
cat > control_loops.py << 'PYEOF'
# ============================================
# HitaVir Tech - Control Flow: Loops
# ============================================

# --- for loop: Process a batch of records ---
# enumerate() gives us the index AND the value at the same time
print("--- Processing Transaction Batch ---")
transactions = [150.00, 230.50, 45.99, 1200.00, 89.95, 567.25]

total = 0
for i, amount in enumerate(transactions, 1):
    total += amount
    print(f"  Transaction {i}: ${amount:>10.2f}  |  Running total: ${total:>10.2f}")

print(f"\n  Batch total: ${total:.2f}")
print(f"  Average: ${total / len(transactions):.2f}")

# --- for loop with range(): Batch processing ---
# range(start, stop, step) generates numbers — used to slice big datasets
print("\n--- Batch Processing Simulation ---")
total_records = 1500
batch_size = 500

for batch_num in range(0, total_records, batch_size):
    end = min(batch_num + batch_size, total_records)
    print(f"  Processing records {batch_num + 1} to {end}...")

print("  All batches processed!")

# --- while loop: Retry logic ---
# Keep trying until we connect (or hit the max retry limit)
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
# break = stop the loop immediately
# continue = skip to the next iteration
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
        break  # exit the loop entirely
    if record["status"] != "active":
        print(f"  Skipping inactive user: {record['name']}")
        continue  # skip this record, move to next
    active_users.append(record["name"])
    print(f"  Added active user: {record['name']}")

print(f"\n  Active users found: {active_users}")
PYEOF

python control_loops.py
```

> **HitaVir Tech says:** "In data engineering, loops process records, retry failed connections, and iterate through batches. The `for` loop is your workhorse. The `while` loop is your retry mechanism. Master both."

### Assignment 2 — Data Quality Gate

**Goal:** Build a "data quality gate" that decides which records can flow into the warehouse and which must be quarantined.

**The scenario:** A daily extract from the upstream system contains some bad records. Before loading, you must inspect every record and route it.

**Tasks:**

1. Create `assignment_02_control.py`.
2. Use this input list (paste it into your file):

```python
records = [
    {"id": 1, "value": 100,  "region": "North"},
    {"id": 2, "value": -50,  "region": "South"},
    {"id": 3, "value": 200,  "region": "INVALID"},
    {"id": 4, "value": None, "region": "East"},
    {"id": 5, "value": 75,   "region": "West"},
    {"id": 6, "value": 320,  "region": "North"},
    {"id": 7, "value": 0,    "region": "South"},
]
VALID_REGIONS = ["North", "South", "East", "West"]
```

3. Loop through each record and apply these rules **in this order**:
   - If `value` is `None` -> log `"SKIP id={id}: null value"` and `continue`
   - If `value` is less than or equal to `0` -> log `"SKIP id={id}: non-positive value"` and `continue`
   - If `region` is not in `VALID_REGIONS` -> log `"SKIP id={id}: invalid region '{region}'"` and `continue`
   - Otherwise print `"PASS id={id}: ${value} ({region})"` and add to a `valid` list
4. After the loop, print a one-line summary: `"Valid: X | Skipped: Y"`.

**Expected output (last lines):**

```text
PASS id=1: $100 (North)
SKIP id=2: non-positive value
SKIP id=3: invalid region 'INVALID'
SKIP id=4: null value
PASS id=5: $75 (West)
PASS id=6: $320 (North)
SKIP id=7: non-positive value
Valid: 3 | Skipped: 4
```

**Success criteria:**

- [ ] Uses `if`, `elif`, and `else`
- [ ] Uses `for` over the list
- [ ] Uses `continue` to skip bad rows
- [ ] Uses `in` to check region membership
- [ ] Final summary numbers are correct: 3 valid, 4 skipped

**Stretch goal:** Wrap the rules in a `while` loop that retries the whole batch up to 3 times if any record was skipped (simulating a flaky upstream).

### Control-Flow Cheat Sheet

| Pattern | When to use | Example |
|---------|-------------|---------|
| `if/elif/else` | Branch logic — one of several paths | Choose DB host based on environment |
| `for` over a list | Process every item | Loop over CSV rows |
| `for ... in range()` | A fixed number of iterations | Batch chunks of 500 |
| `while` | Repeat until a condition flips | Retry until connected |
| `break` | Stop early | Stop on a sentinel value |
| `continue` | Skip this iteration | Skip invalid rows, keep looping |

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Branch logic with **`if` / `elif` / `else`** based on data quality, environment, and thresholds
- Loop over a list of rows with **`for ... in`**
- Use **`for ... in range(n)`** for fixed-count batches
- Repeat work until a condition flips with **`while`** (e.g., retry until connected)
- Stop early with **`break`** and skip an iteration with **`continue`**
- Combine conditions with **`and`, `or`, `not`** for pipeline gating

### PEP 8 — Style Rules to Apply Strictly to Control Flow

Bad indentation in a `for` or `if` block does not just look ugly — it can change the meaning of your program. Apply these rules every single time you write a control-flow block:

- **Indent block contents with exactly 4 spaces** (never tabs, never 2 spaces)
- One **blank line** before and after each logical block to aid readability
- Use **`is None`** for null checks, never `== None`
- Use **`if not records:`** to check for empty collections, never `if len(records) == 0:`
- Use **`if x in {a, b, c}:`** for multi-value membership instead of chained `or`
- Use **`enumerate(items)`** when you need both index and value — never `range(len(items))`
- Avoid deeply nested blocks (more than 3 levels) — extract into a helper function instead

> **Inspiration for the road ahead:**
>
> *"Flat is better than nested. Sparse is better than dense."*
> — Tim Peters, *The Zen of Python*

## Functions — Reusable Code
Duration: 18:00

**What is a function?**

A function is a **named block of code that performs one task**. You define it once, then "call" it (run it) as many times as you want, with different inputs.

Real-life analogy: a microwave is a function. Inputs (arguments): food + time. Output (return value): hot food. You don't rebuild a microwave every time you reheat lunch — same idea here.

In data engineering, functions are the building blocks of every pipeline. Every ETL job is just `extract()`, then `transform()`, then `load()` — three functions you call in order.

### The Anatomy of a Function — Visual Breakdown

```
        keyword    name           parameters
           |        |                  |
           v        v                  v
        +---+ +---------------+ +------------------+
         def   calculate_total  (price, quantity):
                                                      +--- colon ends the signature
        """Multiply price by quantity."""             |
        |--------------- docstring ---------------|   |
                                                      v
            total = price * quantity   <--- body (indented 4 spaces)
            return total               <--- return value sent back to caller


   When the caller writes:                 Python returns:
        result = calculate_total(99.99, 3)        ----> 299.97
                          |        |
                       price    quantity
                       (arg)     (arg)
```

```python
def calculate_total(price, quantity):    # def = "define a function"
    """Multiply price by quantity."""    # docstring (optional but recommended)
    total = price * quantity              # body — the actual work
    return total                          # send the result back
```

| Part | Meaning |
|------|---------|
| `def` | Keyword that starts a function definition |
| `calculate_total` | The function's name (use snake_case) |
| `(price, quantity)` | Parameters — the inputs the function expects |
| `"""..."""` | Docstring — a description of what the function does |
| `return total` | The value the caller gets back |

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

print_pipeline_header()  # We "call" the function by writing its name + ()

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
# Python lets you return a tuple of values, then unpack them on the caller side
def get_pipeline_stats(total, failed):
    """Return multiple statistics from a pipeline run."""
    success = total - failed
    rate = (success / total) * 100
    return success, failed, rate    # Returns a tuple

s, f, r = get_pipeline_stats(10000, 23)
print(f"\nPipeline: {s} success, {f} failed, {r:.1f}% rate")

# --- 1E. Function returning a dictionary (a record) ---
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

**What is a default parameter?**

A parameter with `=` and a value is **optional** — if the caller does not pass it, the default kicks in. This is how libraries give you sensible defaults but let you override when needed.

**What is a keyword argument?**

Calling a function by **naming** the argument: `connect(port=5432)`. Order does not matter, and the code reads more clearly.

```bash
cat > func_02_defaults_kwargs.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 2: Defaults & Keyword Args
# ============================================

# --- 2A. Default parameters ---
# port, database, and timeout all have defaults — host is required
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

# --- 2C. Mutable default argument trap (a famous Python gotcha) ---
# WRONG — the same list is reused across every call!
def bad_append(item, lst=[]):
    lst.append(item)
    return lst

# CORRECT — use None and create the list inside the function
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

> **HitaVir Tech says:** "Default parameters are everywhere in data engineering. Database connections, API timeouts, retry counts — they all have sensible defaults that you override when needed."

### Part 3 — `*args` (Variable Positional Arguments)

**What does *args mean?**

`*args` lets a function accept **any number of positional arguments**. Inside the function, `args` is a tuple of all of them. Useful when you do not know upfront how many inputs there will be — like a list of files to process.

```bash
cat > func_03_args.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 3: *args
# ============================================

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

# --- 3B. *args in data engineering: process multiple files ---
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
# Without *, the entire list would be passed as ONE argument
PYEOF

python func_03_args.py
```

### Part 4 — `**kwargs` (Variable Keyword Arguments)

**What does \*\*kwargs mean?**

`**kwargs` lets a function accept **any number of keyword arguments**. Inside the function, `kwargs` is a dictionary. Use this when you want maximum flexibility — for example, accepting any database connection options.

```bash
cat > func_04_kwargs.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 4: **kwargs
# ============================================

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

# --- 4E. Building a flexible pipeline config ---
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

> **HitaVir Tech says:** "`*args` and `**kwargs` are the backbone of flexible Python code. Every major framework uses them — Django, Flask, pandas, Spark. When you see `**options` or `*args` in library docs, you now know exactly what they mean."

### Part 5 — Advanced Function Types

**Quick definitions before we dive in:**

- **Lambda** — a one-line, unnamed function. Useful as a tiny "throwaway" function passed to `sorted`, `map`, etc.
- **Nested function** — a function defined inside another function. Used to "build" customized helpers.
- **Recursive function** — a function that calls itself. Used for tree/JSON-like nested structures.
- **Generator** — a function that yields values one at a time, saving memory for huge datasets.
- **Decorator** — a function that wraps another function to add behavior (logging, timing, retries).

```bash
cat > func_05_advanced.py << 'PYEOF'
# ============================================
# HitaVir Tech - Part 5: Advanced Function Types
# ============================================

# --- 5A. Lambda Functions (anonymous, one-line) ---
print("=" * 50)
print("LAMBDA FUNCTIONS")
print("=" * 50)

# Regular function:
def double(x):
    return x * 2

# Lambda equivalent:
double_lambda = lambda x: x * 2

print(f"Regular: {double(5)}")       # 10
print(f"Lambda: {double_lambda(5)}") # 10

# Lambdas shine with sort, map, filter:
sales = [
    {"product": "Laptop", "revenue": 4999.95},
    {"product": "Mouse", "revenue": 149.95},
    {"product": "Monitor", "revenue": 899.98},
    {"product": "Keyboard", "revenue": 239.97},
]

# Sort by revenue (descending):
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

# --- 5B. Nested Functions (a function inside a function) ---
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

# --- 5D. Generator Functions (memory-efficient) ---
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

# Generators do NOT load all data at once — perfect for millions of rows

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

# --- Decorator for logging each pipeline step ---
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

| Type | Syntax | When to Use in Data Engineering |
|------|--------|----------------------------------|
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

> **HitaVir Tech says:** "Functions are the atoms of programming — everything is built from them. Every data pipeline is just `extract()`, `transform()`, `load()`. Every API endpoint is a function. Every automation script is a collection of functions. Master functions and you master Python."

### Assignment 3 — Reusable Validation Toolkit

**Goal:** Build a small library of reusable functions that any pipeline at HitaVir Tech could import.

**The scenario:** Three teams keep re-writing the same validators. Build them once, write proper docstrings, and ship a single toolkit file everyone can import.

**Tasks:**

1. Create `assignment_03_functions.py`.
2. Implement these four functions, each with a docstring and snake_case name:

   - `validate_email(email)` -> returns `True` if the string contains `@` and `.` (after the `@`), else `False`.
   - `clean_name(name)` -> returns a stripped, title-cased version. If `None` or empty, return `"Unknown"`.
   - `calculate_total(price, quantity, tax_rate=0.18)` -> returns `round(price * quantity * (1 + tax_rate), 2)`. Default tax 18%.
   - `summarize(*amounts, label="Total")` -> prints `"{label}: ${sum:,.2f}"` for any number of amounts.

3. Below the functions, add a `if __name__ == "__main__":` block that calls each function with at least 3 different inputs and prints the results.

**Sample output:**

```text
validate_email('alice@hitavir.tech') -> True
validate_email('not-an-email')       -> False
clean_name('  alice johnson  ')      -> Alice Johnson
clean_name(None)                     -> Unknown
calculate_total(99.99, 3)            -> 354.0
calculate_total(50, 2, tax_rate=0.0) -> 100.0
Total: $1,250.50
Refunds: $35.99
```

**Success criteria:**

- [ ] All four functions defined with docstrings
- [ ] Default parameter used in `calculate_total`
- [ ] `*args` used in `summarize`
- [ ] All functions called at least 3 times each
- [ ] Code passes `flake8 assignment_03_functions.py` with zero warnings

**Stretch goal:** Add a `@timer` decorator from the codelab and apply it to `summarize`. Also add type hints (e.g., `def calculate_total(price: float, quantity: int, tax_rate: float = 0.18) -> float:`).

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Define and call functions with **positional, default, `*args`, and `**kwargs`** parameters
- Return single or multiple values (tuples) from a function
- Understand **local vs. global scope** and avoid mutating globals
- Write **`lambda`** expressions for simple one-liners (with `sorted`, `map`, `filter`)
- Build and apply **decorators** (`@timer`, `@retry`) to wrap reusable behaviour
- Compose small, single-purpose functions into a working **pipeline**

### PEP 8 — Style Rules to Apply Strictly to Functions

A function is the unit of reusable code in Python. Sloppy function signatures are a tell-tale sign of an amateur. Apply these rules every single time you write `def`:

- **Function names** → `snake_case` (e.g., `extract_records`, `validate_row`) — never `CamelCase`
- **Two blank lines** between top-level function definitions
- **One blank line** between methods inside a class
- **No spaces around `=`** in keyword/default arguments: `def f(x, y=10):`
- Every public function gets a **docstring** (triple-quoted) explaining purpose, args, returns
- Add **type hints**: `def total(price: float, qty: int) -> float:`
- Each function should do **one job** — if it does two, split it
- Keep functions **under ~50 lines** — if it does not fit on one screen, refactor

> **Inspiration for the road ahead:**
>
> *"The function of good software is to make the complex appear to be simple."*
> — Grady Booch

## Data Structures
Duration: 12:00

**What is a "data structure"?**

A data structure is a **way of organizing values together** so you can work with them efficiently. Python ships with four built-in ones — list, tuple, set, dictionary. Each is best for a specific job.

Real-life analogy:
- **List** — a numbered to-do list (order matters, can edit, duplicates allowed)
- **Tuple** — your printed boarding pass (order matters, locked, cannot edit)
- **Set** — a collection of unique stamps (no duplicates, no order)
- **Dictionary** — a phone contacts list (look up a number by name)

### Visual Comparison — The Four Built-ins at a Glance

```
   LIST  [ ]                          TUPLE  ( )
   +---+---+---+---+                  +---+---+---+---+
   | A | B | C | A |  <-- duplicates  | A | B | C | A |  <-- locked,
   +---+---+---+---+                  +---+---+---+---+      cannot
     0   1   2   3   <-- positions      0   1   2   3      change
   ordered, mutable                    ordered, immutable


   SET  { }                           DICT  { key: value }
   +---+---+---+                      +-----+-----+-----+
   | A | B | C |  <-- unique only     | id  | name|email|   keys
   +---+---+---+                      +-----+-----+-----+
   no order, no duplicates            | 1   |Alice| a@.. |  values
                                      +-----+-----+-----+
                                      lookup by KEY (not position)
```

Data engineers use these every single day. Master them and you can model almost any data.

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

# Add and remove items
tables.append("logs")           # add to the end
print(f"After append: {tables}")

tables.remove("logs")           # remove a specific value
print(f"After remove: {tables}")

# Slicing — get a sub-list using [start:stop]
print(f"First two: {tables[:2]}")
print(f"Last two: {tables[-2:]}")

# Built-ins for numeric lists
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

# Coordinates, pairs, fixed mappings
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

# Safe access with .get() — returns a default if the key is missing
print(f"Manager: {employee.get('manager', 'Not assigned')}")

# Iterate over a dictionary
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

# Set operations — comparing two datasets
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

# Filter: keep only sales above $100
big_sales = [s for s in sales_data if s["amount"] > 100]
print(f"Sales > $100: {len(big_sales)}")

# Aggregate: total revenue
total_revenue = sum(s["amount"] for s in sales_data)
print(f"Total revenue: ${total_revenue:,.2f}")

# Group by region using a defaultdict
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

**What is "Big-O"?**

Big-O describes how much slower an operation gets as your dataset grows. `O(1)` means "instant — the same speed for 10 rows or 10 million." `O(n)` means "scales with size — 10× the data takes 10× longer." For data engineers handling millions of rows, this matters.

| Operation | List | Tuple | Set | Dict |
|-----------|------|-------|-----|------|
| Access by index | O(1) | O(1) | N/A | N/A |
| Access by key | N/A | N/A | N/A | O(1) |
| Search (`in`) | O(n) | O(n) | **O(1)** | **O(1)** |
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

### Assignment 4 — Sales Aggregator

**Goal:** Use every Python data structure to build a small sales aggregator.

**The scenario:** Marketing wants three answers from yesterday's sales: revenue per region, the list of unique customers, and the top-spending customer.

**Tasks:**

1. Create `assignment_04_data_structures.py`.
2. Use this input data:

```python
sales = [
    {"customer": "Alice",  "region": "North", "amount": 1500},
    {"customer": "Bob",    "region": "South", "amount":  800},
    {"customer": "Alice",  "region": "North", "amount": 2300},
    {"customer": "Carol",  "region": "East",  "amount": 1200},
    {"customer": "Bob",    "region": "South", "amount":  600},
    {"customer": "David",  "region": "West",  "amount":  450},
    {"customer": "Carol",  "region": "East",  "amount":  900},
]
```

3. Build:
   - `revenue_by_region` (a `dict`) -> total amount per region
   - `unique_customers` (a `set`) -> distinct customer names
   - `revenue_by_customer` (a `dict`) -> total amount per customer
   - `top_customer` (a `tuple` of `(name, amount)`) -> the highest-spender

4. Print a clean report:

```text
Revenue by Region:
  East   : $2,100.00
  North  : $3,800.00
  South  : $1,400.00
  West   :   $450.00

Unique customers: 4
Names: ['Alice', 'Bob', 'Carol', 'David']

Top customer: Alice ($3,800.00)
```

**Success criteria:**

- [ ] Uses `dict`, `set`, `list`, and `tuple` (all four)
- [ ] Regions printed in alphabetical order
- [ ] Customer list sorted alphabetically
- [ ] Top customer = `("Alice", 3800)`
- [ ] Numbers formatted with thousands separator and 2 decimals

**Stretch goal:** Replace the manual loops with `defaultdict(float)` and a dictionary comprehension. Then replace the `for`-loop top-customer logic with `max(revenue_by_customer.items(), key=lambda x: x[1])`.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Choose the **right structure** — list (ordered, mutable), tuple (locked), set (unique), dict (key→value)
- Build and slice lists, sort them, append/extend, list of dicts (a CSV in memory)
- Look up dictionary values safely with `.get(key, default)`
- Use **sets** for deduplication and fast `in` membership tests
- Use **tuples** for fixed configs like `(host, port)`
- Iterate dict pairs with `.items()`, keys with `.keys()`, values with `.values()`

### PEP 8 — Style Rules to Apply Strictly to Data Structures

Real pipeline code lives or dies on how cleanly your data structures are written. Apply these rules every single time:

- For multi-line literals, add a **trailing comma** so diffs show one-line additions only
- Use **dict / list comprehensions** when they fit on one readable line — otherwise use a `for` loop
- Use **`if not records:`** for empty checks, never `len(records) == 0`
- Prefer **double quotes** consistently for keys: `{"name": "Alice"}`
- Avoid mutable default arguments — never `def f(x=[]):` (subtle bug); use `def f(x=None):` then assign inside
- Pick **`defaultdict`** or **`Counter`** from `collections` over manual `if key in d:` checks

> **Inspiration for the road ahead:**
>
> *"Bad programmers worry about the code. Good programmers worry about data structures and their relationships."*
> — Linus Torvalds

## File Handling — CSV, JSON, and Text
Duration: 14:00

**Why file handling matters in DE**

Every data pipeline starts and ends with a file. You read raw data **from** a file, transform it, and write the cleaned result **to** another file. The two formats you will use 95% of the time are CSV and JSON.

**Quick definitions:**

- **CSV (Comma-Separated Values)** — a plain-text spreadsheet. Each line is a row; commas separate the columns.
- **JSON (JavaScript Object Notation)** — a text format for structured/nested data. Looks like Python dictionaries.
- **Log file** — a plain-text file where every line is a timestamped event (used for debugging).

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

**What is the with-open block?**

`with open(...) as f:` is the **safe way** to open files in Python. The `with` block automatically closes the file when you are done — even if an error happens inside. This prevents the "file left open and locked" bug.

### Reading and Writing CSV Files

**What is csv.DictReader?**

`csv.DictReader` reads each row of a CSV as a **dictionary** where the keys are the column names from the header row. Instead of remembering "column 4 is price," you write `row["price"]`. Cleaner, safer, easier.

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
# Validate every record; bad ones go to a rejected list, good ones to cleaned
print(f"\n{'=' * 60}")
print("PROCESSING CSV DATA")
print("=" * 60)

cleaned = []
rejected = []

for record in records:
    # Convert numeric fields (CSV cells are always strings)
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

#### CSV File Mode Cheat Sheet

| Mode | Meaning | Use it for |
|------|---------|-----------|
| `"r"` | Read | Loading existing data |
| `"w"` | Write (overwrites) | Creating a new output file |
| `"a"` | Append | Adding new rows to an existing log |
| `"r+"` | Read + write | Rare in DE — usually avoid |

### Reading and Writing JSON Files

> **JSON ↔ Python dictionary**: JSON is text; a Python dict is in-memory. `json.load()` converts JSON text → Python dict. `json.dump()` does the reverse.

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
    json.dump(report, f, indent=2)  # indent=2 makes the file human-readable

print("Report saved to pipeline_report.json")
print(f"\nPipeline Status: {report['status']}")
print(f"Success Rate: {report['metrics']['success_rate']}%")
print(f"Revenue: ${report['metrics']['total_revenue']:,.2f}")
PYEOF

python file_json.py
```

#### JSON Function Cheat Sheet

| Function | Direction | Source/Destination |
|----------|-----------|--------------------|
| `json.load(file)` | JSON → Python | Read from a file object |
| `json.loads(string)` | JSON → Python | Read from a string (note the **`s`** = string) |
| `json.dump(obj, file)` | Python → JSON | Write to a file object |
| `json.dumps(obj)` | Python → JSON | Convert to a string |

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
    lines = f.readlines()  # returns a list of strings, one per line

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

### Assignment 5 — CSV to JSON Region Report

**Goal:** Read a CSV, transform the data, and write a JSON summary — the most common file-handling task in real pipelines.

**The scenario:** Finance asked for a daily JSON file showing total revenue per region. They will load the JSON into their dashboard.

**Tasks:**

1. Make sure `sales_raw.csv` exists in your working folder (if not, run `python create_sample_data.py` from the codelab).
2. Create `assignment_05_files.py`.
3. Read `sales_raw.csv` using `csv.DictReader`.
4. Skip records that have empty `customer` or empty `product` (these are bad rows).
5. Convert `quantity` and `price` to numbers, compute `total = quantity * price`.
6. Skip records where `quantity <= 0` or `price <= 0`.
7. Group by `region`, summing the `total`.
8. Write the result to `region_summary.json` with `indent=2`. Format:

```json
{
  "report_date": "2026-04-30",
  "currency": "USD",
  "by_region": {
    "East":  599.98,
    "North": 4079.95,
    "South": 149.95,
    "West":  1449.98
  },
  "total": 6279.86
}
```

9. After writing the file, read it back with `json.load()` and print "Report verified — total: $X.XX" using the value from the loaded file.

**Success criteria:**

- [ ] Uses `csv.DictReader` with `with open(...)`
- [ ] Uses `json.dump(..., indent=2)`
- [ ] Skips rows with empty fields and non-positive numbers
- [ ] JSON file is valid (re-readable by `json.load`)
- [ ] Regions appear in alphabetical order in the output

**Stretch goal:** Also write a `rejected_records.csv` containing every skipped row with a new column `reason` explaining why it was rejected.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Read CSV files with `csv.reader` and `csv.DictReader`
- Write CSV files with `csv.writer` and `csv.DictWriter` (header + rows)
- Read and write **JSON** with `json.load`, `json.loads`, `json.dump`, `json.dumps`
- Use the **`with open(...)` context manager** so files always close
- Set the right **encoding** (`encoding="utf-8"`) and `newline=""` on Windows
- Append to **log/text files** for audit trails

### PEP 8 — Style Rules to Apply Strictly to File I/O

Files are the boundary of every pipeline. Boundary code that breaks PEP 8 turns into the world's worst on-call ticket. Apply these rules every single time you touch a file:

- **Always** use `with open(...) as f:` — never manual `open()` then `f.close()`
- Always pass **`encoding="utf-8"`** explicitly (Windows defaults bite)
- Group imports correctly — `csv`, `json`, `pathlib` are stdlib (Group 1)
- Prefer **`pathlib.Path`** over `os.path` string-joining (modern + cross-platform)
- Use `json.dump(obj, f, indent=2)` so output is **diff-friendly**
- Keep file paths in **constants at the top**: `INPUT_PATH = Path("data/sales.csv")`

> **Inspiration for the road ahead:**
>
> *"Data is the new oil. It is valuable, but if unrefined it cannot really be used."*
> — Clive Humby

## Error Handling and Logging
Duration: 10:00

**What is an "error" or "exception"?**

When Python tries to do something impossible — divide by zero, open a missing file, convert "abc" to a number — it raises an **exception** and the program crashes. Error handling is how you **catch** those exceptions and respond gracefully instead of crashing.

**What is logging?**

Logging is writing timestamped messages about what your pipeline did, to a file or the console. When something fails at 3 AM in production, the log is the only way to find out what happened.

**Why this matters in DE**

Production pipelines must NEVER silently crash. They must **fail gracefully**, log every problem, and let on-call engineers debug the next morning.

### `try-except` — Catching Errors

**The pattern:**

- `try:` — "try to do this risky thing"
- `except SomeError:` — "if THIS specific error happens, do this instead"
- `finally:` — "do this no matter what (cleanup)"

#### Visual Flow — How `try / except / finally` runs

```
               +--------------+
               |   try:       |
               |   risky_code |
               +--------------+
                      |
              did it raise an error?
               /                  \
             NO                   YES
              |                    |
              v                    v
     +----------------+   +-------------------+
     | skip except    |   | matching except:  |
     | block          |   | run handler code  |
     +----------------+   +-------------------+
              \                    /
               \                  /
                v                v
               +------------------+
               |    finally:      |   <-- ALWAYS runs
               |    cleanup       |       (close file,
               +------------------+        release lock)
                        |
                        v
                  continue program
```

```bash
cat > error_handling.py << 'PYEOF'
"""
HitaVir Tech - Error Handling & Logging
"""
import logging
from datetime import datetime

# --- Setup logging ---
# Level INFO means: log INFO, WARNING, ERROR, CRITICAL (skip DEBUG)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler("etl_pipeline.log"),  # write to file
        logging.StreamHandler()                    # also print to console
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

#### Common Python Exceptions in Data Engineering

| Exception | When it happens | How to handle |
|-----------|-----------------|---------------|
| `FileNotFoundError` | The path does not exist | Log a warning, return empty data |
| `ValueError` | Bad type conversion (`int("abc")`) | Skip that record, keep going |
| `KeyError` | Dict key missing | Use `.get(key, default)` |
| `TypeError` | Wrong type passed to a function | Validate types before the call |
| `ZeroDivisionError` | Divide by 0 | Check denominator first |
| `ConnectionError` | Network or DB unreachable | Retry with backoff |
| `PermissionError` | Cannot write to file | Log critical, alert team |

#### Logging Levels — When to Use Each

| Level | Meaning | Example |
|-------|---------|---------|
| `DEBUG` | Detailed info for developers | "Loaded row 42 with values..." |
| `INFO` | Normal operation milestones | "Pipeline started", "Loaded 1500 rows" |
| `WARNING` | Unexpected but not failure | "Skipped 3 invalid records" |
| `ERROR` | Operation failed but pipeline continues | "Could not write report.json" |
| `CRITICAL` | Pipeline cannot continue | "Database is unreachable" |

> **HitaVir Tech says:** "In production, errors WILL happen. The question is not if, but when. Good error handling means your pipeline fails gracefully, logs the problem, and makes debugging easy."

### Assignment 6 — Bullet-Proof CSV Reader

**Goal:** Build one reusable function that can read any CSV without ever crashing the parent program.

**The scenario:** Your team's pipelines keep dying because of bad input files. Build a single `safe_read_csv()` they can all import.

**Tasks:**

1. Create `assignment_06_errors.py`.
2. Set up `logging` to write to **both** `errors.log` AND the console, level `INFO`, with a timestamp format.
3. Write `safe_read_csv(filepath)` that:
   - Returns `[]` if the file does not exist (log a `WARNING`)
   - Returns `[]` if the file is unreadable for any other reason (log `CRITICAL`)
   - Otherwise reads with `csv.DictReader`, skips rows that fail `int(row["quantity"])` or `float(row["price"])`, and logs each skip as a `WARNING` with the row number and reason
   - Returns the list of valid rows
4. Test by calling `safe_read_csv()` three times:
   - With `"missing_file.csv"` -> should log a warning, return `[]`
   - With `"sales_raw.csv"` -> should log skipped rows, return cleaned list
   - With a temp file you create yourself containing 1 good row and 1 row with `price="abc"` -> should keep 1, skip 1

**Sample log output:**

```text
2026-04-30 09:00:01 [WARNING] File not found: missing_file.csv
2026-04-30 09:00:02 [INFO]    Loading sales_raw.csv
2026-04-30 09:00:02 [WARNING] Row 7 skipped: invalid quantity '0'
2026-04-30 09:00:02 [WARNING] Row 10 skipped: invalid price '-999.99'
2026-04-30 09:00:02 [INFO]    Loaded 8 valid rows from sales_raw.csv
```

**Success criteria:**

- [ ] Uses `try` / `except` with **specific** exception types (no bare `except:`)
- [ ] Uses `logging`, never `print` for status
- [ ] Function never raises an unhandled exception under any input
- [ ] Both file and console show the same log lines
- [ ] `errors.log` exists and is human-readable

**Stretch goal:** Add the `@retry(max_attempts=3)` decorator from the codelab and apply it to `safe_read_csv` so flaky network-mounted files get retried automatically.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Catch errors with **`try` / `except`** using **specific** exception classes
- Distinguish `ValueError`, `KeyError`, `FileNotFoundError`, `TypeError`, etc.
- Use **`else`** and **`finally`** clauses correctly
- Configure the **`logging`** module with levels (DEBUG / INFO / WARNING / ERROR / CRITICAL)
- Write logs to **both file and console** simultaneously
- Replace every `print()` in production code with `logger.info()` / `logger.error()`

### PEP 8 — Style Rules to Apply Strictly to Errors and Logging

Silent failures destroy data pipelines. Apply these rules every single time you handle an exception:

- **Never** write a bare `except:` — it swallows `KeyboardInterrupt` and hides bugs
- Catch the **most specific** exception you can: `except ValueError:` not `except Exception:`
- Re-raise with `raise` (no argument) to preserve the traceback
- Use **`logging`**, not `print`, for anything resembling status
- Configure `logger = logging.getLogger(__name__)` at the **top of every module**
- Log **WHY** not just WHAT: `logger.warning("Skipped row %d: invalid price %s", i, val)`
- Add docstrings that mention **`Raises:`** for any exception your function intentionally throws

> **Inspiration for the road ahead:**
>
> *"Errors should never pass silently. Unless explicitly silenced."*
> — Tim Peters, *The Zen of Python*

## Working with pandas
Duration: 15:00

**What is pandas?**

pandas is the most-used Python library for working with **tabular data** (rows and columns). Think of it as Excel inside Python — but able to handle millions of rows, perform complex transformations, and integrate with every data tool.

**What is a DataFrame?**

A **DataFrame** is the central pandas object — a table with rows, columns, and an index. Every column has a name and a data type. It is what you get when you load a CSV via `pd.read_csv(...)`.

**Why DE engineers love pandas**

One library handles: loading CSVs/Excel/JSON, cleaning nulls, filtering rows, joining tables, grouping/aggregating, and writing the result back out.

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
# describe() gives min/max/mean for every numeric column
# isnull().sum() counts missing values per column
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

# Remove invalid data (using boolean indexing)
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
# groupby + agg = SQL's GROUP BY + COUNT/SUM/AVG
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

### pandas Cheat Sheet — The 15 Methods You'll Use Daily

| Task | Method | Example |
|------|--------|---------|
| Read CSV | `pd.read_csv()` | `pd.read_csv("sales.csv")` |
| Read JSON | `pd.read_json()` | `pd.read_json("data.json")` |
| Peek at first rows | `.head()` | `df.head(10)` |
| Peek at last rows | `.tail()` | `df.tail()` |
| See column types | `.dtypes` | `df.dtypes` |
| Summary stats | `.describe()` | `df.describe()` |
| Count nulls | `.isnull().sum()` | `df.isnull().sum()` |
| Drop nulls | `.dropna()` | `df.dropna(subset=["price"])` |
| Fill nulls | `.fillna()` | `df.fillna(0)` |
| Filter rows | Boolean indexing | `df[df["price"] > 100]` |
| Add column | Assignment | `df["total"] = df["a"] * df["b"]` |
| Apply a function | `.apply()` | `df["col"].apply(lambda x: x*2)` |
| Group + aggregate | `.groupby().agg()` | `df.groupby("region")["sales"].sum()` |
| Join two tables | `pd.merge()` | `pd.merge(df1, df2, on="id")` |
| Save CSV | `.to_csv()` | `df.to_csv("out.csv", index=False)` |

> **HitaVir Tech says:** "pandas is to data engineers what a stethoscope is to doctors — you cannot work without it. Learn `read_csv`, `groupby`, `merge`, and `apply`, and you can handle 90% of data tasks."

### Assignment 7 — Daily Sales Report with pandas

**Goal:** Practice the entire pandas workflow — read, clean, transform, group, save — on the sales dataset.

**The scenario:** The COO wants a daily sales report broken down by date AND region, with one row per (date, region) and revenue ranked.

**Tasks:**

1. Create `assignment_07_pandas.py`.
2. Read `sales_raw.csv` into a DataFrame `df`.
3. Print `df.shape`, `df.dtypes`, and `df.isnull().sum()`.
4. Drop rows where `customer` or `product` is null.
5. Keep only rows where `quantity > 0` and `price > 0`.
6. Add columns:
   - `total = price * quantity` (rounded to 2 decimals)
   - `is_premium = price > 200` (boolean)
7. Group by `["date", "region"]` and aggregate `total` with `sum`, `count`, and `mean`. Round to 2 decimals.
8. Sort the result by `total sum` descending.
9. Save to `daily_region_report.csv`.
10. Print the **top 3 (date, region) pairs** by revenue.

**Sample output (top section):**

```text
DataFrame shape: (10, 7)

Top 3 by revenue:
  2026-04-02 | West  | $1,999.98 | 1 order  | avg $1,999.98
  2026-04-01 | North | $1,159.97 | 2 orders | avg   $539.99
  2026-04-03 | West  |   $449.99 | 1 order  | avg   $449.99
```

**Success criteria:**

- [ ] Uses `read_csv`, `dropna`, boolean indexing, `assign` or column-add, `groupby` with `agg`, and `to_csv`
- [ ] Output CSV has multi-column groupby (date + region)
- [ ] Top-3 print uses formatted strings with thousands separator
- [ ] No `SettingWithCopyWarning` in the output (use `df = df.copy()` after filtering)

**Stretch goal:** Add a `pivot_table` showing regions as rows and dates as columns, with `total` as the cell values. Save it as `pivot_report.csv`.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Create a **DataFrame** from a CSV with `pd.read_csv`
- Inspect data with `head()`, `tail()`, `info()`, `describe()`, `shape`, `dtypes`
- Clean missing data with `dropna`, `fillna`, and boolean indexing
- Add and transform columns with `df["new"] = ...` or `df.assign(...)`
- **Aggregate** with `groupby(...).agg(...)` for sums, means, counts
- Sort with `sort_values(...)`, slice top-N with `.head(N)`, write with `to_csv`

### PEP 8 — Style Rules to Apply Strictly to pandas Code

pandas one-liners look elegant in tutorials and unreadable in production. Apply these rules every single time you write a DataFrame chain:

- **Break long chains** across multiple lines using `(` `)` parentheses for line continuation
- Each method on its **own line**, indented one level
- Always **`df = df.copy()`** after a filter to avoid `SettingWithCopyWarning`
- Use **double quotes** for column names: `df["price"]`, never `df['price']` mixing
- Prefer **`.assign()`** for adding columns in a chain (no inplace mutation)
- Never set `inplace=True` — always reassign: `df = df.dropna()`
- Constants at top: `INPUT_FILE = "sales.csv"`, `MIN_PRICE = 0`

> **Inspiration for the road ahead:**
>
> *"Without data, you're just another person with an opinion."*
> — W. Edwards Deming

## Data Engineering Mini Project — Complete ETL Pipeline
Duration: 20:00

**What is ETL?**

ETL stands for **Extract, Transform, Load** — the three universal stages of every data pipeline.
1. **Extract** — pull raw data from a source (file, database, API)
2. **Transform** — clean, validate, enrich, reshape it
3. **Load** — save the result to a destination (file, warehouse, dashboard)

### The ETL Pipeline You Are About to Build

```
                              HitaVir Tech Sales ETL
                              ----------------------

  +---------------+      +---------------+      +-------------------+
  |    EXTRACT    |      |   TRANSFORM   |      |       LOAD        |
  |               |      |               |      |                   |
  | sales_raw.csv | ---> |  validate     | ---> |  sales_cleaned.csv|
  |               |      |  type-cast    |      |  rejected.csv     |
  | input/        |      |  enrich       |      |  daily_report.json|
  +---------------+      |  categorize   |      +-------------------+
                         +---------------+               |
                                |                        v
                                v                +-------------------+
                         +---------------+       |    pipeline.log   |
                         | rejected.csv  |       |  (every step is   |
                         | (bad records) |       |   logged here)    |
                         +---------------+       +-------------------+

  Every arrow above is one Python function. Every function is logged.
  If a record fails validation, it goes to rejected.csv with the reason.
```

Time to build a **real, production-quality ETL pipeline** that combines everything you have learned: variables, control flow, functions, data structures, file I/O, error handling, and logging.

### The Scenario

HitaVir Tech receives daily sales CSV files. You need to build an automated pipeline that:

1. Reads the raw CSV
2. Validates every record against business rules
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
# All "knobs" of the pipeline live here, not buried in code
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
    """Configure logging to write to BOTH a file and the console."""
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

    # Check required fields are present and non-empty
    for field in rules["required_fields"]:
        if not record.get(field, "").strip():
            errors.append(f"Missing required field: {field}")

    # Validate quantity
    try:
        qty = int(record.get("quantity", 0))
        if qty < rules["min_quantity"]:
            errors.append(f"Quantity {qty} below minimum {rules['min_quantity']}")
    except ValueError:
        errors.append(f"Invalid quantity: {record.get('quantity')}")

    # Validate price
    try:
        price = float(record.get("price", 0))
        if price < rules["min_price"]:
            errors.append(f"Price {price} below minimum {rules['min_price']}")
        if price > rules["max_price"]:
            errors.append(f"Price {price} above maximum {rules['max_price']}")
    except ValueError:
        errors.append(f"Invalid price: {record.get('price')}")

    # Validate region (if provided)
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

        # Type conversion (CSV strings → numbers)
        record["quantity"] = int(record["quantity"])
        record["price"] = float(record["price"])

        # Enrichment — add computed fields
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

    # Save rejected records (always useful for debugging)
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
    """Generate a JSON pipeline run report."""
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
# Calls every step in the right order
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

**What is the if-name-main idiom?**

`if __name__ == "__main__":` is a standard Python idiom that means: "Only run `run_pipeline()` if this file is executed directly (`python etl_pipeline.py`), NOT if it is imported by another file." It is how you make a Python file work both as a script and as a reusable module.

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
│   ├── rejected_records.csv ← Failed records (for debugging)
│   └── daily_report.json    ← Summary report
└── logs/
    └── pipeline.log         ← Execution log
```

> **HitaVir Tech says:** "This is a real ETL pipeline. It extracts, validates, transforms, loads, reports, and logs. This exact pattern scales from 10 records to 10 million. Add PySpark and you are ready for Big Data."

### Assignment 8 — Extend the ETL Pipeline (capstone)

**Goal:** Modify the production pipeline you just built to add new business rules, a new tier, and richer reporting.

**The scenario:** Sales leadership added three asks: catch typo orders, identify "whale" customers, and surface the top buyers in the daily report.

**Tasks:**

1. Open `pipeline_project/etl_pipeline.py` in VS Code.
2. **New validation rule.** In `validate_record`, add a check: if `quantity > 1000`, reject with reason `"quantity too large (likely typo)"`. Add a new key to `CONFIG["rules"]` for this maximum (`"max_quantity": 1000`).
3. **New tier.** In `transform`, add a "Whale" tier above "Enterprise":
   - `total >= 5000` -> `"Whale"`
   - `total >= 1000` -> `"Enterprise"`
   - `total >= 200`  -> `"Business"`
   - else            -> `"Consumer"`
4. **Richer report.** In `generate_report`, add a `top_customers` section: top 5 customers by total spend, formatted as `[{"customer": "Alice Johnson", "spend": 1999.98}, ...]`.
5. Edit `pipeline_project/input/sales_raw.csv` and add 2 test rows:
   - One row with `quantity=2000` (should be rejected)
   - One row with `total >= 5000` (should land in the new Whale tier)
6. Run `python etl_pipeline.py` and verify:
   - `output/rejected_records.csv` contains your typo row
   - `output/sales_cleaned.csv` shows a `"Whale"` in the `tier` column
   - `output/daily_report.json` includes `top_customers`

**Success criteria:**

- [ ] New rule reads its limit from `CONFIG["rules"]["max_quantity"]` (no magic numbers)
- [ ] Whale tier appears in cleaned CSV
- [ ] `top_customers` section in JSON has up to 5 entries, sorted descending
- [ ] Pipeline log shows the typo rejection and the Whale assignment
- [ ] All existing tests still pass — no regression on the current good records

**Stretch goal:** Add command-line arguments using `argparse` so the pipeline can be run with `python etl_pipeline.py --input path/to/file.csv --top-n 10`.

```bash
cd ~/python-de-learning
```

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Build a complete **Extract → Transform → Load** pipeline from scratch
- Structure a project with `input/`, `output/`, `logs/` folders
- Drive behaviour from a **CONFIG dict** — no magic numbers in code
- Validate every record at the boundary, log rejections with reasons
- Write both **`cleaned.csv`** and a JSON **summary report**
- Make the pipeline **idempotent** — running twice produces identical output

### PEP 8 — Style Rules to Apply Strictly to ETL Pipelines

Capstone code is what hiring managers read first. Apply these rules every single time you ship a pipeline:

- **Imports at top**, grouped (stdlib → third-party → local) with one blank line between groups
- Constants in **`UPPER_SNAKE_CASE`** at module top (e.g., `INPUT_PATH`, `MAX_QUANTITY`)
- One **`def`** per pipeline stage: `extract()`, `transform()`, `load()` — single responsibility
- **Docstrings** on every stage explaining args, returns, raises
- **Type hints** everywhere: `def transform(records: list[dict]) -> list[dict]:`
- An `if __name__ == "__main__":` guard at the bottom
- Run **`black .`** and **`flake8 .`** before committing — zero warnings is the bar

> **Inspiration for the road ahead:**
>
> *"First, solve the problem. Then, write the code."*
> — John Johnson

## Intermediate Concepts
Duration: 12:00

**Why these matter in DE**

Comprehensions, lambdas, and classes are the patterns that turn a Python beginner into a productive Data Engineer. They make code shorter, clearer, and reusable.

```bash
cat > intermediate.py << 'PYEOF'
"""
HitaVir Tech - Intermediate Python for Data Engineering
"""

# ====== LIST COMPREHENSIONS ======
# A list comprehension builds a new list from another iterable, in ONE line.
# Pattern: [expression for item in iterable if condition]
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

# Transform AND filter in one line
discounted = [round(p * 0.9, 2) for p in prices if p > 100]
print(f"10% discount on premium items: {discounted}")

# Dictionary comprehension — same idea, building a dict
products = ["Laptop", "Mouse", "Keyboard", "Monitor"]
prices_list = [999.99, 29.99, 79.99, 449.99]
catalog = {product: price for product, price in zip(products, prices_list)}
print(f"\nCatalog: {catalog}")

# ====== LAMBDA FUNCTIONS ======
print(f"\n{'=' * 60}")
print("LAMBDA FUNCTIONS")
print("=" * 60)

# Named function:
def calculate_tax(amount):
    return round(amount * 0.18, 2)

# Lambda equivalent (inline, anonymous):
tax = lambda amount: round(amount * 0.18, 2)

print(f"Tax on $100: ${tax(100)}")

# Common use: sorting complex data by a custom key
sales = [
    {"product": "Laptop", "revenue": 4999.95},
    {"product": "Mouse", "revenue": 149.95},
    {"product": "Monitor", "revenue": 449.99},
]

sorted_sales = sorted(sales, key=lambda x: x["revenue"], reverse=True)
print("\nSales sorted by revenue:")
for s in sorted_sales:
    print(f"  {s['product']}: ${s['revenue']:,.2f}")

# Common use: map and filter together
amounts = [100, 250, 50, 800, 30, 1200]
large_with_tax = list(map(lambda x: round(x * 1.18, 2), filter(lambda x: x > 200, amounts)))
print(f"\nLarge amounts with 18% tax: {large_with_tax}")

# ====== BASIC OOP (Object-Oriented Programming) ======
# A class is a blueprint; an object is an instance built from it.
# Real-life analogy: "Car" is a class; your specific car is an object.
print(f"\n{'=' * 60}")
print("CLASSES (BASIC OOP)")
print("=" * 60)

class DataPipeline:
    """A reusable data pipeline class."""

    def __init__(self, name, source, destination):
        # __init__ is the constructor — runs when you create an object
        # self refers to "this specific instance"
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
        return self  # returning self enables method chaining

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
        # __str__ controls what print(object) shows
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
# An API (Application Programming Interface) is a URL that returns data
# (usually JSON). The requests library lets you call APIs in one line.
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

### Assignment 9 — Refactor Assignment 4 with Pythonic Tools

**Goal:** Take the sales aggregator from Assignment 4 and rewrite it using comprehensions, lambdas, and a class — the trifecta of intermediate Python.

**The scenario:** Code review feedback says your aggregator works but is "too imperative." Refactor it.

**Tasks:**

1. Copy `assignment_04_data_structures.py` to `assignment_09_intermediate.py`.
2. Replace the manual region-grouping loop with a `defaultdict(float)` and a single `for sale in sales: by_region[sale["region"]] += sale["amount"]`. Then convert `by_region` into a regular dict using a **dict comprehension** that also rounds to 2 decimals.
3. Replace the top-customer loop with `max(...)` plus a **lambda** key.
4. Wrap everything in a class `SalesAggregator` with:
   - `__init__(self)` -> initializes empty internal dicts
   - `add_sale(self, customer, region, amount)` -> records one sale
   - `revenue_by_region(self)` -> returns the dict
   - `top_customer(self)` -> returns `(name, amount)`
   - `__str__(self)` -> returns a one-line summary
5. In `if __name__ == "__main__":`, build the aggregator from the same input list, call each method, and print the results.

**Success criteria:**

- [ ] At least one **list or dict comprehension** is used
- [ ] At least one **lambda** is used (with `sorted`, `max`, `filter`, or `map`)
- [ ] Class has `__init__`, three methods, and `__str__`
- [ ] Same numeric output as Assignment 4 (Alice = $3,800 top customer)
- [ ] Code passes `black` formatter and `flake8` with zero warnings

**Stretch goal:** Make the class iterable by adding `__iter__` so you can write `for sale in aggregator:` to walk through every recorded sale.

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Replace verbose loops with **list / dict / set comprehensions**
- Use **`lambda`** with `sorted`, `max`, `filter`, `map` for one-liners
- Define **classes** with `__init__`, methods, and `__str__`
- Group state and behaviour together (Object-Oriented Programming basics)
- Iterate custom objects by adding **`__iter__`**

### PEP 8 — Style Rules to Apply Strictly to Comprehensions, Lambdas, and Classes

Pythonic code is judged at this level. Apply these rules every single time:

- **Class names** → `PascalCase` (e.g., `SalesAggregator`, `ETLPipeline`)
- **Method names** → `snake_case` (e.g., `add_sale`, `revenue_by_region`)
- **One blank line** between methods, **two blank lines** between top-level classes
- **Lambdas only for trivial one-liners** — anything bigger gets a `def`
- Comprehensions only when they fit **on one readable line** — otherwise use a regular `for` loop
- **Magic methods** (`__init__`, `__str__`, `__iter__`) follow the dunder naming convention
- Private attributes use **a single leading underscore**: `self._cache`

> **Inspiration for the road ahead:**
>
> *"Beautiful is better than ugly. Readability counts."*
> — Tim Peters, *The Zen of Python*

## Best Practices and Project Structure
Duration: 6:00

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
# A docstring describes what a function does, its arguments, and what it returns.
# Tools like VS Code, Sphinx, and your future self all read these.
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

### The 10 Habits of Good Data Engineers

1. **Use virtual environments** — never install libraries globally
2. **Pin dependency versions** — `pandas==2.2.1`, not just `pandas`
3. **Never hardcode secrets** — use environment variables / `.env`
4. **Always log, never `print`** in production code
5. **Validate at the boundary** — check inputs from files/APIs, trust internal calls
6. **Make pipelines idempotent** — running twice gives the same result
7. **Save rejected records** — never silently drop bad data
8. **Use type hints** — `def func(x: int) -> str:` (introduced in Python 3.5+)
9. **Write unit tests** — pytest is the standard
10. **Commit often, with clear messages** — `git commit -m "feat: add region filter"`

> **HitaVir Tech says:** "Code is read 10× more than it is written. Follow naming conventions, write docstrings, and organize your projects. Your future self and your teammates will thank you."

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Lay out a Data Engineering project the way real teams do (`src/`, `tests/`, `data/`, `logs/`)
- Apply naming conventions consistently (snake_case / PascalCase / UPPER_SNAKE)
- Write **docstrings** on every public function and module
- Make pipelines **idempotent** — same input, same output, every run
- Validate at the boundary; trust internal calls
- Save **rejected records**; never silently drop bad data
- Manage **secrets** through environment variables, never hardcoded

### PEP 8 — The Style Rules That Define a Professional

These are the rules every Data Engineering team enforces in code review. Apply them every single time:

- **Imports** at the top of every file, grouped (stdlib → third-party → local), one blank line between groups
- **Constants** in `UPPER_SNAKE_CASE` at module top — never magic numbers buried in code
- **No bare `except:`** — always specific exceptions, always log them
- **F-strings** over `%` and `.format()` (Python 3.6+ standard)
- **`pathlib`** over `os.path` string-joining
- **`black`** + **`flake8`** clean before every commit — zero warnings is the contract

> **Inspiration for the road ahead:**
>
> *"Make it work, make it right, make it fast."*
> — Kent Beck

## Debugging and Troubleshooting
Duration: 6:00

### Common Python Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `ModuleNotFoundError` | Package not installed | `pip install package_name` |
| `FileNotFoundError` | Wrong file path | Use `os.path.exists()` to check first |
| `IndentationError` | Mixed tabs and spaces | Use VS Code's "Convert Indentation" |
| `TypeError` | Wrong data type | Use `type()` to debug, convert types |
| `KeyError` | Dict key missing | Use `.get(key, default)` instead of `[key]` |
| `UnicodeDecodeError` | File encoding issue | Add `encoding="utf-8"` to `open()` |
| `IndexError` | List index out of range | Check `len(list)` before accessing |
| `AttributeError` | Calling method that doesn't exist | Check `dir(object)` to see available methods |

### Windows-Specific Issues

| Issue | Fix |
|-------|-----|
| `python` not found | Use `python3` or reinstall with PATH checked |
| Path uses backslash | Use forward slashes: `"C:/Users/..."` or raw strings: `r"C:\Users\..."` |
| Permission denied | Run terminal as Administrator |
| `venv` won't activate | Use `venv\Scripts\activate` (Command Prompt) or `source venv/Scripts/activate` (Git Bash) |

### Debugging Technique — The Print-Statement Trick

```python
# When something is wrong, add print statements to inspect the state:
print(f"DEBUG: variable = {variable}")
print(f"DEBUG: type = {type(variable)}")
print(f"DEBUG: len = {len(data)}")

# Or use Python's built-in debugger:
# python -m pdb your_script.py
```

### Reading a Traceback

When Python crashes, it prints a **traceback** — the trail of function calls leading to the error. Read it **bottom up**:

```
Traceback (most recent call last):
  File "etl_pipeline.py", line 100, in <module>
    run_pipeline()
  File "etl_pipeline.py", line 80, in run_pipeline
    cleaned = transform(raw_data, ...)
  File "etl_pipeline.py", line 50, in transform
    record["price"] = float(record["price"])
ValueError: could not convert string to float: 'abc'
                                                ^^^^^
                                  This is the actual problem
```

> **HitaVir Tech says:** "Every bug is a lesson. Read the error message carefully — Python tells you exactly what went wrong and on which line. The traceback is your best debugging friend."

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Recognise the **8 most common Python errors** by their names (`ModuleNotFoundError`, `KeyError`, `IndexError`, etc.)
- Read a **traceback** bottom-up to find the actual line that failed
- Fix Windows-specific issues (PATH, encoding, line endings, venv activation)
- Use `os.path.exists()`, `.get(key, default)`, and `len()` checks **before** the failing call

### PEP 8 — Style Rules to Apply Strictly During Debugging

Bugs hide in inconsistent code. Apply these rules every single time you debug:

- Use the **`logging`** module to print debug info — never leave `print()` calls behind
- Catch **specific** exceptions — `except ValueError as e:` not `except Exception:`
- Always include the **error variable** in the log: `logger.error("Failed: %s", e)`
- Re-raise with `raise` (no argument) to preserve the traceback
- Run **`flake8`** *before* hunting bugs — many "bugs" are linter warnings you ignored
- Keep a clean repo — `black .` first, *then* debug

> **Inspiration for the road ahead:**
>
> *"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."*
> — Brian Kernighan

## Python Interview Questions for Data Engineering
Duration: 12:00

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

### What You Have Learnt on This Page

By the end of this page you should be able to confidently:

- Answer the **25 most-asked Python DE interview questions** with concrete examples
- Walk through trade-offs (list vs. tuple, `==` vs. `is`, append vs. extend)
- Explain pandas operations (`groupby`, `merge`, `apply`, `pivot_table`) under pressure
- Demonstrate production-grade thinking — error handling, logging, idempotency
- Handle **secrets** correctly (`.env`, env vars, never in code)

### PEP 8 — Style Rules to Apply Strictly in the Interview Itself

Whiteboards and shared editors are where interviewers judge your discipline. Apply these rules every single time:

- Indent with **4 spaces** even on a whiteboard — never sloppy 2-space pseudocode
- Name functions and variables in **`snake_case`** out loud as you write
- Open every function with a one-line docstring: `"""Return the top customer."""`
- Verbalize **type hints** when you write a signature
- Catch a **specific** exception, not `except Exception:` — interviewers notice
- After "I'm done", say: *"In production I'd run this through `black` and `flake8`."*

> **Inspiration for the road ahead:**
>
> *"Talk is cheap. Show me the code."*
> — Linus Torvalds

## Summary and Next Steps
Duration: 3:00

Congratulations! You have completed **Python for Data Engineering** by **HitaVir Tech**!

### What You Mastered

| Module | Skills |
|--------|--------|
| Basics | Variables, types, operators, f-strings |
| Control Flow | if/else, for/while loops, break/continue |
| Functions | All 11 function types, decorators, generators |
| Data Structures | Lists, dicts, sets, tuples, list of dicts |
| File I/O | CSV read/write, JSON handling, log parsing |
| Error Handling | try/except, logging, graceful failures |
| pandas | DataFrames, cleaning, transformation, aggregation |
| ETL Pipeline | Complete extract-transform-load with reporting |
| Intermediate | Comprehensions, lambdas, OOP, APIs |
| Best Practices | Naming, structure, docstrings, secrets |

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
+----------------------------------------------+
|  Python Basics (you finished this codelab!)  |   <-- you are here
+----------------------------------------------+
                       |
                       v
+----------------------------------------------+
|  SQL + Database Design                       |
+----------------------------------------------+
                       |
                       v
+----------------------------------------------+
|  pandas + Data Transformation                |
+----------------------------------------------+
                       |
                       v
+----------------------------------------------+
|  Apache Spark (PySpark)                      |
+----------------------------------------------+
                       |
                       v
+----------------------------------------------+
|  Airflow (Pipeline Orchestration)            |
+----------------------------------------------+
                       |
                       v
+----------------------------------------------+
|  Cloud Platforms (AWS / Azure / GCP)         |
+----------------------------------------------+
                       |
                       v
+----------------------------------------------+
|  Databricks + Delta Lake (production scale)  |
+----------------------------------------------+
```

> **HitaVir Tech says:** "You now have the Python foundation that every data engineer needs. The language is your tool — data is your mission. Go build pipelines that move data, transform businesses, and create value."

### What You Have Learnt Across This Codelab

By finishing this codelab you have proven you can confidently:

- Set up a **professional Python environment** on Windows (Python, pip, VS Code, venv)
- Apply **PEP 8** rigorously across every concept — variables, control flow, functions, files
- Use **all 5 core data types** and **all 4 data structures** fluently
- Build **production-grade ETL pipelines** with logging, error handling, and config
- Wield **pandas** for cleaning, transformation, and aggregation at scale
- Write **OOP, comprehensions, lambdas, decorators** — the Pythonic toolbox
- Speak about your code in interviews using DE-specific examples

### PEP 8 — Your Lifelong Engineering Habit

This is not the end of the style journey — it is the start. From this codelab onward, **every** repo you push to GitHub, **every** PR you open, **every** notebook you share will be:

- **`black`-formatted** before commit (no exceptions)
- **`flake8`-clean** with zero warnings
- Documented with **docstrings** and **type hints**
- Free of magic numbers, bare excepts, and hardcoded secrets

> **Inspiration for the road ahead:**
>
> *"The journey of a thousand miles begins with a single step. You have just taken thousands."*
> — Adapted from Lao Tzu

## Congratulations
Duration: 1:00

You have successfully completed **Python Programming for Data Engineering** by **HitaVir Tech**!

### What You Built

- A complete development environment
- Multiple hands-on Python scripts (one per concept)
- A production-quality ETL pipeline with logging and error handling
- Data cleaning and transformation workflows
- Automated report generation

### Your Files

```
python-de-learning/
├── venv/
├── requirements.txt
│
├── test_setup.py
├── basics_variables.py
├── basics_types.py
├── basics_operators.py
├── basics_input.py
├── control_if.py
├── control_loops.py
├── func_01_basics.py
├── func_02_defaults_kwargs.py
├── func_03_args.py
├── func_04_kwargs.py
├── func_05_advanced.py
├── func_06_pipeline.py
├── data_structures.py
├── create_sample_data.py
├── file_csv.py
├── file_json.py
├── file_logs.py
├── error_handling.py
├── pandas_basics.py
├── intermediate.py
├── best_practices.py
│
├── assignment_00_pep8.py            <-- Style refactor drill
├── assignment_01_basics.py          <-- Pipeline Stats Calculator
├── assignment_02_control.py         <-- Data Quality Gate
├── assignment_03_functions.py       <-- Reusable Validation Toolkit
├── assignment_04_data_structures.py <-- Sales Aggregator
├── assignment_05_files.py           <-- CSV to JSON Region Report
├── assignment_06_errors.py          <-- Bullet-Proof CSV Reader
├── assignment_07_pandas.py          <-- Daily Sales Report
├── assignment_09_intermediate.py    <-- Pythonic refactor
│
├── pipeline_project/                <-- Capstone (Assignment 8)
│   ├── etl_pipeline.py
│   ├── input/sales_raw.csv
│   ├── output/
│   └── logs/
└── (data files created during exercises)
```

### Assignment Tracker — Tick Each One Off

```
+---------------------------------------------------------------+
|  [ ]  Assignment 0  -  Style-Refactor Drill                   |
|  [ ]  Assignment 1  -  Pipeline Stats Calculator              |
|  [ ]  Assignment 2  -  Data Quality Gate                      |
|  [ ]  Assignment 3  -  Reusable Validation Toolkit            |
|  [ ]  Assignment 4  -  Sales Aggregator                       |
|  [ ]  Assignment 5  -  CSV to JSON Region Report              |
|  [ ]  Assignment 6  -  Bullet-Proof CSV Reader                |
|  [ ]  Assignment 7  -  Daily Sales Report with pandas         |
|  [ ]  Assignment 8  -  Extend the ETL Pipeline (capstone)     |
|  [ ]  Assignment 9  -  Refactor Assignment 4 (intermediate)   |
+---------------------------------------------------------------+
```

When all 10 boxes are ticked, you have a portfolio of working pipeline code you can show in any DE interview.

Keep coding, keep building pipelines, and keep growing with HitaVir Tech!

### What You Have Learnt — and What You Carry Forward

You now own a complete portfolio of working Data Engineering code:

- A production-quality **ETL pipeline** with logging, validation, and reporting
- **10 hands-on assignments** covering every Python concept used in the field
- A **virtual environment** and project structure you can reuse for any new pipeline
- **PEP 8 muscle memory** — you no longer think about indentation, naming, or imports

### PEP 8 — One Final Promise to Yourself

Before you close this codelab, commit out loud:

- *"I will never push code that has not been formatted with `black`."*
- *"I will never push code that has not been linted with `flake8`."*
- *"I will write docstrings and type hints — every function, every time."*
- *"I will treat every code review as a chance to learn, not a defence."*

> **Inspiration for the road ahead:**
>
> *"The only way to learn a new programming language is by writing programs in it."*
> — Dennis Ritchie, creator of C
>
> You did exactly that. Now go build pipelines that move the world.

**Happy engineering!**

summary: HitaVir Tech Learning Guidelines - Learn Like a Top Performer
id: batch5-intro
categories: Data Engineering, Learning, Productivity
tags: learning, productivity, mindset, data-engineering, best-practices, career
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# HitaVir Tech Learning Guidelines: Learn Like a Top Performer

## Introduction
Duration: 5:00

Welcome to **HitaVir Tech Learning Guidelines: Learn Like a Top Performer**!

This is not just another orientation session. This is your **flight manual** — the operational playbook that will determine whether you survive or thrive in the high-intensity world of Data Engineering.

### Why This Codelab Exists

Every year, thousands of learners start Data Engineering programs. Most follow tutorials, watch videos, and collect certificates. Very few become **job-ready engineers**. The difference is never about talent. It is always about **how you learn**.

| Learner Type | What They Do | Outcome |
|-------------|-------------|---------|
| Passive Learner | Watches videos, reads docs, collects certificates | Struggles in interviews, cannot build from scratch |
| Active Learner | Types commands, reads errors, takes notes | Gets through basics but plateaus |
| **Top Performer** | **Executes, debugs, rebuilds, explains, and pushes limits** | **Gets hired. Builds real systems. Leads teams.** |

This codelab transforms you into a **Top Performer**.

### The Real-World Problem

In a production environment, nobody hands you a step-by-step guide. You get a Jira ticket that says:

```
TICKET: DE-4521
Title: Data pipeline failing for EU region customers
Priority: P1 (Critical)
Description: The nightly ETL job for EU customer data has been
failing since 02:00 UTC. Revenue dashboards are stale.
Downstream ML models are training on outdated data.
Fix ASAP.
```

The engineer who solves this ticket is not the one who watched the most tutorials. It is the one who **practiced under pressure, debugged methodically, and built muscle memory through execution**.

That engineer is who you are about to become.

**Your training starts now. Strap in.**

### Who This Is For

- Data Engineering learners at any level (beginner to advanced)
- Anyone starting the HitaVir Tech program
- Engineers who want to upgrade their learning methodology
- Career switchers building their first technical skill set

## What You Will Build
Duration: 3:00

By the end of this codelab, you will build a **complete personal learning system** that includes:

### Your Learning Infrastructure

```
hitavir-learning-system/
  README.md                          <-- Your learning manifesto
  journal/
    week-01.md                       <-- Weekly progress logs
    week-02.md
  debug-log/
    errors-and-fixes.md              <-- Personal error database
  notes/
    topic-notes-template.md          <-- Structured note-taking
  challenges/
    rebuild-tracker.md               <-- Rebuild attempt logs
  interview-prep/
    questions-bank.md                <-- Interview Q&A collection
```

### Your Engineering Mindset Framework

You will internalize and practice:

| Framework | What It Does |
|-----------|-------------|
| Execute-Understand-Explain Cycle | Turns commands into knowledge |
| The Debugging Protocol | Makes you fearless with errors |
| Checkpoint Discipline | Prevents cascading failures |
| The Rebuild Challenge | Converts tutorials into real skills |
| The Learning Journal System | Tracks growth and catches patterns |
| Productivity Discipline | Builds professional-grade work habits |
| Real-World Thinking | Bridges the gap between lab and production |

### The End State

When you complete this codelab and apply its principles consistently:

```
Before:  "I followed the tutorial but I cannot do it on my own"
After:   "I can build this from scratch and explain every decision"
```

**You will not just learn Data Engineering. You will learn how to learn anything.**

## What You Will Learn
Duration: 3:00

### Core Learning Strategies

- The **Execute-Understand-Explain** cycle for deep retention
- A structured **debugging methodology** that eliminates panic
- **Checkpoint validation** habits that prevent compounding errors
- The **Rebuild Challenge** technique for converting tutorials into real skills
- A **learning journal system** used by top engineers
- **Productivity discipline** frameworks for focused deep work
- **Real-world thinking** patterns that bridge lab exercises and production systems

### Professional Skills

- How to document your learning for career acceleration
- How to build a GitHub portfolio that impresses recruiters
- How to prepare for technical interviews using your lab work
- How to manage cloud costs while learning
- How to collaborate effectively using Git workflows

### Multi-Cloud Awareness

- Understanding how learning strategies apply across **AWS, Azure, and GCP**
- Building cloud-agnostic problem-solving skills
- Recognizing equivalent services across platforms
- Developing a **Databricks-first** mindset for unified analytics

### Career Outcomes

```
After internalizing these guidelines:
  [x] You approach every new technology with a proven system
  [x] You debug issues in minutes instead of hours
  [x] You can rebuild any lab exercise from memory
  [x] Your GitHub portfolio demonstrates real engineering skill
  [x] You walk into interviews with genuine confidence
```

## Prerequisites
Duration: 2:00

### What You Need

| Requirement | Details |
|-------------|---------|
| Computer | Any OS (Windows, Mac, or Linux) |
| Internet | Stable connection for cloud exercises |
| GitHub Account | Free account at [github.com](https://github.com) |
| Text Editor | VS Code recommended (free) |
| Terminal | Git Bash (Windows), Terminal (Mac/Linux) |
| Attitude | Willingness to fail, debug, and rebuild |

### What You Do NOT Need

- Prior programming experience
- Cloud computing knowledge
- Linux expertise
- An expensive setup

### Mindset Prerequisites (Non-Negotiable)

```
Before starting, commit to these:

  [ ] I will type every command myself — no blind copy-paste
  [ ] I will read every error message completely before searching
  [ ] I will attempt to rebuild exercises without the guide
  [ ] I will keep a daily learning journal
  [ ] I will ask for help after 20 minutes of being stuck (not 2 hours)
  [ ] I understand that struggling IS the learning process
```

**If you are not ready to commit to these, stop here. Come back when you are. There are no shortcuts at this altitude.**

## Architecture Overview
Duration: 5:00

### The Learning System Architecture

This codelab teaches a **layered learning system** — each layer builds on the previous one:

```
  Layer 7: REAL-WORLD THINKING
    "What would happen in production?"
    ─────────────────────────────────────────────────
  Layer 6: PRODUCTIVITY DISCIPLINE
    Focused work blocks, daily systems
    ─────────────────────────────────────────────────
  Layer 5: LEARNING JOURNAL
    Track, reflect, identify patterns
    ─────────────────────────────────────────────────
  Layer 4: REBUILD CHALLENGE
    Close the guide. Build from scratch.
    ─────────────────────────────────────────────────
  Layer 3: CHECKPOINT VALIDATION
    Verify before advancing
    ─────────────────────────────────────────────────
  Layer 2: DEBUGGING MINDSET
    Errors are data. Read them. Fix them.
    ─────────────────────────────────────────────────
  Layer 1: EXECUTE-UNDERSTAND-EXPLAIN
    The fundamental learning cycle
    ─────────────────────────────────────────────────
  Layer 0: LEARN BY DOING
    Hands on the keyboard. Always.
```

### How This Maps to Data Engineering

| Learning Layer | Data Engineering Application |
|---------------|------------------------------|
| Learn by Doing | Run every Spark job, every SQL query, every CLI command |
| Execute-Understand-Explain | Know WHY your pipeline works, not just THAT it works |
| Debugging Mindset | Fix broken ETL jobs at 3 AM without panicking |
| Checkpoint Validation | Validate row counts, data quality, schema after every step |
| Rebuild Challenge | Recreate a full data pipeline from a blank terminal |
| Learning Journal | Track which Spark optimizations worked and which did not |
| Productivity Discipline | Ship production-grade code consistently |
| Real-World Thinking | Design for failure, scale, cost, and security |

### Multi-Cloud Learning Architecture

The same learning framework applies across all cloud platforms:

```
  ┌──────────────────────────────────────────────────────────┐
  │              YOUR LEARNING FRAMEWORK                      │
  │         (Same methodology, any platform)                  │
  ├────────────────┬────────────────┬────────────────────────┤
  │      AWS       │     Azure      │         GCP            │
  ├────────────────┼────────────────┼────────────────────────┤
  │ S3, Glue,      │ ADLS, ADF,     │ GCS, Dataflow,        │
  │ Redshift, EMR  │ Synapse, HDI   │ BigQuery, Dataproc    │
  ├────────────────┼────────────────┼────────────────────────┤
  │           Databricks (runs on all three)                  │
  └──────────────────────────────────────────────────────────┘
```

**Master the learning system once. Apply it everywhere.**

## Layer 0 — Learn by Doing
Duration: 8:00

### Step Objective

Internalize the most fundamental principle: **you learn engineering by engineering things**. Reading about it, watching videos about it, or thinking about it is not enough. Your hands must be on the keyboard.

### Why This Step Matters

Research on skill acquisition consistently shows the same finding: active practice beats passive consumption by an order of magnitude. A study by the National Training Laboratories found:

```
Learning Retention Rates:
  Lecture (passive listening)        →  5%
  Reading                            → 10%
  Audio-Visual (videos)              → 20%
  Demonstration (watching someone)   → 30%
  Discussion                         → 50%
  Practice by Doing                  → 75%
  Teaching Others / Immediate Use    → 90%
```

HitaVir Tech codelabs are designed for the **75-90% retention zone**.

### The Rules of Learn by Doing

**Rule 1: Type Every Command Yourself**

Never copy-paste a command blindly. When a codelab says "run this command," your fingers must type it character by character.

```
Why? Because typing forces your brain to process every flag,
every parameter, every path. Copy-paste skips all of that.

Bad:   Ctrl+C from codelab → Ctrl+V into terminal → Enter
Good:  Read command → Understand each part → Type it → Run it → Read output
```

**Rule 2: Read Every Output**

When a command produces output, do not skip to the next step. Read the output. Ask yourself:

```
  - What did the command actually do?
  - Is this output what I expected?
  - Are there any warnings I should understand?
  - What would change if I modified a parameter?
```

**Rule 3: Break Things on Purpose**

Once you successfully run a command, try running it wrong:

```
Example - You just created an S3 bucket:
  aws s3 mb s3://my-data-lake-bucket --region us-east-1

Now break it intentionally:
  aws s3 mb s3://my-data-lake-bucket --region us-east-1    ← duplicate name
  aws s3 mb s3://UPPERCASE-BUCKET --region us-east-1       ← invalid naming
  aws s3 mb s3://my-bucket --region invalid-region         ← bad region

Each error teaches you something the success never could.
```

**You do not learn to fly by reading the manual. You learn to fly by flying.**

### Hands-On Exercise — Practice Learn by Doing Right Now

Open your terminal and practice this principle immediately:

```bash
# Step 1: Create a practice directory
mkdir -p ~/hitavir-learning-lab/practice

# Step 2: Navigate into it
cd ~/hitavir-learning-lab/practice

# Step 3: Create a file
echo "I learn by doing, not by watching." > my-first-lesson.txt

# Step 4: Read the output
cat my-first-lesson.txt

# Step 5: Now break it intentionally
cat nonexistent-file.txt
```

### Expected Output

```
# After Step 4:
I learn by doing, not by watching.

# After Step 5:
cat: nonexistent-file.txt: No such file or directory
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `mkdir: cannot create directory` | Directory already exists | Add `-p` flag or check with `ls` first |
| `bash: cd: No such file or directory` | Typo in path | Verify path with `ls` or `pwd` |
| `Permission denied` | No write access | Check permissions with `ls -la` or use a different directory |

### Checkpoint

```
Before moving on, verify:
  [x] You typed the commands yourself (not copy-pasted)
  [x] You read the output of each command
  [x] You intentionally caused an error and read the error message
  [x] You understand why the error occurred
```

## Layer 1 — The Execute-Understand-Explain Cycle
Duration: 8:00

### Step Objective

Master the three-phase learning cycle that converts commands into permanent knowledge.

### Why This Step Matters

Most learners stop at "Execute." They run the command, see it work, and move on. But executing without understanding is just muscle memory without comprehension. And understanding without the ability to explain is knowledge that fades within days.

**Precision beats speed. A pilot who rushes the checklist crashes. An engineer who rushes the learning never truly learns.**

### The Cycle

```
  ┌─────────────┐
  │   EXECUTE   │ ← Run the command, write the code, perform the action
  └──────┬──────┘
         │
  ┌──────▼──────┐
  │ UNDERSTAND  │ ← Read the output, check what changed, trace the logic
  └──────┬──────┘
         │
  ┌──────▼──────┐
  │   EXPLAIN   │ ← Say it out loud or write it down: WHY did it work?
  └─────────────┘
```

### How to Apply Each Phase

**EXECUTE Phase:**

Do not just run the command. Set up your observation:

```
Before running any command, answer:
  1. What do I EXPECT this command to do?
  2. What files/resources will it create or modify?
  3. What should the output look like?

Then run it.
```

**UNDERSTAND Phase:**

After the command runs, compare reality with your expectation:

```
After the command runs:
  1. Was the output what I expected?
  2. If not, what is different and why?
  3. What side effects occurred (new files, changed permissions, etc.)?
  4. What would happen if I ran this again?
```

**EXPLAIN Phase:**

This is where real learning happens. Force yourself to articulate:

```
Explain to yourself (or a rubber duck):
  1. What the command did in plain language
  2. Why each flag/parameter was necessary
  3. What would go wrong without each part
  4. When you would use this in a real job
```

### Hands-On Exercise — Practice the Cycle

Let us apply the cycle to a real scenario:

```bash
# EXECUTE: Create a Git repository
cd ~/hitavir-learning-lab
git init my-first-repo
cd my-first-repo
```

Now practice the UNDERSTAND phase. Answer these:

```
  - What did "git init" actually create?
  - Where is the repository metadata stored?
  - What would happen if you ran "git init" again in the same directory?
```

Verify your understanding:

```bash
# Check what git init created
ls -la
ls -la .git/
```

Now practice the EXPLAIN phase — say this out loud:

```
"git init creates a new Git repository by generating a hidden
.git directory that contains the repository metadata, including
the object database, refs, HEAD pointer, and configuration.
Running it again in an existing repo is safe — it does not
overwrite existing data."
```

### Multi-Cloud Application of the Cycle

The same cycle applies to every cloud platform:

| Phase | AWS Example | Azure Example | GCP Example |
|-------|-------------|---------------|-------------|
| EXECUTE | `aws s3 ls` | `az storage account list` | `gcloud storage ls` |
| UNDERSTAND | What S3 buckets exist? What region? What access? | What storage accounts? What tier? | What GCS buckets? What class? |
| EXPLAIN | "This lists all S3 buckets in my account sorted by creation date" | "This shows storage accounts across all resource groups" | "This lists GCS buckets in the active project" |

### Databricks Application

```
EXECUTE:    Run a PySpark query in a Databricks notebook
UNDERSTAND: Check the Spark UI — how many stages? How much shuffle?
EXPLAIN:    "This query triggered a wide transformation because of
            the groupBy, which caused a shuffle across 200 partitions"
```

### Expected Output

```
# After git init:
Initialized empty Git repository in /home/user/hitavir-learning-lab/my-first-repo/.git/

# After ls -la:
total 0
drwxr-xr-x  3 user user  60 Apr 14 10:00 .
drwxr-xr-x  4 user user  80 Apr 14 10:00 ..
drwxr-xr-x  7 user user 140 Apr 14 10:00 .git

# After ls -la .git/:
total 12
drwxr-xr-x 7 user user 140 Apr 14 10:00 .
drwxr-xr-x 3 user user  60 Apr 14 10:00 ..
-rw-r--r-- 1 user user  23 Apr 14 10:00 HEAD
drwxr-xr-x 2 user user  40 Apr 14 10:00 branches
-rw-r--r-- 1 user user  92 Apr 14 10:00 config
...
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `git: command not found` | Git not installed | Install Git: `sudo apt install git` or use Git Bash on Windows |
| `fatal: not a git repository` | Not inside a git repo directory | Run `pwd` to check location, `cd` to correct directory |
| `Reinitialized existing Git repository` | Running `git init` in existing repo | This is safe — not an error, just a warning |

### Checkpoint

```
Before moving on, verify:
  [x] You ran git init and examined the .git directory
  [x] You can explain what git init creates without looking
  [x] You practiced all three phases: Execute, Understand, Explain
  [x] You said your explanation out loud (not just thought it)
```

## Layer 2 — The Debugging Mindset
Duration: 10:00

### Step Objective

Transform your relationship with errors. Stop fearing them. Start reading them like a map that leads directly to the fix.

### Why This Step Matters

In production Data Engineering, you will spend **more time debugging than building**. Pipelines break at 3 AM. Data arrives malformed. Cloud services throw cryptic error codes. The engineer who panics wastes hours. The engineer with a debugging system fixes it in minutes.

**When you face turbulence, you do not eject. You stabilize, assess, and adjust course.**

### The Debugging Protocol

```
  Step 1: STOP          → Do not change anything yet
  Step 2: READ          → Read the ENTIRE error message (every line)
  Step 3: CLASSIFY      → What type of error is this?
  Step 4: ISOLATE       → What specific line/component failed?
  Step 5: HYPOTHESIZE   → What is the most likely cause?
  Step 6: TEST          → Change ONE thing and test again
  Step 7: DOCUMENT      → Write down what fixed it
```

### Error Classification System

Learn to instantly classify errors:

```
SYNTAX ERRORS (Your code has a typo)
  ─────────────────────────────────────
  Signs: "SyntaxError", "unexpected token", "parse error"
  Fix:   Check the exact line mentioned, character by character
  Example: Missing colon, unclosed bracket, wrong indentation

CONNECTION ERRORS (Cannot reach the service)
  ─────────────────────────────────────
  Signs: "ConnectionRefused", "timeout", "unreachable", "ECONNREFUSED"
  Fix:   Check endpoint URL, port, network, VPN, firewall
  Example: Database not running, wrong hostname, blocked port

PERMISSION ERRORS (Not authorized)
  ─────────────────────────────────────
  Signs: "AccessDenied", "403 Forbidden", "Permission denied", "Unauthorized"
  Fix:   Check IAM roles, policies, credentials, file permissions
  Example: Wrong AWS keys, missing role assignment, chmod needed

DATA ERRORS (Bad input data)
  ─────────────────────────────────────
  Signs: "NullPointerException", "TypeError", "schema mismatch"
  Fix:   Check input data for nulls, type mismatches, schema changes
  Example: CSV with extra column, null in non-nullable field

RESOURCE ERRORS (Not enough resources)
  ─────────────────────────────────────
  Signs: "OutOfMemory", "disk full", "quota exceeded"
  Fix:   Scale resources, optimize query, clean disk, request quota increase
  Example: Spark job OOM on small cluster, S3 bucket limit reached
```

### Hands-On Exercise — Practice Debugging

Create intentional errors and practice the protocol:

```bash
# Navigate to practice area
cd ~/hitavir-learning-lab/practice

# ERROR 1: File not found
cat this-file-does-not-exist.txt
# Practice: READ the error. CLASSIFY it. What type is it?

# ERROR 2: Permission denied
touch /root/unauthorized-file.txt
# Practice: READ the error. CLASSIFY it. Why did it fail?

# ERROR 3: Command not found
databrickzz --version
# Practice: READ the error. CLASSIFY it. What is the fix?

# ERROR 4: Invalid argument
mkdir ""
# Practice: READ the error. CLASSIFY it. What went wrong?
```

### Expected Output

```
# ERROR 1 output:
cat: this-file-does-not-exist.txt: No such file or directory
  → Classification: FILE/PATH ERROR
  → Fix: Check filename spelling, check current directory with pwd

# ERROR 2 output:
touch: cannot touch '/root/unauthorized-file.txt': Permission denied
  → Classification: PERMISSION ERROR
  → Fix: Check user permissions, use sudo if authorized, or choose different path

# ERROR 3 output:
bash: databrickzz: command not found
  → Classification: COMMAND ERROR (typo in command name)
  → Fix: Check spelling, verify installation, check PATH

# ERROR 4 output:
mkdir: cannot create directory '': No such file or directory
  → Classification: ARGUMENT ERROR (empty string is invalid)
  → Fix: Provide a valid directory name
```

### Building Your Personal Error Database

Create a debug log that you maintain throughout the program:

```bash
# Create your debug log
mkdir -p ~/hitavir-learning-lab/debug-log
cat > ~/hitavir-learning-lab/debug-log/errors-and-fixes.md << 'DEBUGLOG'
# My Debug Log - Error Database

### Format
| Date | Error Message | Classification | Root Cause | Fix |
|------|--------------|----------------|------------|-----|
| 2026-04-14 | cat: file: No such file or directory | Path Error | Wrong filename | Check spelling and pwd |
| 2026-04-14 | Permission denied | Permission Error | No write access to /root | Use home directory |

### Lessons Learned
- Always check pwd before running file operations
- Read the ENTIRE error message before searching online
- Change ONE thing at a time when debugging
DEBUGLOG

# Verify it was created
cat ~/hitavir-learning-lab/debug-log/errors-and-fixes.md
```

### Multi-Cloud Debugging Reference

| Error Pattern | AWS | Azure | GCP |
|--------------|-----|-------|-----|
| Auth failure | Check `~/.aws/credentials` | Run `az login` | Run `gcloud auth login` |
| Resource not found | Check region in AWS Console | Check resource group | Check project ID |
| Quota exceeded | Request increase in Service Quotas | Azure portal > Quotas | IAM > Quotas |
| Network timeout | Check VPC/Security Groups | Check NSG/Firewall | Check VPC/Firewall rules |

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `bash: command not found` | Tool not installed or not in PATH | Install the tool or add to PATH |
| `ECONNREFUSED` | Service not running on that port | Start the service or check port |
| `403 Forbidden` | Missing permissions | Check IAM policies or API keys |
| `OOM Killed` | Process used too much memory | Reduce data size or increase memory |

### Checkpoint

```
Before moving on, verify:
  [x] You triggered 4 different types of errors intentionally
  [x] You classified each error correctly
  [x] You created your personal debug log file
  [x] You can explain the 7-step Debugging Protocol from memory
```

**Every error you encounter from this point forward goes into your debug log.**

## Layer 3 — Checkpoint Validation
Duration: 5:00

### Step Objective

Build the habit of verifying your work after every significant action. Never assume success — **confirm it**.

### Why This Step Matters

In Data Engineering, a silent failure in Step 3 becomes an impossible-to-diagnose disaster in Step 15. A pipeline that "looks like it worked" but loaded 50,000 rows instead of 500,000 costs the company millions in bad decisions downstream.

**Check your instruments after every maneuver. Always.**

### The Validation Framework

```
  After CREATING a resource:
    → Verify it exists (list, describe, check in console)
    → Verify its configuration matches your intent

  After LOADING data:
    → Check row counts (source vs destination)
    → Spot-check sample records
    → Verify data types and schema

  After RUNNING a pipeline:
    → Check job status (succeeded, not just submitted)
    → Check logs for warnings (not just errors)
    → Verify output data quality

  After CONFIGURING a service:
    → Test the connection immediately
    → Verify with a simple query or health check
    → Check permissions with a non-admin user
```

### Hands-On Exercise — Practice Checkpoint Validation

```bash
cd ~/hitavir-learning-lab/practice

# ACTION: Create 3 files
echo "Data Engineering" > file1.txt
echo "Cloud Computing" > file2.txt
echo "Machine Learning" > file3.txt

# CHECKPOINT: Verify all 3 files exist
ls -la file*.txt
# Expected: 3 files listed

# CHECKPOINT: Verify content is correct
cat file1.txt && cat file2.txt && cat file3.txt
# Expected: Each file shows its content

# CHECKPOINT: Verify file count
ls file*.txt | wc -l
# Expected: 3

# ACTION: Combine files
cat file1.txt file2.txt file3.txt > combined.txt

# CHECKPOINT: Verify combined file
wc -l combined.txt
# Expected: 3 lines

cat combined.txt
# Expected: All 3 lines present
```

### Data Engineering Checkpoint Examples

| Action | Checkpoint Command | What to Verify |
|--------|-------------------|----------------|
| Created S3 bucket | `aws s3 ls s3://bucket-name` | Bucket exists and is accessible |
| Loaded CSV to database | `SELECT COUNT(*) FROM table` | Row count matches source file |
| Ran Spark job | Check Spark UI | Job completed, no failed stages |
| Created Databricks cluster | Cluster status in workspace | State is "Running", config is correct |
| Deployed Airflow DAG | Airflow UI > DAGs | DAG is visible and not paused |

### Expected Output

```
# After ls -la file*.txt:
-rw-r--r-- 1 user user 17 Apr 14 10:30 file1.txt
-rw-r--r-- 1 user user 16 Apr 14 10:30 file2.txt
-rw-r--r-- 1 user user 17 Apr 14 10:30 file3.txt

# After wc -l combined.txt:
3 combined.txt

# After cat combined.txt:
Data Engineering
Cloud Computing
Machine Learning
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| File count mismatch | Glob pattern did not match all files | Check pattern, check current directory |
| `wc -l` shows 0 | File is empty or has no newlines | Check file content with `cat` or `hexdump` |
| Combined file missing lines | Source files had no trailing newline | Add newlines or use `echo` instead of `printf` |

### Checkpoint

```
Before moving on, verify:
  [x] You created the 3 files and combined file
  [x] You validated each action with a checkpoint command
  [x] You understand why checkpoint validation prevents cascading failures
  [x] You commit to validating after every significant step in future codelabs
```

## Layer 4 — The Rebuild Challenge
Duration: 8:00

### Step Objective

Develop the ability to recreate any exercise **from scratch, without the guide**. This is where tutorials become skills.

### Why This Step Matters

Following a guide is navigation by GPS. Rebuilding from memory is navigation by skill. When the GPS fails — and in production, it always does — only skill saves you.

**Anyone can follow a flight plan. The best pilots fly by instinct — because they trained until the plan was second nature.**

### The Three-Attempt System

```
  ATTEMPT 1: Guided Rebuild
  ─────────────────────────────
  - Complete the exercise normally
  - Take notes on key commands and decisions
  - Immediately afterward: rebuild with the guide open for reference
  - Time yourself

  ATTEMPT 2: Notes-Only Rebuild
  ─────────────────────────────
  - Close the codelab completely
  - Open only your personal notes
  - Rebuild the entire exercise
  - Mark anything you had to look up
  - Time yourself (should be faster)

  ATTEMPT 3: Blank-Screen Rebuild
  ─────────────────────────────
  - Close everything: no guide, no notes
  - Open a blank terminal
  - Rebuild from memory
  - Time yourself (aim for 50% of Attempt 1)

  If you complete Attempt 3, you OWN that skill.
```

### Hands-On Exercise — Your First Rebuild Challenge

You have practiced several things in this codelab. Now rebuild them:

**Challenge: Without scrolling up, recreate the following from memory:**

```
1. Create the directory structure:
   ~/hitavir-learning-lab/
     practice/
     debug-log/

2. Create a file called my-first-lesson.txt with a meaningful message

3. Create a git repository called my-first-repo

4. Create a debug log template file

5. Combine multiple text files into one
```

### Rebuild Tracker Template

Create a tracker to log your rebuild attempts across all codelabs:

```bash
mkdir -p ~/hitavir-learning-lab/challenges
cat > ~/hitavir-learning-lab/challenges/rebuild-tracker.md << 'TRACKER'
# Rebuild Challenge Tracker

### Format
| Codelab | Attempt | Time | Completion | Notes |
|---------|---------|------|------------|-------|
| Learning Guidelines | 1 (Guided) | -- min | --% | First attempt |
| Learning Guidelines | 2 (Notes) | -- min | --% | |
| Learning Guidelines | 3 (Blank) | -- min | --% | |

### Personal Records
- Fastest full rebuild: --
- Most improved codelab: --
- Skills I can rebuild blind: --
TRACKER

cat ~/hitavir-learning-lab/challenges/rebuild-tracker.md
```

### Expected Output

```
# Your rebuild tracker should be created at:
~/hitavir-learning-lab/challenges/rebuild-tracker.md

# Verify:
cat ~/hitavir-learning-lab/challenges/rebuild-tracker.md
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Cannot remember the commands | Normal on first attempt | Review notes, try again tomorrow |
| Rebuild takes 3x longer than guided | Expected for Attempt 1 | Track improvement over attempts |
| Skipped steps in rebuild | Incomplete mental model | Review the skipped section specifically |

### Checkpoint

```
Before moving on, verify:
  [x] You attempted to rebuild the previous exercises
  [x] You created the rebuild tracker
  [x] You understand the 3-attempt system
  [x] You commit to attempting rebuilds after every codelab
```

## Layer 5 — The Learning Journal System
Duration: 8:00

### Step Objective

Set up a structured journaling system that tracks your learning, catches patterns, and accelerates your growth over time.

### Why This Step Matters

The human brain forgets roughly 70% of new information within 24 hours (the Ebbinghaus forgetting curve). A learning journal is your defense against this. It captures insights at the moment they happen, when they are sharpest.

Top performers across every field — athletes, musicians, engineers, pilots — all maintain logs. It is how they identify what works, what does not, and where to focus next.

**Every mission gets debriefed. Every sortie gets logged. That is how the best get better.**

### The Journal Template

```bash
mkdir -p ~/hitavir-learning-lab/journal
cat > ~/hitavir-learning-lab/journal/week-01.md << 'JOURNAL'
# Week 01 — Learning Journal

### Day 1 — [Date]
**What I Worked On**
- [Codelab name / topic]

**Key Concepts Learned**
- [Concept 1: one sentence explanation]
- [Concept 2: one sentence explanation]

**Commands I Practiced**
  [command 1]
  [command 2]

**Errors I Hit and How I Fixed Them**
| Error | Classification | Fix |
|-------|----------------|-----|
| [error message] | [type] | [what fixed it] |

**What Clicked Today**
- [Aha moment or insight]

**What Is Still Confusing**
- [Question or concept to revisit]

**Rebuild Attempt**
- Attempted: [Yes/No]
- Completion: [percentage]
- What I forgot: [specific commands or concepts]

**Tomorrow's Focus**
- [What to work on next]

---

### Day 2 — [Date]
(Same structure)
JOURNAL

cat ~/hitavir-learning-lab/journal/week-01.md
```

### The Note-Taking Template for Each Topic

```bash
mkdir -p ~/hitavir-learning-lab/notes
cat > ~/hitavir-learning-lab/notes/topic-notes-template.md << 'NOTES'
# [Topic Name] — Notes

### One-Line Summary
[Explain this topic in one sentence]

### Key Concepts
| Concept | What It Does | When to Use It |
|---------|-------------|----------------|
| | | |

### Essential Commands
  [command 1] — [what it does]
  [command 2] — [what it does]

### Architecture / How It Works
[Draw or describe the flow]

### Common Pitfalls
- [Pitfall 1 and how to avoid it]

### Interview-Ready Explanation
"[2-3 sentence explanation you could give in an interview]"

### Related Topics
- [Topic A]
- [Topic B]
NOTES

cat ~/hitavir-learning-lab/notes/topic-notes-template.md
```

### Expected Output

```
# Both files should be created:
~/hitavir-learning-lab/journal/week-01.md
~/hitavir-learning-lab/notes/topic-notes-template.md

# Verify with:
ls -la ~/hitavir-learning-lab/journal/
ls -la ~/hitavir-learning-lab/notes/
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Heredoc not closing properly | Missing `JOURNAL` or `NOTES` at end | Ensure closing tag is on its own line with no spaces |
| File appears empty | Heredoc syntax error | Check for matching opening and closing tags |
| Cannot find file | Created in wrong directory | Use `find ~ -name "week-01.md"` to locate |

### Checkpoint

```
Before moving on, verify:
  [x] Week 01 journal file created with structured template
  [x] Topic notes template created
  [x] You understand the daily journal workflow
  [x] You commit to journaling after every learning session
```

## Layer 6 — Productivity Discipline
Duration: 5:00

### Step Objective

Build professional-grade work habits that maximize focused learning and minimize wasted time.

### Why This Step Matters

The most talented engineers with the worst habits consistently underperform disciplined engineers with moderate talent. Discipline is the multiplier.

**You do not rise to the level of your goals. You fall to the level of your systems.**

### The HitaVir Tech Daily System

```
  ┌──────────────────────────────────────────────────────────┐
  │                    DAILY LEARNING SYSTEM                   │
  ├───────────────┬──────────────────────────────────────────┤
  │ First 15 min  │ Review yesterday's journal               │
  │               │ Set today's ONE clear goal               │
  │               │ Open the codelab you are working on       │
  ├───────────────┼──────────────────────────────────────────┤
  │ Core Block    │ 2-3 hours of FOCUSED lab execution       │
  │ (Deep Work)   │ No phone. No social media. No email.     │
  │               │ Just you, the terminal, and the codelab.  │
  ├───────────────┼──────────────────────────────────────────┤
  │ After Lab     │ Write journal entry                       │
  │ (15 min)      │ Update debug log if any errors            │
  │               │ Attempt rebuild (even partial)            │
  ├───────────────┼──────────────────────────────────────────┤
  │ End of Day    │ Commit and push to GitHub                 │
  │ (10 min)      │ Review what you built today               │
  │               │ Plan tomorrow's focus                     │
  └───────────────┴──────────────────────────────────────────┘
```

### The Rules of Deep Work

```
Rule 1: ONE codelab at a time. Do not context-switch between labs.
Rule 2: Phone goes on silent and OUT OF SIGHT during core block.
Rule 3: Close all browser tabs except the codelab and terminal.
Rule 4: If stuck for 20 minutes, ask for help. Do not waste 2 hours.
Rule 5: Take a 5-minute break every 50 minutes (Pomodoro-style).
Rule 6: Push to GitHub EVERY DAY. Green squares build portfolios.
```

### The 20-Minute Rule

```
  Stuck on something?

  Minute 0-5:   Re-read the error message. Re-read the step.
  Minute 5-10:  Search the exact error message online.
  Minute 10-15: Check official documentation.
  Minute 15-20: Try a different approach or simplify the problem.
  Minute 20+:   ASK FOR HELP. Post in Discord with:
                  - What you were trying to do
                  - The exact error message
                  - What you already tried
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Spending 3+ hours stuck | Not following the 20-minute rule | Set a timer, ask for help at 20 min |
| Not retaining information | No journal or review process | Commit to daily journaling |
| Feeling overwhelmed | Trying to do too many codelabs at once | Focus on ONE codelab per day |

### Checkpoint

```
Before moving on, verify:
  [x] You understand the daily learning system
  [x] You have committed to the deep work rules
  [x] You will follow the 20-minute rule for asking help
  [x] You will push to GitHub every day
```

## Layer 7 — Real-World Thinking
Duration: 8:00

### Step Objective

Train yourself to think beyond the lab exercise. Every command you run, every pipeline you build — imagine it running in production serving real users and costing real money.

### Why This Step Matters

The gap between a lab exercise and a production system is enormous. Lab data is clean; production data is messy. Lab environments are stable; production has outages. Lab budgets are unlimited; production costs are watched closely.

**In the real world, there is no safety net. Your systems must handle the unexpected.**

### The Four Questions of Real-World Thinking

Every time you build something, ask these four questions:

```
1. RELIABILITY — "What happens when this fails?"
   ────────────────────────────────────────────────
   - Is there retry logic?
   - Is there alerting and monitoring?
   - Can I re-run this safely (idempotent)?
   - What is the blast radius of a failure?

2. SCALABILITY — "Will this work with 10x or 100x the data?"
   ────────────────────────────────────────────────
   - Am I using partitioning and bucketing?
   - Is my Spark job optimized for shuffle?
   - Will my SQL query perform with 1 billion rows?
   - Am I reading the entire table when I only need a subset?

3. COST — "Am I spending money wisely?"
   ────────────────────────────────────────────────
   - Am I leaving clusters running overnight?
   - Am I storing data in the right storage tier?
   - Can I use spot/preemptible instances?
   - Am I scanning full tables when I could use partitions?

4. SECURITY — "Am I protecting the data and the system?"
   ────────────────────────────────────────────────
   - Am I hardcoding credentials? (NEVER)
   - Are my IAM roles following least privilege?
   - Is sensitive data encrypted?
   - Who has access to what?
```

### Multi-Cloud Cost Awareness

**Free tiers you should use for learning:**

```
AWS Free Tier (12 months):
  S3:      5 GB storage
  EC2:     750 hours t2.micro/month
  RDS:     750 hours db.t2.micro/month
  Lambda:  1M requests/month (always free)

Azure Free Tier:
  $200 credit for 30 days
  12 months of select free services
  Always-free: Functions (1M), Cosmos DB (limited)

GCP Free Tier:
  $300 credit for 90 days
  BigQuery: 1 TB queries/month (always free)
  Functions: 2M invocations/month (always free)

Databricks Community Edition:
  Free cluster (auto-terminates after idle)
  Perfect for learning Spark and Delta Lake
```

### Hands-On Exercise — Real-World Audit

Audit everything you have created in this codelab:

```bash
# Check what you have created
echo "=== Files and directories created ==="
find ~/hitavir-learning-lab -type f | head -20

echo ""
echo "=== Disk space used ==="
du -sh ~/hitavir-learning-lab

echo ""
echo "=== Git repositories created ==="
find ~/hitavir-learning-lab -name ".git" -type d
```

Ask yourself:
```
  - If this were a cloud environment, what would be running?
  - What would I need to shut down to avoid charges?
  - Is any sensitive data stored in these files?
  - Are my Git credentials properly configured (not hardcoded)?
```

### Expected Output

```
# Files and directories:
~/hitavir-learning-lab/practice/my-first-lesson.txt
~/hitavir-learning-lab/practice/file1.txt
~/hitavir-learning-lab/practice/file2.txt
~/hitavir-learning-lab/practice/file3.txt
~/hitavir-learning-lab/practice/combined.txt
~/hitavir-learning-lab/debug-log/errors-and-fixes.md
~/hitavir-learning-lab/journal/week-01.md
~/hitavir-learning-lab/notes/topic-notes-template.md
~/hitavir-learning-lab/challenges/rebuild-tracker.md

# Disk space: minimal (< 1 MB)
# Git repos: 1 (my-first-repo)
```

### Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `find` returns too many results | Starting from `/` or too broad a path | Narrow with `-maxdepth` or specific path |
| `du` shows unexpected large size | Hidden files or `.git` directory | Use `du -sh --exclude=.git` |
| Cloud resources still running | Forgot to shut down after exercise | Check cloud console, terminate/stop resources |

### Checkpoint

```
Before moving on, verify:
  [x] You audited all resources created in this codelab
  [x] You can list the 4 questions of real-world thinking from memory
  [x] You know the free tiers for AWS, Azure, GCP, and Databricks
  [x] You commit to asking these 4 questions in every future codelab
```

## Validation Checkpoints — Full Review
Duration: 5:00

### Complete System Validation

Verify your entire learning system is in place:

```bash
echo "=== Learning System Validation ==="
echo ""

# Check directory structure
echo "1. Directory Structure:"
ls -d ~/hitavir-learning-lab/practice 2>/dev/null && echo "   [PASS] practice/" || echo "   [FAIL] practice/ missing"
ls -d ~/hitavir-learning-lab/debug-log 2>/dev/null && echo "   [PASS] debug-log/" || echo "   [FAIL] debug-log/ missing"
ls -d ~/hitavir-learning-lab/journal 2>/dev/null && echo "   [PASS] journal/" || echo "   [FAIL] journal/ missing"
ls -d ~/hitavir-learning-lab/notes 2>/dev/null && echo "   [PASS] notes/" || echo "   [FAIL] notes/ missing"
ls -d ~/hitavir-learning-lab/challenges 2>/dev/null && echo "   [PASS] challenges/" || echo "   [FAIL] challenges/ missing"
echo ""

# Check key files
echo "2. Key Files:"
test -f ~/hitavir-learning-lab/debug-log/errors-and-fixes.md && echo "   [PASS] debug log" || echo "   [FAIL] debug log missing"
test -f ~/hitavir-learning-lab/journal/week-01.md && echo "   [PASS] journal template" || echo "   [FAIL] journal missing"
test -f ~/hitavir-learning-lab/notes/topic-notes-template.md && echo "   [PASS] notes template" || echo "   [FAIL] notes missing"
test -f ~/hitavir-learning-lab/challenges/rebuild-tracker.md && echo "   [PASS] rebuild tracker" || echo "   [FAIL] rebuild tracker missing"
echo ""

# Check git repo
echo "3. Git Repository:"
test -d ~/hitavir-learning-lab/my-first-repo/.git && echo "   [PASS] git repo initialized" || echo "   [FAIL] git repo missing"
echo ""

echo "=== Validation Complete ==="
```

### Knowledge Self-Test

Answer these without looking back:

```
1. What are the 3 phases of the Execute-Understand-Explain cycle?
2. What are the 7 steps of the Debugging Protocol?
3. Name 4 types of errors in the classification system.
4. What is the 3-attempt rebuild system?
5. What are the 4 questions of real-world thinking?
6. What is the 20-minute rule for getting help?
7. What goes in a daily journal entry?
```

If you can answer all 7 from memory, you have internalized these guidelines.

### Expected Output

```
=== Learning System Validation ===

1. Directory Structure:
   [PASS] practice/
   [PASS] debug-log/
   [PASS] journal/
   [PASS] notes/
   [PASS] challenges/

2. Key Files:
   [PASS] debug log
   [PASS] journal template
   [PASS] notes template
   [PASS] rebuild tracker

3. Git Repository:
   [PASS] git repo initialized

=== Validation Complete ===
```

## Mini Challenges and Exercises
Duration: 5:00

### Challenge 1 — Rebuild the Learning System from Scratch

```
Close this codelab.
Open a blank terminal.
Delete the entire ~/hitavir-learning-lab directory.
Rebuild everything from memory.
Time yourself.
```

### Challenge 2 — Teach Someone Else

Find a friend, peer, or family member. Explain:
- What the Execute-Understand-Explain cycle is
- How the Debugging Protocol works
- Why checkpoint validation matters

If they understand your explanation, you truly know it.

### Challenge 3 — Cloud Service Error Drill

Without looking at the table, fill in:

| Error Pattern | AWS Fix | Azure Fix | GCP Fix |
|--------------|---------|-----------|---------|
| Auth failure | ? | ? | ? |
| Resource not found | ? | ? | ? |
| Quota exceeded | ? | ? | ? |

### Challenge 4 — The One-Minute Pitch

Explain to a hiring manager in 60 seconds:
- How you approach learning new technologies
- How you debug issues systematically
- Why your learning methodology makes you a stronger hire

Time yourself. If it takes more than 60 seconds, simplify.

### Challenge 5 — Debug This

A teammate sends you this message:

```
"My Spark job keeps failing with OutOfMemory error.
I tried increasing the executor memory to 64GB but it
still fails. What should I do?"
```

Write a response using the Debugging Protocol. What questions would you ask? What would you check first?

## Portfolio Enhancement Tips
Duration: 3:00

### Turn This Codelab into a Portfolio Piece

Your learning system itself is a portfolio asset. Here is how to showcase it:

### GitHub Repository Setup

```bash
cd ~/hitavir-learning-lab

# Initialize as a Git repo (if not already)
git init
git add .
git commit -m "feat: initialize learning system with journal, debug log, and rebuild tracker"

# Push to GitHub
# (Create the repo on github.com first, then:)
# git remote add origin https://github.com/YOUR-USERNAME/hitavir-learning-system.git
# git push -u origin main
```

### What Recruiters Notice

| Signal | What It Shows |
|--------|---------------|
| Daily commits in your journal | Consistency and discipline |
| Growing debug log | You learn from mistakes systematically |
| Rebuild tracker with improving times | Deliberate practice mentality |
| Well-structured notes | Communication and documentation skills |
| README with your learning philosophy | Self-awareness and professionalism |

### LinkedIn Strategy

```
After completing this codelab, post:

  "Started my Data Engineering journey at HitaVir Tech with a
   focus on building a structured learning system. My approach:
   Execute-Understand-Explain for every concept. A personal
   debug log for every error. And the rebuild challenge to
   convert tutorials into real skills.

   Day 1 of building in public. #DataEngineering #LearningInPublic"
```

## Interview Questions from This Lab
Duration: 5:00

These questions test the skills and mindset you developed in this codelab. Practice answering them out loud.

### Technical Process Questions

**Q1: How do you approach learning a new technology or tool?**

Use the Execute-Understand-Explain cycle. Describe your structured process.

**Q2: Walk me through how you debug a failing data pipeline.**

Use the 7-step Debugging Protocol. Give a specific example.

**Q3: How do you ensure data quality in your pipelines?**

Reference checkpoint validation — row counts, schema checks, sample verification.

**Q4: How do you manage your work across multiple cloud platforms?**

Reference the cloud-agnostic learning framework — same methodology, any platform.

### Behavioral Questions

**Q5: Tell me about a time you were stuck on a technical problem. How did you resolve it?**

Use a real example from your debug log. Show the systematic approach.

**Q6: How do you stay productive when working on complex, long-running tasks?**

Reference the daily learning system, deep work blocks, and the 20-minute rule.

**Q7: How do you handle learning something completely outside your comfort zone?**

Reference the layered learning system: start with execution, build understanding, then explain.

### Architecture Questions

**Q8: How would you design a system to handle 10x your current data volume?**

Reference real-world thinking — reliability, scalability, cost, security.

### Practice Format

```
For every question:
  1. Answer out loud (2 minutes max)
  2. Record yourself if possible
  3. Review for clarity and confidence
  4. Practice with a peer (mock interviews)
  5. Add the question and your best answer to:
     ~/hitavir-learning-lab/interview-prep/questions-bank.md
```

### Create Your Interview Prep Bank

```bash
mkdir -p ~/hitavir-learning-lab/interview-prep
cat > ~/hitavir-learning-lab/interview-prep/questions-bank.md << 'INTERVIEW'
# Interview Questions Bank

### From: Learning Guidelines Codelab
| # | Question | My Answer (Summary) | Confidence |
|---|----------|---------------------|------------|
| 1 | How do you learn new tech? | Execute-Understand-Explain cycle | High/Med/Low |
| 2 | How do you debug pipelines? | 7-step protocol | High/Med/Low |
| 3 | How ensure data quality? | Checkpoint validation | High/Med/Low |
| 4 | Multi-cloud management? | Cloud-agnostic methodology | High/Med/Low |
| 5 | Stuck on a problem? | Debug log example | High/Med/Low |
| 6 | Staying productive? | Daily system + 20-min rule | High/Med/Low |
| 7 | Learning outside comfort? | Layered learning system | High/Med/Low |
| 8 | Design for 10x scale? | 4 questions framework | High/Med/Low |

### From: [Next Codelab]
(Add questions as you complete more codelabs)
INTERVIEW

cat ~/hitavir-learning-lab/interview-prep/questions-bank.md
```

## Final Summary
Duration: 3:00

### What You Built

```
  [x] Complete learning directory structure
  [x] Personal debug log with error database
  [x] Weekly journal template with daily structure
  [x] Topic notes template for structured note-taking
  [x] Rebuild challenge tracker
  [x] Interview questions bank
  [x] Git repository for version control
```

### What You Learned

```
  [x] Layer 0: Learn by Doing — hands on keyboard, always
  [x] Layer 1: Execute-Understand-Explain — the 3-phase learning cycle
  [x] Layer 2: Debugging Mindset — 7-step protocol, error classification
  [x] Layer 3: Checkpoint Validation — verify before advancing
  [x] Layer 4: Rebuild Challenge — 3-attempt system for deep retention
  [x] Layer 5: Learning Journal — structured daily documentation
  [x] Layer 6: Productivity Discipline — deep work systems
  [x] Layer 7: Real-World Thinking — reliability, scalability, cost, security
```

### What Is Next

Your next codelab is **Data Engineering Environment Setup on Windows 11**, where you will install and configure your complete development environment. Apply everything you learned here:

- **Execute** every installation command yourself
- **Understand** what each tool does and why it is needed
- **Explain** the purpose of each tool in your journal
- **Validate** every installation with a version check
- **Log** any errors in your debug log
- **Rebuild** the setup on a clean machine if possible

### The Final Word

You now have something most learners never build: **a system**.

Not just knowledge about Data Engineering — but a repeatable, proven methodology for learning anything. The Execute-Understand-Explain cycle. The Debugging Protocol. The Rebuild Challenge. The Journal. The daily discipline.

These are not optional extras. These are the tools that separate engineers who get hired from engineers who keep applying.

The road ahead is demanding. There will be errors that make no sense. There will be concepts that take three attempts to click. There will be days where nothing seems to work.

Those are the days that matter most. Those are the days where the real learning happens. The engineers who make it are not the ones with the most talent — **they are the ones who refused to stop executing**.

You have the training. You have the system. You have the discipline.

**Now get to work. The mission is yours.**

## Cleanup
Duration: 2:00

This codelab creates only local files. No cloud resources to clean up.

### What to Keep

```
KEEP these (they are your learning infrastructure):
  ~/hitavir-learning-lab/journal/          <-- Your daily log
  ~/hitavir-learning-lab/debug-log/        <-- Your error database
  ~/hitavir-learning-lab/notes/            <-- Your topic notes
  ~/hitavir-learning-lab/challenges/       <-- Your rebuild tracker
  ~/hitavir-learning-lab/interview-prep/   <-- Your interview bank
  ~/hitavir-learning-lab/my-first-repo/    <-- Your first Git repo
```

### What You Can Clean Up

```
OPTIONAL cleanup (practice files only):
  rm ~/hitavir-learning-lab/practice/file1.txt
  rm ~/hitavir-learning-lab/practice/file2.txt
  rm ~/hitavir-learning-lab/practice/file3.txt
  rm ~/hitavir-learning-lab/practice/combined.txt
```

### Push to GitHub

```bash
cd ~/hitavir-learning-lab
git add .
git commit -m "feat: complete Learning Guidelines codelab - learning system initialized"
# git push origin main
```

### For Future Codelabs — Cleanup Habit

Build this habit now so it becomes automatic:

```
After EVERY codelab:
  1. Stop any running clusters, VMs, or services
  2. Delete temporary cloud resources (test buckets, temp databases)
  3. Check your cloud billing dashboard
  4. Commit and push all work to GitHub
  5. Write your journal entry
  6. Update your debug log with any new errors
```

**Resource management is an engineering discipline. Practice it from day one.**

Proceed to the next codelab: **Data Engineering Environment Setup on Windows 11**.

summary: Learn Git and GitHub from scratch using Git Bash with hands-on exercises
id: git-github-basics-gitbash
categories: Git, GitHub, DevOps, Version Control
tags: beginner, intermediate, gitbash, data-engineering, ai
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Git and GitHub Basics with Git Bash Command Line - Beginner to Intermediate

## Introduction
Duration: 5:00

Welcome to **Git and GitHub Basics with Git Bash Command Line** by **HitaVir Tech**!

This hands-on codelab teaches you Git and GitHub from absolute zero using **Git Bash on Windows**. Whether you are in Data Engineering, Data Analytics, or AI — Git is a skill you cannot skip.

### What is Git?

**Git** is a **version control system** that tracks changes to your files over time. It is like a time machine for your code.

```
Without Git:
  project_final.py
  project_final_v2.py
  project_final_REAL_final.py
  project_final_REAL_final_v3_fixed.py    ← Chaos!

With Git:
  project.py  (Git tracks every version internally)
  → commit 1: "Initial project setup"
  → commit 2: "Add data pipeline logic"
  → commit 3: "Fix bug in ETL process"
  → commit 4: "Add unit tests"              ← Clean!
```

### What is GitHub?

**GitHub** is a cloud platform that hosts your Git repositories online. Think of it this way:

| Git | GitHub |
|-----|--------|
| Tool on your computer | Website in the cloud |
| Tracks changes locally | Stores code online |
| Works offline | Requires internet |
| Command line tool | Web interface + collaboration |

### Why Git is Essential in Data Engineering and AI

1. **Data Pipelines** — track changes to ETL scripts, DAGs, and configs
2. **ML Models** — version your training scripts, notebooks, and parameters
3. **Team Collaboration** — multiple data engineers working on the same pipeline
4. **CI/CD** — automate testing and deployment of data applications
5. **Portfolio** — GitHub is your resume in tech

### Real-World HitaVir Tech Example

At HitaVir Tech, we use Git for everything:

```
hitavir-data-platform/
├── pipelines/           ← ETL scripts (versioned in Git)
├── models/              ← ML model code (versioned in Git)
├── configs/             ← Environment configs (versioned in Git)
├── tests/               ← Test scripts (versioned in Git)
└── docs/                ← Documentation (versioned in Git)
```

Every change is tracked. Every mistake can be undone. Every team member can work simultaneously.

### What You Will Build in This Lab

By the end of this codelab, you will:

- Create and manage a Git repository from scratch
- Master add, commit, status, log, branch, merge
- Connect to GitHub and push/pull code
- Simulate a real DevOps workflow
- Build a complete mini project: **HitaVir Tech Learning Repo**

### The Git Workflow — Big Picture

```
  You write code
       │
       ▼
  ┌──────────┐    git add     ┌──────────┐   git commit   ┌──────────┐
  │ Working  │ ──────────────▶│ Staging  │ ──────────────▶│  Local   │
  │Directory │               │  Area    │               │   Repo   │
  └──────────┘               └──────────┘               └──────────┘
                                                              │
                                                         git push
                                                              │
                                                              ▼
                                                        ┌──────────┐
                                                        │  GitHub  │
                                                        │ (Remote) │
                                                        └──────────┘
```

> **HitaVir Tech says:** "Git is not optional in tech. It is like electricity — everything runs on it. Master it now, and you will thank yourself for the rest of your career."

## Prerequisites
Duration: 3:00

Before starting, make sure you have:

### Required

- A computer running **Windows 10 or 11**
- **Git** installed (we will cover installation in the next step)
- A free **GitHub account** — [sign up here](https://github.com/join)
- A text editor (VS Code recommended — [download here](https://code.visualstudio.com/))

### No Prior Knowledge Needed

This codelab assumes **zero experience** with Git, GitHub, or version control. We start from the very beginning.

### What You Should Already Know

- How to open an application on Windows
- How to type on a keyboard
- What a file and folder are

That is it. Everything else, we will teach you.

> **HitaVir Tech says:** "If you can save a file on your computer, you can learn Git. It is that simple."

## Setup Git Bash
Duration: 8:00

Let us install Git and configure it for first use.

### Step 1 — Install Git on Windows

**Option 1 — Download from website**

Go to [https://git-scm.com/download/win](https://git-scm.com/download/win) and download the **64-bit Windows installer**.

Run the installer with these settings:

1. Click **Next** through initial screens
2. **Adjusting your PATH**: Select **"Git from the command line and also from 3rd-party software"**
3. **Default editor**: Select **VS Code** (or your preferred editor)
4. **Default branch name**: Select **"Override — main"**
5. Accept defaults for remaining screens
6. Click **Install**

**Option 2 — Using winget**

Open PowerShell as Administrator and run:

```console
winget install Git.Git
```

### Step 2 — Open Git Bash

Press `Win + S`, type **Git Bash**, and open it.

You should see a prompt like:

```
user@COMPUTER MINGW64 ~
$
```

The `$` means Git Bash is ready for your commands.

### Step 3 — Verify Installation

```bash
git --version
```

**Expected output:**

```
git version 2.44.0.windows.1
```

Any version 2.30+ is fine.

### Step 4 — Configure Your Identity

Git needs to know who you are. This information is attached to every commit you make.

**Set your name:**

```bash
git config --global user.name "Your Name"
```

Example:

```bash
git config --global user.name "HitaVir Tech"
```

**Set your email (use the same email as your GitHub account):**

```bash
git config --global user.email "your.email@example.com"
```

### Step 5 — Set Default Branch Name

```bash
git config --global init.defaultBranch main
```

This ensures new repositories use `main` as the default branch (not the older `master`).

### Step 6 — Set Default Editor

```bash
git config --global core.editor "code --wait"
```

This sets VS Code as your Git editor. Use `nano` or `vim` if you prefer those.

### Step 7 — Verify Configuration

```bash
git config --list
```

**Expected output (partial):**

```
user.name=HitaVir Tech
user.email=your.email@example.com
init.defaultbranch=main
core.editor=code --wait
```

### What Each Setting Does

| Setting | Purpose |
|---------|---------|
| `user.name` | Your name in commit history |
| `user.email` | Your email in commit history |
| `init.defaultBranch` | Default branch name for new repos |
| `core.editor` | Editor for commit messages |

> **HitaVir Tech says:** "This is a one-time setup. Once configured, Git remembers your identity on every project. Think of it as writing your name on your notebook — you only do it once."

## Create Your First Repository
Duration: 8:00

A **repository** (or "repo") is a folder that Git tracks. Every file change inside this folder is recorded.

### Real-World Analogy

Think of a repository as a **project diary**. Every time you make a significant change, you write an entry (commit). You can flip back to any page (version) at any time.

### Step 1 — Create a Project Folder

```bash
mkdir git-learning
cd git-learning
```

### Step 2 — Initialize Git

```bash
git init
```

**Expected output:**

```
Initialized empty Git repository in /c/Users/YourName/git-learning/.git/
```

### Step 3 — Understand the .git Folder

Git created a hidden folder called `.git` inside your project:

```bash
ls -la
```

**Expected output:**

```
total 0
drwxr-xr-x 1 user group 0 Apr  6 10:00 .
drwxr-xr-x 1 user group 0 Apr  6 10:00 ..
drwxr-xr-x 1 user group 0 Apr  6 10:00 .git
```

The `.git` folder is **Git's brain**. It stores:

| What | Where |
|------|-------|
| All commit history | `.git/objects/` |
| Branch information | `.git/refs/` |
| Current branch pointer | `.git/HEAD` |
| Configuration | `.git/config` |

**Never delete the `.git` folder** — you will lose all your version history.

### Step 4 — Check Repository Status

```bash
git status
```

**Expected output:**

```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

This tells you:

- You are on the `main` branch
- There are no commits yet
- There is nothing to commit (no files yet)

> **HitaVir Tech says:** "`git init` is like installing a security camera in your project folder. It does not record anything yet, but it is ready to track every change you make."

## Git Basic Commands — add, commit, status
Duration: 10:00

This is the most important section. The core Git workflow has three stages:

```
┌──────────────────┐     git add     ┌──────────────────┐    git commit    ┌──────────────────┐
│                  │ ──────────────▶ │                  │ ──────────────▶  │                  │
│  WORKING DIR     │                 │  STAGING AREA    │                  │  REPOSITORY      │
│  (your files)    │                 │  (ready to save) │                  │  (saved forever) │
│                  │ ◀────────────── │                  │                  │                  │
└──────────────────┘   (edit files)  └──────────────────┘                  └──────────────────┘
```

### Stage 1 — Working Directory

This is where you create and edit files. Git sees the files but does not track changes automatically.

### Stage 2 — Staging Area

When you run `git add`, files move to the staging area. Think of it as a **packing box** — you put items in the box before shipping.

### Stage 3 — Repository

When you run `git commit`, staged changes are permanently saved in Git's history.

### Hands-On: The Complete Workflow

**Step 1 — Create a file**

```bash
echo "# Git Learning Project" > README.md
```

**Step 2 — Check status**

```bash
git status
```

**Expected output:**

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

Git sees the file but it is **untracked** (shown in red).

**Step 3 — Add the file to staging**

```bash
git add README.md
```

**Step 4 — Check status again**

```bash
git status
```

**Expected output:**

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

The file is now **staged** (shown in green). It is ready to be committed.

**Step 5 — Commit the file**

```bash
git commit -m "Initial commit: add README"
```

**Expected output:**

```
[main (root-commit) a1b2c3d] Initial commit: add README
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

**Step 6 — Check status one more time**

```bash
git status
```

**Expected output:**

```
On branch main
nothing to commit, working tree clean
```

Your working directory is **clean** — all changes are saved!

### Understanding the Commit Message

```bash
git commit -m "Initial commit: add README"
             │   │              │
             │   │              └── What you did
             │   └── Type of change
             └── The -m flag means "message"
```

Good commit messages follow this pattern:

| Good | Bad |
|------|-----|
| "Add user authentication module" | "update" |
| "Fix data pipeline timeout bug" | "fixed stuff" |
| "Add unit tests for ETL process" | "changes" |

> **HitaVir Tech says:** "Think of `git add` as putting items in your shopping cart, and `git commit` as clicking the checkout button. You can add and remove items from the cart, but once you check out, the order is placed."

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Forgot `-m` in commit | Git opens an editor — type message, save, close |
| Committed wrong file | `git reset HEAD~1` to undo last commit |
| Typo in commit message | `git commit --amend -m "new message"` |

## Working with Multiple Files
Duration: 5:00

In real projects, you work with many files at once. Let us practice.

### Create Multiple Files

```bash
touch file1.txt file2.txt file3.txt
echo "First file content" > file1.txt
echo "Second file content" > file2.txt
echo "Third file content" > file3.txt
```

### Check Status

```bash
git status
```

**Expected output:**

```
On branch main
Untracked files:
        file1.txt
        file2.txt
        file3.txt
```

### Add All Files at Once

```bash
git add .
```

The `.` means "add everything in the current directory."

### Commit All Files

```bash
git commit -m "Add three content files"
```

### Alternative: Add Specific Files

Sometimes you only want to commit certain files:

```bash
touch config.txt notes.txt
echo "APP_PORT=3000" > config.txt
echo "Meeting notes from today" > notes.txt

git add config.txt
git commit -m "Add application config"

git add notes.txt
git commit -m "Add meeting notes"
```

This creates **two separate commits** — each focused on one thing.

### Best Practice: Small, Focused Commits

| Approach | Quality |
|----------|---------|
| One commit per logical change | Professional |
| Add related files together | Good |
| Commit everything at once | Acceptable for small changes |
| Commit unrelated changes together | Bad practice |

> **HitaVir Tech says:** "Each commit should tell a story. When someone reads your commit history, they should understand what changed and why — without looking at the code."

## Git Log and History
Duration: 5:00

Git keeps a complete history of every commit. Let us explore it.

### View Full History

```bash
git log
```

**Expected output:**

```
commit b2c3d4e (HEAD -> main)
Author: HitaVir Tech <your.email@example.com>
Date:   Sun Apr 6 10:30:00 2026 +0530

    Add meeting notes

commit a1b2c3d
Author: HitaVir Tech <your.email@example.com>
Date:   Sun Apr 6 10:25:00 2026 +0530

    Add application config

commit 9f8e7d6
Author: HitaVir Tech <your.email@example.com>
Date:   Sun Apr 6 10:20:00 2026 +0530

    Add three content files

commit 1a2b3c4
Author: HitaVir Tech <your.email@example.com>
Date:   Sun Apr 6 10:15:00 2026 +0530

    Initial commit: add README
```

Press `q` to exit the log viewer.

### Compact View (One Line Per Commit)

```bash
git log --oneline
```

**Expected output:**

```
b2c3d4e (HEAD -> main) Add meeting notes
a1b2c3d Add application config
9f8e7d6 Add three content files
1a2b3c4 Initial commit: add README
```

### Visual Branch History

```bash
git log --oneline --graph --all
```

This shows branches as a graph — very useful when working with multiple branches.

### View a Specific Commit

```bash
git show 1a2b3c4
```

Replace with an actual commit hash from your log.

### Understanding HEAD

```
HEAD → main → latest commit
```

`HEAD` is a pointer that tells Git which commit you are currently on. It usually points to the latest commit on your current branch.

### Log Options Quick Reference

| Command | What It Shows |
|---------|-------------|
| `git log` | Full history with details |
| `git log --oneline` | Compact one-line history |
| `git log --oneline --graph` | Visual branch graph |
| `git log -5` | Last 5 commits only |
| `git log --author="Name"` | Commits by a specific person |
| `git show <hash>` | Details of a specific commit |

> **HitaVir Tech says:** "The commit log is your project's autobiography. Write good commit messages and you will never wonder 'what did I change last week?' again."

## Branching
Duration: 10:00

Branches are one of Git's most powerful features. They let you work on different things **without affecting the main code**.

### What is a Branch?

Think of a branch as a **parallel universe** for your code:

```
main:       A ── B ── C
                       \
feature-1:              D ── E
```

You can experiment freely on `feature-1`. If things go wrong, your `main` branch is untouched.

### Why Use Branches?

| Without Branches | With Branches |
|-----------------|---------------|
| Everyone edits the same code | Each person works independently |
| One bug breaks everything | Bugs are isolated to branches |
| Risky to experiment | Safe to try new ideas |
| No parallel work | Multiple features simultaneously |

### Create a Branch

```bash
git branch feature-1
```

This creates a new branch but does **not** switch to it.

### List All Branches

```bash
git branch
```

**Expected output:**

```
  feature-1
* main
```

The `*` shows your current branch.

### Switch to a Branch

```bash
git checkout feature-1
```

**Expected output:**

```
Switched to branch 'feature-1'
```

### Shortcut: Create and Switch in One Command

```bash
git checkout -b feature-1
```

Or using the newer `switch` command:

```bash
git switch -c feature-1
```

### Make Changes on the Branch

```bash
echo "Feature 1: Data Pipeline Module" > pipeline.py
echo "def extract(): pass" >> pipeline.py
echo "def transform(): pass" >> pipeline.py
echo "def load(): pass" >> pipeline.py
git add pipeline.py
git commit -m "Add data pipeline module with ETL functions"
```

### Verify the Branch Has Your Changes

```bash
git log --oneline
```

You will see your new commit on `feature-1`.

### Switch Back to Main

```bash
git checkout main
```

Now check — `pipeline.py` does **not** exist on main:

```bash
ls
```

The file only exists on `feature-1`! Branches are truly independent.

### Branch Naming Conventions

| Pattern | Example | Use Case |
|---------|---------|----------|
| `feature/name` | `feature/data-pipeline` | New features |
| `bugfix/name` | `bugfix/etl-timeout` | Bug fixes |
| `hotfix/name` | `hotfix/security-patch` | Urgent production fixes |
| `release/version` | `release/v2.0` | Release preparation |

### Visualize Your Branches

```bash
git log --oneline --graph --all
```

**Expected output:**

```
* d4e5f6g (feature-1) Add data pipeline module with ETL functions
* b2c3d4e (HEAD -> main) Add meeting notes
* a1b2c3d Add application config
* 9f8e7d6 Add three content files
* 1a2b3c4 Initial commit: add README
```

> **HitaVir Tech says:** "Branches are free in Git — they cost almost nothing. Use them generously. In a real team, NEVER work directly on `main`. Always create a branch for your work."

## Merge Branches
Duration: 8:00

Once you finish work on a branch, you **merge** it back into `main` to include your changes.

### The Merge Concept

```
Before merge:
main:       A ── B ── C
                       \
feature-1:              D ── E

After merge:
main:       A ── B ── C ──────── F (merge commit)
                       \        /
feature-1:              D ── E
```

### Step 1 — Switch to Main

You always merge **into** the branch you are on:

```bash
git checkout main
```

### Step 2 — Merge the Feature Branch

```bash
git merge feature-1
```

**Expected output:**

```
Updating b2c3d4e..d4e5f6g
Fast-forward
 pipeline.py | 4 ++++
 1 file changed, 4 insertions(+)
 create mode 100644 pipeline.py
```

### Step 3 — Verify the Merge

```bash
ls
```

**Expected output:**

```
README.md  config.txt  file1.txt  file2.txt  file3.txt  notes.txt  pipeline.py
```

`pipeline.py` is now on `main`!

### Step 4 — View the Merged History

```bash
git log --oneline --graph --all
```

### Step 5 — Delete the Merged Branch

After merging, clean up:

```bash
git branch -d feature-1
```

**Expected output:**

```
Deleted branch feature-1 (was d4e5f6g).
```

### Fast-Forward vs Three-Way Merge

| Type | When | What Happens |
|------|------|-------------|
| Fast-forward | Main had no new commits | Git moves the pointer forward |
| Three-way merge | Both branches have new commits | Git creates a merge commit |

### Handling Merge Conflicts

When two branches change the **same line** in the **same file**, Git cannot decide which to keep:

```
<<<<<<< HEAD
Color: Blue
=======
Color: Red
>>>>>>> feature-2
```

**How to resolve:**

1. Open the file in your editor
2. Choose which version to keep (or combine them)
3. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Save the file
5. Run `git add <file>` and `git commit`

> **HitaVir Tech says:** "Merge conflicts are NOT errors. They are Git asking for your human judgment. Do not be afraid of them — they are a normal part of teamwork."

## GitHub Integration
Duration: 10:00

Time to connect your local repository to GitHub and share your code with the world.

### Step 1 — Create a Repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `git-learning`
3. Description: "Learning Git and GitHub with HitaVir Tech"
4. Select **Public**
5. Do **NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 2 — Connect Local to Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/git-learning.git
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3 — Verify the Remote

```bash
git remote -v
```

**Expected output:**

```
origin  https://github.com/YOUR_USERNAME/git-learning.git (fetch)
origin  https://github.com/YOUR_USERNAME/git-learning.git (push)
```

### Step 4 — Set Main Branch

```bash
git branch -M main
```

### Step 5 — Push to GitHub

```bash
git push -u origin main
```

The `-u` flag sets `origin main` as the default upstream. Future pushes only need `git push`.

**Expected output:**

```
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 1.10 KiB | 1.10 MiB/s, done.
Total 12 (delta 2), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/git-learning.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Step 6 — Verify on GitHub

Open `https://github.com/YOUR_USERNAME/git-learning` in your browser. You should see all your files!

### Understanding Remote

```
┌──────────────┐                    ┌──────────────┐
│   Your PC    │     git push       │   GitHub     │
│  (Local)     │ ──────────────────▶│  (Remote)    │
│              │                    │              │
│              │     git pull       │              │
│              │ ◀──────────────────│              │
└──────────────┘                    └──────────────┘
```

| Term | Meaning |
|------|---------|
| `origin` | Nickname for the remote repository URL |
| `upstream` | The original repo (if you forked) |
| `remote` | Any repository that is not on your computer |

> **HitaVir Tech says:** "Think of `git push` as uploading your work to Google Drive, and `git pull` as downloading your team's latest work. Push often, pull before you start working."

## Push and Pull
Duration: 5:00

Push and pull keep your local and remote repositories in sync.

### git push — Upload Your Changes

After making local commits, push them to GitHub:

```bash
echo "# Data Pipeline Configuration" > pipeline_config.yaml
echo "source: postgres" >> pipeline_config.yaml
echo "destination: s3" >> pipeline_config.yaml
git add pipeline_config.yaml
git commit -m "Add pipeline configuration file"
git push
```

### git pull — Download Remote Changes

When teammates push changes (or you edit files on GitHub), pull them:

```bash
git pull origin main
```

Or simply:

```bash
git pull
```

### git fetch — Download Without Merging

```bash
git fetch
```

This downloads remote changes but does **not** merge them. Use `git pull` when you want both.

### The Sync Workflow

```
  Start of day:
  ┌─────────────┐
  │  git pull    │ ← Get latest from team
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Your work   │ ← Code, test, debug
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  git add .   │ ← Stage changes
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  git commit  │ ← Save locally
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  git push    │ ← Share with team
  └─────────────┘
```

> **HitaVir Tech says:** "Always `git pull` before you start working. Always `git push` when you finish. This simple habit prevents 90% of merge conflicts."

## Clone a Repository
Duration: 5:00

Cloning downloads a complete copy of a remote repository to your computer.

### Clone Your Own Repository

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/git-learning.git git-learning-clone
```

This creates a new folder `git-learning-clone` with the full repository.

### Clone Any Public Repository

```bash
git clone https://github.com/firstcontributions/first-contributions.git
```

### What Cloning Gives You

| What | Included? |
|------|-----------|
| All files | Yes |
| Complete commit history | Yes |
| All branches | Yes |
| Remote connection (origin) | Yes, automatically |

### Clone vs Download ZIP

| Feature | `git clone` | Download ZIP |
|---------|------------|-------------|
| Commit history | Full history included | None |
| Git tracking | Ready to use immediately | Must `git init` manually |
| Remote connection | Set up automatically | Must add manually |
| Branches | All branches included | Only default branch |

> **HitaVir Tech says:** "Always use `git clone`, never download ZIP. Cloning gives you the full power of Git — history, branches, and remote connection. ZIP gives you a dead snapshot."

### Clean Up

```bash
cd ~/git-learning
```

Go back to your main project.

## Real-World Workflow Simulation
Duration: 12:00

Let us simulate what a real developer does every day. This is the **most important exercise** in this codelab.

### The Scenario

You are a Data Engineer at HitaVir Tech. Your manager assigns you a task: "Add a data validation module to our pipeline."

### Step 1 — Pull Latest Changes

Always start by getting the latest code:

```bash
cd ~/git-learning
git pull origin main
```

### Step 2 — Create a Feature Branch

Never work on `main` directly:

```bash
git checkout -b feature/data-validation
```

### Step 3 — Write Your Code

```bash
cat > validator.py << 'EOF'
"""
Data Validation Module - HitaVir Tech
Validates data quality before loading into warehouse
"""

def validate_not_null(dataframe, columns):
    """Check that specified columns have no null values"""
    for col in columns:
        null_count = dataframe[col].isnull().sum()
        if null_count > 0:
            raise ValueError(f"Column '{col}' has {null_count} null values")
    return True

def validate_unique(dataframe, columns):
    """Check that specified columns have unique values"""
    for col in columns:
        dupes = dataframe[col].duplicated().sum()
        if dupes > 0:
            raise ValueError(f"Column '{col}' has {dupes} duplicates")
    return True

def validate_range(value, min_val, max_val):
    """Check that a value is within expected range"""
    if not (min_val <= value <= max_val):
        raise ValueError(f"Value {value} outside range [{min_val}, {max_val}]")
    return True

if __name__ == "__main__":
    print("Data Validator ready!")
    print("Modules: validate_not_null, validate_unique, validate_range")
EOF
```

### Step 4 — Add Tests

```bash
cat > test_validator.py << 'EOF'
"""
Tests for Data Validation Module - HitaVir Tech
"""

def test_validate_range_pass():
    from validator import validate_range
    assert validate_range(5, 1, 10) == True
    print("PASS: validate_range with valid input")

def test_validate_range_fail():
    from validator import validate_range
    try:
        validate_range(15, 1, 10)
        print("FAIL: Should have raised ValueError")
    except ValueError:
        print("PASS: validate_range correctly rejects out-of-range")

if __name__ == "__main__":
    test_validate_range_pass()
    test_validate_range_fail()
    print("\nAll tests passed!")
EOF
```

### Step 5 — Stage and Commit

```bash
git add validator.py test_validator.py
git status
git commit -m "feat: add data validation module with tests

- Add validate_not_null for null checking
- Add validate_unique for duplicate detection
- Add validate_range for value range validation
- Add unit tests for range validation"
```

### Step 6 — Push the Branch to GitHub

```bash
git push -u origin feature/data-validation
```

### Step 7 — Merge to Main

In a real team, you would create a Pull Request on GitHub. For this exercise, merge locally:

```bash
git checkout main
git merge feature/data-validation
git push origin main
```

### Step 8 — Clean Up

```bash
git branch -d feature/data-validation
git push origin --delete feature/data-validation
```

### The Complete DevOps Workflow

```
1. git pull              ← Get latest
2. git checkout -b feat  ← Create branch
3. (write code)          ← Do your work
4. git add .             ← Stage changes
5. git commit -m "..."   ← Save locally
6. git push              ← Push branch
7. (create PR on GitHub) ← Request review
8. (merge PR)            ← After approval
9. git checkout main     ← Switch back
10. git pull             ← Get merged changes
```

> **HitaVir Tech says:** "This workflow is used by every tech company on Earth — from startups to Google. Practice it until it becomes muscle memory. You will do this every single day as a developer."

## Git Best Practices
Duration: 5:00

Follow these rules to write professional-quality Git history.

### 1. Write Meaningful Commit Messages

Use the **conventional commits** format:

```
type: short description

Longer explanation if needed
```

| Type | When to Use | Example |
|------|-------------|---------|
| `feat:` | New feature | `feat: add user authentication` |
| `fix:` | Bug fix | `fix: resolve database timeout` |
| `docs:` | Documentation | `docs: update API reference` |
| `test:` | Adding tests | `test: add unit tests for ETL` |
| `refactor:` | Code restructuring | `refactor: optimize query performance` |
| `chore:` | Maintenance | `chore: update dependencies` |

### 2. Make Small, Focused Commits

| Good | Bad |
|------|-----|
| One commit per feature/fix | 50 changed files in one commit |
| Easy to review and revert | Impossible to understand |

### 3. Use Branches for Everything

```
main           ← Always deployable
├── feature/*  ← New features
├── bugfix/*   ← Bug fixes
└── hotfix/*   ← Urgent patches
```

### 4. Never Commit Secrets

Create a `.gitignore` file to exclude sensitive files:

```bash
cat > .gitignore << 'EOF'
# Secrets
.env
*.key
*.pem
credentials.json

# Python
__pycache__/
*.pyc
venv/

# Data files
*.csv
*.parquet
data/

# IDE
.vscode/
.idea/
EOF

git add .gitignore
git commit -m "chore: add .gitignore for secrets and generated files"
git push
```

### 5. Pull Before You Push

```bash
git pull origin main    # Always do this first
git push origin main    # Then push your changes
```

> **HitaVir Tech says:** "Git is a communication tool. Your commit messages, branch names, and history tell a story. Write it for the person who will read it at 3 AM during an outage — that person might be future you."

## Common Mistakes and Fixes
Duration: 8:00

Everyone makes mistakes with Git. Here is how to fix them.

### Mistake 1: Committed Too Early (Undo Last Commit)

Keep the changes, just undo the commit:

```bash
git reset --soft HEAD~1
```

Your files remain staged. You can modify them and recommit.

### Mistake 2: Need to Completely Undo Last Commit

Discard the commit AND the changes:

```bash
git reset --hard HEAD~1
```

**Warning:** This permanently deletes the changes.

### Mistake 3: Made Changes to Wrong File

Restore a file to its last committed state:

```bash
git restore filename.txt
```

### Mistake 4: Accidentally Staged a File

Unstage a file (but keep the changes):

```bash
git restore --staged filename.txt
```

### Mistake 5: Typo in Commit Message

Fix the last commit message:

```bash
git commit --amend -m "Correct commit message"
```

### Mistake 6: Forgot to Add a File to Last Commit

```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

### Mistake 7: Pushed Something Wrong to GitHub

Create a new commit that undoes the previous one:

```bash
git revert HEAD
git push
```

This is safe for shared branches — it does not rewrite history.

### Safety Decision Tree

```
Need to undo?
├── Local only (not pushed)?
│   ├── Keep changes? → git reset --soft HEAD~1
│   └── Discard changes? → git reset --hard HEAD~1
│
└── Already pushed?
    └── git revert HEAD  (safe, creates undo commit)
```

### The Golden Rule

**Never use `git reset --hard` or `git push --force` on shared branches.** These rewrite history and break your teammates' repositories.

> **HitaVir Tech says:** "The ability to undo mistakes is Git's greatest gift. But prevention is better than cure — use `git status` before every commit, and `git diff` before every add."

## Mini Project — HitaVir Tech Learning Repo
Duration: 15:00

Let us build a complete project from scratch, applying everything you have learned.

### The Project

You will create a **Data Engineering Learning Repository** for HitaVir Tech with proper structure, branches, and documentation.

### Step 1 — Create the Repository

```bash
cd ~
mkdir hitavir-de-learning
cd hitavir-de-learning
git init
```

### Step 2 — Add the README

```bash
cat > README.md << 'EOF'
# HitaVir Tech - Data Engineering Learning Repository

Welcome to the HitaVir Tech Data Engineering learning repository!

## About

This repository contains learning materials and code examples for:

- Python for Data Engineering
- SQL and Database Design
- ETL/ELT Pipelines
- Cloud Services (AWS, Azure)
- Git and Version Control

## Structure

```
hitavir-de-learning/
├── python-basics/      Python fundamentals
├── sql-exercises/      SQL practice queries
├── pipelines/          ETL pipeline examples
├── configs/            Configuration files
└── docs/               Documentation
```

## Getting Started

1. Clone this repository
2. Navigate to the topic folder
3. Follow the README in each folder
4. Practice with the exercises

## Author

Created by HitaVir Tech - Batch 5
EOF
```

```bash
git add README.md
git commit -m "docs: add project README with structure overview"
```

### Step 3 — Create Project Structure

```bash
mkdir -p python-basics sql-exercises pipelines configs docs

echo "# Python Basics" > python-basics/README.md
echo "print('Hello from HitaVir Tech!')" > python-basics/hello.py

echo "# SQL Exercises" > sql-exercises/README.md
echo "SELECT * FROM students WHERE batch = 5;" > sql-exercises/query1.sql

echo "# Pipeline Examples" > pipelines/README.md

git add .
git commit -m "feat: create project directory structure with starter files"
```

### Step 4 — Add .gitignore

```bash
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.pyc
venv/
.env

# Data
*.csv
*.parquet
*.xlsx

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
EOF

git add .gitignore
git commit -m "chore: add .gitignore"
```

### Step 5 — Create a Feature Branch for Pipeline Code

```bash
git checkout -b feature/etl-pipeline
```

```bash
cat > pipelines/etl_pipeline.py << 'PYEOF'
"""
ETL Pipeline - HitaVir Tech
Extract, Transform, Load pipeline for batch processing
"""

class ETLPipeline:
    def __init__(self, source, destination):
        self.source = source
        self.destination = destination
        self.data = None

    def extract(self):
        """Extract data from source"""
        print(f"Extracting data from {self.source}...")
        self.data = {"records": 1000, "source": self.source}
        return self

    def transform(self):
        """Transform and clean data"""
        print("Transforming data...")
        self.data["status"] = "cleaned"
        self.data["records_after"] = 950
        return self

    def load(self):
        """Load data to destination"""
        print(f"Loading data to {self.destination}...")
        print(f"Pipeline complete: {self.data['records_after']} records loaded")
        return self

    def run(self):
        """Run full ETL pipeline"""
        return self.extract().transform().load()


if __name__ == "__main__":
    pipeline = ETLPipeline(
        source="postgres://db.hitavir.tech/raw",
        destination="s3://hitavir-warehouse/processed"
    )
    pipeline.run()
PYEOF
```

```bash
git add pipelines/etl_pipeline.py
git commit -m "feat: add ETL pipeline class with extract, transform, load methods"
```

### Step 6 — Add Configuration

```bash
cat > configs/pipeline_config.yaml << 'EOF'
# HitaVir Tech Pipeline Configuration
pipeline:
  name: batch-etl-pipeline
  version: 1.0.0
  schedule: "0 6 * * *"

source:
  type: postgres
  host: db.hitavir.tech
  database: raw_data

destination:
  type: s3
  bucket: hitavir-warehouse
  prefix: processed/

quality:
  null_threshold: 0.05
  duplicate_check: true
EOF

git add configs/pipeline_config.yaml
git commit -m "feat: add pipeline YAML configuration"
```

### Step 7 — Merge Feature Branch to Main

```bash
git checkout main
git merge feature/etl-pipeline
git branch -d feature/etl-pipeline
```

### Step 8 — Push to GitHub

Create a new repository on GitHub called `hitavir-de-learning`, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hitavir-de-learning.git
git branch -M main
git push -u origin main
```

### Step 9 — Verify on GitHub

Open your browser and go to `https://github.com/YOUR_USERNAME/hitavir-de-learning`. You should see:

- README with project description
- All folders and files
- Complete commit history
- Professional project structure

### Final Project Structure

```
hitavir-de-learning/
├── .gitignore
├── README.md
├── configs/
│   └── pipeline_config.yaml
├── docs/
├── pipelines/
│   ├── README.md
│   └── etl_pipeline.py
├── python-basics/
│   ├── README.md
│   └── hello.py
└── sql-exercises/
    ├── README.md
    └── query1.sql
```

> **HitaVir Tech says:** "You just built a professional-quality repository from scratch. This is exactly what you would do on day one of a real Data Engineering job. Add this to your GitHub profile — recruiters will notice."

## Summary and Command Cheat Sheet
Duration: 5:00

Congratulations! You have completed **Git and GitHub Basics** by **HitaVir Tech**!

### Your Learning Journey

| Section | What You Learned |
|---------|-----------------|
| Setup | Install Git, configure identity |
| Basics | init, add, commit, status |
| History | log, show, oneline |
| Branching | branch, checkout, switch |
| Merging | merge, resolve conflicts |
| GitHub | remote, push, pull, clone |
| Workflow | Real-world DevOps process |
| Best Practices | Commit messages, .gitignore, branches |
| Fixes | reset, restore, revert, amend |
| Project | Complete repo from scratch |

### Git Command Cheat Sheet

**Setup:**

```bash
git config --global user.name "Name"
git config --global user.email "email"
git init
git clone <url>
```

**Daily Workflow:**

```bash
git status                    # Check state
git add <file>                # Stage file
git add .                     # Stage everything
git commit -m "message"       # Commit
git push                      # Upload to remote
git pull                      # Download from remote
```

**Branching:**

```bash
git branch                    # List branches
git branch <name>             # Create branch
git checkout <name>           # Switch branch
git checkout -b <name>        # Create + switch
git merge <branch>            # Merge into current
git branch -d <name>          # Delete branch
```

**History:**

```bash
git log                       # Full history
git log --oneline             # Compact history
git log --oneline --graph     # Visual history
git show <hash>               # Commit details
git diff                      # Unstaged changes
git diff --staged             # Staged changes
```

**Undo:**

```bash
git restore <file>            # Discard changes
git restore --staged <file>   # Unstage
git reset --soft HEAD~1       # Undo commit (keep changes)
git reset --hard HEAD~1       # Undo commit (discard changes)
git revert HEAD               # Safe undo (for pushed commits)
git commit --amend            # Fix last commit
```

**Remote:**

```bash
git remote add origin <url>   # Connect to GitHub
git remote -v                 # Show remotes
git push -u origin main       # First push
git push                      # Subsequent pushes
git pull                      # Download + merge
git fetch                     # Download only
```

### Interview Tips

1. Explain the **three stages**: Working Directory, Staging Area, Repository
2. Know the difference between `merge` and `rebase`
3. Explain why you should **never push secrets** to Git
4. Describe a real branching workflow (feature branches, PRs)
5. Know how to resolve a merge conflict

> **HitaVir Tech says:** "In interviews, confidence comes from practice. If you have followed this entire codelab hands-on, you already know more than most candidates."

## Next Steps
Duration: 2:00

### What to Learn Next

| Topic | Why It Matters |
|-------|---------------|
| Pull Requests | Team collaboration workflow |
| GitHub Actions | CI/CD automation |
| Rebasing | Advanced history management |
| Cherry-pick | Selective commit copying |
| Git Hooks | Automated code quality checks |
| GitOps | Infrastructure as code |
| GitHub Pages | Host websites for free |

### Recommended Path for Data Engineers

```
Git Basics (you are here!)
    │
    ▼
GitHub Collaboration (PRs, reviews)
    │
    ▼
GitHub Actions (CI/CD pipelines)
    │
    ▼
GitOps (Infrastructure as Code)
    │
    ▼
Advanced Git (rebase, cherry-pick, bisect)
```

### Keep Practicing

1. **Use Git daily** — for every project, even personal ones
2. **Contribute to open source** — start with documentation fixes
3. **Build your GitHub profile** — it is your developer portfolio
4. **Take the HitaVir Tech GitHub Ultimate codelab** — advanced Git mastery

> **HitaVir Tech says:** "This is not the end — it is the beginning. Every command you typed today made you a better engineer. Keep pushing code, keep pulling knowledge, and keep committing to your growth."

## Congratulations
Duration: 1:00

You have successfully completed **Git and GitHub Basics with Git Bash Command Line** by **HitaVir Tech**!

### What You Achieved

- Installed and configured Git on Windows
- Created and managed local repositories
- Mastered the add, commit, status workflow
- Used branching and merging professionally
- Connected to GitHub (push, pull, clone)
- Simulated a real DevOps workflow
- Built a complete Data Engineering project
- Learned professional best practices
- Prepared for technical interviews

### Share Your Work

- Push your `hitavir-de-learning` project to GitHub
- Add it to your resume and LinkedIn
- Practice the workflow daily until it becomes natural

**Happy coding and happy committing!**

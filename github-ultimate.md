summary: GitHub Ultimate - Master Git and GitHub - Beginner to Expert
id: github-ultimate
categories: Git, GitHub, DevOps
tags: git, github, version-control, collaboration, ci-cd, open-source
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# GitHub Ultimate: Master Git and GitHub - Beginner to Expert

## Overview
Duration: 5:00

Welcome to **GitHub Ultimate: Master Git and GitHub - Beginner to Expert** by **HitaVir Tech**!

This is a complete, hands-on course that takes you from zero Git knowledge to confidently managing real-world projects with Git and GitHub. Whether you are a student, a working professional, or switching careers into tech — this codelab is built for you.

### What You Will Build

Throughout this codelab, you will build and manage a real-world project repository called **hitavir-portfolio**. You will:

- Create the project from scratch using Git
- Collaborate with simulated teammates using branches
- Raise pull requests and resolve conflicts
- Set up automated testing with GitHub Actions
- Follow professional workflows used in real companies

### Skills You Will Gain

| Skill | Level |
|-------|-------|
| Git basics (init, add, commit, status) | Beginner |
| Branching and merging | Intermediate |
| Remote repositories and GitHub | Intermediate |
| Pull requests and code reviews | Advanced |
| Rebasing, cherry-pick, stashing | Advanced |
| GitHub Actions CI/CD | Advanced |
| Git internals and hooks | Expert |
| Collaboration workflows | Expert |

### Estimated Time

**4-6 hours** (go at your own pace — each section is self-contained)

### How to Use This Codelab

1. Follow each step in order
2. Type every command yourself (do not copy-paste blindly)
3. Read the expected output and compare with yours
4. Try the challenges at the end of each section
5. If stuck, re-read the step — the answer is always there

> **HitaVir Tech says:** "The best way to learn Git is by doing. Open your terminal and follow along!"

## Prerequisites
Duration: 3:00

Before starting, make sure you have:

### Required

- A computer (Windows, Mac, or Linux)
- Internet connection
- A text editor (VS Code recommended — [download here](https://code.visualstudio.com/))
- A free GitHub account — [sign up here](https://github.com/join)

### No Prior Knowledge Needed

This codelab assumes **zero experience** with Git or GitHub. We start from the very basics.

### Recommended (Not Required)

- Basic familiarity with the command line (we will teach you what you need)
- Basic understanding of what a file and folder are

> **HitaVir Tech says:** "If you can create a folder and save a file, you are ready for this course!"

## Install Git
Duration: 8:00

Let us get Git installed on your computer. Follow the instructions for your operating system.

### Windows

**Option 1 — Using winget (Recommended)**

Open **PowerShell as Administrator** and run:

```console
winget install Git.Git
```

**Option 2 — Manual Download**

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the **64-bit Windows installer**
3. Run the installer with default settings
4. Make sure "Git Bash" is selected during installation

### Mac

**Option 1 — Using Homebrew (Recommended)**

```bash
brew install git
```

**Option 2 — Xcode Command Line Tools**

```bash
xcode-select --install
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git -y
```

### Linux (Fedora/RHEL)

```bash
sudo dnf install git -y
```

### Verify Installation

After installing, open your terminal (Git Bash on Windows) and run:

```bash
git --version
```

**Expected output:**

```
git version 2.44.0
```

The version number may differ — any version 2.30+ is fine.

> **HitaVir Tech says:** "If you see a version number, you are good to go. If you get 'command not found', restart your terminal and try again."

### Common Mistakes

| Problem | Solution |
|---------|----------|
| `git` not recognized | Restart terminal or reinstall Git |
| Old version of Git | Update using the same install method |
| Permission denied | Run installer as Administrator (Windows) or with `sudo` (Linux) |

## Configure Git
Duration: 5:00

Before using Git, you need to tell it who you are. This information is attached to every change you make.

### Set Your Name

```bash
git config --global user.name "Your Name"
```

Replace `Your Name` with your actual name. Example:

```bash
git config --global user.name "HitaVir Tech"
```

### Set Your Email

```bash
git config --global user.email "your.email@example.com"
```

Use the **same email** you used for your GitHub account.

### Set Default Branch Name

Modern Git uses `main` as the default branch (older versions use `master`). Let us set this explicitly:

```bash
git config --global init.defaultBranch main
```

### Set Default Editor (Optional)

```bash
git config --global core.editor "code --wait"
```

This sets VS Code as your Git editor. If you prefer nano or vim, use `nano` or `vim` instead.

### Verify Configuration

```bash
git config --list
```

**Expected output (partial):**

```
user.name=HitaVir Tech
user.email=your.email@example.com
init.defaultbranch=main
```

### What Each Setting Does

| Setting | Purpose |
|---------|---------|
| `user.name` | Your name in commit history |
| `user.email` | Your email in commit history |
| `init.defaultBranch` | Default branch name for new repos |
| `core.editor` | Editor for commit messages |

> **HitaVir Tech says:** "Think of this as writing your name on your homework. Every commit you make will have your name and email attached."

## What is Git? What is GitHub?
Duration: 5:00

Before we start using Git, let us understand what it is and why it matters.

### What is Git?

**Git** is a **version control system**. It tracks changes to your files over time.

Think of it like a **save game** feature in video games. Every time you commit in Git, you save a snapshot of your entire project. You can go back to any previous save at any time.

**Key facts about Git:**

- Created in 2005 by Linus Torvalds (creator of Linux)
- It is **free** and **open source**
- It works **locally** on your computer — no internet needed
- It is the most popular version control system in the world

### What is GitHub?

**GitHub** is a **cloud platform** that hosts Git repositories online. It adds collaboration features on top of Git.

Think of it this way:

| Git | GitHub |
|-----|--------|
| Tool on your computer | Website in the cloud |
| Tracks changes locally | Stores code online |
| Works offline | Requires internet |
| Command line tool | Web interface + API |
| Version control | Collaboration platform |

**GitHub adds:**

- Pull requests (propose changes)
- Issues (track bugs and features)
- Actions (automate testing and deployment)
- Social features (follow, star, fork)

### Why Should You Learn Git?

1. **Every tech company uses it** — it is a required skill
2. **Protects your work** — never lose code again
3. **Enables collaboration** — work with teams of any size
4. **Shows your portfolio** — GitHub is your coding resume
5. **Required for open source** — contribute to real projects

> **HitaVir Tech says:** "Git is like a time machine for your code. GitHub is the cloud where your time machine lives. Together, they are the foundation of modern software development."

## Create Your First Repository
Duration: 8:00

Time to create your first Git repository! This will be our project for the entire codelab.

### Step 1 — Create a Project Folder

```bash
mkdir hitavir-portfolio
cd hitavir-portfolio
```

### Step 2 — Initialize Git

```bash
git init
```

**Expected output:**

```
Initialized empty Git repository in /home/user/hitavir-portfolio/.git/
```

This creates a hidden `.git` folder that stores all version history.

### Step 3 — Check the Status

```bash
git status
```

**Expected output:**

```
On branch main
No commits yet
nothing to commit (create/copy files and use "git add" to track)
```

### Step 4 — Create Your First File

```bash
echo "# HitaVir Portfolio" > README.md
```

This creates a file called `README.md` with a heading.

### Step 5 — Check Status Again

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

Git sees the file but is **not tracking it yet**. The file is "untracked."

### What Just Happened?

```
hitavir-portfolio/
├── .git/          ← Hidden folder (Git's brain)
└── README.md      ← Your first file (untracked)
```

> **HitaVir Tech says:** "Running `git init` is like installing a security camera in your project folder. It does not record anything yet — but it is ready to start tracking when you tell it to."

## The Git Workflow — Add, Commit, Status
Duration: 10:00

This is the most important section for beginners. The Git workflow has three stages:

```
Working Directory  →  Staging Area  →  Repository
   (your files)      (ready to save)   (saved forever)
```

### Stage 1 — Working Directory

This is where you create and edit files. Git knows about these files but does not track changes automatically.

### Stage 2 — Staging Area (Index)

When you run `git add`, files move to the staging area. Think of it as a **loading dock** — items are packed and ready to ship.

### Stage 3 — Repository (Commit History)

When you run `git commit`, staged files are saved permanently in Git's history.

### Hands-On: Complete the Workflow

**Step 1 — Add the file to staging**

```bash
git add README.md
```

**Step 2 — Check status**

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

The file is now **staged** (green in most terminals).

**Step 3 — Commit the file**

```bash
git commit -m "Initial commit: add README"
```

**Expected output:**

```
[main (root-commit) a1b2c3d] Initial commit: add README
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

**Step 4 — Check status again**

```bash
git status
```

**Expected output:**

```
On branch main
nothing to commit, working tree clean
```

Your working directory is **clean** — all changes are saved.

### Adding Multiple Files

Let us add more files to our portfolio project:

```bash
echo "Name: HitaVir Tech" > about.txt
echo "Project: Portfolio Website" > project.txt
```

Add all files at once:

```bash
git add .
```

The `.` means "add everything in the current directory."

```bash
git commit -m "Add about and project files"
```

### View Commit History

```bash
git log
```

**Expected output:**

```
commit b2c3d4e (HEAD -> main)
Author: HitaVir Tech <your.email@example.com>
Date:   Mon Apr 5 10:30:00 2026 +0530

    Add about and project files

commit a1b2c3d
Author: HitaVir Tech <your.email@example.com>
Date:   Mon Apr 5 10:25:00 2026 +0530

    Initial commit: add README
```

For a compact view:

```bash
git log --oneline
```

**Expected output:**

```
b2c3d4e (HEAD -> main) Add about and project files
a1b2c3d Initial commit: add README
```

### Quick Reference

| Command | What It Does |
|---------|-------------|
| `git add <file>` | Stage a specific file |
| `git add .` | Stage all changed files |
| `git status` | Show current state |
| `git commit -m "msg"` | Save staged changes |
| `git log` | View commit history |
| `git log --oneline` | Compact history |

> **HitaVir Tech says:** "Think of `git add` as putting items in your shopping cart, and `git commit` as clicking the checkout button. You can add and remove items from the cart, but once you check out, the order is placed."

## Understanding the Staging Area
Duration: 5:00

The staging area is one of Git's most powerful features. Let us understand it deeply.

### Why Does the Staging Area Exist?

Imagine you changed 10 files, but only 3 changes are related to one bug fix. The staging area lets you commit just those 3 files with a clear message, then commit the other 7 separately.

### Hands-On: Selective Staging

**Step 1 — Modify two files**

```bash
echo "Email: hitavir@example.com" >> about.txt
echo "Status: In Progress" >> project.txt
```

**Step 2 — Check what changed**

```bash
git status
```

**Expected output:**

```
On branch main
Changes not staged for commit:
        modified:   about.txt
        modified:   project.txt
```

**Step 3 — Stage only one file**

```bash
git add about.txt
```

**Step 4 — Check status**

```bash
git status
```

**Expected output:**

```
On branch main
Changes to be committed:
        modified:   about.txt

Changes not staged for commit:
        modified:   project.txt
```

Notice: `about.txt` is staged, but `project.txt` is not.

**Step 5 — Commit only the staged file**

```bash
git commit -m "Add email to about file"
```

**Step 6 — Now stage and commit the other file**

```bash
git add project.txt
git commit -m "Add status to project file"
```

### Unstaging a File

If you accidentally stage a file:

```bash
git restore --staged <filename>
```

### Viewing Differences

See what changed before staging:

```bash
git diff
```

See what is staged (ready to commit):

```bash
git diff --staged
```

> **HitaVir Tech says:** "The staging area is your chance to organize your work before saving it. Clean, focused commits make your project history easy to read and debug."

## Gitignore — Hiding Files from Git
Duration: 5:00

Not every file should be tracked by Git. Temporary files, passwords, build outputs — these should be ignored.

### Create a .gitignore File

```bash
touch .gitignore
```

Open it in your editor and add patterns for files to ignore:

```bash
cat > .gitignore << 'EOF'
# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
*.swp
*.swo

# Environment and secrets
.env
*.key
*.pem

# Dependencies
node_modules/
venv/
__pycache__/

# Build output
dist/
build/
*.log
EOF
```

### Test It

```bash
echo "SECRET_KEY=abc123" > .env
git status
```

**Expected output:**

```
On branch main
Untracked files:
        .gitignore

```

Notice: `.env` does **not** appear! Git is ignoring it.

### Commit the .gitignore

```bash
git add .gitignore
git commit -m "Add .gitignore file"
```

### Common .gitignore Patterns

| Pattern | What It Ignores |
|---------|----------------|
| `*.log` | All log files |
| `node_modules/` | Node.js dependencies folder |
| `.env` | Environment variable files |
| `build/` | Build output folder |
| `*.pyc` | Python compiled files |
| `!important.log` | Exception — do NOT ignore this file |

### Find Templates

GitHub provides ready-made `.gitignore` templates for every language:
[https://github.com/github/gitignore](https://github.com/github/gitignore)

> **HitaVir Tech says:** "Rule number one: NEVER commit passwords, API keys, or secrets to Git. Once something is in Git history, it is very hard to remove. The `.gitignore` file is your first line of defense."

### Beginner Level Recap

Congratulations! You have completed the Beginner Level. Here is what you learned:

- What Git and GitHub are and why they matter
- How to install and configure Git
- How to create a repository with `git init`
- The three-stage workflow: Working Directory → Staging Area → Repository
- How to add, commit, and check status
- How to use `.gitignore` to exclude files

## Branching — Create, Switch, Delete
Duration: 10:00

Branches are one of Git's most powerful features. They let you work on different things without affecting the main code.

### What is a Branch?

Think of a branch as a **parallel universe** for your code. You can experiment freely, and if things go wrong, your main branch is untouched.

```
main:       A --- B --- C
                         \
feature:                  D --- E
```

### Create a Branch

```bash
git branch feature-homepage
```

This creates a new branch but does **not** switch to it.

### List All Branches

```bash
git branch
```

**Expected output:**

```
  feature-homepage
* main
```

The `*` shows your current branch.

### Switch to a Branch

```bash
git switch feature-homepage
```

**Expected output:**

```
Switched to branch 'feature-homepage'
```

### Shortcut: Create and Switch in One Command

```bash
git switch -c feature-contact
```

This creates `feature-contact` and switches to it immediately.

### Make Changes on the Branch

```bash
git switch feature-homepage
echo "<h1>Welcome to HitaVir Portfolio</h1>" > index.html
git add index.html
git commit -m "Add homepage HTML"
```

### Switch Back to Main

```bash
git switch main
```

Now check — `index.html` does **not** exist on main:

```bash
ls
```

**Expected output:**

```
README.md  about.txt  project.txt
```

The file only exists on the `feature-homepage` branch!

### Delete a Branch

First, switch away from the branch you want to delete:

```bash
git switch main
git branch -d feature-contact
```

**Expected output:**

```
Deleted branch feature-contact (was a1b2c3d).
```

Use `-d` for safe delete (only if merged). Use `-D` to force delete.

### Branch Naming Conventions

| Pattern | Example | Use Case |
|---------|---------|----------|
| `feature/name` | `feature/login-page` | New features |
| `bugfix/name` | `bugfix/header-alignment` | Bug fixes |
| `hotfix/name` | `hotfix/security-patch` | Urgent production fixes |
| `release/version` | `release/v2.0` | Release preparation |

> **HitaVir Tech says:** "Branches are free in Git — they cost almost nothing. Use them generously. Never work directly on `main` in a team project."

## Merging Branches
Duration: 8:00

Once you finish work on a branch, you merge it back into `main`.

### Fast-Forward Merge

When `main` has no new commits since the branch was created, Git simply moves the pointer forward.

**Step 1 — Make sure you are on main**

```bash
git switch main
```

**Step 2 — Merge the feature branch**

```bash
git merge feature-homepage
```

**Expected output:**

```
Updating a1b2c3d..d4e5f6g
Fast-forward
 index.html | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
```

**Step 3 — Verify**

```bash
ls
```

**Expected output:**

```
README.md  about.txt  index.html  project.txt
```

The `index.html` from the feature branch is now on `main`.

### Merge Commit (Three-Way Merge)

When both branches have new commits, Git creates a **merge commit**.

**Step 1 — Create and work on a new branch**

```bash
git switch -c feature-skills
echo "Skills: Git, Python, SQL" > skills.txt
git add skills.txt
git commit -m "Add skills file"
```

**Step 2 — Switch to main and make a different change**

```bash
git switch main
echo "Last updated: 2026" >> README.md
git add README.md
git commit -m "Update README with year"
```

**Step 3 — Merge**

```bash
git merge feature-skills
```

Git opens your editor for a merge commit message. Save and close the editor.

**Expected output:**

```
Merge made by the 'ort' strategy.
 skills.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 skills.txt
```

### Visualize the History

```bash
git log --oneline --graph --all
```

**Expected output:**

```
*   f7g8h9i (HEAD -> main) Merge branch 'feature-skills'
|\
| * e6f7g8h (feature-skills) Add skills file
* | d5e6f7g Update README with year
|/
* d4e5f6g Add homepage HTML
* ...
```

### Clean Up Merged Branches

```bash
git branch -d feature-homepage
git branch -d feature-skills
```

> **HitaVir Tech says:** "Fast-forward merge is like an express lane — clean and simple. A three-way merge is like merging two lanes of traffic — Git handles it, but there might be conflicts."

## Resolving Merge Conflicts
Duration: 10:00

Merge conflicts happen when two branches change the **same line** in the **same file**. Git cannot decide which change to keep, so it asks you.

### Create a Conflict (On Purpose)

**Step 1 — Create two branches from main**

```bash
git switch main
git switch -c branch-a
echo "Color: Blue" > style.txt
git add style.txt
git commit -m "Branch A: set color to blue"
```

```bash
git switch main
git switch -c branch-b
echo "Color: Red" > style.txt
git add style.txt
git commit -m "Branch B: set color to red"
```

**Step 2 — Merge branch-a into main**

```bash
git switch main
git merge branch-a
```

This works fine (fast-forward).

**Step 3 — Now merge branch-b into main**

```bash
git merge branch-b
```

**Expected output:**

```
Auto-merging style.txt
CONFLICT (add/add): Merge conflict in style.txt
Automatic merge failed; fix conflicts and then commit the result.
```

### Step 4 — See the Conflict

```bash
cat style.txt
```

**Expected output:**

```
<<<<<<< HEAD
Color: Blue
=======
Color: Red
>>>>>>> branch-b
```

This is Git's conflict marker format:

```
<<<<<<< HEAD        ← Your current branch (main)
Color: Blue         ← Change from main (via branch-a)
=======             ← Separator
Color: Red          ← Change from branch-b
>>>>>>> branch-b    ← The branch being merged
```

### Step 5 — Resolve the Conflict

Open `style.txt` in your editor and replace the entire content with your chosen resolution:

```bash
cat > style.txt << 'EOF'
Color: Purple
EOF
```

We chose "Purple" as a combination of both — this is a common approach.

### Step 6 — Mark as Resolved and Commit

```bash
git add style.txt
git commit -m "Resolve merge conflict: choose purple"
```

### Step 7 — Verify

```bash
git log --oneline --graph --all
```

### Clean Up

```bash
git branch -d branch-a
git branch -d branch-b
```

### Conflict Resolution Tips

| Tip | Description |
|-----|-------------|
| Read both changes carefully | Understand what each branch intended |
| Talk to your team | If unsure, ask the person who made the other change |
| Test after resolving | Make sure the code works after the fix |
| Use VS Code | It has a built-in merge conflict tool with clickable buttons |

> **HitaVir Tech says:** "Merge conflicts are NOT errors. They are Git asking for your human judgment. Do not be afraid of them — they are a normal part of teamwork."

## Undo Changes — Reset, Revert, Checkout
Duration: 10:00

Everyone makes mistakes. Git gives you multiple ways to undo changes.

### Scenario 1: Undo Changes in Working Directory

You edited a file but want to discard the changes:

```bash
echo "MISTAKE" >> about.txt
cat about.txt
```

Undo the change:

```bash
git restore about.txt
cat about.txt
```

The file is back to the last committed version.

### Scenario 2: Unstage a File

You staged a file by accident:

```bash
echo "temp data" > temp.txt
git add temp.txt
git status
```

Unstage it:

```bash
git restore --staged temp.txt
git status
```

The file is unstaged but still exists in your working directory.

```bash
rm temp.txt
```

### Scenario 3: Undo the Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1
```

This undoes the commit but keeps your changes staged. Use this when you committed too early.

### Scenario 4: Undo the Last Commit (Discard Changes)

```bash
git reset --hard HEAD~1
```

**Warning:** This permanently deletes the changes. Use with caution.

### Scenario 5: Revert a Commit (Safe for Shared Repos)

Unlike reset, `revert` creates a **new commit** that undoes a previous one. This is safe for branches shared with others.

```bash
echo "Bad feature" > bad.txt
git add bad.txt
git commit -m "Add bad feature"
```

Now revert it:

```bash
git revert HEAD
```

Git opens your editor for the revert message. Save and close.

**Expected output:**

```
[main h8i9j0k] Revert "Add bad feature"
 1 file changed, 0 insertions(+), 1 deletion(-)
 delete mode 100644 bad.txt
```

### Comparison Table

| Command | What It Does | Safe for Teams? |
|---------|-------------|-----------------|
| `git restore <file>` | Discard working directory changes | Yes |
| `git restore --staged <file>` | Unstage a file | Yes |
| `git reset --soft HEAD~1` | Undo commit, keep changes staged | No (rewrites history) |
| `git reset --hard HEAD~1` | Undo commit, discard changes | No (destructive) |
| `git revert HEAD` | Create new commit that undoes last | Yes |

> **HitaVir Tech says:** "Use `revert` when working with a team. Use `reset` only on your local branches that nobody else has seen. The golden rule: never rewrite history that has been pushed."

## Working with Remote Repositories
Duration: 10:00

So far, everything has been local. Now let us connect to GitHub.

### Step 1 — Create a GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `hitavir-portfolio`
3. Description: "My portfolio project — built during HitaVir Tech codelab"
4. Select **Public**
5. Do **NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 2 — Connect Local Repo to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/hitavir-portfolio.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3 — Verify the Remote

```bash
git remote -v
```

**Expected output:**

```
origin  https://github.com/YOUR_USERNAME/hitavir-portfolio.git (fetch)
origin  https://github.com/YOUR_USERNAME/hitavir-portfolio.git (push)
```

### Step 4 — Push to GitHub

```bash
git push -u origin main
```

The `-u` flag sets `origin main` as the default upstream, so future pushes only need `git push`.

**Expected output:**

```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (15/15), 1.20 KiB | 1.20 MiB/s, done.
Total 15 (delta 2), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/hitavir-portfolio.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Step 5 — Verify on GitHub

Open your browser and go to `https://github.com/YOUR_USERNAME/hitavir-portfolio`. You should see all your files!

### Key Remote Commands

| Command | What It Does |
|---------|-------------|
| `git remote add origin <url>` | Connect to remote |
| `git push` | Upload commits to remote |
| `git pull` | Download and merge remote changes |
| `git fetch` | Download remote changes (no merge) |
| `git clone <url>` | Copy a remote repo to your computer |

### Clone an Existing Repository

To download someone else's repository:

```bash
git clone https://github.com/username/repo-name.git
```

This creates a new folder with the full repository and history.

### Pull Latest Changes

When teammates push changes, get them with:

```bash
git pull origin main
```

> **HitaVir Tech says:** "Think of `push` as uploading your work to the cloud, and `pull` as downloading your team's latest work. Do a `pull` before you start working each day to stay up to date."

### Intermediate Level Recap

Excellent work! You have completed the Intermediate Level. Here is what you learned:

- Create, switch, and delete branches
- Merge branches (fast-forward and three-way)
- Resolve merge conflicts like a professional
- Undo changes with restore, reset, and revert
- Connect to GitHub and push/pull code

## Pull Requests
Duration: 10:00

Pull Requests (PRs) are the heart of team collaboration on GitHub. A PR proposes changes and asks for review before merging.

### The PR Workflow

```
1. Create a branch
2. Make changes and commit
3. Push the branch to GitHub
4. Open a Pull Request
5. Team reviews the code
6. Merge the PR
7. Delete the branch
```

### Hands-On: Create a Pull Request

**Step 1 — Create a feature branch**

```bash
git switch -c feature-bio
```

**Step 2 — Add content**

```bash
cat > bio.md << 'EOF'
# About HitaVir Tech

## Background
Passionate about teaching technology and building real-world projects.

## Expertise
- Git & GitHub
- Python & Data Engineering
- Cloud Services (AWS, Azure)

## Mission
Making technology education accessible to everyone.
EOF
```

**Step 3 — Commit and push**

```bash
git add bio.md
git commit -m "Add bio page"
git push -u origin feature-bio
```

**Expected output (last few lines):**

```
To https://github.com/YOUR_USERNAME/hitavir-portfolio.git
 * [new branch]      feature-bio -> feature-bio
```

**Step 4 — Create the Pull Request on GitHub**

1. Go to your repository on GitHub
2. You will see a yellow banner: "feature-bio had recent pushes"
3. Click **Compare & pull request**
4. Add a title: "Add bio page"
5. Add a description explaining your changes
6. Click **Create pull request**

**Or use the GitHub CLI:**

```bash
gh pr create --title "Add bio page" --body "Added a bio page with background, expertise, and mission sections."
```

### PR Best Practices

| Practice | Why |
|----------|-----|
| Keep PRs small | Easier to review and less risky |
| Write clear descriptions | Reviewers need context |
| Link related issues | Connects the dots |
| Add screenshots for UI changes | Visual proof of changes |
| Respond to feedback promptly | Keeps the project moving |

> **HitaVir Tech says:** "A pull request is a conversation, not just a code dump. Write good descriptions, respond to reviews, and keep your PRs focused on one thing."

## Code Reviews
Duration: 5:00

Code reviews are where teams catch bugs, share knowledge, and maintain quality.

### How to Review a PR on GitHub

1. Go to the PR page
2. Click the **Files changed** tab
3. Read through each change
4. Click the `+` icon on any line to add a comment
5. Choose: **Comment**, **Approve**, or **Request changes**
6. Submit your review

### What to Look For in a Code Review

| Check | Question to Ask |
|-------|----------------|
| Correctness | Does the code do what it claims? |
| Readability | Can I understand this in 30 seconds? |
| Edge cases | What happens with empty input or errors? |
| Security | Any hardcoded passwords or exposed data? |
| Tests | Are there tests for new functionality? |
| Style | Does it follow the project conventions? |

### Giving Good Review Feedback

**Good:** "This function could return null if the list is empty. Consider adding a check on line 42."

**Bad:** "This is wrong."

### Handling Reviews on Your PR

When you receive review comments:

1. Read each comment carefully
2. Make the requested changes locally
3. Commit and push — the PR updates automatically
4. Reply to each comment explaining what you changed
5. Re-request review

```bash
# Make changes based on review
echo "Contact: hitavir@example.com" >> bio.md
git add bio.md
git commit -m "Address review: add contact info"
git push
```

### Merge the PR

Once approved, merge on GitHub:

1. Click **Merge pull request**
2. Choose merge strategy (usually "Create a merge commit")
3. Click **Confirm merge**
4. Click **Delete branch** (clean up)

**Update your local repo:**

```bash
git switch main
git pull origin main
git branch -d feature-bio
```

> **HitaVir Tech says:** "Code reviews are not about finding fault — they are about making the code better together. Be kind, be specific, and be constructive."

## Rebasing vs Merging
Duration: 8:00

Both rebasing and merging combine changes from one branch into another, but they do it differently.

### What is Rebase?

Rebase moves your branch's commits to start from the latest main. It rewrites history to create a **linear** timeline.

```
Before rebase:
main:       A --- B --- C
                   \
feature:            D --- E

After rebase:
main:       A --- B --- C
                         \
feature:                  D' --- E'
```

### Hands-On: Rebase a Branch

**Step 1 — Create a feature branch**

```bash
git switch -c feature-footer
echo "<footer>HitaVir Tech 2026</footer>" > footer.html
git add footer.html
git commit -m "Add footer"
```

**Step 2 — Simulate changes on main**

```bash
git switch main
echo "Version: 1.0" >> README.md
git add README.md
git commit -m "Add version to README"
```

**Step 3 — Rebase feature onto main**

```bash
git switch feature-footer
git rebase main
```

**Expected output:**

```
Successfully rebased and updated refs/heads/feature-footer.
```

**Step 4 — View the linear history**

```bash
git log --oneline --graph --all
```

The history is now a straight line — no merge commits.

**Step 5 — Merge into main (fast-forward)**

```bash
git switch main
git merge feature-footer
git branch -d feature-footer
```

### Merge vs Rebase Comparison

| Aspect | Merge | Rebase |
|--------|-------|--------|
| History | Preserves all branch history | Creates linear history |
| Merge commits | Creates merge commits | No merge commits |
| Safety | Safe for shared branches | Dangerous for shared branches |
| Complexity | Simpler to understand | Cleaner but riskier |
| Use case | Team branches, main | Local feature branches |

### The Golden Rule of Rebasing

**Never rebase a branch that other people are working on.**

Rebasing rewrites commit history. If others have pulled the old commits, their history will conflict with yours.

> **HitaVir Tech says:** "Use rebase for your local feature branches to keep history clean. Use merge for shared branches. When in doubt, merge — it is always safe."

## Cherry-Pick
Duration: 5:00

Cherry-pick lets you copy a **specific commit** from one branch to another without merging the entire branch.

### When to Use Cherry-Pick

- A bug fix on a feature branch is needed on main immediately
- You accidentally committed to the wrong branch
- You need a specific change from a long-running branch

### Hands-On: Cherry-Pick a Commit

**Step 1 — Create a branch with multiple commits**

```bash
git switch -c feature-experimental
echo "Experiment 1" > exp1.txt
git add exp1.txt
git commit -m "Add experiment 1"

echo "Important fix" > fix.txt
git add fix.txt
git commit -m "Critical bug fix"

echo "Experiment 2" > exp2.txt
git add exp2.txt
git commit -m "Add experiment 2"
```

**Step 2 — Find the commit hash for the bug fix**

```bash
git log --oneline
```

**Expected output:**

```
c3d4e5f (HEAD -> feature-experimental) Add experiment 2
b2c3d4e Critical bug fix
a1b2c3d Add experiment 1
```

**Step 3 — Cherry-pick just the bug fix to main**

```bash
git switch main
git cherry-pick b2c3d4e
```

Replace `b2c3d4e` with the actual hash from your output.

**Expected output:**

```
[main f6g7h8i] Critical bug fix
 1 file changed, 1 insertion(+)
 create mode 100644 fix.txt
```

**Step 4 — Verify**

```bash
ls
git log --oneline -3
```

The `fix.txt` file is now on main, but `exp1.txt` and `exp2.txt` are not.

### Clean Up

```bash
git branch -D feature-experimental
```

> **HitaVir Tech says:** "Cherry-pick is like copying a single page from a book instead of carrying the whole book. Use it when you need a specific change, not the whole branch."

## Stashing
Duration: 5:00

Stashing lets you **temporarily save** uncommitted changes and restore a clean working directory. It is like putting your work in a drawer to deal with something urgent.

### When to Use Stash

- You need to switch branches but have uncommitted work
- An urgent bug came in and you need a clean slate
- You want to test something without committing half-done work

### Hands-On: Stash Your Work

**Step 1 — Make some uncommitted changes**

```bash
echo "Work in progress..." > wip.txt
echo "More changes" >> README.md
git status
```

**Step 2 — Stash the changes**

```bash
git stash
```

**Expected output:**

```
Saved working directory and index state WIP on main: f6g7h8i Critical bug fix
```

**Step 3 — Verify clean directory**

```bash
git status
```

**Expected output:**

```
On branch main
nothing to commit, working tree clean
```

Your changes are safely stored. You can now switch branches, fix bugs, etc.

**Step 4 — Restore stashed changes**

```bash
git stash pop
```

**Expected output:**

```
On branch main
Changes not staged for commit:
        modified:   README.md

Untracked files:
        wip.txt

Dropped refs/stash@{0} (a1b2c3d...)
```

Your changes are back!

### Stash Commands

| Command | What It Does |
|---------|-------------|
| `git stash` | Stash current changes |
| `git stash pop` | Restore and remove from stash |
| `git stash apply` | Restore but keep in stash |
| `git stash list` | Show all stashes |
| `git stash drop` | Delete a stash |
| `git stash clear` | Delete all stashes |
| `git stash -m "message"` | Stash with a description |

### Clean Up

```bash
rm wip.txt
git restore README.md
```

> **HitaVir Tech says:** "Stash is your emergency save button. When life interrupts your coding, stash your work and come back to it later."

## Tags and Releases
Duration: 5:00

Tags mark specific points in history, typically for releases (v1.0, v2.0, etc.).

### Create a Lightweight Tag

```bash
git tag v1.0
```

### Create an Annotated Tag (Recommended)

```bash
git tag -a v1.0.0 -m "First stable release of HitaVir Portfolio"
```

### List Tags

```bash
git tag
```

**Expected output:**

```
v1.0
v1.0.0
```

### View Tag Details

```bash
git show v1.0.0
```

### Push Tags to GitHub

```bash
git push origin v1.0.0
```

Push all tags:

```bash
git push origin --tags
```

### Create a GitHub Release

On GitHub:

1. Go to your repository
2. Click **Releases** on the right sidebar
3. Click **Create a new release**
4. Choose tag: `v1.0.0`
5. Title: "v1.0.0 — First Stable Release"
6. Add release notes
7. Click **Publish release**

### Delete a Tag

```bash
git tag -d v1.0
git push origin --delete v1.0
```

> **HitaVir Tech says:** "Tags are like bookmarks in your project's timeline. Use them to mark important milestones like releases, demos, or major features."

## GitHub Actions — Basic CI/CD
Duration: 12:00

GitHub Actions lets you automate tasks like testing, building, and deploying your code. It runs workflows whenever something happens in your repository (like a push or pull request).

### What is CI/CD?

| Term | Meaning | Example |
|------|---------|---------|
| CI (Continuous Integration) | Automatically test code changes | Run tests on every push |
| CD (Continuous Deployment) | Automatically deploy to production | Deploy on merge to main |

### Hands-On: Create Your First Workflow

**Step 1 — Create the workflow directory**

```bash
mkdir -p .github/workflows
```

**Step 2 — Create a workflow file**

```bash
cat > .github/workflows/ci.yml << 'EOF'
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: List project files
        run: |
          echo "=== HitaVir Portfolio CI ==="
          echo "Files in repository:"
          ls -la
          echo ""
          echo "README contents:"
          cat README.md

      - name: Check for required files
        run: |
          echo "Checking required files..."
          for file in README.md index.html about.txt; do
            if [ -f "$file" ]; then
              echo "  PASS: $file exists"
            else
              echo "  FAIL: $file is missing"
              exit 1
            fi
          done
          echo "All required files present!"

      - name: Validate HTML
        run: |
          echo "Checking HTML files..."
          for file in $(find . -name "*.html" -not -path "./.git/*"); do
            if grep -q "<" "$file"; then
              echo "  PASS: $file contains HTML"
            else
              echo "  WARN: $file may not be valid HTML"
            fi
          done
          echo "HTML validation complete!"
EOF
```

**Step 3 — Commit and push**

```bash
git add .github/workflows/ci.yml
git commit -m "Add CI pipeline with GitHub Actions"
git push
```

**Step 4 — Watch it run on GitHub**

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You will see "CI Pipeline" running
4. Click on it to see the live output

### Understanding the Workflow File

| Key | What It Does |
|-----|-------------|
| `name` | Display name for the workflow |
| `on` | Events that trigger the workflow |
| `jobs` | Groups of steps to run |
| `runs-on` | The operating system to use |
| `steps` | Individual commands to execute |
| `uses` | Pre-built actions from the marketplace |
| `run` | Shell commands to execute |

### Add a Status Badge to Your README

Add this to the top of your `README.md`:

```bash
cat > README.md << 'EOF'
# HitaVir Portfolio

![CI](https://github.com/YOUR_USERNAME/hitavir-portfolio/actions/workflows/ci.yml/badge.svg)

Last updated: 2026
EOF
```

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git add README.md
git commit -m "Add CI status badge to README"
git push
```

> **HitaVir Tech says:** "GitHub Actions is like having a robot assistant that checks your code every time you push. Start simple, then build up your automation as your project grows."

## Forking and Contributing to Open Source
Duration: 8:00

Forking is how you contribute to projects you do not own. It is the gateway to open source.

### The Fork Workflow

```
1. Fork the repository (creates your copy on GitHub)
2. Clone your fork locally
3. Create a branch
4. Make changes and commit
5. Push to your fork
6. Open a Pull Request to the original repo
```

### Hands-On: Simulate an Open Source Contribution

**Step 1 — Fork a repository**

Go to any public GitHub repository and click the **Fork** button in the top right.

For practice, you can fork: `https://github.com/firstcontributions/first-contributions`

**Step 2 — Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/first-contributions.git
cd first-contributions
```

**Step 3 — Add the original repo as upstream**

```bash
git remote add upstream https://github.com/firstcontributions/first-contributions.git
git remote -v
```

**Expected output:**

```
origin    https://github.com/YOUR_USERNAME/first-contributions.git (fetch)
origin    https://github.com/YOUR_USERNAME/first-contributions.git (push)
upstream  https://github.com/firstcontributions/first-contributions.git (fetch)
upstream  https://github.com/firstcontributions/first-contributions.git (push)
```

**Step 4 — Create a branch and make changes**

```bash
git switch -c add-my-name
echo "HitaVir Tech" >> Contributors.md
git add Contributors.md
git commit -m "Add HitaVir Tech to contributors"
```

**Step 5 — Push to your fork**

```bash
git push -u origin add-my-name
```

**Step 6 — Open a Pull Request**

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Make sure the base repository is the **original** (not your fork)
4. Add a clear title and description
5. Click **Create pull request**

### Keeping Your Fork Up to Date

```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

### Open Source Etiquette

| Do | Do Not |
|----|--------|
| Read CONTRIBUTING.md first | Submit random PRs without context |
| Follow the project's code style | Force your preferences |
| Write clear PR descriptions | Submit PRs with "fixed stuff" |
| Be patient waiting for reviews | Ping maintainers repeatedly |
| Say thank you | Take rejection personally |

> **HitaVir Tech says:** "Contributing to open source is one of the best ways to learn and build your reputation. Start small — fix a typo, improve documentation, or add a test. Every contribution matters."

### Advanced Level Recap

Great progress! You have completed the Advanced Level. Here is what you learned:

- Pull request workflow and best practices
- Code review techniques
- Rebasing vs merging
- Cherry-picking specific commits
- Stashing work in progress
- Tags and releases
- GitHub Actions for CI/CD
- Forking and open source contribution

## Git Internals — HEAD, Refs, and Objects
Duration: 8:00

Understanding Git internals helps you debug problems and use Git with confidence.

### What is HEAD?

`HEAD` is a pointer to your current position in the repository. It usually points to the branch you are on.

```bash
cat .git/HEAD
```

**Expected output:**

```
ref: refs/heads/main
```

HEAD points to the `main` branch.

### What are Refs?

Refs (references) are human-readable names for commit hashes.

```bash
ls .git/refs/heads/
```

**Expected output:**

```
main
```

```bash
cat .git/refs/heads/main
```

This shows the full SHA-1 hash of the latest commit on main.

### Git's Object Model

Git stores everything as **objects** in `.git/objects/`. There are four types:

| Object | What It Stores |
|--------|---------------|
| **Blob** | File contents |
| **Tree** | Directory listings (filenames + blob references) |
| **Commit** | Snapshot metadata (tree, parent, author, message) |
| **Tag** | Annotated tag data |

### Explore Objects

```bash
git cat-file -t HEAD
```

**Expected output:**

```
commit
```

```bash
git cat-file -p HEAD
```

**Expected output:**

```
tree a1b2c3d4e5f6...
parent f6g7h8i9j0k1...
author HitaVir Tech <your.email@example.com> 1712300000 +0530
committer HitaVir Tech <your.email@example.com> 1712300000 +0530

Add CI status badge to README
```

### Detached HEAD State

When you checkout a specific commit (not a branch), HEAD points directly to a commit instead of a branch:

```bash
git checkout HEAD~2
```

**Expected output:**

```
You are in 'detached HEAD' state...
HEAD is now at a1b2c3d Some commit message
```

To get back to normal:

```bash
git switch main
```

> **HitaVir Tech says:** "Understanding Git internals is like understanding how an engine works. You do not need it for everyday driving, but it helps tremendously when something goes wrong."

## Interactive Rebase and Squashing Commits
Duration: 10:00

Interactive rebase lets you rewrite commit history — reorder, edit, combine, or delete commits.

### When to Use Interactive Rebase

- Clean up messy commits before creating a PR
- Combine multiple small commits into one meaningful commit
- Edit a commit message
- Remove accidental commits

### Hands-On: Squash Commits

**Step 1 — Create messy commits**

```bash
git switch -c feature-nav
echo "<nav>Home</nav>" > nav.html
git add nav.html
git commit -m "Add nav"

echo "<nav>Home | About</nav>" > nav.html
git add nav.html
git commit -m "Add about link"

echo "<nav>Home | About | Contact</nav>" > nav.html
git add nav.html
git commit -m "Add contact link"

echo "<nav>Home | About | Skills | Contact</nav>" > nav.html
git add nav.html
git commit -m "Add skills link"
```

**Step 2 — View the commits**

```bash
git log --oneline -4
```

**Expected output:**

```
d4e5f6g Add skills link
c3d4e5f Add contact link
b2c3d4e Add about link
a1b2c3d Add nav
```

Four commits for one navigation bar — messy! Let us squash them.

**Step 3 — Interactive rebase**

```bash
git rebase -i HEAD~4
```

This opens your editor with:

```
pick a1b2c3d Add nav
pick b2c3d4e Add about link
pick c3d4e5f Add contact link
pick d4e5f6g Add skills link
```

**Step 4 — Change `pick` to `squash` (or `s`) for all except the first**

```
pick a1b2c3d Add nav
squash b2c3d4e Add about link
squash c3d4e5f Add contact link
squash d4e5f6g Add skills link
```

Save and close the editor.

**Step 5 — Edit the combined commit message**

A new editor opens with all four messages. Replace with:

```
Add navigation bar with all links

Includes: Home, About, Skills, Contact
```

Save and close.

**Step 6 — Verify**

```bash
git log --oneline -2
```

**Expected output:**

```
e5f6g7h (HEAD -> feature-nav) Add navigation bar with all links
... (previous commits)
```

Four messy commits are now one clean commit!

### Merge and Clean Up

```bash
git switch main
git merge feature-nav
git branch -d feature-nav
```

### Interactive Rebase Commands

| Command | Short | What It Does |
|---------|-------|-------------|
| `pick` | `p` | Keep the commit as-is |
| `squash` | `s` | Combine with previous commit |
| `fixup` | `f` | Combine and discard the message |
| `reword` | `r` | Change the commit message |
| `edit` | `e` | Pause to amend the commit |
| `drop` | `d` | Delete the commit entirely |

> **HitaVir Tech says:** "Squashing commits is like editing a rough draft into a polished essay. Your final PR should tell a clear story, not show every typo you fixed along the way."

## Git Hooks
Duration: 8:00

Git hooks are scripts that run automatically at certain points in the Git workflow. They let you automate checks and enforce standards.

### Where Do Hooks Live?

```bash
ls .git/hooks/
```

**Expected output:**

```
applypatch-msg.sample     pre-merge-commit.sample
commit-msg.sample         pre-push.sample
fsmonitor-watchman.sample pre-rebase.sample
post-update.sample        pre-receive.sample
pre-applypatch.sample     prepare-commit-msg.sample
pre-commit.sample         push-to-checkout.sample
```

These are sample hooks. Remove `.sample` to activate them.

### Hands-On: Create a Pre-Commit Hook

This hook will prevent commits that contain the word "TODO":

**Step 1 — Create the hook**

```bash
cat > .git/hooks/pre-commit << 'HOOK'
#!/bin/bash
echo "Running pre-commit hook..."

# Check for TODO in staged files
if git diff --cached --name-only | xargs grep -l "TODO" 2>/dev/null; then
    echo ""
    echo "ERROR: Found TODO comments in staged files!"
    echo "Please resolve TODOs before committing."
    echo ""
    exit 1
fi

echo "Pre-commit check passed!"
exit 0
HOOK
```

**Step 2 — Make it executable**

```bash
chmod +x .git/hooks/pre-commit
```

**Step 3 — Test it**

```bash
echo "TODO: fix this later" > temp-todo.txt
git add temp-todo.txt
git commit -m "Test TODO check"
```

**Expected output:**

```
Running pre-commit hook...
temp-todo.txt
ERROR: Found TODO comments in staged files!
Please resolve TODOs before committing.
```

The commit is blocked!

**Step 4 — Fix and retry**

```bash
echo "Navigation: complete" > temp-todo.txt
git add temp-todo.txt
git commit -m "Add navigation status"
```

**Expected output:**

```
Running pre-commit hook...
Pre-commit check passed!
[main ...] Add navigation status
```

### Common Hook Use Cases

| Hook | When It Runs | Common Use |
|------|-------------|------------|
| `pre-commit` | Before commit is created | Lint code, run tests |
| `commit-msg` | After message is written | Enforce message format |
| `pre-push` | Before push to remote | Run full test suite |
| `post-merge` | After a merge completes | Install dependencies |
| `pre-rebase` | Before rebase starts | Warn about shared branches |

### Clean Up

```bash
rm temp-todo.txt
git add -A
git commit -m "Clean up temp files"
```

> **HitaVir Tech says:** "Git hooks are like quality gates in a factory. They catch problems before they reach production. Start with a simple pre-commit hook and build from there."

## Collaboration Workflows
Duration: 8:00

Different teams use different Git workflows. Understanding them helps you work in any team.

### 1. GitFlow

GitFlow uses long-running branches for different purposes:

```
main (production) ─────────────────────────────
         \                      /
release   \──── release/1.0 ──/
           \                /
develop ────────────────────────────────────────
         \       /     \          /
feature   feat-A/       \feat-B /
```

**Branches:**

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch for features |
| `feature/*` | New features |
| `release/*` | Release preparation |
| `hotfix/*` | Emergency production fixes |

**Best for:** Large teams, scheduled releases, complex projects.

### 2. Trunk-Based Development

Everyone works on `main` (the trunk) with short-lived branches:

```
main ───A───B───C───D───E───F───
             \  /       \  /
              \/         \/
         feature     feature
        (1-2 days)  (1-2 days)
```

**Rules:**

- Feature branches live for 1-2 days maximum
- Merge to main frequently (at least daily)
- Use feature flags to hide incomplete work
- Every commit to main should be deployable

**Best for:** Small teams, continuous deployment, fast-moving projects.

### 3. Forking Workflow

Used in open source — everyone works on their own fork:

```
upstream/main ──────────────────────────
      ↑           ↑
      │ PR        │ PR
      │           │
fork-A/main   fork-B/main
      │           │
  feature     feature
```

**Best for:** Open source projects, external contributors.

### Which Workflow Should You Use?

| Team Size | Release Cadence | Recommended Workflow |
|-----------|----------------|---------------------|
| 1-3 people | Continuous | Trunk-based |
| 4-10 people | Weekly/bi-weekly | Simplified GitFlow |
| 10+ people | Scheduled releases | Full GitFlow |
| Open source | Varies | Forking workflow |

> **HitaVir Tech says:** "There is no single 'correct' workflow. The best one is the one your team agrees on and follows consistently. Start simple and add complexity only when needed."

## Real-World Project Simulation
Duration: 15:00

Let us put everything together with a realistic team simulation. You will play multiple roles.

### The Scenario

You are building a team portfolio website. Simulate three team members:

- **HitaVir** (you on `main`) — Project lead
- **Dev-Alice** (branch) — Frontend developer
- **Dev-Bob** (branch) — Content writer

### Step 1 — Project Setup (HitaVir)

Make sure you are in your project directory:

```bash
cd ~/hitavir-portfolio
git switch main
```

Create the project structure:

```bash
mkdir -p css js
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HitaVir Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>Home | About | Skills | Contact</nav>
    </header>
    <main>
        <h1>Welcome to HitaVir Portfolio</h1>
        <p>Built during the HitaVir Tech Git and GitHub codelab.</p>
    </main>
    <script src="js/main.js"></script>
</body>
</html>
EOF

cat > css/style.css << 'EOF'
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}
header {
    background-color: #333;
    color: white;
    padding: 10px 20px;
}
nav {
    font-size: 16px;
}
main {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
}
EOF

cat > js/main.js << 'EOF'
console.log("HitaVir Portfolio loaded!");
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page ready.");
});
EOF

git add .
git commit -m "Set up project structure with HTML, CSS, and JS"
git push
```

### Step 2 — Alice Adds the Skills Section

```bash
git switch -c feature/alice-skills
cat >> index.html << 'EOF'
<!-- Skills Section - Added by Alice -->
EOF
```

Now edit `index.html` to add a skills section before `</main>`:

```bash
cat > skills.html << 'EOF'
<section id="skills">
    <h2>Skills</h2>
    <ul>
        <li>Git & GitHub</li>
        <li>Python</li>
        <li>JavaScript</li>
        <li>SQL</li>
        <li>Cloud Services</li>
    </ul>
</section>
EOF
git add .
git commit -m "Add skills section (Alice)"
git push -u origin feature/alice-skills
```

### Step 3 — Bob Adds the Contact Section

```bash
git switch main
git switch -c feature/bob-contact
cat > contact.html << 'EOF'
<section id="contact">
    <h2>Contact</h2>
    <p>Email: hitavir@example.com</p>
    <p>GitHub: github.com/hitavir25</p>
    <p>LinkedIn: linkedin.com/in/hitavir</p>
</section>
EOF
git add .
git commit -m "Add contact section (Bob)"
git push -u origin feature/bob-contact
```

### Step 4 — Create a Conflict

Both Alice and Bob modify the same file:

```bash
git switch feature/alice-skills
echo "/* Alice's styles */" >> css/style.css
echo "section { padding: 20px; border: 1px solid #ddd; }" >> css/style.css
git add css/style.css
git commit -m "Alice: add section styles"
git push
```

```bash
git switch feature/bob-contact
echo "/* Bob's styles */" >> css/style.css
echo "section { margin: 10px 0; background: #fafafa; }" >> css/style.css
git add css/style.css
git commit -m "Bob: add section styles"
git push
```

### Step 5 — Merge Alice's Work First

```bash
git switch main
git merge feature/alice-skills
git push
```

### Step 6 — Merge Bob's Work (Conflict!)

```bash
git merge feature/bob-contact
```

You will get a merge conflict in `css/style.css`. Resolve it by combining both styles:

```bash
cat > css/style.css << 'EOF'
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}
header {
    background-color: #333;
    color: white;
    padding: 10px 20px;
}
nav {
    font-size: 16px;
}
main {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
}
/* Combined team styles */
section {
    padding: 20px;
    margin: 10px 0;
    border: 1px solid #ddd;
    background: #fafafa;
}
EOF

git add css/style.css
git commit -m "Merge Bob's contact section, resolve style conflict"
git push
```

### Step 7 — Tag the Release

```bash
git tag -a v1.0.0 -m "First release: portfolio with skills and contact"
git push origin v1.0.0
```

### Step 8 — Clean Up Branches

```bash
git branch -d feature/alice-skills
git branch -d feature/bob-contact
git push origin --delete feature/alice-skills
git push origin --delete feature/bob-contact
```

### Final Project Structure

```
hitavir-portfolio/
├── .git/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── README.md
├── index.html
├── bio.md
├── about.txt
├── project.txt
├── skills.txt
├── skills.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── nav.html
```

> **HitaVir Tech says:** "This simulation mirrors real-world teamwork. In actual projects, you will do this daily — branches, PRs, conflicts, merges. The more you practice, the more natural it becomes."

### Expert Level Recap

You have completed the Expert Level! Here is what you learned:

- Git internals (HEAD, refs, objects)
- Interactive rebase and squashing
- Git hooks for automation
- Collaboration workflows (GitFlow, trunk-based, forking)
- Full real-world project simulation with multiple developers

## Final Summary
Duration: 3:00

Congratulations! You have completed **GitHub Ultimate: Master Git and GitHub - Beginner to Expert** by **HitaVir Tech**!

### Your Journey

| Level | What You Learned |
|-------|-----------------|
| Beginner | Git basics, init, add, commit, .gitignore |
| Intermediate | Branching, merging, conflicts, remotes |
| Advanced | PRs, rebase, cherry-pick, stash, Actions |
| Expert | Internals, hooks, workflows, simulation |

### Key Takeaways

1. **Git is a time machine** — use it to track, undo, and explore your code history
2. **Branches are free** — use them for every feature, bug fix, and experiment
3. **Commit often, push daily** — small commits are easier to review and debug
4. **PRs are conversations** — write good descriptions and review thoughtfully
5. **Never rewrite shared history** — use revert for shared branches, reset for local only
6. **Automate with Actions** — let robots do the repetitive work
7. **Practice is everything** — the more you use Git, the more natural it becomes

> **HitaVir Tech says:** "You now have the skills to manage code like a professional. Go build something amazing, contribute to open source, and keep learning. The world of Git and GitHub is yours!"

## What is Next?
Duration: 2:00

Now that you have mastered Git and GitHub, here are your next steps:

### Immediate Actions

1. **Build a real project** — Apply everything you learned to a personal project
2. **Contribute to open source** — Find a beginner-friendly project on GitHub
3. **Set up your GitHub profile** — Add a profile README, pin your best repos

### Topics to Explore Next

| Topic | Why |
|-------|-----|
| GitHub Pages | Host a website for free |
| GitHub Projects | Manage tasks and sprints |
| Advanced GitHub Actions | Multi-job workflows, deployment |
| Git LFS | Handle large binary files |
| Signed Commits (GPG) | Verify commit authenticity |
| GitHub API | Automate GitHub with code |
| GitHub Copilot | AI-powered coding assistant |

### Recommended Resources

- [Pro Git Book](https://git-scm.com/book/en/v2) — Free, comprehensive reference
- [GitHub Skills](https://skills.github.com/) — Interactive GitHub learning paths
- [Oh My Git!](https://ohmygit.org/) — Learn Git through a game

> **HitaVir Tech says:** "This is not the end — it is the beginning. Every expert was once a beginner. Keep practicing, keep building, and keep pushing your code forward!"

## Git Cheat Sheet
Duration: 3:00

A quick reference for all the commands you learned. Save this for daily use!

### Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
```

### Create and Clone

```bash
git init                          # Initialize new repo
git clone <url>                   # Clone remote repo
```

### Basic Workflow

```bash
git status                        # Check current state
git add <file>                    # Stage a file
git add .                         # Stage all changes
git commit -m "message"           # Commit staged changes
git log --oneline                 # View compact history
```

### Branching

```bash
git branch                        # List branches
git branch <name>                 # Create branch
git switch <name>                 # Switch to branch
git switch -c <name>              # Create and switch
git branch -d <name>              # Delete branch (safe)
git branch -D <name>              # Delete branch (force)
```

### Merging and Rebasing

```bash
git merge <branch>                # Merge branch into current
git rebase <branch>               # Rebase current onto branch
git rebase -i HEAD~N              # Interactive rebase last N commits
git cherry-pick <hash>            # Copy specific commit
```

### Remote Operations

```bash
git remote add origin <url>       # Add remote
git push -u origin main           # Push and set upstream
git push                          # Push to upstream
git pull                          # Fetch and merge
git fetch                         # Fetch only (no merge)
```

### Undo and Fix

```bash
git restore <file>                # Discard working changes
git restore --staged <file>       # Unstage a file
git reset --soft HEAD~1           # Undo commit (keep changes)
git reset --hard HEAD~1           # Undo commit (discard changes)
git revert HEAD                   # Create undo commit
git stash                         # Stash changes
git stash pop                     # Restore stashed changes
```

### Tags

```bash
git tag -a v1.0 -m "message"     # Create annotated tag
git push origin --tags            # Push all tags
```

### Inspection

```bash
git diff                          # View unstaged changes
git diff --staged                 # View staged changes
git log --oneline --graph --all   # Visual branch history
git show <hash>                   # View commit details
git blame <file>                  # Who changed each line
```

## Interview Questions — Git and GitHub
Duration: 5:00

Here are 10 real-world interview questions with answers to help you ace your next interview.

### Q1: What is the difference between `git merge` and `git rebase`?

**Answer:** Both combine changes from one branch into another. `git merge` creates a merge commit and preserves the full branch history. `git rebase` moves commits to create a linear history. Use merge for shared branches and rebase for local feature branches.

### Q2: What is the staging area in Git?

**Answer:** The staging area (or index) is an intermediate zone between the working directory and the repository. When you `git add` a file, it moves to the staging area. When you `git commit`, only staged changes are saved. This lets you create focused, logical commits.

### Q3: How do you resolve a merge conflict?

**Answer:** Open the conflicted file, look for the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), decide which changes to keep, remove the markers, then `git add` the file and `git commit`.

### Q4: What is the difference between `git pull` and `git fetch`?

**Answer:** `git fetch` downloads remote changes but does not merge them. `git pull` does both — it fetches and then merges. Use `fetch` when you want to inspect changes before merging.

### Q5: What is a detached HEAD state?

**Answer:** Detached HEAD occurs when HEAD points directly to a commit instead of a branch. This happens when you checkout a specific commit hash. Any new commits you make will not belong to any branch and can be lost. Use `git switch main` to return to normal.

### Q6: How do you undo the last commit without losing changes?

**Answer:** Use `git reset --soft HEAD~1`. This moves HEAD back one commit but keeps all changes staged. You can then modify the changes and recommit.

### Q7: What is a Pull Request?

**Answer:** A Pull Request is a GitHub feature that proposes merging changes from one branch to another. It enables code review, discussion, and approval before changes are merged. It is the primary collaboration mechanism on GitHub.

### Q8: Explain the GitFlow workflow.

**Answer:** GitFlow uses multiple long-lived branches: `main` (production), `develop` (integration), `feature/*` (new work), `release/*` (release prep), and `hotfix/*` (emergency fixes). Features branch off `develop`, releases branch off `develop` and merge to both `main` and `develop`.

### Q9: What is `git stash` and when would you use it?

**Answer:** `git stash` temporarily saves uncommitted changes and gives you a clean working directory. Use it when you need to switch branches urgently but are not ready to commit your current work. Restore with `git stash pop`.

### Q10: How do you squash commits?

**Answer:** Use interactive rebase: `git rebase -i HEAD~N` where N is the number of commits. In the editor, change `pick` to `squash` (or `s`) for commits you want to combine. This creates one clean commit from multiple messy ones.

### Bonus Tips for Interviews

- Always mention **when** to use each command, not just what it does
- Emphasize safety — explain when a command is dangerous
- Share real examples from your projects
- Know the difference between local and remote operations

> **HitaVir Tech says:** "In interviews, confidence comes from practice. If you have followed this entire codelab hands-on, you already know more than most candidates. Go get that job!"

## Congratulations
Duration: 1:00

You have successfully completed **GitHub Ultimate: Master Git and GitHub - Beginner to Expert**!

### What You Achieved

- Installed and configured Git
- Created and managed repositories
- Mastered branching, merging, and conflict resolution
- Worked with GitHub (push, pull, PRs, reviews)
- Used advanced techniques (rebase, cherry-pick, stash)
- Set up CI/CD with GitHub Actions
- Contributed to open source
- Understood Git internals and hooks
- Simulated real-world team collaboration
- Prepared for technical interviews

### Share Your Achievement

- Push your `hitavir-portfolio` to GitHub
- Add it to your resume and LinkedIn
- Star this codelab if you found it helpful

### Stay Connected with HitaVir Tech

Keep learning and building. Every line of code you write makes you better.

**Happy coding!**

summary: Linux Basics with Git Bash Command Line - Beginner to Intermediate
id: linux-basics
categories: Linux, Command Line, DevOps
tags: linux, bash, git-bash, command-line, terminal, devops
status: Published
authors: HitaVirTech
Feedback Link: https://github.com/hitavir25/codelabs/issues

# Linux Basics with Git Bash Command Line - Beginner to Intermediate

## Overview
Duration: 5:00

Welcome to **Linux Basics with Git Bash Command Line** by **HitaVir Tech**!

This hands-on codelab teaches you Linux command line skills using **Git Bash on Windows**. You do not need a Linux computer. You do not need any prior experience. By the end, you will navigate the terminal like a professional developer.

### What You Will Achieve

Throughout this codelab, you will build and manage a real developer workspace called **hitavir-workspace** entirely from the command line. You will:

- Navigate the file system with confidence
- Create, move, copy, and delete files and folders
- View and edit file contents
- Search through files using powerful tools
- Combine commands with pipes and redirection
- Customize your terminal environment

### Skills You Will Gain

| Skill | Level |
|-------|-------|
| Terminal navigation (pwd, ls, cd) | Beginner |
| File management (mkdir, touch, cp, mv, rm) | Beginner |
| Viewing files (cat, head, tail, less) | Beginner |
| File permissions (ls -l, chmod) | Intermediate |
| Searching (grep, find) | Intermediate |
| Pipes and redirection | Intermediate |
| Environment variables and productivity | Intermediate |

### Estimated Duration

**3-4 hours** (go at your own pace — every section is self-contained)

### Why Learn the Command Line?

1. **Every developer uses it** — you cannot avoid the terminal in tech
2. **Faster than clicking** — one command replaces 10 mouse clicks
3. **Server management** — most servers have no graphical interface
4. **DevOps and cloud** — AWS, Azure, Docker all require terminal skills
5. **Job interviews** — Linux basics are tested in almost every tech interview

> **HitaVir Tech says:** "The terminal is your superpower. Once you learn it, you will wonder how you ever worked without it."

## Prerequisites
Duration: 3:00

Before starting, make sure you have:

### Required

- A computer running **Windows 10 or 11**
- Administrator access (to install software)
- At least **500 MB** free disk space

### No Prior Knowledge Needed

This codelab assumes **zero experience** with Linux, terminals, or command lines. We start from the very beginning.

### What You Do NOT Need

- You do NOT need Linux installed
- You do NOT need a Mac
- You do NOT need any programming knowledge

> **HitaVir Tech says:** "If you can type on a keyboard, you can learn the command line. It is that simple."

## Install Git Bash
Duration: 5:00

Git Bash gives you a Linux-like terminal on Windows. It understands the same commands used on Linux and Mac.

### Step 1 — Download Git for Windows

Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)

Download the **64-bit Windows installer**.

Or open **PowerShell** and run:

```console
winget install Git.Git
```

### Step 2 — Run the Installer

1. Double-click the downloaded file
2. Click **Next** through the installer
3. **Important:** On the "Adjusting your PATH environment" screen, select **"Git from the command line and also from 3rd-party software"**
4. On the "Choosing the default editor" screen, select **VS Code** (or your preferred editor)
5. Accept defaults for all other screens
6. Click **Install**

### Step 3 — Open Git Bash

Press `Win + S`, type **Git Bash**, and open it.

You should see a window with a prompt like this:

```
user@COMPUTER MINGW64 ~
$
```

This is your terminal. The `$` sign means it is ready for your commands.

### Step 4 — Verify Installation

Type this command and press Enter:

```bash
bash --version
```

**Expected output:**

```
GNU bash, version 5.2.26(1)-release (x86_64-pc-msys)
```

The version number may differ — any version 4+ is fine.

### Terminal Anatomy

```
user@COMPUTER MINGW64 ~/projects
$  ls -la
│    │         │          │    └── The command you type
│    │         │          └── Dollar sign = ready for input
│    │         └── Current directory
│    └── System name
└── Your username
```

### Common Mistakes

| Problem | Solution |
|---------|----------|
| "Git Bash not found" | Restart your computer after installation |
| Blank or frozen screen | Press Enter — the terminal may be waiting |
| Cannot paste text | Right-click to paste (Ctrl+V may not work) |

> **HitaVir Tech says:** "Git Bash is your gateway to Linux on Windows. Treat it like your new best friend — you will be spending a lot of time together."

## What is Linux? What is a Shell?
Duration: 5:00

Before typing commands, let us understand what we are working with.

### What is Linux?

**Linux** is an operating system — like Windows or macOS — but it is **free and open source**. It powers:

- 90% of the world's servers
- All Android phones
- Most cloud platforms (AWS, Google Cloud, Azure)
- Supercomputers
- Smart TVs, routers, and IoT devices

You do not need to install Linux to learn its commands. Git Bash gives you the same tools on Windows.

### What is a Shell?

A **shell** is a program that takes your typed commands and sends them to the operating system.

Think of it this way:

| Concept | Real-World Analogy |
|---------|-------------------|
| Operating System | The kitchen |
| Shell | The waiter who takes your order |
| Commands | Your food order |
| Output | The food delivered to your table |

You tell the waiter (shell) what you want, and the waiter tells the kitchen (OS) to prepare it.

### What is Git Bash?

**Git Bash** is a shell for Windows that understands Linux commands. It combines:

- **Bash** — the most popular Linux shell
- **Git** — version control software
- **Unix tools** — ls, grep, find, and more

### Types of Shells

| Shell | Full Name | Used In |
|-------|-----------|---------|
| bash | Bourne Again Shell | Linux, Mac, Git Bash |
| zsh | Z Shell | Mac (default), Linux |
| sh | Bourne Shell | Older Unix systems |
| PowerShell | PowerShell | Windows |
| cmd | Command Prompt | Windows (legacy) |

We will use **Bash** throughout this codelab because it is the industry standard.

> **HitaVir Tech says:** "Learning Bash is like learning to drive a manual car. Once you know it, you can drive anything. The same commands work on Linux, Mac, servers, Docker containers, and cloud instances."

## Your First Commands — pwd, ls, clear
Duration: 8:00

Time to type your first commands! Open Git Bash and follow along.

### pwd — Print Working Directory

This command tells you **where you are** in the file system.

```bash
pwd
```

**Expected output:**

```
/c/Users/YourName
```

This is your **home directory**. Think of it as your desk — the default location where you start.

**Real-world analogy:** Imagine you are in a building. `pwd` is like asking "What room am I in right now?"

### ls — List Files

This command shows the **files and folders** in your current location.

```bash
ls
```

**Expected output (example):**

```
Desktop  Documents  Downloads  Music  Pictures  Videos
```

These are the folders inside your home directory.

### ls with Options

Add options to see more details:

```bash
ls -l
```

**Expected output:**

```
drwxr-xr-x 1 user group 0 Apr  5 10:00 Desktop
drwxr-xr-x 1 user group 0 Apr  5 10:00 Documents
drwxr-xr-x 1 user group 0 Apr  5 10:00 Downloads
```

The `-l` flag means "long format" — it shows permissions, owner, size, and date.

```bash
ls -la
```

The `-a` flag means "all" — it shows hidden files (files starting with `.`).

**Expected output includes:**

```
.  ..  .bashrc  .gitconfig  Desktop  Documents  ...
```

Files starting with `.` are hidden configuration files.

### clear — Clear the Screen

When your terminal gets cluttered:

```bash
clear
```

This clears all the text. Your previous commands are not deleted — just scrolled off screen.

**Keyboard shortcut:** Press `Ctrl + L` for the same effect.

### Quick Reference

| Command | What It Does | Analogy |
|---------|-------------|---------|
| `pwd` | Show current location | "Where am I?" |
| `ls` | List files and folders | "What is in this room?" |
| `ls -l` | List with details | "Show me everything about this room" |
| `ls -la` | List all including hidden | "Show me everything, even hidden items" |
| `clear` | Clear the screen | "Clean the whiteboard" |

> **HitaVir Tech says:** "pwd, ls, and clear are your three best friends. You will use them hundreds of times a day. Type them until they become muscle memory."

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Typing `PWD` (uppercase) | Linux commands are case-sensitive — use lowercase |
| Adding spaces in wrong places | `ls -l` not `ls - l` |
| Forgetting to press Enter | Commands only run when you press Enter |

## Navigating the File System — cd
Duration: 8:00

The `cd` command lets you move between directories (folders).

### Understanding the File System

The file system is like a tree:

```
/                        ← Root (top of everything)
├── c/                   ← Your C: drive
│   └── Users/
│       └── YourName/    ← Your home directory (~)
│           ├── Desktop/
│           ├── Documents/
│           └── Downloads/
├── tmp/                 ← Temporary files
└── etc/                 ← System configuration
```

### cd — Change Directory

Move into a folder:

```bash
cd Documents
```

Verify you moved:

```bash
pwd
```

**Expected output:**

```
/c/Users/YourName/Documents
```

### Go Back One Level

```bash
cd ..
```

The `..` means "parent directory" (one level up).

```bash
pwd
```

**Expected output:**

```
/c/Users/YourName
```

### Go to Home Directory

From anywhere, go straight home:

```bash
cd ~
```

Or simply:

```bash
cd
```

Both take you to your home directory.

### Go to a Specific Path

Jump directly to any location:

```bash
cd /c/Users
```

### Go Back to Previous Directory

```bash
cd -
```

This takes you back to wherever you were before. Like pressing the "Back" button.

### Path Types

| Type | Example | Description |
|------|---------|-------------|
| Absolute path | `/c/Users/YourName/Documents` | Full path from root |
| Relative path | `Documents` or `../Downloads` | Path relative to current location |

**Real-world analogy:**

- Absolute: "Go to 123 Main Street, City, Country" (full address)
- Relative: "Go two blocks north" (from where you are now)

### Practice Navigation

```bash
cd ~
pwd

cd Documents
pwd

cd ..
pwd

cd /tmp
pwd

cd ~
pwd
```

**Expected output pattern:**

```
/c/Users/YourName
/c/Users/YourName/Documents
/c/Users/YourName
/tmp
/c/Users/YourName
```

### Tab Completion

Start typing a folder name and press **Tab** — Git Bash will auto-complete it:

```bash
cd Doc
```

Press **Tab** and it becomes:

```bash
cd Documents/
```

This saves time and prevents typos!

> **HitaVir Tech says:** "Tab completion is your secret weapon. Press Tab early, press Tab often. It saves you from typos and speeds up your workflow by 10x."

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| `cd documents` (wrong case) | Case matters! Use `cd Documents` |
| `cd My Documents` (space in name) | Use quotes: `cd "My Documents"` or escape: `cd My\ Documents` |
| "No such file or directory" | Check spelling with `ls` first |

### Beginner Foundations Recap

You have completed the foundations! Here is what you learned:

- What Linux, shells, and Git Bash are
- How to check your location with `pwd`
- How to list files with `ls` and its options
- How to navigate with `cd` (relative and absolute paths)
- Tab completion for faster typing
- How to clear the screen with `clear`

## Creating Directories — mkdir
Duration: 5:00

Now let us start building things! We will create our project workspace.

### mkdir — Make Directory

Create a single folder:

```bash
cd ~
mkdir hitavir-workspace
```

Verify it was created:

```bash
ls
```

You should see `hitavir-workspace` in the list.

### Create Nested Directories

Create multiple levels at once with `-p`:

```bash
mkdir -p hitavir-workspace/projects/web-app
mkdir -p hitavir-workspace/projects/api
mkdir -p hitavir-workspace/logs
mkdir -p hitavir-workspace/backups
mkdir -p hitavir-workspace/config
```

### Verify the Structure

```bash
ls hitavir-workspace
```

**Expected output:**

```
backups  config  logs  projects
```

```bash
ls hitavir-workspace/projects
```

**Expected output:**

```
api  web-app
```

### Create Multiple Directories at Once

```bash
mkdir -p hitavir-workspace/docs hitavir-workspace/scripts hitavir-workspace/temp
```

### Enter the Workspace

```bash
cd ~/hitavir-workspace
pwd
```

**Expected output:**

```
/c/Users/YourName/hitavir-workspace
```

### Our Project Structure

```
hitavir-workspace/
├── backups/
├── config/
├── docs/
├── logs/
├── projects/
│   ├── api/
│   └── web-app/
├── scripts/
└── temp/
```

**Real-world analogy:** Creating directories is like organizing a filing cabinet. You create drawers (folders) and sub-drawers to keep everything organized.

> **HitaVir Tech says:** "A well-organized directory structure is the sign of a professional developer. Take 5 minutes to plan your folders and save hours of confusion later."

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| `mkdir projects/web-app` without parent | Use `mkdir -p` to create parents automatically |
| Space in folder name | Use quotes `mkdir "my folder"` or avoid spaces |
| Creating in wrong location | Always check `pwd` before creating |

## Creating Files — touch and echo
Duration: 5:00

Now let us add files to our workspace.

### touch — Create Empty Files

```bash
cd ~/hitavir-workspace
touch README.md
touch .gitignore
```

Verify:

```bash
ls -la
```

You should see both files. Notice `.gitignore` starts with a dot — it is a hidden file.

### Create Multiple Files

```bash
touch projects/web-app/index.html projects/web-app/style.css projects/web-app/app.js
touch projects/api/server.py projects/api/requirements.txt
touch config/settings.conf config/database.conf
```

### echo — Write Text to Files

```bash
echo "# HitaVir Workspace" > README.md
```

The `>` writes text to a file (creates it if it does not exist, overwrites if it does).

### Append Text (Do Not Overwrite)

```bash
echo "Created by HitaVir Tech" >> README.md
echo "Linux Basics Codelab Project" >> README.md
```

The `>>` appends text to the end of the file without deleting existing content.

### Create Files with Content

```bash
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
echo "__pycache__/" >> .gitignore
```

### Create Config Files

```bash
echo "APP_NAME=HitaVir-Workspace" > config/settings.conf
echo "APP_ENV=development" >> config/settings.conf
echo "APP_PORT=3000" >> config/settings.conf
echo "DEBUG=true" >> config/settings.conf
```

```bash
echo "DB_HOST=localhost" > config/database.conf
echo "DB_PORT=5432" >> config/database.conf
echo "DB_NAME=hitavir_db" >> config/database.conf
echo "DB_USER=admin" >> config/database.conf
```

### Create Log Files for Practice

```bash
echo "[2026-04-05 10:00:01] INFO: Server started on port 3000" > logs/app.log
echo "[2026-04-05 10:00:02] INFO: Database connected successfully" >> logs/app.log
echo "[2026-04-05 10:01:15] WARNING: High memory usage detected" >> logs/app.log
echo "[2026-04-05 10:02:30] ERROR: Failed to connect to cache server" >> logs/app.log
echo "[2026-04-05 10:03:00] INFO: Cache reconnected" >> logs/app.log
echo "[2026-04-05 10:05:22] ERROR: Timeout on /api/users endpoint" >> logs/app.log
echo "[2026-04-05 10:06:00] INFO: Request completed in 250ms" >> logs/app.log
echo "[2026-04-05 10:07:45] WARNING: Disk space below 10%" >> logs/app.log
echo "[2026-04-05 10:08:00] ERROR: Permission denied on /var/data" >> logs/app.log
echo "[2026-04-05 10:10:00] INFO: Daily backup completed" >> logs/app.log
```

### Create a Script File

```bash
cat > scripts/setup.sh << 'EOF'
#!/bin/bash
# HitaVir Workspace Setup Script
echo "Setting up HitaVir Workspace..."
echo "Creating directories..."
mkdir -p data output
echo "Setup complete!"
echo "Welcome to HitaVir Tech workspace!"
EOF
```

### Verify Everything

```bash
ls -la
ls projects/web-app/
ls config/
ls logs/
ls scripts/
```

> **HitaVir Tech says:** "`touch` creates empty files. `echo` puts content inside files. Think of `touch` as placing an empty envelope, and `echo` as writing a letter and putting it inside."

## Copying Files and Directories — cp
Duration: 5:00

The `cp` command copies files and folders.

### Copy a File

```bash
cd ~/hitavir-workspace
cp README.md backups/README.md.bak
```

This creates a copy of `README.md` in the `backups` folder with a `.bak` extension.

### Verify the Copy

```bash
cat backups/README.md.bak
```

**Expected output:**

```
# HitaVir Workspace
Created by HitaVir Tech
Linux Basics Codelab Project
```

The content is identical to the original.

### Copy to Same Directory (Different Name)

```bash
cp config/settings.conf config/settings.conf.backup
```

### Copy a Directory (with -r)

```bash
cp -r projects/web-app projects/web-app-backup
```

The `-r` flag means "recursive" — copy the folder and everything inside it.

### Copy Multiple Files

```bash
cp config/settings.conf config/database.conf backups/
```

This copies both files into the `backups` folder.

### Verify

```bash
ls backups/
```

**Expected output:**

```
README.md.bak  database.conf  settings.conf
```

### Quick Reference

| Command | What It Does |
|---------|-------------|
| `cp file1 file2` | Copy file1 to file2 |
| `cp file1 folder/` | Copy file1 into folder |
| `cp -r dir1 dir2` | Copy directory recursively |
| `cp file1 file2 folder/` | Copy multiple files into folder |

**Real-world analogy:** `cp` is like photocopying a document. The original stays where it is, and you get a new copy.

> **HitaVir Tech says:** "Always keep backups! The `cp` command is your safety net. Before making risky changes, copy the original file first."

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Forgetting `-r` for directories | `cp -r folder1 folder2` |
| Overwriting without warning | Use `cp -i` for interactive mode (asks before overwriting) |
| Wrong destination path | Always check with `ls` first |

## Moving and Renaming — mv
Duration: 5:00

The `mv` command moves files to a new location OR renames them.

### Move a File

```bash
cd ~/hitavir-workspace
mv temp/nothing.txt docs/ 2>/dev/null
touch temp/notes.txt
echo "Temporary notes from HitaVir Tech session" > temp/notes.txt
mv temp/notes.txt docs/
```

Check both locations:

```bash
ls temp/
ls docs/
```

The file is gone from `temp/` and now in `docs/`.

### Rename a File

```bash
mv docs/notes.txt docs/session-notes.txt
```

This renames `notes.txt` to `session-notes.txt`. Same command, different use.

### Move a Directory

```bash
mv projects/web-app-backup backups/web-app-backup
```

Directories move without needing `-r` (unlike `cp`).

### Rename a Directory

```bash
mkdir temp/old-logs
mv temp/old-logs temp/archived
ls temp/
```

**Expected output:**

```
archived
```

### Move Multiple Files

```bash
touch temp/file1.txt temp/file2.txt temp/file3.txt
mv temp/file1.txt temp/file2.txt temp/file3.txt docs/
ls docs/
```

### Move vs Copy Comparison

| Feature | `mv` | `cp` |
|---------|-------|------|
| Original file | Removed | Stays |
| Analogy | Relocating furniture | Photocopying a document |
| Directories | No `-r` needed | Needs `-r` |
| Can rename | Yes | Yes (but makes a copy) |

**Real-world analogy:** `mv` is like picking up a book from one shelf and putting it on another. `cp` is like making a photocopy — the original stays.

> **HitaVir Tech says:** "Remember: `mv` is a Swiss army knife. It both moves AND renames. If the destination is a new name in the same folder, it renames. If the destination is a different folder, it moves."

### Clean Up

```bash
rm -f temp/archived 2>/dev/null
rmdir temp/archived 2>/dev/null
```

## Deleting Files and Directories — rm, rmdir
Duration: 5:00

Deleting in the terminal is **permanent**. There is no Recycle Bin.

### rm — Remove Files

```bash
cd ~/hitavir-workspace
touch temp/delete-me.txt
ls temp/
```

```bash
rm temp/delete-me.txt
ls temp/
```

The file is gone. Permanently.

### rm with Confirmation

Add `-i` to get a confirmation prompt:

```bash
touch temp/careful.txt
rm -i temp/careful.txt
```

**Expected output:**

```
rm: remove regular empty file 'temp/careful.txt'?
```

Type `y` and press Enter to confirm.

### rm -r — Remove Directories

```bash
mkdir -p temp/test-dir/sub-dir
touch temp/test-dir/file.txt
touch temp/test-dir/sub-dir/deep-file.txt
```

Remove the entire directory tree:

```bash
rm -r temp/test-dir
```

Everything inside is deleted.

### rmdir — Remove Empty Directories Only

```bash
mkdir temp/empty-dir
rmdir temp/empty-dir
```

If the directory is not empty, `rmdir` will refuse:

```bash
mkdir temp/not-empty
touch temp/not-empty/file.txt
rmdir temp/not-empty
```

**Expected output:**

```
rmdir: failed to remove 'temp/not-empty': Directory not empty
```

Clean up:

```bash
rm -r temp/not-empty
```

### Danger Zone

| Command | Risk Level | What Happens |
|---------|-----------|-------------|
| `rm file.txt` | Low | Deletes one file |
| `rm -r folder/` | Medium | Deletes folder and everything inside |
| `rm -rf folder/` | HIGH | Force-deletes without any warnings |
| `rm -rf /` | CATASTROPHIC | Attempts to delete your entire system |

### Safety Rules

1. **Always double-check** the path before pressing Enter
2. **Use `ls` first** to see what will be deleted
3. **Use `rm -i`** when unsure
4. **Never use `rm -rf /`** or `rm -rf *` without absolute certainty
5. **Make backups** before bulk deletions

> **HitaVir Tech says:** "The terminal trusts you completely. If you say delete, it deletes — no questions asked (unless you use `-i`). With great power comes great responsibility."

### File and Directory Management Recap

Excellent! You have mastered file management. Here is what you learned:

- Create directories with `mkdir` and `mkdir -p`
- Create files with `touch` and `echo`
- Copy with `cp` and `cp -r`
- Move and rename with `mv`
- Delete with `rm`, `rm -r`, and `rmdir`
- The difference between `>` (overwrite) and `>>` (append)

## Viewing File Contents — cat, head, tail
Duration: 8:00

Now let us read what is inside files without opening an editor.

### cat — Display Entire File

```bash
cd ~/hitavir-workspace
cat README.md
```

**Expected output:**

```
# HitaVir Workspace
Created by HitaVir Tech
Linux Basics Codelab Project
```

### cat with Line Numbers

```bash
cat -n logs/app.log
```

**Expected output:**

```
     1  [2026-04-05 10:00:01] INFO: Server started on port 3000
     2  [2026-04-05 10:00:02] INFO: Database connected successfully
     3  [2026-04-05 10:01:15] WARNING: High memory usage detected
     4  [2026-04-05 10:02:30] ERROR: Failed to connect to cache server
     5  [2026-04-05 10:03:00] INFO: Cache reconnected
     6  [2026-04-05 10:05:22] ERROR: Timeout on /api/users endpoint
     7  [2026-04-05 10:06:00] INFO: Request completed in 250ms
     8  [2026-04-05 10:07:45] WARNING: Disk space below 10%
     9  [2026-04-05 10:08:00] ERROR: Permission denied on /var/data
    10  [2026-04-05 10:10:00] INFO: Daily backup completed
```

### head — Show First Lines

```bash
head logs/app.log
```

By default, shows the first 10 lines. Specify a number:

```bash
head -3 logs/app.log
```

**Expected output:**

```
[2026-04-05 10:00:01] INFO: Server started on port 3000
[2026-04-05 10:00:02] INFO: Database connected successfully
[2026-04-05 10:01:15] WARNING: High memory usage detected
```

### tail — Show Last Lines

```bash
tail logs/app.log
```

Show last 3 lines:

```bash
tail -3 logs/app.log
```

**Expected output:**

```
[2026-04-05 10:07:45] WARNING: Disk space below 10%
[2026-04-05 10:08:00] ERROR: Permission denied on /var/data
[2026-04-05 10:10:00] INFO: Daily backup completed
```

### less — Interactive File Viewer

For long files, use `less`:

```bash
less logs/app.log
```

Inside `less`:

| Key | Action |
|-----|--------|
| `Space` or `Page Down` | Scroll down one page |
| `b` or `Page Up` | Scroll up one page |
| `Arrow Down` | Scroll one line down |
| `Arrow Up` | Scroll one line up |
| `/search` | Search for text |
| `n` | Next search match |
| `q` | Quit |

Press `q` to exit `less`.

### wc — Word Count

Count lines, words, and characters:

```bash
wc logs/app.log
```

**Expected output:**

```
 10  62 560 logs/app.log
```

This means: 10 lines, 62 words, 560 characters.

Count only lines:

```bash
wc -l logs/app.log
```

**Expected output:**

```
10 logs/app.log
```

### Combine cat with Other Files

Display multiple files:

```bash
cat config/settings.conf config/database.conf
```

### Quick Reference

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `cat file` | Show entire file | Small files |
| `cat -n file` | Show with line numbers | Debugging |
| `head file` | Show first 10 lines | Quick preview |
| `head -N file` | Show first N lines | Specific preview |
| `tail file` | Show last 10 lines | Recent log entries |
| `tail -N file` | Show last N lines | Specific recent entries |
| `less file` | Interactive viewer | Large files |
| `wc -l file` | Count lines | File statistics |

**Real-world analogy:** `cat` is reading the entire letter. `head` is reading just the greeting. `tail` is jumping to the signature. `less` is reading page by page.

> **HitaVir Tech says:** "In real-world DevOps, `tail` is your go-to for reading logs. Servers generate thousands of lines — you almost always want to see just the latest entries."

## Writing to Files — echo and Redirection
Duration: 5:00

You have already used `echo` and `>`. Let us understand redirection deeply.

### Output Redirection — Write to File

The `>` operator sends command output to a file:

```bash
cd ~/hitavir-workspace
echo "This is line one" > docs/output.txt
cat docs/output.txt
```

**Expected output:**

```
This is line one
```

### Overwrite Warning

Using `>` again **replaces** the file content:

```bash
echo "This is NEW content" > docs/output.txt
cat docs/output.txt
```

**Expected output:**

```
This is NEW content
```

The old "This is line one" is gone.

### Append — Add to File

Use `>>` to add without deleting:

```bash
echo "Line one" > docs/output.txt
echo "Line two" >> docs/output.txt
echo "Line three" >> docs/output.txt
cat docs/output.txt
```

**Expected output:**

```
Line one
Line two
Line three
```

### Redirect Any Command Output

Save `ls` output to a file:

```bash
ls -la > docs/file-listing.txt
cat docs/file-listing.txt
```

Save date and system info:

```bash
echo "Report generated on: $(date)" > docs/report.txt
echo "Current directory: $(pwd)" >> docs/report.txt
echo "Files in workspace:" >> docs/report.txt
ls >> docs/report.txt
cat docs/report.txt
```

### Redirection Summary

| Operator | What It Does | Example |
|----------|-------------|---------|
| `>` | Write to file (overwrite) | `echo "hi" > file.txt` |
| `>>` | Append to file | `echo "hi" >> file.txt` |
| `2>` | Redirect errors to file | `ls /fake 2> errors.txt` |
| `&>` | Redirect all output to file | `ls /fake &> all.txt` |

> **HitaVir Tech says:** "Think of `>` as a bulldozer — it flattens everything and starts fresh. Think of `>>` as a bricklayer — it adds on top of what is already there."

## File Permissions — ls -l and chmod
Duration: 8:00

Every file in Linux has permissions that control who can read, write, and execute it.

### Understanding ls -l Output

```bash
cd ~/hitavir-workspace
ls -l scripts/setup.sh
```

**Expected output:**

```
-rw-r--r-- 1 user group 156 Apr  5 10:00 scripts/setup.sh
```

Let us break this down:

```
-rw-r--r--  1  user  group  156  Apr 5 10:00  scripts/setup.sh
│├──┤├──┤├──┤     │     │     │       │            │
│ │   │   │       │     │     │       │            └── File name
│ │   │   │       │     │     │       └── Date modified
│ │   │   │       │     │     └── Size in bytes
│ │   │   │       │     └── Group owner
│ │   │   │       └── File owner
│ │   │   └── Others permissions (r--)
│ │   └── Group permissions (r--)
│ └── Owner permissions (rw-)
└── File type (- = file, d = directory)
```

### Permission Characters

| Character | Meaning | Number |
|-----------|---------|--------|
| `r` | Read (view content) | 4 |
| `w` | Write (modify content) | 2 |
| `x` | Execute (run as program) | 1 |
| `-` | No permission | 0 |

### Permission Groups

| Position | Who |
|----------|-----|
| First 3 chars (rw-) | **Owner** — the user who created the file |
| Middle 3 chars (r--) | **Group** — users in the same group |
| Last 3 chars (r--) | **Others** — everyone else |

### chmod — Change Permissions

Make a file executable:

```bash
chmod +x scripts/setup.sh
ls -l scripts/setup.sh
```

**Expected output:**

```
-rwxr-xr-x 1 user group 156 Apr  5 10:00 scripts/setup.sh
```

Notice the `x` appeared in all three groups.

### Run the Script

```bash
./scripts/setup.sh
```

**Expected output:**

```
Setting up HitaVir Workspace...
Creating directories...
Setup complete!
Welcome to HitaVir Tech workspace!
```

### chmod with Numbers

Each permission has a number value. Add them up for each group:

| Permission | Calculation | Total |
|-----------|-------------|-------|
| rwx | 4+2+1 | 7 |
| rw- | 4+2+0 | 6 |
| r-x | 4+0+1 | 5 |
| r-- | 4+0+0 | 4 |

```bash
chmod 755 scripts/setup.sh
ls -l scripts/setup.sh
```

**Expected output:**

```
-rwxr-xr-x 1 user group 156 Apr  5 10:00 scripts/setup.sh
```

`755` means: owner=rwx(7), group=r-x(5), others=r-x(5).

### Common Permission Patterns

| Number | Permissions | Common Use |
|--------|-----------|------------|
| `644` | rw-r--r-- | Regular files |
| `755` | rwxr-xr-x | Executable scripts |
| `600` | rw------- | Private files (passwords, keys) |
| `700` | rwx------ | Private executable scripts |
| `777` | rwxrwxrwx | Everyone can do everything (avoid this!) |

**Real-world analogy:** Permissions are like access cards in an office building. The owner has the master key, the group has department access, and others can only enter the lobby.

> **HitaVir Tech says:** "Never use `chmod 777` in production. It is like leaving your front door wide open with a sign that says 'Come in and take whatever you want.' Use the minimum permissions needed."

### Viewing and Editing Files Recap

Great work! Here is what you learned:

- View files with `cat`, `head`, `tail`, and `less`
- Count lines with `wc -l`
- Write to files with `>` (overwrite) and `>>` (append)
- Understand file permissions (rwx, owner/group/others)
- Change permissions with `chmod`
- Make scripts executable and run them

## Searching in Files — grep
Duration: 8:00

`grep` is one of the most powerful Linux commands. It searches for text patterns inside files.

### Basic grep

Search for the word "ERROR" in our log file:

```bash
cd ~/hitavir-workspace
grep "ERROR" logs/app.log
```

**Expected output:**

```
[2026-04-05 10:02:30] ERROR: Failed to connect to cache server
[2026-04-05 10:05:22] ERROR: Timeout on /api/users endpoint
[2026-04-05 10:08:00] ERROR: Permission denied on /var/data
```

Only lines containing "ERROR" are shown.

### Case-Insensitive Search

```bash
grep -i "error" logs/app.log
```

The `-i` flag ignores case — matches ERROR, error, Error, etc.

### Show Line Numbers

```bash
grep -n "ERROR" logs/app.log
```

**Expected output:**

```
4:[2026-04-05 10:02:30] ERROR: Failed to connect to cache server
6:[2026-04-05 10:05:22] ERROR: Timeout on /api/users endpoint
9:[2026-04-05 10:08:00] ERROR: Permission denied on /var/data
```

### Count Matches

```bash
grep -c "ERROR" logs/app.log
```

**Expected output:**

```
3
```

Three lines contain "ERROR".

### Invert Match (Lines WITHOUT Pattern)

```bash
grep -v "INFO" logs/app.log
```

**Expected output:**

```
[2026-04-05 10:01:15] WARNING: High memory usage detected
[2026-04-05 10:02:30] ERROR: Failed to connect to cache server
[2026-04-05 10:05:22] ERROR: Timeout on /api/users endpoint
[2026-04-05 10:07:45] WARNING: Disk space below 10%
[2026-04-05 10:08:00] ERROR: Permission denied on /var/data
```

All lines except INFO lines.

### Search Multiple Files

```bash
grep "localhost" config/*.conf
```

**Expected output:**

```
config/database.conf:DB_HOST=localhost
```

### Search Recursively (All Files in All Folders)

```bash
grep -r "HitaVir" .
```

This searches every file in every subdirectory for "HitaVir".

### grep with Context

Show lines around the match:

```bash
grep -B 1 -A 1 "ERROR" logs/app.log
```

- `-B 1` shows 1 line **B**efore the match
- `-A 1` shows 1 line **A**fter the match

### grep Options Quick Reference

| Option | What It Does | Example |
|--------|-------------|---------|
| `-i` | Case insensitive | `grep -i "error" file` |
| `-n` | Show line numbers | `grep -n "error" file` |
| `-c` | Count matches | `grep -c "error" file` |
| `-v` | Invert (lines NOT matching) | `grep -v "info" file` |
| `-r` | Recursive (search subdirectories) | `grep -r "text" .` |
| `-l` | Show only filenames | `grep -rl "text" .` |
| `-B N` | Show N lines before match | `grep -B 2 "error" file` |
| `-A N` | Show N lines after match | `grep -A 2 "error" file` |

**Real-world analogy:** `grep` is like Ctrl+F in your browser, but supercharged. It can search across thousands of files in seconds.

> **HitaVir Tech says:** "grep is the command you will use most in real-world DevOps. Server crashes at 3 AM? You grep the logs. Customer reports a bug? You grep for their user ID. Master grep and you will solve problems 10x faster."

## Finding Files — find
Duration: 5:00

`find` searches for files and directories by name, type, size, or age.

### Find by Name

```bash
cd ~/hitavir-workspace
find . -name "*.txt"
```

**Expected output:**

```
./docs/session-notes.txt
./docs/output.txt
./docs/file-listing.txt
./docs/report.txt
./docs/file1.txt
./docs/file2.txt
./docs/file3.txt
./projects/api/requirements.txt
```

The `.` means "search from current directory". `*.txt` matches any file ending in `.txt`.

### Find by Type

Find only directories:

```bash
find . -type d
```

Find only files:

```bash
find . -type f
```

### Find by Name Pattern (Case Insensitive)

```bash
find . -iname "*.conf"
```

**Expected output:**

```
./config/settings.conf
./config/settings.conf.backup
./config/database.conf
```

### Find and Count

```bash
find . -type f | wc -l
```

This counts how many files exist in the workspace.

### Find by Extension

```bash
find . -name "*.js"
find . -name "*.py"
find . -name "*.html"
```

### Find Quick Reference

| Command | What It Finds |
|---------|-------------|
| `find . -name "*.txt"` | Files ending in .txt |
| `find . -type d` | Directories only |
| `find . -type f` | Files only |
| `find . -iname "readme*"` | Case-insensitive name search |
| `find . -name "*.log"` | Log files |

**Real-world analogy:** `find` is like a search dog that you send into a building. You tell it what to look for (name, type, size), and it searches every room and reports back.

> **HitaVir Tech says:** "find + grep is the ultimate combo. Use `find` to locate files, then `grep` to search inside them. Together, they can answer any question about your codebase."

## Pipes — Combining Commands
Duration: 8:00

Pipes (`|`) connect commands together. The output of one command becomes the input of the next.

### How Pipes Work

```
Command1  |  Command2  |  Command3
   ↓            ↓            ↓
 Output → becomes Input → becomes Input → Final Output
```

### Example 1 — Count Error Lines

```bash
cd ~/hitavir-workspace
grep "ERROR" logs/app.log | wc -l
```

**Expected output:**

```
3
```

How it works: `grep` finds ERROR lines → sends them to `wc -l` → counts them.

### Example 2 — Sort Files by Size

```bash
ls -lS | head -5
```

`ls -lS` lists files sorted by **S**ize → `head -5` shows only the top 5.

### Example 3 — Find and Search

```bash
find . -name "*.conf" | xargs grep "localhost"
```

`find` locates .conf files → `xargs grep` searches inside each one.

### Example 4 — Filter and Count Unique Values

```bash
grep -o "INFO\|WARNING\|ERROR" logs/app.log | sort | uniq -c | sort -rn
```

**Expected output:**

```
      5 INFO
      3 ERROR
      2 WARNING
```

How it works:
1. `grep -o` extracts just the matched words
2. `sort` puts them in order
3. `uniq -c` counts duplicates
4. `sort -rn` sorts by count (highest first)

### Example 5 — Search Command History

```bash
history | grep "mkdir"
```

Shows all previous `mkdir` commands you typed.

### Example 6 — View Only Directories in ls

```bash
ls -l | grep "^d"
```

Lines starting with `d` are directories.

### Build a Log Analysis Pipeline

```bash
echo "=== Log Analysis Report ===" > docs/log-report.txt
echo "Generated: $(date)" >> docs/log-report.txt
echo "" >> docs/log-report.txt
echo "Total log entries:" >> docs/log-report.txt
wc -l < logs/app.log >> docs/log-report.txt
echo "" >> docs/log-report.txt
echo "Errors:" >> docs/log-report.txt
grep -c "ERROR" logs/app.log >> docs/log-report.txt
echo "" >> docs/log-report.txt
echo "Warnings:" >> docs/log-report.txt
grep -c "WARNING" logs/app.log >> docs/log-report.txt
echo "" >> docs/log-report.txt
echo "Error details:" >> docs/log-report.txt
grep "ERROR" logs/app.log >> docs/log-report.txt

cat docs/log-report.txt
```

**Expected output:**

```
=== Log Analysis Report ===
Generated: Sat Apr  5 10:30:00 2026

Total log entries:
10

Errors:
3

Warnings:
2

Error details:
[2026-04-05 10:02:30] ERROR: Failed to connect to cache server
[2026-04-05 10:05:22] ERROR: Timeout on /api/users endpoint
[2026-04-05 10:08:00] ERROR: Permission denied on /var/data
```

You just built a log analysis tool using only pipes and redirection!

### Common Pipe Patterns

| Pattern | What It Does |
|---------|-------------|
| `command \| head` | Show first few results |
| `command \| tail` | Show last few results |
| `command \| wc -l` | Count results |
| `command \| sort` | Sort results |
| `command \| grep "text"` | Filter results |
| `command \| sort \| uniq` | Remove duplicates |

> **HitaVir Tech says:** "Pipes are the magic of Linux. Each command does one small thing well. Pipes let you chain them together to do powerful things. This is the Unix philosophy — small tools, big results."

## Environment Variables and Productivity
Duration: 8:00

Environment variables store system-wide settings. Productivity tools save you time every day.

### View Environment Variables

```bash
echo $HOME
```

**Expected output:**

```
/c/Users/YourName
```

```bash
echo $PATH
```

This shows all directories where the system looks for commands.

```bash
echo $USER
```

Shows your username.

### Common Environment Variables

| Variable | What It Stores |
|----------|---------------|
| `$HOME` | Your home directory |
| `$PATH` | Where to find programs |
| `$USER` | Your username |
| `$SHELL` | Your current shell |
| `$PWD` | Current directory |

### Create Your Own Variable

```bash
MY_PROJECT="hitavir-workspace"
echo $MY_PROJECT
```

**Expected output:**

```
hitavir-workspace
```

### Export for Child Processes

```bash
export MY_NAME="HitaVir Tech"
echo "Welcome, $MY_NAME!"
```

### history — View Command History

```bash
history
```

Shows all commands you have typed. Each has a number.

```bash
history | tail -10
```

Shows the last 10 commands.

### Re-run a Previous Command

```bash
!!
```

Runs the last command again.

```bash
!50
```

Runs command number 50 from history.

### alias — Create Shortcuts

```bash
alias ll='ls -la'
alias cls='clear'
alias workspace='cd ~/hitavir-workspace'
```

Now try them:

```bash
workspace
ll
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + C` | Cancel current command |
| `Ctrl + L` | Clear screen (same as `clear`) |
| `Ctrl + R` | Search command history (reverse search) |
| `Ctrl + A` | Move cursor to beginning of line |
| `Ctrl + E` | Move cursor to end of line |
| `Ctrl + U` | Delete from cursor to beginning |
| `Ctrl + K` | Delete from cursor to end |
| `Tab` | Auto-complete file/directory names |
| `Tab Tab` | Show all possible completions |
| `Up Arrow` | Previous command |
| `Down Arrow` | Next command |

### Ctrl + R — Reverse Search

This is the most useful shortcut. Press `Ctrl + R` and start typing. It searches your history:

```
(reverse-i-search)`gre': grep "ERROR" logs/app.log
```

Press Enter to run the matched command, or `Ctrl + R` again for the next match.

### Make Aliases Permanent

Add aliases to your `~/.bashrc` file:

```bash
echo "" >> ~/.bashrc
echo "# HitaVir Tech Custom Aliases" >> ~/.bashrc
echo "alias ll='ls -la'" >> ~/.bashrc
echo "alias cls='clear'" >> ~/.bashrc
echo "alias workspace='cd ~/hitavir-workspace'" >> ~/.bashrc
```

Reload the configuration:

```bash
source ~/.bashrc
```

Now your aliases will work every time you open Git Bash.

> **HitaVir Tech says:** "Productivity in the terminal is all about saving keystrokes. Aliases, tab completion, and Ctrl+R will save you hours every week. The fastest developers are not the fastest typists — they are the ones who type the least."

### Intermediate Level Recap

Outstanding! You have completed the Intermediate Level. Here is what you learned:

- Search file contents with `grep` and all its options
- Find files by name, type, and pattern with `find`
- Chain commands together with pipes (`|`)
- Use redirection (`>`, `>>`) to save output
- Environment variables (`$HOME`, `$PATH`, custom)
- Command history and reverse search
- Create aliases for frequently used commands
- Keyboard shortcuts for maximum speed

## Real-World Project Simulation
Duration: 12:00

Let us bring everything together with a realistic developer workflow simulation.

### The Scenario

You are a junior DevOps engineer at HitaVir Tech. Your manager asks you to:

1. Set up a deployment project
2. Organize the repository structure
3. Create configuration files
4. Analyze application logs
5. Generate a status report
6. Archive old files

### Step 1 — Set Up the Deployment Project

```bash
cd ~/hitavir-workspace
mkdir -p deployment/{staging,production,scripts,logs,configs}
```

Verify:

```bash
ls deployment/
```

**Expected output:**

```
configs  logs  production  scripts  staging
```

### Step 2 — Create Deployment Configurations

```bash
cat > deployment/configs/staging.env << 'EOF'
APP_ENV=staging
APP_URL=https://staging.hitavir.tech
DB_HOST=staging-db.hitavir.tech
DB_PORT=5432
DB_NAME=hitavir_staging
REDIS_HOST=staging-cache.hitavir.tech
LOG_LEVEL=debug
MAX_WORKERS=2
EOF

cat > deployment/configs/production.env << 'EOF'
APP_ENV=production
APP_URL=https://hitavir.tech
DB_HOST=prod-db.hitavir.tech
DB_PORT=5432
DB_NAME=hitavir_prod
REDIS_HOST=prod-cache.hitavir.tech
LOG_LEVEL=warning
MAX_WORKERS=8
EOF
```

### Step 3 — Create the Deploy Script

```bash
cat > deployment/scripts/deploy.sh << 'SCRIPT'
#!/bin/bash
# HitaVir Tech Deployment Script
# Usage: ./deploy.sh [staging|production]

ENV=${1:-staging}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "================================================"
echo "  HitaVir Tech Deployment Tool"
echo "  Environment: $ENV"
echo "  Timestamp: $TIMESTAMP"
echo "================================================"
echo ""
echo "[1/4] Loading configuration..."
echo "[2/4] Running pre-deployment checks..."
echo "[3/4] Deploying application..."
echo "[4/4] Running health checks..."
echo ""
echo "Deployment to $ENV completed successfully!"
echo "Log saved to: deployment/logs/deploy_${ENV}_${TIMESTAMP}.log"
SCRIPT

chmod +x deployment/scripts/deploy.sh
```

### Step 4 — Generate Application Logs

```bash
cat > deployment/logs/staging-app.log << 'EOF'
[2026-04-05 08:00:01] INFO: Application starting in staging mode
[2026-04-05 08:00:02] INFO: Loading configuration from staging.env
[2026-04-05 08:00:03] INFO: Connected to database staging-db.hitavir.tech
[2026-04-05 08:00:04] INFO: Redis cache connected
[2026-04-05 08:01:00] INFO: Health check passed
[2026-04-05 08:15:30] WARNING: Slow query detected (2.3s) on /api/reports
[2026-04-05 08:20:00] INFO: Request from 192.168.1.100 - GET /api/users - 200
[2026-04-05 08:20:05] INFO: Request from 192.168.1.101 - POST /api/orders - 201
[2026-04-05 08:25:10] ERROR: Connection refused to payment gateway
[2026-04-05 08:25:15] ERROR: Retry 1/3 - payment gateway connection
[2026-04-05 08:25:20] INFO: Payment gateway reconnected
[2026-04-05 08:30:00] INFO: Scheduled job: cleanup temp files
[2026-04-05 08:45:00] WARNING: Memory usage at 78%
[2026-04-05 09:00:00] INFO: Hourly metrics report generated
[2026-04-05 09:15:30] ERROR: Disk write failed on /tmp/upload_cache
[2026-04-05 09:15:35] WARNING: Fallback to memory cache activated
[2026-04-05 09:30:00] INFO: SSL certificate valid for 45 days
[2026-04-05 09:45:00] INFO: Auto-scaling triggered: 2 -> 3 instances
[2026-04-05 10:00:00] ERROR: Unhandled exception in worker thread 2
[2026-04-05 10:00:05] INFO: Worker thread 2 restarted
[2026-04-05 10:30:00] INFO: Daily backup initiated
EOF
```

### Step 5 — Analyze the Logs

**Task 1: How many errors?**

```bash
grep -c "ERROR" deployment/logs/staging-app.log
```

**Expected output:** `4`

**Task 2: Show all errors with line numbers**

```bash
grep -n "ERROR" deployment/logs/staging-app.log
```

**Task 3: Count each log level**

```bash
grep -o "INFO\|WARNING\|ERROR" deployment/logs/staging-app.log | sort | uniq -c | sort -rn
```

**Expected output:**

```
     13 INFO
      4 ERROR
      3 WARNING
```

**Task 4: Find all IP addresses in the logs**

```bash
grep -o "[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}" deployment/logs/staging-app.log
```

**Expected output:**

```
192.168.1.100
192.168.1.101
```

**Task 5: Show errors with surrounding context**

```bash
grep -B 1 -A 1 "ERROR" deployment/logs/staging-app.log
```

### Step 6 — Generate the Status Report

```bash
cat > deployment/scripts/report.sh << 'REPORT'
#!/bin/bash
# HitaVir Tech Log Analysis Report Generator

LOG_FILE="deployment/logs/staging-app.log"
REPORT_FILE="deployment/logs/status-report.txt"

echo "============================================" > $REPORT_FILE
echo "  HitaVir Tech - System Status Report" >> $REPORT_FILE
echo "  Generated: $(date)" >> $REPORT_FILE
echo "============================================" >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "--- Log Summary ---" >> $REPORT_FILE
echo "Total entries: $(wc -l < $LOG_FILE)" >> $REPORT_FILE
echo "INFO count:    $(grep -c 'INFO' $LOG_FILE)" >> $REPORT_FILE
echo "WARNING count: $(grep -c 'WARNING' $LOG_FILE)" >> $REPORT_FILE
echo "ERROR count:   $(grep -c 'ERROR' $LOG_FILE)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "--- Error Details ---" >> $REPORT_FILE
grep "ERROR" $LOG_FILE >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "--- Warning Details ---" >> $REPORT_FILE
grep "WARNING" $LOG_FILE >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "--- System Health ---" >> $REPORT_FILE
echo "Config files: $(find deployment/configs -type f | wc -l)" >> $REPORT_FILE
echo "Log files: $(find deployment/logs -type f | wc -l)" >> $REPORT_FILE
echo "Scripts: $(find deployment/scripts -type f | wc -l)" >> $REPORT_FILE
echo "" >> $REPORT_FILE
echo "Report complete." >> $REPORT_FILE
REPORT

chmod +x deployment/scripts/report.sh
```

Run the report:

```bash
cd ~/hitavir-workspace
bash deployment/scripts/report.sh
cat deployment/logs/status-report.txt
```

### Step 7 — Archive Old Files

```bash
cd ~/hitavir-workspace
mkdir -p backups/archive-$(date +%Y%m%d)

cp deployment/logs/staging-app.log backups/archive-$(date +%Y%m%d)/
cp deployment/logs/status-report.txt backups/archive-$(date +%Y%m%d)/
cp -r deployment/configs backups/archive-$(date +%Y%m%d)/

ls backups/archive-$(date +%Y%m%d)/
```

### Step 8 — Run the Deploy Script

```bash
cd ~/hitavir-workspace
./deployment/scripts/deploy.sh staging
```

**Expected output:**

```
================================================
  HitaVir Tech Deployment Tool
  Environment: staging
  Timestamp: 20260405_103000
================================================

[1/4] Loading configuration...
[2/4] Running pre-deployment checks...
[3/4] Deploying application...
[4/4] Running health checks...

Deployment to staging completed successfully!
Log saved to: deployment/logs/deploy_staging_20260405_103000.log
```

### Final Workspace Structure

```
hitavir-workspace/
├── README.md
├── .gitignore
├── backups/
│   ├── archive-20260405/
│   ├── README.md.bak
│   └── web-app-backup/
├── config/
│   ├── settings.conf
│   ├── settings.conf.backup
│   └── database.conf
├── deployment/
│   ├── configs/
│   │   ├── staging.env
│   │   └── production.env
│   ├── logs/
│   │   ├── staging-app.log
│   │   └── status-report.txt
│   ├── scripts/
│   │   ├── deploy.sh
│   │   └── report.sh
│   ├── staging/
│   └── production/
├── docs/
├── logs/
│   └── app.log
├── projects/
│   ├── api/
│   └── web-app/
├── scripts/
│   └── setup.sh
└── temp/
```

> **HitaVir Tech says:** "You just did what junior DevOps engineers do every day — set up deployments, analyze logs, generate reports, and manage files. These are not toy exercises. This is real-world work."

## Troubleshooting Common Issues
Duration: 5:00

When things go wrong, here is how to fix them.

### "command not found"

```
bash: somecmd: command not found
```

**Causes and fixes:**

| Cause | Fix |
|-------|-----|
| Typo in command | Check spelling |
| Command not installed | Install the package |
| Wrong case | Use lowercase (`ls` not `LS`) |
| PATH not set | Check `echo $PATH` |

### "Permission denied"

```
bash: ./script.sh: Permission denied
```

**Fix:**

```bash
chmod +x script.sh
```

### "No such file or directory"

```
ls: cannot access 'myfile': No such file or directory
```

**Fix:**

```bash
pwd
ls
```

Check you are in the right directory and the file name is correct.

### Terminal Frozen

| Situation | Fix |
|-----------|-----|
| Command running too long | Press `Ctrl + C` to cancel |
| Screen looks stuck | Press `Enter` or `Ctrl + C` |
| Stuck in a program (less, vim) | Press `q` to quit |
| Accidentally opened vim | Type `:q!` and press Enter |

### "Argument list too long"

When using `*` with too many files:

```bash
# Instead of: rm *.log
find . -name "*.log" -exec rm {} \;
```

### Accidentally Deleted Something

Unfortunately, there is no undo. Prevention is the best cure:

1. Use `rm -i` for interactive confirmation
2. Always make backups before bulk operations
3. Double-check `pwd` before running destructive commands

> **HitaVir Tech says:** "Every developer has accidentally deleted something important at least once. That is how we learn to make backups. The terminal is powerful — and power demands respect."

## Final Summary
Duration: 3:00

Congratulations! You have completed **Linux Basics with Git Bash Command Line** by **HitaVir Tech**!

### Your Learning Journey

| Level | Skills Mastered |
|-------|----------------|
| Beginner | Terminal basics, navigation, pwd, ls, cd, clear |
| File Management | mkdir, touch, cp, mv, rm, rmdir |
| File Viewing | cat, head, tail, less, wc, echo |
| Permissions | ls -l, chmod, file ownership |
| Intermediate | grep, find, pipes, redirection |
| Productivity | history, alias, env variables, shortcuts |
| Real-World | Log analysis, scripting, deployment workflows |

### Key Takeaways

1. **The terminal is your superpower** — it makes you faster and more capable
2. **Commands are case-sensitive** — `ls` works, `LS` does not
3. **Tab completion saves time** — press Tab early and often
4. **Pipes chain commands** — small tools combined do big things
5. **grep is your detective** — it finds anything in any file
6. **Permissions protect files** — understand rwx and chmod
7. **Backups save careers** — always copy before deleting
8. **Practice makes permanent** — type every command yourself

> **HitaVir Tech says:** "You have gone from zero to confident in the Linux command line. This is a skill that will serve you for your entire career. Keep practicing, keep exploring, and keep building."

## What is Next?
Duration: 2:00

### Immediate Next Steps

1. **Practice daily** — open Git Bash and use it for file management instead of File Explorer
2. **Build more scripts** — automate repetitive tasks
3. **Try the GitHub Ultimate codelab** — learn Git version control

### Topics to Explore

| Topic | Why It Matters |
|-------|---------------|
| Shell Scripting (Bash) | Automate complex workflows |
| Docker | Container management is all CLI |
| SSH | Remote server access |
| vim or nano | Terminal-based text editors |
| awk and sed | Advanced text processing |
| cron jobs | Scheduled tasks |
| systemd | Service management |
| Networking (curl, wget, ping) | API testing and monitoring |

### Recommended Resources

- [Linux Journey](https://linuxjourney.com/) — Free interactive Linux learning
- [The Linux Command Line](https://linuxcommand.org/tlcl.php) — Free book
- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) — Learn Linux through a game

> **HitaVir Tech says:** "The best way to learn Linux is to use it every day. Make the terminal your default tool — not a last resort. Every command you type makes you better."

## Linux Command Cheat Sheet
Duration: 3:00

Save this reference for daily use!

### Navigation

```bash
pwd                           # Where am I?
ls                            # List files
ls -la                        # List all with details
cd folder                     # Enter folder
cd ..                         # Go up one level
cd ~                          # Go home
cd -                          # Go to previous directory
clear                         # Clear screen (or Ctrl+L)
```

### File Management

```bash
mkdir folder                  # Create directory
mkdir -p a/b/c                # Create nested directories
touch file.txt                # Create empty file
cp file1 file2                # Copy file
cp -r dir1 dir2               # Copy directory
mv file1 file2                # Move or rename
rm file                       # Delete file
rm -r folder                  # Delete directory
rm -i file                    # Delete with confirmation
rmdir folder                  # Delete empty directory
```

### Viewing Files

```bash
cat file                      # View entire file
cat -n file                   # View with line numbers
head file                     # First 10 lines
head -N file                  # First N lines
tail file                     # Last 10 lines
tail -N file                  # Last N lines
less file                     # Interactive viewer (q to quit)
wc -l file                    # Count lines
```

### Writing to Files

```bash
echo "text" > file            # Write (overwrite)
echo "text" >> file           # Append
command > file                # Save command output
command >> file               # Append command output
```

### Searching

```bash
grep "text" file              # Search in file
grep -i "text" file           # Case insensitive
grep -n "text" file           # With line numbers
grep -c "text" file           # Count matches
grep -r "text" .              # Search recursively
grep -v "text" file           # Lines NOT matching
find . -name "*.txt"          # Find files by name
find . -type d                # Find directories
find . -type f                # Find files
```

### Permissions

```bash
ls -l file                    # View permissions
chmod +x script.sh            # Make executable
chmod 755 script.sh           # Set specific permissions
chmod 644 file.txt            # Standard file permissions
```

### Pipes and Redirection

```bash
cmd1 | cmd2                   # Pipe output to next command
cmd | grep "text"             # Filter output
cmd | wc -l                   # Count output lines
cmd | sort                    # Sort output
cmd | head -N                 # First N lines of output
cmd | sort | uniq -c          # Count unique values
```

### Productivity

```bash
history                       # View command history
!!                            # Repeat last command
alias name='command'          # Create shortcut
echo $HOME                    # Show environment variable
export VAR="value"            # Set variable
Ctrl+C                        # Cancel command
Ctrl+R                        # Search history
Tab                           # Auto-complete
```

## Interview Questions — Linux Basics
Duration: 5:00

Here are 15 real-world interview questions with concise answers.

### Q1: What is the difference between absolute and relative paths?

**Answer:** An absolute path starts from the root (`/`) and specifies the full location, like `/home/user/docs`. A relative path starts from the current directory, like `../docs`. Absolute paths work from anywhere; relative paths depend on where you are.

### Q2: What does `chmod 755` mean?

**Answer:** It sets permissions to `rwxr-xr-x`. Owner gets read+write+execute (7), group gets read+execute (5), others get read+execute (5). This is the standard permission for executable scripts.

### Q3: What is the difference between `>` and `>>`?

**Answer:** `>` overwrites the file with new content (creates it if it does not exist). `>>` appends to the end of the file without deleting existing content.

### Q4: How do you search for a word in a file?

**Answer:** Use `grep "word" filename`. Add `-i` for case-insensitive search, `-r` for recursive search across directories, and `-n` for line numbers.

### Q5: What does `|` (pipe) do?

**Answer:** The pipe takes the output of one command and sends it as input to the next command. For example, `ls | grep ".txt"` lists files and then filters for .txt files only.

### Q6: What is the difference between `rm` and `rmdir`?

**Answer:** `rmdir` only removes empty directories. `rm -r` removes directories and all their contents recursively. `rm` without `-r` removes only files.

### Q7: How do you find all .log files in a directory tree?

**Answer:** Use `find /path -name "*.log"`. Add `-type f` to ensure only files (not directories) are returned.

### Q8: What does `ls -la` show?

**Answer:** It shows all files including hidden ones (`-a`) in long format (`-l`). Long format displays permissions, owner, group, size, modification date, and filename.

### Q9: How do you make a script executable?

**Answer:** Run `chmod +x script.sh` to add execute permission. Then run it with `./script.sh`. Without the execute permission, the shell refuses to run it.

### Q10: What is the `$PATH` variable?

**Answer:** `$PATH` is a colon-separated list of directories where the shell looks for executable programs. When you type a command, the shell searches these directories in order.

### Q11: What is the difference between `cp` and `mv`?

**Answer:** `cp` creates a copy of the file — the original remains. `mv` moves the file — the original is removed from its old location. `mv` can also rename files.

### Q12: How do you view the last 20 lines of a file?

**Answer:** Use `tail -20 filename`. `tail` shows the end of a file. Combine with `-f` (`tail -f filename`) to watch a file in real-time as new lines are added.

### Q13: What are hidden files in Linux?

**Answer:** Files whose names start with a dot (`.`) are hidden. They do not appear in regular `ls` output. Use `ls -a` to see them. Configuration files like `.bashrc` and `.gitconfig` are typically hidden.

### Q14: How do you count the number of lines in a file?

**Answer:** Use `wc -l filename`. The `-l` flag counts lines only. Without flags, `wc` shows lines, words, and characters.

### Q15: What is the purpose of `~` in paths?

**Answer:** `~` is a shortcut for the current user's home directory. `cd ~` and `cd $HOME` both take you to your home directory. `~/Documents` means the Documents folder inside your home.

### Bonus Tips for Interviews

- Always explain **when** and **why** to use each command, not just what it does
- Mention safety practices (backups, `rm -i`, checking `pwd`)
- Show you understand pipes and command chaining
- Know the difference between `>` and `>>` — interviewers love this question

> **HitaVir Tech says:** "In Linux interviews, they are not testing your memory. They are testing your understanding. If you have worked through this entire codelab hands-on, you understand these concepts deeply. That is what matters."

## Congratulations
Duration: 1:00

You have successfully completed **Linux Basics with Git Bash Command Line - Beginner to Intermediate**!

### What You Achieved

- Installed and configured Git Bash on Windows
- Mastered terminal navigation (pwd, ls, cd)
- Created and managed files and directories
- Viewed and edited files from the command line
- Understood Linux file permissions
- Searched files with grep and find
- Combined commands with pipes and redirection
- Set up environment variables and productivity shortcuts
- Built a real-world deployment workspace
- Analyzed logs like a DevOps engineer
- Prepared for Linux interview questions

### Keep Practicing

- Use Git Bash daily instead of File Explorer
- Write shell scripts to automate your tasks
- Explore the other HitaVir Tech codelabs

### Share Your Achievement

Tell the world you completed this codelab. Every command you typed made you a better developer.

**Happy command-lining!**

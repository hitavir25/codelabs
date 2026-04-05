summary: Data Engineering Environment Setup on Windows 11
id: windows-de-setup
categories: Data Engineering, Setup
tags: windows, git, python, vscode, databricks, aws, pyspark, github
status: Published
authors: HitaVirTech
feedback link: https://github.com/hitavir25/codelabs/issues

# Data Engineering Environment Setup on Windows 11
## Overview
Duration: 5:00

Welcome to **HitaVirTech Batch 5**! This codelab walks you through setting up a complete Data Engineering development environment on **Windows 11** from scratch.

### What You'll Install

| Tool | Purpose |
|------|---------|
| Windows Terminal | Modern terminal experience |
| Git & Git Bash | Version control & Unix shell on Windows |
| Python 3.11 | Core scripting & PySpark |
| VS Code | Primary IDE |
| Java 11 (JDK) | Required for PySpark / Spark |
| Apache Spark | Local Spark for PySpark development |
| GitHub Account | Cloud version control & collaboration |
| Databricks CLI | Connect to Databricks workspace |
| Docker Desktop | Containerized environments |

### Prerequisites

- Windows 11 (64-bit) with admin rights
- At least **16 GB RAM** (8 GB minimum)
- At least **50 GB** free disk space
- Stable internet connection
- A valid email address (for GitHub account)

## Install Windows Terminal
Duration: 3:00

**Windows Terminal** gives you a modern, tabbed terminal with Git Bash, PowerShell, and CMD all in one place.

### Step 1 - Open Microsoft Store

Press `Win + S`, type **Microsoft Store**, and open it.

### Step 2 - Search and Install

Search for **Windows Terminal** and click **Install**.

Alternatively, open **PowerShell as Administrator** and run:

```powershell
winget install Microsoft.WindowsTerminal
```

### Step 3 - Set as Default Terminal

1. Open Windows Terminal
2. Click the **dropdown arrow** next to the + tab button
3. Go to **Settings > Startup**
4. Set **Default terminal application** to **Windows Terminal**
5. Click **Save**

### Verify

```powershell
wt --version
# Windows Terminal v1.19.x
```

## Install Git & Git Bash
Duration: 5:00

Git is essential for version control. Git Bash gives you a Unix-like shell on Windows.

### Step 1 - Download Git

Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)

Download the **64-bit Windows installer** or use winget:

```powershell
winget install Git.Git
```

### Step 2 - Install with Recommended Settings

| Screen | Recommended Option |
|--------|-------------------|
| Default Editor | **Visual Studio Code** |
| Initial branch name | **main** |
| PATH environment | **Git from the command line and 3rd-party software** |
| Line endings | **Checkout Windows-style, commit Unix-style** |
| Terminal emulator | **Use MinTTY (Git Bash)** |
| Credential helper | **Git Credential Manager** |

### Step 3 - Configure Git Identity

Open **Git Bash** and run:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
git config --global core.autocrlf true
```

### Step 4 - Generate SSH Key for GitHub

```bash
ssh-keygen -t ed25519 -C "your@email.com"
# Press Enter to accept defaults

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key - paste this into GitHub later
cat ~/.ssh/id_ed25519.pub
```

### Verify

```bash
git --version
# git version 2.44.x.windows.1
```

## Install Python 3.11
Duration: 5:00

Python is the primary language for data engineering.

> **Important**: Use Python 3.11 for best PySpark compatibility. Avoid 3.12+.

### Step 1 - Download Python

Go to [https://www.python.org/downloads/](https://www.python.org/downloads/)

Download **Python 3.11.x** or use winget:

```powershell
winget install Python.Python.3.11
```

### Step 2 - Install Python

> **CRITICAL**: Check **Add Python to PATH** before clicking Install!

1. Run the installer
2. Tick **Add Python 3.11 to PATH**
3. Click **Install Now**

### Step 3 - Verify

Open a **new** Git Bash window:

```bash
python --version
# Python 3.11.x

pip --version
# pip 23.x from ...
```

### Step 4 - Install Data Engineering Packages

```bash
pip install --upgrade pip

pip install pyspark==3.5.1 pandas numpy pyarrow boto3 delta-spark jupyter black flake8 pytest
```

### Step 5 - Create Virtual Environment (Best Practice)

```bash
cd /c/hitavirtect_codelabs
python -m venv .venv
source .venv/Scripts/activate
# (.venv) prefix appears in terminal
```

## Install Java 11 JDK
Duration: 4:00

Apache Spark requires **Java 11**. Do NOT use Java 17+ as it has compatibility issues with Spark.

### Step 1 - Download JDK 11

Go to [https://adoptium.net/temurin/releases/?version=11](https://adoptium.net/temurin/releases/?version=11)

Select: Version **11 LTS**, OS **Windows**, Architecture **x64**, Package **JDK**

Or via winget:

```powershell
winget install EclipseAdoptium.Temurin.11.JDK
```

### Step 2 - Set JAVA_HOME (if not auto-set)

```powershell
# PowerShell as Administrator
[System.Environment]::SetEnvironmentVariable(
  "JAVA_HOME",
  "C:\Program Files\Eclipse Adoptium\jdk-11.x.x.x-hotspot",
  "Machine"
)
```

### Verify

```bash
java -version
# openjdk version "11.0.x"

echo $JAVA_HOME
# /c/Program Files/Eclipse Adoptium/jdk-11...
```

## Install Apache Spark (Local)
Duration: 6:00

### Step 1 - Download Spark 3.5.1

Go to [https://spark.apache.org/downloads.html](https://spark.apache.org/downloads.html)

Select: Spark **3.5.1**, Pre-built for **Hadoop 3.3**

### Step 2 - Extract Spark

```bash
mkdir -p /c/spark
mv ~/Downloads/spark-3.5.1-bin-hadoop3.tgz /c/spark/
cd /c/spark && tar -xzf spark-3.5.1-bin-hadoop3.tgz
ls spark-3.5.1-bin-hadoop3/
```

### Step 3 - Download winutils.exe (Windows-specific)

PySpark on Windows needs `winutils.exe` to work correctly:

```bash
mkdir -p /c/hadoop/bin
curl -L -o /c/hadoop/bin/winutils.exe \
  https://github.com/cdarlint/winutils/raw/master/hadoop-3.3.5/bin/winutils.exe
```

### Step 4 - Set Environment Variables

```powershell
# PowerShell as Administrator
[System.Environment]::SetEnvironmentVariable("SPARK_HOME", "C:\spark\spark-3.5.1-bin-hadoop3", "Machine")
[System.Environment]::SetEnvironmentVariable("HADOOP_HOME", "C:\hadoop", "Machine")
[System.Environment]::SetEnvironmentVariable("PYSPARK_PYTHON", "python", "Machine")

$path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
[System.Environment]::SetEnvironmentVariable("Path", $path + ";C:\spark\spark-3.5.1-bin-hadoop3\bin", "Machine")
```

### Step 5 - Verify PySpark

```bash
python -c "
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('Test').getOrCreate()
df = spark.createDataFrame([('Alice', 25), ('Bob', 30)], ['name', 'age'])
df.show()
spark.stop()
print('PySpark works!')"
```

Expected output:
```
+-----+---+
| name|age|
+-----+---+
|Alice| 25|
|  Bob| 30|
+-----+---+
PySpark works!
```

## Install VS Code
Duration: 4:00

### Step 1 - Download and Install

```powershell
winget install Microsoft.VisualStudioCode
```

Or download from [https://code.visualstudio.com/](https://code.visualstudio.com/)

During install, tick:
- Add **Open with Code** to Windows Explorer context menu
- Add to **PATH**

### Step 2 - Install Essential Extensions

```bash
code --install-extension ms-python.python
code --install-extension ms-python.black-formatter
code --install-extension databricks.databricks
code --install-extension amazonwebservices.aws-toolkit-vscode
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-toolsai.jupyter
code --install-extension eamodio.gitlens
code --install-extension redhat.vscode-yaml
```

### Step 3 - Configure Settings (JSON)

Press `Ctrl+Shift+P` > **Open User Settings (JSON)**:

```json
{
  "python.defaultInterpreterPath": "C:/hitavirtect_codelabs/.venv/Scripts/python.exe",
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "files.eol": "\n",
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "git.autofetch": true
}
```

### Verify
```bash
code --version
# 1.88.x
```

## Create a GitHub Account
Duration: 6:00

GitHub is the world's largest platform for hosting code, collaborating on projects, and managing your data engineering portfolio. You'll use GitHub to store codelabs, Databricks notebooks, and project code throughout this course.

### Step 1 - Go to GitHub

Open your browser and go to [https://github.com](https://github.com)

Click the **Sign up** button in the top-right corner.

### Step 2 - Enter Your Details

Fill in the registration form:

| Field | Guidance |
|-------|----------|
| **Email** | Use a professional email you check regularly |
| **Password** | Minimum 15 characters, or 8+ with a number and lowercase letter |
| **Username** | Choose a professional handle (e.g., `firstname-lastname`). This is public! |
| **Email preferences** | Optional — tick if you want product updates |

> **Tip**: Your GitHub username will appear in all your commit history and public repos. Choose something professional like `john-doe` or `jdoe-de` — not `coolgamer123`.

Click **Continue**.

### Step 3 - Solve the CAPTCHA Puzzle

GitHub shows a visual CAPTCHA. Follow the on-screen instructions to verify you are human, then click **Create account**.

### Step 4 - Verify Your Email

GitHub sends a **launch code** (8-digit number) to your email.

1. Open your email inbox
2. Find the email from **GitHub** with subject **"Your GitHub launch code"**
3. Copy the 8-digit code
4. Paste it into the GitHub verification page

### Step 5 - Personalise Your Account (Optional)

GitHub may ask a few onboarding questions:
- **How many people are on your team?** → Select **Just me**
- **Are you a student or teacher?** → Select as appropriate
- **What features are you interested in?** → Tick **Collaborative coding** and **CI/CD and automation**

Click **Continue** or **Skip personalisation**.

### Step 6 - Choose a Plan

Select **GitHub Free** — this is sufficient for all HitaVirTech coursework.

| Plan | Cost | What You Get |
|------|------|-------------|
| **Free** | $0/month | Unlimited public & private repos, 2000 CI/CD mins/month |
| Pro | $4/month | More CI/CD minutes, advanced insights |

> You do **NOT** need a paid plan for this course.

### Step 7 - Add Your SSH Key to GitHub

You generated an SSH key in the Git step. Now add it to GitHub so you can push/pull without a password.

1. Go to **GitHub > Profile icon (top-right) > Settings**
2. In the left sidebar click **SSH and GPG keys**
3. Click **New SSH key**
4. Fill in:
   - **Title**: `HitaVirTech-Laptop` (or any label)
   - **Key type**: `Authentication Key`
   - **Key**: Paste the output of `cat ~/.ssh/id_ed25519.pub` from Git Bash
5. Click **Add SSH key**
6. Confirm with your GitHub password if prompted

### Step 8 - Test SSH Connection

```bash
ssh -T git@github.com
# Hi your-username! You have successfully authenticated
```

### Step 9 - Create Your First Repository

1. Click the **+** icon (top-right) > **New repository**
2. Fill in:
   - **Repository name**: `hitavir-batch5`
   - **Description**: `HitaVirTech Batch 5 - Data Engineering Projects`
   - **Visibility**: Private
   - Tick **Add a README file**
3. Click **Create repository**

Then clone it locally:

```bash
cd /c/hitavirtect_codelabs
git clone git@github.com:your-username/hitavir-batch5.git
cd hitavir-batch5
ls
# README.md
```

### Step 10 - Configure Git with Your GitHub Identity

Make sure your local Git matches your GitHub account:

```bash
git config --global user.name "Your GitHub Display Name"
git config --global user.email "your-github-email@example.com"

# Verify
git config --list | grep user
# user.name=Your GitHub Display Name
# user.email=your-github-email@example.com
```

### GitHub Profile Best Practices

| Action | Why It Matters |
|--------|---------------|
| Add a profile photo | Makes you recognisable to collaborators |
| Write a bio | Shows your skills to potential employers |
| Pin your best repos | Highlights your data engineering work |
| Use README.md in repos | Documents your projects professionally |

## Install Databricks CLI
Duration: 4:00

### Step 1 - Install

```powershell
winget install Databricks.DatabricksCLI
```

Or via pip:
```bash
pip install databricks-cli
```

### Step 2 - Configure

```bash
databricks configure --token --profile hitavir-dev
# Databricks Host: https://adb-XXXXXXXXXX.azuredatabricks.net
# Token: dapiXXXXXXXXXXXXXXXX
```

Generate token: Databricks > **User Settings > Developer > Access Tokens > Generate New Token**

### Verify

```bash
databricks --version
# Databricks CLI v0.x.x

databricks clusters list --profile hitavir-dev
```

## Install Docker Desktop
Duration: 5:00

### Step 1 - Enable WSL2

```powershell
# PowerShell as Administrator - then restart PC
wsl --install
```

After restart:
```powershell
wsl --set-default-version 2
wsl --install -d Ubuntu-22.04
```

### Step 2 - Install Docker Desktop

Download from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

Install settings:
- Use **WSL 2** instead of Hyper-V
- Add shortcut to desktop

### Verify Docker

```bash
docker --version
# Docker version 26.x.x

docker run hello-world
# Hello from Docker!
```

### Test with PostgreSQL

```bash
docker run -d \
  --name pg-dev \
  -e POSTGRES_PASSWORD=hitavir123 \
  -e POSTGRES_DB=dataengineering \
  -p 5432:5432 \
  postgres:15

docker ps
```

## Final Verification Checklist
Duration: 3:00

Run this one-liner in **Git Bash** to check everything:

```bash
echo '=== HitaVirTech DE Environment Check ===' && \
echo "Git:        $(git --version)" && \
echo "Python:     $(python --version)" && \
echo "PySpark:    $(python -c 'import pyspark; print(pyspark.__version__)')" && \
echo "Java:       $(java -version 2>&1 | head -1)" && \
echo "Docker:     $(docker --version)" && \
echo "VS Code:    $(code --version | head -1)" && \
echo "GitHub SSH: $(ssh -T git@github.com 2>&1 | head -1)" && \
echo '======================================='
```

### Expected Output

```
=== HitaVirTech DE Environment Check ===
Git:        git version 2.44.0.windows.1
Python:     Python 3.11.9
PySpark:    3.5.1
Java:       openjdk version "11.0.23"
Docker:     Docker version 26.x.x
VS Code:    1.88.x
GitHub SSH: Hi your-username! You have successfully authenticated
=======================================
```

### Troubleshooting

| Issue | Fix |
|-------|-----|
| `python not found` | Reinstall Python with **Add to PATH** ticked |
| PySpark Java error | Ensure JAVA_HOME points to JDK 11 exactly |
| `winutils.exe` error | Check HADOOP_HOME is set correctly |
| Docker won't start | Enable Virtualization in BIOS |
| SSH auth failed | Re-run `ssh-add ~/.ssh/id_ed25519` in Git Bash |
| GitHub push denied | Check SSH key is added to GitHub Settings |

## Congratulations!
Duration: 1:00

You have successfully set up a complete **Data Engineering environment** on Windows 11!

### What You Installed

- Windows Terminal
- Git & Git Bash
- Python 3.11 + PySpark 3.5.1 + Data Engineering packages
- Java 11 JDK (Temurin / Eclipse Adoptium)
- Apache Spark 3.5.1 (local)
- VS Code + Databricks + AWS + Python extensions
- GitHub Account (with SSH key and first repo)
- Databricks CLI
- Docker Desktop + WSL2 + Ubuntu 22.04

### Next Steps

- **Codelab 2**: Your first PySpark DataFrame transformations
- **Codelab 3**: Medallion Architecture with Delta Lake on Databricks
- **Codelab 4**: Connecting to AWS S3 and Glue from PySpark
- **Codelab 5**: Databricks Unity Catalog hands-on

### Resources

- [HitaVirTech Codelabs](https://hitavir25.github.io/codelabs/)
- [HitaVirTech GitHub](https://github.com/hitavir25)
- [GitHub Docs](https://docs.github.com)
- [Databricks Documentation](https://docs.databricks.com)
- [PySpark Documentation](https://spark.apache.org/docs/latest/api/python/)

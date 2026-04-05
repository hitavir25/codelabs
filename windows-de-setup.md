summary: Data Engineering Environment Setup on Windows 11
id: windows-de-setup
categories: Data Engineering, Setup
tags: windows, git, python, vscode, databricks, aws, pyspark
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
| Git & Git Bash | Version control & Unix shell on Windows |
| Python 3.11 | Core scripting & PySpark |
| VS Code | Primary IDE |
| Java 11 (JDK) | Required for PySpark / Spark |
| Apache Spark | Local Spark for PySpark development |
| Databricks CLI | Connect to Databricks workspace |
| AWS CLI v2 | Connect to AWS services |
| Node.js 20 LTS | For codelabs tools & frontend work |
| claat | Google Codelabs authoring tool |
| Docker Desktop | Containerized environments |
| Windows Terminal | Modern terminal experience |

### Prerequisites

- Windows 11 (64-bit) with admin rights
- At least **16 GB RAM** (8 GB minimum)
- At least **50 GB** free disk space
- Stable internet connection

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

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

Go to **GitHub > Settings > SSH Keys > New SSH Key** and paste it.

### Verify

```bash
git --version
# git version 2.44.x.windows.1

ssh -T git@github.com
# Hi username! You have successfully authenticated
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

Apache Spark requires **Java 11**. Do NOT use Java 17+ (compatibility issues with Spark).

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

## Install AWS CLI v2
Duration: 4:00

### Step 1 - Install

```powershell
# PowerShell as Administrator
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi /quiet
```

### Step 2 - Configure AWS Profile

```bash
aws configure --profile hitavir-dev
# AWS Access Key ID: <your-access-key>
# AWS Secret Access Key: <your-secret-key>
# Default region name: ap-south-1
# Default output format: json
```

> **Security**: Never commit AWS keys to Git. They are safely stored in `~/.aws/credentials`.

### Verify

```bash
aws --version
# aws-cli/2.x.x

aws sts get-caller-identity --profile hitavir-dev
```

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
databricks clusters list --profile hitavir-dev
```

## Install Node.js and claat
Duration: 3:00

### Step 1 - Install Node.js LTS

```powershell
winget install OpenJS.NodeJS.LTS
```

### Verify Node.js

```bash
node --version   # v20.x.x
npm --version    # 10.x.x
```

### Install claat

Download `claat-windows-amd64.exe` from:
[https://github.com/googlecodelabs/tools/releases/latest](https://github.com/googlecodelabs/tools/releases/latest)

```powershell
# PowerShell as Administrator
Rename-Item "$env:USERPROFILE\Downloads\claat-windows-amd64.exe" "claat.exe"
Move-Item "$env:USERPROFILE\Downloads\claat.exe" "C:\Windows\System32\claat.exe"
```

```bash
claat --help   # verify it works
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
echo "AWS CLI:    $(aws --version)" && \
echo "Node.js:    $(node --version)" && \
echo "npm:        $(npm --version)" && \
echo "Docker:     $(docker --version)" && \
echo "VS Code:    $(code --version | head -1)" && \
echo '======================================='
```

### Expected Output

```
=== HitaVirTech DE Environment Check ===
Git:        git version 2.44.0.windows.1
Python:     Python 3.11.9
PySpark:    3.5.1
Java:       openjdk version "11.0.23"
AWS CLI:    aws-cli/2.15.x
Node.js:    v20.12.x
npm:        10.5.x
Docker:     Docker version 26.x.x
VS Code:    1.88.x
=======================================
```

### Troubleshooting

| Issue | Fix |
|-------|-----|
| `python not found` | Reinstall Python with **Add to PATH** ticked |
| PySpark Java error | Ensure JAVA_HOME points to JDK 11 exactly |
| `winutils.exe` error | Check HADOOP_HOME is set correctly |
| `aws: command not found` | Restart terminal after AWS CLI install |
| Docker won't start | Enable Virtualization in BIOS |
| Git push fails | Run `ssh -T git@github.com` to test SSH key |

## Congratulations!
Duration: 1:00

You have successfully set up a complete **Data Engineering environment** on Windows 11!

### What You Installed

- Windows Terminal
- Git & Git Bash (with SSH key for GitHub)
- Python 3.11 + PySpark 3.5.1 + Data Engineering packages
- Java 11 JDK (Temurin / Eclipse Adoptium)
- Apache Spark 3.5.1 (local)
- VS Code + Databricks + AWS + Python extensions
- AWS CLI v2 (configured for ap-south-1)
- Databricks CLI
- Node.js 20 LTS + claat
- Docker Desktop + WSL2 + Ubuntu 22.04

### Next Steps

- **Codelab 2**: Your first PySpark DataFrame transformations
- **Codelab 3**: Medallion Architecture with Delta Lake on Databricks
- **Codelab 4**: Connecting to AWS S3 and Glue from PySpark
- **Codelab 5**: Databricks Unity Catalog hands-on

### Resources

- [HitaVirTech Codelabs](https://hitavir25.github.io/codelabs/)
- [HitaVirTech GitHub](https://github.com/hitavir25)
- [Databricks Documentation](https://docs.databricks.com)
- [PySpark Documentation](https://spark.apache.org/docs/latest/api/python/)
- [AWS Data Engineering](https://aws.amazon.com/big-data/)

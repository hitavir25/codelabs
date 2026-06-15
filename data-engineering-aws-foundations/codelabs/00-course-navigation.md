authors: HitaVirTech
summary: Set up your AWS account, IAM user, billing guardrails, and the AWS CLI, then confirm you can list S3.
id: hvt-de-aws-00-course-navigation
categories: aws,data-engineering,foundations
environments: Web
status: Published
feedback link: https://github.com/hitavirtech
analytics account:

# Course navigation: set up your AWS workbench

## Overview
Duration: 5:00

Welcome to **Data Engineering on AWS: Foundations**. This first codelab gets your
account ready so every later lab just works. You will not touch a data service yet.
Instead you will build a safe, cheap place to work and prove your tools are wired up.

You are about to become the first data engineer at **HitaVir Retail**, a fictional
online store. Across this track you will move one dataset through a data lake on
Amazon S3, from **raw to bronze to silver to gold**, and end with a real pipeline.

### What you'll build

- An AWS account with a non-root admin **IAM user** (IAM is AWS's identity and
  access service — it decides who can do what).
- A **billing alarm** and a **budget** so costs can never surprise you.
- A configured **AWS CLI** (the command-line tool that talks to AWS).
- Your first S3 bucket listing from the terminal.

### What you'll learn

- How to set up an AWS account the safe way, without working as root.
- How to put cost guardrails in place before you spend a cent.
- How to install and configure the AWS CLI.
- The conventions this track uses for region, naming, and tags.

### Prerequisites

- An email address and a payment card (account creation requires one; this track
  stays inside or very near the free tier).
- A terminal and basic comfort typing commands.

### Services used

IAM, AWS Budgets, Amazon CloudWatch billing alarms, Amazon S3, AWS CLI.

### Cost and time

- **Cost:** $0. Everything here is free.
- **Time:** about 45 minutes.

### The concept visual

Open the learning-path roadmap for the whole track. It shows all eight lessons as
one connected, color-coded journey so you always know where you are.

Visual: [`assets/00-learning-path.html`](../assets/00-learning-path.html)

## Conventions for the whole track
Duration: 3:00

Use these everywhere so your resources are easy to find and delete later.

- **Region:** `us-east-1` (N. Virginia). It has the broadest service and free-tier
  coverage. If you pick another region, use it consistently in every lab.
- **Naming:** everything starts with `hvt-retail-`.
- **Data lake bucket:** `hvt-retail-datalake-<your-account-id>`. S3 bucket names are
  global across all of AWS, so adding your account id keeps yours unique.
- **Tags:** tag everything with `project=hvt-retail` and `env=dev`. Tags are how you
  track cost and find resources at cleanup time.

Positive
: Write your chosen region and account id on a sticky note. You will paste them into
almost every command in this track.

## Create your AWS account
Duration: 8:00

If you already have an account you are happy to use, skip to the next step.

**Console path**

1. Go to [aws.amazon.com](https://aws.amazon.com) and choose **Create an AWS Account**.
2. Enter your email, a strong password, and an account name like `hvt-retail`.
3. Add billing details and verify your phone. Choose the **Basic (free)** support plan.
4. Sign in to the **AWS Management Console** as the root user.

Negative
: The email and password you just created are the **root user**. The root user can
do anything, including close the account and change billing. Never use it for daily
work, and never create access keys for it. You will make a safer user next.

## Turn on cost guardrails first
Duration: 8:00

Before any data service exists, give yourself a tripwire. This is the habit that
separates engineers who get a surprise bill from those who never do.

### Set a budget

**Console path**

1. In the console search bar, open **Billing and Cost Management**.
2. Choose **Budgets**, then **Create budget**.
3. Pick **Use a template**, then **Monthly cost budget**.
4. Set the amount to `5` USD and add your email for alerts.
5. Create the budget.

**AWS CLI**

You will have the CLI configured two steps from now. Once you do, the same budget
looks like this. Save it as `budget.json`:

```json
{
  "BudgetName": "hvt-retail-monthly",
  "BudgetLimit": { "Amount": "5", "Unit": "USD" },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}
```

```bash
aws budgets create-budget \
  --account-id <your-account-id> \
  --budget file://budget.json
```

### Add a billing alarm

A budget emails you on a schedule. A CloudWatch billing alarm fires the moment
estimated charges cross a line. Use both.

**Console path**

1. Open **CloudWatch**, switch the region selector to **US East (N. Virginia)**
   (billing metrics only live there).
2. Choose **Alarms**, then **Create alarm**, then **Select metric**.
3. Pick **Billing**, then **Total Estimated Charge**, then the `USD` metric.
4. Set the threshold to **greater than 5**, and send the alert to an email topic.

Positive
: Billing metrics are only published in `us-east-1`. If you cannot find the Billing
metric, you are looking in the wrong region, not missing a setting.

## Create a safe admin user with IAM
Duration: 7:00

You will work as an **IAM user** with admin rights, not as root.

**Console path**

1. Open **IAM**, choose **Users**, then **Create user**.
2. Name the user `hvt-admin`. Enable **console access**.
3. Attach the **AdministratorAccess** policy directly.
4. Create the user. On the next page, create an **access key** for
   **Command Line Interface (CLI)** use and download the `.csv`.

**AWS CLI**

You cannot use the CLI until it is configured, so create this user in the console.
After this track, real production access should be least-privilege, not full admin.
You will tighten exactly this kind of access in codelab 05.

Negative
: Your access key is a secret, like a password. Never paste it into code, a commit,
or a chat. If it ever leaks, deactivate it in IAM immediately.

## Install and configure the AWS CLI
Duration: 7:00

The AWS CLI lets you drive AWS from the terminal, which is how this track gives you
copy-paste commands alongside every console path.

**Install**

```bash
# macOS
brew install awscli

# Windows (PowerShell)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip && sudo ./aws/install
```

Confirm it installed:

```bash
aws --version
```

**Configure**

```bash
aws configure
```

Paste your access key id and secret access key from the `.csv`, set the region to
`us-east-1`, and set the output format to `json`.

Positive
: Run `aws configure` once and it writes `~/.aws/credentials` and `~/.aws/config`.
Every command in this track reads those files, so you never type keys again.

## Checkpoint: prove your tools work
Duration: 3:00

Confirm who you are and that you can reach S3.

```bash
aws sts get-caller-identity
```

You should see your account id and the `hvt-admin` user ARN. Note the account id;
you will use it in bucket names.

Now list your S3 buckets. A brand-new account has none, and an empty list is a
success here, not an error.

```bash
aws s3 ls
```

If that command returns with no error, your workbench is ready.

Positive
: This is your first validation checkpoint. Every lab in this track ends with one:
a concrete thing you can see (a query result, a file in S3, a log line) that proves
the step worked.

## Troubleshooting
Duration: 2:00

- **`Unable to locate credentials`** — `aws configure` did not finish or wrote to a
  different profile. Re-run it and confirm `~/.aws/credentials` exists.
- **`AccessDenied` on `get-caller-identity`** — the access key is deactivated or
  mistyped. Create a fresh key for `hvt-admin` in IAM and reconfigure.
- **`InvalidClientTokenId`** — the key id and secret do not match, often from a copy
  that grabbed a trailing space. Re-paste both carefully.
- **Billing metric missing in CloudWatch** — you are not in `us-east-1`. Switch the
  region selector.
- **CLI command not found after install** — open a new terminal so it picks up the
  updated path.

## Cleanup
Duration: 1:00

You created no billable resources in this codelab, so there is nothing to delete.
Keep the budget, the billing alarm, and the `hvt-admin` user. You will use them
through the whole track.

If you ever want to stop completely, deactivate the `hvt-admin` access key in IAM
and the account goes idle at zero cost.

## What's next
Duration: 1:00

Your account is safe, cheap, and wired up. Next you will learn what a data engineer
actually does, then get a quick win by uploading the HitaVir Retail raw data to S3.

Continue to **Codelab 01: What a data engineer does**.

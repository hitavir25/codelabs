"""
HitaVir Retail — Glue ETL: raw to bronze to silver.

Reads raw orders CSV from the data lake, lands a cleaned Parquet copy in
bronze, then produces a typed, deduped, partitioned silver table.

Run as a Glue job with a job parameter:  --BUCKET hvt-retail-datalake-<account-id>
"""

import sys

from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from pyspark.sql import functions as F

# --- Glue / Spark bootstrap -------------------------------------------------
args = getResolvedOptions(sys.argv, ["JOB_NAME", "BUCKET"])
bucket = args["BUCKET"]

sc = SparkContext()
glue_context = GlueContext(sc)
spark = glue_context.spark_session
job = Job(glue_context)
job.init(args["JOB_NAME"], args)

raw_path = f"s3://{bucket}/raw/orders.csv"
bronze_path = f"s3://{bucket}/bronze/orders/"
silver_path = f"s3://{bucket}/silver/orders/"

# --- raw to bronze: read CSV with header, land an as-is Parquet copy --------
raw = spark.read.option("header", "true").csv(raw_path)
raw.write.mode("overwrite").parquet(bronze_path)

# --- bronze to silver: cast types, drop dupes, drop null keys ---------------
silver = (
    spark.read.parquet(bronze_path)
    .withColumn("order_date", F.to_date("order_date"))
    .withColumn("quantity", F.col("quantity").cast("int"))
    .withColumn("unit_price", F.col("unit_price").cast("double"))
    .withColumn("amount", F.col("amount").cast("double"))
    # dedup: keep one row per order_id
    .dropDuplicates(["order_id"])
    # drop rows missing a join/partition key
    .dropna(subset=["order_id", "region", "order_date"])
)

# write silver as Parquet partitioned by region and order_date
silver.write.mode("overwrite").partitionBy("region", "order_date").parquet(silver_path)

job.commit()

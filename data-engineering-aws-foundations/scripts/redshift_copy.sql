-- HitaVir Retail — Redshift Serverless: load and query the GOLD layer.
--
-- COPY = Redshift's bulk loader. It reads many files straight from S3 in
-- parallel and inserts them into a table far faster than row-by-row INSERTs.
--
-- Run these statements against your Redshift Serverless workgroup, either in
-- the Redshift query editor v2 or via the Redshift Data API
-- (aws redshift-data execute-statement — see the codelab).
--
-- Before running, replace:
--   <account-id>  with your AWS account id
--   <redshift-role-arn>  with the ARN of the IAM role that lets Redshift read S3
--     (e.g. arn:aws:iam::<account-id>:role/hvt-retail-redshift-role)

-- 1. Target table for the gold aggregate. Columns and types match the
--    Athena CTAS output in athena_gold_ctas.sql.
DROP TABLE IF EXISTS daily_region_sales;

CREATE TABLE daily_region_sales (
    region        VARCHAR(32),
    order_date    DATE,
    order_count   BIGINT,
    units_sold    BIGINT,
    revenue       DOUBLE PRECISION
);

-- 2. Bulk-load the gold Parquet from S3. FORMAT AS PARQUET makes Redshift
--    read the column names and types from the files themselves.
COPY daily_region_sales
FROM 's3://hvt-retail-datalake-<account-id>/gold/daily_region_sales/'
IAM_ROLE '<redshift-role-arn>'
FORMAT AS PARQUET;

-- 3. Confirm the load and answer the business question: revenue by region.
SELECT region, SUM(revenue) AS total_revenue
FROM daily_region_sales
GROUP BY region
ORDER BY total_revenue DESC;

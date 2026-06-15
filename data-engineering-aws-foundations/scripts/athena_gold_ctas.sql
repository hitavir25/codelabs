-- HitaVir Retail — Athena CTAS: build the GOLD layer from silver.
--
-- CTAS = "Create Table As Select". One statement both runs a query AND
-- writes its result to S3 as a new table, registered in the Glue catalog.
--
-- This builds gold.daily_region_sales: revenue per region per day for the
-- orders that actually count as sales (completed and shipped). It reads the
-- silver orders table and writes Parquet to s3://<bucket>/gold/daily_region_sales/.
--
-- Before running, replace <account-id> with your AWS account id. Run it in the
-- Athena query editor with hvt_retail_db selected as the database, or via
-- aws athena start-query-execution (see the codelab for the CLI form).

-- Safe to re-run: drop the table definition first, then recreate it.
-- (You must also delete the underlying S3 objects under gold/daily_region_sales/
--  before a re-run, because CTAS will not overwrite a non-empty location.)
DROP TABLE IF EXISTS hvt_retail_db.daily_region_sales;

CREATE TABLE hvt_retail_db.daily_region_sales
WITH (
  format = 'PARQUET',
  parquet_compression = 'SNAPPY',
  external_location = 's3://hvt-retail-datalake-<account-id>/gold/daily_region_sales/'
) AS
SELECT
    region,
    order_date,
    COUNT(order_id)        AS order_count,
    SUM(quantity)          AS units_sold,
    SUM(amount)            AS revenue
FROM hvt_retail_db.orders
WHERE status IN ('completed', 'shipped')
GROUP BY region, order_date;

-- Verify the gold table: revenue by region, highest first.
SELECT region, SUM(revenue) AS total_revenue
FROM hvt_retail_db.daily_region_sales
GROUP BY region
ORDER BY total_revenue DESC;

"""
HitaVir Retail — synthetic dataset generator.

Produces three logical tables for the "Data Engineering on AWS: Foundations"
track: products, customers, orders. Output is written as both CSV and JSON
so the labs can demonstrate schema inference over mixed formats.

Standard library only — no pip install needed. The seed is fixed, so every
learner regenerates the exact same data and gets the exact same query results.

Run:
    python generate_data.py
"""

import csv
import json
import random
from datetime import date, timedelta

SEED = 2026
N_PRODUCTS = 50
N_CUSTOMERS = 300
N_ORDERS = 3000
START_DATE = date(2026, 1, 1)
END_DATE = date(2026, 6, 30)

REGIONS = ["North", "South", "East", "West", "Central"]
CATEGORIES = ["Apparel", "Electronics", "Home", "Beauty", "Sports", "Books"]
ORDER_STATUS = ["completed", "completed", "completed", "shipped", "pending", "cancelled", "returned"]
FIRST_NAMES = ["Aarav", "Diya", "Kabir", "Anika", "Vivaan", "Sara", "Reyansh", "Myra",
               "Arjun", "Isha", "Vihaan", "Riya", "Aditya", "Neha", "Rohan", "Tara"]
LAST_NAMES = ["Sharma", "Patil", "Reddy", "Nair", "Iyer", "Gupta", "Kulkarni", "Desai",
              "Joshi", "Menon", "Bhat", "Rao", "Shah", "Pillai"]


def money(value):
    return round(value, 2)


def build_products(rng):
    products = []
    for i in range(1, N_PRODUCTS + 1):
        category = rng.choice(CATEGORIES)
        base = rng.uniform(5, 400)
        products.append({
            "product_id": f"P{i:04d}",
            "product_name": f"{category} Item {i:02d}",
            "category": category,
            "unit_price": money(base),
            "in_stock": rng.choice([True, True, True, False]),
        })
    return products


def build_customers(rng):
    customers = []
    for i in range(1, N_CUSTOMERS + 1):
        first = rng.choice(FIRST_NAMES)
        last = rng.choice(LAST_NAMES)
        signup = START_DATE - timedelta(days=rng.randint(0, 540))
        customers.append({
            "customer_id": f"C{i:05d}",
            "customer_name": f"{first} {last}",
            "email": f"{first.lower()}.{last.lower()}{i}@example.com",
            "region": rng.choice(REGIONS),
            "signup_date": signup.isoformat(),
            "loyalty_tier": rng.choice(["bronze", "silver", "gold"]),
        })
    return customers


def build_orders(rng, products, customers):
    span_days = (END_DATE - START_DATE).days
    orders = []
    for i in range(1, N_ORDERS + 1):
        product = rng.choice(products)
        customer = rng.choice(customers)
        order_day = START_DATE + timedelta(days=rng.randint(0, span_days))
        quantity = rng.randint(1, 6)
        orders.append({
            "order_id": f"O{i:06d}",
            "customer_id": customer["customer_id"],
            "product_id": product["product_id"],
            "order_date": order_day.isoformat(),
            "quantity": quantity,
            "unit_price": product["unit_price"],
            "amount": money(product["unit_price"] * quantity),
            "status": rng.choice(ORDER_STATUS),
            "region": customer["region"],
        })
    return orders


def write_csv(path, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def write_json(path, rows):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=2)


def main():
    rng = random.Random(SEED)
    products = build_products(rng)
    customers = build_customers(rng)
    orders = build_orders(rng, products, customers)

    write_csv("products.csv", products)
    write_csv("customers.csv", customers)
    write_csv("orders.csv", orders)
    write_json("orders.json", orders)

    revenue = sum(o["amount"] for o in orders if o["status"] in ("completed", "shipped"))
    print(f"products:  {len(products):>5}  -> products.csv")
    print(f"customers: {len(customers):>5}  -> customers.csv")
    print(f"orders:    {len(orders):>5}  -> orders.csv, orders.json")
    print(f"recognised revenue (completed + shipped): {revenue:,.2f}")


if __name__ == "__main__":
    main()

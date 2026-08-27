# Mock Database queries
def query_inventory(product_id=None):
    # Mock data
    inventory_db = {
        "P100": {"name": "Widget A", "stock": 150, "reorder_point": 100},
        "P101": {"name": "Widget B", "stock": 45, "reorder_point": 50},
        "P102": {"name": "Widget C", "stock": 10, "reorder_point": 20}
    }

    if product_id:
        return inventory_db.get(product_id, {"error": "Product not found"})
    return inventory_db

def query_sales_history(product_id):
    # Mock daily sales for the last 7 days
    sales_db = {
        "P100": [10, 12, 15, 14, 11, 13, 10],
        "P101": [5, 6, 8, 7, 5, 9, 6],
        "P102": [20, 22, 25, 30, 28, 24, 21]
    }
    return sales_db.get(product_id, [])

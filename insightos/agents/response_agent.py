class ResponseAgent:
    def __init__(self):
        pass

    def generate(self, reasoned_output):
        intent = reasoned_output.get("intent")
        product_id = reasoned_output.get("product_id")

        # Format strings
        finding = ""
        insight = reasoned_output.get("insight", "No insight generated.")
        action = ""

        # Extract basic finding
        if intent in ["STOCKOUT_RISK", "REORDER_QUANTITY"]:
            inv = reasoned_output.get("raw_results", {}).get("query_inventory", {})
            fcst = reasoned_output.get("raw_results", {}).get("forecast_demand", {})

            if "error" not in inv:
                finding = f"Product {product_id} ({inv.get('name')}) currently has {inv.get('stock')} units in stock."
            else:
                finding = f"Could not find inventory data for {product_id}."

            reorder_qty = reasoned_output.get("suggested_reorder", 0)
            if reorder_qty > 0:
                action = f"Initiate PO for {reorder_qty} units of {product_id} immediately to prevent stockout."
            else:
                action = f"No immediate action required for {product_id}."

        elif intent == "DEMAND_FORECAST":
            fcst = reasoned_output.get("raw_results", {}).get("forecast_demand", {})
            finding = f"Forecast generated for {product_id} over {fcst.get('forecast_days')} days."
            action = "Use forecast to inform upcoming production planning."

        elif intent == "WHAT_IF":
            inv = reasoned_output.get("raw_results", {}).get("query_inventory", {})
            if "error" not in inv:
                finding = f"Simulated demand scenario for {product_id} ({inv.get('name')})."
            else:
                finding = f"Could not find inventory data for {product_id}."

            reorder_qty = reasoned_output.get("suggested_reorder", 0)
            if reorder_qty > 0:
                action = f"In this scenario, you would need to order {reorder_qty} units."
            else:
                action = "In this scenario, current stock is still sufficient."

        else:
             finding = "Query recognized but no specific flow executed."
             insight = "General inventory scan."
             action = "Review system logs."

        conf = reasoned_output.get("confidence_score", 0.0)

        # Final Formatting
        response = f"""
=========================================
InsightOS Executive Summary
=========================================
**Finding**: {finding}
**Insight**: {insight}
**Recommended Action**: {action}
**Confidence**: {conf*100:.1f}%
=========================================
"""
        return response

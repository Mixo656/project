from insightos.tools.risk_calculator import calculate_stockout_risk, recommend_reorder_quantity

class ReasoningAgent:
    def __init__(self):
        pass

    def synthesize(self, intent_data, tool_results):
        intent = intent_data.get('intent')
        product_id = intent_data.get('entities', {}).get('product_id', 'Unknown')

        reasoned_output = {
            "intent": intent,
            "product_id": product_id,
            "raw_results": tool_results
        }

        # Apply specific reasoning based on intent
        if intent == "STOCKOUT_RISK" or intent == "REORDER_QUANTITY":
            inventory_data = tool_results.get("query_inventory", {})
            forecast_data = tool_results.get("forecast_demand", {})

            if "error" not in inventory_data and "error" not in forecast_data:
                current_stock = inventory_data.get("stock", 0)
                reorder_point = inventory_data.get("reorder_point", 0)
                total_forecast = forecast_data.get("total_forecast", 0)

                # 1. Calculate Risk
                risk_info = calculate_stockout_risk(current_stock, total_forecast)
                reasoned_output["risk_level"] = risk_info["risk_level"]
                reasoned_output["confidence_score"] = risk_info["confidence_score"]

                # 2. Calculate Reorder Qty
                reorder_qty = recommend_reorder_quantity(current_stock, total_forecast, reorder_point)
                reasoned_output["suggested_reorder"] = reorder_qty

                # 3. Generate Insight (Rule-based)
                if risk_info["risk_level"] == "High":
                    reasoned_output["insight"] = f"Current stock ({current_stock}) is insufficient to meet projected demand ({total_forecast}) over the forecast period."
                elif risk_info["risk_level"] == "Medium":
                    reasoned_output["insight"] = f"Stock ({current_stock}) will just meet demand ({total_forecast}). Monitor closely."
                else:
                    reasoned_output["insight"] = f"Healthy stock levels ({current_stock}) against expected demand ({total_forecast})."
            else:
                 reasoned_output["insight"] = "Could not generate insights due to missing data."

        elif intent == "DEMAND_FORECAST":
             forecast_data = tool_results.get("forecast_demand", {})
             if "error" not in forecast_data:
                 total = forecast_data.get("total_forecast", 0)
                 days = forecast_data.get("forecast_days", 0)
                 reasoned_output["insight"] = f"Expected demand is {total} units over the next {days} days."
                 reasoned_output["suggested_reorder"] = None
                 reasoned_output["confidence_score"] = 0.85 # Mocked ML confidence

        elif intent == "WHAT_IF":
            inventory_data = tool_results.get("query_inventory", {})
            forecast_data = tool_results.get("forecast_demand", {})
            percentage = intent_data.get('entities', {}).get('percentage', 0)

            if "error" not in inventory_data and "error" not in forecast_data:
                current_stock = inventory_data.get("stock", 0)
                reorder_point = inventory_data.get("reorder_point", 0)
                original_forecast = forecast_data.get("total_forecast", 0)

                # Apply what-if multiplier
                adjusted_forecast = int(original_forecast * (1 + (percentage / 100.0)))
                reasoned_output["adjusted_forecast"] = adjusted_forecast

                # Recalculate risk and reorder
                risk_info = calculate_stockout_risk(current_stock, adjusted_forecast)
                reasoned_output["risk_level"] = risk_info["risk_level"]
                reasoned_output["confidence_score"] = 0.70 # Lower confidence for what-if scenarios

                reorder_qty = recommend_reorder_quantity(current_stock, adjusted_forecast, reorder_point)
                reasoned_output["suggested_reorder"] = reorder_qty

                reasoned_output["insight"] = f"If demand changes by {percentage}%, projected demand becomes {adjusted_forecast}. Risk level shifts to {risk_info['risk_level']}."
            else:
                 reasoned_output["insight"] = "Could not generate what-if insights due to missing data."

        return reasoned_output

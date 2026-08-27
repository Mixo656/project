def calculate_stockout_risk(current_stock, forecast_demand):
    # Rule-based reasoning for risk calculation
    if current_stock >= forecast_demand * 1.5:
        risk_level = "Low"
        confidence = 0.95
    elif current_stock >= forecast_demand:
        risk_level = "Medium"
        confidence = 0.85
    else:
        risk_level = "High"
        confidence = 0.90

    return {
        "risk_level": risk_level,
        "confidence_score": confidence
    }

def recommend_reorder_quantity(current_stock, forecast_demand, reorder_point, lead_time_days=3):
    # Simple EOQ or Min-Max logic
    # Reorder if stock is expected to fall below reorder_point during lead time

    # Very simplified logic for demonstration:
    target_stock = forecast_demand * 2 # Keep enough for 2x the forecast period

    if current_stock < reorder_point or current_stock < forecast_demand:
        suggested_qty = target_stock - current_stock
        return max(0, suggested_qty)

    return 0

import numpy as np

def forecast_demand(product_id, days=7):
    # In a real system, this would load a trained model (e.g., XGBoost, Prophet, LSTM)
    # from insightos/models/ and generate a prediction.
    # For now, we mock the prediction based on the product.

    print(f"[Forecaster Tool] Predicting demand for {product_id} over next {days} days...")

    # Mock base daily demand
    base_demand = {
        "P100": 12,
        "P101": 7,
        "P102": 25
    }

    daily_avg = base_demand.get(product_id, 10)

    # Generate some simple variation (e.g., trend or seasonality)
    # We use a deterministic mock for simplicity.
    predictions = [int(daily_avg * (1 + 0.1 * np.sin(i))) for i in range(days)]
    total_forecast = sum(predictions)

    return {
        "product_id": product_id,
        "forecast_days": days,
        "daily_predictions": predictions,
        "total_forecast": total_forecast
    }

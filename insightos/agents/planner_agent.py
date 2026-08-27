class PlannerAgent:
    def __init__(self):
        pass

    def create_plan(self, intent_data):
        intent = intent_data.get('intent')
        entities = intent_data.get('entities', {})
        product_id = entities.get('product_id', 'P100') # Default for demo

        plan = []

        if intent == "STOCKOUT_RISK":
            plan = [
                {"tool": "query_inventory", "params": {"product_id": product_id}},
                {"tool": "forecast_demand", "params": {"product_id": product_id, "days": 7}}
            ]
        elif intent == "DEMAND_FORECAST":
            plan = [
                {"tool": "forecast_demand", "params": {"product_id": product_id, "days": 14}}
            ]
        elif intent == "REORDER_QUANTITY":
            plan = [
                {"tool": "query_inventory", "params": {"product_id": product_id}},
                {"tool": "forecast_demand", "params": {"product_id": product_id, "days": 14}}
            ]
        elif intent == "WHAT_IF":
            plan = [
                {"tool": "query_inventory", "params": {"product_id": product_id}},
                {"tool": "forecast_demand", "params": {"product_id": product_id, "days": 14}}
            ]
        else:
            plan = [
                {"tool": "query_inventory", "params": {}} # Just list inventory
            ]

        return plan

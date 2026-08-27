from insightos.core.memory import Memory
from insightos.core.orchestrator import AgentOrchestrator
from insightos.agents.intent_agent import IntentAgent
from insightos.agents.planner_agent import PlannerAgent
from insightos.agents.reasoning_agent import ReasoningAgent
from insightos.agents.response_agent import ResponseAgent

# Tools
from insightos.tools.database import query_inventory, query_sales_history
from insightos.tools.forecaster import forecast_demand

def main():
    print("Initializing InsightOS Agentic System...")

    # Initialize Core Components
    memory = Memory()

    # Initialize Agents
    intent_agent = IntentAgent()
    planner_agent = PlannerAgent()
    reasoning_agent = ReasoningAgent()
    response_agent = ResponseAgent()

    # Register Tools
    tools_registry = {
        "query_inventory": query_inventory,
        "query_sales_history": query_sales_history,
        "forecast_demand": forecast_demand
    }

    # Initialize Orchestrator
    orchestrator = AgentOrchestrator(
        intent_agent=intent_agent,
        planner_agent=planner_agent,
        tools=tools_registry,
        reasoning_agent=reasoning_agent,
        response_agent=response_agent,
        memory=memory
    )

    # Example Questions
    questions = [
        "What is the stockout risk for P100?",
        "Forecast demand for P101.",
        "How much P102 should I reorder?",
        "What if demand for P100 increases by 50%?",
    ]

    print("\nStarting System Demonstration...")
    for q in questions:
        print("\n" + "="*50)
        print(f"User Question: {q}")
        print("="*50)

        response = orchestrator.process_query(q)
        print(response)

if __name__ == "__main__":
    main()

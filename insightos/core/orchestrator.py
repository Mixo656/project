class AgentOrchestrator:
    def __init__(self, intent_agent, planner_agent, tools, reasoning_agent, response_agent, memory):
        self.intent_agent = intent_agent
        self.planner_agent = planner_agent
        self.tools = tools
        self.reasoning_agent = reasoning_agent
        self.response_agent = response_agent
        self.memory = memory

    def process_query(self, user_query):
        print(f"\n[Orchestrator] Processing Query: '{user_query}'")

        # 1. Intent Classification
        intent = self.intent_agent.classify(user_query)
        print(f"[Orchestrator] Detected Intent: {intent}")

        # 2. Planner Agent decides which tools to use
        plan = self.planner_agent.create_plan(intent)
        print(f"[Orchestrator] Generated Plan: {plan}")

        # 3. Execute tools
        tool_results = {}
        for step in plan:
            tool_name = step['tool']
            params = step.get('params', {})
            print(f"[Orchestrator] Executing Tool: {tool_name} with params: {params}")

            if tool_name in self.tools:
                try:
                    result = self.tools[tool_name](**params)
                    tool_results[tool_name] = result
                    print(f"[Orchestrator] Tool Result ({tool_name}): {result}")
                except Exception as e:
                    print(f"[Orchestrator] Tool Error ({tool_name}): {e}")
                    tool_results[tool_name] = {"error": str(e)}
            else:
                print(f"[Orchestrator] Tool {tool_name} not found!")

        # 4. Reasoning Agent synthesizes results
        print(f"[Orchestrator] Reasoning over results...")
        reasoned_output = self.reasoning_agent.synthesize(intent, tool_results)

        # 5. Response Agent formats the final output
        print(f"[Orchestrator] Generating final response...")
        final_response = self.response_agent.generate(reasoned_output)

        # Store in memory
        self.memory.add_interaction(user_query, final_response)

        return final_response

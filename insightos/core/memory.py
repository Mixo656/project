class Memory:
    def __init__(self):
        self.history = []

    def add_interaction(self, user_query, system_response):
        self.history.append({
            "user_query": user_query,
            "system_response": system_response
        })

    def get_history(self):
        return self.history

    def get_recent_context(self, k=3):
        return self.history[-k:]

    def clear(self):
        self.history = []

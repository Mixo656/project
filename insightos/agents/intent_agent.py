import os
import joblib

class IntentAgent:
    def __init__(self, model_path="insightos/models/intent_model.pkl", vectorizer_path="insightos/models/tfidf_vectorizer.pkl"):
        self.model_path = model_path
        self.vectorizer_path = vectorizer_path
        self.model = None
        self.vectorizer = None

        # Try loading the trained model; otherwise fallback to simple rules for testing.
        if os.path.exists(model_path) and os.path.exists(vectorizer_path):
            try:
                self.model = joblib.load(model_path)
                self.vectorizer = joblib.load(vectorizer_path)
                print("[IntentAgent] Loaded ML model successfully.")
            except Exception as e:
                print(f"[IntentAgent] Error loading model: {e}")
        else:
            print("[IntentAgent] Model files not found. Using fallback rule-based classifier.")

    def classify(self, text):
        # Clean text
        text_clean = text.lower()

        # Use ML model if available
        if self.model and self.vectorizer:
            X = self.vectorizer.transform([text_clean])
            prediction = self.model.predict(X)[0]
            confidence = max(self.model.predict_proba(X)[0])

            # Simple threshold for unconfident predictions
            if confidence < 0.3:
                return {"intent": "UNKNOWN", "confidence": confidence, "entities": self._extract_entities(text_clean)}

            return {"intent": prediction, "confidence": confidence, "entities": self._extract_entities(text_clean)}

        # Fallback to rules for demonstration
        if "what if" in text_clean or "increase by" in text_clean or "decrease by" in text_clean:
            return {"intent": "WHAT_IF", "confidence": 0.8, "entities": self._extract_entities(text_clean)}
        elif "stockout" in text_clean or "risk" in text_clean:
            return {"intent": "STOCKOUT_RISK", "confidence": 0.8, "entities": self._extract_entities(text_clean)}
        elif "forecast" in text_clean or "demand" in text_clean:
            return {"intent": "DEMAND_FORECAST", "confidence": 0.8, "entities": self._extract_entities(text_clean)}
        elif "reorder" in text_clean or "buy" in text_clean:
            return {"intent": "REORDER_QUANTITY", "confidence": 0.8, "entities": self._extract_entities(text_clean)}
        else:
            return {"intent": "UNKNOWN", "confidence": 0.0, "entities": {}}

    def _extract_entities(self, text):
        # Very simple regex/rule-based entity extraction
        # e.g., looks for P100, P101, etc.
        import re
        product_matches = re.findall(r'p\d{3}', text)
        percentage_matches = re.findall(r'(\d+)%', text)

        entities = {}
        if product_matches:
            entities['product_id'] = product_matches[0].upper()
        if percentage_matches:
            entities['percentage'] = int(percentage_matches[0])
            if "decrease" in text:
                entities['percentage'] = -entities['percentage']

        return entities

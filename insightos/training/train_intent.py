import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

def train_intent_model():
    print("Training Intent Classification Model...")

    # Tiny sample dataset
    data = [
        ("Will we run out of P100 soon?", "STOCKOUT_RISK"),
        ("What is the stockout risk for P101?", "STOCKOUT_RISK"),
        ("Are we going to face a shortage of P102?", "STOCKOUT_RISK"),
        ("What is the expected demand for P100 next week?", "DEMAND_FORECAST"),
        ("Forecast sales for P101 for the next 14 days.", "DEMAND_FORECAST"),
        ("How many P102 will we sell?", "DEMAND_FORECAST"),
        ("How much P100 should I buy?", "REORDER_QUANTITY"),
        ("Calculate reorder quantity for P101.", "REORDER_QUANTITY"),
        ("Do I need to restock P102?", "REORDER_QUANTITY"),
        ("What if demand for P100 increases by 50%?", "WHAT_IF"),
        ("What if demand for P101 decreases by 20%?", "WHAT_IF"),
    ]

    texts = [item[0] for item in data]
    labels = [item[1] for item in data]

    # Create and train pipeline
    vectorizer = TfidfVectorizer()
    clf = LogisticRegression(random_state=42)

    X_train = vectorizer.fit_transform(texts)
    clf.fit(X_train, labels)

    print("Training complete. Saving models...")

    os.makedirs("insightos/models", exist_ok=True)
    joblib.dump(vectorizer, "insightos/models/tfidf_vectorizer.pkl")
    joblib.dump(clf, "insightos/models/intent_model.pkl")

    print("Models saved to insightos/models/")

if __name__ == "__main__":
    train_intent_model()

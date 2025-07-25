from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import matplotlib.pyplot as plt
from collections import deque
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS here

# Simulated database of citizen feedback
feedback_db = deque(maxlen=100)
sentiment_trend = []

# Route for citizens to submit feedback
@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    feedback = data.get("feedback", "")
    if not feedback:
        return jsonify({"error": "Feedback is required"}), 400

    sentiment = TextBlob(feedback).sentiment.polarity
    feedback_db.append(sentiment)
    update_trend(sentiment)
    
    return jsonify({"sentiment": sentiment, "message": "Thank you for your feedback."})

# Route for policy makers to view current sentiment
@app.route('/policy_dashboard', methods=['GET'])
def policy_dashboard():
    average_sentiment = sum(feedback_db) / len(feedback_db) if feedback_db else 0
    policy_suggestion = "Continue as planned" if average_sentiment >= 0 else "Consider revising policy"
    
    return jsonify({
        "average_sentiment": round(average_sentiment, 3),
        "feedback_count": len(feedback_db),
        "recommendation": policy_suggestion
    })

# Function to update sentiment trend graph
def update_trend(new_sentiment):
    sentiment_trend.append(new_sentiment)
    if len(sentiment_trend) % 10 == 0:
        plt.plot(sentiment_trend)
        plt.title("Citizen Sentiment Over Time")
        plt.xlabel("Feedback submissions")
        plt.ylabel("Sentiment (-1 to 1)")
        plt.savefig("sentiment_trend.png")
        plt.clf()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

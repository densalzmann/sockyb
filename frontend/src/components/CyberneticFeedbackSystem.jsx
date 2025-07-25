import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);


const CyberneticFeedbackSystem = () => {
  const [feedback, setFeedback] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [sentimentTrend, setSentimentTrend] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitFeedback = async () => {
    if (!feedback) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/submit_feedback", { feedback });
      alert(res.data.message);
      setFeedback("");
      fetchDashboard();
    } catch (err) {
      alert("Error submitting feedback");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/policy_dashboard");
      setDashboard(res.data);
      setSentimentTrend((prev) => [...prev, res.data.average_sentiment]);
    } catch (err) {
      console.error("Dashboard fetch failed");
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 grid gap-4">
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Citizen Feedback</h2>
          <Input
            placeholder="Enter your opinion on the proposed policy..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mb-2"
          />
          <Button onClick={submitFeedback} disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Policy Dashboard</h2>
          {dashboard ? (
            <div>
              <p>Average Sentiment: {dashboard.average_sentiment}</p>
              <p>Feedback Count: {dashboard.feedback_count}</p>
              <p className="font-bold">Recommendation: {dashboard.recommendation}</p>
            </div>
          ) : (
            <p>Loading dashboard...</p>
          )}
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Sentiment Trend</h2>
          <Line
            data={{
              labels: sentimentTrend.map((_, i) => i + 1),
              datasets: [
                {
                  label: "Average Sentiment",
                  data: sentimentTrend,
                  fill: false,
                  tension: 0.1,
                },
              ],
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CyberneticFeedbackSystem;
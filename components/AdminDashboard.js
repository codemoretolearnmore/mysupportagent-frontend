import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({ accuracy: [], confidence: [], apiUsage: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load metrics');
        setLoading(false);
      });
  }, []);

  /**
   * Handles model retraining trigger.
   */
  const handleRetrain = async () => {
    try {
      await fetch('/api/retrain', { method: 'POST' });
      alert('Model retraining initiated');
    } catch {
      alert('Failed to trigger retraining');
    }
  };

  if (loading) return <p>Loading metrics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Accuracy Trend</h3>
        <Bar data={{
          labels: metrics.accuracy.map((_, i) => `Week ${i + 1}`),
          datasets: [{ label: 'Accuracy', data: metrics.accuracy, backgroundColor: 'blue' }]
        }} />
      </div>
      <div className="mb-6">
        <h3 className="font-semibold">API Usage</h3>
        <Bar data={{
          labels: metrics.apiUsage.map((_, i) => `Day ${i + 1}`),
          datasets: [{ label: 'API Calls', data: metrics.apiUsage, backgroundColor: 'green' }]
        }} />
      </div>
      <button
        onClick={handleRetrain}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Retrain Model
      </button>
    </div>
  );
}
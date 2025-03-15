import AdminDashboard from '../components/AdminDashboard';

/**
 * Dashboard Page
 * Displays admin analytics and model retraining options.
 */
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
}
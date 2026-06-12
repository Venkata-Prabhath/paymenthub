import Navbar from "../components/Navbar";

function Dashboard() {
  // FIX: Fetch "name" from localStorage instead of "email"
  const name = localStorage.getItem("name") || "User";

  return (
    <div>
      <Navbar />
      <main className="dashboard-layout">
        <div className="welcome-hero">
          <h1>PaymentHub Dashboard</h1>
          {/* Now correctly prints the stored name string */}
          <p>Welcome back, <strong>{name}</strong></p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Account Security</h2>
            <p style={{ marginTop: '0.5rem' }}>Your digital wallet connection is encrypted with live backend verification structures.</p>
          </div>
          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <p style={{ marginTop: '0.5rem' }}>Navigate to the tabs above to add funds, process external bank transfers, or inspect your history statements.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
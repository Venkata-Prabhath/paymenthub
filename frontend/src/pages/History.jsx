import { useState } from "react";
import Navbar from "../components/Navbar";

function History() {
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "http://localhost:8081"; // Pointing to your Spring Boot app port

  const fetchHistory = async () => {
    if (!email) {
      alert("Please enter an email address to search.");
      return;
    }

    setLoading(true);

    try {
      // Endpoint matches your backend route: /transaction/history?email=...
      const response = await fetch(`${BACKEND_URL}/transaction/history?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        // Spring Data Page object wraps the array inside the 'content' field
        if (data && data.content) {
          setTransactions(data.content);
        } else {
          setTransactions([]);
        }
      } else {
        alert("Failed to fetch transaction history.");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("Server error. Could not connect to the network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="dashboard-layout">
        <h1>Transaction History</h1>
        
        <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
          <h2>Search Statements</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input 
              placeholder="Search by account email..." 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ margin: 0 }}
            />
            <button 
              onClick={fetchHistory} 
              disabled={loading}
              style={{ width: 'auto', padding: '0.75rem 2rem' }}
            >
              {loading ? "Fetching..." : "Fetch"}
            </button>
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Sender Account</th>
                <th>Receiver Account</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    No historical data loaded. Enter an account email above.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr key={tx.id || idx}>
                    {/* Updated fields to match your Spring Boot entity variables */}
                    <td>{tx.senderEmail}</td>
                    <td>{tx.receiverEmail}</td>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                      ${parseFloat(tx.amount).toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${tx.status?.toLowerCase() === 'success' ? 'success' : 'failed'}`}>
                        {tx.status || "COMPLETED"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default History;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const response = await api.get("/admin/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to load transactions", error);
    }
  };

  const blockUser = async (id) => {
    try {
      await api.put(`/admin/block/${id}`);
      loadUsers(); // Refresh user list after blocking
    } catch (error) {
      alert("Failed to block user");
    }
  };

  useEffect(() => {
    /* SECURITY GATEKEEPER
       Verifies if the current session role is 'admin'.
       If a regular client manually types /admin, they get bounced out instantly.
    */
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/dashboard");
      return;
    }

    loadUsers();
    loadTransactions();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      
      <main className="dashboard-layout">
        <div className="welcome-hero" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
          <h1>Admin Dashboard</h1>
          <p>Global PaymentHub Management Oversight</p>
        </div>

        <div className="dashboard-grid">
          
          {/* Users Management Section */}
          <div className="dashboard-card">
            <h2>Users Management</h2>
            <table>
              <thead>
                <tr>
                  <th>User Identity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div style={{ fontWeight: '600' }}>{user.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</div>
                      </td>
                      <td>
                        <button 
                          onClick={() => blockUser(user.id)} 
                          className="logout-btn" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Global Transactions Section */}
          <div className="dashboard-card">
            <h2>System Transactions</h2>
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No transactions recorded.</td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>
                          <strong>From:</strong> {t.senderEmail}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <strong>To:</strong> {t.receiverEmail}
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', color: 'var(--primary)', verticalAlign: 'middle' }}>
                        ₹{t.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
import { useState } from "react";
import Navbar from "../components/Navbar";

function Wallet() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(false);

  // Updated to point directly to your Spring Boot server
  const BACKEND_URL = "http://localhost:8081"; 

  // 1. Fetch balance
  const checkBalance = async () => {
    if (!email) {
      alert("Please enter an email address first.");
      return;
    }

    try {
      // Endpoint matches: /wallet/balance?email=...
      const response = await fetch(`${BACKEND_URL}/wallet/balance?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        // Your controller returns a direct raw number (BigDecimal)
        setBalance(parseFloat(data).toFixed(2));
      } else {
        alert("Failed to fetch balance");
      }
    } catch (error) {
      console.error("Error checking balance:", error);
      alert("Server error. Is your backend running?");
    }
  };

  // 2. Add money 
  const addMoney = async () => {
    if (!email || !amount) {
      alert("Please provide both email and amount.");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Please enter an amount greater than 0.");
      return;
    }

    setLoading(true);

    try {
      // Endpoint matches: /wallet/add-money?email=...
      // The amount is sent inside the JSON body to fulfill your AddMoneyRequest DTO
      const response = await fetch(`${BACKEND_URL}/wallet/add-money?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Successfully added $${amount}!`);
        // Your controller returns the updated total balance directly as a number
        setBalance(parseFloat(data).toFixed(2)); 
        setAmount(""); 
      } else {
        alert("Failed to add money");
      }
    } catch (error) {
      console.error("Error adding money:", error);
      alert("Server error. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="dashboard-layout">
        <h1>My Wallet</h1>
        <div className="dashboard-grid">
          
          {/* Balance Checker */}
          <div className="dashboard-card">
            <h2>Account Balance</h2>
            <input 
              placeholder="Confirm Account Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={checkBalance}>Check Balance</button>
            <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Current Balance:</p>
            <div className="balance-display">${balance}</div>
          </div>

          {/* Deposit Funds */}
          <div className="dashboard-card">
            <h2>Add Funds</h2>
            <input 
              type="number" 
              placeholder="Enter Amount ($)" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button 
              onClick={addMoney} 
              disabled={loading}
              style={{ backgroundColor: 'var(--success)', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Processing..." : "Add Money"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Wallet;
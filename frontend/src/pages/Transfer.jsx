import { useState } from "react";
import Navbar from "../components/Navbar";

function Transfer() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "http://localhost:8081"; // Pointing to your Spring Boot app port

  const handleTransfer = async () => {
    // 1. Validation checks before sending request
    if (!sender || !receiver || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Transfer amount must be greater than zero.");
      return;
    }

    if (sender.toLowerCase() === receiver.toLowerCase()) {
      alert("You cannot transfer money to yourself.");
      return;
    }

    setLoading(true);

    // 2. POST request to your exact backend route: /transaction/transfer
    try {
      const response = await fetch(`${BACKEND_URL}/transaction/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: sender,
          receiverEmail: receiver,
          amount: parseFloat(amount),
        }),
      });

      // Your controller returns a direct raw string response text (e.g. "Transfer successful")
      const data = await response.text();

      if (response.ok) {
        alert(data || "Transfer successful!");
        // Clear inputs on success
        setAmount("");
        setReceiver("");
      } else {
        alert(data || "Transfer failed.");
      }
    } catch (error) {
      console.error("Transfer connection error:", error);
      alert("Server error. Could not connect to the network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="dashboard-layout">
        <div className="centered-card-wrapper">
          <div className="dashboard-card">
            <h2>Transfer Money</h2>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Send instant funds securely across active user wallets.
            </p>
            
            <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
              Sender Account Email
            </label>
            <input 
              placeholder="your-email@example.com" 
              value={sender} 
              onChange={(e) => setSender(e.target.value)} 
            />

            <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>
              Receiver Account Email
            </label>
            <input 
              placeholder="recipient@example.com" 
              value={receiver} 
              onChange={(e) => setReceiver(e.target.value)} 
            />

            <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>
              Transfer Value ($)
            </label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />

            <button 
              onClick={handleTransfer} 
              disabled={loading}
              style={{ marginTop: '1.5rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Processing..." : "Initiate Transfer"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Transfer;
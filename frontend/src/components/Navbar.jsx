import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the role from localStorage
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
        <Link to="/wallet" className={isActive("/wallet")}>Wallet</Link>
        <Link to="/transfer" className={isActive("/transfer")}>Transfer</Link>
        <Link to="/history" className={isActive("/history")}>History</Link>
        
        {/* Only show the Admin link if the logged-in user is an admin */}
        {role === "admin" && (
          <Link to="/admin" className={isActive("/admin")}>Admin</Link>
        )}
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
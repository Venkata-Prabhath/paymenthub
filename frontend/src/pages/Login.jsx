import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Save global credentials
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      
      const displayName = response.data.name || email.split("@")[0];
      localStorage.setItem("name", displayName);

      /* ADMIN PROFILE DETECTOR
         Checks if the server sends back a user role. 
         Fallback: Automatically assigns "admin" if the typed email is admin@gmail.com
      */
      const userRole = response.data.role || (email === "admin@gmail.com" ? "admin" : "user");
      localStorage.setItem("role", userRole);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h1>Login</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <p style={{ marginTop: '1rem' }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
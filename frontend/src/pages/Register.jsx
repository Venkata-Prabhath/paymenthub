import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Save token and user details to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", name);
      
      // Save role so Navbar handles Admin option correctly
      localStorage.setItem("role", response.data.role || "user"); 

      alert("Registration Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Registration Failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h1>Register</h1>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={register}>Register</button>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
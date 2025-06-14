import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login/", { username, password });
      setUser(res.data.username);
      navigate("/chat", { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
      <button
        type="button"
        className="switch-link"
        onClick={() => navigate("/register")}
      >
        New user? Register
      </button>
    </form>
  );
}

export default Login;
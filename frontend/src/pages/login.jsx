import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ---------------- Handlers ----------------
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      setUser({ username: data.username });
      alert("Logged in successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // Signup API call
      await fetch("http://localhost:8000/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
        }),
      });
      alert("User created successfully!");

      // Auto-login after signup
      const data = await loginUser(signupData.username, signupData.password);
      setUser({ username: data.username });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Render ----------------
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>{mode === "signin" ? "Sign In" : "Sign Up"}</h2>

        <div style={styles.switch}>
          <button
            style={mode === "signin" ? styles.activeSwitch : styles.inactiveSwitch}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            style={mode === "signup" ? styles.activeSwitch : styles.inactiveSwitch}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {mode === "signin" && (
          <form onSubmit={handleSignin} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup} style={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              style={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              style={styles.input}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------------- Styles ----------------
const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  box: { background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "400px" },
  title: { textAlign: "center", marginBottom: "20px" },
  switch: { display: "flex", justifyContent: "space-around", marginBottom: "20px" },
  activeSwitch: { background: "#4CAF50", color: "#fff", padding: "8px 20px", border: "none", borderRadius: "5px", cursor: "pointer" },
  inactiveSwitch: { background: "#eee", color: "#333", padding: "8px 20px", border: "none", borderRadius: "5px", cursor: "pointer" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
};

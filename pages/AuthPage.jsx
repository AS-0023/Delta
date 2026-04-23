import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState("login");   // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee", department: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12.03 2.01L2.84 7.37L12.03 12.69L21.17 7.37L12.03 2.01Z" fill="#2684FF"/>
            <path d="M3.79 16.59L12.03 21.36L20.27 16.59L12.03 11.82L3.79 16.59Z" fill="#0052CC"/>
          </svg>
          <span>ANORYX</span>
        </div>

        <h2>{mode === "login" ? "Sign in to your account" : "Create your account"}</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={submit} className="auth-form">
          {mode === "register" && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input name="department" value={form.department} onChange={handle} placeholder="Engineering" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={form.role} onChange={handle}>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@company.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" required minLength={6} />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? (
            <>Don't have an account?{" "}<button onClick={() => setMode("register")}>Sign up</button></>
          ) : (
            <>Already have an account?{" "}<button onClick={() => setMode("login")}>Sign in</button></>
          )}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI, usersAPI } from "../services/api";
import { User, Lock, CheckCircle } from "lucide-react";
import "./AppPages.css";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [tab, setTab] = useState("profile");
  const [form, setForm]     = useState({ name: user?.name || "", department: user?.department || "" });
  const [pwForm, setPwForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]   = useState("");

  const f  = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const pf = (k) => (e) => setPwForm({ ...pwForm, [k]: e.target.value });

  const saveProfile = async (e) => {
    e.preventDefault(); setSaving(true); setError(""); setSuccess("");
    try {
      await usersAPI.update(user.id, form);
      setSuccess("Profile updated successfully!");
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  const changePassword = async (e) => {
    e.preventDefault(); setSaving(true); setError(""); setSuccess("");
    if (pwForm.newPassword !== pwForm.confirm) {
      setError("New passwords do not match"); setSaving(false); return;
    }
    try {
      await authAPI.changePassword({ oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword });
      setSuccess("Password changed successfully!");
      setPwForm({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p className="page-sub">Manage your account settings</p>
        </div>
      </div>

      {/* Avatar block */}
      <div className="profile-hero">
        <div className="profile-avatar">{user?.name?.slice(0, 2).toUpperCase()}</div>
        <div>
          <div className="profile-name">{user?.name}</div>
          <div className="profile-email">{user?.email}</div>
          <span className={`badge ${user?.role === "admin" ? "badge-blue" : user?.role === "manager" ? "badge-yellow" : "badge-green"}`}>
            {user?.role}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 28 }}>
        <button className={`tab ${tab === "profile" ? "active" : ""}`} onClick={() => { setTab("profile"); setError(""); setSuccess(""); }}>
          <User size={15}/> Profile
        </button>
        <button className={`tab ${tab === "password" ? "active" : ""}`} onClick={() => { setTab("password"); setError(""); setSuccess(""); }}>
          <Lock size={15}/> Password
        </button>
      </div>

      {success && (
        <div className="success-msg">
          <CheckCircle size={16}/> {success}
        </div>
      )}
      {error && <div className="form-error">{error}</div>}

      {tab === "profile" && (
        <form onSubmit={saveProfile} style={{ maxWidth: 480 }}>
          <div className="form-group">
            <label>Full Name</label>
            <input value={form.name} onChange={f("name")} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={user?.email} disabled style={{ opacity: 0.5, cursor: "not-allowed" }} />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input value={form.department} onChange={f("department")} placeholder="e.g. Engineering" />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input value={user?.role} disabled style={{ opacity: 0.5, cursor: "not-allowed" }} />
          </div>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
        </form>
      )}

      {tab === "password" && (
        <form onSubmit={changePassword} style={{ maxWidth: 480 }}>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" value={pwForm.oldPassword} onChange={pf("oldPassword")} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={pwForm.newPassword} onChange={pf("newPassword")} required minLength={6} />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={pwForm.confirm} onChange={pf("confirm")} required minLength={6} />
          </div>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Changing…" : "Change Password"}</button>
        </form>
      )}
    </div>
  );
}

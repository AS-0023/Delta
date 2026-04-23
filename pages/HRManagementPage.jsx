import { useEffect, useState } from "react";
import { hrAPI } from "../services/api";
import { Plus, Trash2, Check, X, DollarSign, Users, Calendar, ChevronDown } from "lucide-react";
import "./AppPages.css";

export default function HRManagementPage() {
  const [tab, setTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { loadAll(); }, []);
  useEffect(() => { setShowForm(false); setForm({}); setError(""); }, [tab]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [e, l, p, d] = await Promise.all([
        hrAPI.listEmployees(), hrAPI.listLeaves(), hrAPI.listPayroll(), hrAPI.listDepartments()
      ]);
      setEmployees(e); setLeaves(l); setPayroll(p); setDepartments(d);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const createEmployee = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      await hrAPI.createEmployee(form);
      setShowForm(false); setForm({});
      loadAll();
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  const createLeave = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      await hrAPI.applyLeave(form);
      setShowForm(false); setForm({});
      loadAll();
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  const createPayroll = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      await hrAPI.createPayroll({ ...form, basicSalary: +form.basicSalary, allowances: +form.allowances, deductions: +form.deductions });
      setShowForm(false); setForm({});
      loadAll();
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  const approveLeave = async (id, action) => {
    await hrAPI.approveLeave(id, action);
    loadAll();
  };

  const markPaid = async (id) => {
    await hrAPI.markPaid(id);
    loadAll();
  };

  const delEmployee = async (id) => {
    if (!confirm("Delete this employee record?")) return;
    await hrAPI.deleteEmployee(id);
    loadAll();
  };

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>HR Management</h1>
          <p className="page-sub">Employees · Leave · Payroll</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16}/> Add {tab === "employees" ? "Employee" : tab === "leaves" ? "Leave" : "Payroll"}
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[
          { id: "employees", label: "Employees", icon: <Users size={15}/> },
          { id: "leaves",    label: "Leave Requests", icon: <Calendar size={15}/> },
          { id: "payroll",   label: "Payroll", icon: <DollarSign size={15}/> },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Department Summary */}
      {tab === "employees" && departments.length > 0 && (
        <div className="dept-chips">
          {departments.map(d => (
            <span key={d.name} className="dept-chip"><strong>{d.count}</strong> {d.name}</span>
          ))}
        </div>
      )}

      {/* Create Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {error && <div className="form-error">{error}</div>}

            {tab === "employees" && (
              <form onSubmit={createEmployee}>
                <h3>Add Employee</h3>
                <div className="form-row">
                  <div className="form-group"><label>Full Name *</label><input required value={form.name||""} onChange={f("name")} /></div>
                  <div className="form-group"><label>Email *</label><input required type="email" value={form.email||""} onChange={f("email")} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Department</label><input value={form.department||""} onChange={f("department")} /></div>
                  <div className="form-group"><label>Designation</label><input value={form.designation||""} onChange={f("designation")} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Phone</label><input value={form.phone||""} onChange={f("phone")} /></div>
                  <div className="form-group"><label>Salary (₹)</label><input type="number" value={form.salary||""} onChange={f("salary")} /></div>
                </div>
                <div className="form-group"><label>Join Date</label><input type="date" value={form.joinDate||""} onChange={f("joinDate")} /></div>
                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Add Employee"}</button>
                </div>
              </form>
            )}

            {tab === "leaves" && (
              <form onSubmit={createLeave}>
                <h3>Apply for Leave</h3>
                <div className="form-row">
                  <div className="form-group"><label>Employee Name</label><input value={form.employeeName||""} onChange={f("employeeName")} /></div>
                  <div className="form-group"><label>Leave Type</label>
                    <select value={form.type||"casual"} onChange={f("type")}>
                      <option value="casual">Casual</option>
                      <option value="sick">Sick</option>
                      <option value="earned">Earned</option>
                      <option value="maternity">Maternity</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>From *</label><input required type="date" value={form.fromDate||""} onChange={f("fromDate")} /></div>
                  <div className="form-group"><label>To *</label><input required type="date" value={form.toDate||""} onChange={f("toDate")} /></div>
                </div>
                <div className="form-group"><label>Reason</label><textarea rows={3} value={form.reason||""} onChange={f("reason")} /></div>
                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Submitting…" : "Apply"}</button>
                </div>
              </form>
            )}

            {tab === "payroll" && (
              <form onSubmit={createPayroll}>
                <h3>Add Payroll Record</h3>
                <div className="form-row">
                  <div className="form-group"><label>Employee Name</label><input value={form.employeeName||""} onChange={f("employeeName")} /></div>
                  <div className="form-group"><label>Month</label>
                    <select value={form.month||""} onChange={f("month")}>
                      {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Basic Salary</label><input type="number" value={form.basicSalary||""} onChange={f("basicSalary")} /></div>
                  <div className="form-group"><label>Allowances</label><input type="number" value={form.allowances||""} onChange={f("allowances")} /></div>
                </div>
                <div className="form-group"><label>Deductions</label><input type="number" value={form.deductions||""} onChange={f("deductions")} /></div>
                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Create Record"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {loading ? <div className="loading-msg">Loading…</div> : (
        <>
          {/* Employees Table */}
          {tab === "employees" && (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Status</th><th>Salary</th><th></th></tr></thead>
                <tbody>
                  {employees.length === 0 ? <tr><td colSpan={7} className="empty-cell">No employees yet.</td></tr> :
                    employees.map(e => (
                      <tr key={e.id}>
                        <td><code>{e.employeeId}</code></td>
                        <td><strong>{e.name}</strong><br/><small>{e.email}</small></td>
                        <td>{e.department || "—"}</td>
                        <td>{e.designation || "—"}</td>
                        <td><span className={`badge ${e.status === "active" ? "badge-green" : "badge-gray"}`}>{e.status}</span></td>
                        <td>₹{Number(e.salary).toLocaleString()}</td>
                        <td><button className="btn-icon danger" onClick={() => delEmployee(e.id)}><Trash2 size={13}/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Leaves Table */}
          {tab === "leaves" && (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {leaves.length === 0 ? <tr><td colSpan={7} className="empty-cell">No leave requests.</td></tr> :
                    leaves.map(l => (
                      <tr key={l.id}>
                        <td><strong>{l.employeeName || "—"}</strong></td>
                        <td>{l.type}</td>
                        <td>{l.fromDate}</td>
                        <td>{l.toDate}</td>
                        <td>{l.days}</td>
                        <td><span className={`badge ${l.status === "approved" ? "badge-green" : l.status === "rejected" ? "badge-red" : "badge-yellow"}`}>{l.status}</span></td>
                        <td>
                          {l.status === "pending" && (
                            <div style={{display:"flex",gap:6}}>
                              <button className="btn-icon success" onClick={() => approveLeave(l.id, "approved")} title="Approve"><Check size={13}/></button>
                              <button className="btn-icon danger" onClick={() => approveLeave(l.id, "rejected")} title="Reject"><X size={13}/></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Payroll Table */}
          {tab === "payroll" && (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead><tr><th>Employee</th><th>Month</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Net</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {payroll.length === 0 ? <tr><td colSpan={8} className="empty-cell">No payroll records.</td></tr> :
                    payroll.map(p => (
                      <tr key={p.id}>
                        <td><strong>{p.employeeName}</strong></td>
                        <td>{p.month} {p.year}</td>
                        <td>₹{Number(p.basicSalary).toLocaleString()}</td>
                        <td>₹{Number(p.allowances).toLocaleString()}</td>
                        <td>₹{Number(p.deductions).toLocaleString()}</td>
                        <td><strong>₹{Number(p.netSalary).toLocaleString()}</strong></td>
                        <td><span className={`badge ${p.status === "paid" ? "badge-green" : "badge-yellow"}`}>{p.status}</span></td>
                        <td>{p.status === "pending" && <button className="btn-xs" onClick={() => markPaid(p.id)}>Mark Paid</button>}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

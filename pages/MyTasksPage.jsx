import { useEffect, useState } from "react";
import { tasksAPI, projectsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Plus, Trash2, Flag, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import "./AppPages.css";
import "./MyTasksPage.css";

const STATUS_OPTS   = ["todo", "inProgress", "review", "done"];
const PRIORITY_OPTS = ["low", "medium", "high", "critical"];
const TYPE_OPTS     = ["task", "story", "bug", "epic"];
const STATUS_ICON   = {
  todo: <Circle size={15} color="#8b9ab1"/>,
  inProgress: <Clock size={15} color="#2684ff"/>,
  review: <AlertCircle size={15} color="#f59e0b"/>,
  done: <CheckCircle2 size={15} color="#10b981"/>,
};
const PRIORITY_COLOR = { low: "#10b981", medium: "#f59e0b", high: "#f97316", critical: "#ef4444" };

export default function MyTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks]       = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", type: "task", status: "todo",
    priority: "medium", projectId: "", dueDate: "", storyPoints: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  useEffect(() => {
    Promise.all([
      tasksAPI.list({ assignee: user?.id }),
      projectsAPI.list(),
    ]).then(([t, p]) => { setTasks(t); setProjects(p); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const load = () =>
    tasksAPI.list({ assignee: user?.id })
      .then(setTasks).catch(console.error);

  const createTask = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...form, assignee: user?.id, storyPoints: Number(form.storyPoints) || 0 };
      await tasksAPI.create(payload);
      setShowForm(false);
      setForm({ title: "", description: "", type: "task", status: "todo", priority: "medium", projectId: "", dueDate: "", storyPoints: "" });
      load();
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  const moveStatus = async (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    await tasksAPI.moveStatus(taskId, newStatus).catch(console.error);
  };

  const deleteTask = async (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    await tasksAPI.delete(id).catch(console.error);
  };

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const filtered = tasks.filter(t => {
    if (filterStatus   && t.status   !== filterStatus)   return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    return true;
  });

  const groupByStatus = STATUS_OPTS.reduce((acc, s) => {
    acc[s] = filtered.filter(t => t.status === s);
    return acc;
  }, {});

  const projectName = (id) => projects.find(p => p.id === id)?.name || "";

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>My Tasks</h1>
          <p className="page-sub">{tasks.length} task{tasks.length !== 1 ? "s" : ""} assigned to you</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16}/> New Task
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar" style={{ marginBottom: 24 }}>
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All Priorities</option>
          {PRIORITY_OPTS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Create Task Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Create New Task</h3>
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={createTask}>
              <div className="form-group">
                <label>Title *</label>
                <input required value={form.title} onChange={f("title")} placeholder="What needs to be done?" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={f("description")} placeholder="Add more details…" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={f("type")}>
                    {TYPE_OPTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select value={form.priority} onChange={f("priority")}>
                    {PRIORITY_OPTS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={f("status")}>
                    {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Story Points</label>
                  <input type="number" min={0} max={100} value={form.storyPoints} onChange={f("storyPoints")} placeholder="0" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Project</label>
                  <select value={form.projectId} onChange={f("projectId")}>
                    <option value="">No Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" value={form.dueDate} onChange={f("dueDate")} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Creating…" : "Create Task"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task List grouped by status */}
      {loading
        ? <div className="loading-msg">Loading tasks…</div>
        : filtered.length === 0
          ? <div className="empty-state">
              <CheckCircle2 size={48} color="#2a2d35"/>
              <p>No tasks yet. Create your first task!</p>
              <button className="btn-primary" onClick={() => setShowForm(true)}>+ New Task</button>
            </div>
          : <div className="task-groups">
              {STATUS_OPTS.map(status => {
                const grp = groupByStatus[status];
                if (grp.length === 0) return null;
                return (
                  <div key={status} className="task-group">
                    <div className="task-group-header">
                      {STATUS_ICON[status]}
                      <span className="task-group-label">{status === "inProgress" ? "In Progress" : status === "todo" ? "To Do" : status === "review" ? "In Review" : "Done"}</span>
                      <span className="task-group-count">{grp.length}</span>
                    </div>
                    <div className="task-list">
                      {grp.map(task => (
                        <div key={task.id} className="task-row">
                          <div className="task-row-left">
                            <button className="task-status-toggle"
                              onClick={() => moveStatus(task.id, task.status === "done" ? "todo" : "done")}
                              title="Toggle done">
                              {task.status === "done"
                                ? <CheckCircle2 size={18} color="#10b981"/>
                                : <Circle size={18} color="#2a2d35"/>}
                            </button>
                            <div className="task-row-info">
                              <span className={`task-row-title ${task.status === "done" ? "done-text" : ""}`}>{task.title}</span>
                              <div className="task-row-meta">
                                <span className="task-priority-badge" style={{ color: PRIORITY_COLOR[task.priority] }}>
                                  <Flag size={10}/> {task.priority}
                                </span>
                                <span className="task-type-badge">#{task.type}</span>
                                {task.projectId && <span className="task-project-badge">📁 {projectName(task.projectId)}</span>}
                                {task.dueDate && <span className="task-due-badge">📅 {task.dueDate}</span>}
                                {task.storyPoints > 0 && <span className="task-sp-badge">SP: {task.storyPoints}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="task-row-actions">
                            <select className="inline-status-select"
                              value={task.status}
                              onChange={e => moveStatus(task.id, e.target.value)}>
                              {STATUS_OPTS.map(s => <option key={s} value={s}>{s === "inProgress" ? "In Progress" : s}</option>)}
                            </select>
                            <button className="btn-icon danger" onClick={() => deleteTask(task.id)}><Trash2 size={13}/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
      }
    </div>
  );
}

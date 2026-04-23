import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../services/api";
import { Plus, Folder, Trash2, ChevronRight, Search } from "lucide-react";
import "./AppPages.css";

const STATUS_BADGE = { active: "badge-green", archived: "badge-gray", "on-hold": "badge-yellow" };
const TYPE_ICON = { scrum: "🔄", kanban: "📋", business: "💼" };

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", description: "", type: "scrum", startDate: "", endDate: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { load(); }, []);

  const load = () => {
    setLoading(true);
    projectsAPI.list().then(setProjects).catch(console.error).finally(() => setLoading(false));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await projectsAPI.create(form);
      setForm({ name: "", description: "", type: "scrum", startDate: "", endDate: "" });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id, name) => {
    if (!confirm(`Delete "${name}"? This will also delete all its tasks.`)) return;
    await projectsAPI.delete(id).catch(console.error);
    load();
  };

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p className="page-sub">{projects.length} project{projects.length !== 1 ? "s" : ""} in your workspace</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}><Plus size={16}/> New Project</button>
      </div>

      {/* Search */}
      <div className="search-bar-wrap">
        <Search size={16} className="search-icon" />
        <input placeholder="Search projects…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Create Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Create New Project</h3>
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Project Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Website Redesign" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What is this project about?" rows={3} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="scrum">Scrum</option>
                    <option value="kanban">Kanban</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Creating…" : "Create Project"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {loading
        ? <div className="loading-msg">Loading projects…</div>
        : filtered.length === 0
          ? <div className="empty-state">
              <Folder size={48} color="#2a2d35"/>
              <p>No projects found.</p>
              <button className="btn-primary" onClick={() => setShowForm(true)}>Create your first project</button>
            </div>
          : <div className="projects-grid">
              {filtered.map(p => (
                <div key={p.id} className="project-card">
                  <div className="project-card-top">
                    <span className="project-type-icon">{TYPE_ICON[p.type] || "📁"}</span>
                    <span className={`badge ${STATUS_BADGE[p.status] || "badge-gray"}`}>{p.status}</span>
                  </div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.description || "No description"}</p>
                  <div className="project-meta">
                    <span>{p.type}</span>
                    {p.endDate && <span>Due {p.endDate}</span>}
                  </div>
                  <div className="project-card-actions">
                    <Link to={`/app/projects/${p.id}`} className="btn-link">
                      View Board <ChevronRight size={14}/>
                    </Link>
                    <button className="btn-icon danger" onClick={() => del(p.id, p.name)} title="Delete project">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
      }
    </div>
  );
}

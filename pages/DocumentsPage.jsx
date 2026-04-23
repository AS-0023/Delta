import { useEffect, useState } from "react";
import { docsAPI } from "../services/api";
import { Plus, FileText, Trash2, Edit3, Search, Tag } from "lucide-react";
import "./AppPages.css";

const TYPE_COLOR = { general: "#8b9ab1", policy: "#2684ff", contract: "#10b981", report: "#f59e0b", memo: "#8b5cf6" };
const STATUS_BADGE = { draft: "badge-gray", review: "badge-yellow", approved: "badge-green", published: "badge-blue", archived: "badge-gray" };

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", type: "general", status: "draft", tags: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { load(); }, [filterType]);

  const load = () => {
    setLoading(true);
    const params = {};
    if (filterType) params.type = filterType;
    docsAPI.list(params).then(setDocs).catch(console.error).finally(() => setLoading(false));
  };

  const openCreate = () => { setEditing(null); setForm({ title: "", content: "", type: "general", status: "draft", tags: "" }); setShowForm(true); };
  const openEdit = (d) => { setEditing(d); setForm({ title: d.title, content: d.content, type: d.type, status: d.status, tags: d.tags.join(", ") }); setShowForm(true); };

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) await docsAPI.update(editing.id, payload);
      else await docsAPI.create(payload);
      setShowForm(false); load();
    } catch (err) { setError(err.message); }
    setSaving(false);
  };

  const del = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await docsAPI.delete(id).catch(console.error);
    load();
  };

  const filtered = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="app-page">
      <div className="page-header">
        <div>
          <h1>Documents</h1>
          <p className="page-sub">{docs.length} document{docs.length !== 1 ? "s" : ""}</p>
        </div>
        <button className="btn-primary" onClick={openCreate}><Plus size={16}/> New Document</button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-bar-wrap">
          <Search size={16} className="search-icon"/>
          <input placeholder="Search documents…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {["general","policy","contract","report","memo"].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
        </select>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal wide" onClick={e => e.stopPropagation()}>
            <h3>{editing ? "Edit Document" : "New Document"}</h3>
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={submit}>
              <div className="form-group"><label>Title *</label><input required value={form.title} onChange={f("title")} placeholder="Document title" /></div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={f("type")}>
                    {["general","policy","contract","report","memo"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={f("status")}>
                    {["draft","review","approved","published","archived"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Tags (comma separated)</label><input value={form.tags} onChange={f("tags")} placeholder="policy, finance, 2024" /></div>
              <div className="form-group"><label>Content</label><textarea rows={8} value={form.content} onChange={f("content")} placeholder="Write your document content here…" /></div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving…" : editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="loading-msg">Loading documents…</div> :
        filtered.length === 0
          ? <div className="empty-state"><FileText size={48} color="#2a2d35"/><p>No documents found.</p><button className="btn-primary" onClick={openCreate}>Create your first document</button></div>
          : <div className="docs-grid">
              {filtered.map(d => (
                <div key={d.id} className="doc-card">
                  <div className="doc-card-top">
                    <span className="doc-type-dot" style={{ background: TYPE_COLOR[d.type] || "#888" }}/>
                    <span className="doc-type-label">{d.type}</span>
                    <span className={`badge ${STATUS_BADGE[d.status] || "badge-gray"}`}>{d.status}</span>
                  </div>
                  <h3 className="doc-title">{d.title}</h3>
                  <p className="doc-preview">{d.content ? d.content.slice(0, 120) + (d.content.length > 120 ? "…" : "") : "No content yet."}</p>
                  {d.tags.length > 0 && (
                    <div className="doc-tags">
                      {d.tags.slice(0, 4).map(tag => <span key={tag} className="doc-tag"><Tag size={10}/> {tag}</span>)}
                    </div>
                  )}
                  <div className="doc-footer">
                    <span className="doc-date">{d.updatedAt ? new Date(d.updatedAt).toLocaleDateString() : ""}</span>
                    <div className="doc-actions">
                      <button className="btn-icon" onClick={() => openEdit(d)} title="Edit"><Edit3 size={13}/></button>
                      <button className="btn-icon danger" onClick={() => del(d.id, d.title)} title="Delete"><Trash2 size={13}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      }
    </div>
  );
}

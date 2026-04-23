import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { tasksAPI, projectsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Plus, Trash2, ArrowLeft, User, Flag, Tag } from "lucide-react";
import "./KanbanPage.css";

const COLUMNS = [
  { id: "todo",       label: "To Do",       color: "#8b9ab1" },
  { id: "inProgress", label: "In Progress", color: "#2684ff" },
  { id: "review",     label: "In Review",   color: "#f59e0b" },
  { id: "done",       label: "Done",        color: "#10b981" },
];

const PRIORITY_COLOR = { low: "#10b981", medium: "#f59e0b", high: "#f97316", critical: "#ef4444" };
const TYPE_ICON = { task: "✅", story: "📖", bug: "🐛", epic: "⚡" };

export default function KanbanPage() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingTo, setAddingTo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [dragging, setDragging] = useState(null);
  const [taskModal, setTaskModal] = useState(null);   // selected task for detail view
  const [newForm, setNewForm] = useState({ type: "task", priority: "medium", assignee: "", dueDate: "" });

  useEffect(() => {
    Promise.all([
      projectId !== "all" ? projectsAPI.get(projectId) : Promise.resolve({ name: "All Tasks", id: "all" }),
      tasksAPI.list(projectId !== "all" ? { projectId } : {}),
    ]).then(([p, t]) => { setProject(p); setTasks(t); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  const getColumnTasks = (status) => tasks.filter(t => t.status === status);

  const addTask = async (colId) => {
    if (!newTitle.trim()) return;
    const task = await tasksAPI.create({
      title: newTitle,
      status: colId,
      projectId: projectId !== "all" ? projectId : "",
      ...newForm,
    });
    setTasks(prev => [task, ...prev]);
    setNewTitle("");
    setAddingTo(null);
    setNewForm({ type: "task", priority: "medium", assignee: "", dueDate: "" });
  };

  const moveTask = async (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    await tasksAPI.moveStatus(taskId, newStatus).catch(console.error);
  };

  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setTaskModal(null);
    await tasksAPI.delete(taskId).catch(console.error);
  };

  // Drag & Drop
  const onDragStart = (e, task) => { setDragging(task); e.dataTransfer.effectAllowed = "move"; };
  const onDrop = (e, colId) => { e.preventDefault(); if (dragging && dragging.status !== colId) moveTask(dragging.id, colId); setDragging(null); };
  const onDragOver = (e) => e.preventDefault();

  if (loading) return <div className="kanban-loading"><div className="spinner"/></div>;

  return (
    <div className="kanban-page">
      <div className="kanban-header">
        <Link to="/app/projects" className="back-link"><ArrowLeft size={16}/> Projects</Link>
        <div>
          <h1>{project?.name}</h1>
          <p className="kanban-sub">{tasks.length} total tasks</p>
        </div>
      </div>

      <div className="kanban-board">
        {COLUMNS.map(col => {
          const colTasks = getColumnTasks(col.id);
          return (
            <div key={col.id} className="kanban-col"
              onDrop={e => onDrop(e, col.id)} onDragOver={onDragOver}>
              {/* Column Header */}
              <div className="col-header">
                <div className="col-title">
                  <span className="col-dot" style={{ background: col.color }}/>
                  <span>{col.label}</span>
                  <span className="col-count">{colTasks.length}</span>
                </div>
                <button className="add-task-btn" onClick={() => setAddingTo(col.id)} title="Add task">
                  <Plus size={14}/>
                </button>
              </div>

              {/* Add Task Form */}
              {addingTo === col.id && (
                <div className="add-task-form">
                  <input
                    autoFocus
                    placeholder="Task title…"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") addTask(col.id); if (e.key === "Escape") setAddingTo(null); }}
                  />
                  <div className="add-task-meta">
                    <select value={newForm.type} onChange={e => setNewForm({...newForm, type: e.target.value})}>
                      <option value="task">Task</option>
                      <option value="story">Story</option>
                      <option value="bug">Bug</option>
                      <option value="epic">Epic</option>
                    </select>
                    <select value={newForm.priority} onChange={e => setNewForm({...newForm, priority: e.target.value})}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="add-task-actions">
                    <button className="btn-xs" onClick={() => addTask(col.id)}>Add</button>
                    <button className="btn-xs ghost" onClick={() => setAddingTo(null)}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Task Cards */}
              <div className="col-cards">
                {colTasks.map(task => (
                  <div key={task.id} className="task-card"
                    draggable onDragStart={e => onDragStart(e, task)}
                    onClick={() => setTaskModal(task)}>
                    <div className="task-card-top">
                      <span className="task-type">{TYPE_ICON[task.type]}</span>
                      <span className="task-priority" style={{ color: PRIORITY_COLOR[task.priority] }}>
                        <Flag size={11}/> {task.priority}
                      </span>
                    </div>
                    <p className="task-title">{task.title}</p>
                    {task.dueDate && <p className="task-due">📅 {task.dueDate}</p>}
                    {task.assignee && (
                      <div className="task-assignee">
                        <div className="avatar-sm">{task.assignee.slice(0, 2).toUpperCase()}</div>
                      </div>
                    )}
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div className="col-empty">Drop tasks here</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {taskModal && (
        <div className="modal-overlay" onClick={() => setTaskModal(null)}>
          <div className="task-modal" onClick={e => e.stopPropagation()}>
            <div className="task-modal-header">
              <span>{TYPE_ICON[taskModal.type]} {taskModal.type.toUpperCase()}</span>
              <button className="btn-icon danger" onClick={() => deleteTask(taskModal.id)}><Trash2 size={15}/></button>
            </div>
            <h2>{taskModal.title}</h2>
            {taskModal.description && <p className="task-modal-desc">{taskModal.description}</p>}
            <div className="task-modal-meta">
              <div><span className="meta-label">Status</span>
                <select defaultValue={taskModal.status} onChange={e => moveTask(taskModal.id, e.target.value)}>
                  {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div><span className="meta-label">Priority</span>
                <span className="meta-val" style={{ color: PRIORITY_COLOR[taskModal.priority] }}>{taskModal.priority}</span>
              </div>
              {taskModal.assignee && (
                <div><span className="meta-label">Assignee</span>
                  <span className="meta-val"><User size={12}/> {taskModal.assignee}</span>
                </div>
              )}
              {taskModal.dueDate && (
                <div><span className="meta-label">Due</span>
                  <span className="meta-val">{taskModal.dueDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

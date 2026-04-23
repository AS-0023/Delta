import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardAPI } from "../services/api";
import {
  FolderKanban, CheckSquare, Users, FileText,
  ChevronRight, TrendingUp, Clock, AlertCircle,
  Plus, Activity, BarChart2
} from "lucide-react";
import "./DashboardPage.css";

const STATUS_COLOR = { todo: "#8b9ab1", inProgress: "#2684ff", review: "#f59e0b", done: "#10b981" };
const STATUS_LABEL = { todo: "To Do", inProgress: "In Progress", review: "In Review", done: "Done" };
const STATUS_BG    = { todo: "#8b9ab122", inProgress: "#2684ff22", review: "#f59e0b22", done: "#10b98122" };

export default function DashboardPage() {
  const { user } = useAuth();
  const [summary,   setSummary]   = useState(null);
  const [taskChart, setTaskChart] = useState([]);
  const [activity,  setActivity]  = useState([]);
  const [progress,  setProgress]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [animIn,    setAnimIn]    = useState(false);

  useEffect(() => {
    Promise.all([
      dashboardAPI.summary(),
      dashboardAPI.taskChart(),
      dashboardAPI.recentActivity(),
      dashboardAPI.projectProgress(),
    ]).then(([s, tc, a, p]) => {
      setSummary(s);
      setTaskChart(tc);
      setActivity(a);
      setProgress(p);
      setTimeout(() => setAnimIn(true), 80);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalTasks = taskChart.reduce((s, t) => s + t.count, 0) || 1;

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner" />
        <span>Loading dashboard…</span>
      </div>
    );
  }

  const kpis = [
    {
      icon: <FolderKanban size={22} />,
      label: "Active Projects",
      value: summary?.activeProjects ?? 0,
      sub: `${summary?.totalProjects ?? 0} total`,
      color: "#2684ff",
      link: "/app/projects",
    },
    {
      icon: <CheckSquare size={22} />,
      label: "My Open Tasks",
      value: summary?.myOpenTasks ?? 0,
      sub: `${summary?.totalTasks ?? 0} total tasks`,
      color: "#f59e0b",
      link: "/app/tasks",
    },
    {
      icon: <Users size={22} />,
      label: "Employees",
      value: summary?.totalEmployees ?? 0,
      sub: `${summary?.pendingLeaves ?? 0} leave pending`,
      color: "#10b981",
      link: "/app/hr",
    },
    {
      icon: <FileText size={22} />,
      label: "Documents",
      value: summary?.totalDocuments ?? 0,
      sub: "Across all projects",
      color: "#8b5cf6",
      link: "/app/documents",
    },
  ];

  return (
    <div className={`dashboard-page ${animIn ? "anim-in" : ""}`}>

      {/* ── Top Header ─────────────────────────────────────────────── */}
      <div className="dash-header">
        <div className="dash-header-left">
          <div className="dash-greeting-badge">
            <Activity size={14} /> Live Dashboard
          </div>
          <h1>Good {getGreeting()}, <span className="dash-name">{user?.name?.split(" ")[0]}</span> 👋</h1>
          <p className="dash-sub">Here's what's happening across your workspace today.</p>
        </div>
        <div className="dash-quick-links">
          <Link to="/app/projects" className="dash-cta">
            <Plus size={14} /> New Project
          </Link>
          <Link to="/app/tasks" className="dash-cta outline">
            <Plus size={14} /> New Task
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────── */}
      <div className="dash-kpis">
        {kpis.map((k, i) => (
          <Link to={k.link} key={k.label} className="kpi-card" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="kpi-icon" style={{ background: k.color + "22", color: k.color }}>
              {k.icon}
            </div>
            <div className="kpi-text">
              <span className="kpi-value">{k.value}</span>
              <span className="kpi-label">{k.label}</span>
              <span className="kpi-sub">{k.sub}</span>
            </div>
            <div className="kpi-arrow" style={{ color: k.color }}>
              <ChevronRight size={18} />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Main Grid ──────────────────────────────────────────────── */}
      <div className="dash-grid">

        {/* Task Status Breakdown */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title">
              <BarChart2 size={16} className="card-title-icon" />
              <h3>Task Status Breakdown</h3>
            </div>
          </div>
          {taskChart.length === 0 ? (
            <div className="empty-card-state">
              <CheckSquare size={36} />
              <p>No tasks yet</p>
              <Link to="/app/tasks" className="empty-link">Create your first task →</Link>
            </div>
          ) : (
            <div className="task-chart">
              {/* Donut-style visual summary */}
              <div className="task-donut-row">
                {taskChart.map((t) => (
                  <div key={t.status} className="donut-segment"
                    style={{ background: STATUS_BG[t.status] || "#2a2d3522", borderColor: STATUS_COLOR[t.status] || "#888" }}>
                    <span className="donut-val" style={{ color: STATUS_COLOR[t.status] }}>{t.count}</span>
                    <span className="donut-lbl">{STATUS_LABEL[t.status] || t.status}</span>
                  </div>
                ))}
              </div>
              {/* Bar chart rows */}
              <div className="chart-bars">
                {taskChart.map((t) => (
                  <div key={t.status} className="chart-row">
                    <div className="chart-left">
                      <div className="chart-dot" style={{ background: STATUS_COLOR[t.status] || "#888" }} />
                      <span className="chart-label">{STATUS_LABEL[t.status] || t.status}</span>
                    </div>
                    <div className="chart-bar-wrap">
                      <div
                        className="chart-bar"
                        style={{
                          width: `${Math.max((t.count / totalTasks) * 100, t.count > 0 ? 4 : 0)}%`,
                          background: STATUS_COLOR[t.status] || "#888",
                        }}
                      />
                    </div>
                    <span className="chart-count">{t.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Progress */}
        <div className="dash-card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={16} className="card-title-icon" />
              <h3>Project Progress</h3>
            </div>
            <Link to="/app/projects" className="see-all">
              See all <ChevronRight size={14} />
            </Link>
          </div>
          {progress.length === 0 ? (
            <div className="empty-card-state">
              <FolderKanban size={36} />
              <p>No projects yet</p>
              <Link to="/app/projects" className="empty-link">Create your first project →</Link>
            </div>
          ) : (
            <div className="progress-list">
              {progress.map((p, i) => (
                <div key={p.name + i} className="progress-row">
                  <div className="progress-top">
                    <span className="progress-name">{p.name}</span>
                    <span className="progress-pct"
                      style={{ color: p.progress >= 75 ? "#10b981" : p.progress >= 40 ? "#f59e0b" : "#2684ff" }}>
                      {p.progress}%
                    </span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${p.progress}%`,
                        background: p.progress >= 75
                          ? "linear-gradient(90deg,#10b981,#059669)"
                          : p.progress >= 40
                            ? "linear-gradient(90deg,#f59e0b,#d97706)"
                            : "linear-gradient(90deg,#2684ff,#0052cc)",
                      }}
                    />
                  </div>
                  <div className="progress-meta">
                    <span className="progress-sub">{p.done} / {p.total} tasks done</span>
                    {p.total === 0 && <span className="progress-hint">No tasks yet</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity — full width */}
        <div className="dash-card full-width">
          <div className="card-header">
            <div className="card-title">
              <Clock size={16} className="card-title-icon" />
              <h3>Recent Activity</h3>
            </div>
          </div>
          {activity.length === 0 ? (
            <div className="empty-card-state">
              <Activity size={36} />
              <p>No recent activity yet. Start by creating a project or task.</p>
            </div>
          ) : (
            <div className="activity-list">
              {activity.map((a, i) => (
                <div key={i} className="activity-row">
                  <div className="activity-icon"
                    style={{
                      background: a.type === "task" ? "#2684ff22" : "#8b5cf622",
                      color:      a.type === "task" ? "#2684ff"   : "#8b5cf6",
                    }}>
                    {a.type === "task" ? <CheckSquare size={15} /> : <FileText size={15} />}
                  </div>
                  <div className="activity-info">
                    <span className="activity-action">{a.action}</span>
                    <span className="activity-time">{formatTime(a.time)}</span>
                  </div>
                  <div className="activity-type-badge"
                    style={{
                      background: a.type === "task" ? "#2684ff22" : "#8b5cf622",
                      color:      a.type === "task" ? "#2684ff"   : "#8b5cf6",
                    }}>
                    {a.type}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning";
  if (h < 17) return "Afternoon";
  return "Evening";
}

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return d.toLocaleDateString();
}

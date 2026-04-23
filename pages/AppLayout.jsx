import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Users,
  FileText, LogOut, Menu, X, Home, UserCircle
} from "lucide-react";
import "./AppLayout.css";

const NAV = [
  { to: "/app/dashboard",  icon: <LayoutDashboard size={18}/>, label: "Dashboard"  },
  { to: "/app/projects",   icon: <FolderKanban size={18}/>,    label: "Projects"   },
  { to: "/app/tasks",      icon: <CheckSquare size={18}/>,     label: "My Tasks"   },
  { to: "/app/hr",         icon: <Users size={18}/>,           label: "HR"         },
  { to: "/app/documents",  icon: <FileText size={18}/>,        label: "Documents"  },
  { to: "/app/profile",    icon: <UserCircle size={18}/>,      label: "Profile"    },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className={`app-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12.03 2.01L2.84 7.37L12.03 12.69L21.17 7.37L12.03 2.01Z" fill="#2684FF"/>
              <path d="M3.79 16.59L12.03 21.36L20.27 16.59L12.03 11.82L3.79 16.59Z" fill="#0052CC"/>
            </svg>
            {sidebarOpen && <span className="sidebar-brand">ANORYX</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(p => !p)}>
            {sidebarOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>

        <nav className="sidebar-nav">
          {/* Public site link */}
          <NavLink to="/" className="sidebar-link home-link" title="Public Site">
            <Home size={18}/>{sidebarOpen && <span>Home</span>}
          </NavLink>

          <div className="sidebar-divider"/>

          {NAV.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              title={item.label}>
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-divider"/>
          {user && (
            <div className="sidebar-user">
              <div className="user-avatar">{user.name?.slice(0,2).toUpperCase()}</div>
              {sidebarOpen && (
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              )}
            </div>
          )}
          <button className="sidebar-link logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={18}/>{sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

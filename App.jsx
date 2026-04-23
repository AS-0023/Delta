import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// ── Public marketing pages (existing) ────────────────────────────────────────
import HomePage from './HomePage';
import AllTemplatesPage from './AllTemplatesPage';
import AllFeaturesPage from './AllFeaturesPage';
import AIFeaturesPage from './AIFeaturesPage';
import ServiceManagementPage from './ServiceManagementPage';
import MarketingPage from './MarketingPage';
import OperationsPage from './OperationsPage';
import SoftwareDevelopmentPage from './SoftwareDevelopmentPage';
import ITOperationsPage from './ITOperationsPage';
import HRTemplatesPage from './HRTemplatesPage';
import ScrumBoardPage from './ScrumBoardPage';
import ScrumTemplateInfoPage from './ScrumTemplateInfoPage';
import AgileFlowPage from './pages/AgileFlowPage';

// ── Auth & App shell ──────────────────────────────────────────────────────────
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './pages/AppLayout';
import AuthPage from './pages/AuthPage';

// ── App (logged-in) pages ─────────────────────────────────────────────────────
import DashboardPage    from './pages/DashboardPage';
import ProjectsPage     from './pages/ProjectsPage';
import KanbanPage       from './pages/KanbanPage';
import MyTasksPage      from './pages/MyTasksPage';
import HRManagementPage from './pages/HRManagementPage';
import DocumentsPage    from './pages/DocumentsPage';
import ProfilePage      from './pages/ProfilePage';

// ── Public navbar (only shown on marketing routes) ────────────────────────────
function PublicNav() {
  const [showTemplatesDropdown, setShowTemplatesDropdown] = useState(false);
  const [showFeaturesDropdown,  setShowFeaturesDropdown]  = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo nav-logo-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.03 2.01L2.84 7.37L12.03 12.69L21.17 7.37L12.03 2.01H12.03Z" fill="#2684FF" />
            <path d="M3.79 16.59L12.03 21.36L20.27 16.59L12.03 11.82L3.79 16.59Z" fill="#0052CC" />
          </svg>
          <span className="brand-name">ANORYX</span>
        </Link>
        <ul className="nav-links">
          <li className="nav-item-dropdown"
            onMouseEnter={() => setShowFeaturesDropdown(true)}
            onMouseLeave={() => setShowFeaturesDropdown(false)}>
            Features <ChevronDown size={14} />
            {showFeaturesDropdown && (
              <div className="dropdown-menu shadow-lg" style={{ left: 0 }}>
                <ul className="dropdown-list">
                  <li><Link to="/features">All Features</Link></li>
                  <li><Link to="/ai-features">AI Features</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li>Solutions <ChevronDown size={14} /></li>
          <li>Guide</li>
          <li className="nav-item-dropdown"
            onMouseEnter={() => setShowTemplatesDropdown(true)}
            onMouseLeave={() => setShowTemplatesDropdown(false)}>
            Templates <ChevronDown size={14} />
            {showTemplatesDropdown && (
              <div className="dropdown-menu shadow-lg">
                <ul className="dropdown-list">
                  <li><Link to="/software-development">Software Development</Link></li>
                  <li><Link to="/marketing">Marketing</Link></li>
                  <li><Link to="/operations">Operations</Link></li>
                  <li><Link to="/service-management">Service Management</Link></li>
                  <li><Link to="/hr">HR</Link></li>
                  <li><Link to="/it-operations">IT Operations</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className="nav-right">
        <Link to="/auth" className="btn-primary-outline">Get it free</Link>
        <Search size={20} className="search-icon" />
        <Link to="/auth" className="signin-link">Sign in</Link>
      </div>
    </nav>
  );
}

// ── Public layout wrapper ─────────────────────────────────────────────────────
function PublicLayout({ children }) {
  return (
    <div className="container">
      <PublicNav />
      {children}
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Auth ─────────────────────────────────────────────────────── */}
        <Route path="/auth" element={<AuthPage />} />

        {/* ── App (protected, with sidebar) ────────────────────────────── */}
        <Route path="/app" element={
          <ProtectedRoute><AppLayout /></ProtectedRoute>
        }>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard"           element={<DashboardPage />} />
          <Route path="projects"            element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<KanbanPage />} />
          <Route path="tasks"               element={<MyTasksPage />} />
          <Route path="hr"                  element={<HRManagementPage />} />
          <Route path="documents"           element={<DocumentsPage />} />
          <Route path="profile"             element={<ProfilePage />} />
        </Route>

        {/* ── Public marketing site ─────────────────────────────────────── */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/features"          element={<PublicLayout><AllFeaturesPage /></PublicLayout>} />
        <Route path="/ai-features"       element={<PublicLayout><AIFeaturesPage /></PublicLayout>} />
        <Route path="/templates"         element={<PublicLayout><AllTemplatesPage /></PublicLayout>} />
        <Route path="/marketing"         element={<PublicLayout><MarketingPage /></PublicLayout>} />
        <Route path="/operations"        element={<PublicLayout><OperationsPage /></PublicLayout>} />
        <Route path="/service-management" element={<PublicLayout><ServiceManagementPage /></PublicLayout>} />
        <Route path="/software-development" element={<PublicLayout><SoftwareDevelopmentPage /></PublicLayout>} />
        <Route path="/it-operations"     element={<PublicLayout><ITOperationsPage /></PublicLayout>} />
        <Route path="/hr"                element={<PublicLayout><HRTemplatesPage /></PublicLayout>} />
        <Route path="/scrum-template"    element={<PublicLayout><ScrumTemplateInfoPage /></PublicLayout>} />
        <Route path="/scrum-board"       element={<PublicLayout><ScrumBoardPage /></PublicLayout>} />
        <Route path="/agileflow"         element={<PublicLayout><AgileFlowPage /></PublicLayout>} />

        {/* ── Fallback ──────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#0e1015", color: "#8b9ab1",
        fontFamily: "Inter, sans-serif", flexDirection: "column", gap: 16
      }}>
        <div style={{
          width: 36, height: 36, border: "3px solid #2a2d35",
          borderTopColor: "#2684ff", borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span>Loading…</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

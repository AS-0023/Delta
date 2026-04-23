// src/services/api.js  – centralised fetch wrapper
const BASE = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("anoryx_token");
}

async function request(method, path, body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ── Auth ────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (d) => request("POST", "/auth/register", d),
  login:    (d) => request("POST", "/auth/login",    d),
  me:       ()  => request("GET",  "/auth/me"),
  changePassword: (d) => request("PUT", "/auth/change-password", d),
};

// ── Users ────────────────────────────────────────────────────────────────────
export const usersAPI = {
  list:   ()       => request("GET",    "/users/"),
  get:    (id)     => request("GET",    `/users/${id}`),
  update: (id, d)  => request("PUT",    `/users/${id}`, d),
  delete: (id)     => request("DELETE", `/users/${id}`),
};

// ── Projects ─────────────────────────────────────────────────────────────────
export const projectsAPI = {
  list:   ()          => request("GET",    "/projects/"),
  get:    (id)        => request("GET",    `/projects/${id}`),
  create: (d)         => request("POST",   "/projects/", d),
  update: (id, d)     => request("PUT",    `/projects/${id}`, d),
  delete: (id)        => request("DELETE", `/projects/${id}`),
  stats:  (id)        => request("GET",    `/projects/${id}/stats`),
};

// ── Tasks ─────────────────────────────────────────────────────────────────────
export const tasksAPI = {
  list:        (params = {}) => request("GET", `/tasks/?${new URLSearchParams(params)}`),
  get:         (id)          => request("GET",    `/tasks/${id}`),
  create:      (d)           => request("POST",   "/tasks/", d),
  update:      (id, d)       => request("PUT",    `/tasks/${id}`, d),
  delete:      (id)          => request("DELETE", `/tasks/${id}`),
  moveStatus:  (id, status)  => request("PATCH",  `/tasks/${id}/status`, { status }),
  addComment:  (id, text)    => request("POST",   `/tasks/${id}/comments`, { text }),
};

// ── HR ────────────────────────────────────────────────────────────────────────
export const hrAPI = {
  // Employees
  listEmployees:   (params = {}) => request("GET",    `/hr/employees?${new URLSearchParams(params)}`),
  getEmployee:     (id)          => request("GET",    `/hr/employees/${id}`),
  createEmployee:  (d)           => request("POST",   "/hr/employees", d),
  updateEmployee:  (id, d)       => request("PUT",    `/hr/employees/${id}`, d),
  deleteEmployee:  (id)          => request("DELETE", `/hr/employees/${id}`),
  // Leaves
  listLeaves:      (params = {}) => request("GET",    `/hr/leaves?${new URLSearchParams(params)}`),
  applyLeave:      (d)           => request("POST",   "/hr/leaves", d),
  approveLeave:    (id, action)  => request("PATCH",  `/hr/leaves/${id}/approve`, { action }),
  // Payroll
  listPayroll:     (params = {}) => request("GET",    `/hr/payroll?${new URLSearchParams(params)}`),
  createPayroll:   (d)           => request("POST",   "/hr/payroll", d),
  markPaid:        (id)          => request("PATCH",  `/hr/payroll/${id}/pay`),
  // Departments
  listDepartments: ()            => request("GET",    "/hr/departments"),
};

// ── Documents ─────────────────────────────────────────────────────────────────
export const docsAPI = {
  list:   (params = {}) => request("GET",    `/documents/?${new URLSearchParams(params)}`),
  get:    (id)          => request("GET",    `/documents/${id}`),
  create: (d)           => request("POST",   "/documents/", d),
  update: (id, d)       => request("PUT",    `/documents/${id}`, d),
  delete: (id)          => request("DELETE", `/documents/${id}`),
  share:  (id, userIds) => request("PATCH",  `/documents/${id}/share`, { userIds }),
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const dashboardAPI = {
  summary:         () => request("GET", "/dashboard/summary"),
  taskChart:       () => request("GET", "/dashboard/task-chart"),
  recentActivity:  () => request("GET", "/dashboard/recent-activity"),
  projectProgress: () => request("GET", "/dashboard/project-progress"),
};

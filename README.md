# 🚀 Anoryx — Full-Stack e-Office Suite

A complete office management platform built with **React + Vite** (frontend) and **Python Flask + MongoDB** (backend), featuring JWT authentication, Kanban boards, HR management, document management, and live dashboards.

---

## 📁 Project Structure

```
e-Office_CBC_9/
├── Backend/
│   ├── app.py                  # Flask entry point
│   ├── db.py                   # MongoDB connection
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (edit this!)
│   └── routes/
│       ├── auth_routes.py      # Register / Login / JWT
│       ├── user_routes.py      # User CRUD
│       ├── project_routes.py   # Project management
│       ├── task_routes.py      # Tasks + comments + status moves
│       ├── hr_routes.py        # Employees + Leave + Payroll
│       ├── document_routes.py  # Document management
│       └── dashboard_routes.py # Analytics & KPIs
│
└── frontend/
    └── src/
        ├── App.jsx              # Root router (public + app)
        ├── context/
        │   └── AuthContext.jsx  # JWT auth state (global)
        ├── services/
        │   └── api.js           # All API calls to backend
        ├── components/
        │   └── ProtectedRoute.jsx
        └── pages/
            ├── AuthPage.jsx     # Login + Register
            ├── AppLayout.jsx    # Sidebar shell
            ├── DashboardPage.jsx
            ├── ProjectsPage.jsx
            ├── KanbanPage.jsx   # Drag-and-drop board
            ├── MyTasksPage.jsx
            ├── HRManagementPage.jsx
            ├── DocumentsPage.jsx
            └── ProfilePage.jsx
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** v18+
- **Python** 3.10+
- **MongoDB** running locally on port 27017 (or supply a connection URI)

---

### 1. Start MongoDB

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu / Debian
sudo systemctl start mongod

# Windows
net start MongoDB
```

---

### 2. Backend Setup

```bash
cd Backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Edit .env if needed (defaults work for local MongoDB)
# MONGO_URI=mongodb://localhost:27017
# DB_NAME=anoryx_db
# JWT_SECRET_KEY=anoryx-super-secret-change-in-prod

# Start Flask
python app.py
```
Backend runs at **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd frontend

# Install packages
npm install

# Start dev server
npm run dev
```
Frontend runs at **http://localhost:5173**

---

### 4. Open the App

1. Go to **http://localhost:5173**
2. Click **"Get it free"** or **"Sign in"** in the navbar
3. Register a new account
4. You're in! 🎉

---

## 🗺️ Routes

### Public (Marketing Site)
| Path | Page |
|------|------|
| `/` | Home |
| `/features` | All Features |
| `/ai-features` | AI Features |
| `/marketing` | Marketing Templates |
| `/hr` | HR Templates |
| `/software-development` | Software Dev Templates |
| `/scrum-board` | Scrum Board Demo |

### App (Requires Login)
| Path | Page |
|------|------|
| `/auth` | Login / Register |
| `/app/dashboard` | Dashboard with KPIs |
| `/app/projects` | Projects list + create |
| `/app/projects/:id` | Kanban board for project |
| `/app/tasks` | My Tasks |
| `/app/hr` | HR: Employees, Leave, Payroll |
| `/app/documents` | Document management |
| `/app/profile` | Profile & password |

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Create account |
| POST | `/login` | Login, returns JWT |
| GET | `/me` | Get current user |
| PUT | `/change-password` | Change password |

### Projects — `/api/projects`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List your projects |
| POST | `/` | Create project |
| GET | `/:id` | Get project |
| PUT | `/:id` | Update project |
| DELETE | `/:id` | Delete project + tasks |
| GET | `/:id/stats` | Task progress stats |

### Tasks — `/api/tasks`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/?projectId=&status=` | List tasks (filterable) |
| POST | `/` | Create task |
| GET | `/:id` | Get task |
| PUT | `/:id` | Update task |
| DELETE | `/:id` | Delete task |
| PATCH | `/:id/status` | Move task to new status |
| POST | `/:id/comments` | Add comment |

### HR — `/api/hr`
| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/employees` | List / Create employee |
| PUT/DELETE | `/employees/:id` | Update / Delete |
| GET/POST | `/leaves` | List / Apply leave |
| PATCH | `/leaves/:id/approve` | Approve or reject |
| GET/POST | `/payroll` | List / Create payroll |
| PATCH | `/payroll/:id/pay` | Mark as paid |
| GET | `/departments` | Department summary |

### Documents — `/api/documents`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/?type=&status=` | List documents |
| POST | `/` | Create document |
| GET/PUT/DELETE | `/:id` | CRUD |
| PATCH | `/:id/share` | Share with users |

### Dashboard — `/api/dashboard`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/summary` | KPI counts |
| GET | `/task-chart` | Tasks by status |
| GET | `/recent-activity` | Last 8 activities |
| GET | `/project-progress` | Project % completion |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, React Router 7 |
| UI Icons | Lucide React |
| Backend | Python 3, Flask 3.1 |
| Database | MongoDB (via PyMongo) |
| Auth | JWT (flask-jwt-extended) |
| Password | bcrypt |
| CORS | flask-cors |

---

## 🔐 Environment Variables

Edit `Backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=anoryx_db
JWT_SECRET_KEY=change-this-in-production!
```

---

## 🚀 One-Command Start (Windows PowerShell)

```powershell
.\run_all.ps1
```

---

*Built with ❤️ — Anoryx e-Office Suite*

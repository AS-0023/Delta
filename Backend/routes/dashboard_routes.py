from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db

dashboard_bp = Blueprint("dashboard", __name__)


# ── GET /api/dashboard/summary ────────────────────────────────────────────────
@dashboard_bp.route("/summary", methods=["GET"])
@jwt_required()
def summary():
    db = get_db()
    user_id = get_jwt_identity()

    total_projects  = db.projects.count_documents({
        "$or": [{"createdBy": user_id}, {"members": user_id}]
    })
    active_projects = db.projects.count_documents({
        "status": "active",
        "$or": [{"createdBy": user_id}, {"members": user_id}]
    })
    total_tasks = db.tasks.count_documents({
        "$or": [{"createdBy": user_id}, {"assignee": user_id}]
    })
    my_tasks = db.tasks.count_documents({
        "assignee": user_id, "status": {"$ne": "done"}
    })
    total_employees = db.employees.count_documents({})
    pending_leaves  = db.leaves.count_documents({"status": "pending"})
    total_docs      = db.documents.count_documents({
        "$or": [{"createdBy": user_id}, {"sharedWith": user_id}, {"status": "published"}]
    })

    return jsonify({
        "totalProjects":  total_projects,
        "activeProjects": active_projects,
        "totalTasks":     total_tasks,
        "myOpenTasks":    my_tasks,
        "totalEmployees": total_employees,
        "pendingLeaves":  pending_leaves,
        "totalDocuments": total_docs,
    }), 200


# ── GET /api/dashboard/task-chart ─────────────────────────────────────────────
@dashboard_bp.route("/task-chart", methods=["GET"])
@jwt_required()
def task_chart():
    db = get_db()
    statuses = ["todo", "inProgress", "review", "done"]
    data = [{"status": s, "count": db.tasks.count_documents({"status": s})} for s in statuses]
    return jsonify(data), 200


# ── GET /api/dashboard/recent-activity ───────────────────────────────────────
@dashboard_bp.route("/recent-activity", methods=["GET"])
@jwt_required()
def recent_activity():
    db = get_db()
    user_id = get_jwt_identity()
    activities = []

    recent_tasks = list(db.tasks.find(
        {"$or": [{"createdBy": user_id}, {"assignee": user_id}]}
    ).sort("updatedAt", -1).limit(5))
    for t in recent_tasks:
        status_label = {
            "todo": "is To Do", "inProgress": "is In Progress",
            "review": "is In Review", "done": "is Done"
        }.get(t.get("status", ""), t.get("status", ""))
        activities.append({
            "type": "task",
            "action": f"Task \"{t.get('title', 'Untitled')}\" {status_label}",
            "time": t.get("updatedAt", ""),
        })

    recent_docs = list(db.documents.find(
        {"$or": [{"createdBy": user_id}, {"sharedWith": user_id}]}
    ).sort("updatedAt", -1).limit(3))
    for d in recent_docs:
        activities.append({
            "type": "document",
            "action": f"Document \"{d.get('title', 'Untitled')}\" updated",
            "time": d.get("updatedAt", ""),
        })

    activities.sort(key=lambda x: x.get("time", ""), reverse=True)
    return jsonify(activities[:8]), 200


# ── GET /api/dashboard/project-progress ──────────────────────────────────────
@dashboard_bp.route("/project-progress", methods=["GET"])
@jwt_required()
def project_progress():
    db = get_db()
    user_id = get_jwt_identity()
    projects = list(db.projects.find(
        {"$or": [{"createdBy": user_id}, {"members": user_id}], "status": "active"}
    ).limit(6))

    result = []
    for p in projects:
        pid   = str(p["_id"])
        total = db.tasks.count_documents({"projectId": pid})
        done  = db.tasks.count_documents({"projectId": pid, "status": "done"})
        result.append({
            "name":     p.get("name", "Unnamed"),
            "total":    total,
            "done":     done,
            "progress": round((done / total * 100) if total else 0, 1),
        })
    return jsonify(result), 200

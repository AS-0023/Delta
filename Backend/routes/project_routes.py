from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db
from bson import ObjectId
from datetime import datetime

project_bp = Blueprint("projects", __name__)


def serialize_project(p):
    return {
        "id":          str(p["_id"]),
        "name":        p.get("name", ""),
        "description": p.get("description", ""),
        "key":         p.get("key", ""),
        "status":      p.get("status", "active"),
        "type":        p.get("type", "scrum"),
        "lead":        p.get("lead", ""),
        "members":     p.get("members", []),
        "startDate":   p.get("startDate", ""),
        "endDate":     p.get("endDate", ""),
        "createdBy":   p.get("createdBy", ""),
        "createdAt":   p.get("createdAt", ""),
        "updatedAt":   p.get("updatedAt", ""),
    }


# ── GET /api/projects ─────────────────────────────────────────────────────────
@project_bp.route("/", methods=["GET"])
@jwt_required()
def list_projects():
    db      = get_db()
    user_id = get_jwt_identity()
    projects = list(db.projects.find({
        "$or": [{"createdBy": user_id}, {"members": user_id}]
    }).sort("createdAt", -1))
    return jsonify([serialize_project(p) for p in projects]), 200


# ── POST /api/projects ────────────────────────────────────────────────────────
@project_bp.route("/", methods=["POST"])
@jwt_required()
def create_project():
    db      = get_db()
    user_id = get_jwt_identity()
    data    = request.get_json()

    name = data.get("name", "").strip()
    if not name:
        return jsonify({"error": "Project name is required"}), 400

    key = data.get("key") or "".join(w[0].upper() for w in name.split()[:3])

    doc = {
        "name":        name,
        "description": data.get("description", ""),
        "key":         key,
        "status":      data.get("status", "active"),
        "type":        data.get("type", "scrum"),
        "lead":        data.get("lead", user_id),
        "members":     list(set(data.get("members", []) + [user_id])),
        "startDate":   data.get("startDate", ""),
        "endDate":     data.get("endDate", ""),
        "createdBy":   user_id,
        "createdAt":   datetime.utcnow().isoformat(),
        "updatedAt":   datetime.utcnow().isoformat(),
    }
    result    = db.projects.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(serialize_project(doc)), 201


# ── GET /api/projects/<id> ────────────────────────────────────────────────────
@project_bp.route("/<project_id>", methods=["GET"])
@jwt_required()
def get_project(project_id):
    db = get_db()
    try:
        p = db.projects.find_one({"_id": ObjectId(project_id)})
    except Exception:
        return jsonify({"error": "Invalid project ID"}), 400
    if not p:
        return jsonify({"error": "Project not found"}), 404
    return jsonify(serialize_project(p)), 200


# ── PUT /api/projects/<id> ────────────────────────────────────────────────────
@project_bp.route("/<project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    db   = get_db()
    data = request.get_json()

    allowed = ["name", "description", "status", "type", "lead", "members", "startDate", "endDate"]
    update  = {k: data[k] for k in allowed if k in data}
    update["updatedAt"] = datetime.utcnow().isoformat()

    try:
        db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": update})
        updated = db.projects.find_one({"_id": ObjectId(project_id)})
    except Exception:
        return jsonify({"error": "Invalid project ID"}), 400
    return jsonify(serialize_project(updated)), 200


# ── DELETE /api/projects/<id> ─────────────────────────────────────────────────
@project_bp.route("/<project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    db = get_db()
    try:
        db.projects.delete_one({"_id": ObjectId(project_id)})
        db.tasks.delete_many({"projectId": project_id})
    except Exception:
        return jsonify({"error": "Invalid project ID"}), 400
    return jsonify({"message": "Project and its tasks deleted"}), 200


# ── GET /api/projects/<id>/stats ──────────────────────────────────────────────
@project_bp.route("/<project_id>/stats", methods=["GET"])
@jwt_required()
def project_stats(project_id):
    db    = get_db()
    total = db.tasks.count_documents({"projectId": project_id})
    done  = db.tasks.count_documents({"projectId": project_id, "status": "done"})
    in_p  = db.tasks.count_documents({"projectId": project_id, "status": "inProgress"})
    todo  = db.tasks.count_documents({"projectId": project_id, "status": "todo"})
    return jsonify({
        "total": total, "done": done, "inProgress": in_p, "todo": todo,
        "progress": round((done / total * 100) if total else 0, 1),
    }), 200

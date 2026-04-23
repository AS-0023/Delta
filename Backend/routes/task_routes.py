from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db
from bson import ObjectId
from datetime import datetime

task_bp = Blueprint("tasks", __name__)

VALID_STATUSES = ["todo", "inProgress", "review", "done"]


def serialize_task(t):
    return {
        "id":          str(t["_id"]),
        "title":       t.get("title", ""),
        "description": t.get("description", ""),
        "type":        t.get("type", "task"),
        "status":      t.get("status", "todo"),
        "priority":    t.get("priority", "medium"),
        "projectId":   t.get("projectId", ""),
        "sprint":      t.get("sprint", ""),
        "assignee":    t.get("assignee", ""),
        "reporter":    t.get("reporter", ""),
        "labels":      t.get("labels", []),
        "storyPoints": t.get("storyPoints", 0),
        "dueDate":     t.get("dueDate", ""),
        "comments":    t.get("comments", []),
        "createdBy":   t.get("createdBy", ""),
        "createdAt":   t.get("createdAt", ""),
        "updatedAt":   t.get("updatedAt", ""),
    }


# ── GET /api/tasks ────────────────────────────────────────────────────────────
@task_bp.route("/", methods=["GET"])
@jwt_required()
def list_tasks():
    db      = get_db()
    filters = {}
    for field in ["projectId", "status", "assignee", "sprint", "type", "createdBy"]:
        val = request.args.get(field)
        if val:
            filters[field] = val
    tasks = list(db.tasks.find(filters).sort("createdAt", -1))
    return jsonify([serialize_task(t) for t in tasks]), 200


# ── POST /api/tasks ───────────────────────────────────────────────────────────
@task_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    db      = get_db()
    user_id = get_jwt_identity()
    data    = request.get_json()

    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "Task title is required"}), 400

    doc = {
        "title":       title,
        "description": data.get("description", ""),
        "type":        data.get("type", "task"),
        "status":      data.get("status", "todo"),
        "priority":    data.get("priority", "medium"),
        "projectId":   data.get("projectId", ""),
        "sprint":      data.get("sprint", ""),
        "assignee":    data.get("assignee", ""),
        "reporter":    data.get("reporter", user_id),
        "labels":      data.get("labels", []),
        "storyPoints": int(data.get("storyPoints", 0)),
        "dueDate":     data.get("dueDate", ""),
        "comments":    [],
        "createdBy":   user_id,
        "createdAt":   datetime.utcnow().isoformat(),
        "updatedAt":   datetime.utcnow().isoformat(),
    }
    result    = db.tasks.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(serialize_task(doc)), 201


# ── GET /api/tasks/<id> ───────────────────────────────────────────────────────
@task_bp.route("/<task_id>", methods=["GET"])
@jwt_required()
def get_task(task_id):
    db = get_db()
    try:
        t = db.tasks.find_one({"_id": ObjectId(task_id)})
    except Exception:
        return jsonify({"error": "Invalid task ID"}), 400
    if not t:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(serialize_task(t)), 200


# ── PUT /api/tasks/<id> ───────────────────────────────────────────────────────
@task_bp.route("/<task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    db   = get_db()
    data = request.get_json()

    allowed = ["title", "description", "type", "status", "priority",
               "assignee", "sprint", "labels", "storyPoints", "dueDate"]
    update  = {k: data[k] for k in allowed if k in data}
    update["updatedAt"] = datetime.utcnow().isoformat()

    try:
        db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": update})
        updated = db.tasks.find_one({"_id": ObjectId(task_id)})
    except Exception:
        return jsonify({"error": "Invalid task ID"}), 400
    return jsonify(serialize_task(updated)), 200


# ── DELETE /api/tasks/<id> ────────────────────────────────────────────────────
@task_bp.route("/<task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    db = get_db()
    try:
        db.tasks.delete_one({"_id": ObjectId(task_id)})
    except Exception:
        return jsonify({"error": "Invalid task ID"}), 400
    return jsonify({"message": "Task deleted"}), 200


# ── POST /api/tasks/<id>/comments ─────────────────────────────────────────────
@task_bp.route("/<task_id>/comments", methods=["POST"])
@jwt_required()
def add_comment(task_id):
    db      = get_db()
    user_id = get_jwt_identity()
    data    = request.get_json()
    text    = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "Comment text required"}), 400

    comment = {
        "id":        str(ObjectId()),
        "author":    user_id,
        "text":      text,
        "createdAt": datetime.utcnow().isoformat(),
    }
    try:
        db.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$push": {"comments": comment},
             "$set":  {"updatedAt": datetime.utcnow().isoformat()}}
        )
    except Exception:
        return jsonify({"error": "Invalid task ID"}), 400
    return jsonify(comment), 201


# ── PATCH /api/tasks/<id>/status ──────────────────────────────────────────────
@task_bp.route("/<task_id>/status", methods=["PATCH"])
@jwt_required()
def move_task(task_id):
    db         = get_db()
    data       = request.get_json()
    new_status = data.get("status")

    if new_status not in VALID_STATUSES:
        return jsonify({"error": f"status must be one of {VALID_STATUSES}"}), 400

    try:
        db.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": new_status, "updatedAt": datetime.utcnow().isoformat()}}
        )
        updated = db.tasks.find_one({"_id": ObjectId(task_id)})
    except Exception:
        return jsonify({"error": "Invalid task ID"}), 400
    return jsonify(serialize_task(updated)), 200

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db
from bson import ObjectId

user_bp = Blueprint("users", __name__)


def serialize_user(u):
    return {
        "id":         str(u["_id"]),
        "name":       u.get("name", ""),
        "email":      u.get("email", ""),
        "role":       u.get("role", "employee"),
        "department": u.get("department", ""),
        "avatar":     u.get("avatar", ""),
        "createdAt":  u.get("createdAt", ""),
    }


# ── GET /api/users ────────────────────────────────────────────────────────────
@user_bp.route("/", methods=["GET"])
@jwt_required()
def list_users():
    db = get_db()
    users = list(db.users.find({}, {"password": 0}))
    return jsonify([serialize_user(u) for u in users]), 200


# ── GET /api/users/<id> ───────────────────────────────────────────────────────
@user_bp.route("/<user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    db = get_db()
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(serialize_user(user)), 200


# ── PUT /api/users/<id> ───────────────────────────────────────────────────────
@user_bp.route("/<user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    db = get_db()
    me   = get_jwt_identity()
    data = request.get_json()

    # Only admin or the user themselves can update
    try:
        requester = db.users.find_one({"_id": ObjectId(me)})
    except Exception:
        return jsonify({"error": "Unauthorised"}), 403

    if str(me) != user_id and requester.get("role") != "admin":
        return jsonify({"error": "Forbidden"}), 403

    allowed = ["name", "department", "avatar"]
    # Only admins can change roles
    if requester.get("role") == "admin":
        allowed.append("role")

    update = {k: data[k] for k in allowed if k in data}
    if not update:
        return jsonify({"error": "No valid fields to update"}), 400

    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update})
    updated = db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    return jsonify(serialize_user(updated)), 200


# ── DELETE /api/users/<id> ────────────────────────────────────────────────────
@user_bp.route("/<user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    db = get_db()
    me = get_jwt_identity()
    try:
        requester = db.users.find_one({"_id": ObjectId(me)})
    except Exception:
        return jsonify({"error": "Unauthorised"}), 403

    if requester.get("role") != "admin":
        return jsonify({"error": "Admin access required"}), 403

    db.users.delete_one({"_id": ObjectId(user_id)})
    return jsonify({"message": "User deleted"}), 200

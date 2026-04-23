from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from db import get_db
import bcrypt
from bson import ObjectId
from datetime import datetime

auth_bp = Blueprint("auth", __name__)


def serialize_user(user):
    return {
        "id":         str(user["_id"]),
        "name":       user.get("name", ""),
        "email":      user.get("email", ""),
        "role":       user.get("role", "employee"),
        "department": user.get("department", ""),
        "avatar":     user.get("avatar", ""),
        "createdAt":  user.get("createdAt", ""),
    }


def hash_pw(password: str) -> bytes:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())


def check_pw(password: str, hashed) -> bool:
    if isinstance(hashed, str):
        hashed = hashed.encode("utf-8")
    return bcrypt.checkpw(password.encode("utf-8"), hashed)


# ── POST /api/auth/register ───────────────────────────────────────────────────
@auth_bp.route("/register", methods=["POST"])
def register():
    db   = get_db()
    data = request.get_json() or {}

    name     = data.get("name", "").strip()
    email    = data.get("email", "").strip().lower()
    password = data.get("password", "")
    role     = data.get("role", "employee")

    if not name or not email or not password:
        return jsonify({"error": "name, email and password are required"}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400
    if db.users.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    user_doc = {
        "name":       name,
        "email":      email,
        "password":   hash_pw(password),
        "role":       role if role in ["employee", "manager", "admin"] else "employee",
        "department": data.get("department", ""),
        "avatar":     "",
        "createdAt":  datetime.utcnow().isoformat(),
    }
    result     = db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    token      = create_access_token(identity=str(result.inserted_id))
    return jsonify({"token": token, "user": serialize_user(user_doc)}), 201


# ── POST /api/auth/login ──────────────────────────────────────────────────────
@auth_bp.route("/login", methods=["POST"])
def login():
    db   = get_db()
    data = request.get_json() or {}

    email    = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    user = db.users.find_one({"email": email})
    if not user or not check_pw(password, user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user["_id"]))
    return jsonify({"token": token, "user": serialize_user(user)}), 200


# ── GET /api/auth/me ──────────────────────────────────────────────────────────
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    db      = get_db()
    user_id = get_jwt_identity()
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return jsonify({"error": "Invalid token"}), 401
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(serialize_user(user)), 200


# ── PUT /api/auth/change-password ─────────────────────────────────────────────
@auth_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():
    db      = get_db()
    user_id = get_jwt_identity()
    data    = request.get_json() or {}

    old_pw = data.get("oldPassword", "")
    new_pw = data.get("newPassword", "")

    if not old_pw or not new_pw:
        return jsonify({"error": "oldPassword and newPassword are required"}), 400
    if len(new_pw) < 6:
        return jsonify({"error": "New password must be at least 6 characters"}), 400

    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user or not check_pw(old_pw, user["password"]):
        return jsonify({"error": "Old password is incorrect"}), 401

    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password": hash_pw(new_pw)}}
    )
    return jsonify({"message": "Password updated successfully"}), 200

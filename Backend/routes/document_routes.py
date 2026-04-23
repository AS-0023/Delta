from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db
from bson import ObjectId
from datetime import datetime
import re

document_bp = Blueprint("documents", __name__)


def s_doc(d):
    return {
        "id":         str(d["_id"]),
        "title":      d.get("title", ""),
        "content":    d.get("content", ""),
        "type":       d.get("type", "general"),
        "status":     d.get("status", "draft"),
        "tags":       d.get("tags", []),
        "sharedWith": d.get("sharedWith", []),
        "version":    d.get("version", 1),
        "projectId":  d.get("projectId", ""),
        "createdBy":  d.get("createdBy", ""),
        "updatedBy":  d.get("updatedBy", ""),
        "createdAt":  d.get("createdAt", ""),
        "updatedAt":  d.get("updatedAt", ""),
    }


# ── GET /api/documents ────────────────────────────────────────────────────────
@document_bp.route("/", methods=["GET"])
@jwt_required()
def list_docs():
    db = get_db()
    user_id = get_jwt_identity()

    base_filter = {
        "$or": [
            {"createdBy": user_id},
            {"sharedWith": user_id},
            {"status": "published"},
        ]
    }

    if request.args.get("type"):
        base_filter["type"] = request.args.get("type")
    if request.args.get("status"):
        base_filter["status"] = request.args.get("status")
    if request.args.get("projectId"):
        base_filter["projectId"] = request.args.get("projectId")

    # Simple regex search (no text index needed)
    q = request.args.get("q", "").strip()
    if q:
        base_filter["title"] = {"$regex": re.escape(q), "$options": "i"}

    docs = list(db.documents.find(base_filter).sort("updatedAt", -1))
    return jsonify([s_doc(d) for d in docs]), 200


# ── POST /api/documents ───────────────────────────────────────────────────────
@document_bp.route("/", methods=["POST"])
@jwt_required()
def create_doc():
    db = get_db()
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data.get("title", "").strip():
        return jsonify({"error": "title is required"}), 400

    doc = {
        "title":      data["title"].strip(),
        "content":    data.get("content", ""),
        "type":       data.get("type", "general"),
        "status":     data.get("status", "draft"),
        "tags":       data.get("tags", []),
        "sharedWith": data.get("sharedWith", []),
        "version":    1,
        "projectId":  data.get("projectId", ""),
        "createdBy":  user_id,
        "updatedBy":  user_id,
        "createdAt":  datetime.utcnow().isoformat(),
        "updatedAt":  datetime.utcnow().isoformat(),
    }
    result = db.documents.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(s_doc(doc)), 201


# ── GET /api/documents/<id> ───────────────────────────────────────────────────
@document_bp.route("/<doc_id>", methods=["GET"])
@jwt_required()
def get_doc(doc_id):
    db = get_db()
    try:
        d = db.documents.find_one({"_id": ObjectId(doc_id)})
    except Exception:
        return jsonify({"error": "Invalid document ID"}), 400
    if not d:
        return jsonify({"error": "Document not found"}), 404
    return jsonify(s_doc(d)), 200


# ── PUT /api/documents/<id> ───────────────────────────────────────────────────
@document_bp.route("/<doc_id>", methods=["PUT"])
@jwt_required()
def update_doc(doc_id):
    db = get_db()
    user_id = get_jwt_identity()
    data = request.get_json()

    allowed = ["title", "content", "type", "status", "tags", "sharedWith", "projectId"]
    update  = {k: data[k] for k in allowed if k in data}
    update["updatedBy"]  = user_id
    update["updatedAt"]  = datetime.utcnow().isoformat()

    db.documents.update_one(
        {"_id": ObjectId(doc_id)},
        {"$set": update, "$inc": {"version": 1}}
    )
    updated = db.documents.find_one({"_id": ObjectId(doc_id)})
    return jsonify(s_doc(updated)), 200


# ── DELETE /api/documents/<id> ────────────────────────────────────────────────
@document_bp.route("/<doc_id>", methods=["DELETE"])
@jwt_required()
def delete_doc(doc_id):
    db = get_db()
    try:
        db.documents.delete_one({"_id": ObjectId(doc_id)})
    except Exception:
        return jsonify({"error": "Invalid document ID"}), 400
    return jsonify({"message": "Document deleted"}), 200


# ── PATCH /api/documents/<id>/share ──────────────────────────────────────────
@document_bp.route("/<doc_id>/share", methods=["PATCH"])
@jwt_required()
def share_doc(doc_id):
    db = get_db()
    data     = request.get_json()
    user_ids = data.get("userIds", [])
    db.documents.update_one(
        {"_id": ObjectId(doc_id)},
        {"$addToSet": {"sharedWith": {"$each": user_ids}}}
    )
    updated = db.documents.find_one({"_id": ObjectId(doc_id)})
    return jsonify(s_doc(updated)), 200

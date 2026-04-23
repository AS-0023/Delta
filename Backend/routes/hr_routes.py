from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db
from bson import ObjectId
from datetime import datetime

hr_bp = Blueprint("hr", __name__)


# ── Serializers ───────────────────────────────────────────────────────────────

def s_employee(e):
    return {
        "id":          str(e["_id"]),
        "userId":      e.get("userId", ""),
        "name":        e.get("name", ""),
        "email":       e.get("email", ""),
        "phone":       e.get("phone", ""),
        "department":  e.get("department", ""),
        "designation": e.get("designation", ""),
        "employeeId":  e.get("employeeId", ""),
        "joinDate":    e.get("joinDate", ""),
        "salary":      e.get("salary", 0),
        "status":      e.get("status", "active"),
        "manager":     e.get("manager", ""),
        "createdAt":   e.get("createdAt", ""),
    }


def s_leave(l):
    return {
        "id":           str(l["_id"]),
        "employeeId":   l.get("employeeId", ""),
        "employeeName": l.get("employeeName", ""),
        "type":         l.get("type", "casual"),
        "fromDate":     l.get("fromDate", ""),
        "toDate":       l.get("toDate", ""),
        "days":         l.get("days", 1),
        "reason":       l.get("reason", ""),
        "status":       l.get("status", "pending"),
        "approvedBy":   l.get("approvedBy", ""),
        "createdAt":    l.get("createdAt", ""),
    }


def s_payroll(p):
    return {
        "id":           str(p["_id"]),
        "employeeId":   p.get("employeeId", ""),
        "employeeName": p.get("employeeName", ""),
        "month":        p.get("month", ""),
        "year":         p.get("year", ""),
        "basicSalary":  p.get("basicSalary", 0),
        "allowances":   p.get("allowances", 0),
        "deductions":   p.get("deductions", 0),
        "netSalary":    p.get("netSalary", 0),
        "status":       p.get("status", "pending"),
        "paidOn":       p.get("paidOn", ""),
        "createdAt":    p.get("createdAt", ""),
    }


# ═══════════════════════════ EMPLOYEES ═══════════════════════════════════════

@hr_bp.route("/employees", methods=["GET"])
@jwt_required()
def list_employees():
    db      = get_db()
    filters = {}
    if request.args.get("department"):
        filters["department"] = request.args.get("department")
    if request.args.get("status"):
        filters["status"] = request.args.get("status")
    employees = list(db.employees.find(filters).sort("name", 1))
    return jsonify([s_employee(e) for e in employees]), 200


@hr_bp.route("/employees", methods=["POST"])
@jwt_required()
def create_employee():
    db   = get_db()
    data = request.get_json() or {}

    if not data.get("name", "").strip() or not data.get("email", "").strip():
        return jsonify({"error": "name and email are required"}), 400

    count  = db.employees.count_documents({})
    emp_id = f"EMP{str(count + 1).zfill(4)}"

    doc = {
        "userId":      data.get("userId", ""),
        "name":        data["name"].strip(),
        "email":       data["email"].strip().lower(),
        "phone":       data.get("phone", ""),
        "department":  data.get("department", ""),
        "designation": data.get("designation", ""),
        "employeeId":  emp_id,
        "joinDate":    data.get("joinDate", datetime.utcnow().strftime("%Y-%m-%d")),
        "salary":      float(data.get("salary", 0)),
        "status":      "active",
        "manager":     data.get("manager", ""),
        "createdAt":   datetime.utcnow().isoformat(),
    }
    result     = db.employees.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(s_employee(doc)), 201


@hr_bp.route("/employees/<emp_id>", methods=["GET"])
@jwt_required()
def get_employee(emp_id):
    db = get_db()
    try:
        e = db.employees.find_one({"_id": ObjectId(emp_id)})
    except Exception:
        return jsonify({"error": "Invalid employee ID"}), 400
    if not e:
        return jsonify({"error": "Employee not found"}), 404
    return jsonify(s_employee(e)), 200


@hr_bp.route("/employees/<emp_id>", methods=["PUT"])
@jwt_required()
def update_employee(emp_id):
    db   = get_db()
    data = request.get_json() or {}

    allowed = ["name", "phone", "department", "designation", "salary", "status", "manager"]
    update  = {k: data[k] for k in allowed if k in data}
    if "salary" in update:
        update["salary"] = float(update["salary"])

    try:
        db.employees.update_one({"_id": ObjectId(emp_id)}, {"$set": update})
        updated = db.employees.find_one({"_id": ObjectId(emp_id)})
    except Exception:
        return jsonify({"error": "Invalid employee ID"}), 400
    return jsonify(s_employee(updated)), 200


@hr_bp.route("/employees/<emp_id>", methods=["DELETE"])
@jwt_required()
def delete_employee(emp_id):
    db = get_db()
    try:
        db.employees.delete_one({"_id": ObjectId(emp_id)})
    except Exception:
        return jsonify({"error": "Invalid employee ID"}), 400
    return jsonify({"message": "Employee removed"}), 200


# ═══════════════════════════ LEAVE ═══════════════════════════════════════════

@hr_bp.route("/leaves", methods=["GET"])
@jwt_required()
def list_leaves():
    db      = get_db()
    filters = {}
    for f in ["employeeId", "status", "type"]:
        if request.args.get(f):
            filters[f] = request.args.get(f)
    leaves = list(db.leaves.find(filters).sort("createdAt", -1))
    return jsonify([s_leave(l) for l in leaves]), 200


@hr_bp.route("/leaves", methods=["POST"])
@jwt_required()
def apply_leave():
    db      = get_db()
    user_id = get_jwt_identity()
    data    = request.get_json() or {}

    if not data.get("fromDate") or not data.get("toDate"):
        return jsonify({"error": "fromDate and toDate are required"}), 400

    try:
        from_d = datetime.strptime(data["fromDate"], "%Y-%m-%d")
        to_d   = datetime.strptime(data["toDate"],   "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Dates must be in YYYY-MM-DD format"}), 400

    days = max((to_d - from_d).days + 1, 1)

    doc = {
        "employeeId":   data.get("employeeId", user_id),
        "employeeName": data.get("employeeName", ""),
        "type":         data.get("type", "casual"),
        "fromDate":     data["fromDate"],
        "toDate":       data["toDate"],
        "days":         days,
        "reason":       data.get("reason", ""),
        "status":       "pending",
        "approvedBy":   "",
        "createdAt":    datetime.utcnow().isoformat(),
    }
    result     = db.leaves.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(s_leave(doc)), 201


@hr_bp.route("/leaves/<leave_id>/approve", methods=["PATCH"])
@jwt_required()
def approve_leave(leave_id):
    db       = get_db()
    approver = get_jwt_identity()
    data     = request.get_json() or {}
    action   = data.get("action", "approved")

    if action not in ["approved", "rejected"]:
        return jsonify({"error": "action must be 'approved' or 'rejected'"}), 400

    try:
        db.leaves.update_one(
            {"_id": ObjectId(leave_id)},
            {"$set": {"status": action, "approvedBy": approver}}
        )
        updated = db.leaves.find_one({"_id": ObjectId(leave_id)})
    except Exception:
        return jsonify({"error": "Invalid leave ID"}), 400
    return jsonify(s_leave(updated)), 200


# ═══════════════════════════ PAYROLL ═════════════════════════════════════════

@hr_bp.route("/payroll", methods=["GET"])
@jwt_required()
def list_payroll():
    db      = get_db()
    filters = {}
    for f in ["employeeId", "month", "year", "status"]:
        if request.args.get(f):
            filters[f] = request.args.get(f)
    records = list(db.payroll.find(filters).sort("createdAt", -1))
    return jsonify([s_payroll(r) for r in records]), 200


@hr_bp.route("/payroll", methods=["POST"])
@jwt_required()
def create_payroll():
    db    = get_db()
    data  = request.get_json() or {}
    basic  = float(data.get("basicSalary", 0))
    allow  = float(data.get("allowances",  0))
    deduct = float(data.get("deductions",  0))
    net    = basic + allow - deduct

    doc = {
        "employeeId":   data.get("employeeId", ""),
        "employeeName": data.get("employeeName", ""),
        "month":        data.get("month", ""),
        "year":         data.get("year", str(datetime.utcnow().year)),
        "basicSalary":  basic,
        "allowances":   allow,
        "deductions":   deduct,
        "netSalary":    net,
        "status":       "pending",
        "paidOn":       "",
        "createdAt":    datetime.utcnow().isoformat(),
    }
    result     = db.payroll.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(s_payroll(doc)), 201


@hr_bp.route("/payroll/<record_id>/pay", methods=["PATCH"])
@jwt_required()
def mark_paid(record_id):
    db = get_db()
    try:
        db.payroll.update_one(
            {"_id": ObjectId(record_id)},
            {"$set": {"status": "paid", "paidOn": datetime.utcnow().isoformat()}}
        )
        updated = db.payroll.find_one({"_id": ObjectId(record_id)})
    except Exception:
        return jsonify({"error": "Invalid payroll ID"}), 400
    return jsonify(s_payroll(updated)), 200


# ═══════════════════════════ DEPARTMENTS ═════════════════════════════════════

@hr_bp.route("/departments", methods=["GET"])
@jwt_required()
def list_departments():
    db       = get_db()
    pipeline = [
        {"$group": {"_id": "$department", "count": {"$sum": 1}}},
        {"$sort":  {"_id": 1}},
    ]
    result = list(db.employees.aggregate(pipeline))
    return jsonify([{"name": r["_id"], "count": r["count"]} for r in result if r["_id"]]), 200

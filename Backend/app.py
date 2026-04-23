from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.project_routes import project_bp
from routes.task_routes import task_bp
from routes.hr_routes import hr_bp
from routes.document_routes import document_bp
from routes.dashboard_routes import dashboard_bp

load_dotenv()

app = Flask(__name__)

# ── Config ───────────────────────────────────────────────────────────────────
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "anoryx-super-secret-change-in-prod")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False   # long-lived for dev; use timedelta in prod

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
jwt = JWTManager(app)

# ── Register Blueprints ───────────────────────────────────────────────────────
app.register_blueprint(auth_bp,      url_prefix="/api/auth")
app.register_blueprint(user_bp,      url_prefix="/api/users")
app.register_blueprint(project_bp,   url_prefix="/api/projects")
app.register_blueprint(task_bp,      url_prefix="/api/tasks")
app.register_blueprint(hr_bp,        url_prefix="/api/hr")
app.register_blueprint(document_bp,  url_prefix="/api/documents")
app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

@app.route("/")
def health():
    return {"status": "ok", "message": "Anoryx API running"}, 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)

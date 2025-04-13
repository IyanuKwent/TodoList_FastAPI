

This project is a full-stack To-Do List app using a **FastAPI backend** and a **React frontend**, with a PostgreSQL database deployed on Render.

---

## 📦 Tech Stack

- **Frontend**: React (Netlify)
- **Backend**: FastAPI + SQLAlchemy + Pydantic (Render)
- **Database**: PostgreSQL (Render)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic

---

## 🚀 Setup Instructions

### 1. Backend (FastAPI)
```bash
git clone https://github.com/IyanuKwent/django_fastAPI
pip install -r requirements.txt
uvicorn main:app --reload

Method	Endpoint	Description	Request Body (JSON)
GET	/tasks	Get all tasks	–
POST	/tasks	Create a task	{ "text": "Buy milk" }
PUT	/tasks/{task_id}	Update a task	{ "text": "New Text", "completed": true }
PUT	/tasks/{task_id}/toggle	Toggle task completion	–
DELETE	/tasks/{task_id}	Delete a task	–
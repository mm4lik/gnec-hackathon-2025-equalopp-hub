# API Routes
from fastapi import APIRouter, Depends, HTTPException
from .models import User, QuizAnswer
from .database import users_collection
from .auth import hash_password, verify_password, create_token
from .ai_engine import basic_feedback

router = APIRouter()

@router.post("/register")
def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "password": hashed})
    return {"message": "User registered successfully."}

@router.post("/login")
def login(user: User):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    token = create_token({"sub": user.email})
    return {"access_token": token}

@router.post("/submit-quiz")
def submit_quiz(answer: QuizAnswer):
    feedback = basic_feedback(answer.answers)
    return {"feedback": feedback}

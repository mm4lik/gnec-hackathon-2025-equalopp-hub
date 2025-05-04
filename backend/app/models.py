# User and Quiz Answer models
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    password: str

class QuizAnswer(BaseModel):
    user_id: str
    answers: list

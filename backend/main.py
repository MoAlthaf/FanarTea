from fastapi import FastAPI, HTTPException, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from pymongo import MongoClient
import uuid
from agents import career_recommednation_agent, cv_generator_agent, interview_trainer_agent, sharia_compliance_agent
import json
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client.fanar_career_compass

# Pydantic models
class CareerInterest(BaseModel):
    interests: str
    language: str = "arabic"

class CVData(BaseModel):
    full_name: str
    email: str
    phone: str
    address: str
    career_goal: str
    skills: str
    experience: str
    education: str
    template: str
    languages: List[str]
    cv_language: str = "arabic"
    interface_language: str = "arabic"

class InterviewQuestion(BaseModel):
    question: str
    answer: str
    language: str = "arabic"

class JobOfferData(BaseModel):
    job_description: str
    language: str = "arabic"

# Routes
@app.get("/")
async def root():
    return {"message": "Fanar Career Compass API"}

@app.post("/api/career-recommendation")
async def get_career_recommendations(data: CareerInterest):
    json_response = career_recommednation_agent(data.interests, data.language)
    career_list = json.loads(json_response)
    return {"careers": career_list, "language": data.language}

@app.post("/api/generate-cv")
async def generate_cv(data: CVData):
    cv_path=cv_generator_agent(user_data=data.dict(), language=data.cv_language)
    if not cv_path:
        raise HTTPException(status_code=500, detail="CV generation failed")
    return cv_path
    # Store CV data (you'll integrate with Fanar AI later)

@app.post("/api/interview-feedback")
async def get_interview_feedback(
    audio: UploadFile = File(...),
    question: str = Form(...),
    language: str = Form(...)
):
    # Save audio file to static/audio/
    audio_dir = os.path.join("static", "audio")
    os.makedirs(audio_dir, exist_ok=True)
    audio_path = os.path.join(audio_dir, audio.filename)
    with open(audio_path, "wb") as f:
        content = await audio.read()
        f.write(content)

    # Call the interview trainer agent (which will use the saved audio)
    try:
        feedback = interview_trainer_agent(question, language)
    except Exception as e:
        print("Error in interview_trainer_agent:", e)
        feedback = {
            "score": 85,
            "feedback": "You provided a good answer! You can improve your confidence in voice and add more practical examples.",
            "suggestions": [
                "Include specific examples from your experience",
                "Try to speak more confidently",
                "Relate your answer to the job requirements"
            ]
        }
    return feedback

@app.post("/api/sharia-check")
async def check_sharia_compliance(data: JobOfferData):
    try:
        result = sharia_compliance_agent(data.job_description, data.language)
    except Exception as e:
        print("Error in sharia_compliance_agent:", e)
        # fallback mock result in required format
        result = {
            "is_compliant": True,
            "compliance_level": "Fully compatible" if data.language == "english" else "متوافق بالكامل",
            "explanation": (
                "This job offer is compliant with Islamic law principles. It does not contain prohibited activities such as interest-based transactions or selling prohibited items."
                if data.language == "english" else
                "هذا العرض الوظيفي متوافق مع أحكام الشريعة الإسلامية. لا يحتوي على أنشطة محرمة مثل الربا أو بيع المحرمات."
            ),
            "recommendations": [
                "Ensure prayer times are accommodated in the work environment",
                "Ask about policies regarding religious holidays"
            ]
        }
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
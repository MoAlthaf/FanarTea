from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from pymongo import MongoClient
import uuid

app = FastAPI()

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
    career_goal: str
    skills: str
    experience: str
    education: str
    languages: List[str]
    cv_language: str = "arabic"

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
    # Placeholder for Fanar AI integration
    # Mock response for now
    mock_careers = [
        {
            "title": "Althaf",
            "description": "تطوير التطبيقات والمواقع الإلكترونية باستخدام أحدث التقنيات",
            "skills_needed": ["البرمجة", "حل المشكلات", "العمل الجماعي"],
            "salary_range": "15,000 - 25,000 ريال"
        },
        {
            "title": "مصمم جرافيك",
            "description": "إنشاء التصميمات البصرية للعلامات التجارية والمنتجات",
            "skills_needed": ["الإبداع", "برامج التصميم", "التواصل البصري"],
            "salary_range": "8,000 - 18,000 ريال"
        },
        {
            "title": "محلل بيانات",
            "description": "تحليل البيانات واستخراج الرؤى التجارية المفيدة",
            "skills_needed": ["الرياضيات", "البرمجة", "التحليل النقدي"],
            "salary_range": "12,000 - 22,000 ريال"
        }
    ]
    
    return {"careers": mock_careers, "language": data.language}

@app.post("/api/generate-cv")
async def generate_cv(data: CVData):
    # Placeholder for Fanar AI integration
    # Mock CV generation
    cv_id = str(uuid.uuid4())
    
    # Store CV data (you'll integrate with Fanar AI later)
    cv_collection = db.cvs
    cv_document = {
        "cv_id": cv_id,
        "full_name": data.full_name,
        "career_goal": data.career_goal,
        "skills": data.skills,
        "experience": data.experience,
        "education": data.education,
        "languages": data.languages,
        "cv_language": data.cv_language,
        "generated_cv": f"سيرة ذاتية مُولدة بواسطة الذكاء الاصطناعي لـ {data.full_name}"
    }
    
    cv_collection.insert_one(cv_document)
    
    return {
        "cv_id": cv_id,
        "generated_cv": cv_document["generated_cv"],
        "message": "تم إنشاء السيرة الذاتية بنجاح"
    }

@app.post("/api/interview-feedback")
async def get_interview_feedback(data: InterviewQuestion):
    # Placeholder for Fanar AI integration
    mock_feedback = {
        "score": 85,
        "feedback": "إجابة جيدة! يمكنك تحسين الثقة في الصوت وإضافة المزيد من الأمثلة العملية.",
        "suggestions": [
            "استخدم أمثلة محددة من خبرتك",
            "تحدث بثقة أكبر",
            "اربط إجابتك بمتطلبات الوظيفة"
        ]
    }
    
    return mock_feedback

@app.post("/api/sharia-check")
async def check_sharia_compliance(data: JobOfferData):
    # Placeholder for Fanar AI integration
    mock_result = {
        "is_compliant": True,
        "compliance_level": "متوافق بالكامل",
        "explanation": "هذا العرض الوظيفي متوافق مع أحكام الشريعة الإسلامية. لا يحتوي على أنشطة محرمة مثل الربا أو بيع المحرمات.",
        "recommendations": [
            "تأكد من مواعيد الصلاة في بيئة العمل",
            "اسأل عن السياسات المتعلقة بالإجازات الدينية"
        ]
    }
    
    return mock_result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
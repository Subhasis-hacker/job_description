from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.crud import create_job_description, get_job_description
from app.db.session import get_db   # make sure you have a DB session provider
from app.models.request import JobDescriptionRequest
from app.models.response import JobDescriptionResponse

router = APIRouter()

@router.post("/generate")
def generate_jd(request: JobDescriptionRequest, db: Session = Depends(get_db)):
    # Here, call your JD generator logic to create JobDescriptionResponse
    generated = JobDescriptionResponse(
        title="Sample JD",
        about="Sample About",
        responsibilities="Sample Responsibilities",
        required_skills="Skill1, Skill2",
        preferred_skills="Skill3",
        experience="2+ years",
        benefits="Some benefits",
        company_description="Sample company",
        special_requirements="None"
    )
    jd = create_job_description(db, request, generated)
    return jd

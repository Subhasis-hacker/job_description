from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.response import JobDescriptionResponse, DraftListResponse
from app.db.session import get_db
from app.db.crud import get_job_description, get_all_job_descriptions, delete_job_description

router = APIRouter()

@router.get("/drafts", response_model=List[DraftListResponse])
def get_drafts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all saved job descriptions (drafts)
    """
    jds = get_all_job_descriptions(db, skip, limit)
    return [
        DraftListResponse(
            id=jd.id,
            job_title=jd.job_title,
            industry=jd.industry,
            created_at=jd.created_at
        )
        for jd in jds
    ]

@router.get("/drafts/{jd_id}", response_model=JobDescriptionResponse)
def get_draft(jd_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific job description by ID
    """
    jd = get_job_description(db, jd_id)
    if not jd:
        raise HTTPException(status_code=404, detail="Job description not found")
    
    return JobDescriptionResponse(
        id=jd.id,
        title=jd.title,
        about=jd.about,
        responsibilities=jd.responsibilities,
        required_skills=jd.required_skills,
        preferred_skills=jd.preferred_skills,
        experience=jd.experience,
        benefits=jd.benefits,
        company_description=jd.company_description,
        special_requirements=jd.special_requirements,
        created_at=jd.created_at
    )

@router.delete("/drafts/{jd_id}")
def delete_draft(jd_id: int, db: Session = Depends(get_db)):
    """
    Delete a job description
    """
    success = delete_job_description(db, jd_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job description not found")
    
    return {"message": "Job description deleted successfully"}
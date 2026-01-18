from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.request import JobDescriptionRequest
from app.models.response import JobDescriptionResponse
from app.core.generator import generate_job_description
from app.db.session import get_db
from app.db.crud import get_job_description, create_version, get_versions

router = APIRouter()

@router.post("/regenerate/{jd_id}", response_model=JobDescriptionResponse)
def regenerate_jd(jd_id: int, db: Session = Depends(get_db)):
    """
    Regenerate a job description with variations and save as new version
    """
    # Get original job description
    original = get_job_description(db, jd_id)
    if not original:
        raise HTTPException(status_code=404, detail="Job description not found")
    
    # Create request from original data
    request = JobDescriptionRequest(
        job_title=original.job_title,
        industry=original.industry,
        experience_level=original.experience_level,
        skills=original.skills,
        culture=original.culture,
        special_requirements=original.special_requirements,
        company_name=original.company_name
    )
    
    # Generate new version
    new_jd = generate_job_description(request)
    
    # Save as version
    version = create_version(db, jd_id, new_jd)
    
    new_jd.id = version.id
    new_jd.created_at = version.created_at
    
    return new_jd

@router.get("/versions/{jd_id}")
def get_jd_versions(jd_id: int, db: Session = Depends(get_db)):
    """
    Get all versions of a job description
    """
    versions = get_versions(db, jd_id)
    return {
        "original_id": jd_id,
        "version_count": len(versions),
        "versions": [
            {
                "id": v.id,
                "version_number": v.version_number,
                "created_at": v.created_at,
                "title": v.title
            }
            for v in versions
        ]
    }
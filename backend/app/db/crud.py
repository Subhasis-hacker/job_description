from sqlalchemy.orm import Session
from app.db.models import JobDescription, JobDescriptionVersion
from app.models.request import JobDescriptionRequest
from app.models.response import JobDescriptionResponse
from typing import List, Optional

def create_job_description(db: Session, request: JobDescriptionRequest, generated: JobDescriptionResponse) -> JobDescription:
    """Save a generated job description to database"""
    db_jd = JobDescription(
        job_title=request.job_title,
        industry=request.industry,
        experience_level=request.experience_level,
        skills=request.skills,
        culture=request.culture,
        special_requirements=request.special_requirements,
        company_name=request.company_name,
        title=generated.title,
        about=generated.about,
        responsibilities=generated.responsibilities,
        required_skills=generated.required_skills,
        preferred_skills=generated.preferred_skills,
        experience=generated.experience,
        benefits=generated.benefits,
        company_description=generated.company_description
    )
    db.add(db_jd)
    db.commit()
    db.refresh(db_jd)
    return db_jd

def get_job_description(db: Session, jd_id: int) -> Optional[JobDescription]:
    """Get a job description by ID"""
    return db.query(JobDescription).filter(JobDescription.id == jd_id).first()

def get_all_job_descriptions(db: Session, skip: int = 0, limit: int = 100) -> List[JobDescription]:
    """Get all job descriptions with pagination"""
    return db.query(JobDescription).offset(skip).limit(limit).all()

def delete_job_description(db: Session, jd_id: int) -> bool:
    """Delete a job description"""
    jd = db.query(JobDescription).filter(JobDescription.id == jd_id).first()
    if jd:
        db.delete(jd)
        db.commit()
        return True
    return False

def create_version(db: Session, original_id: int, generated: JobDescriptionResponse) -> JobDescriptionVersion:
    """Create a new version of a job description"""
    # Get current version count
    version_count = db.query(JobDescriptionVersion).filter(
        JobDescriptionVersion.original_id == original_id
    ).count()
    
    version = JobDescriptionVersion(
        original_id=original_id,
        version_number=version_count + 1,
        title=generated.title,
        about=generated.about,
        responsibilities=generated.responsibilities,
        required_skills=generated.required_skills,
        preferred_skills=generated.preferred_skills,
        experience=generated.experience,
        benefits=generated.benefits,
        company_description=generated.company_description,
        special_requirements=generated.special_requirements
    )
    db.add(version)
    db.commit()
    db.refresh(version)
    return version

def get_versions(db: Session, original_id: int) -> List[JobDescriptionVersion]:
    """Get all versions of a job description"""
    return db.query(JobDescriptionVersion).filter(
        JobDescriptionVersion.original_id == original_id
    ).order_by(JobDescriptionVersion.version_number).all()
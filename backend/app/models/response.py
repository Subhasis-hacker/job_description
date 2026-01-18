from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class JobDescriptionResponse(BaseModel):
    id: Optional[int] = None
    title: str
    about: str
    responsibilities: List[str]
    required_skills: List[str]
    preferred_skills: List[str]
    experience: str
    benefits: List[str]
    company_description: str
    special_requirements: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class DraftListResponse(BaseModel):
    id: int
    job_title: str
    industry: str
    created_at: datetime

    class Config:
        from_attributes = True
from pydantic import BaseModel, Field
from typing import List, Optional

class JobDescriptionRequest(BaseModel):
    job_title: str = Field(..., min_length=1, description="Job title")
    industry: str = Field(..., description="Industry/Domain")
    experience_level: str = Field(..., description="Experience level: Entry, Mid, or Senior")
    skills: List[str] = Field(..., min_items=3, max_items=10, description="Key skills (3-10)")
    culture: str = Field(..., description="Company culture: Startup, Corporate, or Remote-first")
    special_requirements: Optional[str] = Field(None, description="Special requirements")
    company_name: Optional[str] = Field("Our Company", description="Company name")

    class Config:
        json_schema_extra = {
            "example": {
                "job_title": "Senior Full Stack Developer",
                "industry": "Technology",
                "experience_level": "Senior",
                "skills": ["Python", "React", "Node.js", "AWS"],
                "culture": "Startup",
                "special_requirements": "Must be willing to travel occasionally",
                "company_name": "TechCorp"
            }
        }
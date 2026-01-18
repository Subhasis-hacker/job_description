from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from app.db.session import Base

class JobDescription(Base):
    __tablename__ = "job_descriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String, index=True)
    industry = Column(String)
    experience_level = Column(String)
    skills = Column(JSON)  # Store as JSON array
    culture = Column(String)
    special_requirements = Column(Text, nullable=True)
    company_name = Column(String, default="Our Company")
    
    # Generated content
    title = Column(String)
    about = Column(Text)
    responsibilities = Column(JSON)
    required_skills = Column(JSON)
    preferred_skills = Column(JSON)
    experience = Column(String)
    benefits = Column(JSON)
    company_description = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class JobDescriptionVersion(Base):
    __tablename__ = "job_description_versions"
    
    id = Column(Integer, primary_key=True, index=True)
    original_id = Column(Integer, index=True)
    version_number = Column(Integer)
    
    # Same fields as JobDescription
    title = Column(String)
    about = Column(Text)
    responsibilities = Column(JSON)
    required_skills = Column(JSON)
    preferred_skills = Column(JSON)
    experience = Column(String)
    benefits = Column(JSON)
    company_description = Column(Text)
    special_requirements = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
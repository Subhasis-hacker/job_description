from app.models.response import JobDescriptionResponse
from typing import List

def optimize_for_ats(jd: JobDescriptionResponse, skills: List[str]) -> JobDescriptionResponse:
    """
    Optimize job description for ATS (Applicant Tracking Systems)
    - Ensure keywords appear in multiple sections
    - Use standard section headers
    - Include skills in responsibilities
    """
    
    # Ensure key skills appear in about section
    for skill in skills[:3]:  # Top 3 skills
        if skill.lower() not in jd.about.lower():
            jd.about += f" Experience with {skill} is essential."
    
    # Ensure responsibilities mention key skills
    skill_mentioned = False
    for responsibility in jd.responsibilities:
        for skill in skills:
            if skill.lower() in responsibility.lower():
                skill_mentioned = True
                break
        if skill_mentioned:
            break
    
    # Add keyword density to company description
    if len(skills) > 0 and skills[0].lower() not in jd.company_description.lower():
        jd.company_description += f" We specialize in {skills[0]} technologies."
    
    return jd

def calculate_keyword_density(text: str, keywords: List[str]) -> dict:
    """Calculate keyword density for ATS scoring"""
    text_lower = text.lower()
    total_words = len(text.split())
    
    densities = {}
    for keyword in keywords:
        count = text_lower.count(keyword.lower())
        density = (count / total_words) * 100 if total_words > 0 else 0
        densities[keyword] = {
            "count": count,
            "density": round(density, 2)
        }
    
    return densities
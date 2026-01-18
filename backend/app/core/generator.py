from typing import List
from app.models.request import JobDescriptionRequest
from app.models.response import JobDescriptionResponse
from app.core.skill_map import get_responsibilities_for_skills
from app.core.ats import optimize_for_ats
import random

# Industry templates
INDUSTRY_TEMPLATES = {
    "Technology": {
        "about": "We're seeking a talented {title} to join our innovative team. You'll work on cutting-edge projects that impact millions of users globally.",
        "culture": {
            "Startup": ["Equity options", "Flexible work hours", "Fast-paced environment", "Direct impact on product", "Modern tech stack"],
            "Corporate": ["Comprehensive health benefits", "401k matching", "Professional development budget", "Structured career path", "Work-life balance"],
            "Remote-first": ["Work from anywhere", "Home office stipend", "Flexible timezone", "Annual team retreats", "Collaborative tools"]
        }
    },
    "Finance": {
        "about": "Join our team as a {title} and contribute to building robust financial solutions. You'll work with cutting-edge technology in a regulated, high-stakes environment.",
        "culture": {
            "Startup": ["Competitive compensation", "Performance bonuses", "Modern tech stack", "Collaborative environment", "Fast career growth"],
            "Corporate": ["Comprehensive benefits package", "Retirement planning", "Tuition reimbursement", "Stability and growth", "Industry training"],
            "Remote-first": ["Remote-first culture", "Equipment allowance", "Flexible scheduling", "Virtual team building", "Global team collaboration"]
        }
    },
    "Healthcare": {
        "about": "As a {title}, you'll play a vital role in improving healthcare delivery through technology. Make a real difference in people's lives while working with the latest innovations.",
        "culture": {
            "Startup": ["Mission-driven work", "Health insurance", "Growth opportunities", "Impactful projects", "Innovation focus"],
            "Corporate": ["Full benefits package", "Continuing education", "Work-life balance", "Career advancement", "Comprehensive training"],
            "Remote-first": ["Remote work options", "Flexible hours", "Health and wellness programs", "Collaborative tools", "Team offsites"]
        }
    },
    "E-commerce": {
        "about": "We're looking for a skilled {title} to help us revolutionize online shopping. Join us in creating seamless experiences for millions of customers worldwide.",
        "culture": {
            "Startup": ["Stock options", "Dynamic environment", "Product discounts", "Innovation focus", "Rapid growth"],
            "Corporate": ["Competitive salary", "Employee discounts", "Health benefits", "Professional growth", "Stable environment"],
            "Remote-first": ["Work remotely", "Flexible schedule", "Home office setup", "Regular offsites", "Global opportunities"]
        }
    },
    "Education": {
        "about": "Join us as a {title} and help transform education through technology. You'll create solutions that empower learners and educators worldwide.",
        "culture": {
            "Startup": ["Mission-driven culture", "Flexible benefits", "Learning stipend", "Innovation time", "Direct impact"],
            "Corporate": ["Comprehensive benefits", "Tuition assistance", "Professional development", "Sabbatical programs", "Career growth"],
            "Remote-first": ["Remote flexibility", "Home office budget", "Learning resources", "Team collaboration", "Work-life integration"]
        }
    }
}

# Experience level templates
EXPERIENCE_TEMPLATES = {
    "Entry": {
        "years": "0-2 years",
        "description": "We're looking for motivated individuals eager to start their career and grow with our team",
        "responsibilities": [
            "Learn and apply industry best practices",
            "Collaborate with senior team members on projects",
            "Contribute to team objectives and deliverables",
            "Participate in code reviews and knowledge sharing"
        ]
    },
    "Mid": {
        "years": "3-5 years",
        "description": "We need experienced professionals who can work independently and contribute to key initiatives",
        "responsibilities": [
            "Lead technical initiatives and projects",
            "Mentor junior team members",
            "Drive project completion and quality",
            "Collaborate across teams to deliver solutions"
        ]
    },
    "Senior": {
        "years": "6+ years",
        "description": "We're seeking seasoned experts to lead our technical vision and mentor our team",
        "responsibilities": [
            "Define technical strategy and architecture",
            "Architect scalable and maintainable solutions",
            "Lead and mentor engineering teams",
            "Drive technical excellence across the organization"
        ]
    }
}

def generate_job_description(request: JobDescriptionRequest) -> JobDescriptionResponse:
    """Generate a complete job description from request data"""
    
    # Get templates
    industry_template = INDUSTRY_TEMPLATES.get(request.industry, INDUSTRY_TEMPLATES["Technology"])
    exp_template = EXPERIENCE_TEMPLATES[request.experience_level]
    
    # Generate about section
    about = industry_template["about"].replace("{title}", request.job_title)
    about += " " + exp_template["description"] + "."
    
    # Generate responsibilities
    skill_responsibilities = get_responsibilities_for_skills(request.skills)
    all_responsibilities = exp_template["responsibilities"] + skill_responsibilities
    # Remove duplicates and limit to 7
    unique_responsibilities = list(dict.fromkeys(all_responsibilities))[:7]
    
    # Split skills into required and preferred
    split_index = max(3, len(request.skills) * 6 // 10)  # 60% required
    required_skills = request.skills[:split_index]
    preferred_skills = request.skills[split_index:]
    
    # Add generic preferred skills if needed
    if len(preferred_skills) < 2:
        preferred_skills.extend([
            "Excellent problem-solving and analytical skills",
            "Strong communication and collaboration abilities",
            "Self-motivated with ability to work independently"
        ])
    
    # Get benefits
    benefits = industry_template["culture"][request.culture]
    
    # Generate company description
    company_description = f"We are a {request.culture.lower()} company in the {request.industry.lower()} space, committed to innovation and excellence. "
    company_description += f"At {request.company_name}, we believe in empowering our team to do their best work."
    
    # Generate experience requirement
    experience_req = f"{exp_template['years']} of professional experience in {request.industry.lower()} or related field"
    if request.experience_level == "Senior":
        experience_req += ", with demonstrated leadership experience"
    
    # Create response
    jd = JobDescriptionResponse(
        title=request.job_title,
        about=about,
        responsibilities=unique_responsibilities,
        required_skills=required_skills,
        preferred_skills=preferred_skills,
        experience=experience_req,
        benefits=benefits,
        company_description=company_description,
        special_requirements=request.special_requirements
    )
    
    # Optimize for ATS
    jd = optimize_for_ats(jd, request.skills)
    
    return jd
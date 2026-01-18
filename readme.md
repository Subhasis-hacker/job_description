# AI-Powered Job Description Generator

A full-stack application that generates professional, ATS-friendly job descriptions from minimal input.

## Features

- 🎯 **Smart Template System**: Industry-specific templates with intelligent content generation
- 🔄 **Multi-step Form**: Intuitive step-by-step job description creation
- 📝 **Live Preview**: Real-time preview as you fill the form
- ✏️ **Inline Editing**: Edit generated sections directly
- 💾 **Draft Management**: Save and retrieve job descriptions
- 📋 **Copy/Download**: Easy export to clipboard or text file
- 🔄 **Version Control**: Regenerate with variations
- 🎨 **ATS Optimization**: Keyword density and formatting for applicant tracking systems

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Database (easily replaceable with PostgreSQL/MySQL)
- **Pydantic**: Data validation

### Frontend
- **React 18**: UI library
- **Vite**: Build tool
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Lucide React**: Icon library

## Project Structure
```
job-description-generator/
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Business logic
│   │   ├── db/           # Database layer
│   │   ├── models/       # Pydantic schemas
│   │   └── utils/        # Helper functions
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── services/     # API calls
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Generate Job Description
```http
POST /api/generate
Content-Type: application/json

{
  "job_title": "Senior Full Stack Developer",
  "industry": "Technology",
  "experience_level": "Senior",
  "skills": ["Python", "React", "Node.js", "AWS"],
  "culture": "Startup",
  "special_requirements": "Must be willing to travel",
  "company_name": "TechCorp"
}
```

### Get All Drafts
```http
GET /api/drafts
```

### Get Single Draft
```http
GET /api/drafts/{id}
```

### Delete Draft
```http
DELETE /api/drafts/{id}
```

### Regenerate Job Description
```http
POST /api/regenerate/{id}
```

### Get Versions
```http
GET /api/versions/{id}
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./job_descriptions.db
API_VERSION=v1
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Usage Guide

1. **Create Job Description**
   - Fill in basic job information (title, industry, experience level)
   - Select 3-10 key skills from the list
   - Choose company culture and add special requirements
   - Click "Generate Job Description"

2. **Edit Generated Content**
   - Hover over any section to see the edit icon
   - Click to edit inline
   - Save or cancel changes

3. **Export**
   - Copy to clipboard for easy pasting
   - Download as text file

4. **Manage Drafts**
   - All generated job descriptions are automatically saved
   - View drafts in the Drafts page
   - Delete unwanted drafts

## Customization

### Adding New Industries
Edit `backend/app/core/generator.py` and add to `INDUSTRY_TEMPLATES` dict:
```python
"YourIndustry": {
    "about": "Template text with {title} placeholder",
    "culture": {
        "Startup": ["benefit1", "benefit2"],
        "Corporate": ["benefit1", "benefit2"],
        "Remote-first": ["benefit1", "benefit2"]
    }
}
```

### Adding New Skills
Edit `backend/app/core/skill_map.py` and add to `SKILL_MAPPING` dict:
```python
"YourSkill": [
    "Responsibility 1",
    "Responsibility 2",
    "Responsibility 3"
]
```

## Future Enhancements

- [ ] PDF export with custom styling
- [ ] Multi-language support
- [ ] AI-powered content generation (OpenAI integration)
- [ ] Email sharing
- [ ] Team collaboration features
- [ ] Analytics on generated job descriptions
- [ ] Custom branding/templates

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
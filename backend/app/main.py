from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.api import generate, drafts, versions
from app.db.session import engine, Base

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Job Description Generator API",
    description="AI-Powered Job Description Generator",
    version="1.0.0"
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(drafts.router, prefix="/api", tags=["drafts"])
app.include_router(versions.router, prefix="/api", tags=["versions"])

@app.get("/")
def read_root():
    return {"message": "Job Description Generator API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
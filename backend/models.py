from pydantic import BaseModel
from typing import List, Optional

class Personal(BaseModel):
    name: str
    title: str
    email: str
    location: str
    github: Optional[str] = None
    linkedin: Optional[str] = None

class Experience(BaseModel):
    role: str
    company: str
    period: str
    description: str

class Project(BaseModel):
    name: str
    description: str
    tech: List[str]
    url: Optional[str] = None

class Education(BaseModel):
    degree: str
    school: str
    year: str

class CVData(BaseModel):
    personal: Personal
    experience: List[Experience]
    projects: List[Project]
    skills: List[str]
    education: List[Education]
    template: str = "modern"
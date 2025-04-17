from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status

from backend.deps import db_dependency, user_dependency
from backend.db.models import Workout

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"]
)

class WorkoutBase(BaseModel):
    name: str
    description: Optional[str] = None

class WorkoutCreate(WorkoutBase):
    pass

@router.get("/workouts")
def get_workouts(
    user: user_dependency
):
    
    return {}
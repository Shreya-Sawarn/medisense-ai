
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Health"])

@router.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "medisense-ai",
        "message": "FastAPI backend is running"
    }

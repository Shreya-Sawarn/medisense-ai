
from fastapi import APIRouter

from app.auth import CurrentUser

router = APIRouter(
    prefix="/api",
    tags=["Users"],
)


@router.get("/me")
def get_current_user(user_id: CurrentUser):
    return {
        "authenticated": True,
        "user_id": user_id,
    }

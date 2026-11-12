
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.users import router as users_router

from app.api.health import router as health_router

app = FastAPI(
    title="MediSense AI API",
    description="Backend API for MediSense AI",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"],
    allow_headers=["Authorization", "Content-Type"],
)


app.include_router(health_router)

app.include_router(users_router)

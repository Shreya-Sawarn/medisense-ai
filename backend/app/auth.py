
import os
from typing import Annotated

from clerk_backend_api import (
    AuthenticateRequestOptions,
    authenticate_request,
)
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request

load_dotenv()


def require_user(request: Request) -> str:
    secret_key = os.getenv("CLERK_SECRET_KEY")

    if not secret_key:
        raise RuntimeError("CLERK_SECRET_KEY is missing")

    state = authenticate_request(
        request,
        AuthenticateRequestOptions(
            secret_key=secret_key,
            authorized_parties=[
                "http://localhost:3000"
            ],
            accepts_token=["session_token"],
        ),
    )

    if not state.is_signed_in or not state.payload:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return state.payload["sub"]


CurrentUser = Annotated[str, Depends(require_user)]

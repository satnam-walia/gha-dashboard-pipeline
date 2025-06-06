from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from backend.gha_runner import run_ghaminer_if_needed
import logging
# from transform_kpis import get_latest_kpis

router = APIRouter(prefix="/api")


@router.post("/refresh")
async def refresh(request: Request):
    """
    Triggers a refresh by running GHAminer for the given repo URL and GitHub token.
    """
    data = await request.json()
    print("DEBUG POST BODY:", data)  # <--- Add this line
    repo_url = data.get("repo_url")
    token = data.get("token")

    if not repo_url:
        return JSONResponse(status_code=400,
                            content={"status": "error", "message": "Missing 'repo_url'."})
    if not token:
        print("DEBUG: Missing token in POST body.")
        return JSONResponse(status_code=400,
                            content={"status": "error", "message": "Missing 'GITHUB_TOKEN'."})

    try:
        triggered = run_ghaminer_if_needed(repo_url, token)
        return JSONResponse(content={"status": "refreshed" if triggered else "up-to-date"})
    except Exception as e:
        logging.exception("Failed to run GHAminer")
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})
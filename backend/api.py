from fastapi import APIRouter
from backend.gha_runner import run_ghaminer_if_needed
# from transform_kpis import get_latest_kpis

router = APIRouter()


@router.api_route("/refresh", methods=["GET", "POST"])
def refresh():
    """
    Triggers a refresh by running GHAminer if the last run is stale.
    """
    triggered = run_ghaminer_if_needed()
    return {"status": "refreshed" if triggered else "up-to-date"}

# @router.get("/kpis")
# def kpis():
#     """
#     Returns the latest computed KPIs (from transform_kpis).
#     """
#     return get_latest_kpis()
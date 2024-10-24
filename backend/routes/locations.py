from fastapi import APIRouter, HTTPException, Request
from typing import List
from models.locationModel import Location

router = APIRouter()


@router.get("/", response_model=List[Location])
async def get_godowns(request: Request):
    col = request.app.mongodb["locations"]
    godowns = await col.find({"parent_godown": None}).to_list(500)
    if godowns is None:
        raise HTTPException(status_code=404, detail="Godowns not found")
    return godowns


@router.get("/subgodowns/{parent_id}", response_model=List[Location])
async def get_subgodowns(request: Request, parent_id: str):
    col = request.app.mongodb["locations"]
    godowns = await col.find({"parent_godown": parent_id}).to_list(500)
    if godowns is None:
        raise HTTPException(status_code=404, detail="Subgodowns not found")
    return godowns

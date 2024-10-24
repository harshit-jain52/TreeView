from fastapi import APIRouter, HTTPException, Request
from typing import List
from models.itemModel import Item

router = APIRouter()


@router.get("/godown/{godown_id}", response_model=List[Item])
async def get_godown_items(request: Request, godown_id: str):
    col = request.app.mongodb["items"]
    items = await col.find({"godown_id": godown_id}).to_list(500)
    if items is None:
        raise HTTPException(status_code=404, detail="Godown not found")
    return items


@router.get("/{item_id}", response_model=Item)
async def get_item(request: Request, item_id: str):
    col = request.app.mongodb["items"]
    item = await col.find_one({"item_id": item_id})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

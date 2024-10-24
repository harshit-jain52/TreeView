from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os
from models.itemModel import Item
from models.locationModel import Location
from typing import List


@asynccontextmanager
async def lifespan(app: FastAPI):
    await startup_db_client(app)
    yield
    await shutdown_db_client(app)


async def startup_db_client(app: FastAPI):
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
    app.mongodb = app.mongodb_client.get_database(os.getenv("DB_NAME"))
    print("Connected to MongoDB")


async def shutdown_db_client(app: FastAPI):
    app.mongodb_client.close()
    print("Disconnected from MongoDB")


load_dotenv()
app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"Status": "Healthy"}


@app.get("/api/items/godown/{godown_id}", response_model=List[Item])
async def get_godown_items(godown_id: str):
    items = await app.mongodb["items"].find({"godown_id": godown_id}).to_list(500)
    if items is None:
        raise HTTPException(status_code=404, detail="Godown not found")
    return items


@app.get("/api/items/{item_id}", response_model=Item)
async def get_item(item_id: str):
    item = await app.mongodb["items"].find_one({"item_id": item_id})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.get("/api/locations", response_model=List[Location])
async def get_godowns():
    godowns = await app.mongodb["locations"].find({"parent_godown": None}).to_list(500)
    if godowns is None:
        raise HTTPException(status_code=404, detail="Godowns not found")
    return godowns


@app.get("/api/locations/subgodowns/{parent_id}", response_model=List[Location])
async def get_subgodowns(parent_id: str):
    godowns = await app.mongodb["locations"].find({"parent_godown": parent_id}).to_list(500)
    if godowns is None:
        raise HTTPException(status_code=404, detail="Subgodowns not found")
    return godowns

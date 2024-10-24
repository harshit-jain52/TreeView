from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os
from routes import items, locations


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

app.include_router(items.router, prefix="/api/items", tags=["items"])
app.include_router(locations.router, prefix="/api/locations", tags=["locations"])


@app.get("/")
def read_root():
    return {"Status": "Healthy"}

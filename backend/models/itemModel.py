from pydantic import BaseModel
from enum import Enum


class ItemStatus(str, Enum):
    in_stock = "in_stock"
    out_of_stock = "out_of_stock"


class Item(BaseModel):
    item_id: str
    name: str
    quantity: int
    category: str
    price: float
    status: ItemStatus
    godown_id: str
    brand: str
    attributes: dict
    image_url: str

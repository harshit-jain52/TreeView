from pydantic import BaseModel, Field
from enum import Enum


class ItemStatus(str, Enum):
    in_stock = "in_stock"
    out_of_stock = "out_of_stock"


class Item(BaseModel):
    item_id: str = Field(...)
    name: str = Field(...)
    quantity: int = Field(...)
    category: str = Field(...)
    price: float = Field(...)
    status: ItemStatus = Field(...)
    godown_id: str = Field(...)
    brand: str = Field(...)
    attributes: dict = Field(...)
    image_url: str = Field(...)

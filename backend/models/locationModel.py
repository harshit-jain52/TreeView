from pydantic import BaseModel, Field
from typing import Optional


class Location(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    parent_godown: Optional[str] = None

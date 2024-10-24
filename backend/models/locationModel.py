from pydantic import BaseModel


class Location(BaseModel):
    id: str
    name: str
    parent_godown: str

from sqlalchemy import Column, Integer, String
from Database.database import Base

class User(Base):
    __tablename__ ="users"
    id = Column(Integer, primary_key=True, index=True)
    Name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
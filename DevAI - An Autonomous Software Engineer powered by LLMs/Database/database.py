from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

db_url = "postgresql://postgres:Admin%40123456789@localhost:5432/DevAI"

engine = create_engine(db_url)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

#DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
from pathlib import Path
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
import uvicorn
from Database.database import engine, get_db
from Database.Auth import auth, models, schemas
from DeepSeek.deepseek_http import generate_stream


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Define the base directory as the parent of the 'api' folder (the project root)
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates"
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))


@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    auth.create_user(db, user.username, user.password, user.Name)
    return {"message": "User created successfully"}


@app.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = auth.authenticate_user(db, user.username, user.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": db_user.username, "user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@app.get("/getUser")
def get_user(current_user: models.User = Depends(auth.get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "name": current_user.Name
    }



@app.get("/ask_ai")
def ask_ai(requirement: str,current_user: models.User = Depends(auth.get_current_user)):
    return StreamingResponse(generate_stream(requirement),media_type="text\event-stream")





if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
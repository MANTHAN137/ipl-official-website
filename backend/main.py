from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from ai_service import get_ai_response
from pydantic import BaseModel

app = FastAPI(title="IPL Official Website Backend")

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str
    provider: str
    api_key: str = None

@app.get("/")
def read_root():
    return {"message": "IPL Official Website API is running"}

@app.post("/ask-ai")
async def ask_ai(request: ChatRequest):
    """
    Endpoint to handle AI chat requests.
    """
    # API key is now handled in ai_service if not provided here
    
    response = await get_ai_response(request.prompt, request.provider, request.api_key)
    return {"response": response}

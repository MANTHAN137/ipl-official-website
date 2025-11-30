from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from ai_service import get_ai_response
from pydantic import BaseModel

app = FastAPI(title="IPL Official Website Backend")

# CORS Configuration
origins = [
    "*",
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

@app.get("/photos")
def get_photos():
    """
    Scrapes the latest photos from https://www.iplt20.com/photos
    and returns a random selection.
    """
    import requests
    from bs4 import BeautifulSoup
    import random

    try:
        url = "https://www.iplt20.com/photos"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')
        
        # This selector might need adjustment based on the actual site structure.
        # Looking for images in a typical gallery grid structure.
        # Based on common structures, we look for img tags inside anchors or divs with specific classes.
        # A generic approach for now: find all images that look like content (not icons/logos).
        
        images = []
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src and src.startswith('https') and 'logo' not in src and 'icon' not in src:
                # Filter out small images/icons based on heuristic if possible, 
                # but for now just collecting valid https URLs.
                images.append({
                    "src": src,
                    "alt": img.get('alt', 'IPL Photo')
                })

        # Shuffle and pick a subset to ensure "diff every time"
        random.shuffle(images)
        return {"photos": images[:12]} # Return top 12 random photos

    except Exception as e:
        print(f"Error scraping photos: {e}")
        # Fallback to some placeholders if scraping fails
        return {"photos": [
            {"src": "https://www.iplt20.com/assets/images/ipl-og-image-new.jpg", "alt": "IPL Logo"},
        ]}

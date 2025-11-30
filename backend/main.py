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
        # Robust Fallback with multiple images
        return {"photos": [
            {"src": "https://www.iplt20.com/assets/images/ipl-og-image-new.jpg", "alt": "IPL Official"},
            {"src": "https://documents.iplt20.com/ipl/IPLHeadlines/2024/260524/KKRvSRH_Final_Match_Report.jpg", "alt": "IPL Final Moments"},
            {"src": "https://documents.iplt20.com/ipl/IPLHeadlines/2024/240524/Q2_SRHvRR_Match_Report.jpg", "alt": "Qualifier Action"},
            {"src": "https://documents.iplt20.com/ipl/IPLHeadlines/2024/220524/Eliminator_RRvRCB_Match_Report.jpg", "alt": "Eliminator Thriller"},
            {"src": "https://documents.iplt20.com/ipl/IPLHeadlines/2024/210524/Q1_KKRvSRH_Match_Report.jpg", "alt": "Playoff Intensity"},
            {"src": "https://documents.iplt20.com/ipl/IPLHeadlines/2024/190524/Match_70_RRvKKR_Match_Report.jpg", "alt": "League Stage Finale"},
        ]}

@app.get("/news")
async def get_news():
    """
    Generates 3 recent IPL news headlines using AI.
    """
    try:
        prompt = """
        Generate 3 exciting, recent (or realistic future 2025) news headlines for the IPL.
        Return the data STRICTLY as a JSON array of objects.
        
        Each object should have:
        - "title": A catchy headline.
        - "desc": A short 1-sentence description.
        - "tag": A category tag (e.g., "Auction", "Records", "Match Report").
        - "color": A tailwind color class for the tag accent (e.g., "bg-blue-600", "bg-red-600", "bg-purple-600").
        - "link": A realistic URL to an article (e.g., "https://www.iplt20.com/news/...").

        Do not include any markdown formatting (like ```json). Just the raw JSON string.
        """
        
        # We use a default provider (e.g., gemini) here. 
        # In a real app, we might want to configure this more robustly.
        response = await get_ai_response(prompt, "gemini")
        
        # Clean up potential markdown
        clean_json = response.replace("```json", "").replace("```", "").strip()
        
        import json
        news_items = json.loads(clean_json)
        return {"news": news_items}

    except Exception as e:
        print(f"Error generating news: {e}")
        # Fallback news
        return {"news": [
            {
                "title": "IPL 2025 Schedule Announced",
                "desc": "The BCCI has released the official schedule for the upcoming season.",
                "tag": "Schedule",
                "color": "bg-blue-600",
                "link": "https://www.iplt20.com"
            },
            {
                "title": "Mega Auction Date Set",
                "desc": "Franchises prepare for the biggest auction in December.",
                "tag": "Auction",
                "color": "bg-yellow-600",
                "link": "https://www.iplt20.com"
            },
            {
                "title": "New Rules for Impact Player",
                "desc": "Slight tweaks to the impact player rule to balance the game.",
                "tag": "Rules",
                "color": "bg-red-600",
                "link": "https://www.iplt20.com"
            }
        ]}

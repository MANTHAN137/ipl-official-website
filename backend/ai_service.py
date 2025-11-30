import os
import google.generativeai as genai
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

async def get_ai_response(prompt: str, provider: str, api_key: str = None):
    """
    Generates a response from the specified AI provider.
    """
    try:
        if provider == "gemini":
            key = api_key or os.getenv("GEMINI_API_KEY")
            if not key:
                return "Error: Gemini API Key not found."
            genai.configure(api_key=key)
            model = genai.GenerativeModel('gemini-flash-latest')
            response = model.generate_content(prompt)
            return response.text
        elif provider == "openai":
            key = api_key or os.getenv("OPENAI_API_KEY")
            if not key:
                return "Error: OpenAI API Key not found."
            client = OpenAI(api_key=key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant knowledgeable about the Indian Premier League (IPL) cricket tournament."},
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content
        else:
            return "Invalid provider specified."
    except Exception as e:
        return f"Error communicating with AI provider: {str(e)}"

import yfinance as yf
from textblob import TextBlob

def analyze_sentiment(ticker: str):
    """
    Analyzes sentiment from news headlines for a given ticker.
    """
    try:
        stock = yf.Ticker(ticker)
        news = stock.news
        
        if not news:
            return {"sentiment_score": 0, "sentiment_label": "Neutral", "news_count": 0}

        total_polarity = 0
        count = 0
        headlines = []

        for item in news:
            title = item.get('title', '')
            if title:
                blob = TextBlob(title)
                total_polarity += blob.sentiment.polarity
                count += 1
                headlines.append(title)

        avg_polarity = total_polarity / count if count > 0 else 0
        
        label = "Neutral"
        if avg_polarity > 0.1:
            label = "Positive"
        elif avg_polarity < -0.1:
            label = "Negative"

        return {
            "sentiment_score": avg_polarity,
            "sentiment_label": label,
            "news_count": count,
            "headlines": headlines[:3] # Return top 3 headlines
        }
    except Exception as e:
        return {"error": str(e)}

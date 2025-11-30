import yfinance as yf

def analyze_fundamentals(ticker: str):
    """
    Analyzes fundamental data for a given ticker.
    """
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        
        return {
            "company_name": info.get("longName", ticker),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "peg_ratio": info.get("pegRatio"),
            "price_to_book": info.get("priceToBook"),
            "profit_margins": info.get("profitMargins"),
            "revenue_growth": info.get("revenueGrowth"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "recommendation": info.get("recommendationKey", "none").upper()
        }
    except Exception as e:
        return {"error": str(e)}

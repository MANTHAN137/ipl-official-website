import yfinance as yf

def get_valid_ticker(symbol: str):
    """
    Attempts to find a valid ticker symbol by trying common suffixes (e.g., .NS for India).
    Returns the valid symbol string or None if not found.
    """
    # Clean input
    symbol = symbol.strip().upper()
    
    # List of variations to try
    # 1. As is (e.g., AAPL, TSLA)
    # 2. NSE India (e.g., RELIANCE.NS)
    # 3. BSE India (e.g., RELIANCE.BO)
    variations = [symbol, f"{symbol}.NS", f"{symbol}.BO"]
    
    for try_symbol in variations:
        try:
            ticker = yf.Ticker(try_symbol)
            # Fast check: request 5 days of history. 
            # If empty, it's likely invalid or delisted.
            hist = ticker.history(period="5d")
            if not hist.empty:
                return try_symbol
        except Exception:
            continue
            
    return None

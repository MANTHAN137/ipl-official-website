import yfinance as yf
import pandas_ta as ta
import pandas as pd

def analyze_technicals(ticker: str):
    """
    Analyzes technical indicators for a given ticker.
    """
    try:
        stock = yf.Ticker(ticker)
        df = stock.history(period="1y")
        
        if df.empty:
            return {"error": "No data found for ticker"}

        # Calculate Indicators
        df.ta.rsi(length=14, append=True)
        df.ta.macd(append=True)
        df.ta.bbands(append=True)
        df.ta.sma(length=50, append=True)
        df.ta.sma(length=200, append=True)

        latest = df.iloc[-1]
        
        # Determine Trend
        trend = "Neutral"
        if latest['SMA_50'] > latest['SMA_200']:
            trend = "Bullish"
        elif latest['SMA_50'] < latest['SMA_200']:
            trend = "Bearish"

        # RSI Signal
        rsi = latest['RSI_14']
        rsi_signal = "Neutral"
        if rsi > 70:
            rsi_signal = "Overbought"
        elif rsi < 30:
            rsi_signal = "Oversold"

        return {
            "current_price": latest['Close'],
            "rsi": rsi,
            "rsi_signal": rsi_signal,
            "macd": latest['MACD_12_26_9'],
            "macd_signal": latest['MACDs_12_26_9'],
            "trend": trend,
            "support": latest['BBL_5_2.0'],
            "resistance": latest['BBU_5_2.0']
        }
    except Exception as e:
        return {"error": str(e)}

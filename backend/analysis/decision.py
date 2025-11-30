def make_decision(technical, fundamental, sentiment):
    """
    Aggregates signals to make a trading decision.
    """
    score = 0
    reasons = []

    # Technical Factors
    if technical.get("trend") == "Bullish":
        score += 2
        reasons.append("Technical Trend is Bullish")
    elif technical.get("trend") == "Bearish":
        score -= 2
        reasons.append("Technical Trend is Bearish")

    if technical.get("rsi_signal") == "Oversold":
        score += 1
        reasons.append("RSI indicates Oversold (Potential Buy)")
    elif technical.get("rsi_signal") == "Overbought":
        score -= 1
        reasons.append("RSI indicates Overbought (Potential Sell)")

    # Fundamental Factors
    rec = fundamental.get("recommendation", "NONE")
    if "BUY" in rec:
        score += 2
        reasons.append(f"Analyst Recommendation is {rec}")
    elif "SELL" in rec:
        score -= 2
        reasons.append(f"Analyst Recommendation is {rec}")

    # Sentiment Factors
    sent_label = sentiment.get("sentiment_label")
    if sent_label == "Positive":
        score += 1
        reasons.append("Market Sentiment is Positive")
    elif sent_label == "Negative":
        score -= 1
        reasons.append("Market Sentiment is Negative")

    # Final Decision
    decision = "HOLD"
    confidence = "Low"
    
    if score >= 3:
        decision = "BUY"
        confidence = "High"
    elif score >= 1:
        decision = "BUY"
        confidence = "Medium"
    elif score <= -3:
        decision = "SELL"
        confidence = "High"
    elif score <= -1:
        decision = "SELL"
        confidence = "Medium"

    return {
        "decision": decision,
        "confidence": confidence,
        "score": score,
        "explanation": reasons
    }

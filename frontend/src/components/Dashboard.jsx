import React from 'react';

const Dashboard = ({ data }) => {
    if (!data) return null;

    const { technical, fundamental, sentiment, decision } = data;

    return (
        <div className="flex flex-col gap-6 mt-8">
            {/* Decision Card */}
            <div className="card text-center border-2 border-blue-500">
                <h2 className="text-xl text-secondary mb-2">
                    {fundamental.company_name} <span className="text-sm text-gray-500">({data.ticker})</span>
                </h2>
                <h1 className={`text-3xl font-bold ${decision.decision === 'BUY' ? 'text-success' : decision.decision === 'SELL' ? 'text-danger' : 'text-warning'}`}>
                    {decision.decision}
                </h1>
                <p className="text-secondary mt-2">Confidence: <span className="text-white">{decision.confidence}</span></p>
                <div className="mt-4 text-left bg-slate-800 p-4 rounded">
                    <h3 className="text-sm font-bold text-gray-400 mb-2">Key Drivers:</h3>
                    <ul className="list-disc list-inside text-sm">
                        {decision.explanation.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid-cols-3">
                {/* Technicals */}
                <div className="card">
                    <h3 className="text-xl mb-4 border-b border-gray-700 pb-2">Technical Analysis</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-secondary">Trend</span>
                            <span className={technical.trend === 'Bullish' ? 'text-success' : 'text-danger'}>{technical.trend}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-secondary">RSI</span>
                            <span className={technical.rsi_signal === 'Overbought' ? 'text-danger' : technical.rsi_signal === 'Oversold' ? 'text-success' : 'text-warning'}>
                                {technical.rsi?.toFixed(2)} ({technical.rsi_signal})
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-secondary">MACD</span>
                            <span className={technical.macd > technical.macd_signal ? 'text-success' : 'text-danger'}>
                                {technical.macd > technical.macd_signal ? 'Bullish' : 'Bearish'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Fundamentals */}
                <div className="card">
                    <h3 className="text-xl mb-4 border-b border-gray-700 pb-2">Fundamentals</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-secondary">P/E Ratio</span>
                            <span>{fundamental.pe_ratio?.toFixed(2) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-secondary">Market Cap</span>
                            <span>{fundamental.market_cap ? (fundamental.market_cap / 1e9).toFixed(2) + 'B' : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-secondary">Analyst Rating</span>
                            <span className={fundamental.recommendation.includes('BUY') ? 'text-success' : 'text-warning'}>
                                {fundamental.recommendation}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sentiment */}
                <div className="card">
                    <h3 className="text-xl mb-4 border-b border-gray-700 pb-2">Sentiment</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-secondary">News Sentiment</span>
                            <span className={sentiment.sentiment_label === 'Positive' ? 'text-success' : sentiment.sentiment_label === 'Negative' ? 'text-danger' : 'text-warning'}>
                                {sentiment.sentiment_label}
                            </span>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-xs text-gray-500 uppercase mb-2">Recent Headlines</h4>
                            <ul className="text-xs space-y-2">
                                {sentiment.headlines?.map((h, i) => (
                                    <li key={i} className="truncate">• {h}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState } from 'react';

const UploadSection = ({ onAnalyze, loading }) => {
    const [ticker, setTicker] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ticker) return alert("Please enter a stock ticker");
        onAnalyze(ticker, file);
    };

    return (
        <div className="card text-center">
            <h2 className="text-2xl mb-4">Start Analysis</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter Stock Ticker (e.g., AAPL, TSLA)"
                    className="input-field"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    required
                />

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 mb-4 cursor-pointer hover:border-blue-400 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        {file ? (
                            <span className="text-success">{file.name} selected</span>
                        ) : (
                            <span className="text-secondary">Click to upload chart image (Optional)</span>
                        )}
                    </label>
                </div>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? "Analyzing..." : "Analyze Market"}
                </button>
            </form>
        </div>
    );
};

export default UploadSection;

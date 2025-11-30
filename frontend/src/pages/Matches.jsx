import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trophy, Loader, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        setLoading(true);
        setError(null);
        try {
            const prompt = `Generate a realistic list of the last 5 matches and the Final for the IPL 2025 season. 
            Return the data STRICTLY as a JSON array of objects.
            Each object should have:
            - "id": Number
            - "date": Date string (e.g., "May 26, 2025")
            - "team1": Team 1 Short Name (e.g., CSK)
            - "team2": Team 2 Short Name (e.g., MI)
            - "venue": Stadium Name
            - "result": Match result (e.g., "CSK won by 20 runs")
            - "status": "Completed" or "Upcoming"
            - "type": Match Type (e.g., "Final", "Qualifier 2", "Eliminator", "Match 70")

            Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.`;

            const response = await fetch('https://ipl-backend-s5rh.onrender.com/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    provider: 'gemini'
                }),
            });

            const data = await response.json();
            if (data.response) {
                let cleanJson = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
                try {
                    const parsedData = JSON.parse(cleanJson);
                    setMatches(parsedData);
                } catch (e) {
                    console.error("JSON Parse Error:", e);
                    setError("Failed to parse match data.");
                }
            } else {
                setError("Failed to fetch matches.");
            }
        } catch (err) {
            console.error(err);
            setError("Error connecting to AI service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                    <Trophy className="mr-3 text-ipl-orange" /> IPL 2025 Results
                </h1>
                <button
                    onClick={fetchMatches}
                    disabled={loading}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50"
                    title="Refresh Data"
                >
                    <RefreshCw className={`w-5 h-5 text-ipl-blue ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader className="h-10 w-10 text-ipl-orange animate-spin" />
                    <p className="text-gray-400 animate-pulse">Loading 2025 Season Data...</p>
                </div>
            ) : error ? (
                <div className="text-red-400 text-center py-10 bg-red-900/10 rounded-xl border border-red-900/30">
                    {error}
                    <button onClick={fetchMatches} className="block mx-auto mt-4 text-sm underline hover:text-white">Try Again</button>
                </div>
            ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                    {matches.map((match) => (
                        <div key={match.id} className="bg-ipl-card rounded-xl p-6 border border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-ipl-orange transition-colors shadow-lg">
                            <div className="flex flex-col items-center md:items-start min-w-[150px]">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <Calendar className="w-4 h-4 mr-1" /> {match.date}
                                </div>
                                <div className="text-ipl-orange font-bold text-sm uppercase tracking-wider">{match.type}</div>
                            </div>

                            <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 w-full md:w-auto">
                                <div className="text-2xl md:text-3xl font-bold w-20 text-right text-white">{match.team1}</div>
                                <div className="px-3 py-1 bg-gray-800 rounded text-xs font-mono text-gray-400">VS</div>
                                <div className="text-2xl md:text-3xl font-bold w-20 text-left text-white">{match.team2}</div>
                            </div>

                            <div className="flex flex-col items-center md:items-end min-w-[200px]">
                                <div className={`font-bold text-lg mb-1 text-center md:text-right ${match.status === 'Completed' ? 'text-green-400' : 'text-blue-400'}`}>
                                    {match.result}
                                </div>
                                <div className="flex items-center text-gray-400 text-xs text-center md:text-right">
                                    <MapPin className="w-3 h-3 mr-1" /> {match.venue}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Matches;

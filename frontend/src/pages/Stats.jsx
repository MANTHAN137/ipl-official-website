import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Flame, Target, Loader, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Stats = () => {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const years = Array.from({ length: 2025 - 2008 + 1 }, (_, i) => (2008 + i).toString()).reverse();

    useEffect(() => {
        fetchStats(selectedYear);
    }, [selectedYear]);

    const fetchStats = async (year) => {
        setLoading(true);
        setError(null);
        setStatsData(null);
        try {
            const prompt = `Generate the key statistics for IPL Season ${year}.
            Return the data STRICTLY as a JSON object with the following keys:
            - "orangeCap": { "player": "Name", "team": "Team", "runs": "Runs", "matches": "Matches" }
            - "purpleCap": { "player": "Name", "team": "Team", "wickets": "Wickets", "matches": "Matches" }
            - "mostSixes": { "player": "Name", "team": "Team", "count": "Sixes" }
            - "highestScore": { "player": "Name", "team": "Team", "score": "Score" }
            - "winner": { "team": "Team Name", "runnerUp": "Runner Up Name" }

            Ensure the data is historically accurate for ${year}.
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
                    setStatsData(parsedData);
                } catch (e) {
                    console.error("JSON Parse Error:", e);
                    setError("Failed to parse stats data.");
                }
            } else {
                setError("Failed to fetch stats.");
            }
        } catch (err) {
            console.error(err);
            setError("Error connecting to AI service.");
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, icon: Icon, color, data, type }) => (
        <div className={`bg-ipl-card rounded-2xl p-6 border border-${color}-500/30 hover:border-${color}-500 transition-colors`}>
            <h2 className={`text-xl font-bold mb-4 text-${color}-500 flex items-center`}>
                <Icon className="mr-2 h-6 w-6" /> {title}
            </h2>
            {data ? (
                <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">{data.player}</div>
                    <div className="text-gray-400 text-sm">{data.team}</div>
                    <div className="mt-4 flex items-end justify-between">
                        <div className={`text-4xl font-bold text-${color}-400`}>
                            {type === 'runs' ? data.runs :
                                type === 'wickets' ? data.wickets :
                                    type === 'sixes' ? data.count :
                                        data.score}
                        </div>
                        <div className="text-gray-500 text-sm uppercase font-bold tracking-wider">
                            {type === 'runs' ? 'Runs' :
                                type === 'wickets' ? 'Wickets' :
                                    type === 'sixes' ? 'Sixes' :
                                        'Highest Score'}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-24 flex items-center justify-center text-gray-600">No Data</div>
            )}
        </div>
    );

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <h1 className="text-4xl font-bold text-white flex items-center">
                    <Target className="mr-3 text-ipl-orange" /> Season Stats
                </h1>

                <div className="flex items-center gap-4">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-gray-800 text-white border border-gray-600 rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-ipl-orange text-lg"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => fetchStats(selectedYear)}
                        disabled={loading}
                        className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-6 h-6 text-ipl-blue ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader className="h-12 w-12 text-ipl-orange animate-spin" />
                    <p className="text-gray-400 animate-pulse text-lg">Digging into the archives for {selectedYear}...</p>
                </div>
            ) : error ? (
                <div className="text-red-400 text-center py-10 bg-red-900/10 rounded-xl border border-red-900/30">
                    {error}
                    <button onClick={() => fetchStats(selectedYear)} className="block mx-auto mt-4 text-sm underline hover:text-white">Try Again</button>
                </div>
            ) : statsData ? (
                <div className="space-y-8">
                    {/* Winner Section */}
                    <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-600/10 rounded-2xl p-8 border border-yellow-500/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                        <h3 className="text-yellow-500 font-bold tracking-widest uppercase mb-2">IPL {selectedYear} Champions</h3>
                        <div className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">{statsData.winner?.team}</div>
                        <div className="text-gray-400">Runner Up: {statsData.winner?.runnerUp}</div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Orange Cap"
                            icon={Trophy}
                            color="orange"
                            data={statsData.orangeCap}
                            type="runs"
                        />
                        <StatCard
                            title="Purple Cap"
                            icon={Medal}
                            color="purple"
                            data={statsData.purpleCap}
                            type="wickets"
                        />
                        <StatCard
                            title="Most Sixes"
                            icon={Flame}
                            color="red"
                            data={statsData.mostSixes}
                            type="sixes"
                        />
                        <StatCard
                            title="Highest Score"
                            icon={Target}
                            color="green"
                            data={statsData.highestScore}
                            type="score"
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Stats;

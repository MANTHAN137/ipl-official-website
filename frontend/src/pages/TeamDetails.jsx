import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Sparkles, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const teamData = {
    "CSK": { name: "Chennai Super Kings", color: "bg-yellow-500", text: "text-yellow-500" },
    "DC": { name: "Delhi Capitals", color: "bg-blue-600", text: "text-blue-600" },
    "GT": { name: "Gujarat Titans", color: "bg-slate-700", text: "text-slate-700" },
    "KKR": { name: "Kolkata Knight Riders", color: "bg-purple-700", text: "text-purple-700" },
    "LSG": { name: "Lucknow Super Giants", color: "bg-cyan-600", text: "text-cyan-600" },
    "MI": { name: "Mumbai Indians", color: "bg-blue-700", text: "text-blue-700" },
    "PBKS": { name: "Punjab Kings", color: "bg-red-600", text: "text-red-600" },
    "RR": { name: "Rajasthan Royals", color: "bg-pink-600", text: "text-pink-600" },
    "RCB": { name: "Royal Challengers Bengaluru", color: "bg-red-700", text: "text-red-700" },
    "SRH": { name: "Sunrisers Hyderabad", color: "bg-orange-500", text: "text-orange-500" },
};

const TeamDetails = () => {
    const { teamId } = useParams();
    const team = teamData[teamId];
    const [squadData, setSquadData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState("2024");

    const years = Array.from({ length: 2025 - 2008 + 1 }, (_, i) => (2008 + i).toString()).reverse();

    useEffect(() => {
        if (team) {
            fetchSquadData(selectedYear);
        }
    }, [teamId, selectedYear]);

    const fetchSquadData = async (year) => {
        setLoading(true);
        setError(null);
        setSquadData([]);
        try {
            const prompt = `List the squad for ${team.name} (${teamId}) for the IPL season ${year}. 
            Return the data STRICTLY as a JSON array of objects. 
            Each object should have:
            - "name": Player Name
            - "role": Role (Batsman, Bowler, All-rounder, Wicket-keeper)
            - "current_team": The IPL team this player is playing for in 2025 (or "Retired" / "Unsold" if applicable).
            
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
                // Clean up potential markdown code blocks if the AI adds them despite instructions
                let cleanJson = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
                try {
                    const parsedData = JSON.parse(cleanJson);
                    setSquadData(parsedData);
                } catch (e) {
                    console.error("JSON Parse Error:", e);
                    setError("Failed to parse squad data. AI returned invalid format.");
                }
            } else {
                setError("Failed to fetch squad data.");
            }
        } catch (err) {
            console.error(err);
            setError("Error connecting to AI service.");
        } finally {
            setLoading(false);
        }
    };

    if (!team) {
        return <div className="text-center py-20 text-2xl">Team not found</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Link to="/teams" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Teams
            </Link>

            <div className="bg-ipl-card rounded-2xl border border-gray-700 overflow-hidden mb-8">
                <div className={`h-32 ${team.color} flex items-center justify-center`}>
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{team.name}</h1>
                </div>
                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold flex items-center">
                            <Users className={`mr-3 h-6 w-6 ${team.text}`} /> Squad Archive
                        </h2>

                        <div className="flex items-center gap-4 overflow-x-auto max-w-full pb-2 md:pb-0">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ipl-orange"
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => fetchSquadData(selectedYear)}
                                disabled={loading}
                                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50 whitespace-nowrap"
                            >
                                <Sparkles className="mr-2 h-4 w-4 text-ipl-orange" />
                                {loading ? 'Loading...' : 'Refresh AI'}
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader className="h-10 w-10 text-ipl-orange animate-spin" />
                            <p className="text-gray-400 animate-pulse">Fetching squad for {selectedYear}...</p>
                        </div>
                    ) : error ? (
                        <div className="text-red-400 text-center py-10 bg-red-900/10 rounded-xl border border-red-900/30">
                            {error}
                            <button onClick={() => fetchSquadData(selectedYear)} className="block mx-auto mt-4 text-sm underline hover:text-white">Try Again</button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase tracking-wider">
                                        <th className="p-4">Player Name</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Current Status (2025)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {squadData.length > 0 ? (
                                        squadData.map((player, index) => (
                                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-medium text-white">{player.name}</td>
                                                <td className="p-4 text-gray-300">{player.role}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${player.current_team === team.name || player.current_team === teamId
                                                        ? 'bg-green-900/30 text-green-400 border border-green-900'
                                                        : player.current_team === 'Retired'
                                                            ? 'bg-gray-700 text-gray-400'
                                                            : 'bg-blue-900/30 text-blue-400 border border-blue-900'
                                                        }`}>
                                                        {player.current_team}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-gray-500">
                                                No squad data available. Try refreshing.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamDetails;

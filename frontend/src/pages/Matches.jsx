import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Matches = () => {
    const matches = [
        {
            id: 1,
            date: "May 26, 2024",
            team1: "KKR",
            team2: "SRH",
            venue: "MA Chidambaram Stadium, Chennai",
            result: "KKR won by 8 wickets",
            status: "Completed",
            type: "Final"
        },
        {
            id: 2,
            date: "Mar 22, 2025",
            team1: "CSK",
            team2: "RCB",
            venue: "MA Chidambaram Stadium, Chennai",
            result: "7:30 PM IST",
            status: "Upcoming",
            type: "Match 1"
        },
        {
            id: 3,
            date: "Mar 23, 2025",
            team1: "PBKS",
            team2: "DC",
            venue: "PCA Stadium, Mohali",
            result: "3:30 PM IST",
            status: "Upcoming",
            type: "Match 2"
        },
        {
            id: 4,
            date: "Mar 23, 2025",
            team1: "KKR",
            team2: "SRH",
            venue: "Eden Gardens, Kolkata",
            result: "7:30 PM IST",
            status: "Upcoming",
            type: "Match 3"
        }
    ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Match Schedule</h1>

            <div className="space-y-4 max-w-4xl mx-auto">
                {matches.map((match) => (
                    <div key={match.id} className="bg-ipl-card rounded-xl p-6 border border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-ipl-orange transition-colors">
                        <div className="flex flex-col items-center md:items-start min-w-[150px]">
                            <div className="flex items-center text-gray-400 text-sm mb-1">
                                <Calendar className="w-4 h-4 mr-1" /> {match.date}
                            </div>
                            <div className="text-ipl-orange font-bold text-sm uppercase tracking-wider">{match.type}</div>
                        </div>

                        <div className="flex-1 flex items-center justify-center gap-8 w-full md:w-auto">
                            <div className="text-2xl font-bold w-16 text-right">{match.team1}</div>
                            <div className="px-3 py-1 bg-gray-800 rounded text-xs font-mono text-gray-400">VS</div>
                            <div className="text-2xl font-bold w-16 text-left">{match.team2}</div>
                        </div>

                        <div className="flex flex-col items-center md:items-end min-w-[200px]">
                            <div className={`font-bold text-lg mb-1 ${match.status === 'Completed' ? 'text-green-400' : 'text-white'}`}>
                                {match.result}
                            </div>
                            <div className="flex items-center text-gray-400 text-xs text-center md:text-right">
                                <MapPin className="w-3 h-3 mr-1" /> {match.venue}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Matches;

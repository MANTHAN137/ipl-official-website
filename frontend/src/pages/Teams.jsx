import React from 'react';
import { Link } from 'react-router-dom';

const teams = [
    { name: "Chennai Super Kings", short: "CSK", color: "bg-yellow-500", logo: "🦁" },
    { name: "Delhi Capitals", short: "DC", color: "bg-blue-600", logo: "🐯" },
    { name: "Gujarat Titans", short: "GT", color: "bg-slate-700", logo: "⚡" },
    { name: "Kolkata Knight Riders", short: "KKR", color: "bg-purple-700", logo: "⚔️" },
    { name: "Lucknow Super Giants", short: "LSG", color: "bg-cyan-600", logo: "🦅" },
    { name: "Mumbai Indians", short: "MI", color: "bg-blue-700", logo: "🌀" },
    { name: "Punjab Kings", short: "PBKS", color: "bg-red-600", logo: "🦁" },
    { name: "Rajasthan Royals", short: "RR", color: "bg-pink-600", logo: "👑" },
    { name: "Royal Challengers Bengaluru", short: "RCB", color: "bg-red-700", logo: "🦁" },
    { name: "Sunrisers Hyderabad", short: "SRH", color: "bg-orange-500", logo: "🦅" },
];

const Teams = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">IPL Teams 2025</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <div key={team.short} className="bg-ipl-card rounded-xl overflow-hidden card-hover border border-gray-700 group cursor-pointer">
                        <div className={`h-24 ${team.color} flex items-center justify-center`}>
                            <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{team.logo}</span>
                        </div>
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
                            <p className="text-gray-400 font-mono text-lg">{team.short}</p>
                            <Link to={`/teams/${team.short}`} className={`mt-4 inline-block px-6 py-2 rounded-full border border-gray-600 hover:bg-white hover:text-black transition-colors text-sm font-semibold`}>
                                View Squad
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;

import React from 'react';

const Stats = () => {
    const orangeCap = [
        { rank: 1, player: "Virat Kohli", team: "RCB", runs: 741, matches: 15 },
        { rank: 2, player: "Ruturaj Gaikwad", team: "CSK", runs: 583, matches: 14 },
        { rank: 3, player: "Riyan Parag", team: "RR", runs: 573, matches: 15 },
    ];

    const purpleCap = [
        { rank: 1, player: "Harshal Patel", team: "PBKS", wickets: 24, matches: 14 },
        { rank: 2, player: "Varun Chakaravarthy", team: "KKR", wickets: 21, matches: 14 },
        { rank: 3, player: "Jasprit Bumrah", team: "MI", wickets: 20, matches: 13 },
    ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-12 text-center">Season Stats 2024</h1>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Orange Cap Section */}
                <div className="bg-ipl-card rounded-2xl p-6 border border-orange-500/30">
                    <h2 className="text-2xl font-bold mb-6 text-orange-500 flex items-center">
                        <span className="text-3xl mr-2">🧢</span> Orange Cap (Most Runs)
                    </h2>
                    <div className="space-y-4">
                        {orangeCap.map((player) => (
                            <div key={player.rank} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl font-bold text-gray-600">#{player.rank}</div>
                                    <div>
                                        <div className="font-bold text-lg">{player.player}</div>
                                        <div className="text-sm text-gray-400">{player.team}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-orange-400">{player.runs}</div>
                                    <div className="text-xs text-gray-500">Runs</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Purple Cap Section */}
                <div className="bg-ipl-card rounded-2xl p-6 border border-purple-500/30">
                    <h2 className="text-2xl font-bold mb-6 text-purple-500 flex items-center">
                        <span className="text-3xl mr-2">🧢</span> Purple Cap (Most Wickets)
                    </h2>
                    <div className="space-y-4">
                        {purpleCap.map((player) => (
                            <div key={player.rank} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl font-bold text-gray-600">#{player.rank}</div>
                                    <div>
                                        <div className="font-bold text-lg">{player.player}</div>
                                        <div className="text-sm text-gray-400">{player.team}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-purple-400">{player.wickets}</div>
                                    <div className="text-xs text-gray-500">Wickets</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;

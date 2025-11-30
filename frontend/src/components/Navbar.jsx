import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, Calendar, BarChart2, MessageSquare } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-ipl-orange text-white' : 'text-gray-300 hover:bg-ipl-blue hover:text-white';
    };

    return (
        <nav className="bg-ipl-card border-b border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Trophy className="h-8 w-8 text-ipl-orange" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ipl-orange to-white">
                            IPL Official
                        </span>
                    </Link>

                    <div className="flex space-x-4">
                        <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/')}`}>
                            <Trophy className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                        <Link to="/teams" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/teams')}`}>
                            <Users className="h-4 w-4" />
                            <span>Teams</span>
                        </Link>
                        <Link to="/matches" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/matches')}`}>
                            <Calendar className="h-4 w-4" />
                            <span>Matches</span>
                        </Link>
                        <Link to="/stats" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/stats')}`}>
                            <BarChart2 className="h-4 w-4" />
                            <span>Stats</span>
                        </Link>
                        <Link to="/ask-ai" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/ask-ai')}`}>
                            <MessageSquare className="h-4 w-4" />
                            <span>Ask AI</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

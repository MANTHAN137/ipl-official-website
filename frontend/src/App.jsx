import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import Matches from './pages/Matches';
import Stats from './pages/Stats';
import AskAI from './pages/AskAI';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ipl-dark text-white font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:teamId" element={<TeamDetails />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/ask-ai" element={<AskAI />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 py-8 mt-12 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; 2025 IPL Official Fan Website. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

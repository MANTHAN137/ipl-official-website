import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Star, TrendingUp, BarChart2, Camera, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    useEffect(() => {
        fetchPhotos();
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('https://ipl-backend-s5rh.onrender.com/news');
            const data = await response.json();
            if (data.news) {
                setNews(data.news);
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
        } finally {
            setLoadingNews(false);
        }
    };

    const fetchPhotos = async () => {
        try {
            // Using the deployed backend URL
            const response = await fetch('https://ipl-backend-s5rh.onrender.com/photos');
            const data = await response.json();
            if (data.photos) {
                setPhotos(data.photos);
            }
        } catch (error) {
            console.error("Failed to fetch photos:", error);
        } finally {
            setLoadingPhotos(false);
        }
    };

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative h-[500px] rounded-2xl overflow-hidden ipl-gradient flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <span className="text-yellow-100 font-medium">IPL 2024 Champions: Kolkata Knight Riders</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Thrill</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        The official destination for Indian Premier League. Live scores, stats, news, and AI-powered insights.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/matches" className="bg-white text-ipl-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center">
                            View Schedule <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/ask-ai" className="bg-ipl-orange/90 text-white px-8 py-3 rounded-lg font-bold hover:bg-ipl-orange transition-colors backdrop-blur-sm">
                            Ask AI Assistant
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dynamic Photo Gallery */}
            <section className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Camera className="mr-2 text-ipl-orange" /> Latest Moments
                </h2>
                {loadingPhotos ? (
                    <div className="flex justify-center py-12">
                        <Loader className="h-8 w-8 text-ipl-orange animate-spin" />
                    </div>
                ) : photos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {photos.map((photo, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-xl aspect-video bg-gray-800">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => { e.target.src = 'https://www.iplt20.com/assets/images/ipl-og-image-new.jpg' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-sm font-medium line-clamp-2">{photo.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-gray-900/50 rounded-xl">
                        Unable to load photos at the moment.
                    </div>
                )}
            </section>

            {/* Latest Updates Grid (AI Powered) */}
            <section className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Star className="mr-2 text-ipl-orange" /> Latest Updates
                </h2>
                {loadingNews ? (
                    <div className="flex justify-center py-12">
                        <Loader className="h-8 w-8 text-ipl-orange animate-spin" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {news.map((item, index) => (
                            <div key={index} className="bg-ipl-card rounded-xl overflow-hidden card-hover border border-gray-700 flex flex-col h-full">
                                <div className={`h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent ${item.color}`}></div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.tag}</span>
                                    <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                                    <p className="text-gray-400 flex-1">{item.desc}</p>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-ipl-orange font-medium hover:text-white transition-colors text-sm flex items-center">
                                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Stats Preview */}
            <section className="container mx-auto bg-ipl-card rounded-2xl p-8 border border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4 flex items-center">
                            <TrendingUp className="mr-2 text-green-400" /> Season Stats
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Dive deep into the numbers that defined the 2024 season. From most runs to crucial wickets.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-orange-500">741</div>
                                <div className="text-sm text-gray-400">Orange Cap (Runs)</div>
                                <div className="text-xs text-gray-500 mt-1">Virat Kohli</div>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-purple-500">24</div>
                                <div className="text-sm text-gray-400">Purple Cap (Wickets)</div>
                                <div className="text-xs text-gray-500 mt-1">Harshal Patel</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        {/* Placeholder for a chart or graphic */}
                        <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-ipl-blue to-ipl-orange opacity-20 animate-pulse blur-3xl"></div>
                        <BarChart2 className="absolute w-48 h-48 text-gray-600" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AskAI = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your IPL AI Assistant. Ask me anything about teams, players, stats, or history!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [provider, setProvider] = useState('gemini'); // Default to Gemini
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    provider: provider,
                    // api_key is handled by backend env vars now
                }),
            });

            const data = await response.json();

            if (data.response) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that request." }]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, there was an error connecting to the server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 h-[calc(100vh-80px)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold flex items-center">
                    <Sparkles className="mr-2 text-ipl-orange" /> Ask IPL AI
                </h1>
                <div className="flex bg-gray-800 rounded-lg p-1">
                    <button
                        onClick={() => setProvider('gemini')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${provider === 'gemini' ? 'bg-ipl-blue text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Gemini
                    </button>
                    <button
                        onClick={() => setProvider('openai')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${provider === 'openai' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        GPT-3.5
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-ipl-card rounded-2xl border border-gray-700 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-ipl-orange' : 'bg-ipl-blue'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-ipl-orange/20 text-white rounded-tr-none' : 'bg-gray-800 text-gray-100 rounded-tl-none'} overflow-hidden`}>
                                    {msg.role === 'user' ? (
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    ) : (
                                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-ipl-blue flex items-center justify-center flex-shrink-0">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-gray-900/50 border-t border-gray-700">
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about IPL stats, history, or players..."
                            className="flex-1 bg-gray-800 border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ipl-orange focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-ipl-orange text-white p-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AskAI;

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';

interface Message {
    id: string;
    role: 'assistant' | 'user';
    content: string;
}

interface DemoChatProps {
    onSendMessage?: (message: string) => Promise<string>;
}

export default function DemoChat({ onSendMessage }: DemoChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá! Qual especialista GEN você gostaria de testar? Selecione um abaixo ou digite sua pergunta.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
        };

        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate response delay or call API
        try {
            if (onSendMessage) {
                // If function provided, use it
                const response = await onSendMessage(text);
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: response
                }]);
            } else {
                // CALL REAL NEXUS HUB API
                const targetGen = text.toLowerCase().includes('cloth') ? 'clothmaster'
                    : text.toLowerCase().includes('ecom') ? 'ecommaster'
                        : text.toLowerCase().includes('promo') ? 'promoplanner'
                            : 'nexushub';

                try {
                    const apiRes = await fetch('/api/nexus-hub/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ genId: targetGen, message: text })
                    });

                    const data = await apiRes.json();
                    const reply = data.response || "Erro na comunicação com o NexusHub.";

                    setMessages(prev => [...prev, {
                        id: (Date.now() + 1).toString(),
                        role: 'assistant',
                        content: reply
                    }]);
                } catch (apiError) {
                    console.error("API Call Failed", apiError);
                    setMessages(prev => [...prev, {
                        id: (Date.now() + 1).toString(),
                        role: 'assistant',
                        content: "Erro de conexão com o servidor. Verifique se o servidor está rodando."
                    }]);
                }
            }
            setIsTyping(false);
        } catch (error) {
            console.error(error);
            setIsTyping(false);
        }
    };

    const quickActions = [
        { label: 'ClothMaster GEN', query: 'Quero testar o ClothMaster GEN' },
        { label: 'EcomMaster GEN', query: 'Quero testar o EcomMaster GEN' },
        { label: 'PromoPlanner GEN', query: 'Quero testar o PromoPlanner GEN' },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Live Demo
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Experimente a <span className="text-blue-500">Inteligência Nexus</span>
                    </h2>
                    <p className="text-slate-400">
                        Interaja com nossa demonstração em tempo real e veja como nossos GENs operam.
                    </p>
                </div>

                {/* Chat Interface Container */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                    {/* Header */}
                    <div className="bg-slate-800/50 p-4 border-b border-slate-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Nexus Interface</h3>
                                <p className="text-xs text-blue-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Sistema Online
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="h-[400px] overflow-y-auto p-6 space-y-6 bg-slate-950/50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user'
                                        ? 'bg-slate-700 text-slate-300'
                                        : 'bg-blue-900/50 text-blue-400 border border-blue-500/30'
                                        }`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-lg shadow-blue-900/20'
                                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-blue-900/50 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                        <Sparkles size={16} />
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm border border-slate-700 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Interaction Area */}
                    <div className="p-4 bg-slate-800/30 border-t border-slate-700/50">
                        {/* Quick Actions */}
                        {messages.length === 1 && (
                            <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
                                {quickActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(action.query)}
                                        className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 hover:border-blue-400 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Digite sua mensagem para o GEN..."
                                className="w-full bg-slate-900/50 text-white placeholder-slate-500 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/4 -right-64 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </section>
    );
}

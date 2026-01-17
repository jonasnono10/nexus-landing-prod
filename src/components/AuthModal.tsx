'use client';

import { useState } from 'react';
import { X, User, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<'subscriber' | 'creator'>('subscriber');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="flex border-b border-slate-800">
                    <button
                        onClick={() => setActiveTab('subscriber')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'subscriber'
                                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                                : 'border-transparent text-slate-400 hover:text-slate-300'
                            }`}
                    >
                        <User size={18} />
                        Assinante
                    </button>
                    <button
                        onClick={() => setActiveTab('creator')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'creator'
                                ? 'border-purple-500 text-purple-400 bg-purple-500/5'
                                : 'border-transparent text-slate-400 hover:text-slate-300'
                            }`}
                    >
                        <ShieldCheck size={18} />
                        Criador GEN
                    </button>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {activeTab === 'subscriber' ? 'Acesse seu Quartel' : 'Portal do Criador'}
                        </h3>
                        <p className="text-slate-400 text-sm">
                            {activeTab === 'subscriber'
                                ? 'Gerencie seus Gens e visualize métricas.'
                                : 'Submeta novos Gens e acompanhe seus royalties.'}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Email Corporativo</label>
                            <input
                                type="email"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="nome@empresa.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Senha</label>
                            <input
                                type="password"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 mt-4 cursor-pointer ${activeTab === 'subscriber'
                                ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20'
                                : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/20'
                            }`}>
                            {activeTab === 'subscriber' ? 'Entrar no NexusHub' : 'Acessar Console'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-xs text-slate-500">
                        Ainda não tem conta? <a href="#" className="text-blue-400 hover:underline">Cadastre-se</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

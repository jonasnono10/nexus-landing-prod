'use client';

import { Shield, Database, Scissors, Video, ShoppingCart, TrendingUp, Heart, Megaphone, Calendar, Printer, Box, MessageCircle, Truck, Users, Scale, PenTool, Code, Lock, Cloud, Headphones, Brain, ArrowUpRight, Layout } from 'lucide-react';
import { gensRegistry } from '@/lib/nexus-hub/registry';
import { AccessLevel } from '@/lib/nexus-hub/types';
import { useState } from 'react';

const scissors_or_heart = (role: string) => {
    if (role.includes('Barber') || role.includes('Salão')) return Scissors;
    return Heart;
}

// Icon mapping helper
const getIcon = (id: string, role: string) => {
    if (role.includes('Jurídico')) return Scale;
    if (role.includes('Humanos')) return Users;
    if (role.includes('Rotas')) return Truck;
    if (role.includes('Vendas')) return MessageCircle;
    if (role.includes('Designer')) return PenTool;
    if (role.includes('Code')) return Code;
    if (role.includes('Segurança')) return Lock;
    if (role.includes('Nuvem')) return Cloud;
    if (role.includes('Atendente')) return Headphones;
    if (role.includes('Saúde') || role.includes('Tricologia') || role.includes('Barber')) return scissors_or_heart(role);

    // Mapping existing IDs
    const map: Record<string, any> = {
        'gen-001': Shield,
        'gen-002': Database,
        'gen-003': Scissors,
        'gen-004': Video,
        'gen-005': ShoppingCart,
        'gen-006': TrendingUp,
        'gen-007': Heart,
        'gen-008': Megaphone,
        'gen-009': Calendar,
        'gen-010': Printer,
        'gen-011': Box,
        // New explicit mappings for key gens
        'gen-028': Heart, // Tricologia
        'gen-027': Scissors, // Barber
        'gen-029': Megaphone, // Affiliate
        'gen-030': Brain, // Nexus Mental
    };
    return map[id] || Shield;
};

// Internal Card Component for the Showcase
const ShowcaseCard = ({ gen }: { gen: typeof gensRegistry[0] }) => {
    const Icon = getIcon(gen.id, gen.role);
    const isPro = gen.accessLevel === 'Pro';
    const isEnterprise = gen.accessLevel === 'Enterprise';
    const isFree = gen.accessLevel === 'Free';

    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (isEnterprise) {
                alert('Este GEN requer um plano Enterprise.');
            } else if (isPro) {
                alert('Este GEN requer um plano Pro Army.');
            } else {
                alert(`Iniciando ${gen.name}...`);
            }
        }, 500);
    };

    return (
        <div className="group relative flex flex-col p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)]">

            {/* Access Badge */}
            {!isFree && (
                <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isEnterprise
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                    {gen.accessLevel}
                </div>
            )}

            {/* Header Icon */}
            <div className="mb-4 w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <Icon size={24} />
            </div>

            {/* Content */}
            <div className="flex-1 mb-6">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {gen.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-2">{gen.role}</p>
                <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3 mt-3">
                    {gen.description}
                </p>
            </div>

            {/* Action Button */}
            <button
                onClick={handleOpen}
                disabled={isLoading}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${isFree
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
            >
                {isLoading ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        {isFree ? 'Abrir GEN' : 'Bloqueado'}
                        {isFree && <ArrowUpRight size={16} />}
                        {!isFree && <Lock size={14} className="ml-1 opacity-70" />}
                    </>
                )}
            </button>

            {/* Hover Neon Border Effect */}
            <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/30 rounded-2xl pointer-events-none transition-colors duration-300" />
        </div>
    );
};

export default function GenShowcase() {
    return (
        <section id="gens" className="py-24 bg-slate-950 relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in">
                        <Database size={12} />
                        Arsenal Completo
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        30+ Especialistas. <span className="text-blue-500">Uma Plataforma.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        De operações básicas a estratégias complexas de crescimento.
                        Escolha seu especialista e comece a escalar.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gensRegistry.map((gen) => (
                        <ShowcaseCard key={gen.id} gen={gen} />
                    ))}
                </div>
            </div>
        </section>
    );
}

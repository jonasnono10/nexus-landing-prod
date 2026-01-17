'use client';

import { LucideIcon, Lock, ArrowUpRight } from 'lucide-react';
import { AccessLevel } from '@/lib/nexus-hub/types';
import { useState } from 'react';

interface GenCardProps {
    id: string;
    name: string;
    role: string;
    description: string;
    icon: LucideIcon;
    accessLevel: AccessLevel;
}

export default function GenCard({ name, role, description, icon: Icon, accessLevel }: GenCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => {
        setIsLoading(true);
        // Simulation of Access Level Check
        setTimeout(() => {
            setIsLoading(false);
            if (accessLevel === 'Enterprise') {
                alert(`Acesso Restrito: O ${name} requer plano Enterprise.`);
            } else {
                alert(`Iniciando ${name}... (Simulação)`);
            }
        }, 600);
    };

    const isLocked = accessLevel === 'Enterprise'; // Visual lock for demo purposes

    return (
        <div className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-slate-800/80 text-blue-400 group-hover:scale-110 group-hover:bg-blue-900/20 transition-all duration-300">
                    <Icon size={24} />
                </div>
                {accessLevel !== 'Free' && (
                    <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${accessLevel === 'Enterprise'
                            ? 'bg-purple-900/20 text-purple-400 border-purple-500/30'
                            : 'bg-blue-900/20 text-blue-400 border-blue-500/30'
                        }`}>
                        {accessLevel}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {role}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {description}
                </p>
            </div>

            {/* Action */}
            <button
                onClick={handleOpen}
                disabled={isLoading}
                className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:translate-y-[-2px] cursor-pointer ${isLocked
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700 hover:text-slate-300'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                    }`}
            >
                {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isLocked ? (
                    <>
                        <Lock size={14} />
                        Desbloquear
                    </>
                ) : (
                    <>
                        Abrir GEN
                        <ArrowUpRight size={14} />
                    </>
                )}
            </button>

            {/* Neon Gradient Line Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl opacity-70" />
        </div>
    );
}

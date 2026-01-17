'use client';

import {
    Shield, Database, Scissors, Video, ShoppingCart,
    TrendingUp, Heart, Megaphone, Calendar, Printer, Box
} from 'lucide-react';
import GenCard from './GenCard';
import { gensRegistry } from '@/lib/nexus-hub/registry';

// Mapping IDs to Icons manually since we can't pass components from registry.ts easily in this setup
const iconMap: Record<string, any> = {
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
};

export default function GensGrid() {
    return (
        <section id="gens" className="py-24 bg-slate-950/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Comando <span className="text-blue-500">Nexus Army</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Explore nossa elite de especialistas digitais prontos para integrar sua operação.
                    </p>
                </div>

                {/* Dynamic Grid: 1 col mobile, 2 tablet, 4 desktop as requested */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gensRegistry.map((gen) => (
                        <GenCard
                            key={gen.id}
                            id={gen.id}
                            name={gen.name}
                            role={gen.role}
                            description={gen.description}
                            icon={iconMap[gen.id] || Shield}
                            accessLevel={gen.accessLevel}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

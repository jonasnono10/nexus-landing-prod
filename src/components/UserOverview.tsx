import { MessageSquare, Zap, Gift, Shield } from 'lucide-react';
import Link from 'next/link';

export default function UserOverview() {
    return (
        <div className="space-y-8">
            {/* User Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo à Força Tarefa</h2>
                    <p className="text-blue-200 max-w-xl text-lg mb-6">
                        Seu exército de especialistas está pronto. Qual missão vamos cumprir hoje?
                    </p>
                    <button
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2"
                        // In a real app, this would navigate to the chat or open the gen list
                        onClick={() => document.getElementById('tab-gens')?.click()}
                    >
                        <MessageSquare size={20} />
                        Iniciar Nova Operação
                    </button>
                </div>
                {/* Background Decor */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
            </div>

            {/* User Personal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4 text-purple-400">
                        <Zap size={24} />
                        <h3 className="font-bold text-white">Seu Plano</h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">PRO Army</div>
                    <p className="text-slate-500 text-sm">Acesso ilimitado a 22 Gens</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4 text-green-400">
                        <Shield size={24} />
                        <h3 className="font-bold text-white">Status da Conta</h3>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-1">Ativa</div>
                    <p className="text-slate-500 text-sm">Renova em 28/01/2026</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative group cursor-pointer transition-all hover:border-blue-500/50">
                    <div className="flex items-center gap-3 mb-4 text-yellow-400">
                        <Gift size={24} />
                        <h3 className="font-bold text-white">Indique e Ganhe</h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">R$ 118,80</div>
                    <p className="text-slate-500 text-sm">Disponível para saque</p>
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6">Especialistas em Destaque</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mock Cards connecting to Gen Chat */}
                    <GenQuickCard
                        name="Affiliate Booster"
                        role="Marketing & Vendas"
                        desc="Crie anúncios e copys que vendem."
                        icon="🚀"
                    />
                    <GenQuickCard
                        name="Adminix"
                        role="Operações"
                        desc="Organize processos e documentos."
                        icon="⚡"
                    />
                    <GenQuickCard
                        name="Marketing Digital"
                        role="Tráfego Pago"
                        desc="Estratégias de ROI e campanhas."
                        icon="📈"
                    />
                </div>
            </div>
        </div>
    );
}

function GenQuickCard({ name, role, desc, icon }: any) {
    return (
        <div className="bg-slate-950 border border-slate-800 hover:border-slate-600 p-4 rounded-xl transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl bg-slate-900 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">{icon}</span>
                <div>
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{name}</h4>
                    <span className="text-xs text-slate-500 uppercase font-bold">{role}</span>
                </div>
            </div>
            <p className="text-sm text-slate-400">{desc}</p>
        </div>
    );
}

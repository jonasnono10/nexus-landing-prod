import { Activity, Users, DollarSign, Server } from 'lucide-react';

export default function AdminOverview({ metrics }: { metrics: any }) {
    return (
        <div className="space-y-8">
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    <div>
                        <h3 className="text-red-400 font-bold">Modo Administrador Ativo</h3>
                        <p className="text-slate-400 text-sm">Você tem acesso total aos dados sensíveis da plataforma.</p>
                    </div>
                </div>
            </div>

            {/* Global KPIs - REAL DATA */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KpiCard
                    title="Receita Total (MRR)"
                    value={metrics?.totalRevenue || "R$ 0,00"}
                    icon={DollarSign}
                    color="green"
                    trend={metrics?.revenueTrend || "Atualizado"}
                />
                <KpiCard
                    title="Custo de API (Estimado)"
                    value={metrics?.apiCost || "R$ 0,00"}
                    icon={Server}
                    color="red"
                    trend="Baseado em Tokens"
                />
                <KpiCard
                    title="Usuários Totais"
                    value={metrics?.totalUsers?.toString() || "0"}
                    icon={Users}
                    color="blue"
                    trend="Base Total"
                />
                <KpiCard
                    title="Gens Ativos"
                    value={metrics?.totalActiveGens?.toString() || "0"}
                    icon={Activity}
                    color="purple"
                    trend="Em Operação"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">Operações Críticas</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors flex justify-between items-center group">
                            <span>Sincronizar Banco de Dados</span>
                            <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Executar</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors flex justify-between items-center group">
                            <span>Reiniciar Instância WhatsApp</span>
                            <span className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Reiniciar</span>
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">Logs Recentes</h3>
                    <div className="space-y-2 text-sm font-mono text-slate-400">
                        <div className="flex justify-between">
                            <span>[SYSTEM] Backup realizado</span>
                            <span className="text-slate-600">10:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>[AUTH] User u_2910 login</span>
                            <span className="text-slate-600">09:45</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-green-400">[SALE] Venda Aprovada (Pro)</span>
                            <span className="text-slate-600">09:30</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, icon: Icon, color = "blue", trend }: any) {
    const colors = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        green: "bg-green-500/10 text-green-400 border-green-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };

    return (
        <div className={`p-6 rounded-xl border bg-slate-900 ${colors[color as keyof typeof colors] || colors.blue}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-slate-950`}>
                    <Icon size={24} />
                </div>
                {trend && <span className="text-xs font-bold bg-slate-950 px-2 py-1 rounded-full text-slate-400">{trend}</span>}
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    );
}

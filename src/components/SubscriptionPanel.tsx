import { Check, Zap, Shield, Crown } from 'lucide-react';

export default function SubscriptionPanel() {
    return (
        <div className="space-y-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Escolha seu Equipamento</h2>
                <p className="text-slate-400">Desbloqueie todo o poder do Exército Nexus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* FREE PLAN */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col relative overflow-hidden">
                    <div className="mb-4">
                        <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Iniciante
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Soldado Raso</h3>
                    <div className="text-4xl font-bold text-white mb-6">
                        R$ 0 <span className="text-lg text-slate-500 font-normal">/mês</span>
                    </div>
                    <p className="text-slate-400 mb-8 text-sm">
                        Acesso básico aos agentes públicos e funcionalidades limitadas.
                    </p>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-slate-300 text-sm">
                            <Check size={18} className="text-green-500" />
                            Acesso ao NexusHub
                        </li>
                        <li className="flex items-center gap-3 text-slate-300 text-sm">
                            <Check size={18} className="text-green-500" />
                            5 Genes Públicos
                        </li>
                        <li className="flex items-center gap-3 text-slate-300 text-sm">
                            <Check size={18} className="text-green-500" />
                            Memória de Curto Prazo
                        </li>
                    </ul>

                    <button className="w-full py-3 rounded-xl border border-slate-600 text-slate-300 font-bold hover:bg-slate-800 transition-colors">
                        Seu Plano Atual
                    </button>
                </div>

                {/* PRO PLAN */}
                <div className="bg-slate-900 border border-blue-500 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl shadow-blue-900/20 transform scale-105">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                        MAIS POPULAR
                    </div>

                    <div className="mb-4">
                        <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex w-fit items-center gap-1">
                            <Crown size={12} /> Elite
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">PRO Army</h3>
                    <div className="text-4xl font-bold text-white mb-6">
                        R$ 97 <span className="text-lg text-slate-500 font-normal">/mês</span>
                    </div>
                    <p className="text-slate-400 mb-8 text-sm">
                        Comando total. Acesso a todos os agentes, memória expandida e suporte prioritário.
                    </p>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-white text-sm font-medium">
                            <Zap size={18} className="text-blue-400" />
                            Acesso ILIMITADO a Todos os Gens
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm font-medium">
                            <Zap size={18} className="text-blue-400" />
                            Memória de Longo Prazo (Banco de Dados)
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm font-medium">
                            <Shield size={18} className="text-blue-400" />
                            Prioridade de Processamento
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm font-medium">
                            <Crown size={18} className="text-blue-400" />
                            Painel de Afiliado (Comissões Altas)
                        </li>
                    </ul>

                    <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50 hover:translate-y-[-2px]">
                        Fazer Upgrade Agora
                    </button>
                    <p className="text-center mt-3 text-xs text-slate-500">
                        Pagamento seguro via Stripe. Cancele quando quiser.
                    </p>
                </div>
            </div>
        </div>
    );
}

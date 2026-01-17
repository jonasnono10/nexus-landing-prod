import { Share2, Copy, TrendingUp, DollarSign, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function AffiliatePanel() {
    const [affiliateLink, setAffiliateLink] = useState<string | null>(null);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Generator State
    const [generatorState, setGeneratorState] = useState({
        channel: 'Instagram Feed',
        audience: 'Lojistas e Comerciantes',
        tone: 'Persuasivo e Direto'
    });
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isBoosterTyping, setIsBoosterTyping] = useState(false);

    // Mock Data for MVP
    const [sales, setSales] = useState([
        { id: 1, buyer: 'u***1', date: '2025-05-12', amount: 297.00, commission: 59.40, status: 'PAID' },
        { id: 2, buyer: 'u***9', date: '2025-05-14', amount: 297.00, commission: 59.40, status: 'PENDING' },
    ]);

    const activateAffiliate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/affiliate/generate', {
                method: 'POST',
                body: JSON.stringify({ userId: 'user-id-placeholder' })
            });
            const data = await res.json();
            if (data.code) {
                setAffiliateLink(`https://nexus.army/?ref=${data.code}`);
                setBalance(118.80);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        if (!affiliateLink) return;
        navigator.clipboard.writeText(affiliateLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateAd = async () => {
        if (!affiliateLink) {
            alert('Por favor, ative sua conta de afiliado primeiro.');
            return;
        }

        setIsBoosterTyping(true);
        setGeneratedContent(null);

        try {
            const prompt = `
            TAREFA: Gerar Anúncio de Marketing
            CANAL: ${generatorState.channel}
            PÚBLICO ALVO: ${generatorState.audience}
            TOM DE VOZ: ${generatorState.tone}
            
            [DADOS DO AFILIADO]
            Link para venda: ${affiliateLink}
            
            [INSTRUÇÃO]
            Crie o copy perfeito seguindo a estrutura AIDA. Foco total em conversão.
            `;

            const res = await fetch('/api/nexus-hub/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    genId: 'gen-029', // ID do Affiliate Booster
                    message: prompt
                })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setGeneratedContent(data.response);

        } catch (error) {
            console.error('Generator Error:', error);
            setGeneratedContent('❌ Ops! Ocorreu um erro ao gerar o anúncio. Tente novamente em alguns instantes.');
        } finally {
            setIsBoosterTyping(false);
        }
    };

    if (!affiliateLink) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
                    <Share2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Torne-se um Parceiro Nexus</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-6">
                    Indique o Nexus Army e receba <span className="text-green-400 font-bold">20% de comissão</span> recorrente por cada assinatura nova.
                </p>
                <button
                    onClick={activateAffiliate}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50"
                >
                    {loading ? 'Ativando...' : 'Ativar Minha Conta de Afiliado'}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header / Link Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Share2 size={20} className="text-blue-400" />
                    Seu Link de Parceiro
                </h3>
                <div className="flex gap-2">
                    <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm truncate flex items-center">
                        {affiliateLink}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className={`px-4 py-2 font-bold rounded-lg transition-all flex items-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                            }`}
                    >
                        {copied ? 'Copiado!' : <><Copy size={16} /> Copiar</>}
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Cliques no Link"
                    value="128"
                    icon={TrendingUp}
                    color="blue"
                />
                <MetricCard
                    title="Vendas Confirmadas"
                    value="2"
                    icon={DollarSign}
                    color="green"
                />
                <MetricCard
                    title="Saldo Disponível"
                    value={`R$ ${balance.toFixed(2)}`}
                    icon={Wallet}
                    color="purple"
                    highlight
                />
            </div>

            {/* Affiliate Booster Generator Engine */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">🏭</span>
                            Fábrica de Anúncios
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Gere materiais de alta conversão em segundos, prontos para copiar e colar.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                1. Escolha o Canal
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Instagram Feed', 'Instagram Stories', 'WhatsApp Script', 'LinkedIn Post'].map(channel => (
                                    <button
                                        key={channel}
                                        onClick={() => setGeneratorState(s => ({ ...s, channel }))}
                                        className={`p-3 rounded-lg border text-left transition-all ${generatorState.channel === channel
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="text-sm font-bold">{channel}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                2. Escolha o Público Alvo
                            </label>
                            <select
                                value={generatorState.audience}
                                onChange={(e) => setGeneratorState(s => ({ ...s, audience: e.target.value }))}
                                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Lojistas e Comerciantes">🏪 Lojistas (Querem vender mais)</option>
                                <option value="Profissionais Liberais">💼 Profissionais Liberais (Querem tempo)</option>
                                <option value="Empreendedores Digitais">💻 Empreendedores Digitais (Querem escala)</option>
                                <option value="Geral/Curiosidade">👀 Público Geral (Curiosidade)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                3. Tom de Voz (Opcional)
                            </label>
                            <select
                                value={generatorState.tone}
                                onChange={(e) => setGeneratorState(s => ({ ...s, tone: e.target.value }))}
                                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500"
                            >
                                <option value="Persuasivo e Direto">🔥 Persuasivo (Foco em Vendas)</option>
                                <option value="Educativo e Autoritário">🧠 Educativo (Gerar Autoridade)</option>
                                <option value="Urgência e Escassez">⏳ Urgência (Promoção/Tempo Limitado)</option>
                            </select>
                        </div>

                        <button
                            onClick={generateAd}
                            disabled={isBoosterTyping}
                            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isBoosterTyping ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Gerando Copy...
                                </>
                            ) : (
                                <>
                                    <span className="text-xl">⚡</span>
                                    GERAR TEXTO AGORA
                                </>
                            )}
                        </button>
                    </div>

                    {/* Output Area */}
                    <div className="relative h-full min-h-[400px]">
                        <div className="absolute inset-0 bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                                <span className="text-xs font-bold text-slate-500 uppercase">Resultado Gerado</span>
                                {generatedContent && (
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedContent);
                                            alert('Copiado!');
                                        }}
                                        className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                                    >
                                        <Copy size={12} />
                                        COPIAR
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto font-mono text-sm text-slate-300 whitespace-pre-wrap">
                                {isBoosterTyping ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-3">
                                        <span className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin"></span>
                                        <p className="animate-pulse">Criando estratégia...</p>
                                    </div>
                                ) : generatedContent ? (
                                    generatedContent
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-600 text-center p-6">
                                        <span className="text-4xl mb-2">👈</span>
                                        <p>Selecione as opções ao lado e clique em GERAR para criar seu anúncio.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extrato Table - Moved to bottom */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
                <h3 className="text-lg font-bold text-white mb-6">Extrato de Comissões</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-500 uppercase font-medium">
                                <th className="pb-4 pl-4">Data</th>
                                <th className="pb-4">Comprador</th>
                                <th className="pb-4">Valor Base</th>
                                <th className="pb-4">Sua Comissão</th>
                                <th className="pb-4 pr-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {sales.map((sale) => (
                                <tr key={sale.id} className="hover:bg-slate-800/20">
                                    <td className="py-4 pl-4 text-slate-300">{sale.date}</td>
                                    <td className="py-4 text-slate-400">{sale.buyer}</td>
                                    <td className="py-4 text-slate-400">R$ {sale.amount.toFixed(2)}</td>
                                    <td className="py-4 font-bold text-green-400">+ R$ {sale.commission.toFixed(2)}</td>
                                    <td className="py-4 pr-4 text-right">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${sale.status === 'PAID'
                                            ? 'bg-green-900/30 text-green-400 border border-green-500/20'
                                            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/20'
                                            }`}>
                                            {sale.status === 'PAID' ? 'PAGO' : 'PENDENTE'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon, color, highlight }: any) {
    return (
        <div className={`p-6 rounded-2xl border ${highlight
            ? 'bg-slate-900 border-purple-500/30 shadow-lg shadow-purple-900/10'
            : 'bg-slate-900 border-slate-800'
            }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-${color}-500/10 text-${color}-400`}>
                <Icon size={20} />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    );
}

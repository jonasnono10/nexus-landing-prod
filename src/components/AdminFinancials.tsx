'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FinancialData {
    grossRevenue: number;
    totalCommissions: number;
    totalAICost: number;
    netProfit: number;
    totalTokens: number;
    costsByGen: { genName: string; tokens: number; cost: number }[];
}

export default function AdminFinancials() {
    const [data, setData] = useState<FinancialData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/financials');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to fetch financials", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-cyan-400 animate-pulse">Carregando Dados Financeiros...</div>;
    if (!data) return <div className="text-red-500">Erro ao carregar dados.</div>;

    // Formatting currency
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    // KPI Logic for Alert
    // Simulating "User Cost > 30%" logic globally for the dashboard view
    // Alert if Total AI Cost > 30% of Gross Revenue (as a proxy for sustainability)
    const costPercentage = data.grossRevenue > 0 ? (data.totalAICost / data.grossRevenue) * 100 : 0;
    const isMarginDanger = costPercentage > 30;

    return (
        <div className="w-full p-6 space-y-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
                Painel Financeiro & Operacional
            </h2>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                    title="Receita Bruta"
                    value={formatCurrency(data.grossRevenue)}
                    icon="💰"
                    color="text-green-400"
                />
                <MetricCard
                    title="Custo Operacional IA"
                    value={formatCurrency(data.totalAICost)}
                    icon="🤖"
                    color={isMarginDanger ? "text-red-500 animate-pulse" : "text-cyan-400"}
                    subtext={`${costPercentage.toFixed(2)}% da Receita`}
                />
                <MetricCard
                    title="Comissões a Pagar"
                    value={formatCurrency(data.totalCommissions)}
                    icon="🤝"
                    color="text-yellow-400"
                />
                <MetricCard
                    title="Lucro Líquido"
                    value={formatCurrency(data.netProfit)}
                    icon="📈"
                    color={data.netProfit >= 0 ? "text-blue-400" : "text-red-500"}
                    highlight
                />
            </div>

            {/* Charts Section */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <span className="text-purple-400">📊</span> Consumo por Geração (Tokens)
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.costsByGen}>
                            <XAxis
                                dataKey="genName"
                                stroke="#9ca3af"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                fontSize={12}
                                tickFormatter={(val) => `${val}`}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                                itemStyle={{ color: '#aaa' }}
                                formatter={(value: number | undefined) => [value?.toLocaleString() ?? '0', 'Tokens']}
                            />
                            <Bar dataKey="tokens" radius={[4, 4, 0, 0]}>
                                {data.costsByGen.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#06b6d4'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Alert Indicator */}
            {isMarginDanger && (
                <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-ping"></div>
                    <strong>ALERTA DE MARGEM:</strong> O custo operacional de IA ultrapassou 30% da receita bruta. Verifique os prompts e usage.
                </div>
            )}
        </div>
    );
}

interface MetricCardProps {
    title: string;
    value: string;
    icon: string;
    color: string;
    subtext?: string;
    highlight?: boolean;
}

function MetricCard({ title, value, icon, color, subtext, highlight = false }: MetricCardProps) {
    return (
        <div className={`relative p-5 rounded-2xl border backdrop-blur-md transition-all hover:scale-105 duration-300
            ${highlight
                ? 'bg-gradient-to-br from-blue-900/40 to-black border-blue-500/30'
                : 'bg-black/40 border-white/10 hover:border-white/20'
            }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className={`text-2xl font-bold ${color}`}>
                {value}
            </div>
            {subtext && (
                <div className="text-xs text-gray-500 mt-1">
                    {subtext}
                </div>
            )}
        </div>
    );
}

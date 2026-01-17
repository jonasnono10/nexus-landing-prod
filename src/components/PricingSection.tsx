import { Check, Sparkles, Building2, Zap, Shield, Timer, User, Star, Crown } from 'lucide-react';
import { AccessLevel } from '@/lib/nexus-hub/types';

interface PlanProps {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    accessLevel: AccessLevel;
    highlighted?: boolean;
    buttonText: string;
    icon: React.ReactNode;
}

const PlanCard = ({ name, price, period, description, features, highlighted, buttonText, icon }: PlanProps) => {
    return (
        <div className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 w-full md:w-[350px] ${highlighted
            ? 'bg-slate-900/80 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-105 z-10'
            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}>
            {highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles size={12} fill="currentColor" />
                    Carro-Chefe (Melhor Valor)
                </div>
            )}

            <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${highlighted ? 'bg-blue-900/30 text-blue-400' : 'bg-slate-900 text-slate-400'
                    }`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                <p className="text-slate-400 text-sm h-12 leading-relaxed">{description}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-white">{price}</span>
                    {period && <span className="text-slate-500 ml-2">/{period}</span>}
                </div>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className={`mt-0.5 p-0.5 rounded-full ${highlighted ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'
                            }`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        {feature}
                    </li>
                ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${highlighted
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}>
                {buttonText}
            </button>
        </div>
    );
};

export default function PricingSection() {
    const plans: PlanProps[] = [
        {
            name: 'Teste (3 Dias)',
            price: 'Grátis',
            period: '',
            description: 'Acesso total para experimentar a sinergia dos agentes.',
            accessLevel: 'Free',
            features: [
                'Acesso Total por 72 horas',
                'Experimente os 30+ Gens',
                'Sem compromisso',
                'Ideal para Curiosos e Leads'
            ],
            buttonText: 'Iniciar Teste',
            icon: <Timer size={24} />
        },
        {
            name: 'Individual',
            price: 'R$ 49,90',
            period: 'mês',
            description: 'Escolha 1 Especialista fixo para resolver uma dor única.',
            accessLevel: 'Free', // Technically Free tier logic for now, or new tier
            features: [
                'Escolha 1 Gen Fixo (ex: Só StockMind)',
                'Acesso Ilimitado a esse Gen',
                'Histórico Básico',
                'Ideal para MEI'
            ],
            buttonText: 'Escolher Agente',
            icon: <User size={24} />
        },
        {
            name: 'Lite',
            price: 'R$ 100',
            period: 'mês',
            description: 'Pacote essencial para pequenos negócios.',
            accessLevel: 'Free', // Placeholder
            features: [
                'Acesso a 5 Agentes Básicos',
                'Inclui: Adminix, Mkt Digital, etc.',
                'Suporte via Comunidade',
                'Ideal para Pequenos Negócios'
            ],
            buttonText: 'Assinar Lite',
            icon: <Star size={24} />
        },
        {
            name: 'Pro (Combo)',
            price: 'R$ 250',
            period: 'mês',
            description: 'O Carro-Chefe. Todos os agentes + Supervisor Nexus.',
            accessLevel: 'Pro',
            highlighted: true,
            features: [
                'Acesso a TODOS os 30+ Gens',
                '⚡ Supervisor Nexus (Combos)',
                'Gens em Modo Turbo',
                'O seu "Carro-Chefe"'
            ],
            buttonText: 'Assinar Pro Army',
            icon: <Crown size={24} /> // Using Crown for Pro
        },
        {
            name: 'Enterprise',
            price: 'R$ 500',
            period: 'mês',
            description: 'Para empresas e franquias que buscam escala.',
            accessLevel: 'Enterprise',
            features: [
                'Suporte Prioritário',
                'Agentes de Expansão e Segurança',
                'Múltiplos Usuários',
                'API Dedicada'
            ],
            buttonText: 'Contratar Enterprise',
            icon: <Building2 size={24} />
        }
    ];

    return (
        <section id="plans" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-blue-900/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Escolha seu <span className="text-blue-500">Poder de Fogo</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Escalone sua operação com o plano ideal. Cancele ou mude de plano a qualquer momento.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 items-start">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} {...plan} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                        <Shield size={16} />
                        Pagamento seguro via Stripe. Garantia de 7 dias ou seu dinheiro de volta.
                    </p>
                </div>
            </div>
        </section>
    );
}

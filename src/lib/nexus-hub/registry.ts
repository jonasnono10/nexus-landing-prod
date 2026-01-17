import { Gen } from './types';

// Full Registry of 20 Gens for the Nexus Army Ecosystem
export const gensRegistry: Gen[] = [
    // 1. Operations & Admin
    {
        id: 'gen-001',
        name: 'Adminix',
        category: 'Operations',
        role: 'Automação de Gestão',
        description: 'Otimização de processos e workflows administrativos.',
        accessLevel: 'Free',
        status: 'active',
        capabilities: ['admin', 'workflow']
    },
    {
        id: 'gen-012',
        name: 'LegalMind',
        category: 'Operations',
        role: 'Assistente Jurídico',
        description: 'Análise de contratos e compliance automatizado.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['legal', 'contracts']
    },
    {
        id: 'gen-013',
        name: 'HR-Mate',
        category: 'Operations',
        role: 'Recursos Humanos',
        description: 'Triagem de currículos e onboarding de talentos.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['hr', 'recruiting']
    },

    // 2. Logistics & Stock
    {
        id: 'gen-002',
        name: 'StockMind Sneakers',
        category: 'Logistics',
        role: 'Estoque de Tênis',
        description: 'Gestão inteligente de estoque para lojas de tênis.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['inventory', 'sneakers', 'grid']
    },
    {
        id: 'gen-011',
        name: 'Sincronizador de Fornecedores',
        category: 'Logistics',
        role: 'Gestor de Reposição',
        description: 'Gestão de estoque, compras e integração com fornecedores.',
        accessLevel: 'Enterprise',
        status: 'active',
        capabilities: ['supply-chain', 'purchasing', 'suppliers']
    },
    {
        id: 'gen-014',
        name: 'Fluxo de Entregas',
        category: 'Logistics',
        role: 'Gestor Logístico',
        description: 'Planejamento, rastreamento e otimização de rotas e entregas.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['routes', 'delivery', 'tracking']
    },

    // 3. Marketing & Sales
    {
        id: 'gen-005',
        name: 'EcomMaster',
        category: 'Sales',
        role: 'E-commerce CRO',
        description: 'Aumento de conversão e recuperação de carrinho.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['ecommerce', 'sales']
    },
    {
        id: 'gen-009',
        name: 'PromoPlanner',
        category: 'Marketing',
        role: 'Calendário Promo',
        description: 'Planejamento de campanhas sazonais.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['planning', 'calendar']
    },
    {
        id: 'gen-008',
        name: 'Marketing Digital',
        category: 'Marketing',
        role: 'Gestor de Tráfego',
        description: 'Otimização de Ads (Meta/Google).',
        accessLevel: 'Free',
        status: 'active',
        capabilities: ['ads', 'marketing']
    },
    {
        id: 'gen-004',
        name: 'Tendência Social',
        category: 'Social',
        role: 'Analista de Conteúdo',
        description: 'Marketing digital, tendências de redes sociais e calendários de conteúdo.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['social-media', 'trends', 'content']
    },
    {
        id: 'gen-015',
        name: 'SalesFlow',
        category: 'Sales',
        role: 'Closer de Vendas',
        description: 'Scripts de vendas e negociação B2B.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['sales', 'negotiation']
    },
    {
        id: 'gen-007',
        name: 'Fidelização GEN',
        category: 'CRM',
        role: 'Customer Success',
        description: 'Estratégias de retenção e LTV.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['crm', 'retention']
    },

    // 4. Production & Creative
    {
        id: 'gen-003',
        name: 'ClothMaster',
        category: 'Production',
        role: 'Moda & Têxtil',
        description: 'Design de coleções e ficha técnica.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['fashion', 'textile']
    },
    {
        id: 'gen-010',
        name: 'PrintPlanner',
        category: 'Production',
        role: 'Produção Gráfica',
        description: 'Gestão de processos de impressão e embalagens.',
        accessLevel: 'Enterprise',
        status: 'active',
        capabilities: ['print', 'packaging']
    },
    {
        id: 'gen-16',
        name: 'CreativeBot',
        category: 'Creative',
        role: 'Designer Gráfico',
        description: 'Geração de assets visuais para redes sociais.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['design', 'images']
    },

    // 5. Tech & Strategy
    {
        id: 'gen-006',
        name: 'Expansão GEN',
        category: 'Strategy',
        role: 'Growth Strategist',
        description: 'Planejamento para franquias e expansão.',
        accessLevel: 'Enterprise',
        status: 'active',
        capabilities: ['strategy', 'growth']
    },
    {
        id: 'gen-17',
        name: 'Mestre Dev & Tech',
        category: 'Tech',
        role: 'Engenheiro Full Stack',
        description: 'Desenvolvimento, análise de sistemas e engenharia de prompts.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['code', 'dev', 'prompt-engineering', 'analysis']
    },
    {
        id: 'gen-18',
        name: 'CyberGuard',
        category: 'Tech',
        role: 'Segurança Digital',
        description: 'Análise de vulnerabilidades básicas.',
        accessLevel: 'Enterprise',
        status: 'active',
        capabilities: ['security', 'audit']
    },
    {
        id: 'gen-19',
        name: 'CloudOps',
        category: 'Tech',
        role: 'Gestor de Nuvem',
        description: 'Otimização de custos AWS/Azure.',
        accessLevel: 'Enterprise',
        status: 'active',
        capabilities: ['cloud', 'ops']
    },
    {
        id: 'gen-20',
        name: 'Assistente de Chat',
        category: 'Operations',
        role: 'Atendente Virtual',
        description: 'Suporte automático, agendamento e dúvidas frequentes.',
        accessLevel: 'Free',
        status: 'active',
        capabilities: ['support', 'chat', 'service']
    },
    {
        id: 'gen-021',
        name: 'Gênio de Precificação',
        category: 'Sales',
        role: 'Consultor de Preços',
        description: 'Especialista em precificação estratégica e análise de margem.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['pricing', 'margin', 'strategy']
    },
    {
        id: 'gen-022',
        name: 'Impulsionador de Vendas',
        category: 'Sales',
        role: 'Estrategista Comercial',
        description: 'Especialista em upsell, cross-sell e aumento de ticket médio.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['upsell', 'cross-sell', 'revenue']
    },
    {
        id: 'gen-023',
        name: 'Analista de Varejo',
        category: 'Strategy',
        role: 'Consultor de Performance',
        description: 'Análise de KPIs, vendas e eficiência operacional.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['analytics', 'kpi', 'performance']
    },
    {
        id: 'gen-024',
        name: 'Mestre de Salões',
        category: 'Operations',
        role: 'Gestão de Beleza',
        description: 'Gestão de agenda, estoque e lucro para salões/barbearias.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['schedule', 'stock', 'salon']
    },
    {
        id: 'gen-025',
        name: 'Rastreador Financeiro',
        category: 'Operations',
        role: 'Gestor de Fluxo de Caixa',
        description: 'Gestão financeira, fluxo de caixa e conciliação bancária.',
        accessLevel: 'Enterprise',
        status: 'active',
        capabilities: ['finance', 'cashflow', 'reporting']
    },
    {
        id: 'gen-026',
        name: 'FITTOK',
        category: 'Logistics',
        role: 'Estoque de Moda',
        description: 'Gestão de estoque, giro e reposição para varejo de moda.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['stock', 'fashion', 'turnover']
    },
    {
        id: 'gen-027',
        name: 'Barber Control IA',
        category: 'Operations',
        role: 'Consultor Barber',
        description: 'Gestão prática de lucro e estoque para barbearias.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['barber', 'profit', 'stock']
    },
    {
        id: 'gen-028',
        name: 'Tricologia Integrativa',
        category: 'Operations',
        role: 'Saúde Capilar',
        description: 'Orientação sobre queda de cabelo e saúde integrativa.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['tricology', 'health', 'hair']
    },
    {
        id: 'gen-029',
        name: 'Affiliate Booster',
        category: 'Marketing',
        role: 'Marketing de Afiliados',
        description: 'Especialista em criar materiais de divulgação para afiliados.',
        accessLevel: 'Free',
        status: 'active',
        capabilities: ['marketing', 'copywriting', 'affiliate']
    },
    // 30. PERSONAL
    {
        id: 'gen-030',
        name: 'Nexus Mental',
        category: 'Pessoal',
        role: 'Sua Segunda Mente',
        description: 'Sua extensão de memória pessoal. Guarda segredos, lembretes e ideias.',
        accessLevel: 'Pro',
        status: 'active',
        capabilities: ['memory', 'personal_assistant', 'lifelogging']
    },
    // CENTRAL INTELLIGENCE (Hidden from public lists usually, but needed in registry for lookups)
    {
        id: 'nexushub',
        name: 'Supervisor Nexus',
        category: 'Core',
        role: 'Inteligência Central',
        description: 'Orquestrador do ecossistema e analista de inteligência.',
        accessLevel: 'Admin', // Special level
        status: 'active',
        capabilities: ['orchestration', 'intelligence']
    }
];

export async function getAllGens(): Promise<Gen[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(gensRegistry), 50);
    });
}

export async function getGenById(id: string): Promise<Gen | undefined> {
    return gensRegistry.find(g => g.id === id);
}

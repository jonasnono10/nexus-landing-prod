import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm mb-8 animate-pulse">
                    <Sparkles size={16} />
                    <span>Produtividade Exponencial com IA</span>
                </div>

                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6">
                    Sua equipe de <br />
                    <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        especialistas digitais
                    </span> <br />
                    para negócios inteligentes
                </h1>

                <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
                    Elimine gargalos operacionais e multiplique a capacidade de entrega da sua empresa.
                    Nossos Agentes Autônomos (Gens) trabalham 24/7 para que você foque na estratégia.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-pointer">
                        Começar Agora
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-lg font-medium border border-slate-700 transition-all duration-300 cursor-pointer">
                        Ver Demo
                    </button>
                </div>
            </div>

            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </section>
    );
}

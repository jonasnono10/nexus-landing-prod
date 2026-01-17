import { Share2, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AffiliateSection() {
    const [affiliateCode, setAffiliateCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateLink = async () => {
        setLoading(true);
        // Simulate USER ID 1 for MVP demo
        const res = await fetch('/api/affiliate/generate', {
            method: 'POST',
            body: JSON.stringify({ userId: 'user-id-placeholder' })
        });
        const data = await res.json();

        if (data.code) {
            setAffiliateCode(data.code);
        }
        setLoading(false);
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Share2 size={20} className="text-purple-400" />
                        Programa de Afiliados
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                        Indique o Nexus Army e ganhe <span className="text-green-400 font-bold">30% de comissão</span> recorrente.
                    </p>
                </div>
                {!affiliateCode && (
                    <button
                        onClick={generateLink}
                        disabled={loading}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg"
                    >
                        {loading ? 'Gerando...' : 'Se tornar Afiliado'}
                    </button>
                )}
            </div>

            {affiliateCode && (
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 w-full">
                        <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Seu Link Exclusivo</label>
                        <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <span className="text-slate-300 font-mono text-sm truncate">
                                https://nexus.army/ref/{affiliateCode}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="text-center px-6 border-l border-slate-800">
                            <span className="block text-2xl font-bold text-white">0</span>
                            <span className="text-xs text-slate-500 uppercase">Cliques</span>
                        </div>
                        <div className="text-center px-6 border-l border-slate-800">
                            <span className="block text-2xl font-bold text-green-400">R$ 0,00</span>
                            <span className="text-xs text-slate-500 uppercase">Comissão</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

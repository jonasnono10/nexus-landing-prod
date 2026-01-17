'use client';

import { useState } from 'react';
import { Send, Sparkles, Zap, CheckCircle, MessageCircle } from 'lucide-react';

export default function GenDemoChat() {
    // STATES
    const [whatsapp, setWhatsapp] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        const cleanNumber = whatsapp.replace(/\D/g, '');
        if (cleanNumber.length < 10) {
            alert("Por favor, digite um número de WhatsApp válido com DDD.");
            return;
        }

        setStatus('loading');

        try {
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
            if (!webhookUrl) throw new Error("URL do Webhook não configurada.");

            // Sending Signup Payload to n8n
            // Note: We are using a specific structure so n8n knows this is a SIGNUP, not a chat message.
            const res = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'signup', // Flag for n8n router
                    phone: cleanNumber,
                    name: 'Visitante do Site', // We could ask for name too
                    timestamp: new Date().toISOString()
                })
            });

            if (!res.ok) throw new Error("Erro ao conectar com o servidor.");

            setStatus('success');

        } catch (error) {
            console.error("Signup Error", error);
            setStatus('error');
            setErrorMessage("Erro ao enviar. Tente novamente ou chame no suporte.");
        }
    };

    // RENDER: Success State
    if (status === 'success') {
        return (
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-lg mx-auto px-4 relative z-10 text-center">
                    <div className="bg-green-900/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 shadow-2xl ring-1 ring-green-500/20 animate-fade-in">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                            <CheckCircle size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Tudo Pronto!
                        </h2>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Acabamos de enviar uma mensagem para o seu WhatsApp <strong>{whatsapp}</strong>.
                        </p>
                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 mb-6">
                            <p className="text-sm text-slate-400">
                                <span className="text-green-400 font-bold">✓</span> Plano Teste Ativado<br />
                                <span className="text-green-400 font-bold">✓</span> 5 Créditos Liberados<br />
                                <span className="text-green-400 font-bold">✓</span> Supervisor Nexus Aguardando
                            </p>
                        </div>
                        <a
                            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                        >
                            <MessageCircle size={18} />
                            Abrir WhatsApp Web
                        </a>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            </section>
        );
    }

    // RENDER: Signup Form
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-lg mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
                    <Sparkles size={12} />
                    Teste Gratuito
                </div>

                <h2 className="text-3xl font-bold text-white mb-6">
                    Experimente o <span className="text-blue-500">Poder do Nexus</span>
                </h2>

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
                    <p className="text-slate-400 mb-6">
                        Digite seu WhatsApp para ativar seu <strong>Plano de Teste Gratuito</strong> e começar a conversar com nossos agentes agora mesmo.
                    </p>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <input
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                disabled={status === 'loading'}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Zap size={18} />
                                    Ativar Teste Grátis
                                </>
                            )}
                        </button>
                    </form>

                    {status === 'error' && (
                        <p className="text-red-400 text-sm mt-4 bg-red-900/20 p-2 rounded-lg border border-red-500/20">
                            {errorMessage}
                        </p>
                    )}

                    <p className="text-xs text-slate-500 mt-4">
                        *Sem necessidade de cartão de crédito.
                    </p>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </section>
    );
}

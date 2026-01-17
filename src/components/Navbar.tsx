'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <>
            <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                NEXUS ARMY
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="#gens" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Gens
                                </Link>
                                <Link href="#plans" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Planos
                                </Link>
                                <Link href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Sobre
                                </Link>
                                <button
                                    onClick={() => setIsAuthOpen(true)}
                                    className="text-white border border-blue-500 hover:bg-blue-500/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
                                >
                                    Login
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-pointer">
                                    Assine Agora
                                </button>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="text-gray-300 hover:text-white"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}

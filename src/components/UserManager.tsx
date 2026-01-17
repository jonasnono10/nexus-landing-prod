'use client';

import { useState, useEffect } from 'react';
import { Search, Shield, User, Star, Ban } from 'lucide-react';

export default function UserManager() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users', {
                headers: {
                    'x-nexus-admin-auth': 'secure-admin-access-v1',
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="text-blue-500" />
                    Gerenciamento de Tropa
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar soldado..."
                        className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800">
                        <tr>
                            <th className="p-4">Soldado</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Patente (Role)</th>
                            <th className="p-4">Plano</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">Carregando dados do QG...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">Nenhum usuário encontrado.</td></tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                                            {user.name?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        {user.name || 'Sem nome'}
                                    </td>
                                    <td className="p-4 text-slate-400">{user.email}</td>
                                    <td className="p-4">
                                        {user.role === 'Admin' ? (
                                            <span className="flex items-center gap-1 text-red-400 font-bold border border-red-900/50 bg-red-900/20 px-2 py-1 rounded text-xs w-fit">
                                                <Shield size={12} /> COMANDANTE
                                            </span>
                                        ) : (
                                            <span className="text-slate-300">Soldado</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${user.planType !== 'Free'
                                            ? 'bg-purple-900/20 border-purple-500/30 text-purple-400'
                                            : 'bg-slate-800 border-slate-700 text-slate-500'
                                            }`}>
                                            {user.planType}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-green-500 text-xs font-bold">● Ativo</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

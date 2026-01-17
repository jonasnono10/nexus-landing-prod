'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit, X } from 'lucide-react';

interface Gen {
    id: string;
    name: string;
    category: string;
    role: string;
    description: string;
    systemPrompt: string;
    accessLevel: string;
    status: string;
    capabilities: string;
}

export default function GenManager() {
    const [gens, setGens] = useState<Gen[]>([]);
    const [selectedGen, setSelectedGen] = useState<Gen | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchGens();
    }, []);

    const fetchGens = async () => {
        try {
            const res = await fetch('/api/admin/gens');
            const data = await res.json();
            if (data.success) {
                setGens(data.gens);
            }
        } catch (error) {
            console.error('Failed to fetch gens:', error);
        }
    };

    const handleSave = async () => {
        if (!selectedGen) return;

        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/gens/${selectedGen.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedGen)
            });

            const data = await res.json();
            if (data.success) {
                await fetchGens();
                setIsEditing(false);
                alert('✅ Gen atualizado com sucesso!');
            } else {
                alert('❌ Erro: ' + data.error);
            }
        } catch (error) {
            console.error('Failed to save gen:', error);
            alert('❌ Erro ao salvar');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este Gen?')) return;

        try {
            const res = await fetch(`/api/admin/gens/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                await fetchGens();
                setSelectedGen(null);
                alert('✅ Gen deletado');
            }
        } catch (error) {
            console.error('Failed to delete gen:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">🛠️ Gerenciador de Gens</h1>
                    <p className="text-slate-400">Edite os prompts e configurações dos seus especialistas</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* List Panel */}
                    <div className="lg:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            📋 Gens Cadastrados
                            <span className="text-sm text-slate-400">({gens.length})</span>
                        </h2>

                        <div className="space-y-2 max-h-[600px] overflow-y-auto">
                            {gens.map((gen) => (
                                <button
                                    key={gen.id}
                                    onClick={() => {
                                        setSelectedGen(gen);
                                        setIsEditing(false);
                                    }}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${selectedGen?.id === gen.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        }`}
                                >
                                    <div className="font-bold text-sm">{gen.name}</div>
                                    <div className="text-xs opacity-70">{gen.category} • {gen.accessLevel}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editor Panel */}
                    <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                        {selectedGen ? (
                            <>
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">{selectedGen.name}</h2>
                                    <div className="flex gap-2">
                                        {!isEditing ? (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                                            >
                                                <Edit size={16} />
                                                Editar
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                                                >
                                                    <X size={16} />
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                                                >
                                                    <Save size={16} />
                                                    {isSaving ? 'Salvando...' : 'Salvar'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-4">
                                    {/* Basic Info */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-300 mb-2">Nome</label>
                                            <input
                                                type="text"
                                                value={selectedGen.name}
                                                onChange={(e) => setSelectedGen({ ...selectedGen, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-300 mb-2">Categoria</label>
                                            <input
                                                type="text"
                                                value={selectedGen.category}
                                                onChange={(e) => setSelectedGen({ ...selectedGen, category: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">Role (Função)</label>
                                        <input
                                            type="text"
                                            value={selectedGen.role}
                                            onChange={(e) => setSelectedGen({ ...selectedGen, role: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">Descrição</label>
                                        <textarea
                                            value={selectedGen.description}
                                            onChange={(e) => setSelectedGen({ ...selectedGen, description: e.target.value })}
                                            disabled={!isEditing}
                                            rows={2}
                                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                        />
                                    </div>

                                    {/* System Prompt (Main Editor) */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">
                                            🧠 System Prompt (Instruções da IA)
                                        </label>
                                        <textarea
                                            value={selectedGen.systemPrompt}
                                            onChange={(e) => setSelectedGen({ ...selectedGen, systemPrompt: e.target.value })}
                                            disabled={!isEditing}
                                            rows={12}
                                            placeholder="Digite as instruções completas do Gen aqui..."
                                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50 font-mono text-sm"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            {selectedGen.systemPrompt.length} caracteres
                                        </p>
                                    </div>

                                    {/* Access & Status */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-300 mb-2">Nível de Acesso</label>
                                            <select
                                                value={selectedGen.accessLevel}
                                                onChange={(e) => setSelectedGen({ ...selectedGen, accessLevel: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                            >
                                                <option value="Free">Free</option>
                                                <option value="Pro">Pro</option>
                                                <option value="Enterprise">Enterprise</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-300 mb-2">Status</label>
                                            <select
                                                value={selectedGen.status}
                                                onChange={(e) => setSelectedGen({ ...selectedGen, status: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                            >
                                                <option value="active">Ativo</option>
                                                <option value="inactive">Inativo</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500">
                                Selecione um Gen para editar
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

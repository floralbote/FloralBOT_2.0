
import React, { useState } from 'react';
import type { Anamnese, EssenciaFloral } from '../types';

const mockFlorais: EssenciaFloral[] = [
    { id: 1, nome: "Mimulus", descricao: "Para medos de origem conhecida.", indicacoes: "Timidez, gagueira, medo de doença, escuro, etc.", tipo: "Medo" },
    { id: 2, nome: "Aspen", descricao: "Para medos e ansiedades vagas, de origem desconhecida.", indicacoes: "Pressentimentos, apreensão, pânico inexplicável.", tipo: "Medo" },
    { id: 3, nome: "Rock Rose", descricao: "Para terror e pânico extremos.", indicacoes: "Acidentes, emergências, pesadelos.", tipo: "Medo" },
    { id: 4, nome: "Gorse", descricao: "Para desesperança e pessimismo extremos.", indicacoes: "Sentimento de que não há mais o que fazer.", tipo: "Incerteza" },
    { id: 5, nome: "Impatiens", descricao: "Para impaciência e irritabilidade.", indicacoes: "Tensão mental, pressa, querer tudo na hora.", tipo: "Solidão" },
    { id: 6, nome: "Centaury", descricao: "Para os que não sabem dizer não e são submissos.", indicacoes: "Vontade fraca, facilmente dominado pelos outros.", tipo: "Hipersensibilidade" },
    { id: 7, nome: "Agrimony", descricao: "Para quem esconde tormentos atrás de um rosto alegre.", indicacoes: "Ansiedade escondida por humor, vício, busca de paz a qualquer custo.", tipo: "Hipersensibilidade" },
    { id: 8, nome: "Chicory", descricao: "Para os possessivos e superprotetores.", indicacoes: "Manipulação, autocomiseração, exige atenção e gratidão.", tipo: "Cuidado Excessivo" },
    { id: 9, nome: "Vervain", descricao: "Para excesso de entusiasmo e fanatismo.", indicacoes: "Tensão por excesso de esforço, tenta converter os outros, injustiça.", tipo: "Cuidado Excessivo" },
    { id: 10, nome: "Scleranthus", descricao: "Para indecisão entre duas opções.", indicacoes: "Oscilação de humor, falta de equilíbrio, não pede conselhos.", tipo: "Incerteza" },
];

const mockAnamneses: Anamnese[] = [
    {
        id: 1,
        data_criacao: "2024-07-28 10:30",
        sugestao_floral_ia: { floral: "Mimulus", motivo: "Usuário expressou medo específico de falar em público." },
        respostas_anamnese: [
            { id: '1', sender: 'bot', text: 'Olá! Como você está se sentindo?' },
            { id: '2', sender: 'user', text: 'Estou muito ansioso com uma apresentação no trabalho.' },
            { id: '3', sender: 'bot', text: 'Entendo. Pode me falar mais sobre esse sentimento?' },
            { id: '4', sender: 'user', text: 'Tenho muito medo de falar em público, de errar e ser julgado.' },
        ]
    },
    {
        id: 2,
        data_criacao: "2024-07-27 15:00",
        sugestao_floral_ia: { floral: "Impatiens", motivo: "Usuário demonstrou irritabilidade e pressa constantes." },
        respostas_anamnese: [
            { id: '1', sender: 'bot', text: 'Olá! Como posso ajudar?' },
            { id: '2', sender: 'user', text: 'Estou sempre sem paciência com as pessoas, tudo parece lento demais.' },
        ]
    }
];

const FloraisManager: React.FC = () => {
    // In a real app, this state would be managed via API calls
    const [florais, setFlorais] = useState<EssenciaFloral[]>(mockFlorais);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">Gerenciar Essências Florais</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-emerald-100 text-emerald-800">
                            <th className="p-3">Nome</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Indicações</th>
                            <th className="p-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {florais.map(floral => (
                            <tr key={floral.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{floral.nome}</td>
                                <td className="p-3">{floral.tipo}</td>
                                <td className="p-3 text-sm text-gray-600">{floral.indicacoes}</td>
                                <td className="p-3">
                                    <button className="text-blue-500 hover:underline mr-2">Editar</button>
                                    <button className="text-red-500 hover:underline">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <button className="mt-4 bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 transition">
                Adicionar Nova Essência
            </button>
        </div>
    );
};

const AnamnesesViewer: React.FC = () => {
    const [anamneses] = useState<Anamnese[]>(mockAnamneses);
    const [selected, setSelected] = useState<Anamnese | null>(null);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">Visualizar Anamneses</h3>
            {selected ? (
                <div>
                     <button onClick={() => setSelected(null)} className="mb-4 text-emerald-600 hover:underline">
                        &larr; Voltar para a lista
                    </button>
                    <h4 className="font-bold">Anamnese #{selected.id} - {selected.data_criacao}</h4>
                    <div className="mt-2 p-4 bg-gray-50 border rounded-lg max-h-64 overflow-y-auto">
                        {selected.respostas_anamnese.map(msg => (
                           <p key={msg.id} className={`${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                               <span className={`inline-block p-2 my-1 rounded-lg ${msg.sender === 'user' ? 'bg-emerald-100' : 'bg-gray-200'}`}>{msg.text}</span>
                           </p>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <h5 className="font-semibold text-emerald-800">Sugestão da IA:</h5>
                        <p><strong>Floral:</strong> {selected.sugestao_floral_ia.floral}</p>
                        <p><strong>Motivo:</strong> {selected.sugestao_floral_ia.motivo}</p>
                    </div>
                </div>
            ) : (
                <ul className="space-y-2">
                    {anamneses.map(item => (
                        <li key={item.id} onClick={() => setSelected(item)} className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-emerald-100 transition">
                            Anamnese #{item.id} - {item.data_criacao}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const MetricCard: React.FC<{ title: string; value: string; description: string }> = ({ title, value, description }) => (
  <div className="bg-emerald-50 p-6 rounded-lg shadow-lg text-center">
    <h4 className="text-lg font-semibold text-emerald-700">{title}</h4>
    <p className="text-4xl font-bold text-emerald-900 my-2">{value}</p>
    <p className="text-sm text-emerald-600">{description}</p>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
    <h3 className="text-xl font-bold text-emerald-700 mb-4">{title}</h3>
    {children}
  </div>
);

const MetricsDashboard: React.FC = () => {
    const featureImportance = [
        { name: 'Medo', value: 0.85, color: 'bg-red-400' },
        { name: 'Incerteza', value: 0.72, color: 'bg-yellow-400' },
        { name: 'Solidão', value: 0.65, color: 'bg-blue-400' },
        { name: 'Tristeza', value: 0.58, color: 'bg-indigo-400' },
        { name: 'Raiva', value: 0.40, color: 'bg-pink-400' },
    ];
    
    return (
        <div className="space-y-6 text-gray-800">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Acurácia do Modelo" value="92.5%" description="Percentual de previsões corretas." />
                <MetricCard title="Score R²" value="0.88" description="Ajuste do modelo aos dados." />
                <MetricCard title="AUC (Curva ROC)" value="0.95" description="Performance geral de classificação." />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <ChartCard title="Curva ROC">
                     <div className="relative h-64">
                         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                             {/* Axes */}
                             <line x1="10" y1="90" x2="90" y2="90" stroke="#9ca3af" strokeWidth="0.5" />
                             <line x1="10" y1="10" x2="10" y2="90" stroke="#9ca3af" strokeWidth="0.5" />
                             {/* Dashed line */}
                             <line x1="10" y1="90" x2="90" y2="10" stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="2" />
                             {/* ROC Curve */}
                             <path d="M 10 90 Q 20 50, 50 30 T 90 10" stroke="#10b981" strokeWidth="1.5" fill="none" />
                             
                             <text x="50" y="98" textAnchor="middle" fontSize="4" className="fill-gray-600">Taxa de Falsos Positivos</text>
                             <text x="2" y="50" textAnchor="middle" transform="rotate(-90, 2, 50)" fontSize="4" className="fill-gray-600">Taxa de Verdadeiros Positivos</text>
                         </svg>
                     </div>
                 </ChartCard>

                 <ChartCard title="Importância das Características">
                    <div className="space-y-3">
                        {featureImportance.map(feature => (
                             <div key={feature.name} className="w-full">
                                 <div className="flex justify-between mb-1">
                                     <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                                     <span className="text-sm font-medium text-gray-500">{feature.value}</span>
                                 </div>
                                 <div className="w-full bg-gray-200 rounded-full h-4">
                                     <div className={`${feature.color} h-4 rounded-full`} style={{ width: `${feature.value * 100}%` }}></div>
                                 </div>
                             </div>
                        ))}
                    </div>
                 </ChartCard>
            </div>
            
             <ChartCard title="Matriz de Confusão">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                         <thead>
                            <tr>
                                <th className="border p-3"></th>
                                <th colSpan={2} className="border p-3 text-center bg-emerald-50 text-emerald-800">Valores Preditos</th>
                            </tr>
                            <tr>
                                <th className="border p-3 bg-emerald-50 text-emerald-800">Valores Reais</th>
                                <th className="border p-3 font-medium bg-gray-50">Positivo</th>
                                <th className="border p-3 font-medium bg-gray-50">Negativo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-3 font-medium bg-gray-50">Positivo</td>
                                <td className="border p-3 text-center bg-green-100 text-green-800 font-bold">420 (VP)</td>
                                <td className="border p-3 text-center bg-red-100 text-red-800">15 (FP)</td>
                            </tr>
                            <tr>
                                <td className="border p-3 font-medium bg-gray-50">Negativo</td>
                                <td className="border p-3 text-center bg-orange-100 text-orange-800">22 (FN)</td>
                                <td className="border p-3 text-center bg-blue-100 text-blue-800 font-bold">543 (VN)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">VP: Verdadeiro Positivo, FP: Falso Positivo, FN: Falso Negativo, VN: Verdadeiro Negativo.</p>
            </ChartCard>

        </div>
    );
};


const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'florais' | 'anamneses' | 'metricas'>('florais');

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-white font-lora mb-6">
                Painel Administrativo
            </h2>
            <div className="flex justify-center border-b border-gray-200/50 mb-6">
                <button
                    onClick={() => setActiveTab('florais')}
                    className={`py-2 px-6 font-semibold transition-colors duration-300 ${activeTab === 'florais' ? 'border-b-2 border-emerald-400 text-emerald-300' : 'text-gray-400 hover:text-white'}`}
                >
                    Essências
                </button>
                <button
                    onClick={() => setActiveTab('anamneses')}
                    className={`py-2 px-6 font-semibold transition-colors duration-300 ${activeTab === 'anamneses' ? 'border-b-2 border-emerald-400 text-emerald-300' : 'text-gray-400 hover:text-white'}`}
                >
                    Anamneses
                </button>
                <button
                    onClick={() => setActiveTab('metricas')}
                    className={`py-2 px-6 font-semibold transition-colors duration-300 ${activeTab === 'metricas' ? 'border-b-2 border-emerald-400 text-emerald-300' : 'text-gray-400 hover:text-white'}`}
                >
                    Métricas
                </button>
            </div>

            <div>
                {activeTab === 'florais' && <FloraisManager />}
                {activeTab === 'anamneses' && <AnamnesesViewer />}
                {activeTab === 'metricas' && <MetricsDashboard />}
            </div>
        </div>
    );
};

export default AdminPage;

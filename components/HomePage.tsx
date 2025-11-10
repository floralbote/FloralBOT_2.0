
import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 font-lora mb-4">
          Bem-vindo ao FloralBot AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sua jornada de autoconhecimento e equilíbrio emocional com a ajuda dos florais de Bach começa aqui. Converse com nosso assistente virtual para descobrir as essências que podem harmonizar seu bem-estar.
        </p>
        <button
          onClick={() => onNavigate(Page.CHATBOT)}
          className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300 shadow-md"
        >
          Iniciar Consulta
        </button>
        <p className="mt-6 text-sm text-gray-500">
          Este serviço não substitui a consulta com um profissional de saúde.
        </p>
      </div>
    </div>
  );
};

export default HomePage;

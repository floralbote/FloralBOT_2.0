import React from 'react';
import { Page } from '../types';

interface WelcomePageProps {
  onNavigate: (page: Page) => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-l-4 border-emerald-500 pl-6 py-2 transition-all duration-300 hover:border-emerald-300 hover:bg-white/5 rounded-r-lg">
    <h3 className="text-xl font-bold text-emerald-200 font-lora mb-2">{title}</h3>
    <p className="text-emerald-100/90 leading-relaxed">{children}</p>
  </div>
);


const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- Left Column: Information --- */}
        <div className="animate-fade-in-left text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-lora mb-6 leading-tight">
            Desperte seu Equilíbrio Emocional.
          </h1>
          <p className="text-lg text-emerald-200 mb-10 leading-relaxed">
            O FloralBot AI é seu assistente virtual para o bem-estar. Através de uma conversa amigável, ele ajuda você a identificar suas emoções e sugere as essências florais de Bach mais indicadas para harmonizar seu estado de espírito.
          </p>
          
          <div className="space-y-8">
            <InfoCard title="Um Sistema de Cura Natural">
              A Terapia Floral de Bach é um sistema de cura natural, desenvolvido pelo Dr. Edward Bach. Baseia-se no uso de 38 essências extraídas de flores silvestres para equilibrar as emoções.
            </InfoCard>
            <InfoCard title="Equilíbrio para Suas Emoções">
              Dr. Bach acreditava que as emoções em desordem podiam causar doenças. As essências florais ajudam a harmonizar nosso interior, transformando sentimentos ruins em bons.
            </InfoCard>
          </div>

          <div className="text-left mt-12">
            <button
              onClick={() => onNavigate(Page.ABOUT)}
              className="text-emerald-300 hover:text-white hover:underline transition-colors duration-200 font-semibold text-lg"
            >
              Descubra mais sobre os florais &rarr;
            </button>
          </div>
        </div>

        {/* --- Right Column: Auth Card --- */}
        <div className="animate-fade-in-right">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.28 17.22C15.83 17.61 15.22 17.8 14.6 17.75C13.56 17.66 12.5 17.2 11.53 16.41C10.56 15.62 9.88 14.56 9.53 13.4C9.18 12.24 9.21 11 9.61 9.87C10.01 8.74 10.78 7.8 11.8 7.2C12.82 6.6 13.99 6.39 15.13 6.61C16.27 6.83 17.29 7.48 17.97 8.44C18.65 9.4 18.94 10.59 18.77 11.77C18.6 12.95 17.99 14.03 17.1 14.86L18.5 16.25L17.7 17.05L16.28 15.64C16.1 15.8 15.93 15.95 15.75 16.1C16.15 16.51 16.48 16.88 16.28 17.22Z" fill="currentColor"/>
                    </svg>
                    <h1 className="text-3xl font-bold text-emerald-700 font-lora">FloralBot AI</h1>
                </div>
                <p className="text-md text-gray-600 mb-8 text-center">
                    Sua jornada de bem-estar começa aqui.
                </p>

                <div className="space-y-4">
                    <button
                    onClick={() => onNavigate(Page.LOGIN)}
                    className="w-full bg-emerald-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300 shadow-md"
                    >
                    Login
                    </button>
                    <button
                    onClick={() => onNavigate(Page.SIGNUP)}
                    className="w-full bg-white text-emerald-500 border border-emerald-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-50 transition-transform transform hover:scale-105 duration-300"
                    >
                    Criar Conta
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => onNavigate(Page.HOME)}
                        className="text-sm text-gray-500 hover:text-emerald-600 hover:underline transition-colors duration-200"
                    >
                        Permanecer desconectado
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
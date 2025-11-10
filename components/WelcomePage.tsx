import React from 'react';
import { Page } from '../types';

interface WelcomePageProps {
  onNavigate: (page: Page) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center w-full animate-fade-in">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-md mx-auto w-full">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <svg className="w-12 h-12 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.28 17.22C15.83 17.61 15.22 17.8 14.6 17.75C13.56 17.66 12.5 17.2 11.53 16.41C10.56 15.62 9.88 14.56 9.53 13.4C9.18 12.24 9.21 11 9.61 9.87C10.01 8.74 10.78 7.8 11.8 7.2C12.82 6.6 13.99 6.39 15.13 6.61C16.27 6.83 17.29 7.48 17.97 8.44C18.65 9.4 18.94 10.59 18.77 11.77C18.6 12.95 17.99 14.03 17.1 14.86L18.5 16.25L17.7 17.05L16.28 15.64C16.1 15.8 15.93 15.95 15.75 16.1C16.15 16.51 16.48 16.88 16.28 17.22Z" fill="currentColor"/>
          </svg>
          <h1 className="text-4xl font-bold text-emerald-700 font-lora">FloralBot AI</h1>
        </div>
        <p className="text-lg text-gray-600 mb-8">
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

        <div className="mt-8">
            <button
              onClick={() => onNavigate(Page.HOME)}
              className="text-sm text-gray-500 hover:text-emerald-600 hover:underline transition-colors duration-200"
            >
              Permanecer desconectado
            </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
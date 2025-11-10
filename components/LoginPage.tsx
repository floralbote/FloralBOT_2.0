import React, { useState } from 'react';
import { Page } from '../types';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLoginSuccess: () => void;
}

// TODO: Atualize esta URL com o endereço gerado pelo seu notebook do Google Colab.
// O endereço será algo como: https://xxxxxxxx.ngrok-free.app
const API_BASE_URL = 'http://your-ngrok-url-from-colab.io';

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!API_BASE_URL || API_BASE_URL.includes('your-ngrok-url')) {
      setError('A URL da API não foi configurada. Por favor, atualize o placeholder no código.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha no login.');
      }
      
      // Save token and user info to local storage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('userEmail', data.userEmail);
      
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <div>
           <div className="flex items-center justify-center space-x-2 mb-4 cursor-pointer" onClick={() => onNavigate(Page.WELCOME)}>
              <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.28 17.22C15.83 17.61 15.22 17.8 14.6 17.75C13.56 17.66 12.5 17.2 11.53 16.41C10.56 15.62 9.88 14.56 9.53 13.4C9.18 12.24 9.21 11 9.61 9.87C10.01 8.74 10.78 7.8 11.8 7.2C12.82 6.6 13.99 6.39 15.13 6.61C16.27 6.83 17.29 7.48 17.97 8.44C18.65 9.4 18.94 10.59 18.77 11.77C18.6 12.95 17.99 14.03 17.1 14.86L18.5 16.25L17.7 17.05L16.28 15.64C16.1 15.8 15.93 15.95 15.75 16.1C16.15 16.51 16.48 16.88 16.28 17.22Z" fill="currentColor"/>
              </svg>
              <h1 className="text-xl font-bold text-emerald-700 font-lora">FloralBot AI</h1>
            </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-emerald-800 font-lora">
            Acesse sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">E-mail</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-emerald-700 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200" placeholder="E-mail" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-emerald-700 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200" placeholder="Senha" />
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105 duration-300 disabled:bg-emerald-400">
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <button type="button" onClick={() => onNavigate(Page.SIGNUP)} className="font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none">
                Cadastre-se
              </button>
            </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
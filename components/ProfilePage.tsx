import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { PencilIcon } from './icons/PencilIcon';

interface ProfilePageProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isAuthenticated, onLogout, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const storedName = localStorage.getItem('userName') || '';
      const storedEmail = localStorage.getItem('userEmail') || '';
      setName(storedName);
      setEmail(storedEmail);
    }
  }, [isAuthenticated]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to update user data
    console.log('Saving:', { name, email });
    // For demonstration, we can update localStorage as well
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setSuccessMessage('Perfil atualizado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    onLogout();
  };


  if (!isAuthenticated) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-emerald-700 font-lora mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar seu perfil.</p>
          <button
            onClick={() => onNavigate(Page.LOGIN)}
            className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300 shadow-md"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white p-8 rounded-lg shadow-md text-gray-800">
        <h2 className="text-3xl font-bold text-emerald-700 font-lora mb-6 text-center">
          Meu Perfil
        </h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <div className="relative">
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
               <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                 <PencilIcon />
               </span>
            </div>
          </div>
          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button
              type="submit"
              className="w-full bg-emerald-500 text-white font-bold py-3 px-6 rounded-full hover:bg-emerald-600 transition-transform transform hover:scale-105 duration-300"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-full hover:bg-red-600 transition-transform transform hover:scale-105 duration-300"
            >
              Sair (Logout)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

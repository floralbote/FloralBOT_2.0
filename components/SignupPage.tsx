import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface SignupPageProps {
  onNavigate: (page: Page) => void;
  onSignupSuccess: () => void;
}

// TODO: Atualize esta URL com o endereço gerado pelo seu notebook do Google Colab.
// O endereço será algo como: https://xxxxxxxx.ngrok-free.app
const API_BASE_URL = 'http://your-ngrok-url-from-colab.io';


const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dateInputType, setDateInputType] = useState('text');

  useEffect(() => {
    const isValid = 
        name.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        dateOfBirth !== '' &&
        age !== null && age >= 0 && // Garante que a idade seja um número válido
        gender !== '';
    setIsFormValid(isValid);
  }, [name, email, password, dateOfBirth, age, gender]);


  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dobString = e.target.value;
    setDateOfBirth(dobString);

    if (dobString) {
      const birthDate = new Date(`${dobString}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normaliza para o início do dia para uma comparação precisa

      // Verifica se a data é inválida (ex: 30 de Fev) ou se é uma data futura
      if (isNaN(birthDate.getTime()) || birthDate > today) {
        setAge(null); // Marca como inválida
        return;
      }

      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge >= 0 ? calculatedAge : null);
    } else {
      setAge(null); // Reseta se o campo for limpo
    }
  };
  
  const getAgeDisplay = () => {
      if(age !== null) return `${age} anos`;
      if(dateOfBirth) return "N/A"; // Data inserida, mas é inválida
      return "Idade"; // Placeholder quando o campo está vazio
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return; // Segurança extra
    
    setIsLoading(true);
    setError('');

    if (!API_BASE_URL || API_BASE_URL.includes('your-ngrok-url')) {
      setError('A URL da API não foi configurada. Por favor, atualize o placeholder no código.');
      setIsLoading(false);
      return;
    }

    // --- Etapa 1: Registrar o usuário ---
    try {
      const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // O backend atual só espera name, email e password.
        // Se o backend for atualizado para receber os novos campos, eles devem ser incluídos aqui.
        body: JSON.stringify({ name, email, password }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.message || 'Falha ao criar a conta.');
      }
      
      // --- Etapa 2: Logar o usuário automaticamente após o registro ---
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
          throw new Error(loginData.message || 'Conta criada, mas falha no login automático.');
      }

      // Salvar token e dados do usuário
      localStorage.setItem('authToken', loginData.token);
      localStorage.setItem('userName', loginData.userName);
      localStorage.setItem('userEmail', loginData.userEmail);
      
      onSignupSuccess();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <div>
          <div className="flex items-center justify-center space-x-2 mb-4 cursor-pointer" onClick={() => onNavigate(Page.WELCOME)}>
             <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.28 17.22C15.83 17.61 15.22 17.8 14.6 17.75C13.56 17.66 12.5 17.2 11.53 16.41C10.56 15.62 9.88 14.56 9.53 13.4C9.18 12.24 9.21 11 9.61 9.87C10.01 8.74 10.78 7.8 11.8 7.2C12.82 6.6 13.99 6.39 15.13 6.61C16.27 6.83 17.29 7.48 17.97 8.44C18.65 9.4 18.94 10.59 18.77 11.77C18.6 12.95 17.99 14.03 17.1 14.86L18.5 16.25L17.7 17.05L16.28 15.64C16.1 15.8 15.93 15.95 15.75 16.1C16.15 16.51 16.48 16.88 16.28 17.22Z" fill="currentColor"/>
              </svg>
              <h1 className="text-xl font-bold text-emerald-700 font-lora">FloralBot AI</h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-emerald-800 font-lora">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Para começar sua jornada de bem-estar.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-md">{error}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="sr-only">Nome Completo</label>
              <input id="full-name" name="name" type="text" required value={name} onChange={e => setName(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-emerald-700 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200" placeholder="Nome Completo" />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-grow relative">
                    <label htmlFor="date-of-birth" className="sr-only">Data de Nascimento</label>
                    <input
                        id="date-of-birth"
                        name="dateOfBirth"
                        type={dateInputType}
                        required
                        value={dateOfBirth}
                        onChange={handleDateOfBirthChange}
                        onFocus={() => setDateInputType('date')}
                        onBlur={() => { if (!dateOfBirth) setDateInputType('text'); }}
                        className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-emerald-700 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200"
                        placeholder="Data de Nascimento"
                    />
                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="flex-shrink-0 sm:w-28">
                     <div className={`relative block w-full h-full px-4 py-3 border rounded-md text-center flex items-center justify-center transition-colors ${getAgeDisplay() === 'N/A' ? 'bg-red-100 border-red-300 text-red-700' : 'bg-emerald-100 border-emerald-300 text-emerald-900'}`}>
                        <span className="text-sm font-semibold">{getAgeDisplay()}</span>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="gender" className="sr-only">Gênero</label>
                <select id="gender" name="gender" required value={gender} onChange={e => setGender(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200">
                    <option value="" disabled>Selecione seu gênero</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="NaoInformar">Prefiro não Informar</option>
                </select>
            </div>

            <div>
              <label htmlFor="email-address" className="sr-only">E-mail</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-emerald-700 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200" placeholder="E-mail" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-emerald-700 text-emerald-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm bg-emerald-200" placeholder="Senha" />
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading || !isFormValid} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 disabled:bg-emerald-300 disabled:cursor-not-allowed disabled:hover:bg-emerald-300 disabled:hover:scale-100 hover:scale-105">
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
           <p className="mt-2 text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <button type="button" onClick={() => onNavigate(Page.LOGIN)} className="font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none">
                Faça login
              </button>
            </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
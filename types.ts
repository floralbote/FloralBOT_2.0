export enum Page {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CHATBOT = 'CHATBOT',
  ADMIN = 'ADMIN',
  SIGNUP = 'SIGNUP',
  PROFILE = 'PROFILE',
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  isStreaming?: boolean;
}

export interface EssenciaFloral {
  id: number;
  nome: string;
  descricao: string;
  indicacoes: string;
  tipo: string;
}

export interface Anamnese {
  id: number;
  data_criacao: string;
  sugestao_floral_ia: { [key: string]: string };
  respostas_anamnese: ChatMessage[];
}

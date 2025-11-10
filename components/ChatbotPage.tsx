import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { createChat, sendMessageStream } from '../services/geminiService';
import { SendArrowIcon } from './icons/SendArrowIcon';

const CHAT_HISTORY_KEY = 'floralbot-chat-history';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';

  // Function to parse basic Markdown and render it as HTML.
  // This makes the bot's responses more readable.
  const renderFormattedText = (text: string) => {
    // Replace **bold** with <strong> tags.
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle list-like items starting with '*'.
    // Adds a line break and a bullet point for clarity.
    formattedText = formattedText.replace(/\s\*\s/g, '<br /><span class="ml-2">&bull;</span> ');
    
    // Convert explicit newlines from the model's response into <br> tags.
    formattedText = formattedText.replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };


  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-3 rounded-2xl max-w-md md:max-w-lg lg:max-w-xl break-words ${
          isUser
            ? 'bg-emerald-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none shadow-md'
        }`}
      >
        {isUser ? message.text : renderFormattedText(message.text)}
        {message.isStreaming && <span className="inline-block w-2 h-4 bg-gray-600 animate-pulse ml-1"></span>}
      </div>
    </div>
  );
};

const ChatbotPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const newChat = createChat();
        if (newChat) {
          setChat(newChat);
          const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
          if (savedHistory) {
            try {
              const parsedHistory = JSON.parse(savedHistory);
              if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
                setMessages(parsedHistory);
                return;
              }
            } catch (e) {
              console.error("Failed to parse chat history.", e);
              localStorage.removeItem(CHAT_HISTORY_KEY);
            }
          }
          setMessages([
            {
              id: 'initial',
              sender: 'bot',
              text: 'Olá! Sou o FloralBot. Como você está se sentindo hoje?',
            },
          ]);
        } else {
            setError("Não foi possível iniciar o chat. Verifique se a chave da API está configurada no ambiente.");
        }
      } catch (e) {
        console.error(e);
        setError("Ocorreu um erro ao iniciar o chat.");
      }
    };
    initChat();
  }, []);

  useEffect(() => {
     if (messages.length > 0) {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const botMessageId = (Date.now() + 1).toString();
    const newBotMessage: ChatMessage = { id: botMessageId, sender: 'bot', text: '', isStreaming: true };
    setMessages((prev) => [...prev, newBotMessage]);

    try {
      const stream = await sendMessageStream(chat, userMessage.text);
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }
      setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
          )
        );
    } catch (e) {
      console.error(e);
      setError("Desculpe, não consegui processar sua mensagem. Tente novamente.");
       setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: "Ocorreu um erro.", isStreaming: false } : msg
          )
        );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, chat]);

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto bg-emerald-800 rounded-2xl shadow-2xl border border-emerald-700 animate-fade-in">
      <div className="flex-grow p-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-emerald-700 bg-emerald-800 rounded-b-2xl">
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Aguarde a resposta..." : "Digite sua mensagem..."}
            className="flex-grow p-3 border border-emerald-600 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition bg-emerald-700 text-gray-100 placeholder-gray-400"
            disabled={isLoading || !chat}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !chat}
            className="bg-white text-emerald-500 p-3 rounded-full hover:bg-emerald-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-110"
            aria-label="Enviar mensagem"
          >
            <SendArrowIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
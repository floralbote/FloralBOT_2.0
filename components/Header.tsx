import React from 'react';
import { Page } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { InfoIcon } from './icons/InfoIcon';
import { ChatIcon } from './icons/ChatIcon';
import { UserIcon } from './icons/UserIcon';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NavButton: React.FC<{
  label: string;
  page: Page;
  activePage: Page;
  onClick: (page: Page) => void;
  children: React.ReactNode;
}> = ({ label, page, activePage, onClick, children }) => {
  const isActive = activePage === page;
  const baseClasses = 'flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200';
  const activeClasses = 'bg-emerald-100 text-emerald-800 font-semibold';
  const inactiveClasses = 'text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900';

  return (
    <button
      onClick={() => onClick(page)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
      <nav className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
          <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.28 17.22C15.83 17.61 15.22 17.8 14.6 17.75C13.56 17.66 12.5 17.2 11.53 16.41C10.56 15.62 9.88 14.56 9.53 13.4C9.18 12.24 9.21 11 9.61 9.87C10.01 8.74 10.78 7.8 11.8 7.2C12.82 6.6 13.99 6.39 15.13 6.61C16.27 6.83 17.29 7.48 17.97 8.44C18.65 9.4 18.94 10.59 18.77 11.77C18.6 12.95 17.99 14.03 17.1 14.86L18.5 16.25L17.7 17.05L16.28 15.64C16.1 15.8 15.93 15.95 15.75 16.1C16.15 16.51 16.48 16.88 16.28 17.22Z" fill="currentColor"/>
          </svg>
          <h1 className="text-xl font-bold text-emerald-800 font-lora">FloralBot AI</h1>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <NavButton label="Início" page={Page.HOME} activePage={activePage} onClick={onNavigate}>
            <HomeIcon />
          </NavButton>
          <NavButton label="Sobre" page={Page.ABOUT} activePage={activePage} onClick={onNavigate}>
            <InfoIcon />
          </NavButton>
          <NavButton label="Chatbot" page={Page.CHATBOT} activePage={activePage} onClick={onNavigate}>
            <ChatIcon />
          </NavButton>
          <NavButton label="Perfil" page={Page.PROFILE} activePage={activePage} onClick={onNavigate}>
            <UserIcon />
          </NavButton>
        </div>
      </nav>
    </header>
  );
};

export default Header;
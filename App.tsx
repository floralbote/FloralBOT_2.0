import React, { useState, useCallback } from 'react';
import { Page } from './types';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ChatbotPage from './components/ChatbotPage';
import AdminPage from './components/AdminPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.WELCOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    navigate(Page.HOME);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    navigate(Page.WELCOME);
  }, [navigate]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.WELCOME:
        return <WelcomePage onNavigate={navigate} />;
      case Page.LOGIN:
        return <LoginPage onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />;
      case Page.SIGNUP:
        return <SignupPage onNavigate={navigate} onSignupSuccess={handleLoginSuccess} />;
      case Page.HOME:
        return <HomePage onNavigate={navigate} />;
      case Page.ABOUT:
        return <AboutPage />;
      case Page.CHATBOT:
        return <ChatbotPage />;
      case Page.ADMIN:
        return <AdminPage />;
      case Page.PROFILE:
        return <ProfilePage isAuthenticated={isAuthenticated} onLogout={handleLogout} onNavigate={navigate} />;
      default:
        return <WelcomePage onNavigate={navigate} />;
    }
  };

  const isAuthPage = [Page.WELCOME, Page.LOGIN, Page.SIGNUP].includes(currentPage);

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col bg-emerald-900">
        <main className="flex-grow flex items-center justify-center p-4">
          {renderPage()}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-emerald-900">
      <Header activePage={currentPage} onNavigate={navigate} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
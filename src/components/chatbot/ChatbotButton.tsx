import { useState, useEffect } from 'react';
import './chatbot.css';

function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Carrega o script do chatbot apenas uma vez
    if (!isLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jotfor.ms/agent/embedjs/0199f3a548b0786299d682ce98cdfe96e0f8/embed.js';
      script.async = true;
      document.body.appendChild(script);
      setIsLoaded(true);

      return () => {
        // Cleanup: remove o script quando o componente for desmontado
        document.body.removeChild(script);
      };
    }
  }, [isLoaded]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button 
        className={`chatbot-button ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Abrir chatbot"
      >
        {isOpen ? (
          // Ícone de fechar (X)
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          // Ícone de chat
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Container do chatbot */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div className="chatbot-title">
                <h3>Assistente MedCentral</h3>
                <p>Online • Pronto para ajudar</p>
              </div>
            </div>
            <button 
              className="chatbot-close" 
              onClick={toggleChat}
              aria-label="Fechar chatbot"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="chatbot-iframe-wrapper">
            {/* O script do Jotform irá renderizar aqui */}
            <div id="jotform-chatbot"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotButton;
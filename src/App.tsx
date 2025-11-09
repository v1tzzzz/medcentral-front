import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Dashboard from './pages/App/Dashboard/Dashboard';
import Profile from './pages/App/Profile/Profile';
import KnowledgeBase from './pages/App/KnowledgeBase/KnowledgeBase';
import IssueTracking from './pages/App/IssueTracking/IssueTracking';

// Components
import Footer from './components/footer/footer';
import ChatbotButton from './components/chatbot/ChatbotButton';
import VLibras from './components/vlibras/VLibras';
import PrivateRoute from './routes/PrivateRoute';

import './App.css';

// Componente para gerenciar componentes globais
function GlobalComponents() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Não mostra footer/chatbot/vlibras na landing page (ela tem seu próprio footer)
  if (isLandingPage) {
    return <VLibras />;
  }

  // Mostra em todas as outras páginas
  return (
    <>
      <Footer />
      <ChatbotButton />
      <VLibras />
    </>
  );
}

function App() {
  const [usuario, setUsuario] = useState<{
    nome: string;
    autenticado: boolean;
  }>({
    nome: '',
    autenticado: false,
  });

  const handleLogin = (nome: string) => {
    setUsuario({
      nome,
      autenticado: true,
    });
  };

  const handleLogout = () => {
    setUsuario({
      nome: '',
      autenticado: false,
    });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* ===== ROTAS PÚBLICAS ===== */}
          
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Login - Se já autenticado, redireciona para dashboard */}
          <Route
            path="/login"
            element={
              usuario.autenticado ? (
                <Navigate to="/app/dashboard" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* ===== ROTAS PRIVADAS - ÁREA DO PACIENTE ===== */}
          
          {/* Dashboard */}
          <Route
            path="/app/dashboard"
            element={
              <PrivateRoute autenticado={usuario.autenticado}>
                <Dashboard nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Perfil */}
          <Route
            path="/app/perfil"
            element={
              <PrivateRoute autenticado={usuario.autenticado}>
                <Profile nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Base de Conhecimento */}
          <Route
            path="/app/ajuda"
            element={
              <PrivateRoute autenticado={usuario.autenticado}>
                <KnowledgeBase nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Rastreamento */}
          <Route
            path="/app/rastreamento"
            element={
              <PrivateRoute autenticado={usuario.autenticado}>
                <IssueTracking nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Redirect /app para /app/dashboard */}
          <Route
            path="/app"
            element={
              <Navigate
                to={usuario.autenticado ? '/app/dashboard' : '/login'}
                replace
              />
            }
          />

          {/* ===== ROTAS DA CLÍNICA (Futuro) ===== */}
          <Route
            path="/clinica/login"
            element={
              <div style={{ padding: '100px', textAlign: 'center' }}>
                <h1>Área da Clínica</h1>
                <p>Em desenvolvimento...</p>
              </div>
            }
          />

          {/* ===== 404 - PÁGINA NÃO ENCONTRADA ===== */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
                  Página não encontrada
                </h2>
                <p style={{ color: '#718096', marginBottom: '32px' }}>
                  A página que você está procurando não existe.
                </p>
                <button
                  onClick={() => (window.location.href = '/')}
                  style={{
                    padding: '12px 32px',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Voltar para Home
                </button>
              </div>
            }
          />
        </Routes>

        {/* Componentes Globais */}
        <GlobalComponents />
      </div>
    </BrowserRouter>
  );
}

export default App;
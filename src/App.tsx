import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';

// Patient Pages
import PatientDashboard from './pages/App/Patient/dashboard/Dashboard';
import Profile from './pages/App/Patient/profile/Profile';
import KnowledgeBase from './pages/App/Patient/KnowledgeBase/KnowledgeBase';

// Clinic Pages
import ClinicDashboard from './pages/App/Clinic/Dashboard/ClinicDashboard';

// Admin Pages
import IssueTracking from './pages/App/Admin/issueTracking/IssueTracking';

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
    tipo: 'patient' | 'clinic' | 'admin' | null;
    autenticado: boolean;
  }>({
    nome: '',
    tipo: null,
    autenticado: false,
  });

  const handleLogin = (nome: string, tipo: 'patient' | 'clinic' | 'admin') => {
    setUsuario({
      nome,
      tipo,
      autenticado: true,
    });
  };

  const handleLogout = () => {
    setUsuario({
      nome: '',
      tipo: null,
      autenticado: false,
    });
  };

  // Determina o dashboard correto baseado no tipo de usuário
  const getDashboardRoute = () => {
    switch (usuario.tipo) {
      case 'patient':
        return '/app/patient/dashboard';
      case 'clinic':
        return '/app/clinic/dashboard';
      case 'admin':
        return '/app/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* ===== ROTAS PÚBLICAS ===== */}
          
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Login - Se já autenticado, redireciona para dashboard apropriado */}
          <Route
            path="/login"
            element={
              usuario.autenticado ? (
                <Navigate to={getDashboardRoute()} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* ===== ROTAS PRIVADAS - ÁREA DO PACIENTE ===== */}
          
          {/* Patient Dashboard */}
          <Route
            path="/app/patient/dashboard"
            element={
              <PrivateRoute autenticado={usuario.autenticado && usuario.tipo === 'patient'}>
                <PatientDashboard nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Patient Profile */}
          <Route
            path="/app/patient/perfil"
            element={
              <PrivateRoute autenticado={usuario.autenticado && usuario.tipo === 'patient'}>
                <Profile nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Knowledge Base */}
          <Route
            path="/app/patient/ajuda"
            element={
              <PrivateRoute autenticado={usuario.autenticado && usuario.tipo === 'patient'}>
                <KnowledgeBase nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* ===== ROTAS PRIVADAS - ÁREA DA CLÍNICA ===== */}
          
          {/* Clinic Dashboard */}
          <Route
            path="/app/clinic/dashboard"
            element={
              <PrivateRoute autenticado={usuario.autenticado && usuario.tipo === 'clinic'}>
                <ClinicDashboard nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* ===== ROTAS PRIVADAS - ÁREA DO ADMIN ===== */}
          
          {/* Admin Dashboard */}
          <Route
            path="/app/admin/dashboard"
            element={
              <PrivateRoute autenticado={usuario.autenticado && usuario.tipo === 'admin'}>
                <IssueTracking nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Issue Tracking (Admin) */}
          <Route
            path="/app/admin/issue-tracking"
            element={
              <PrivateRoute autenticado={usuario.autenticado && usuario.tipo === 'admin'}>
                <IssueTracking nomeUsuario={usuario.nome} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Redirect /app para dashboard apropriado */}
          <Route
            path="/app"
            element={
              <Navigate
                to={usuario.autenticado ? getDashboardRoute() : '/login'}
                replace
              />
            }
          />

          {/* Backward compatibility routes */}
          <Route path="/app/dashboard" element={<Navigate to="/app/patient/dashboard" replace />} />
          <Route path="/app/perfil" element={<Navigate to="/app/patient/perfil" replace />} />
          <Route path="/app/ajuda" element={<Navigate to="/app/patient/ajuda" replace />} />
          <Route path="/app/rastreamento" element={<Navigate to="/app/admin/issue-tracking" replace />} />

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

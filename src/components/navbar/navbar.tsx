import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';

interface NavbarProps {
  nomeUsuario: string;
  onLogout: () => void;
}

function Navbar({ nomeUsuario, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // Determina o tipo de usuário baseado na rota
  const getUserType = (): 'patient' | 'clinic' | 'admin' => {
    if (location.pathname.includes('/patient/')) return 'patient';
    if (location.pathname.includes('/clinic/')) return 'clinic';
    if (location.pathname.includes('/admin/')) return 'admin';
    return 'patient'; // default
  };

  const userType = getUserType();

  // Define quais botões mostrar para cada tipo de usuário
  const showDashboard = userType === 'patient' || userType === 'clinic' || userType === 'admin';
  const showKnowledgeBase = userType === 'patient';
  const showIssueTracking = userType === 'admin';

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo clicável */}
        <div 
          className="navbar-brand" 
          onClick={() => {
            if (userType === 'patient') navigate('/app/patient/dashboard');
            if (userType === 'clinic') navigate('/app/clinic/dashboard');
            if (userType === 'admin') navigate('/app/admin/dashboard');
          }}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="../../../public/LOGO-MEDCENTRAL.png" 
            alt="MedCentral Logo" 
            className="navbar-logo"
          />
          <h1 className="navbar-title">MedCentral</h1>
        </div>

        {/* Menu de Navegação - CONDICIONAL POR TIPO DE USUÁRIO */}
        <div className="navbar-menu">
          {/* Dashboard - Mostrar para TODOS */}
          {showDashboard && (
            <button 
              onClick={() => {
                if (userType === 'patient') navigate('/app/patient/dashboard');
                if (userType === 'clinic') navigate('/app/clinic/dashboard');
                if (userType === 'admin') navigate('/app/admin/dashboard');
              }}
              className={`nav-link ${
                (userType === 'patient' && location.pathname === '/app/patient/dashboard') ||
                (userType === 'clinic' && location.pathname === '/app/clinic/dashboard') ||
                (userType === 'admin' && location.pathname === '/app/admin/dashboard')
                ? 'active' : ''
              }`}
            >
              🏠 Dashboard
            </button>
          )}
          
          {/* Base de Conhecimento - APENAS PACIENTE */}
          {showKnowledgeBase && (
            <button 
              onClick={() => navigate('/app/patient/ajuda')}
              className={`nav-link ${location.pathname === '/app/patient/ajuda' ? 'active' : ''}`}
            >
              📚 Base de Conhecimento
            </button>
          )}
          
          {/* Rastreamento - APENAS ADMIN */}
          {showIssueTracking && (
            <button 
              onClick={() => navigate('/app/admin/issue-tracking')}
              className={`nav-link ${location.pathname === '/app/admin/issue-tracking' ? 'active' : ''}`}
            >
              📊 Rastreamento
            </button>
          )}
        </div>

        {/* User Menu */}
        <div className="navbar-user">
          <span className="user-greeting">Olá, {nomeUsuario}!</span>
          
          {/* Botão Perfil - APENAS PACIENTE */}
          {userType === 'patient' && (
            <button 
              onClick={() => navigate('/app/patient/perfil')}
              className="btn-perfil"
            >
              👤 Perfil
            </button>
          )}
          
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

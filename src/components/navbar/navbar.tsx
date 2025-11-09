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

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo clicável */}
        <div 
          className="navbar-brand" 
          onClick={() => navigate('/app/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/logo-sem-fundo.png" 
            alt="MedCentral Logo" 
            className="navbar-logo"
          />
          <h1 className="navbar-title">MedCentral</h1>
        </div>

        {/* Menu de Navegação */}
        <div className="navbar-menu">
          <button 
            onClick={() => navigate('/app/dashboard')}
            className={`nav-link ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
          >
            🏠 Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/app/ajuda')}
            className={`nav-link ${location.pathname === '/app/ajuda' ? 'active' : ''}`}
          >
            📚 Base de Conhecimento
          </button>
          
          <button 
            onClick={() => navigate('/app/rastreamento')}
            className={`nav-link ${location.pathname === '/app/rastreamento' ? 'active' : ''}`}
          >
            📊 Rastreamento
          </button>
        </div>

        {/* User Menu */}
        <div className="navbar-user">
          <span className="user-greeting">Olá, {nomeUsuario}!</span>
          <button 
            onClick={() => navigate('/app/perfil')}
            className="btn-perfil"
          >
            👤 Perfil
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

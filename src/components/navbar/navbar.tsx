import './navbar.css';

interface NavbarProps {
  nomeUsuario: string;
  irParaPerfil: () => void;
  onLogout: () => void;
  irParaDashboard?: () => void;
  irParaBaseConhecimento?: () => void;
  irParaRastreamento?: () => void;
}

function Navbar({ 
  nomeUsuario, 
  irParaPerfil, 
  onLogout,
  irParaDashboard,
  irParaBaseConhecimento,
  irParaRastreamento
}: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={irParaDashboard} style={{ cursor: 'pointer' }}>
          <img 
            src="/LOGO-MEDCENTRAL-SemFundo.png" 
            alt="MedCentral Logo" 
            className="navbar-logo"
          />
          <h1 className="navbar-title">MedCentral</h1>
        </div>

        {/* Menu de Navegação - Sempre Visível */}
        <div className="navbar-menu">
          {irParaDashboard && (
            <button onClick={irParaDashboard} className="nav-link">
              🏠 Dashboard
            </button>
          )}
          {irParaBaseConhecimento && (
            <button onClick={irParaBaseConhecimento} className="nav-link">
              📚 Base de Conhecimento
            </button>
          )}
          {irParaRastreamento && (
            <button onClick={irParaRastreamento} className="nav-link">
              📊 Rastreamento
            </button>
          )}
        </div>

        <div className="navbar-user">
          <span className="user-greeting">Olá, {nomeUsuario}!</span>
          <button onClick={irParaPerfil} className="btn-perfil">
            👤 Perfil
          </button>
          <button onClick={onLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
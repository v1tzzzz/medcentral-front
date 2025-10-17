import './navbar.css';

interface NavbarProps {
  nomeUsuario: string;
  irParaPerfil: () => void;
  onLogout: () => void;
}

function Navbar({ nomeUsuario, irParaPerfil, onLogout }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <h1>MedCentral</h1>
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
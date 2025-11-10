import { useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/navbar/navbar';
import './profile.css';

interface ProfileProps {
  nomeUsuario: string;
  onLogout: () => void;
}

function Profile({ nomeUsuario, onLogout }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <Navbar 
        nomeUsuario={nomeUsuario} 
        onLogout={onLogout}
      />
      
      <main className="profile-main">
        <div className="profile-content">
          <button onClick={() => navigate('/app/patient/dashboard')} className="btn-voltar">
            ← Voltar ao Dashboard
          </button>
          
          <div className="profile-card">
            <div className="profile-avatar">
              <span>{nomeUsuario.charAt(0).toUpperCase()}</span>
            </div>
            
            <h2>{nomeUsuario}</h2>
            
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">usuario@medcentral.com</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Telefone:</span>
                <span className="info-value">(11) 99999-9999</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">CPF:</span>
                <span className="info-value">000.000.000-00</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Data de Nascimento:</span>
                <span className="info-value">01/01/1990</span>
              </div>
            </div>
            {/*}
            <button className="btn-editar">
              Editar Perfil
            </button>
            */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;

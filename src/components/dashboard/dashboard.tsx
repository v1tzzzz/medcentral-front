import { useState } from 'react';
import Navbar from '../navbar/navbar';
import './dashboard.css';

interface DashboardProps {
  nomeUsuario: string;
  irParaPerfil: () => void;
  onLogout: () => void;
}

interface Agendamento {
  id: number;
  medico: string;
  especialidade: string;
  data: string;
  hora: string;
}

function Dashboard({ nomeUsuario, irParaPerfil, onLogout }: DashboardProps) {
  const [agendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      medico: 'Dr. João Silva',
      especialidade: 'Cardiologista',
      data: '25/10/2025',
      hora: '14:00'
    },
    {
      id: 2,
      medico: 'Dra. Maria Santos',
      especialidade: 'Dermatologista',
      data: '28/10/2025',
      hora: '10:30'
    }
  ]);

  const handleNovoAgendamento = () => {
    alert('Funcionalidade de novo agendamento em desenvolvimento!');
  };

  return (
    <div className="dashboard-container">
      <Navbar 
        nomeUsuario={nomeUsuario} 
        irParaPerfil={irParaPerfil}
        onLogout={onLogout}
      />
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2>Meus Agendamentos</h2>
            <button onClick={handleNovoAgendamento} className="btn-novo">
              + Novo Agendamento
            </button>
          </div>

          <div className="agendamentos-grid">
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id} className="agendamento-card">
                <div className="agendamento-info">
                  <h3>{agendamento.medico}</h3>
                  <p className="especialidade">{agendamento.especialidade}</p>
                </div>
                <div className="agendamento-datetime">
                  <span className="data">📅 {agendamento.data}</span>
                  <span className="hora">🕐 {agendamento.hora}</span>
                </div>
              </div>
            ))}
          </div>

          {agendamentos.length === 0 && (
            <div className="empty-state">
              <p>Você ainda não possui agendamentos.</p>
              <button onClick={handleNovoAgendamento} className="btn-primary">
                Agendar Consulta
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
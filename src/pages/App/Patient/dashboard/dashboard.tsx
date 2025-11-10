import { useState } from 'react';
import Navbar from '../../../../components/navbar/navbar';
import './dashboard.css';

interface DashboardProps {
  nomeUsuario: string;
  onLogout: () => void;
}

interface Agendamento {
  id: number;
  medico: string;
  especialidade: string;
  data: string;
  hora: string;
}

function Dashboard({ 
  nomeUsuario, 
  irParaPerfil, 
  onLogout,
  irParaDashboard,
  irParaBaseConhecimento,
  irParaRastreamento
}: DashboardProps) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
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

  const [modalAberto, setModalAberto] = useState(false);
  const [novoAgendamento, setNovoAgendamento] = useState({
    medico: '',
    especialidade: '',
    data: '',
    hora: ''
  });

  // Opções para os dropdowns
  const medicos = [
    { nome: 'Dr. João Silva', especialidade: 'Cardiologista' },
    { nome: 'Dra. Maria Santos', especialidade: 'Dermatologista' },
    { nome: 'Dr. Pedro Oliveira', especialidade: 'Ortopedista' },
    { nome: 'Dra. Ana Costa', especialidade: 'Pediatra' },
    { nome: 'Dr. Carlos Mendes', especialidade: 'Neurologista' }
  ];

  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleNovoAgendamento = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovoAgendamento({
      medico: '',
      especialidade: '',
      data: '',
      hora: ''
    });
  };

  const handleMedicoChange = (nomeMedico: string) => {
    const medicoSelecionado = medicos.find(m => m.nome === nomeMedico);
    setNovoAgendamento({
      ...novoAgendamento,
      medico: nomeMedico,
      especialidade: medicoSelecionado?.especialidade || ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novoAgendamento.medico && novoAgendamento.data && novoAgendamento.hora) {
      const novoId = agendamentos.length > 0 
        ? Math.max(...agendamentos.map(a => a.id)) + 1 
        : 1;

      const agendamento: Agendamento = {
        id: novoId,
        medico: novoAgendamento.medico,
        especialidade: novoAgendamento.especialidade,
        data: formatarData(novoAgendamento.data),
        hora: novoAgendamento.hora
      };

      setAgendamentos([...agendamentos, agendamento]);
      fecharModal();
    }
  };

  const formatarData = (dataISO: string): string => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const excluirAgendamento = (id: number) => {
    setAgendamentos(agendamentos.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-container">
      <Navbar 
        nomeUsuario={nomeUsuario} 
        irParaPerfil={irParaPerfil}
        onLogout={onLogout}
        irParaDashboard={irParaDashboard}
        irParaBaseConhecimento={irParaBaseConhecimento}
        irParaRastreamento={irParaRastreamento}
      />
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2>Meus Agendamentos</h2>
            <button onClick={handleNovoAgendamento} className="btn-novo">
              + Novo Agendamento
            </button>
          </div>

          {agendamentos.length > 0 ? (
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
                  <button 
                    className="btn-excluir"
                    onClick={() => excluirAgendamento(agendamento.id)}
                    title="Excluir agendamento"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Você ainda não possui agendamentos.</p>
              <button onClick={handleNovoAgendamento} className="btn-primary">
                Agendar Consulta
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Agendamento */}
      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Novo Agendamento</h2>
              <button className="btn-close-modal" onClick={fecharModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="medico">Médico *</label>
                <select
                  id="medico"
                  value={novoAgendamento.medico}
                  onChange={(e) => handleMedicoChange(e.target.value)}
                  required
                >
                  <option value="">Selecione um médico</option>
                  {medicos.map((medico) => (
                    <option key={medico.nome} value={medico.nome}>
                      {medico.nome} - {medico.especialidade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="data">Data *</label>
                <input
                  type="date"
                  id="data"
                  value={novoAgendamento.data}
                  onChange={(e) => setNovoAgendamento({
                    ...novoAgendamento,
                    data: e.target.value
                  })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">Horário *</label>
                <select
                  id="hora"
                  value={novoAgendamento.hora}
                  onChange={(e) => setNovoAgendamento({
                    ...novoAgendamento,
                    hora: e.target.value
                  })}
                  required
                >
                  <option value="">Selecione um horário</option>
                  {horarios.map((horario) => (
                    <option key={horario} value={horario}>
                      {horario}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={fecharModal} className="btn-cancelar">
                  Cancelar
                </button>
                <button type="submit" className="btn-confirmar">
                  Agendar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

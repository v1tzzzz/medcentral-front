import { useState } from 'react';
import Navbar from '../../../../components/navbar/navbar';
import './clinicDashboard.css';

interface ClinicDashboardProps {
  nomeUsuario: string;
  onLogout: () => void;
}

interface Appointment {
  id: number;
  time: string;
  patient: string;
  type: string;
  status: 'confirmed' | 'pending';
}

function ClinicDashboard({ nomeUsuario, onLogout }: ClinicDashboardProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const appointments: Appointment[] = [
    {
      id: 1,
      time: '09:00',
      patient: 'Emily Rodriguez',
      type: 'Checkup Geral',
      status: 'confirmed'
    },
    {
      id: 2,
      time: '10:30',
      patient: 'Michael Chen',
      type: 'Acompanhamento',
      status: 'confirmed'
    },
    {
      id: 3,
      time: '11:45',
      patient: 'Sarah Williams',
      type: 'Consulta',
      status: 'pending'
    },
    {
      id: 4,
      time: '14:00',
      patient: 'David Park',
      type: 'Vacinação',
      status: 'confirmed'
    }
  ];

  const weeklyData = [
    { day: 'Seg', value: 32, height: 80 },
    { day: 'Ter', value: 26, height: 65 },
    { day: 'Qua', value: 36, height: 90 },
    { day: 'Qui', value: 30, height: 75 },
    { day: 'Sex', value: 28, height: 70 },
    { day: 'Sáb', value: 12, height: 30 },
    { day: 'Dom', value: 10, height: 25 }
  ];

  const recentActivity = [
    { icon: '✓', type: 'success', text: 'Nova consulta confirmada', time: '5 minutos atrás' },
    { icon: '📅', type: 'info', text: 'Consulta reagendada', time: '1 hora atrás' },
    { icon: '⚠️', type: 'warning', text: 'Lembrete de pagamento enviado', time: '2 horas atrás' },
    { icon: '💰', type: 'success', text: 'Pagamento recebido - R$ 150', time: '3 horas atrás' }
  ];

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="clinic-dashboard-container">
      <Navbar nomeUsuario={nomeUsuario} onLogout={onLogout} />

      <div className="clinic-header">
        <div className="clinic-header-content">
          <div className="clinic-header-left">
            <h1>🏥 {nomeUsuario}</h1>
            <span className="clinic-subtitle">Painel de Gerenciamento da Clínica</span>
          </div>
          <div className="clinic-header-right">
            <button className="header-btn">📋 Relatórios</button>
            <button className="header-btn">⚙️ Configurações</button>
          </div>
        </div>
      </div>

      <main className="clinic-main">
        <div className="clinic-content">
          {/* Métricas Principais */}
          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-header">
                <h3>Consultas de Hoje</h3>
                <span className="metric-icon">📅</span>
              </div>
              <div className="metric-value">24</div>
              <div className="metric-change positive">+3 em relação a ontem</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Total Semanal</h3>
                <span className="metric-icon">📊</span>
              </div>
              <div className="metric-value">156</div>
              <div className="metric-change positive">+12% em relação à semana passada</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Receita Este Mês</h3>
                <span className="metric-icon">💰</span>
              </div>
              <div className="metric-value">R$ 45.280</div>
              <div className="metric-change positive">+8% em relação ao mês passado</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Satisfação dos Pacientes</h3>
                <span className="metric-icon">⭐</span>
              </div>
              <div className="metric-value">4.8/5</div>
              <div className="metric-change neutral">Baseado em 127 avaliações</div>
            </div>
          </div>

          {/* Calendário e Agenda */}
          <div className="dashboard-row">
            <div className="dashboard-card">
              <div className="card-header">
                <h3>📅 Novembro 2025</h3>
                <div className="calendar-nav">
                  <button className="nav-btn">‹</button>
                  <button className="nav-btn">›</button>
                </div>
              </div>
              <div className="calendar">
                <div className="calendar-grid">
                  <div className="calendar-header">Dom</div>
                  <div className="calendar-header">Seg</div>
                  <div className="calendar-header">Ter</div>
                  <div className="calendar-header">Qua</div>
                  <div className="calendar-header">Qui</div>
                  <div className="calendar-header">Sex</div>
                  <div className="calendar-header">Sáb</div>
                  
                  {calendarDays.map((day) => (
                    <div
                      key={day}
                      className={`calendar-day ${day === 9 ? 'today' : ''} ${selectedDay === day ? 'selected' : ''}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3>⏰ Agenda de Hoje</h3>
                <span className="schedule-count">{appointments.length} consultas</span>
              </div>
              <div className="schedule-list">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="schedule-item">
                    <div className="schedule-time">{appointment.time}</div>
                    <div className="schedule-details">
                      <div className="schedule-patient">{appointment.patient}</div>
                      <div className="schedule-type">{appointment.type}</div>
                    </div>
                    <div className={`schedule-status ${appointment.status}`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gráfico Semanal e Atividades Recentes */}
          <div className="dashboard-row">
            <div className="dashboard-card">
              <div className="card-header">
                <h3>📈 Tendências Semanais de Consultas</h3>
              </div>
              <div className="weekly-chart">
                <div className="chart-bars">
                  {weeklyData.map((data, index) => (
                    <div key={index} className="chart-bar-wrapper">
                      <div
                        className={`chart-bar ${data.day === 'Sáb' || data.day === 'Dom' ? 'weekend' : ''}`}
                        style={{ height: `${data.height}%` }}
                      >
                        <div className="bar-value">{data.value}</div>
                      </div>
                      <div className="bar-label">{data.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3>🔔 Atividade Recente</h3>
              </div>
              <div className="activity-list">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-text">{activity.text}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="quick-actions">
            <h3>Ações Rápidas</h3>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">➕</span>
                <span className="action-text">Nova Consulta</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">👤</span>
                <span className="action-text">Adicionar Paciente</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span className="action-text">Ver Relatórios</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">💬</span>
                <span className="action-text">Enviar Lembretes</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClinicDashboard;

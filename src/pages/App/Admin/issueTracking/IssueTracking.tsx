import { useState, useEffect } from 'react';
import Navbar from '../../../../components/navbar/navbar';
import './issueTracking.css';

interface IssueTrackingProps {
  nomeUsuario: string;
  onLogout: () => void;
}

interface ProblemaData {
  tipo: string;
  quantidade: number;
}

function IssueTracking({ 
  nomeUsuario, 
  irParaPerfil, 
  onLogout,
  irParaDashboard,
  irParaBaseConhecimento,
  irParaRastreamento
}: IssueTrackingProps) {
  const [simulacaoAtiva, setSimulacaoAtiva] = useState(false);
  const [satisfacao, setSatisfacao] = useState(87);

  // Dados estáticos iniciais
  const dadosEstaticos: ProblemaData[] = [
    { tipo: 'Recuperar Senha', quantidade: 45 },
    { tipo: 'Alterar Dados', quantidade: 32 },
    { tipo: 'Clínica Não Encontrada', quantidade: 28 },
    { tipo: 'Erro no Agendamento', quantidade: 15 },
    { tipo: 'Problemas de Login', quantidade: 22 },
    { tipo: 'Cancelar Consulta', quantidade: 18 }
  ];

  const [dados, setDados] = useState<ProblemaData[]>(dadosEstaticos);

  useEffect(() => {
  let intervalo: ReturnType<typeof setInterval>;

  if (simulacaoAtiva) {
    intervalo = setInterval(() => {
      const novosDados = dadosEstaticos.map(item => ({
        tipo: item.tipo,
        quantidade: Math.floor(Math.random() * 60) + 10
      }));
      setDados(novosDados);
      setSatisfacao(Math.floor(Math.random() * 30) + 70);
    }, 2000);
  } else {
    setDados(dadosEstaticos);
    setSatisfacao(87);
  }

  return () => {
    if (intervalo) clearInterval(intervalo);
  };
}, [simulacaoAtiva]);

  const toggleSimulacao = () => {
    setSimulacaoAtiva(!simulacaoAtiva);
  };

  const maxQuantidade = Math.max(...dados.map(d => d.quantidade));
  const totalProblemas = dados.reduce((acc, d) => acc + d.quantidade, 0);

  const getSatisfacaoColor = () => {
    if (satisfacao >= 80) return '#4ade80'; // Verde
    if (satisfacao >= 60) return '#fbbf24'; // Amarelo
    return '#ef4444'; // Vermelho
  };

  const getSatisfacaoTexto = () => {
    if (satisfacao >= 80) return 'Excelente';
    if (satisfacao >= 60) return 'Boa';
    return 'Precisa Melhorar';
  };

  return (
    <div className="issue-tracking-container">
      <Navbar 
        nomeUsuario={nomeUsuario} 
        irParaPerfil={irParaPerfil}
        onLogout={onLogout}
        irParaDashboard={irParaDashboard}
        irParaBaseConhecimento={irParaBaseConhecimento}
        irParaRastreamento={irParaRastreamento}
      />
      
      <main className="issue-tracking-main">
        <div className="issue-tracking-content">
          <div className="it-header">
            <div className="it-title-section">
              <h2>📊 Rastreamento de Problemas</h2>
              <p>Monitoramento de solicitações e satisfação dos usuários</p>
            </div>

            <button 
              className={`btn-simulacao ${simulacaoAtiva ? 'active' : ''}`}
              onClick={toggleSimulacao}
            >
              {simulacaoAtiva ? (
                <>
                  <span className="pulse-dot"></span>
                  Desligar Simulação
                </>
              ) : (
                <>
                  ▶ Iniciar Simulação
                </>
              )}
            </button>
          </div>

          {/* Barra de Satisfação */}
          <div className="satisfaction-card">
            <div className="satisfaction-header">
              <h3>Taxa de Satisfação dos Usuários</h3>
              <div className="satisfaction-badge" style={{ backgroundColor: getSatisfacaoColor() }}>
                {getSatisfacaoTexto()}
              </div>
            </div>
            
            <div className="satisfaction-bar-container">
              <div className="satisfaction-bar">
                <div 
                  className="satisfaction-fill"
                  style={{ 
                    width: `${satisfacao}%`,
                    backgroundColor: getSatisfacaoColor()
                  }}
                >
                  <span className="satisfaction-percentage">{satisfacao}%</span>
                </div>
              </div>
            </div>

            <div className="satisfaction-info">
              <p>
                <strong>{satisfacao}%</strong> dos usuários ficaram satisfeitos com a resolução
              </p>
            </div>
          </div>

          {/* Estatísticas Gerais */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon blue">📋</div>
              <div className="stat-info">
                <p className="stat-label">Total de Solicitações</p>
                <p className="stat-value">{totalProblemas}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">✅</div>
              <div className="stat-info">
                <p className="stat-label">Problemas Resolvidos</p>
                <p className="stat-value">{Math.floor(totalProblemas * (satisfacao / 100))}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">⏱️</div>
              <div className="stat-info">
                <p className="stat-label">Tempo Médio de Resposta</p>
                <p className="stat-value">2.5h</p>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Quantidade de Solicitações por Tipo de Problema</h3>
              {simulacaoAtiva && (
                <span className="live-indicator">
                  <span className="live-dot"></span>
                  Ao Vivo
                </span>
              )}
            </div>

            <div className="chart-container">
              <div className="chart-y-axis">
                <span className="y-label">{maxQuantidade}</span>
                <span className="y-label">{Math.floor(maxQuantidade * 0.75)}</span>
                <span className="y-label">{Math.floor(maxQuantidade * 0.5)}</span>
                <span className="y-label">{Math.floor(maxQuantidade * 0.25)}</span>
                <span className="y-label">0</span>
              </div>

              <div className="chart-bars">
                {dados.map((item, index) => (
                  <div key={index} className="bar-group">
                    <div className="bar-container">
                      <div 
                        className="bar"
                        style={{ 
                          height: `${(item.quantidade / maxQuantidade) * 100}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <span className="bar-value">{item.quantidade}</span>
                      </div>
                    </div>
                    <div className="bar-label">{item.tipo}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-x-label">Tipos de Problemas</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IssueTracking;

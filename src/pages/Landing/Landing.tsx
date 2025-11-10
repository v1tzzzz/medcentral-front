import { useNavigate } from 'react-router-dom';
import VLibras from '../../components/vlibras/VLibras';
import './landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navbar Simples */}
      <nav className="landing-navbar">
        <div className="landing-navbar-content">
          <div className="landing-logo">
            <img src="/LOGO-MEDCENTRAL-SemFundo.png" alt="MedCentral" />
            <h1>MedCentral</h1>
          </div>
          <button 
            className="btn-login"
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Agende sua consulta
            <br />
            <span className="text-gradient">de forma simples</span>
          </h1>
          <p className="hero-subtitle">
            Encontre médicos, agende consultas e gerencie sua saúde em um só lugar.
            Rápido, fácil e seguro.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-primary-large"
              onClick={() => navigate('/login')}
            >
              <span className="btn-icon">👤</span>
              Sou Paciente
            </button>
            <button 
              className="btn-secondary-large"
              onClick={() => navigate('/login')}
            >
              <span className="btn-icon">🏥</span>
              Sou Clínica
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <strong>1000+</strong>
              <span>Médicos cadastrados</span>
            </div>
            <div className="stat">
              <strong>500+</strong>
              <span>Clínicas parceiras</span>
            </div>
            <div className="stat">
              <strong>5000+</strong>
              <span>Consultas agendadas</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-card card-1">
            <div className="card-icon">📅</div>
            <h3>Consulta Agendada</h3>
            <p>Dr. João Silva</p>
            <p className="card-time">Hoje, 14:00</p>
          </div>
          
          <div className="hero-card card-2">
            <div className="card-icon">✅</div>
            <h3>Confirmado</h3>
            <p>Dra. Maria Santos</p>
            <p className="card-time">Amanhã, 10:30</p>
          </div>

          <div className="hero-card card-3">
            <div className="card-icon">🔔</div>
            <h3>Lembrete</h3>
            <p>Exame de sangue</p>
            <p className="card-time">Sexta, 08:00</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>Como funciona</h2>
          <p>Agendar uma consulta nunca foi tão fácil</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Agende Online</h3>
            <p>Escolha data e horário que melhor se adequam à sua rotina. Sem ligações ou espera.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Encontre Especialistas</h3>
            <p>Busque por especialidade, localização ou plano de saúde. Centenas de médicos disponíveis.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Gerencie Tudo</h3>
            <p>Acompanhe suas consultas, exames e histórico médico em um único lugar.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Lembretes Automáticos</h3>
            <p>Receba notificações de suas consultas e nunca mais esqueça um compromisso.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Pagamento Seguro</h3>
            <p>Pague online com segurança. Aceitamos cartão, pix e diversos planos de saúde.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Avaliações Reais</h3>
            <p>Veja avaliações de outros pacientes antes de escolher seu médico.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Pronto para começar?</h2>
          <p>Junte-se a milhares de pessoas que já cuidam da saúde com o MedCentral</p>
          <button 
            className="btn-cta"
            onClick={() => navigate('/login')}
          >
            Criar Conta Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>MedCentral</h4>
            <p>Sua saúde em primeiro lugar</p>
          </div>
          
          <div className="footer-section">
            <h4>Pacientes</h4>
            <ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/login">Cadastro</a></li>
              <li><a href="/">Início</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Clínicas</h4>
            <ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/login">Cadastro</a></li>
              <li><a href="/">Planos</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Empresa</h4>
            <ul>
              <li><a href="/">Sobre</a></li>
              <li><a href="/">Contato</a></li>
              <li><a href="https://github.com/v1tzzzz/medcentral-front" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 MedCentral. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* VLibras - IMPORTANTE: Incluído na landing page */}
      <VLibras />
    </div>
  );
}

export default Landing;

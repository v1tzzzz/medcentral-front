import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface LoginProps {
  onLogin: (nome: string, tipo: 'paciente' | 'clinica' | 'admin') => void;
}

// Credenciais fake para teste
const CREDENCIAIS_FAKE = {
  paciente: {
    email: 'paciente@medcentral.com',
    senha: 'paciente123',
    nome: 'João Silva'
  },
  clinica: {
    email: 'clinica@medcentral.com',
    senha: 'clinica123',
    nome: 'Clínica São Paulo'
  },
  admin: {
    email: 'admin@medcentral.com',
    senha: 'admin123',
    nome: 'Administrador'
  }
};

function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState<'paciente' | 'clinica' | 'admin'>('paciente');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [erro, setErro] = useState<string>('');
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro('');

    // Validação fake
    const credencial = CREDENCIAIS_FAKE[tipoUsuario];
    
    if (email === credencial.email && senha === credencial.senha) {
      // Login bem-sucedido
      onLogin(credencial.nome, tipoUsuario);
    } else {
      // Credenciais inválidas
      setErro('Email ou senha incorretos. Tente novamente.');
    }
  };

  const handleVoltar = () => {
    navigate('/');
  };

  const preencherCredenciais = () => {
    const credencial = CREDENCIAIS_FAKE[tipoUsuario];
    setEmail(credencial.email);
    setSenha(credencial.senha);
  };

  return (
    <div className="login-container">
      {/* Botão Voltar */}
      <button onClick={handleVoltar} className="btn-voltar-landing">
        ← Voltar para Início
      </button>

      <div className="login-card">
        <div className="login-header">
          <h1>MedCentral</h1>
          <p>Sistema de Agendamento Médico</p>
        </div>

        {/* Seleção de Tipo de Usuário */}
        <div className="user-type-selector">
          <button
            type="button"
            className={`type-btn ${tipoUsuario === 'paciente' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('paciente');
              setErro('');
              setEmail('');
              setSenha('');
            }}
          >
            <span className="type-icon">👤</span>
            <span>Paciente</span>
          </button>
          <button
            type="button"
            className={`type-btn ${tipoUsuario === 'clinica' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('clinica');
              setErro('');
              setEmail('');
              setSenha('');
            }}
          >
            <span className="type-icon">🏥</span>
            <span>Clínica</span>
          </button>
          <button
            type="button"
            className={`type-btn ${tipoUsuario === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('admin');
              setErro('');
              setEmail('');
              setSenha('');
            }}
          >
            <span className="type-icon">⚡</span>
            <span>Admin</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Mensagem de Erro */}
          {erro && (
            <div className="erro-mensagem">
              <span className="erro-icon">⚠️</span>
              <span>{erro}</span>
            </div>
          )}

          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="senha-input-wrapper">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                id="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-mostrar-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Entrar como {tipoUsuario === 'paciente' ? 'Paciente' : tipoUsuario === 'clinica' ? 'Clínica' : 'Admin'}
          </button>
        </form>

        {/* Credenciais de Teste */}
        <div className="login-footer">
          <p className="demo-info">Versão de demonstração</p>
          <button
            type="button"
            className="btn-demo"
            onClick={preencherCredenciais}
          >
            Preencher credenciais de teste
          </button>
          <div className="credentials-info">
            <p><strong>{tipoUsuario === 'paciente' ? 'Paciente' : tipoUsuario === 'clinica' ? 'Clínica' : 'Admin'}:</strong></p>
            <p>Email: {CREDENCIAIS_FAKE[tipoUsuario].email}</p>
            <p>Senha: {CREDENCIAIS_FAKE[tipoUsuario].senha}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

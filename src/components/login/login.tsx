import { useState, type FormEvent } from 'react';
import './login.css';

interface LoginProps {
  onLogin: (nome: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [nome, setNome] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (nome.trim()) {
      onLogin(nome);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>MedCentral</h1>
          <p>Sistema de Agendamento Médico</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
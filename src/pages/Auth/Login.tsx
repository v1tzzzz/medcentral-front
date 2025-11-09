import { useState } from 'react';
import './login.css';

interface LoginProps {
  onLogin: (nome: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [nome, setNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      onLogin(nome);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

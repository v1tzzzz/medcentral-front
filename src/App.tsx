import { useState } from 'react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile';
import Footer from './components/footer/footer';
import './App.css';

function App() {
  const [nomeUsuario, setNomeUsuario] = useState<string>('');
  const [telaAtual, setTelaAtual] = useState<'login' | 'dashboard' | 'profile'>('login');

  const handleLogin = (nome: string) => {
    setNomeUsuario(nome);
    setTelaAtual('dashboard');
  };

  const irParaDashboard = () => {
    setTelaAtual('dashboard');
  };

  const irParaPerfil = () => {
    setTelaAtual('profile');
  };

  const handleLogout = () => {
    setNomeUsuario('');
    setTelaAtual('login');
  };

  return (
    <div className="app">
      {telaAtual === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      
      {telaAtual === 'dashboard' && (
        <Dashboard 
          nomeUsuario={nomeUsuario}
          irParaPerfil={irParaPerfil}
          onLogout={handleLogout}
        />
      )}
      
      {telaAtual === 'profile' && (
        <Profile 
          nomeUsuario={nomeUsuario}
          irParaDashboard={irParaDashboard}
          onLogout={handleLogout}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;

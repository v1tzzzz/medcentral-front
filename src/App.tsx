import { useState } from 'react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile';
import KnowledgeBase from './components/knowledgeBase/KnowledgeBase';
import IssueTracking from './components/issueTracking/IssueTracking';
import Footer from './components/footer/footer';
import ChatbotButton from './components/chatbot/ChatbotButton';
import './App.css';

type Pagina = 'login' | 'dashboard' | 'profile' | 'knowledgeBase' | 'issueTracking';

function App() {
  const [nomeUsuario, setNomeUsuario] = useState<string>('');
  const [telaAtual, setTelaAtual] = useState<Pagina>('login');

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

  const irParaBaseConhecimento = () => {
    setTelaAtual('knowledgeBase');
  };

  const irParaRastreamento = () => {
    setTelaAtual('issueTracking');
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
          irParaDashboard={irParaDashboard}
          irParaBaseConhecimento={irParaBaseConhecimento}
          irParaRastreamento={irParaRastreamento}
        />
      )}
     
      {telaAtual === 'profile' && (
        <Profile
          nomeUsuario={nomeUsuario}
          irParaDashboard={irParaDashboard}
          onLogout={handleLogout}
          irParaPerfil={irParaPerfil}
          irParaBaseConhecimento={irParaBaseConhecimento}
          irParaRastreamento={irParaRastreamento}
        />
      )}

      {telaAtual === 'knowledgeBase' && (
        <KnowledgeBase
          nomeUsuario={nomeUsuario}
          irParaPerfil={irParaPerfil}
          onLogout={handleLogout}
          irParaDashboard={irParaDashboard}
          irParaBaseConhecimento={irParaBaseConhecimento}
          irParaRastreamento={irParaRastreamento}
        />
      )}

      {telaAtual === 'issueTracking' && (
        <IssueTracking
          nomeUsuario={nomeUsuario}
          irParaPerfil={irParaPerfil}
          onLogout={handleLogout}
          irParaDashboard={irParaDashboard}
          irParaBaseConhecimento={irParaBaseConhecimento}
          irParaRastreamento={irParaRastreamento}
        />
      )}
     
      {/* Footer e Chatbot aparecem apenas quando NÃO for login */}
      {telaAtual !== 'login' && (
        <>
          <Footer />
          <ChatbotButton />
        </>
      )}
    </div>
  );
}

export default App;
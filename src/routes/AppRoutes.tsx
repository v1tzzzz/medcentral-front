import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import Cadastro from '../pages/Auth/Cadastro';
import Dashboard from '../pages/App/Dashboard/Dashboard';
import Profile from '../pages/App/Profile/Profile';
import KnowledgeBase from '../pages/App/KnowledgeBase/KnowledgeBase';
import IssueTracking from '../pages/App/IssueTracking/IssueTracking';

// Components
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  const [usuario, setUsuario] = useState<{
    nome: string;
    autenticado: boolean;
  }>({
    nome: '',
    autenticado: false
  });

  const handleLogin = (nome: string) => {
    setUsuario({
      nome,
      autenticado: true
    });
  };

  const handleLogout = () => {
    setUsuario({
      nome: '',
      autenticado: false
    });
  };

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          usuario.autenticado ? 
            <Navigate to="/app/dashboard" /> : 
            <Login onLogin={handleLogin} />
        } 
      />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas Privadas - Área do Paciente */}
      <Route 
        path="/app/dashboard" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <Dashboard 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/app/perfil" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <Profile 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/app/ajuda" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <KnowledgeBase 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/app/rastreamento" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <IssueTracking 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />

      {/* Redirect /app para /app/dashboard */}
      <Route path="/app" element={<Navigate to="/app/dashboard" />} />

      {/* 404 - Página não encontrada */}
      
    </Routes>
  );
}

export default AppRoutes;

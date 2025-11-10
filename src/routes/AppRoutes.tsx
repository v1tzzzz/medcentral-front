import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import PatientDashboard from '../pages/App/Patient/dashboard/Dashboard';
import PatientProfile from '../pages/App/Patient/profile/Profile';
import PatientKnowledgeBase from '../pages/App/Patient/knowledgeBase/KnowledgeBase';
import AdminIssueTracking from '../pages/App/Admin/issueTracking/IssueTracking';
import ClinicDashboard from '../pages/App/Clinic/Dashboard/ClinicDashboard';

// Components
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  const [usuario, setUsuario] = useState<{
    nome: string;
    tipo: 'patient' | 'clinic' | 'admin' | null;
    autenticado: boolean;
  }>({
    nome: '',
    tipo: null,
    autenticado: false
  });

  const handleLogin = (nome: string, tipo: 'patient' | 'clinic' | 'admin') => {
    setUsuario({
      nome,
      tipo,
      autenticado: true
    });
  };

  const handleLogout = () => {
    setUsuario({
      nome: '',
      tipo: null,
      autenticado: false
    });
  };

  const getDashboardPath = () => {
    if (usuario.tipo === 'patient') return '/app/patient/dashboard';
    if (usuario.tipo === 'clinic') return '/app/clinic/dashboard';
    if (usuario.tipo === 'admin') return '/app/admin/dashboard';
    return '/login';
  };

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          usuario.autenticado ? 
            <Navigate to={getDashboardPath()} /> : 
            <Login onLogin={handleLogin} />
        } 
      />

      {/* Rotas Privadas - Paciente */}
      <Route 
        path="/app/patient/dashboard" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <PatientDashboard 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/app/patient/perfil" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <PatientProfile 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/app/patient/ajuda" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <PatientKnowledgeBase
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      
      {/* Rotas Privadas - Clínica */}
      <Route 
        path="/app/clinic/dashboard" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <ClinicDashboard
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />

      {/* Rotas Privadas - Admin */}
      <Route 
        path="/app/admin/issue-tracking" 
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            <AdminIssueTracking 
              nomeUsuario={usuario.nome}
              onLogout={handleLogout}
            />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/app/admin/dashboard"
        element={
          <PrivateRoute autenticado={usuario.autenticado}>
            {/* O ideal é ter um dashboard de admin, mas redirecionamos para o rastreamento por enquanto */}
            <Navigate to="/app/admin/issue-tracking" />
          </PrivateRoute>
        }
      />

      {/* Redirects */}
      <Route path="/app" element={<Navigate to={getDashboardPath()} />} />
      <Route path="/app/patient" element={<Navigate to="/app/patient/dashboard" />} />
      <Route path="/app/clinic" element={<Navigate to="/app/clinic/dashboard" />} />
      <Route path="/app/admin" element={<Navigate to="/app/admin/dashboard" />} />

      {/* 404 - Página não encontrada */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;

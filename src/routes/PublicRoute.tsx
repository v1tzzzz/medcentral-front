import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
  autenticado: boolean;
}

function PublicRoute({ children, autenticado }: PublicRouteProps) {
  // Se estiver autenticado, redireciona para o dashboard
  if (autenticado) {
    return <Navigate to="/app/dashboard" replace />;
  }

  // Se não estiver autenticado, renderiza o conteúdo
  return <>{children}</>;
}

export default PublicRoute;

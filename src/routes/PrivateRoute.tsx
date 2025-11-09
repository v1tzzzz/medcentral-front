import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement;
  autenticado: boolean;
}

function PrivateRoute({ children, autenticado }: PrivateRouteProps) {
  // Se não estiver autenticado, redireciona para login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, clona o elemento filho e passa as props
  return children;
}

export default PrivateRoute;

import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function RequireAuth({ role, children }) {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'seller' ? '/seller' : '/dashboard'} replace />;
  }

  return children;
}

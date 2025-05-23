import { useAuth } from '@/hooks/use-Auth';
import { Navigate, Outlet } from 'react-router-dom'


export const PrivateRoutes = () => {
     const { isAuthenticated } = useAuth();

     return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

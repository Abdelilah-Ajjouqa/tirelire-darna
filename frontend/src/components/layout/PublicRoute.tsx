import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/hooks';

const PublicRoute = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
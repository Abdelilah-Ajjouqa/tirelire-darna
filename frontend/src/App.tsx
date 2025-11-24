import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { checkAuth } from './store/slices/authSlice';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      dispatch(checkAuth());
    }
  }, [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/auth" 
          element={!isAuthenticated ? <AuthLayout /> : <Navigate to="/" />} 
        />

        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
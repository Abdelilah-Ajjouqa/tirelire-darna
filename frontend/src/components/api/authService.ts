import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const register = async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);

    if (response.data.data) {
        localStorage.setItem('token', response.data.data.token);
    }
    return response.data.data;
};

const login = async (userData: any) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    return response.data.data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

const checkAuth = async () => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
}

const authService = {
    register,
    login,
    logout,
    checkAuth
};

export default authService;
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { login } from '../../store/slices/authSlice';

interface LoginProps {
    onSwitch: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    {loading ? 'Signing In...' : 'Login'}
                </button>
            </form>

            <div className="mt-6 text-center border-t pt-4">
                <p className="text-sm text-gray-600">Don't have an account?</p>
                <button
                    onClick={onSwitch}
                    className="text-blue-600 font-semibold hover:underline text-sm mt-1"
                >
                    Create an account
                </button>
            </div>
        </div>
    );
};

export default Login;
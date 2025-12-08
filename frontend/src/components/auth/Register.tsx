import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { registerUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create Account</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label className="block text-gray-700 text-xs font-bold mb-1">First Name</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700 text-xs font-bold mb-1">Last Name</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>

            <div className="mt-6 text-center border-t pt-4">
                <p className="text-sm text-gray-600">Already a member?</p>
                <button
                    onClick={()=> navigate('/login')}
                    className="text-green-600 font-semibold hover:underline text-sm mt-1"
                >
                    Sign in here
                </button>
            </div>
        </div>

    );
};

export default Register;
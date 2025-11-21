import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks/hooks';
import { resetError } from '../../store/slices/authSlice';
import Login from './Login';
import Register from './Register';

const AuthLayout = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const dispatch = useAppDispatch();

    const toggleView = () => {
        dispatch(resetError());
        setIsLoginView(!isLoginView);
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300">
                {isLoginView ? (
                    <Login onSwitch={toggleView} />
                ) : (
                    <Register onSwitch={toggleView} />
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
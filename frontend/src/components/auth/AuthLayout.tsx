import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthLayout = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    const toggleView = () => setIsLoginView(!isLoginView);

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300">
            {isLoginView ? (
                <Login onSwitch={toggleView} />
            ) : (
                <Register onSwitch={toggleView} />
            )}
        </div>
    );
};

export default AuthLayout;
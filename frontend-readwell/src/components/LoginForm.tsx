import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, loginUser } from '../services/apiService';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginUser({ email, password });
            const role = await getUserRole(); // Get the user role after login
            if (role === 'ADMIN') {
                navigate('/admin/panel');
            } else {
                navigate('/'); // Redirect to user dashboard or home
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;

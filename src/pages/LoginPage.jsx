import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const response = await login(email, password);

    if (response.success) {
      // Redirecionamento por perfil
      switch (response.user.profile) {
        case 'Aluno':
          navigate('/aluno/dashboard');
          break;
        case 'Professor':
          navigate('/professor/dashboard');
          break;
        case 'Gestor':
          navigate('/gestor/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className='text-gradient'>LearnFlix App</h2>
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
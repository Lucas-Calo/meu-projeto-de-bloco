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
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>LearnFlix</h2>
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

        {/* --- NOVA SEÇÃO DE DADOS PARA TESTE --- */}
        <div className="credentials-info">
          <h4>Dados para Teste (Copiar e Colar)</h4>
          <p>
            <strong>Professor:</strong> <code>professor@learnflix.com</code> / <code>123456</code>
          </p>
          <p>
            <strong>Aluno:</strong> <code>aluno@learnflix.com</code> / <code>123456</code>
          </p>
          <p>
            <strong>Gestor:</strong> <code>gestor@learnflix.com</code> / <code>123456</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
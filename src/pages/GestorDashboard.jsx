import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './GestorDashboard.css';

const GestorDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="gestor-dashboard-container">
      <div className="dashboard-header-gestor">
        <h1>Painel do Gestor</h1>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>
      <div className="content-gestor">
        {/* O conteúdo do Sprint 5 virá aqui */}
        <p>Em breve, estatísticas e relatórios estarão disponíveis aqui.</p>
      </div>
    </div>
  );
};

export default GestorDashboard;
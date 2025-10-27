import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = ({ title, children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-layout-container">
      <div className="dashboard-layout-header">
        
        <div className="header-title-group">
          <h1>{title}</h1>
          {/* Exibe o nome do usuário se ele existir */}
          {user && <span className="header-username">Olá, {user.name}</span>}
        </div>
        
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>
      <div className="dashboard-layout-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
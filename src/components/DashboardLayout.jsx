import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import { useSwipeable } from 'react-swipeable';
import './DashboardLayout.css';

const DashboardLayout = ({ title, children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1), 
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className="dashboard-layout" {...handlers}>
      
      <Navbar /> 

      <div className="dashboard-layout-container">
        <div className="dashboard-layout-header">
          <div className="header-title-group">
            <h1>{title}</h1>
            {user && <span className="header-username">Olá, {user.name}</span>}
          </div>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
        <div className="dashboard-layout-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
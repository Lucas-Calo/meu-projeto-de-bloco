import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

// getLinks com base em cada usuário:
  const getLinks = () => {
    if (user.profile === 'Professor') {
      return [
        { path: '/professor/dashboard', name: 'Painel' },
        { path: '/professor/criar-atividade', name: 'Criar Atividade' },
      ];
    }
    if (user.profile === 'Aluno') {
      return [
        { path: '/aluno/dashboard', name: 'Minhas Atividades' },
      ];
    }
    if (user.profile === 'Gestor') {
      return [
        { path: '/gestor/dashboard', name: 'Painel do Gestor' },
      ];
    }
    return [];
  };

  const links = getLinks();

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink 
              to={link.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
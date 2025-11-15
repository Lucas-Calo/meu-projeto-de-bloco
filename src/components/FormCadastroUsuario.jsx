import React, { useState } from 'react';
import './FormCadastroUsuario.css';

const FormCadastroUsuario = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile: 'Aluno'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, profile } = formData;

    if (!name || !email || !password || !profile) {
      setError('Todos os campos são obrigatórios!');
      return;
    }
    setError('');
    
    // Chama a função 'handleRegister' que veio do GestorDashboard
    onSubmit(formData);

    setFormData({ name: '', email: '', password: '', profile: 'Aluno' });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      
      <div className="input-group">
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Senha Provisória</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="profile">Perfil de Acesso</label>
        <select id="profile" value={formData.profile} onChange={handleChange}>
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
        </select>
      </div>

      <button type="submit" className="submit-button">Cadastrar Usuário</button>
    </form>
  );
};

export default FormCadastroUsuario;
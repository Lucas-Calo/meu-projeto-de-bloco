import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import './CriarAtividadePage.css';

const CriarAtividadePage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    dataEntrega: ''
  });
  const [error, setError] = useState('');
  
  const { addAtividade } = useAtividades();
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nome, descricao, dataEntrega } = formData;
    
    if (!nome || !descricao || !dataEntrega) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    addAtividade(formData);
    navigate('/professor/dashboard');
  };

  return (
    <div className="form-container">
      {/* O botão "Voltar" foi removido daqui */}
        
      <form className="activity-form" onSubmit={handleSubmit}>
        <h2>Criar Nova Atividade</h2>

        {/* --- MUDANÇA PRINCIPAL AQUI --- */}
        {/* 1. Botão movido para dentro do <form> */}
        {/* 2. Adicionado type="button" para não submeter o formulário */}
        <button type="button" onClick={handleVoltar} className="btn-voltar">
          ← Voltar
        </button>
        {/* --- FIM DA MUDANÇA --- */}

        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="nome">Nome da Atividade</label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="dataEntrega">Data de Entrega</label>
          <input
            type="date"
            id="dataEntrega"
            value={formData.dataEntrega}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Salvar Atividade</button>
      </form>
    </div>
  );
};

export default CriarAtividadePage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import './CriarAtividadePage.css';

const CriarAtividadePage = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [error, setError] = useState('');
  
  const { addAtividade } = useAtividades();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação de campos obrigatórios
    if (!nome || !descricao || !dataEntrega) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    const novaAtividade = {
      nome,
      descricao,
      dataEntrega,
    };

    addAtividade(novaAtividade);
    
    // Redireciona de volta para o dashboard do professor
    navigate('/professor/dashboard');
  };

  return (
    <div className="form-container">
      <form className="activity-form" onSubmit={handleSubmit}>
        <h2>Criar Nova Atividade</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="nome">Nome da Atividade</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="dataEntrega">Data de Entrega</label>
          <input
            type="date"
            id="dataEntrega"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Salvar Atividade</button>
      </form>
    </div>
  );
};

export default CriarAtividadePage;
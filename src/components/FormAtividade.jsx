import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormAtividade.css';

// O componente recebe os dados iniciais (para edição) e a função a ser executada no submit
const FormAtividade = ({ dadosIniciais, onSubmit, textoBotao }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    dataEntrega: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect para preencher o formulário se estivermos no modo "editar"
  useEffect(() => {
    if (dadosIniciais) {
      const dataFormatada = dadosIniciais.dataEntrega ? new Date(dadosIniciais.dataEntrega).toISOString().split('T')[0] : '';
      setFormData({
        nome: dadosIniciais.nome,
        descricao: dadosIniciais.descricao,
        dataEntrega: dataFormatada
      });
    }
  }, [dadosIniciais]); 

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
    setError('');
    onSubmit(formData);
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <form className="activity-form" onSubmit={handleSubmit}>
        <h2>{textoBotao === 'Salvar Edição' ? 'Editar Atividade' : 'Criar Nova Atividade'}</h2>

        <button type="button" onClick={handleVoltar} className="btn-voltar">
          ← Voltar
        </button>

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
        <button type="submit" className="submit-button">{textoBotao}</button>
      </form>
    </div>
  );
};

export default FormAtividade;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import './CriarAtividadePage.css';

const EditarAtividadePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateAtividade } = useAtividades();
  
  const atividadeParaEditar = location.state?.atividade;

  // --- MUDANÇA PRINCIPAL: Um único estado para o formulário ---
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    dataEntrega: ''
  });

  const [error, setError] = useState('');
  const atividadeId = parseInt(id, 10);

  // O useEffect agora inicializa o objeto formData
  useEffect(() => {
    if (atividadeParaEditar) {
      setFormData({
        nome: atividadeParaEditar.nome,
        descricao: atividadeParaEditar.descricao,
        dataEntrega: atividadeParaEditar.dataEntrega
      });
    }
  }, [atividadeParaEditar]);

  // --- MUDANÇA PRINCIPAL: Uma única função para lidar com todas as alterações ---
  const handleChange = (e) => {
    const { id, value } = e.target; // Pega o 'id' e 'value' do input
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value // Atualiza o campo correspondente no objeto de estado
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Valida os dados a partir do objeto formData
    const { nome, descricao, dataEntrega } = formData;

    if (!nome || !descricao || !dataEntrega) {
      setError('Todos os campos são obrigatórios!');
      return;
    }
    
    // Passa o objeto formData inteiro para a função de atualização
    updateAtividade(atividadeId, formData);
    navigate('/professor/dashboard');
  };

  return (
    <div className="form-container">
      <form className="activity-form" onSubmit={handleSubmit}>
        <h2>Editar Atividade</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="nome">Nome da Atividade</label>
          <input 
            type="text" 
            id="nome" 
            value={formData.nome} // Vinculado ao estado do objeto
            onChange={handleChange} // Usa a nova função genérica
          />
        </div>
        <div className="input-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea 
            id="descricao" 
            value={formData.descricao} // Vinculado ao estado do objeto
            onChange={handleChange} // Usa a nova função genérica
          />
        </div>
        <div className="input-group">
          <label htmlFor="dataEntrega">Data de Entrega</label>
          <input 
            type="date" 
            id="dataEntrega" 
            value={formData.dataEntrega} // Vinculado ao estado do objeto
            onChange={handleChange} // Usa a nova função genérica
          />
        </div>
        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarAtividadePage;
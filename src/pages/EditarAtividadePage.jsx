import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import FormAtividade from '../components/FormAtividade'; 

const EditarAtividadePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { updateAtividade, atividades } = useAtividades();

  const handleEditar = (formData) => {
    updateAtividade(parseInt(id), formData);
    navigate('/professor/dashboard'); 
  };

  const dadosIniciais = state?.atividade || atividades.find(a => a.id === parseInt(id));

  if (!dadosIniciais) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Atividade não encontrada</h2>
        <button onClick={() => navigate('/professor/dashboard')}>Voltar ao Painel</button>
      </div>
    );
  }

  return (
    <FormAtividade 
      onSubmit={handleEditar}
      dadosIniciais={dadosIniciais}
      textoBotao="Salvar Edição"
    />
  );
};

export default EditarAtividadePage;
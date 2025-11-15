import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import FormAtividade from '../components/FormAtividade'; 

const CriarAtividadePage = () => {
  const { addAtividade } = useAtividades();
  const navigate = useNavigate();

  const handleCriar = (formData) => {
    addAtividade(formData);
    navigate('/professor/dashboard'); 
  };

  return (
    <FormAtividade 
      onSubmit={handleCriar}
      textoBotao="Salvar Atividade"
    />
  );
};

export default CriarAtividadePage;
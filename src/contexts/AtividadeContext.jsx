import React, { createContext, useState, useContext } from 'react';

const AtividadeContext = createContext();

export const AtividadeProvider = ({ children }) => {
  const [atividades, setAtividades] = useState([]);

  const addAtividade = (atividade) => {
    setAtividades(prevAtividades => [...prevAtividades, { ...atividade, id: Date.now() }]);
  };

  // Função para deletar uma atividade (versão limpa)
  const deleteAtividade = (id) => {
    setAtividades(prevAtividades => prevAtividades.filter(atividade => atividade.id !== id));
  };

  // Função para atualizar uma atividade
  const updateAtividade = (id, atividadeAtualizada) => {
    setAtividades(prevAtividades =>
      prevAtividades.map(atividade =>
        atividade.id === id ? { ...atividade, ...atividadeAtualizada } : atividade
      )
    );
  };

  return (
    // Disponibiliza as funções para os componentes filhos
    <AtividadeContext.Provider value={{ atividades, addAtividade, deleteAtividade, updateAtividade }}>
      {children}
    </AtividadeContext.Provider>
  );
};

export const useAtividades = () => {
  return useContext(AtividadeContext);
};
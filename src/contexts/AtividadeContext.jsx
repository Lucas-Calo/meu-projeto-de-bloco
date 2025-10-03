import React, { createContext, useState, useContext } from 'react';

const AtividadeContext = createContext();

export const AtividadeProvider = ({ children }) => {
  const [atividades, setAtividades] = useState([]);

  const addAtividade = (atividade) => {
    // Sprint 3 inicializado, Adiciona o status padrão 'Pendente' a toda nova atividade
    setAtividades(prevAtividades => [
      ...prevAtividades, 
      { ...atividade, id: Date.now(), status: 'Pendente' }
    ]);
  };

  const deleteAtividade = (id) => {
    setAtividades(prevAtividades => prevAtividades.filter(atividade => atividade.id !== id));
  };

  const updateAtividade = (id, atividadeAtualizada) => {
    setAtividades(prevAtividades =>
      prevAtividades.map(atividade =>
        atividade.id === id ? { ...atividade, ...atividadeAtualizada } : atividade
      )
    );
  };

   // Sprint 4: Nova função. Essa função será responsável por alterar o status e adicionar os dados da avaliação.
  const updateStatusAtividade = (id, novosDados) => {
    setAtividades(prevAtividades =>
      prevAtividades.map(atividade =>
        atividade.id === id ? { ...atividade, ...novosDados } : atividade
      )
    );
  };

  return (
    <AtividadeContext.Provider value={{ atividades, addAtividade, deleteAtividade, updateAtividade, updateStatusAtividade }}>
      {children}
    </AtividadeContext.Provider>
  );
};

export const useAtividades = () => {
  return useContext(AtividadeContext);
};
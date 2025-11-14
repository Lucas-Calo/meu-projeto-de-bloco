import React, { createContext, useState, useContext, useEffect } from 'react';

const AtividadeContext = createContext();

export const AtividadeProvider = ({ children }) => {
  
  // MUDANÇA 1: Leitura Inicial
  // Usei uma função no useState para que ele só leia o localStorage
  // uma vez, quando o componente é montado.
  const [atividades, setAtividades] = useState(() => {
    const dadosSalvos = localStorage.getItem('atividades');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos); // Retorna os dados salvos
    }
    return []; // Retorna um array vazio se não houver nada salvo
  });

  // MUDANÇA 2: Gravação Automática
  // Este useEffect "escuta" por qualquer mudança no estado 'atividades'
  // e o salva no localStorage.
  useEffect(() => {
    localStorage.setItem('atividades', JSON.stringify(atividades));
  }, [atividades]); // O 'gatilho' é o próprio estado 'atividades'

  const addAtividade = (atividade) => {
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

  const updateStatusAtividade = (id, novosDados) => {
    setAtividades(prevAtividades =>
      prevAtividades.map(atividade =>
        atividade.id === id ? { ...atividade, ...novosDados } : atividade
      )
    );
  };

  return (
    <AtividadeContext.Provider value={{ 
      atividades, 
      addAtividade, 
      deleteAtividade, 
      updateAtividade, 
      updateStatusAtividade 
    }}>
      {children}
    </AtividadeContext.Provider>
  );
};

export const useAtividades = () => {
  return useContext(AtividadeContext);
};
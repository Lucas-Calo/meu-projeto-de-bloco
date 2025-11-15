import React, { useState, useEffect } from 'react';
import { useAtividades } from '../contexts/AtividadeContext';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import CitacaoDoDia from '../components/CitacaoDoDia';
import CardAtividade from '../components/CardAtividade';
import './AlunoDashboard.css';

const AlunoDashboard = () => {
  const { atividades } = useAtividades(); 
  const { user } = useAuth();
  const [citacao, setCitacao] = useState(null);
  const [loadingCitacao, setLoadingCitacao] = useState(true);

  useEffect(() => {
    const fetchCitacao = async () => {
      try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        setCitacao({ texto: data.quote, autor: data.author });
      } catch (error) {
        console.error("Erro ao buscar citação:", error);
        setCitacao({ texto: "A persistência realiza o impossível.", autor: "Provérbio Chinês" });
      } finally {
        setLoadingCitacao(false);
      }
    };
    fetchCitacao();
  }, []);
  
  const atividadesOrdenadas = [...atividades].sort((a, b) => 
    new Date(a.dataEntrega) - new Date(b.dataEntrega)
  );

  return (
    <DashboardLayout title="Minhas Atividades">
      
      <CitacaoDoDia 
        loading={loadingCitacao} 
        texto={citacao?.texto} 
        autor={citacao?.autor} 
      />

      <div className="lista-atividades-aluno">
        {atividadesOrdenadas.length === 0 ? (
          <p className="sem-atividades-msg">Você não tem nenhuma atividade pendente. Parabéns!</p>
        ) : (
          atividadesOrdenadas.map(atividade => (
            <CardAtividade 
              key={atividade.id} 
              atividade={atividade} 
              perfil="aluno"
              alunoId={user.id} 
            />
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default AlunoDashboard;
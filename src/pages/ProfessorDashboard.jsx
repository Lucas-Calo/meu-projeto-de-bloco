import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import DashboardLayout from '../components/DashboardLayout';
import CitacaoDoDia from '../components/CitacaoDoDia';
import CardAtividade from '../components/CardAtividade'; //
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
  const { atividades } = useAtividades();

  // Lógica da Citação
  const [citacao, setCitacao] = useState(null);
  const [loadingCitacao, setLoadingCitacao] = useState(true);

  useEffect(() => {
    const fetchCitacao = async () => {
      // ... (lógica de fetch da citação) ...
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

  return (
    <DashboardLayout title="Painel do Professor">
      
      <CitacaoDoDia 
        loading={loadingCitacao} 
        texto={citacao?.texto} 
        autor={citacao?.autor} 
      />

      <div className="dashboard-actions">
        <Link to="/professor/criar-atividade" className="btn-criar">
          + Criar Atividade
        </Link>
      </div>

      {/* O painel agora só lista as atividades */}
      <div className="atividades-lista">
        <h2>Minhas Atividades</h2>
        {atividades.length === 0 ? (
          <p>Você ainda não criou nenhuma atividade.</p>
        ) : (
          atividades.map(atividade => (
            // Renderiza o componente de Card reutilizável
            <CardAtividade 
              key={atividade.id} 
              atividade={atividade} 
              perfil="professor"
            />
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfessorDashboard;
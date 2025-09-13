import React from 'react';
import { Link } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
  const { atividades, deleteAtividade } = useAtividades();

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta atividade?')) {
      deleteAtividade(id);
    }
  };

  // Função para formatar a data sem problemas de fuso horário
  const formatarData = (dataString) => {
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Painel do Professor</h1>
        <Link to="/professor/criar-atividade" className="btn-criar">
          + Criar Atividade
        </Link>
      </div>

      <div className="atividades-lista">
        <h2>Minhas Atividades</h2>
        {atividades.length === 0 ? (
          <p>Você ainda não criou nenhuma atividade.</p>
        ) : (
          atividades.map(atividade => (
            <div key={atividade.id} className="atividade-card">
              <h3>{atividade.nome}</h3>
              <p>{atividade.descricao}</p>
              <span>Data de Entrega: {formatarData(atividade.dataEntrega)}</span>
              
              <div className="card-actions">
                <Link 
                  to={`/professor/editar-atividade/${atividade.id}`} 
                  state={{ atividade: atividade }}
                  className="btn-action btn-edit"
                >
                  Editar
                </Link>
                <button onClick={() => handleDelete(atividade.id)} className="btn-action btn-delete">
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
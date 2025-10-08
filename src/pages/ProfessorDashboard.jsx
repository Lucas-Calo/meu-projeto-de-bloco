import React from 'react';
import { Link } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
  const { atividades, deleteAtividade, updateStatusAtividade } = useAtividades();

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

  //Sprint 4: 
  const handleAvaliar = (id) => {
    const nota = prompt("Digite a nota da atividade (0 a 10):");
    if (nota === null || nota.trim() === '' || isNaN(nota) || nota < 0 || nota > 10) {
      alert("Nota inválida. A avaliação foi cancelada.");
      return;
    }

    const feedback = prompt("Digite um feedback para o aluno:");
    if (feedback === null) {
      alert("Avaliação cancelada.");
      return;
    }

    const notaNum = parseFloat(nota);
    const statusFinal = notaNum >= 6 ? 'Aprovado' : 'Reprovado';

    updateStatusAtividade(id, {
      status: statusFinal,
      nota: notaNum,
      feedback: feedback.trim() === '' ? 'Sem feedback.' : feedback
    });
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
                {atividade.status === 'Aguardando Avaliação' && (
                  <button onClick={() => handleAvaliar(atividade.id)} className="btn-action btn-avaliar">
                    Avaliar
                  </button>
                )}
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
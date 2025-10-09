import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import { useAuth } from '../contexts/AuthContext';
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
  const { atividades, deleteAtividade, updateStatusAtividade } = useAtividades();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta atividade?')) {
      deleteAtividade(id);
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

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
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>
      <div className="dashboard-actions">
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
            <div key={atividade.id} className={`atividade-card status-${atividade.status?.toLowerCase().replace(' ', '-')}`}>
              <div className="card-header-prof">
                <h3>{atividade.nome}</h3>
                {atividade.status && (
                  <span className={`status-prof ${atividade.status.toLowerCase().replace(' ', '-')}`}>
                    {atividade.status}
                  </span>
                )}
              </div>
              <p className="descricao-atividade">{atividade.descricao}</p>
              <span className="data-prazo">
                Prazo Final: {formatarData(atividade.dataEntrega)}
              </span>

              {atividade.dataEntregaAluno && (
                <span className="data-entrega-realizada">
                  Entregue pelo Aluno em: {formatarData(atividade.dataEntregaAluno)}
                </span>
              )}
              
              <div className="card-actions">
                {(atividade.status === 'Aprovado' || atividade.status === 'Reprovado') ? (
                  <span className="status-corrigido">✓ Atividade Corrigida</span>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
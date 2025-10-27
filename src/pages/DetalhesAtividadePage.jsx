import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import { useAuth } from '../contexts/AuthContext';
import './DetalhesAtividadePage.css';

const DetalhesAtividadePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { user } = useAuth(); 
  const { atividades, updateStatusAtividade, deleteAtividade } = useAtividades();

  // Encontra a atividade correspondente
  const atividade = atividades.find(a => a.id === parseInt(id));

  // --- Funções de Ação ---

  const handleEntregar = (e) => {
    e.preventDefault();
    const dataDeEntregaDoAluno = new Date();
    updateStatusAtividade(parseInt(id), { 
      status: 'Aguardando Avaliação',
      dataEntregaAluno: dataDeEntregaDoAluno.toISOString()
    });
  };

  const handleAvaliar = (e) => {
    e.preventDefault();
    const nota = prompt("Digite a nota da atividade (0 a 10):");
    if (nota === null || nota.trim() === '' || isNaN(nota) || nota < 0 || nota > 10) {
      alert("Nota inválida. A avaliação foi cancelada.");
      return;
    }
    const feedback = prompt("Digite um feedback para o aluno:");
    if (feedback === null) return;

    const notaNum = parseFloat(nota);
    const statusFinal = notaNum >= 6 ? 'Aprovado' : 'Reprovado';

    updateStatusAtividade(parseInt(id), {
      status: statusFinal,
      nota: notaNum,
      feedback: feedback.trim() === '' ? 'Sem feedback.' : feedback
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Tem certeza que deseja deletar esta atividade?')) {
      deleteAtividade(parseInt(id));
      navigate('/professor/dashboard');
    }
  };

  // --- Função Auxiliar ---

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  if (!atividade) {
    return (
      <div className="detalhes-container">
        <p>Atividade não encontrada.</p>
        <button onClick={() => navigate(-1)} className="btn-voltar">Voltar</button>
      </div>
    );
  }

  // Variáveis de controle
  const isProfessor = user.profile === 'Professor';
  const isAluno = user.profile === 'Aluno';
  const status = atividade.status;

  return (
    <div className="detalhes-container">
      <button onClick={() => navigate(-1)} className="btn-voltar">← Voltar</button>
      
      <div className="detalhes-header">
        <h1>{atividade.nome}</h1>
        <span className={`status-detalhes ${status?.toLowerCase().replace(' ', '-')}`}>
          {status}
        </span>
      </div>

      {/* --- Seção de Ações --- */}
      <div className="detalhes-card acoes">
        <h2>Ações</h2>
        
        {/* Ações do Aluno */}
        {isAluno && status === 'Pendente' && (
          <button onClick={handleEntregar} className="btn-acao btn-entregar">
            Entregar Atividade
          </button>
        )}
        {isAluno && status !== 'Pendente' && (
          <p className="acao-info">Você já entregou esta atividade.</p>
        )}

        {/* Ações do Professor */}
        {isProfessor && (status === 'Aprovado' || status === 'Reprovado') && (
           <span className="status-corrigido">✓ Atividade Corrigida</span>
        )}

        {/* Agrupa os botões do professor para alinhamento correto (a correção) */}
        {isProfessor && (status === 'Pendente' || status === 'Aguardando Avaliação') && (
          <div className="acoes-botoes-container">
            {status === 'Aguardando Avaliação' && (
              <button onClick={handleAvaliar} className="btn-acao btn-avaliar">
                Avaliar Entrega
              </button>
            )}
            <Link 
              to={`/professor/editar-atividade/${atividade.id}`} 
              state={{ atividade: atividade }}
              className="btn-acao btn-edit"
            >
              Editar Atividade
            </Link>
            <button onClick={handleDelete} className="btn-acao btn-delete">
              Deletar Atividade
            </button>
          </div>
        )}
      </div>

      {/* --- Resto dos Detalhes --- */}
      <div className="detalhes-card">
        <h2>Descrição</h2>
        <p>{atividade.descricao}</p>
      </div>

      <div className="datas-grid">
        <div className="detalhes-card">
          <h2>Prazo Final</h2>
          <p>{formatarData(atividade.dataEntrega)}</p>
        </div>
        <div className="detalhes-card">
          <h2>Entregue pelo Aluno</h2>
          <p>{formatarData(atividade.dataEntregaAluno)}</p>
        </div>
      </div>

      {(status === 'Aprovado' || status === 'Reprovado') && (
        <div className="detalhes-card avaliacao">
          <h2>Avaliação do Professor</h2>
          <p><strong>Nota:</strong> {atividade.nota}</p>
          <p><strong>Feedback:</strong> {atividade.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default DetalhesAtividadePage;
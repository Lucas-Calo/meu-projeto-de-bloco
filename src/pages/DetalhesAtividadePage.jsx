import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSwipeable } from 'react-swipeable';
import { getAllUsers } from '../services/userService'; 
import './DetalhesAtividadePage.css';

const DetalhesAtividadePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const { atividades, entregarAtividade, avaliarEntrega, deleteAtividade } = useAtividades();

  const atividade = atividades.find(a => a.id === parseInt(id));

  const handleEntregar = (e) => {
    e.preventDefault();
    entregarAtividade(atividade.id, user.id);
  };

  const handleAvaliar = (e, alunoId) => {
    e.preventDefault();
    const nota = prompt(`Digite a nota para o aluno (0 a 10):`);
    if (nota === null || nota.trim() === '' || isNaN(nota) || nota < 0 || nota > 10) {
      alert("Nota inválida. A avaliação foi cancelada.");
      return;
    }
    const feedback = prompt(`Digite o feedback para o aluno:`);
    if (feedback === null) return;

    avaliarEntrega(atividade.id, alunoId, parseFloat(nota), feedback);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Tem certeza que deseja deletar esta atividade?')) {
      deleteAtividade(parseInt(id));
      navigate('/professor/dashboard');
    }
  };

  //  Função Auxiliar
  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  //  Configuração do Gesto 
  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (!atividade) {
    return <div>Atividade não encontrada.</div>
  }

  // --- Lógica de Visualização ---
  const isProfessor = user.profile === 'Professor';
  const isAluno = user.profile === 'Aluno';

  // Encontra a entrega específica DESTE aluno logado
  const minhaEntrega = isAluno ? atividade.entregas[user.id] : null;

  const statusAlunoLogado = minhaEntrega ? minhaEntrega.status : 'Pendente';

  // Se for professor, busca a lista de todos os alunos
  const listaDeAlunos = isProfessor ? getAllUsers().filter(u => u.profile === 'Aluno') : [];

  return (
    <div className="detalhes-container" {...handlers}>
      <button onClick={() => navigate(-1)} className="btn-voltar">← Voltar</button>
      
      <div className="detalhes-header">
        <h1>{atividade.nome}</h1>
        {/* O Aluno vê o SEU status; Professor vê "Visão Geral" */}
        {isAluno && (
          <span className={`status-detalhes ${statusAlunoLogado.toLowerCase().replace(' ', '-')}`}>
            {statusAlunoLogado}
          </span>
        )}
        {isProfessor && (
          <span className="status-detalhes professor">
            Visão do Professor
          </span>
        )}
      </div>

      {/* --- Seção de Ações (Aluno) --- */}
      {isAluno && (
        <div className="detalhes-card acoes">
          <h2>Minha Entrega</h2>
          {statusAlunoLogado === 'Pendente' && (
            <button onClick={handleEntregar} className="btn-acao btn-entregar">
              Entregar Atividade
            </button>
          )}
          {statusAlunoLogado !== 'Pendente' && (
            <p className="acao-info">Você entregou esta atividade em: {formatarData(minhaEntrega.dataEntregaAluno)}.</p>
          )}
        </div>
      )}

      {/* --- Detalhes Gerais da Atividade --- */}
      <div className="detalhes-card">
        <h2>Descrição</h2>
        <p>{atividade.descricao}</p>
      </div>
      <div className="datas-grid">
        <div className="detalhes-card">
          <h2>Prazo Final</h2>
          <p>{formatarData(atividade.dataEntrega)}</p>
        </div>
        {/* O aluno vê a sua data de entrega (se houver) */}
        {isAluno && minhaEntrega && (
          <div className="detalhes-card">
            <h2>Data da Entrega</h2>
            <p>{formatarData(minhaEntrega.dataEntregaAluno)}</p>
          </div>
        )}
      </div>

      {/*Feedback (Aluno) */}
      {isAluno && (statusAlunoLogado === 'Aprovado' || statusAlunoLogado === 'Reprovado') && (
        <div className="detalhes-card avaliacao">
          <h2>Avaliação do Professor</h2>
          <p><strong>Nota:</strong> {minhaEntrega.nota}</p>
          <p><strong>Feedback:</strong> {minhaEntrega.feedback}</p>
        </div>
      )}

      {/* VISÃO DO PROFESSOR*/}
      {isProfessor && (
        <div className="detalhes-card">
          <h2>Entregas dos Alunos</h2>
          <div className="lista-entregas-professor">
            {listaDeAlunos.length === 0 ? (
              <p>Não há alunos cadastrados.</p>
            ) : (
              listaDeAlunos.map(aluno => {
                // Para cada aluno, encontramos a sua entrega
                const entregaDoAluno = atividade.entregas[aluno.id];
                const statusDoAluno = entregaDoAluno ? entregaDoAluno.status : 'Pendente';

                return (
                  <div key={aluno.id} className="entrega-aluno-card">
                    <div className="info-aluno">
                      <strong>{aluno.name}</strong>
                      <span className={`status-entrega ${statusDoAluno.toLowerCase().replace(' ', '-')}`}>
                        {statusDoAluno}
                      </span>
                    </div>
                    
                    {/* Botões de ação do professor por aluno */}
                    <div className="acoes-professor">
                      {statusDoAluno === 'Aguardando Avaliação' && (
                        <button onClick={(e) => handleAvaliar(e, aluno.id)} className="btn-acao-prof btn-avaliar-sm">
                          Avaliar
                        </button>
                      )}
                      {(statusDoAluno === 'Aprovado' || statusDoAluno === 'Reprovado') && (
                        <div className="feedback-info">
                          <span>Nota: {entregaDoAluno.nota}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* Ações gerais da atividade (Editar/Deletar) */}
          <div className="acoes-botoes-container professor-geral">
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
        </div>
      )}

    </div>
  );
};

export default DetalhesAtividadePage;
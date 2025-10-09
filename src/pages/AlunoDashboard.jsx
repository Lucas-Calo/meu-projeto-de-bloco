import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import { useAuth } from '../contexts/AuthContext';
import './AlunoDashboard.css';

const AlunoDashboard = () => {
  const { atividades, updateStatusAtividade } = useAtividades();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

   // Função de formatação de data aprimorada para evitar bugs de fuso horário
  const formatarData = (dataString) => {
    if (!dataString) return ''; // Retorna vazio se a data for nula
    const data = new Date(dataString);
    // Usamos getUTCDate para pegar o dia baseado no Tempo Universal Coordenado
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleEntregar = (id) => {
    // Cria um novo objeto Date para registrar o momento exato da entrega
    const dataDeEntregaDoAluno = new Date();
    
    // Envia o novo status e a data de entrega para o contexto
    updateStatusAtividade(id, { 
      status: 'Aguardando Avaliação',
      dataEntregaAluno: dataDeEntregaDoAluno.toISOString() // Salva em formato ISO para consistência
    });
  };

  const atividadesOrdenadas = [...atividades].sort((a, b) => 
    new Date(a.dataEntrega) - new Date(b.dataEntrega)
  );

  return (
    <div className="aluno-dashboard-container">
      <div className="dashboard-header-aluno">
        <h1>Minhas Atividades</h1>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>

      <div className="lista-atividades-aluno">
        {atividadesOrdenadas.length === 0 ? (
          <p className="sem-atividades-msg">Você não tem nenhuma atividade pendente. Parabéns!</p>
        ) : (
          atividadesOrdenadas.map(atividade => {
            const hoje = new Date();
            const dataEntrega = new Date(atividade.dataEntrega);
            hoje.setHours(0, 0, 0, 0); 
            
            const isAtrasado = dataEntrega < hoje && atividade.status === 'Pendente';

            return (
              <div 
                key={atividade.id} 
                className={`atividade-card-aluno ${isAtrasado ? 'atrasado' : ''}`}
              >
                <div className="card-header-aluno">
                  <h3>{atividade.nome}</h3>
                  <span className={`status ${atividade.status.toLowerCase().replace(' ', '-')}`}>
                    {atividade.status}
                  </span>
                </div>
                <p className="data-entrega">
                  <span>Prazo Final:</span> {formatarData(atividade.dataEntrega)}
                </p>

                {/* EXIBE A DATA QUE O ALUNO ENTREGOU */}
                {atividade.dataEntregaAluno && (
                  <p className="data-entrega-aluno">
                    <span>Entregue em:</span> {formatarData(atividade.dataEntregaAluno)}
                  </p>
                )}

                {atividade.status === 'Pendente' && (
                  <button 
                    onClick={() => handleEntregar(atividade.id)} 
                    className="btn-entregar"
                  >
                    Entregar Atividade
                  </button>
                )}

                {(atividade.status === 'Aprovado' || atividade.status === 'Reprovado') && (
                  <div className="feedback-container">
                    <strong>Avaliação do Professor:</strong>
                    <p>Nota: {atividade.nota}</p>
                    <p>Feedback: {atividade.feedback}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlunoDashboard;
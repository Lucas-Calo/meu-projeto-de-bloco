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

  const formatarData = (dataString) => {
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const handleEntregar = (id) => {
    updateStatusAtividade(id, { status: 'Aguardando Avaliação' });
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
                  Data de Entrega: {formatarData(atividade.dataEntrega)}
                </p>

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
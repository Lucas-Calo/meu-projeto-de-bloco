import React from 'react';
import { Link } from 'react-router-dom';
import './CardAtividade.css';

const CardAtividade = ({ atividade, perfil, alunoId }) => {
  
  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  let statusTexto = 'Pendente';
  let statusClasse = 'pendente';
  let minhaEntrega = null; 

  if (perfil === 'aluno') {
    minhaEntrega = atividade.entregas[alunoId];
    if (minhaEntrega) {
      statusTexto = minhaEntrega.status;
      statusClasse = statusTexto.toLowerCase().replace(' ', '-');
    }
    
  } else if (perfil === 'professor') {
    const todasEntregas = Object.values(atividade.entregas);
    if (todasEntregas.some(e => e.status === 'Aguardando Avaliação')) {
      statusTexto = 'A Avaliar';
      statusClasse = 'aguardando-avaliação';
    } else if (todasEntregas.length > 0 && todasEntregas.every(e => e.status === 'Aprovado' || e.status === 'Reprovado')) {
      statusTexto = 'Corrigido';
      statusClasse = 'aprovado';
    }
  }

  const hoje = new Date();
  const dataEntrega = new Date(atividade.dataEntrega);
  hoje.setHours(0, 0, 0, 0); 
  const isAtrasado = perfil === 'aluno' && dataEntrega < hoje && statusTexto === 'Pendente';

  return (
    <Link 
      to={`/atividade/${atividade.id}`}
      className={`card-atividade ${perfil} ${isAtrasado ? 'atrasado' : ''} status-${statusClasse}`}
    >
      <div className="card-header">
        <h3>{atividade.nome}</h3>
        <span className={`status ${statusClasse}`}>
          {statusTexto}
        </span>
      </div>
      <p className="descricao">{atividade.descricao}</p>
      <div className="datas-container">
        <span className="data-prazo">
          Prazo Final: {formatarData(atividade.dataEntrega)}
        </span>
        {minhaEntrega && (
          <span className="data-entrega-aluno">
            Entregue em: {formatarData(minhaEntrega.dataEntregaAluno)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CardAtividade;
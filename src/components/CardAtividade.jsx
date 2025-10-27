import React from 'react';
import { Link } from 'react-router-dom';
import './CardAtividade.css';

const CardAtividade = ({ atividade, perfil }) => {
  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const isAtrasado = perfil === 'aluno' && new Date(atividade.dataEntrega) < new Date() && atividade.status === 'Pendente';

  return (
    <Link 
      to={`/atividade/${atividade.id}`}
      className={`card-atividade ${perfil} ${isAtrasado ? 'atrasado' : ''} status-${atividade.status?.toLowerCase().replace(' ', '-')}`}
    >
      <div className="card-header">
        <h3>{atividade.nome}</h3>
        <span className={`status ${atividade.status?.toLowerCase().replace(' ', '-')}`}>
          {atividade.status}
        </span>
      </div>
      <p className="descricao">{atividade.descricao}</p>
      <div className="datas-container">
        <span className="data-prazo">
          Prazo Final: {formatarData(atividade.dataEntrega)}
        </span>
        {atividade.dataEntregaAluno && (
          <span className="data-entrega-aluno">
            Entregue em: {formatarData(atividade.dataEntregaAluno)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CardAtividade;
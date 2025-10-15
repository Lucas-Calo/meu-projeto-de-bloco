import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtividades } from '../contexts/AtividadeContext';
import './DetalhesAtividadePage.css';

const DetalhesAtividadePage = () => {
  const { id } = useParams(); // Ele pega o ID da atividade da URL
  const { atividades } = useAtividades();
  const navigate = useNavigate();

  // Encontra a atividade específica na nossa lista do contexto
  const atividade = atividades.find(a => a.id === parseInt(id));

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

  return (
    <div className="detalhes-container">
      <button onClick={() => navigate(-1)} className="btn-voltar">← Voltar</button>
      
      <div className="detalhes-header">
        <h1>{atividade.nome}</h1>
        <span className={`status-detalhes ${atividade.status?.toLowerCase().replace(' ', '-')}`}>
          {atividade.status}
        </span>
      </div>

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

      {/* Para exibir a avaliação somente se existir */}
      {(atividade.status === 'Aprovado' || atividade.status === 'Reprovado') && (
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
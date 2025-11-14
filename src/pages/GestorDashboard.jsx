import React, { useMemo } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAtividades } from '../contexts/AtividadeContext';
import { getAllUsers } from '../services/userService';
import './GestorDashboard.css';

const GestorDashboard = () => {
  const { atividades } = useAtividades();
  const todosUsuarios = getAllUsers(); // Puxa a lista de usuários do serviço

  // Calcula as estatísticas
  const stats = useMemo(() => {
    const totalAlunos = todosUsuarios.filter(u => u.profile === 'Aluno').length;
    const totalProfessores = todosUsuarios.filter(u => u.profile === 'Professor').length;
    const totalAtividades = atividades.length;
    
    return { totalAlunos, totalProfessores, totalAtividades };
  }, [atividades, todosUsuarios]);

  return (
    <DashboardLayout title="Painel do Gestor">
      {/* 3. Renderiza os cards de estatística */}
      <div className="stats-container">
        <div className="stat-card">
          <h2>Alunos Cadastrados</h2>
          <p>{stats.totalAlunos}</p>
        </div>
        <div className="stat-card">
          <h2>Professores Cadastrados</h2>
          <p>{stats.totalProfessores}</p>
        </div>
        <div className="stat-card">
          <h2>Atividades Criadas</h2>
          <p>{stats.totalAtividades}</p>
        </div>
      </div>

      {/* Espaço para as próximas funcionalidades (Item 2 e 3 do backlog) */}
      <div className="gestor-listas">
        <h2>Listas Gerais (Em breve)</h2>
        <p>Em breve, você poderá ver e gerenciar todos os usuários e atividades aqui.</p>
        <h2>Cadastrar Novo Usuário (Em breve)</h2>
        <p>Em breve, o formulário de cadastro de novos usuários estará aqui.</p>
      </div>

    </DashboardLayout>
  );
};

export default GestorDashboard;
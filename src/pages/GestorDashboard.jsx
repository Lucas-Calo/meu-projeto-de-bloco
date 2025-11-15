import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAtividades } from '../contexts/AtividadeContext';
import { getAllUsers, registerUser } from '../services/userService';
import FormCadastroUsuario from '../components/FormCadastroUsuario';
import './GestorDashboard.css';

const GestorDashboard = () => {
  const { atividades } = useAtividades();
  
  //Armazena a lista de usuários no ESTADO para que seja dinâmica
  const [userList, setUserList] = useState(() => getAllUsers());
  //Armazena as estatísticas no ESTADO
  const [stats, setStats] = useState({ totalAlunos: 0, totalProfessores: 0, totalAtividades: 0 });

  // Efeito que recalcula as estatísticas QUANDO a lista de usuários MUDAR
  useEffect(() => {
    const totalAlunos = userList.filter(u => u.profile === 'Aluno').length;
    const totalProfessores = userList.filter(u => u.profile === 'Professor').length;
    const totalAtividades = atividades.length;
    
    setStats({ totalAlunos, totalProfessores, totalAtividades });
  }, [userList, atividades]); 

  // Função que será chamada pelo formulário
  const handleRegister = (formData) => {
    const newList = registerUser(formData);
    if (newList) {
      setUserList(newList);
      alert('Usuário cadastrado com sucesso!');
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <DashboardLayout title="Painel do Gestor">
      {/* Cards de estatísticas */}
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

      <div className="gestor-listas">
        
        {/* Lista de Usuários */}
        <div className="lista-section">
          <h2>Todos os Usuários ({userList.length})</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                </tr>
              </thead>
              <tbody>
                {userList.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.profile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lista de Atividades */}
        <div className="lista-section">
          <h2>Todas as Atividades ({atividades.length})</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome da Atividade</th>
                  <th>Data de Entrega</th>
                  <th>Nº de Entregas</th>
                </tr>
              </thead>
              <tbody>
                {atividades.map(atividade => (
                  <tr key={atividade.id}>
                    <td>{atividade.nome}</td>
                    <td>{formatarData(atividade.dataEntrega)}</td>
                    <td>{Object.keys(atividade.entregas).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lista-section">
          <h2>Cadastrar Novo Usuário</h2>
          <FormCadastroUsuario onSubmit={handleRegister} />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default GestorDashboard;
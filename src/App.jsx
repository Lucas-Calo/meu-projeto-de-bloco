import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import AlunoDashboard from './pages/AlunoDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import GestorDashboard from './pages/GestorDashboard';
import CriarAtividadePage from './pages/CriarAtividadePage';
import EditarAtividadePage from './pages/EditarAtividadePage'; // Importe a nova página de edição
import { AtividadeProvider } from './contexts/AtividadeContext';

// Componente para proteger rotas (permanece o mesmo)
const ProtectedRoute = ({ children, allowedProfiles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedProfiles && !allowedProfiles.includes(user.profile)) {
    return <Navigate to="/" />;
  }

  return children;
};

// Layout para agrupar as rotas do professor, agora com a rota de edição
const ProfessorLayout = () => {
  return (
    <AtividadeProvider>
      <Routes>
        <Route path="dashboard" element={<ProfessorDashboard />} />
        <Route path="criar-atividade" element={<CriarAtividadePage />} />
        {/* NOVA ROTA ADICIONADA PARA EDIÇÃO */}
        <Route path="editar-atividade/:id" element={<EditarAtividadePage />} />
      </Routes>
    </AtividadeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          {/* Rota Protegida do Aluno */}
          <Route 
            path="/aluno/dashboard" 
            element={
              <ProtectedRoute allowedProfiles={['Aluno']}>
                <AlunoDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota Protegida do Gestor */}
          <Route 
            path="/gestor/dashboard" 
            element={
              <ProtectedRoute allowedProfiles={['Gestor']}>
                <GestorDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Rotas Protegidas do Professor usando o Layout */}
          <Route 
            path="/professor/*" 
            element={
              <ProtectedRoute allowedProfiles={['Professor']}>
                <ProfessorLayout />
              </ProtectedRoute>
            } 
          />

          {/* Rota para qualquer outro caminho não encontrado */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
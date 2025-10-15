import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import AlunoDashboard from './pages/AlunoDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import GestorDashboard from './pages/GestorDashboard';
import CriarAtividadePage from './pages/CriarAtividadePage';
import EditarAtividadePage from './pages/EditarAtividadePage';
import { AtividadeProvider } from './contexts/AtividadeContext';
import DetalhesAtividadePage from './pages/DetalhesAtividadePage';

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

// Removi AtividadeProvider foi removido daqui
const ProfessorLayout = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ProfessorDashboard />} />
      <Route path="criar-atividade" element={<CriarAtividadePage />} />
      <Route path="editar-atividade/:id" element={<EditarAtividadePage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AtividadeProvider>
        <Router>
          <Routes>
            {/* Rota Pública */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Rotas Protegidas */}
            <Route 
              path="/aluno/dashboard" 
              element={
                <ProtectedRoute allowedProfiles={['Aluno']}>
                  <AlunoDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/gestor/dashboard" 
              element={
                <ProtectedRoute allowedProfiles={['Gestor']}>
                  <GestorDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/professor/*" 
              element={
                <ProtectedRoute allowedProfiles={['Professor']}>
                  <ProfessorLayout />
                </ProtectedRoute>
              } 
            />

            {/* NOVA ROTA DE DETALHES, acessível a todos os perfis logados */}
            <Route 
              path="/atividade/:id"
              element={
                <ProtectedRoute allowedProfiles={['Aluno', 'Professor', 'Gestor']}>
                  <DetalhesAtividadePage />
                </ProtectedRoute>
              }
            />

            {/* Rota para qualquer outro caminho não encontrado */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AtividadeProvider>
    </AuthProvider>
  );
}

export default App;
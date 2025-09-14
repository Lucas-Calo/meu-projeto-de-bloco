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
      {/* Adicionei o AtividadeProvider aqui */}
      <AtividadeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
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

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AtividadeProvider>
    </AuthProvider>
  );
}

export default App;
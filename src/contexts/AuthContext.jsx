import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Mock de uma função de autenticação
const mockAuth = async (email, password) => {
  // Em um projeto real, isso seria uma chamada para uma API
  const users = [
    { email: 'aluno@learnflix.com', password: '123456', profile: 'Aluno' },
    { email: 'professor@learnflix.com', password: '123456', profile: 'Professor' },
    { email: 'gestor@learnflix.com', password: '123456', profile: 'Gestor' },
  ];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user: { email: user.email, profile: user.profile } };
  }
  return { success: false, message: 'Credenciais inválidas' };
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await mockAuth(email, password);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};
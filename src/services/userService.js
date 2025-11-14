// src/services/userService.js

// 1. Movemos a lista de usuários para cá.
// Deixamos ela fora de qualquer função para que possa ser exportada:
const users = [
  { id: 1, email: 'aluno@learnflix.com', password: '123456', profile: 'Aluno', name: 'Lucas Caló' },
  { id: 2, email: 'professor@learnflix.com', password: '123456', profile: 'Professor', name: 'Thiago Vieira de Aguiar' },
  { id: 3, email: 'gestor@learnflix.com', password: '123456', profile: 'Gestor', name: 'Gestor Admin' },
  // Podemos adicionar mais usuários para os testes de estatística:
  { id: 4, email: 'aluno2@learnflix.com', password: '123456', profile: 'Aluno', name: 'Cristiano Ronaldo' },
];

// 2. A função de login agora estará aqui:
export const login = async (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user: { id: user.id, email: user.email, profile: user.profile, name: user.name } };
  }
  return { success: false, message: 'Credenciais inválidas' };
};

// 3. Nova função para o Gestor poder contar os usuários
export const getAllUsers = () => {
  // Retorna uma cópia da lista de usuários
  return [...users];
};

// Futuramente, podemos adicionar:
// export const registerUser = (newUser) => { ... }
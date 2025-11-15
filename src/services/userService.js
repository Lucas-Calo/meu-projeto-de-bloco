let users = [
  { id: 1, email: 'aluno@learnflix.com', password: '123456', profile: 'Aluno', name: 'Lucas Caló' },
  { id: 2, email: 'professor@learnflix.com', password: '123456', profile: 'Professor', name: 'Prof. Thiago Vieira de Aguiar' },
  { id: 3, email: 'gestor@learnflix.com', password: '123456', profile: 'Gestor', name: 'Gestor Admin' },
  { id: 4, email: 'aluno2@learnflix.com', password: '123456', profile: 'Aluno', name: 'Cristiano Ronaldo' },
];

export const login = async (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user: { id: user.id, email: user.email, profile: user.profile, name: user.name } };
  }
  return { success: false, message: 'Credenciais inválidas' };
};

export const getAllUsers = () => {
  return [...users];
};

/**
 * Adiciona um novo usuário à lista 'users'
 * @param {object} userData - { name, email, password, profile }
 * @returns {Array} A nova lista completa de usuários
 */
export const registerUser = (userData) => {
  // Verifica se o email já existe
  const emailExists = users.some(u => u.email === userData.email);
  if (emailExists) {
    // Retorna um erro (ou a lista antiga)
    alert('Erro: Este e-mail já está cadastrado.');
    return null;
  }

  const newUser = {
    ...userData,
    id: Date.now()
  };
  
  users.push(newUser);
  return [...users]; 
};
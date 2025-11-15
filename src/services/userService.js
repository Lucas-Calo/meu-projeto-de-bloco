const USERS_STORAGE_KEY = 'usuarios';

// Lista Padrão
const usuariosPadrao = [
  { id: 1, email: 'aluno@learnflix.com', password: '123456', profile: 'Aluno', name: 'Lucas Caló' },
  { id: 2, email: 'prof@learnflix.com', password: '123456', profile: 'Professor', name: 'Prof. Thiago Vieira de Aguiar' },
  { id: 3, email: 'gestor@learnflix.com', password: '123456', profile: 'Gestor', name: 'Gestor Admin' },
  { id: 4, email: 'aluno2@learnflix.com', password: '123456', profile: 'Aluno', name: 'Cristiano Ronaldo' },
];

// Função para carregar usuários do localStorage
const carregarUsuarios = () => {
  const dadosSalvos = localStorage.getItem(USERS_STORAGE_KEY);
  if (dadosSalvos) {
    try {
      const usuarios = JSON.parse(dadosSalvos);
      return Array.isArray(usuarios) ? usuarios : usuariosPadrao;
    } catch (e) {
      console.error("Falha ao ler o localStorage (usuários):", e);
      return usuariosPadrao;
    }
  }
  return usuariosPadrao;
};

// Função para salvar usuários no localStorage
const salvarUsuarios = (listaDeUsuarios) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(listaDeUsuarios));
};


let users = carregarUsuarios();



//Funções do Serviço

export const login = async (email, password) => {
  // Lê da variável 'users' (que já foi carregada)
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user: { id: user.id, email: user.email, profile: user.profile, name: user.name } };
  }
  return { success: false, message: 'Credenciais inválidas' };
};

export const getAllUsers = () => {
  // Lê da variável 'users'
  return [...users];
};

export const registerUser = (userData) => {
  // Lê da variável 'users'
  const emailExists = users.some(u => u.email === userData.email);
  if (emailExists) {
    alert('Erro: Este e-mail já está cadastrado.');
    return null;
  }

  const newUser = {
    ...userData,
    id: Date.now()
  };
  
  // Atualiza a variável local
  users.push(newUser);
  
  // Salva a nova lista completa no localStorage
  salvarUsuarios(users);

  return [...users]; 
};
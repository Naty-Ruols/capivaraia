// lib/auth.ts
"use client";

import users from './users.json';
// A importação do tipo 'User' foi removida, pois não era usada aqui.

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const signUp = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
  await delay(1500);

  if (!username || !email || !password) {
    return { success: false, message: 'Todos os campos são obrigatórios.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Formato de e-mail inválido.' };
  }
  const existingUser = users.find(user => user.username === username || user.email === email);
  if (existingUser) {
    return { success: false, message: 'Nome de usuário ou e-mail já cadastrado.' };
  }
  console.log('Novo usuário cadastrado (simulado):', { id: Math.random(), username, email });
  return { success: true, message: 'Usuário cadastrado com sucesso!' };
};

export const authenticateUser = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  await delay(1000);

  if (!email || !password) {
    return { success: false, message: 'E-mail e senha são obrigatórios.' };
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return { success: false, message: 'Credenciais inválidas.' };
  }
  localStorage.setItem('auth_token', 'simulated_jwt_token_for_' + user.email);
  console.log('Usuário logado (simulado):', { email: user.email });
  return { success: true, message: 'Login bem-sucedido!' };
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
  return false;
};

// Exporta a mesma função com o nome 'login' para compatibilidade
export const login = authenticateUser;
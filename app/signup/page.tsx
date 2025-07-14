// app/signup/page.tsx
"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, SubmitButton } from "@/components";
import { signUp } from "@/lib/auth";

const SignupPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await signUp(username, email, password);
      if (response.success) {
        alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
        router.push("/");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Criar uma Conta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            placeholder="Nome de usuário"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            disabled={loading}
          />
          <Input 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input 
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Input 
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          <SubmitButton 
            title={loading ? 'Cadastrando...' : 'Cadastrar'}
            disabled={loading} 
          />
          {error && (
            <p className="text-sm text-center font-medium text-red-500">
              {error}
            </p>
          )}
        </form>
        <p className="text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
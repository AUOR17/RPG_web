import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import type { AuthTokens } from '../types';
import Button from '../components/Button'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post<AuthTokens>('token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas. ¡El guardia te ha rechazado!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-sans">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-2">🏰 RPG Gremio</h1>
        <p className="text-gray-400 text-center mb-6">Identifícate, viajero.</p>
        
        {error && (
          <div className="bg-red-900 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="mt-2">
            Entrar al Tablero 👀
          </Button>

        </form>
      </div>
    </div>
  );
}
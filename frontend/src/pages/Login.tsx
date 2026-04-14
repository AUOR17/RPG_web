import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api';
import type { AuthTokens } from '../types';

export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();
        setError('');

        try{
            const response = await api.post<AuthTokens>('token/',{
                username,
                password,
            });

            const {access, refresh} = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            navigate('/dashboard');
        } catch (err){
            console.error(err);
            setError('Credenciales inválidas. ¡El guardia te ha rechazado!')
        }
    };


    return(
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', color: 'white', fontFamily: 'sans-serif' }}>
         <div style={{ backgroundColor: '#1F2937', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', width: '24rem', border: '1px solid #374151' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>🏰 RPG Gremio</h1>
        <p style={{ color: '#9CA3AF', textAlign: 'center', marginBottom: '1.5rem' }}>Identifícate, viajero.</p>
        {error && (
          <div style={{ backgroundColor: '#7F1D1D', border: '1px solid #EF4444', color: '#FECACA', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: '#374151', border: '1px solid #4B5563', color: 'white', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: '#374151', border: '1px solid #4B5563', color: 'white', boxSizing: 'border-box' }}
              required
            />
          </div>

            <button
            type="submit"
            style={{ width: '100%', backgroundColor: '#2563EB', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            Entrar al Tablero 👀
          </button>
        </form>

      </div>
    </div>
    );
}
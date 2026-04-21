import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const manejarlogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const respuesta = await apiDjango.post('/api/token/', {
            username,
            password,
            });
            
            localStorage.setItem('token', respuesta.data.access);

            navigate('/dashboard');
        }
        catch (err){
            console.error(err);
            setError('Credenciales invalidas')

        }

    };

    return (
    <div className="flex justify-center items-center h-[70vh]">
      <form onSubmit={manejarLogin} className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center">Entrar al Gremio</h2>
        
        {error && <p className="text-red-400 bg-red-900/30 p-2 rounded mb-4 text-sm text-center border border-red-800">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">Usuario</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-900 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-bold mb-2">Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-amber-500"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-2 px-4 rounded transition-all"
        >
          Forjar Alianza
        </button>
      </form>
    </div>
  );
}
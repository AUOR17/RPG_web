import { useNavigate } from 'react-router-dom';

const BotonCerrarSesion = () => {
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    localStorage.removeItem('token'); // Destruye el token
    navigate('/login'); // Redirige al login
  };

  return (
    <button 
      onClick={manejarCerrarSesion}
      className="bg-transparent border border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded shadow-lg transition-all"
    >
      Cerrar Sesión
    </button>
  );
};

export default BotonCerrarSesion;
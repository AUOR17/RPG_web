import {Navigate, Outlet, useNavigate} from 'react-router-dom'

export default function RutaPrivada (){

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token){
        return <Navigate to="/login" replace/>;
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md mb-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                        Gremio ERP (SAP)
                    </h1>
                    <button
                        onClick = {cerrarSesion}
                        className="text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-red-500 hover:bg-red-900/30 py-1 px-4 rounded transition-all"
                        >
                        Cerrar Sesion
                    </button>
                </div>
            </header>

        </div>
    );

}
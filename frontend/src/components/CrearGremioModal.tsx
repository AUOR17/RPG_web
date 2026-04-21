import {useState} from 'react'
import apiDjango from '../api/apiDjango'
import type {Gremio} from '../types'

type Props = {
    isOpen: boolean;
    onClose: ()=> void;
    onSuccess: (nuevoGremio: Gremio) => void;
};

export default function CrearGremioModal ({isOpen, onClose, onSuccess}:Props){


    const [nombre, setNombre] = useState('');

    if (!isOpen) return null;

    const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const respuesta = await apiDjango.post('/api/gremios/', {
        nombre: nombre
      });

      onSuccess(respuesta.data);
      setNombre('')
      onClose();
    }
    catch (error)
    {
        console.error("Error al crear gremio", error);
        alert("Ese nombre ya existia");
        
    }
    };

    return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-blue-500 mb-6 border-b border-gray-700 pb-2">Fundar Nuevo Gremio</h2>
        
        <form onSubmit={manejarEnvio}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Nombre del Gremio</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Ej. Lobos de Acero"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">
              Registrar al Gremio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
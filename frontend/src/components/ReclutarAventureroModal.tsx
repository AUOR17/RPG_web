import {useState, useEffect} from 'react';
import apiDjango from '../api/apiDjango';
import type {Aventurero, Gremio} from '../types';

type Props = {
    isOpen: boolean;
    onClose: ()=> void;
    onSuccess: (nuevo: Aventurero) => void;
    gremios: Gremio[];
};

export default function ReclutarAventureroModal ({isOpen, onClose, onSuccess, gremios}:Props){

    const [nombre, setNombre] = useState('');
    const [clase, setClase] = useState('Guerrero');
    const [gremioId, setGremioId] = useState('');

    useEffect(() => {
        if (isOpen && gremios.length > 0 && !gremioId){
            setGremioId(gremios[0].id.toString());
        }
    });

    if (!isOpen) return null;

    const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const respuesta = await apiDjango.post('/api/aventureros/', {
        nombre,
        clase_rpg: clase,
        estado: 'Disponible',
        gremio: parseInt(gremioId)
      });

      onSuccess(respuesta.data);
      setNombre('')
      setClase('Guerrero')
      onClose();
    }
    catch (error)
    {
        console.error("Error en el reclutamiento", error);
        alert("Error al conectar cn el Gremio");
        
    }
    };

    return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-amber-500 mb-6 border-b border-gray-700 pb-2">Nuevo Recluta</h2>
        
        <form onSubmit={manejarEnvio}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Nombre del Personaje</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-400 text-sm font-bold mb-2">Clase RPG</label>
            <select 
              value={clase}
              onChange={(e) => setClase(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-amber-500"
            >
              <option value="Guerrero">Guerrero</option>
              <option value="Mago">Mago</option>
              <option value="Arquero">Arquero</option>
              <option value="Sanador">Sanador</option>
              <option value="Ladrón">Ladrón</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-gray-400 text-sm font-bold mb-2">Clase RPG</label>
            <select 
              value={clase}
              onChange={(e) => setGremioId(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-amber-500"
                required
            >
              {gremios.map(g =>(
                <option key={g.id} value={g.id}>
                    {g.nombre}
                </option>
              )) 
              }
            </select>

          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded transition-colors">
              Añadir al Gremio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
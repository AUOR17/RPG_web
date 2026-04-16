import { useState } from 'react';
import api from '../api';
import Button from './Button';

interface AddGuildProps {
    onSuccess: () => void;
}

export default function AddGuild({ onSuccess }: AddGuildProps) {

    const [newGuildName, setNewGuildName] = useState('');
    const [newGuildKingdom, setNewGuildKingdom] = useState('');
    const [newGuildCapacity, setNewGuildCapacity] = useState(50);

    const crearGremio = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            await api.post('guilds/',{
                name: newGuildName,
                kingdom: newGuildKingdom,
                max_capacity: newGuildCapacity,
            });
            setNewGuildName('');
            setNewGuildKingdom('');
            setNewGuildCapacity(50);
            onSuccess();

        }catch (error){
            console.error(error);
            alert("Error al crear un gremio");
        }  
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">🏰 Fundar Gremio</h2>
            <form onSubmit={crearGremio} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Nombre del Gremio</label>
                    <input type="text" value={newGuildName} onChange={(e) => setNewGuildName(e.target.value)} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-500" />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Reino / Ubicacion</label>
                    <input type="text" value={newGuildKingdom} onChange={(e) => setNewGuildKingdom(e.target.value)} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-500" />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Capacidad Maxima</label>
                    <input type="text" value={newGuildCapacity} onChange={(e) => setNewGuildCapacity(Number(e.target.value))} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-500" />
                </div>


                <Button type="submit" variant="warning" className="mt-2">
                    Construir Sede 🧱
                </Button>

            </form>
        </div>
    );
}
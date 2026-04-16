import { useState } from "react";
import api from '../api'
import type { Guild } from "../types";
import Button from './Button';

interface AddAdventurerProps{
    guilds: Guild[];
    onSuccess: () => void;
}

export default function AddAdventurer({ guilds, onSuccess }: AddAdventurerProps) {
    const [newName, setNewName] = useState('');
    const [newClass, setNewClass] = useState<'MAGE' | 'WARRIOR' | 'ROGUE' | 'CLERIC'>('WARRIOR');
    const [newGuild, setNewGuild] = useState<number | ''>('');
  
    const crearAventurero = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newGuild === ''){
            alert("El aventurero debe pertenecer a un gremio");
            return;
        }

        try{
            await api.post('adventurers/',{
                name: newName,
                class_type: newClass,
                guild: newGuild,
            });
            setNewName('');
            setNewClass('WARRIOR');
            setNewGuild('');
            onSuccess();

        }catch (error){
            console.error(error);
            alert("Error al crear un aventurero");
        }  
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-400">✨ Reclutar Novato</h2>
            <form onSubmit={crearAventurero} noValidate className="flex flex-col gap4">
                <div>
                    <label className="block test-sm text-gray-400 mb-1">Nombre</label>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required 
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus_border-blue-500" />
                </div>

                <div>
                    <label className="block test-sm text-gray-400 mb-1">Clase</label>
                    <select value={newClass} onChange={(e) => setNewClass(e.target.value as any)} 
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus_border-blue-500">
                        <option value="WARRIOR">Guerrero</option>
                        <option value="MAGE">Mago</option>
                        <option value="ROGUE">Pícaro</option>
                        <option value="CLERIC">Clérigo</option>
                    </select>
                </div>

                <div>
                    <label className="block test-sm text-gray-400 mb-1">Gremio</label>
                    <select value={newGuild} onChange={(e) => setNewGuild(Number(e.target.value))} required 
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus_border-blue-500">
                        <option value="" disabled>-- Elige un Gremio --</option>
                        {guilds.map(guild => (
                            <option key={guild.id} value={guild.id}>{guild.name}</option>
                        ))}
                    </select>
                </div>

                <Button type="submit" variant="success" className="mt-2" >
                    Forjar Aventurero ⚒️
                </Button>

            </form>
        </div>
    );
}
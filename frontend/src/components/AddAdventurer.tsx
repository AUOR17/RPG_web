import { useState } from "react";
import api from '../api'
import type { Guild } from "../types";

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
        <div style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60A5FA' }}>✨ Reclutar Novato</h2>
            <form onSubmit={crearAventurero} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Nombre</label>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{width: '100%', padding: '0.5rem', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '0.25rem' }} />
                </div>

                <div>
                    <label style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Clase</label>
                    <select value={newClass} onChange={(e) => setNewClass(e.target.value as any)} style={{width: '100%', padding: '0.5rem', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '0.25rem' }}>
                        <option value="WARRIOR">Guerrero</option>
                        <option value="MAGE">Mago</option>
                        <option value="ROGUE">Pícaro</option>
                        <option value="CLERIC">Clérigo</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Gremio</label>
                    <select value={newGuild} onChange={(e) => setNewGuild(Number(e.target.value))} required style={{width: '100%', padding: '0.5rem', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '0.25rem' }}>
                        <option value="" disabled>-- Elige un Gremio --</option>
                        {guilds.map(guild => (
                            <option key={guild.id} value={guild.id}>{guild.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" style={{ backgroundColor: '#10B981', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
                    Forjar Aventurero ⚒️
                </button>

            </form>
        </div>
    );
}
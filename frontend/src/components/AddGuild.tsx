import { useState } from 'react';
import api from '../api';

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
        <div style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FBBF24' }}>🏰 Fundar Gremio</h2>
            <form onSubmit={crearGremio} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Nombre del Gremio</label>
                    <input type="text" value={newGuildName} onChange={(e) => setNewGuildName(e.target.value)} required style={{width: '100%', padding: '0.5rem', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '0.25rem' }} />
                </div>

                <div>
                    <label style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Reino / Ubicacion</label>
                    <input type="text" value={newGuildKingdom} onChange={(e) => setNewGuildKingdom(e.target.value)} required style={{width: '100%', padding: '0.5rem', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '0.25rem' }} />
                </div>

                <div>
                    <label style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Capacidad Maxima</label>
                    <input type="text" value={newGuildCapacity} onChange={(e) => setNewGuildCapacity(Number(e.target.value))} required style={{width: '100%', padding: '0.5rem', backgroundColor: '#374151', color: 'white', border: '1px solid #4B5563', borderRadius: '0.25rem' }} />
                </div>


                <button type="submit" style={{ backgroundColor: '#D97706', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
                    Construir Sede 🧱
                </button>

            </form>
        </div>
    );
}
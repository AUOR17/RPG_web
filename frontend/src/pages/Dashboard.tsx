import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import type { Adventurer, Guild } from '../types';

import AddAdventurer from '../components/AddAdventurer';
import AddGuild from '../components/AddGuild';
import AdventurerCard from '../components/AdventurerCard';


export default function Dashboard() {

    const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
    const [guilds, setGuilds] = useState<Guild[]>([]);
    const navigate = useNavigate();

    useEffect( () => {
        cargarTablero();
    }, []);

    const cargarTablero = async () => {
    try {
      const [resAdventurers, resGuilds] = await Promise.all([
        api.get<Adventurer[]>('adventurers/'),
        api.get<Guild[]>('guilds/')
      ]);
      setAdventurers(resAdventurers.data);
      setGuilds(resGuilds.data);
    } catch (error) {
      console.error(error);
      handleLogout(); 
    }
  };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const getGuildName = (guildId: number) => {
    const guild = guilds.find(g => g.id === guildId);
    return guild ? guild.name : 'Desconocido';
  };

    return(
        <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: 'white', padding: '2rem', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #374151', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🛡️ Tablero de Aventureros</h1>
                <button onClick={handleLogout} style={{ backgroundColor: '#DC2626', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cerrar Sesión
                </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
                    <AddAdventurer guilds={guilds} onSuccess={cargarTablero}/>
                    <AddGuild onSuccess={cargarTablero}/>
                </div>

                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', alignContent: 'start' }}>
                    { adventurers.length === 0 ? (
                        <p style={{color: '#9CA3AF'}}>No hay aventurero registrado</p>
                    ):(
                        adventurers.map((adv) => (
                            <AdventurerCard
                                key={adv.id}
                                adv={adv}
                                guildName={getGuildName(adv.guild)}
                                onActionSuccess={cargarTablero}
                            />
                        )
                        )
                    )
                    }
                </div>
            </div>
        </div>
    );
}
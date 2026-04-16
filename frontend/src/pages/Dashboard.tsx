import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import type { Adventurer, Guild } from '../types';

import AddAdventurer from '../components/AddAdventurer';
import AddGuild from '../components/AddGuild';
import AdventurerCard from '../components/AdventurerCard';
import Button from '../components/Button';

export default function Dashboard() {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    } catch (error: any) {
      console.error("🕵️‍♂️ ERROR REAL DETECTADO:", error);
      if (error.response && error.response.status === 401) {
        alert("Tu sesión expiró genuinamente. Vuelve a entrar.");
        handleLogout(); 
      }
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">🛡️ Tablero de Aventureros</h1>
        <Button onClick={handleLogout} variant="danger" className="!w-auto">
            Cerrar Sesión 🚪
          </Button>
      </div>

      <div className="flex gap-8 items-start">
        
        <div className="flex flex-col gap-8 w-80 shrink-0">
          <AddAdventurer guilds={guilds} onSuccess={cargarTablero} />
          <AddGuild onSuccess={cargarTablero} />
        </div>

        <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 content-start">
          {adventurers.length === 0 ? (
            <p className="text-gray-400 italic">No hay aventureros registrados en el reino aún...</p>
          ) : (
            adventurers.map((adv) => (
              <AdventurerCard
                key={adv.id}
                adv={adv}
                guildName={getGuildName(adv.guild)}
                onActionSuccess={cargarTablero}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
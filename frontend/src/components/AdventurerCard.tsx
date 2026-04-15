import api from '../api';
import type { Adventurer } from '../types';

interface AdventurerCardProps {
    adv: Adventurer;
    guildName: string;
    onActionSuccess: () => void;
}

export default function AdventurerCard({ adv, guildName, onActionSuccess }: AdventurerCardProps) {

    const matarAventurero = async () => {
        if (!window.confirm(`¿Seguro que quieres eliminar a ${adv.name}?`)) return;
        try {
            await api.delete(`adventurers/${adv.id}/`);
            onActionSuccess();

        } catch (error){
            console.error("Error al eliminar:", error);
            alert("Error al intentar dar de baja al aventurero.");
        }
    };

    const subirNivel = async () => {
        try {
            await api.patch(`adventurers/${adv.id}/`, {
                level: adv.level + 1
            });
            onActionSuccess();
        } catch (error) {
            console.error("Error al subir de nivel:", error);
            alert("Error en el entrenamiento.");
        }
    };

    return (
        <div style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{adv.name}</h2>
                <span style={{ backgroundColor: '#1E40AF', color: '#DBEAFE', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontWeight: 'bold' }}>
                Nv. {adv.level}
                </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '1.5rem', flexGrow: 1 }}>
                <p> 🧙‍♂️ <strong>Clase: </strong> {adv.class_type} </p>
                <p> 🔰 <strong>Estado: </strong> {adv.status}</p>
                <p> 🏰 <strong>Gremio: </strong> <span style={{color: '#60A5FA' }}>{guildName}</span> </p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                    onClick={subirNivel}
                    style={{width: '100%', backgroundColor: '#10B981', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', border: 'none', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Subir de Nivel
                </button>

                <button
                    onClick={matarAventurero}
                    style={{width: '100%', backgroundColor: 'transparent', color: '#9CA3AF', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', fontSize: '0.875rem', cursor: 'pointer'}}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#7F1D1D'; e.currentTarget.style.color = '#FECACA'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9CA3AF'; }}
                >
                    Dar de baja
                </button>

            </div>

        </div>

    );
}
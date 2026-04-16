import api from '../api';
import type { Adventurer } from '../types';
import Button from './Button';

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
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md flex flex-col hover:border-gray-500 transition-colors">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">{adv.name}</h2>
                <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full font-bold">
                    Nv. {adv.level}
                </span>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-gray-300 mb-6 flex-grow">
                <p> 🧙‍♂️ <strong>Clase: </strong> {adv.class_type} </p>
                <p> 🔰 <strong>Estado: </strong> {adv.status}</p>
                <p> 🏰 <strong>Gremio: </strong> <span className="text-blue-400">{guildName}</span> </p>
            </div>

            <div className="flex flex-col gap-2">
                <Button onClick={subirNivel} variant="success">
                    Subir de Nivel
                </Button>

                <Button 
                    onClick={matarAventurero} 
                    variant="outline"
                    className="hover:bg-red-900 hover:border-red-700 hover:text-red-200"
                    >
                        Dar de Baja ⚔️
                </Button>

            </div>

        </div>

    );
}
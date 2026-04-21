import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import apiFast from '../api/apiFast';
import apiDjango from '../api/apiDjango';
import type { Aventurero, Columnas, Gremio } from '../types';
import ReclutarAventureroModal from './ReclutarAventureroModal';
import CrearGremioModal from './CrearGremioModal';


const columnasVacias: Columnas = {
  "Disponible": [],
  "En Misión": [],
  "Enfermería": [],
  "Muerto": []
};


export default function KanbanBoard(){
    const [columnas, setColumnas] = useState<Columnas>(columnasVacias);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [gremios, setGremios] = useState<Gremio[]>([]);
    const [modalGremioAbierto, setModalGremioAbierto] = useState(false);

    const alReclutarExitoso = (nuevo: Aventurero) => {
        setColumnas((prev) => ({
            ...prev,
            "Disponible": {...prev["Disponible"], nuevo}
        }));
    };

    const alFundarGremioExitoso = (nuevoGremio : Gremio) => {
        setGremios((prev) => [...prev, nuevoGremio])
    }

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resAventureros, resGremios] = await Promise.all([
                    apiDjango.get('/api/aventureros/'),
                    apiDjango.get('/api(gremios/')
                ]);

                const aventurerosReales: Aventurero[] = resAventureros.data;
                setGremios(resGremios.data);

                const tableroCargado: Columnas = structuredClone(columnasVacias)

                aventurerosReales.forEach((ave) => {
                    if (tableroCargado[ave.estado]){
                        tableroCargado[ave.estado].push(ave);
                    }else {
                        tableroCargado["Disponible"].push(ave);
                    }
                });

                setColumnas(tableroCargado)

            }
            catch (error){
                console.error("Error al invocar aventureros:", error)
            }
        };

        cargarDatos();

    }, []);

    const onDragEnd = async (result: DropResult) => {

        const {source, destination} = result;

        if (!destination) return;

        if (source.droppableID === destination.droppableID && source.index === destination.index) return;

        const estadoAnterior = {...columnas} ;
        const columnaOrigen = [...columnas[source.droppableID]];
        const columnaDestino = [...columnas[destination.droppableID]];
        const [aventureroMovido] = columnaOrigen.splice(source.index,1);
        columnaDestino.splice(destination.index, 0, aventureroMovido)


        setColumnas({
            ...columnas, 
            [source.droppableID]: columnaOrigen,
            [destination.droppableID]: columnaDestino
        });

        try{
            console.log(`Intentando mover a ${aventureroMovido.nombre} a ${destination.droppableID}...`);
            const respuesta = await apiFast.patch(`/api/kanban/mover${aventureroMovido.id}`,{
                nuevo_estado: destination.droppableID
            });
            console.log("Exito en el Backend", respuesta.data);
        } catch (error) {
            console.error("El backend rechazó el movimeinto:", error);
            alert(`El movimiento de ${aventureroMovido.nombre} fue denegado`);
        }

    };
return (
    <>
      {/* BARRA DE HERRAMIENTAS SUPERIOR TIPO SAP */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-gray-400 font-mono tracking-widest uppercase text-sm">
          Operaciones de Campo
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setModalGremioAbierto(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-all"
          >
            + Fundar Gremio
          </button>
          <button 
            onClick={() => setModalAbierto(true)}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded shadow-lg transition-all"
          >
            + Reclutar Aventurero
          </button>
        </div>
      </div>

      {/* EL TABLERO KANBAN */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 justify-center items-start mt-8">
          {Object.entries(columnas).map(([nombreColumna, aventureros]) => (
            <Droppable key={nombreColumna} droppableId={nombreColumna}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-800/50 p-4 rounded-xl w-64 min-h-[400px] border border-gray-700 shadow-2xl"
                >
                  <h2 className="text-xl font-bold text-amber-500 mb-4 text-center border-b border-gray-700 pb-2">
                    {nombreColumna}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {aventureros.map((ave, index) => (
                      <Draggable key={ave.id.toString()} draggableId={ave.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-gray-700 p-4 rounded-lg shadow-md cursor-grab active:cursor-grabbing transition-transform border border-gray-600 ${
                              snapshot.isDragging ? 'rotate-2 scale-105 bg-gray-600 border-amber-500' : ''
                            }`}
                          >
                            <p className="font-semibold text-gray-100">{ave.nombre}</p>
                            <span className="text-xs text-amber-400 font-mono tracking-widest uppercase">
                              {ave.clase_rpg}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* MODALES FLOTANTES */}
      <ReclutarAventureroModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        onSuccess={alReclutarExitoso}
        gremios={gremios}
      />

      <CrearGremioModal 
        isOpen={modalGremioAbierto} 
        onClose={() => setModalGremioAbierto(false)} 
        onSuccess={alFundarGremioExitoso}
      />
    </>
  );
}
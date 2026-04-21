export type Gremio = {
  id: number;
  name: string;
}

export type Aventurero = {
  id: number;
  nombre: string;
  clase_rpg: string;
  estado: string;
};

export type Columnas = {
  [key: string]: Aventurero[];
};
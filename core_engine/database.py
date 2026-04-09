import sqlite3

def obtener_conexion(nombre_db = 'Partida.db'):
    conexion = sqlite3.connect(nombre_db)
    conexion.execute("PRAGMA foreign_keys = ON")
    return conexion

def inicializar_db(nombre_db = 'Partida.db'):
    conexion = obtener_conexion(nombre_db)
    cursor = conexion.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS personajes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT UNIQUE NOT NULL,
            salud_maxima INTEGER NOT NULL,
            tipo_clase TEXT NOT NULL,
            puntos_armadura INTEGER DEFAULT 0, 
            mana_maximo INTEGER DEFAULT 0, 
            multiplicador_ataque REAL DEFAULT 1.0,
            gremio_id INTEGER, 
            FOREIGN KEY (gremio_id) REFERENCES gremios(id)
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gremios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_gremio TEXT UNIQUE NOT NULL
        )
    ''')

    conexion.commit()
    conexion.close()
    print(f"Base de datos Partida.db ha sido inicializada")
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def obtener_conexion():
    try:
        conexion = psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
            host=os.getenv("POSTGRES_HOST"),
            port="5432"
        )
        return conexion
    except psycopg2.OperationalError as e:
        print(f"Error fatal: No se pudo conectar al servidor de BD. ¿Docker está corriendo? Detalles: {e}")
        raise

def inicializar_db():
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gremios (
            id SERIAL PRIMARY KEY,
            nombre_gremio VARCHAR(255) UNIQUE NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS personajes (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) UNIQUE NOT NULL,
            salud_maxima INTEGER NOT NULL,
            tipo_clase VARCHAR(50) NOT NULL, 
            puntos_armadura INTEGER DEFAULT 0,
            mana_maximo INTEGER DEFAULT 0,
            multiplicador_ataque NUMERIC(5,2) DEFAULT 1.0,
            gremio_id INTEGER,
            CONSTRAINT fk_gremio FOREIGN KEY (gremio_id) REFERENCES gremios (id) ON DELETE SET NULL
        )
    ''')

    conexion.commit()
    cursor.close()
    conexion.close()
    print("[Sistema] Servidor PostgreSQL formateado y listo para la batalla.")
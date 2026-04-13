import pytest
import sys
import os 

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core_engine.models import Guerrero, Mago, JefeFinal, Gremio
from app.core_engine.database import inicializar_db, obtener_conexion

@pytest.fixture()
def db_limpia():

    nombre_db = 'test_partida.db'
    if os.path.exists(nombre_db):
        os.remove(nombre_db)

    inicializar_db(nombre_db)

    yield nombre_db

    if os.path.exists(nombre_db):
        os.remove(nombre_db)

def test_reglas_salud():
    kratos = Guerrero("kratos", salud_maxima=100, puntos_armadura=90)

    kratos.salud = -50000
    assert kratos.salud == 0

    kratos.salud = 999999
    assert kratos.salud == 100

@pytest.mark.parametrize("personaje, nombre, salud_maxima, atributo_extra",[
    (Guerrero, 'Arthur',300,50),
    (Mago, 'Merlin', 50, 140),
    (JefeFinal, 'Sauron', 1000, 1.5)
])
def test_creacion_personaje(personaje, nombre, salud_maxima, atributo_extra):
    personaje_creado = personaje(nombre, salud_maxima, atributo_extra)
    assert personaje_creado.nombre == nombre
    assert personaje_creado.salud_maxima == salud_maxima
    
    if isinstance(personaje_creado, Mago):
        assert personaje_creado.mana_maximo == 140
    elif isinstance(personaje_creado, JefeFinal):
        assert personaje_creado.enfurecido == False


def test_database_guardar_gremio(db_limpia):
    try:
        nombre_db_prueba = db_limpia
        gremio_nuevo = Gremio('Fairy Tail')
        natsu = Mago('Natsu', 150, 300)

        conexion = obtener_conexion(nombre_db_prueba)
        cursor = conexion.cursor()

        cursor.execute("INSERT INTO gremios (nombre_gremio) VALUES (?)", (gremio_nuevo.nombre_gremio,))
        gremio_id = cursor.lastrowid

        cursor.execute('''
            INSERT INTO personajes (nombre, salud_maxima, tipo_clase, mana_maximo, gremio_id)
            VALUES (?, ?, ?, ?, ?)
        ''', (natsu.nombre, natsu.salud_maxima, 'Mago', natsu.mana_maximo, gremio_id))

        conexion.commit()

        cursor.execute('''
            SELECT p.nombre, g.nombre_gremio
            FROM personajes p
            JOIN gremios g on p.gremio_id = g.id
            where p.nombre = 'Natsu'
        ''')
        resultado = cursor.fetchone()

        print(resultado)

        assert resultado is not None, "El personaje NO se guardo en la DB"
        assert resultado[0] == 'Natsu', 'El nombre guardado es incorrecto'
        assert resultado[1] == 'Fairy Tail', 'El gremio guardado es incorrecto'

    finally:
        conexion.close()
    
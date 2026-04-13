import psycopg2 # Cambiamos sqlite3 por psycopg2 para los errores
import sys
from core_engine.database import inicializar_db, obtener_conexion
from core_engine.models import Guerrero, Mago, Gremio

def fundar_gremio():
    nombre = input("Ingrese el nombre del gremio: ")
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    try: 
        cursor.execute("INSERT INTO gremios (nombre_gremio) VALUES (%s)", (nombre,))
        conexion.commit()
        print(f"Gremio '{nombre}' ha sido fundado " )

    except psycopg2.IntegrityError:
        print(f"¡Alto ahí! Ya existe un Gremio registrado con el nombre '{nombre}'.")
    except Exception as e:
        print(f"El error es {e}")
    finally: 
        cursor.close()
        conexion.close()

def reclutar_aventurero():
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    try:
        hay_gremios = mostrar_gremios(cursor)
        if not hay_gremios:
            print("no hay gremios disponibles, pro favor crea regresando a la opcion 2")
            return
        
        gremio_id = input("Ingrese el ID del gremio Elegido: ")
        nombre = input("Ingrese el nombre del aventurero: ")
        clase = input("Elige la clase (Inserta 1 para Guerrero, 2 para Mago): ")

        if clase == '1':
            armadura = int(input("Ingresa los puntos de armadura: "))
            nuevo_pj = Guerrero(nombre, salud_maxima=100, puntos_armadura=armadura)
            cursor.execute('''
                INSERT INTO personajes (nombre, salud_maxima, tipo_clase, puntos_armadura, gremio_id)
                VALUES (%s, %s, %s, %s, %s)
            ''', (nuevo_pj.nombre, nuevo_pj.salud_maxima, 'Guerrero', nuevo_pj.puntos_armadura, gremio_id))

        elif clase == '2':
            mana = int(input("Ingresa los puntos de mana: "))
            nuevo_pj = Mago(nombre, salud_maxima=100, mana_maximo=mana)
            cursor.execute('''
                INSERT INTO personajes (nombre, salud_maxima, tipo_clase, puntos_armadura, gremio_id)
                VALUES (%s, %s, %s, %s, %s)
            ''', (nuevo_pj.nombre, nuevo_pj.salud_maxima, 'Mago', nuevo_pj.mana_maximo, gremio_id))

        else:
            print("Clase no válida, por favor elige 1 para Guerrero o 2 para Mago.")
            return
        
        conexion.commit()
        print(f"Aventurero '{nuevo_pj.nombre} ha sido recludado a la base de datos")

    except psycopg2.IntegrityError:
        print(f"¡Clon detectado! Ya existe un héroe llamado '{nombre}' en este mundo.")

    except Exception as e:
        print(f"El error es {e}")

    finally: 
        conexion.close()

def mostrar_gremios(cursor):

    cursor.execute("SELECT id, nombre_gremio FROM gremios")
    gremios = cursor.fetchall()

    if not gremios:
        print(" Aun no hay gremios fundados")
        return False
    
    for gremio in gremios:
        print(f"[{gremio[0]}] {gremio[1]}")
    
    return True

def ver_taberna():
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    try: 
        hay_gremios = mostrar_gremios(cursor)
        if not hay_gremios:
            print("no hay gremios disponibles, pro favor crea regresando a la opcion 2")
            return

        gremio_id = input("Ingresa el ID del gremio para ver a sus miembtos: ") 

        cursor.execute('''
            SELECT p.nombre, p.salud_maxima, p.tipo_clase, p.puntos_armadura, p.mana_maximo, g.nombre_gremio
            FROM personajes p
            JOIN gremios g ON p.gremio_id = g.id
            WHERE g.id = %s
        ''', (gremio_id,))
        resultados = cursor.fetchall()
        
        if not resultados:
            print("La taberna está vacía o el ID del gremio es incorrecto.")
            return
            
        print(f"Miembros del gremio como regresa el SQL: {resultados}")    
        nombre_gremio = resultados[0][5]
        mi_gremio = Gremio(nombre_gremio)

        for fila in resultados:
            nombre, salud, tipo, armadura, mana, _ = fila
            
            if tipo == "Guerrero":
                pj = Guerrero(nombre, salud, armadura)
            elif tipo == "Mago":
                pj = Mago(nombre, salud, mana)
                
            mi_gremio.reclutar_miembros(pj)
            
        mi_gremio.listar_miembros()

    except Exception as e:
        print(f"El error es {e}")
    finally:
        conexion.close()

if __name__ == "__main__":

    try:
        while True:
            print("\n" + "=="*50)
            print(" Gestor de gremios RPG")
            print("="*50)
            print("1. Forjar el Mundo (Inicializar Base de Datos desde Cero)")
            print("2. Fundar un nuevo Gremio (INSERT)")
            print("3. Reclutar Aventurero (INSERT con Llave Foránea)")
            print("4. Entrar a la Taberna del Gremio (SELECT y Reconstrucción POO)")
            print("5. Salir del Juego")
            print("="*50)
            
            opcion = input("Elige tu destino, viajero: ")

            if opcion == '1':
                inicializar_db()
                print("El mundo ha sido creado desde 0")
            elif opcion == '2':
                fundar_gremio()
            elif opcion == '3':
                reclutar_aventurero()
            elif opcion == '4':
                ver_taberna()
            elif opcion == '5':
                print("¡Hasta la próxima aventura!")
                break
            else:
                print("Opcion no valida")

    except KeyboardInterrupt:
        print(" El sistema ha sido detenido por el creador")
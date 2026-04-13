class Personaje:

    def __init__(self, nombre, salud_maxima):
        self.nombre = nombre
        self._salud = salud_maxima
        self.salud_maxima = salud_maxima
        self.inventario = ["Poción chica", "Pan seco"]

    @property
    def salud(self):
        return self._salud
    
    @salud.setter
    def salud(self, nueva_salud: int) -> int:

        if nueva_salud < 0:
            self._salud = 0
            print(f"{self.nombre} ha muerto.")
        elif nueva_salud > self.salud_maxima:
            self._salud = self.salud_maxima
        else:
            self._salud = nueva_salud

    def __str__(self):
        return f"{self.nombre} | HP: {self.salud}/{self.salud_maxima}"
    
class Guerrero(Personaje):

    def __init__(self, nombre, salud_maxima, puntos_armadura):
        super().__init__(nombre, salud_maxima) 
        self.puntos_armadura = puntos_armadura

    def __str__(self):
        return "Guerrero: " + super().__str__() + f" | Armadura: {self.puntos_armadura}" 
    
class Mago(Personaje): 

    def __init__(self, nombre, salud_maxima, mana_maximo):
        super().__init__(nombre, salud_maxima)
        self.mana_maximo = mana_maximo
        self._mana = mana_maximo

    def __str__(self):
        return "Mago: " + super().__str__() + f" | Mana: {self._mana}/{self.mana_maximo}" 
    
    def lanzar_hechizo(self,costo_mana: int) -> None:

        if self._mana >= costo_mana:
            self._mana -= costo_mana
            print(f"{self.nombre} lanza un hechizo!. Mana restante: {self._mana}/{self.mana_maximo}")
        else:
            print(f"{self.nombre} no tiene suficiente mana para atacar. ")

class JefeFinal(Personaje):

    def __init__(self, nombre, salud_maxima, multiplocador_damage):
        super().__init__(nombre, salud_maxima)
        self.mutiplicador_damage = multiplocador_damage
        self.enfurecido = False

    def __str__(self):
        estado = "Enfurecido" if self.enfurecido else "Acechando"
        return f"Jefe Final: {super().__str__()} | Daño: {self.mutiplicador_damage} | Estado: {estado}"
    
    def recibir_daño_critico(self,cantidad):
        self.salud -= cantidad
        if 0 < self.salud <= (self.salud_maxima * 0.3) and not self.enfurecido:
            self.enfurecido = True
            self.mutiplicador_damage *= 2
            print(f" El cielo oscurece, {self.nombre} ha entrado en FASE 2")
            print(f"Su multiplicador de daño subio a {self.mutiplicador_damage}")

class Gremio: 

    def __init__(self, nombre_gremio):
        self.nombre_gremio = nombre_gremio
        self.miembros = []
    
    def reclutar_miembros(self, personaje):
        self.miembros.append(personaje)
        print(f"{personaje.nombre} se ha unido al gremio {self.nombre_gremio}")

    def listar_miembros(self):

        print(f"--- Gremio {self.nombre_gremio.upper()} ---")
        if not self.miembros:
            print("El gremio esta vacio, Recluta a alguien")
        else:
            for miembro in self.miembros:
                print(miembro)
        print("-" * 30)

from datetime import datetime

class BovinoModel:
    def __init__(self, data):
        self.idFinca = data.get('idFinca', '')
        self.nombre = data.get('nombre', '')
        self.raza = data.get('raza', '')
        self.fechaNacimiento = data.get('fechaNacimiento', None)  # Puede ser un string o un datetime
        self.genero = data.get('genero', '')  # Ej: "macho", "hembra"
        self.tipo = data.get('tipo', '')  # Ej: "carne", "leche", "mixto"
        self.estadoSalud = data.get('estadoSalud', '')  # Ej: "sano", "enfermo"
        self.fechaRegistro = data.get('fechaRegistro', datetime.now())
        self.create_at = data.get('create_at', datetime.now())
        self.update_at = data.get('update_at', datetime.now())
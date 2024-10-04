from flask import Blueprint, request, jsonify
from controllers.jwt import validar_token
from configs.conecction import collections
from controllers.finca import (
    insertar_finca,
    obtener_finca,
    obtener_fincas,
    eliminar_finca,
    actualizar_finca,
    obtener_fincas_all
)

#inicalizando ruta
finca_routes = Blueprint('finca_routes', __name__)

##validando token
@finca_routes.before_request
def verificar_token():
    try:
        token = request.headers['Authorization'].split(" ")[1]
        validar_token(token, output=False)
    except:
        return jsonify({"Mensaje":"Error de autenticacion, no estas autorizado"})

#ruta crear finca
@finca_routes.route('/api/finca', methods=['POST'])
def insertar_finca_ruta():
    return insertar_finca(collections('fincas'))
  
#ruta mostrar fincas
@finca_routes.route('/api/finca', methods=['GET'])
def obtener_fincas_all_ruta():
    return obtener_fincas_all(collections('fincas'))

#ruta mostrar fincas
@finca_routes.route('/api/finca/<idUsuario>', methods=['GET'])
def obtener_finca_ruta(idUsuario):
    return obtener_fincas(collections('fincas'), idUsuario)



#ruta eliminar finca
@finca_routes.route('/api/finca/<id>', methods=['DELETE'])
def eliminar_finca_ruta(id):
    return eliminar_finca(collections('fincas'), id)

#ruta actualizar finca
@finca_routes.route('/api/finca/<id>', methods=['PUT'])
def actualizar_finca_ruta(id):
    return actualizar_finca(collections('fincas'), id)
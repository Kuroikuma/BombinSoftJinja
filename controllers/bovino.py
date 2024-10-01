from flask import request, jsonify
from datetime import datetime
from bson import ObjectId
from models.bovino import BovinoModel
import json


#controlador insertar finca
def insertar_bovino(collections):
    try:
        data = json.loads(request.data)
        bovino_instance = BovinoModel(data)
        id = collections.insert_one(bovino_instance.__dict__).inserted_id
        return jsonify({'id':str(id)})
    except Exception as e:
        response = jsonify({"message": "Error de petición", "error": str(e)})
        response.status_code = 500
        return response

##obtener todas los bovinos del usario
def obtener_bovinosByUser(finca_collection, ganado_collection, id_usuario):
    try:
        bovinos = []
        
        # Obtener todas las fincas del usuario
        fincas = finca_collection.find({"idUsuario": id_usuario})
        finca_ids = [str(doc_finca["_id"]) for doc_finca in fincas]
        
        print(finca_ids)

        # Comprobar si se encontraron fincas
        if not finca_ids:
            return jsonify({"message": "No se encontraron fincas para el usuario."}), 404

        # Obtener todos los bovinos en las fincas del usuario
        bovinos_docs = ganado_collection.find({"idFinca": {"$in": finca_ids}})
        
        # Convertir el cursor a una lista para verificar la longitud
        bovinos_list = list(bovinos_docs)
        
        # Comprobar si se encontraron bovinos
        if not bovinos_list:
            return jsonify({"message": "No se encontraron bovinos para el usuario."}), 404
        
        for doc_ganado in bovinos_list:
            bovino = BovinoModel(doc_ganado).__dict__
            bovino['_id'] = str(doc_ganado['_id'])
            bovinos.append(bovino)

        return jsonify(bovinos), 200
        
    except Exception as e:
        response = jsonify({"message": "Error de petición", "error": str(e)})
        response.status_code = 500
        return response
      
##obtener todas los bovinos de la finca
def obtener_bovinosByFarm(collections, idFinca):
    try:
        bovinos = []
        for doc in collections.find({"idFinca": idFinca}):
            bovino = BovinoModel(doc).__dict__
            bovino['_id'] = str(doc['_id'])
            bovinos.append(bovino)
        return jsonify(bovinos)
    except Exception as e:
        response = jsonify({"message": "Error de petición", "error": str(e)})
        response.status_code = 500
        return response


#controlador mostrar finca
def obtener_bovino(collections, id):
    try:
        doc = collections.find_one({'_id': ObjectId(id)})
        bovino_data = BovinoModel(doc).__dict__
        bovino_data['_id'] = str(doc['_id'])
        return jsonify(bovino_data)
    except:
        response = jsonify({"menssage":"error de peticion"})
        response.status = 401
        return response


#controlador eliminar finca
def eliminar_bovino(collections, id):
    try:
        collections.delete_one({'_id': ObjectId(id)})
        return jsonify({'mensaje': 'finca eliminada'})
    except:
        response = jsonify({"menssage":"Error al Eliminar"})
        response.status = 401
        return response

#controlador actualizar finca
def actualizar_bovino(collections, id):
    try:
        bovino_data = collections.find_one({'_id': ObjectId(id)})
        print(request.get_json())
        bovino_data_update = BovinoModel(request.json)
        
        #insertando datos sencibles
        bovino_data_update.create_at = bovino_data['create_at']
        bovino_data_update.update_at = datetime.now()

        collections.update_one({'_id': ObjectId(id)}, {"$set": bovino_data_update.__dict__})
        return jsonify({"message": "finca actualizada"})
    except:
        response = jsonify({"menssage":"error de peticion"})
        response.status = 401
        return response
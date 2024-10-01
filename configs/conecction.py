from http import client
from pymongo import MongoClient
from configs.config import MONGO_URI

###inicializando conexion a base datos
client = MongoClient("mongodb+srv://Odiseo:Mapamapa84@cluster0.cpnkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['bovinsoft']

##funcion para obtener una collection
def collections(collection):
    collection = db[collection]
    return collection
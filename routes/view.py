from flask import Blueprint
from configs.conecction import collections
from flask import Flask, render_template

##inicializando ruta de las vista
view_routes = Blueprint('view_routes', __name__)

##ruta de login
@view_routes.route('/Ganado')
def view_ganado():
    return render_template('livestock.html', title='Home')
  
@view_routes.route('/Ganado/PorFinca/<idFinca>')
def view_ganado_por_finca(idFinca):
    return render_template('livestock.html', title='Home')

#ruta de resgistros de usuarios
@view_routes.route('/Finca')
def view_finca():
    return render_template('farm.html', title='Home')
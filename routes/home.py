from flask import Blueprint
from flask import Flask, render_template

##inicializando ruta
home = Blueprint('home', __name__)

#ruta inical
@home.route('/')
def index():
    return render_template('home.html', title='Home')
# from flask import Flask
# app = Flask (__name__)

# @app.route('/')
# def principal(): return "Bienvenidos o bienvenida a mi sitio web con PYTHON"
# @app.route('/contacto')
# def contacto(): return "Esta es la página de contactos HOY"
# @app.route('/lenguajeprogramacion')
# def lenguajes(): return "Esta es la pagina de lenguajes de programación"

# if __name__ == '__main__': app.run(debug=True, port= 8000)

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    user = {'username': 'Juan'}
    return render_template('home.html', title='Home', user=user)
  
@app.route('/Ganado')
def ganado():
  user = {'username': 'Juan'}
  return render_template('livestock.html', title='Home', user=user)

@app.route('/Finca')
def finca():
  user = {'username': 'Juan'}
  return render_template('farm.html', title='Home', user=user)

if __name__ == '__main__':
    app.run(debug=True)

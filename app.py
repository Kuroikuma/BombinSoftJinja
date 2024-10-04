from flask import Flask
from flask_cors import CORS
from configs.config import DEBUG, PORT
from routes.home import home
from routes.login import login_routes
from routes.user import user_routes
from routes.view import  view_routes
from routes.finca import finca_routes
from routes.bovino import bovino_routes

def create_app():

  ##inicializando servidor
  app = Flask(__name__)


  #habilitando cors
  CORS(app)


  #routes
  app.register_blueprint(home)
  app.register_blueprint(login_routes)
  app.register_blueprint(user_routes)
  app.register_blueprint(view_routes)
  app.register_blueprint(finca_routes)
  app.register_blueprint(bovino_routes)

if __name__ == '__main__':
    app = create_app()
    app.run(debug=DEBUG, port=PORT)

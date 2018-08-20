# coding: utf-8
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# Configuaração necessária para resolver problemas de Cross-Origin Resource (cors)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)

# from app.controllers import controller
from app.controllers import controller

# coding: utf-8
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# Configuaração necessária para resolver problemas de Cross-Origin Resource (cors)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

from app.controllers import __init__
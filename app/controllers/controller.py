# coding: utf-8
from app.main import app
from flask import render_template, request, Response, jsonify
from app.models.model import DAO

dao = DAO()

@app.route('/')
@app.route('/index')
def index():
	#dao.select_all()
	return render_template('index.html')

@app.route('/livros' , methods=['GET'])
def get_livros():
	livros = dao.select_all()
	return livros

@app.route('/livro' , methods=['GET'])
def get_livro():
	id = request.values['id']
	livro = dao.select(id)
	return livro

@app.route('/delete' , methods=['GET','POST'])
def del_livro():
	id = request.values['id']
	#dao.delete(id)
	dao.delete(id)
	return jsonify({'status':'true'})

@app.route('/test')
def test():
	return dao.select_all()

@app.route('/test2')
def test2():
	return dao.select('46')

@app.route('/novo_livro', methods=['POST'])
def novo_livro():
	nome = request.values['nome']
	ano = request.values['ano']
	dao.insert(nome,ano)
	#return render_template('index.html')
	return jsonify({'status':'true'})

@app.route('/alter_livro', methods=['POST'])
def alter_livro():
	id = request.values['id']
	nome = request.values['nome']
	ano = request.values['ano']
	dao.update(id,nome,ano)
	return jsonify({'status':'true'})

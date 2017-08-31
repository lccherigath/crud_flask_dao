# -*- coding: utf-8 -*-
from app import app
from flask import Flask, request, Response, jsonify
import os, sqlite3, json

class DAO(object):
    
    def __init__(self):
        
        self.databasename = 'bd_flask.db'
        self.BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        self.database = os.path.join(self.BASE_DIR, self.databasename )
        
    def insert(self,nome,ano):
        try:
            connection = sqlite3.connect(self.database)
            cursor = connection.cursor()
            cursor.execute('insert into livro(nome,ano) values(?,?)',(nome,ano))
            connection.commit()
            #return jsonify( {'inserted_id':cursor.lastrowid} )
        except sqlite3.Error as e:
            #if connection:
                #connection.rollback()
            print ("Error %s:") % e.args[0]        
        finally:
            if connection:
                connection.close()
  
    def update(self,id,nome,ano):
        try:
            connection = sqlite3.connect(self.database)
            cursor = connection.cursor()
            cursor.execute('update livro set nome=?, ano=? where id='+id,(nome,ano))
            connection.commit()
            #return jsonify( {'inserted_id':cursor.lastrowid} )
        except sqlite3.Error as e:
            #if connection:
                #connection.rollback()
            print ("Error %s:") % e.args[0]        
        finally:
            if connection:
                connection.close()

    def delete(self,id):
        try:
            connection = sqlite3.connect(self.database)
            cursor = connection.cursor()
            cursor.execute('delete from livro where id='+id)
            connection.commit()
            #return jsonify( {'inserted_id':cursor.lastrowid} )
        except sqlite3.Error as e:
            #if connection:
                #connection.rollback()
            print ("Error %s:") % e.args[0]        
        finally:
            if connection:
                connection.close()

    def select(self,id):
        try:
            connection = sqlite3.connect(self.database)
            cursor = connection.cursor()
            cursor.execute('select * from livro where id='+id )
            colunas = [ descr[0] for descr in cursor.description]
            livro = cursor.fetchall()
            result = []
            for linha in livro:
                result.append( { t:value for (t,value) in zip(colunas, linha) } )
            #return jsonify(result)
            return Response( json.dumps(result), status=200, mimetype='application/json' )
        except sqlite3.Error as e:    
            print ("Error %s:") % e.args[0]        
        finally:
            if connection:
                connection.close()

    def select_all(self):
        try:
            connection = sqlite3.connect(self.database)
            cursor = connection.cursor()
            cursor.execute('select * from livro')
            colunas = [ descr[0] for descr in cursor.description]
            livros = cursor.fetchall()
            result = []

            #arq = open('app/templates/livros.json','w')

            for linha in livros:
                obj = { t:value for (t,value) in zip(colunas, linha) }
                result.append(obj)
            
            #arq.write( json.dumps(result) )

            return Response( json.dumps(result), status=200, mimetype='application/json' )
            #return jsonify(result)
        except sqlite3.Error as e:
            print ("Error %s:") % e.args[0]        
        finally:
            #arq.close()
            if connection:
                connection.close()
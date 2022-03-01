import psycopg2
from logging import info  #importar informações da execução da query, mostrar no log 
class DeloreanLibrary():
    
    def connect(self):
         return psycopg2.connect(
            host='ec2-54-198-213-75.compute-1.amazonaws.com',
            database='d3pg14mvuurpkq',
            user='ekbqwzmwfoltpb',
            password='26eaa9f7fce5305a05857141e1ccfff3881116c7f02544f1678878caed479a37'
        )
         
    #instalar a lib de conexão com bd do python, importar e criar o arquivo para lib que executa querys do banco de dados, chamar o método python no test case"
    def remove_student(self,email):
        
        query="DELETE FROM students where email='{}'".format(email)
        info(query)
        
        conn= self.connect()
        
        cur= conn.cursor()
        cur.execute(query)
        
        conn.commit()
        conn.close()
        
                    
    def insert_student(self,student):
      self.remove_student(student['email'])
      query=("insert into students(name,email,age,weight,feet_tall,created_at,updated_at)"
             "values('{}','{}',{},{},{},now(),now());"
              .format(student['name'],student['email'],student['age'],student['weight'],student['feet_tall']))

      info(query)
        
      conn= self.connect()
        
      cur= conn.cursor()
      cur.execute(query)
        
      conn.commit()
      conn.close()      
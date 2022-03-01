***Settings***
Documentation       Cadastro de Aluno
Resource            ../resources/base.robot
Suite Setup          Open Browser
Test Setup           Go To Login 
Test Teardown        Take Screenshot


**Test Cases**
Cadastrar Estudante
    &{student}                        Create Dictionary      name=Leidiane Soares     email=leidiane5499@hotmail.com    age=33    weight=84    feet_tall=1.65 
    Remove student                    ${student.email}
    Create student                    ${student}
    #${age}    Get Attribute           css=input[type=age]     type        #verificar se o campo é numérico
    #Log To Console    ${age}
    #Should be Equal   ${age}           number    #validando se o campo é numérico mesmo
    Wait For Elements State           text=Aluno cadastrado com sucesso       visible   6
   
    


Email já existe
   &{student}                        Create Dictionary      name=Joao Silva     email=joao@hotmail.com   age=33    weight=84    feet_tall=1.65 
   Insert student                    ${student} 
   Create student                    ${student}
   Wait For Elements State           text=Email já existe no sistema.      visible   6


Todos os campos devem ser obrigatórios
    &{student}                        Create Dictionary      name=${EMPTY}     email=${EMPTY}    age=${EMPTY}      weight=${EMPTY}     feet_tall=${EMPTY}  
    Create student                    ${student}
    @{waitAlerts}   Set Variable     Nome é obrigatório    O e-mail é obrigatório   idade é obrigatória    o peso é obrigatório     a Altura é obrigatória   
    FOR   ${alert}   IN    @{waitAlerts}
          Wait For Elements State   text=${alert}   visible
    END

 

   
    

***Settings***
Documentation       Cadastro de Aluno
Resource            ${EXECDIR}/resources/base.robot    #importação de resources
Test Setup           Open Browser
Test Teardown        Close Browser



**Test Cases**
Cadastrar Estudante
    &{studentante}                        Create Dictionary      name=Leidiane Soares     email=leidiane5499@hotmail.com    age=33    weight=84    feet_tall=1.65 
    Remove student                    ${studentante.email}
    Create student                    ${studentante}
    #${age}    Get Attribute           css=input[type=age]     type        #verificar se o campo é numérico
    #Log To Console    ${age}
    #Should be Equal   ${age}           number    #validando se o campo é numérico mesmo
    Wait For Elements State           text=Aluno cadastrado com sucesso       visible   6
   
 
Email já existe   #regra de negócio
   &{student}                        Create Dictionary      name=Joao Silva     email=joao@hotmail.com   age=33    weight=75    feet_tall=1.85 
   Insert student                    ${student} 
   Create student                    ${student}
   Wait For Elements State           text=Email já existe no sistema.      visible   6


Todos os campos devem ser obrigatórios   #regra de negócio
    &{student}                        Create Dictionary      name=${EMPTY}     email=${EMPTY}    age=${EMPTY}      weight=${EMPTY}     feet_tall=${EMPTY}  
    Create student                    ${student}  
    @{waitAlerts}   Set Variable     Nome é obrigatório    O e-mail é obrigatório   idade é obrigatória    o peso é obrigatório     a Altura é obrigatória   
    FOR   ${alert}   IN    @{waitAlerts}
          Wait For Elements State   text=${alert}   visible
    END

 
Validação menor de idade
    &{student}                        Create Dictionary      name=Thiago de Jesus     email=thiago@hotmail.com    age=13    weight=80    feet_tall=1.78 
    Remove student                    ${student.email}
    Create student                    ${student}
    #${age}    Get Attribute           css=input[type=age]     type        #verificar se o campo é numérico
    #Log To Console    ${age}
    #Should be Equal   ${age}           number    #validando se o campo é numérico mesmo
    Wait For Elements State           text=A idade deve ser maior ou igual 14 anos       visible   6
     
    
Remover Aluno cadastrado
    &{student}                        Create Dictionary      name=Robert Pattison    email=robP@hotmail.com    age=29    weight=80    feet_tall=1.78 
    Insert student                    ${student} 
    Log To Console                    ${student} 
    Login With                        admin@bodytest.com     pwd123 
    Get Text                          css=aside strong       should be        Administrador
    Click                             css=a[href="/alunos"]
    Wait For Elements State           css=h1 >> text= Gestão de Alunos        visible   6
    Click                             //*[@id="tbody"]//td[text()='robP@hotmail.com']/..//span[text()=' Apagar']
    Wait For Elements State           //h2[text()='Você está certo disso?']   visible   6
    Click                             //button[text()='SIM, pode apagar!']
    Wait For Elements State           text=Aluno removido com sucesso.        visible   6


Inserir varios aLunos de uma vez pelo backend
  ${file}=                               Get File               ${EXECDIR}/resources/massa/students-search.json
  ${jsonObject}                          Evaluate               json.loads($file)    json
  #Log To Console                         ${jsonObject['students']} 
  FOR   ${item}   IN       @{jsonObject['students']} 
         Insert Student     ${item}
  END     


Update Aluno
    ${file}=                               Get File               ${EXECDIR}/resources/massa/students-update.json
    ${jsonObject}                          Evaluate               json.loads($file)    json
    #Log To Console                        ${jsonObject['students']} 
    ${anitta}                              Set Variable        ${jsonObject['before']}    
    ${madonna}                             Set Variable        ${jsonObject['after']}  
    Insert Student                        ${anitta}   
    Login With                            admin@bodytest.com     pwd123 
    Get Text                              css=aside strong       should be        Administrador
    Click                                 css=a[href="/alunos"]
    Wait For Elements State               css=h1 >> text= Gestão de Alunos        visible   6
    # Search Student By name                
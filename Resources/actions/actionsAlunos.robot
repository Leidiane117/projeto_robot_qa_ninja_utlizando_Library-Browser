**Settings**
Documentation     Ações da página de cadastro de Aluno
Resource          ../base.robot




**Keywords**
Create student
    [Arguments]                        ${student}   
    Login With                         admin@bodytest.com     pwd123 
    Get Text                           css=aside strong       should be        Administrador
    Click                              css=a[href="/alunos"]
    Wait For Elements State            css=h1 >> text= Gestão de Alunos        visible   6
    Click                              css=a[href="/alunos/new"]
    Wait For Elements State            css=h1 >> text= Novo aluno              visible   6
    Fill Text                          css=input[name=name]                    ${student.name}
    Fill Text                          css=input[name=email]                   ${student.email}
    Fill Text                          css=input[name=age]                     ${student.age}
    Fill Text                          css=input[name=weight]                  ${student.weight}
    Fill Text                          css=input[name=feet_tall]               ${student.feet_tall}
    Submit student form    
    
        
     
Submit student form
    Click                              css=button[type=submit]       
**Settings**
Documentation      Ações da página de login
Resource           ../base.robot




**Keywords**
    
Login With
    [Arguments]    ${email}     ${senha}
    Fill Text                          css=input[name=email]       ${email}          #admin@bodytest.com
    Fill Text                          css=input[name=password]    ${senha}          #pwd123 
    Click                              text=Entrar   
  


**Settings**
Documentation      Ações da página de login
Resource           ../base.robot




**Keywords**
Go To Login
    Go To                    https://body-test-web-leidiane.herokuapp.com/ 

Login With
    [Arguments]    ${email}     ${senha}
    Wait For Elements State            //body/div[@id='root']/div[1]/div[1]/div[1]/img[1]    visible    timeout=30 s   
    Fill Text                          css=input[name=email]       ${email}          #admin@bodytest.com
    Fill Text                          css=input[name=password]    ${senha}          #pwd123 
    Click                              text=Entrar   
  


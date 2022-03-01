***Settings***
Documentation      Funcionalidade: Atividades do menu login
Resource            ../resources/base.robot
Suite Setup          Open Browser
Test Setup           Go To Login 
Test Teardown        Take Screenshot

***Test Cases***
Login do Administrador
  Login With                         admin@bodytest.com          pwd123 
  Get Text                           css=aside strong            should be        Administrador
  Take Screenshot
  [Teardown]                         LocalStorage Clear          #gancho para apagar sessão após o test case

Login com Senha Incorreta
  Login With                         admin@bodytest.com        pwd1234 
  Take Screenshot
  Wait For Elements State            css=.Toastify__toast-container >> text=Usuário e/ou senha inválidos.     visible    10   #(combinando elementos)
  

Login com Email Inválido
  Login With                         admin&bodytest.com         pwd123 
  Take Screenshot
  Wait For Elements State            css=form span >> text=Informe um e-mail válido      visible    10  

Senha não Informada
  Login With                         admin&bodytest.com       ${EMPTY} 
  Take Screenshot
  Wait For Elements State            css=form span >> text=A senha é obrigatória      visible    10




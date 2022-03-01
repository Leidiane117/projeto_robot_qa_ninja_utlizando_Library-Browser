***Settings***
Documentation      Funcionalidade: Atividades do menu login
Resource            ../resources/base.robot
Suite Setup          Abrir Navegador
Test Teardown        Take Screenshot

***Test Cases***
Login do Administrador
  Go To Login
  Login With                         admin@bodytest.com          pwd123 
  Get Text                           css=aside strong            should be        Administrador
  Take Screenshot
  [Teardown]                         LocalStorage Clear          #gancho para apagar sessão após o test case

Login com Senha Incorreta
  Go To Login
  Login With                         admin@bodytest.com        pwd1234 
  Take Screenshot
  Wait For Elements State            css=.Toastify__toast-container >> text=Usuário e/ou senha inválidos.     visible    10   #(combinando elementos)
  

Login com Email Inválido
  Go To Login
  Login With                         admin&bodytest.com         pwd123 
  Take Screenshot
  Wait For Elements State            css=form span >> text=Informe um e-mail válido      visible    10  

Senha não Informada
  Go To Login
  Login With                         admin&bodytest.com       ${EMPTY} 
  Take Screenshot
  Wait For Elements State            css=form span >> text=A senha é obrigatória      visible    10




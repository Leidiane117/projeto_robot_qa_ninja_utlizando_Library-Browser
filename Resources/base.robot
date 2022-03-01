***Settings***
Documentation    Arquivo base 
Resource         actions/actionsLogin.robot
Library          Browser
Library          DateTime
Library          Collections



***Variables***


***Keywords***
Abrir Navegador
   New Browser               chromium      false   #(headless)
   New Page                  about:blank  

Fechar Navegador
   Close Browser
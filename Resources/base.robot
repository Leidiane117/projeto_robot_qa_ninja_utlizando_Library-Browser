***Settings***
Documentation    Arquivo base 
Resource         ../resources/actions/actionsAlunos.robot
Resource         ../resources/actions/actionsLogin.robot
Library          Browser
Library          DateTime
Library          Collections
Library          libs/DeloreanLibrary.py



***Variables***


***Keywords***
Open Browser
   New Browser               chromium      false   #(headless)
   New Page                  about:blank  

Go To Login 
   Go To                    https://body-test-web-leidiane.herokuapp.com/
   


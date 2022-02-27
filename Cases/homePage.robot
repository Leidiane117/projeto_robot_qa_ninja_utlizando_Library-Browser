***Settings***
Documentation    Funcionalidade: Atividades do menu home page
Resource         ${EXECDIR}/Resources/main.resource
Test Setup       Abrir Navegador




***Test Cases***
Abrir a url
  [Tags]   01
  Wait Until Element is Visible        //img[@src="/assets/images/logo-degrade.png"]
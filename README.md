
# Automacao de Teste Web utilizando Robot Framework com Library Browser  <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-robot-artificial-intelligence-kiranshastry-solid-kiranshastry.png"/>
Projeto desenvolvido com proposito de ser um modelo base para teste para interface web 

## PRÉ-REQUISITOS
Requisitos de software 

*   Python 3
*   Node JS(LTS)
*   Navegador Web (Chrome)
*   Visual Studio Code
*   Plugins do Visual Studio Code
    * Robot Framework Intellisense
    * Python for VScode
    
    
## ESTRUTURA DO PROJETO

| Diretório                  	   | Finalidade       	                                                                                       | 
|--------------------------------|---------------------------------------------------------------------------------------------------------- |
| bodyTest\      	              | Local onde fica os arquivos de deploy do projeto           |
| cases\                        | Local onde fica todas as suítes de testes                  |
| logs\                         | Local onde fica os logs da automação                       |
| resources\actions\            | Local responsável por todas as ações (keywords) das suítes de teste, separadas por page Objects                 	|
| resources\libs\    		     | Local onde fica os arquivos de criação de blibliotecas em python                      	|
| resources\data-generation\	  | Local onde fica os arquivos Json para massa de teste                              		|
| resources\main.robot       	  | Arquivo base para inserção de bibliotecas para serem utilizadas em todo projeto e demais configurações |


## FRAMEWORKS UTILIZADOS

* Robot Framework -  Responsável pela especificação executável de cenários
* Library Browser-   Responsável pela interação com páginas web


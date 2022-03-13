
# Automacao de Teste para Web utilizando Robot Framewor com Library Browser

Projeto desenvolvido com proposito de ser um modelo base para teste para interface web ![image](https://user-images.githubusercontent.com/56703127/158044780-a6e8fc20-7bac-426a-bfb3-d86e71bd1272.png)


## PRÉ-REQUISITOS

Requisitos de software e hardware necessários para executar este projeto de automação

*   Python 3
*   Node JS(LTS)
*   Navegador Web (Chrome)
*   Visual Studio Code
*   Plugins do Visual Studio Code
    * Robot Framework Intellisense
    * Python for VScode
    
    
## ESTRUTURA DO PROJETO

| Diretório e Arquivos                   	| Finalidade       	                                                                                        | 
|----------------------------------------------------------------------------------------------------------------------------------------------------- |
| bodyTest\                 	              | Local onde fica os arquivos de deploy do projeto
| cases\         	                          | Local onde fica todas as suítes de testes
| logs\         	                          | Local onde fica os logs da automação
| resources\actions\    			              | Local responsável por todas as ações (keywords) das suítes de teste, separadas por page Objects                 	|
| resources\libs\    						            | Local onde fica os arquivos de criação de blibliotecas em python                      	|
| resources\data-generation\    						| Local onde fica os arquivos Json para massa de teste                              		|
| resources\main.robot                   	  | Arquivo base para inserção de bibliotecas para serem utilizadas em todo projeto e demais configurações                                	|
         


## FRAMEWORKS UTILIZADOS

* Robot Framework -  Responsável pela especificação executável de cenários
* Library Browser-   Responsável pela interação com páginas web


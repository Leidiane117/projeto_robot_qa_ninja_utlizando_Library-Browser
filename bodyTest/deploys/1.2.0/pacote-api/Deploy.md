## Procedimentos para deploy da nova versão

1) Remover a Pasta Dist na pasta API (onde foi feito o Deploy na Heroku)
2) Copiar a nova Dist
3) Entrar na pasta API pelo terminal
4) Adicionar, comitar e publicar as alterações
5) Dropar o banco de dados
6) Executar a migração => heroku run:detached sequelize db:migrate 
7) Executar a semente => heroku run:detached sequelize db:seed:all
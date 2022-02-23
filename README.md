# Boca API
> API de conexão com a ferramenta para competições de programação BOCA

Alunos:
* Matheus Lenke
* Rogério Medeiros

## Dependências
Para rodar este projeto, temos as seguintes dependências obrigatórias para rodar o projeto:
* [Yarn](https://yarnpkg.com/)  (Ou utilizar o [npm](https://www.npmjs.com/) do próprio node)
* [Node.js](https://nodejs.org/en/) -> Versão LTS `16.14.0`
* [Docker](https://www.docker.com/)
* [Typescript](https://www.typescriptlang.org/)

foi utilizado `Typescript` como linguagem principal e o `Visual Studio Code` como editor de código. É necessário instalar o `Node.js`, e recomenda-se a última versão LTS `16.14.0`.
Além disso, para gerenciamento de dependências, pode-se utilizar o `npm`, porém devido às suas vantagens, recomenda-se a utilização do `yarn`.
Também foi utilizado a ferramenta `postman` para testagem das rotas, além do `docker` para utilização de containers, isolando a API, os serviços do BOCA e o banco de dados.

Algumas ferramentas adicionais recomendadas:
### Links
* [Visual Studio Code](https://code.visualstudio.com/)
* [Postman](https://www.postman.com/)

## Instalação

Instalação de dependências
```sh
  yarn
  # ou
  npm install
```

Para subir a aplicação com docker, foram criados scripts personalizados no arquivo `package.json`. Para rodar qualquer comando com o npm, basta substituir `yarn` por `npm run`

```sh
  yarn docker:up # Sobe todos os containers, incluindo os dependentes do Boca

  yarn docker:down # Desce todos os containers

  yarn docker:apilogs # Visualiza os logs da API

  yarn docker:postgreslogs # Visualiza os logs do Banco de dados Postgres
```

Para realizar as migrations da aplicação, com os containers rodando:

```sh
  yarn typeorm migration:run # Executa todas as migrations pendentes

  yarn typeorm migration:revert # Reverte a última migration executada

  yarn typeorm migration:create -n nome-da-migration # Cria uma nova migration
```
Os arquivos especificando as migrations se encontram na pasta `src/database/migrations`
## Setup do Postman
> ⚠️ Atenção, antes de testar tenha certeza de que você rodou todas as migrations da aplicação corretamente, caso contrário, as requisições podem não funcionar corretamente


 Os exemplos de uso da aplicação se encontram no Postman, cujo arquivo de definição da API pode ser encontrado na pasta `apidocs`. Ao importar, é possível ver a pasta `Boca API`, com todas as entidades listadas e suas respectivas requisições. 
 
 Para configurar, é necessário criar uma variável de ambiente de desenvolvimento contendo a URL da aplicação em seu workspace. A variável se chama `base_url` e o valor padrão rodando em ambiente de desenvolvimento seria `http://localhost:3333`, apontando para a API Node.js.

 Cada requisição possui suas particularidades feitas com base na especificação do trabalho, podendo possuir pequenas modificações. Para modificar os dados por exemplo de um método create, basta modificar o JSON do Body da requisição



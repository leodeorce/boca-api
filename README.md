# Boca API

> API de conexão com a ferramenta para competições de programação BOCA

Alunos:

- Matheus Lenke
- Rogério Medeiros

## Dependências

Para rodar este projeto, temos as seguintes dependências obrigatórias para rodar o projeto:

- [Yarn](https://yarnpkg.com/) (Ou utilizar o [npm](https://www.npmjs.com/) do próprio node)
- [Node.js](https://nodejs.org/en/) -> Versão LTS `16.14.0`
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)

foi utilizado `TypeScript` como linguagem principal e o `Visual Studio Code` como editor de código. É necessário instalar o `Node.js`, e recomenda-se a última versão LTS `16.14.0`.
Além disso, para gerenciamento de dependências, pode-se utilizar o `npm`, porém devido às suas vantagens, recomenda-se a utilização do `yarn`.
Também foi utilizado a ferramenta `postman` para testagem das rotas, além do `docker` para utilização de containers, isolando a API, os serviços do BOCA e o banco de dados.

Algumas ferramentas adicionais recomendadas:

### Links

- [Visual Studio Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)

### Variáveis de ambiente

Para rodar o projeto, é necessário configurar as variáveis de ambiente neste projeto. Dentro do arquivo `.env`, você precisa atualizar as seguintes variáveis:

- `BOCA_POSTGRES_DOCKER_NAME`: O nome dado para o container postgres do banco de dados do Boca

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

## Decisões de projeto

### Estrutura de arquivos

- O código da aplicação se encontra na pasta `src`.
- Na pasta `database`, temos todas as configurações relacionadas ao banco de dados da aplicação
- Na pasta `entities`, temos as entidades da nossa aplicação, replicando as existentes em nosso banco de dados
- Na pasta `repositories`, temos as classes responsáveis por realizar modificações das entidades no banco de dados, e suas interfaces de implementação
- Na pasta `routes`, temos as rotas da nossa aplicação
- Na pasta `shared`, temos os arquivos compartilhados pela aplicação toda. Dentro da pasta `container`, temos o arquivo responsável por registrar uma instância única de cada repository da nossa aplicação (Padrão singleton)
- Na pasta `useCases`, temos os controladores e casos de uso de cada entidade da aplicação, contendo as regras de negócio do sistema
- No arquivo `.env`, temos as variáveis de ambiente

### Estrutura do banco de dados

- Foi criado uma tabela `workingtable`, que permite organizar listas de problmas (exercícios).
- Foi adicionado à tabela `problemtable` uma coluna `working_id`, que indica a qual working aquele problema pertence
- Foi criado uma tabela `userworkingtable`, que permite definir para cada usuário listas de problemas
- Foi criada uma tabela `problemlanguagetable`, que permite definir linguagens de programação para cada problema específico, podendo em um mesmo contest, problemas diferentes demandarem linguagens diferentes

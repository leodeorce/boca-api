# BOCA API

O BOCA API é uma ferramenta de conexão com sistema de apoio à competições de programação BOCA Online Contest Administrator.


# Dependências

O BOCA API faz uso das seguintes tecnologias/bibliotecas:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [winston](https://github.com/winstonjs/winston)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [class-validator](https://github.com/typestack/class-validator)
- [Express](https://expressjs.com/)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [dotenv](https://www.npmjs.com/package/dotenv)

Embora os conjuntos de testes desenvolvidos tenham sido a principal forma de testagem ao longo do desenvolvimento, em algumas ocasiões optou-se pelo uso da ferramenta [Postman](https://www.postman.com/) para envio de requisições HTTP à API.


# Instalação e execução

A API pode ser executada em um contêiner [Docker](https://www.docker.com/) criado a partir de seu `Dockerfile` presente na raiz do repositório, ou de forma tradicional com o uso das ferramentas `Node.js` e `Yarn`.


## Ambiente conteinerizado

Uma vez instalada a ferramenta `Docker` no seu sistema, abra um terminal na raiz do projeto e execute os comandos a seguir.

Para criar a imagem do contêiner:

```sh
docker build -t boca-api .
```

Será necessário configurar variáveis de ambiente para o correto funcionamento da API. Para subir o contêiner criado com as variáveis de ambiente configuradas (substitua os valores de acordo com a sua configuração):

```sh
docker run -e DB_HOST=localhost \
           -e DB_NAME=bocadb \
           -e DB_PASSWORD=dAm0HAiC \
           -e DB_PORT=5432 \
           -e DB_SUPER_PASSWORD=dAm0HAiC \
           -e DB_SUPER_USER=bocauser \
           -e DB_USER=bocauser \
           -e LISTEN_PORT=3000 \
           -e TOKEN_EXPIRES_IN_SECONDS=1800 \
           -e PASSWORD_SALT=v512nj18986j8t9u1puqa2p9mh \
           -p 3000:3000 \
           --name boca-api \
           boca-api
```

Com o comando acima, a ferramenta é iniciada e busca pelo banco de dados do BOCA no endereço `DB_HOST` e na porta `DB_PORT`.

Caso tenha interesse em subir o banco de dados `PostgreSQL` ou o [boca-docker](https://github.com/joaofazolo/boca-docker) junto à API, utilize os arquivos `Docker Compose` presentes na raiz repositório:

```sh
# Variáveis configuradas para desenvolvimento
docker compose -f docker-compose-dev.yml up --build -d
# Ou
yarn docker:up

# Variáveis configuradas para execução dos testes
docker compose -f docker-compose-test.yml up --build -d
# Ou
yarn test:docker:up

# Sobe o BOCA API e o boca-docker juntos
docker compose -f docker-compose-validation.yml up --build -d
```

Os comandos `yarn docker:up` e `yarn test:docker:up` são scripts definidos no arquivo `package.json`. Para executá-los, é necessário que a ferramenta `Yarn` esteja instalada.

Para descer os contêineres, basta executar:
```sh
docker compose -f docker-compose-dev.yml down
# Opcionalmente, adicione o argumento -v para apagar os dados do banco
# Ou
yarn docker:down # Não contém -v

docker compose -f docker-compose-test.yml down
# Opcionalmente, adicione o argumento -v para apagar os dados do banco
# Ou
yarn test:docker:down # Contém -v

docker compose -f docker-compose-validation.yml down
# Opcionalmente, adicione o argumento -v para apagar os dados do banco
```


## Ambiente tradicional

Uma vez instaladas as ferramentas `Yarn` e `Node.js`, abra um terminal na raiz do projeto e execute:

```sh
yarn install

yarn dev
# ou
yarn test:dev
```

Os scripts `yarn dev` e `yarn test:dev` acima buscam variáveis de ambiente de dois arquivos que contém suas definições, respectivamente: `.env.dev` e `.env.test`.


# Estrutura de arquivos

- O código da aplicação se encontra na pasta `src`:
  - Na pasta `database`, estão todas as configurações relacionadas ao banco de dados da aplicação;
  - Na pasta `entities`, estão as entidades da nossa aplicação, mapeando as existentes no banco de dados do BOCA através de ORM com a biblioteca TypeORM;
  - Na pasta `repositories`, estão as classes responsáveis pela comunicação com o banco de dados, bem como as interfaces que elas implementam;
  - Na pasta `routes`, estão as rotas da aplicação;
  - Na pasta `shared`, estão os arquivos de definições (tipos enumerados e algumas interfaces), arquivos de configuração do contêiner de injeção de dependências `tsyringe`, e implementações de classes que realizam validação de dados;
  - Na pasta `useCases`, estão os controladores e casos de uso de cada entidade da aplicação, contendo as regras de negócio do sistema;
  - Na pasta `logging`, estão a interface e implementação da estrutura de logging do sistema;
  - Na pasta `errors`, estão as definições de erros esperados pela API.
- Os conjuntos de testes se encontram na pasta `test`:
  - Na pasta `api`, estão os testes de API;
  - Na pasta `useCases`, estão os testes de casos de uso;
  - Na pasta `entities`, estão os objetos utilizados para requisições HTTP nos conjuntos de testes;
  - Na pasta `files` estão arquivos para problemas e submissões usados em requisições dos conjuntos de testes;
  - Na pasta `utils` estão definições e scripts úteis e/ou necessários para a execução dos conjuntos de testes.


# Autores

O desenvolvimento do BOCA API iniciou com Mateus Lenke e Rogério Medeiros na disciplina de Banco de Dados do curso de Ciência da Computação na Universidade Federal do Espírito Santo (Ufes) no semestre letivo 2021/2 e continuou no Trabalho de Conclusão de Curso de Leonardo Deorce no semestre letivo 2022/2 do mesmo curso e universidade.

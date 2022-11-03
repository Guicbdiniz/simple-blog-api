# simple-blog-api

Simple GraphQL Blog API.

## About

- Developed using [Typescript](https://www.typescriptlang.org/) as main language.
- Tested using [Jest](https://jestjs.io/pt-BR/) and [ts-jest](https://www.npmjs.com/package/ts-jest).
- [PostgreSQL](https://www.postgresql.org/) is used to store data and [Prisma](https://www.prisma.io/) is used to map data to objects.
- GraphQL schemas are defined and generated using [Pothos](https://pothos-graphql.dev/).
- [GraphQL Yoga](https://www.the-guild.dev/graphql/yoga-server) is used as server.

## Usage

After cloning the repo, download any necessary packages:

```shell
npm i
```

Create a `.env` file with the necessary variables:
- `DATABASE_URL`: Postgre database URL.

Reset and seed the database:

```shell
npx prisma migrate reset
```

Start the GraphQL server (in dev mode):

```shell
npm run dev
```

Build the application into `dist` folder:

```shell
npm run build
```

## TODO

- [ ] Create initial schema with Posts and Users.  
- [ ] Add authentication system.  
- [ ] Deploy to AWS (or any other cloud).  
- [ ] Integrate with the front-end application. 
- [ ] Create deployment workflow after merge to master. 
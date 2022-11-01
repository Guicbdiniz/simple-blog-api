import { createServer } from "@graphql-yoga/node";

const port = Number(process.env.API_PORT) || 4000;

const server = createServer({
  port,
});

server.start().then(() => {
  console.log(`🚀 GraphQL Server ready on port ${port}`);
});

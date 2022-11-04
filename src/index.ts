import { createServer } from "@graphql-yoga/node";
import { prisma } from "./db";
import { APISchemaBuilder } from "./schema";

const schemaBuilder = new APISchemaBuilder(prisma);

const port = Number(process.env.API_PORT) || 4000;

const server = createServer({
  port,
  schema: schemaBuilder.getSchema(),
});

server.start().then(() => {
  console.log(`🚀 GraphQL Server ready on port ${port}`);
});

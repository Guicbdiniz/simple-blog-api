import { PrismaClient } from "@prisma/client";
import { GraphQLSchema } from "graphql";
import { createSchemaBuilder } from "./builder";
import { addAuthorToSchemaBuilder } from "./models/author";
import { addPostToSchemaBuilder } from "./models/post";

export class APISchemaBuilder {
  private schema: GraphQLSchema;

  constructor(db: PrismaClient) {
    const builder = createSchemaBuilder();
    addAuthorToSchemaBuilder(builder, db);
    addPostToSchemaBuilder(builder);
    this.schema = builder.toSchema();
  }

  public getSchema(): GraphQLSchema {
    return this.schema;
  }
}
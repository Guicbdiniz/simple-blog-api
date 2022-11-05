import { PrismaClient } from "@prisma/client";
import { GraphQLSchema } from "graphql";
import { createSchemaBuilder } from "./builder";
import { addAuthorToSchemaBuilder } from "./models/author";
import { addPostToSchemaBuilder } from "./models/post";

/**
 * Wrapper to Pothos schema builder.
 *
 * Used to construct APIs with same schema, but different data sources.
 */
export class APISchemaBuilder {
  private schema: GraphQLSchema;

  /**
   * Create new Wrapper.
   *
   * @param db PrismaClient where the data will be fetched.
   *
   * A mocked data source can be used for testing purposes.
   */
  constructor(db: PrismaClient) {
    const builder = createSchemaBuilder();
    addAuthorToSchemaBuilder(builder, db);
    addPostToSchemaBuilder(builder, db);
    this.schema = builder.toSchema();
  }

  public getSchema(): GraphQLSchema {
    return this.schema;
  }
}

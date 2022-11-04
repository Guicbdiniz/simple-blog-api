import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "./db";

export type APIPothosSchemaBuilder = PothosSchemaTypes.SchemaBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<{
    Scalars: {
      Date: {
        Input: Date;
        Output: Date;
      };
    };
    PrismaTypes: PrismaTypes;
  }>
>;

export function createSchemaBuilder() {
  const builder = new SchemaBuilder<{
    Scalars: {
      Date: { Input: Date; Output: Date };
    };
    PrismaTypes: PrismaTypes;
  }>({
    plugins: [PrismaPlugin],
    prisma: {
      client: prisma,
    },
  });

  builder.addScalarType("Date", DateResolver, {});

  builder.queryType({});

  return builder;
}

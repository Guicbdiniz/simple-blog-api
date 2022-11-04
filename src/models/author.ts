import { PrismaClient } from "@prisma/client";
import { APIPothosSchemaBuilder } from "../builder";

export function addAuthorToSchemaBuilder(
  builder: APIPothosSchemaBuilder,
  db: PrismaClient
) {
  builder.prismaObject("Author", {
    fields: (fieldBuilder) => ({
      id: fieldBuilder.exposeID("id"),
      name: fieldBuilder.exposeString("name"),
      posts: fieldBuilder.relation("posts"),
    }),
  });

  builder.queryField("authors", (queryFieldBuilder) =>
    queryFieldBuilder.prismaField({
      type: ["Author"],
      resolve: async (query, _root, _args, _ctx, _info) => {
        return db.author.findMany({ ...query });
      },
    })
  );
}

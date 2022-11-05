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

  builder.queryField("author", (queryFieldBuilder) =>
    queryFieldBuilder.prismaField({
      type: "Author",
      nullable: true,
      args: {
        id: queryFieldBuilder.arg({
          type: "Int",
          required: true,
          description: "Id arg",
        }),
      },
      resolve: async (query, _root, args, _ctx, _info) => {
        return db.author.findUnique({
          ...query,
          where: {
            id: args.id,
          },
        });
      },
    })
  );

  builder.mutationField("createAuthor", (mutationFieldBuilder) =>
    mutationFieldBuilder.prismaField({
      type: "Author",
      args: {
        name: mutationFieldBuilder.arg({
          type: "String",
          required: true,
          description: "Authors name",
        }),
      },
      resolve: async (query, _root, args) => {
        return db.author.create({
          ...query,
          data: {
            name: args.name,
          },
        });
      },
    })
  );

  builder.mutationField("deleteAuthor", (mutationFieldBuilder) =>
    mutationFieldBuilder.prismaField({
      type: "Author",
      args: {
        id: mutationFieldBuilder.arg({
          type: "Int",
          required: true,
          description: "Author Id",
        }),
      },
      resolve: (query, _root, args) => {
        return db.author.delete({
          ...query,
          where: {
            id: args.id,
          },
        });
      },
    })
  );

  builder.mutationField("updateAuthor", (mutationFieldBuilder) =>
    mutationFieldBuilder.prismaField({
      type: "Author",
      args: {
        id: mutationFieldBuilder.arg({
          type: "Int",
          required: true,
          description: "Author Id",
        }),
        name: mutationFieldBuilder.arg({
          type: "String",
          required: false,
          description: "Authors name",
        }),
      },
      resolve: (query, _root, args) => {
        return db.author.update({
          ...query,
          where: {
            id: args.id,
          },
          data: {
            name: args.name || undefined,
          },
        });
      },
    })
  );
}

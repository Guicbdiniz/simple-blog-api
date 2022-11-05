import { PrismaClient } from "@prisma/client";
import { APIPothosSchemaBuilder } from "../builder";

export function addPostToSchemaBuilder(
  builder: APIPothosSchemaBuilder,
  db: PrismaClient
) {
  builder.prismaObject("Post", {
    fields: (fieldBuilder) => ({
      id: fieldBuilder.exposeID("id"),
      body: fieldBuilder.exposeString("body"),
      title: fieldBuilder.exposeString("title"),
      createdAt: fieldBuilder.expose("createdAt", {
        type: "Date",
      }),
    }),
  });

  builder.queryField("posts", (queryFieldBuilder) =>
    queryFieldBuilder.prismaField({
      type: ["Post"],
      resolve: async (query) => {
        return db.post.findMany({ ...query });
      },
    })
  );

  builder.queryField("post", (queryFieldBuilder) =>
    queryFieldBuilder.prismaField({
      type: "Post",
      nullable: true,
      args: {
        id: queryFieldBuilder.arg({
          type: "Int",
          required: true,
          description: "Id arg",
        }),
      },
      resolve: async (query, _root, args) => {
        return db.post.findFirst({
          ...query,
          where: {
            id: args.id,
          },
        });
      },
    })
  );
}

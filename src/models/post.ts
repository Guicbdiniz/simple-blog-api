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

  builder.mutationField("createPost", (mutationFieldBuilder) =>
    mutationFieldBuilder.prismaField({
      type: "Post",
      args: {
        body: mutationFieldBuilder.arg({
          type: "String",
          required: true,
        }),
        title: mutationFieldBuilder.arg({
          type: "String",
          required: true,
        }),
        authorId: mutationFieldBuilder.arg({
          type: "Int",
          required: true,
        }),
      },
      resolve: async (query, _root, args, _info) => {
        return db.post.create({
          ...query,
          data: {
            body: args.body,
            title: args.title,
            authorId: args.authorId,
          },
        });
      },
    })
  );

  builder.mutationField("deletePost", (mutationFieldBuilder) =>
    mutationFieldBuilder.prismaField({
      type: "Post",
      args: {
        id: mutationFieldBuilder.arg({
          type: "Int",
          required: true,
          description: "Post ID",
        }),
      },
      resolve: (query, _root, args) => {
        return db.post.delete({
          ...query,
          where: {
            id: args.id,
          },
        });
      },
    })
  );

  builder.mutationField("updatePost", (mutationFieldBuilder) =>
    mutationFieldBuilder.prismaField({
      type: "Post",
      args: {
        title: mutationFieldBuilder.arg({
          type: "String",
          required: false,
        }),
        body: mutationFieldBuilder.arg({
          type: "String",
          required: false,
        }),
        authorId: mutationFieldBuilder.arg({
          type: "Int",
          required: false,
        }),
        id: mutationFieldBuilder.arg({
          type: "Int",
          required: true,
        }),
      },
      resolve: async (query, _root, args) => {
        return db.post.update({
          ...query,
          data: {
            body: args.body || undefined,
            title: args.title || undefined,
            authorId: args.authorId || undefined,
          },
          where: {
            id: args.id,
          },
        });
      },
    })
  );
}

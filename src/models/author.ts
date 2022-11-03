import { builder } from "../builder";

builder.prismaObject("Author", {
  fields: (fieldBuilder) => ({
    id: fieldBuilder.exposeID("id"),
    name: fieldBuilder.exposeString("name"),
    posts: fieldBuilder.relation("posts"),
  }),
});

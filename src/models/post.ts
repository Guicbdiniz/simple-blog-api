import { builder } from "../builder";

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

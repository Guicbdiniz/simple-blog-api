import { createServer } from "@graphql-yoga/node";
import { schema } from "../../testing/schema";

const yoga = createServer({
  schema: schema,
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.author.create({
    data: {
      name: "Admin",
      posts: {
        create: [
          {
            title: "First Post",
            body: "This is my first post. I am the Admin",
          },
          {
            title: "Second Post",
            body: "This is my second post. I am the Admin",
          },
        ],
      },
    },
  });
}

main()
  .then(() => {
    console.log("Data seeded...");
  })
  .catch((e) => {
    console.log("Error captured while seeding data", e);
  });

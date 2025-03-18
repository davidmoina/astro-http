import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      isActive: true,
    },
    {
      id: 2,
      name: "David",
      age: 27,
      isActive: true,
    },
    {
      id: 3,
      name: "John",
      age: 22,
      isActive: true,
    },
    {
      id: 4,
      name: "Carlos",
      age: 25,
      isActive: true,
    },
    {
      id: 5,
      name: "Fernando",
      age: 37,
      isActive: true,
    },
  ]);

  const posts = await getCollection("blog");

  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );
}

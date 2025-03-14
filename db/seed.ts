import { Clients, db } from "astro:db";

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
}

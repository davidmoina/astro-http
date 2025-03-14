import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clients = await db.select().from(Clients);

  return new Response(JSON.stringify(clients), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();

    const [client] = await db.insert(Clients).values(body).returning();

    return new Response(JSON.stringify(client), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
};

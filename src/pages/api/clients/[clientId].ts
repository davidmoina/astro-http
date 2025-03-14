import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";
import { eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.clientId);

  const [client] = await db.select().from(Clients).where(eq(Clients.id, id));

  if (!client) {
    return new Response(
      JSON.stringify({
        message: "Client not found",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      }
    );
  }

  return new Response(JSON.stringify(client), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const id = Number(params.clientId);

  const [client] = await db
    .update(Clients)
    .set(body)
    .where(eq(Clients.id, id))
    .returning();

  return new Response(JSON.stringify(client), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const id = Number(params.clientId);

  const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, id));

  if (rowsAffected === 0) {
    return new Response(
      JSON.stringify({
        message: "Client not found",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Client deleted",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    }
  );
};

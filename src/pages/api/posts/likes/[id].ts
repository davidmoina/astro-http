import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  const posts = await db.select().from(Posts).where(eq(Posts.id, id!));

  if (posts.length === 0) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(posts[0]), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;

  const { likes = 0 } = await request.json();

  const [post] = await db.select().from(Posts).where(eq(Posts.id, id!));

  if (!post) {
    return new Response(
      JSON.stringify({
        message: "Post not found",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      }
    );
  }

  await db
    .update(Posts)
    .set({ likes: post.likes + likes })
    .where(eq(Posts.id, id!));

  return new Response(
    JSON.stringify({
      message: "Likes updated",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    }
  );
};

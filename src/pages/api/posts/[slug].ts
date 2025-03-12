import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  const post = await getEntry("blog", slug!);

  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(post), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getStaticPaths: GetStaticPaths = () => {
  return [
    {
      params: {
        slug: "first-post",
      },
    },
  ];
};

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};

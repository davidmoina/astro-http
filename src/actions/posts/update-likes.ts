import { actions, defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "astro:schema";
import { error } from "node_modules/astro/dist/core/logger/core";

export const updatePostLikes = defineAction({
  input: z.object({
    postId: z.string(),
    likes: z.number(),
  }),
  handler: async ({ postId, likes }) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (!post) {
      const newPost = {
        id: postId,
        title: "Post not found",
        likes: 0,
      };

      await db.insert(Posts).values(newPost);

      return;
    }

    await db
      .update(Posts)
      .set({ likes: post.likes + likes })
      .where(eq(Posts.id, postId));
  },
});

import { getGreeting } from "./greetings/get-greeting.action";
import { getPostLikes } from "./posts/get-post-likes";
import { updatePostLikes } from "./posts/update-likes";

export const server = {
  getGreeting,
  getPostLikes,
  updatePostLikes,
};

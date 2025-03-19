import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const getGreeting = defineAction({
  input: z.object({
    name: z.string(),
    age: z.number(),
    isActive: z.boolean(),
  }),
  handler: async ({ age, isActive, name }) => {
    return `Hello, ${name}! You are ${age} years old and ${
      isActive ? "active" : "not active"
    }.`;
  },
});

import { z } from "zod";

export const TodoSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  createadAt: z.string()
})

export type Todo = z.infer<typeof TodoSchema>;
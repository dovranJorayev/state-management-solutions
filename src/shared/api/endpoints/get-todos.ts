import { z } from "zod";
import { httpClient } from "../api-client";
import { TodoSchema } from "../contracts";
import { HttpResponse, http } from "msw";

const GetTodosDataSchema = z.array(TodoSchema);

export type GetTodosData = z.infer<typeof GetTodosDataSchema>;

export const getTodos = async () => {
  const response = await httpClient("/todos");
  return GetTodosDataSchema.parse(response.data);
};

export const getTodosMock = http.get("/todos", () => {
  return HttpResponse.json<GetTodosData>([
    { id: 1, title: "First", createadAt: new Date().toISOString() },
  ]);
});

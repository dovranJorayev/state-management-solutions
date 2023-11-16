import { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../../shared/api/contracts";
import { getTodos } from "../../shared/api/endpoints/get-todos";

const TodosCtx = createContext<Todo[]>([]);
const TodosActionCtx = createContext<React.Dispatch<React.SetStateAction<Todo[]>>>(() => {});

const useTodos = () => useContext(TodosCtx);
const useSetTodos = () => useContext(TodosActionCtx);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodosActionCtx.Provider value={setTodos}>
      <TodosCtx.Provider value={todos}>{children}</TodosCtx.Provider>
    </TodosActionCtx.Provider>
  )
};

export const useGetTodos = () => {
  const todos = useTodos();
  const setTodos = useSetTodos();

  const {isLoading} = useQueryFetch({
    queryFn: () => getTodos(),
    onSuccess: (todos) => {
      setTodos(todos)
    }
  })

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, [setTodos]);

  return {
    isLoading,
    data: todos
  }
}

export const useAddTodo = () => {
  const setTodos = useSetTodos()

  const addHandler = (todo: Todo) => {
    setTodos((todos) => [...todos, todo]);
  }

  return [addHandler, ]
}

export const useQueryFetch = <D, >(options: {
  queryFn: () => Promise<D>,
  onSuccess?: (data: D) => void,
  onError?: (err: Error) => void
}) => {
  const [data, setData] = useState<D | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await options.queryFn();
        setData(data);
        options.onSuccess?.(data);
      } catch (err) {
        setError(err as Error);
        options.onError?.(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  return {data, error, isLoading}
  
}
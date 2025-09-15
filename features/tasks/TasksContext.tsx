import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { initialTasksState, tasksReducer } from "./tasksReducer";
import { TasksAction, TasksState } from "./TaskTypes";
import { loadTasks, saveTasks } from "./storage";

type TasksContextValue = {
  state: TasksState;
  dispatch: React.Dispatch<TasksAction>;
  addTask: (title: string, description?: string) => void;
  updateTask: (
    id: string,
    updates: { title?: string; description?: string }
  ) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);

  useEffect(() => {
    (async () => {
      const saved = await loadTasks();
      if (saved) dispatch({ type: "HYDRATE", state: saved });
    })();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      void saveTasks(state);
    }, 150);
    return () => clearTimeout(t);
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      addTask: (title: string, description?: string) =>
        dispatch({ type: "ADD", title, description }),
      updateTask: (
        id: string,
        updates: { title?: string; description?: string }
      ) => dispatch({ type: "UPDATE", id, updates }),
      toggleTask: (id: string) => dispatch({ type: "TOGGLE", id }),
      deleteTask: (id: string) => dispatch({ type: "DELETE", id }),
    }),
    [state]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}

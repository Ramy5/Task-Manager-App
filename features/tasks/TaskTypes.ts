export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
};

export type TasksState = {
  items: Task[];
};

export type AddTaskAction = {
  type: "ADD";
  title: string;
  description?: string;
};
export type ToggleTaskAction = { type: "TOGGLE"; id: string };
export type DeleteTaskAction = { type: "DELETE"; id: string };
export type UpdateTaskAction = {
  type: "UPDATE";
  id: string;
  updates: Partial<Pick<Task, "title" | "description">>;
};
export type HydrateAction = { type: "HYDRATE"; state: TasksState };

export type TasksAction =
  | AddTaskAction
  | ToggleTaskAction
  | DeleteTaskAction
  | UpdateTaskAction
  | HydrateAction;

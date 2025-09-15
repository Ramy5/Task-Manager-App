import { TasksAction, TasksState } from "./TaskTypes";

export const initialTasksState: TasksState = { items: [] };

const isValidTitle = (t: string) =>
  t.trim().length >= 2 && t.trim().length <= 60;

const isValidDescription = (d?: string) =>
  d == null ||
  d.trim().length === 0 ||
  (d.trim().length >= 2 && d.trim().length <= 160);

const newId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export function tasksReducer(
  state: TasksState,
  action: TasksAction
): TasksState {
  switch (action.type) {
    case "HYDRATE": {
      return action.state ?? state;
    }

    case "ADD": {
      const title = action.title.trim();
      const description = action.description?.trim();
      if (!isValidTitle(title) || !isValidDescription(description))
        return state;

      const newTask = {
        id: newId(),
        title,
        description,
        completed: false,
        createdAt: Date.now(),
      };
      return { items: [newTask, ...state.items] };
    }

    case "UPDATE": {
      const { id, updates } = action;
      const title = updates.title?.trim();
      const description = updates.description?.trim();

      if (title != null && !isValidTitle(title)) return state;
      if (updates.description !== undefined && !isValidDescription(description))
        return state;

      return {
        items: state.items.map((t) =>
          t.id === id
            ? {
                ...t,
                ...(title != null ? { title } : {}),
                ...(updates.description !== undefined ? { description } : {}),
              }
            : t
        ),
      };
    }

    case "TOGGLE": {
      return {
        items: state.items.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };
    }

    case "DELETE": {
      return { items: state.items.filter((t) => t.id !== action.id) };
    }

    default:
      return state;
  }
}

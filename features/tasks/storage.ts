import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TasksState } from "./TaskTypes";

const TASKS_KEY = "@tasks/v1";
const THEME_KEY = "@theme/v1";

export async function loadTasks(): Promise<TasksState | null> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return { items: parsed.items };
  } catch {
    return null;
  }
}

export async function saveTasks(state: TasksState) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(state));
  } catch {}
}

export async function loadTheme(): Promise<"light" | "dark" | null> {
  try {
    const v = await AsyncStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

export async function saveTheme(theme: "light" | "dark") {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch {}
}

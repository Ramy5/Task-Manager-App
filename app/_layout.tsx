// app/_layout.tsx
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { TasksProvider } from "../features/tasks/TasksContext";
import { ThemeProvider, useTheme } from "../theme/ThemeContext";

function AppShell() {
  const { isDark } = useTheme();
  return (
    <>
      <SafeAreaProvider>
        <TasksProvider>
          <Slot />
        </TasksProvider>
      </SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

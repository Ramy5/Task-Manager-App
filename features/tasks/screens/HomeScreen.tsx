import { useState, useMemo } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { EditTaskModal } from "../components/EditTaskModal";
import { TaskInput } from "../components/TaskInput";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../TasksContext";
import { Task } from "../TaskTypes";
import { useTheme } from "../../../theme/ThemeContext";

export function HomeScreen() {
  const { state, updateTask } = useTasks();
  const { colors, isDark, toggleTheme } = useTheme();
  const [editing, setEditing] = useState<Task | null>(null);

  const openTasks = useMemo(
    () => state.items.filter((t) => !t.completed),
    [state.items]
  );
  const doneTasks = useMemo(
    () => state.items.filter((t) => t.completed),
    [state.items]
  );

  const styles = makeStyles(colors);

  return (
    <SafeAreaView style={[styles.safe]} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Task Manager</Text>
          <Pressable
            onPress={toggleTheme}
            accessibilityRole="button"
            accessibilityLabel="Toggle theme"
            hitSlop={8}
            style={styles.themeBtn}
          >
            <Feather
              name={isDark ? "sun" : "moon"}
              size={20}
              color={colors.text}
            />
          </Pressable>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>{openTasks.length} open</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.summaryText}>{doneTasks.length} done</Text>
        </View>

        <TaskInput />

        <FlatList
          data={state.items}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onEdit={setEditing} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No tasks</Text>}
          contentContainerStyle={
            state.items.length === 0 ? styles.listEmpty : undefined
          }
        />
      </View>

      <EditTaskModal
        visible={!!editing}
        task={editing}
        onClose={() => setEditing(null)}
        onSave={(id, updates) => updateTask(id, updates)}
      />
    </SafeAreaView>
  );
}

const makeStyles = (c: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    container: { flex: 1, padding: 16 },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    header: { fontSize: 26, fontWeight: "800", color: c.text },
    themeBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
    },
    summary: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    summaryText: { color: c.subtext, fontWeight: "600" },
    dot: { color: c.muted },
    empty: { textAlign: "center", marginTop: 20, color: c.subtext },
    listEmpty: { flexGrow: 1, justifyContent: "center" },
  });

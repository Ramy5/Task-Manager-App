import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../TaskTypes";
import { useTasks } from "../TasksContext";
import { useTheme } from "../../../theme/ThemeContext";

type Props = { task: Task; onEdit: (task: Task) => void };

export function TaskItem({ task, onEdit }: Props) {
  const { toggleTask, deleteTask } = useTasks();
  const { colors: c } = useTheme();
  const styles = makeStyles(c);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => toggleTask(task.id)}
        style={styles.left}
        accessibilityRole="button"
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxOn]} />
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.title, task.completed && styles.titleDone]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          {!!task.description && (
            <Text style={styles.desc} numberOfLines={2}>
              {task.description}
            </Text>
          )}
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onEdit(task)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${task.title}`}
          android_ripple={{ color: "#E5E7EB", borderless: true }}
          style={styles.iconBtn}
        >
          <Feather name="edit-2" size={20} color={c.link} />
        </Pressable>

        <Pressable
          onPress={() => deleteTask(task.id)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${task.title}`}
          android_ripple={{ color: "#FEE2E2", borderless: true }}
          style={styles.iconBtn}
        >
          <Feather name="trash-2" size={20} color={c.danger} />
        </Pressable>
      </View>
    </View>
  );
}

const makeStyles = (c: any) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      justifyContent: "space-between",
      gap: 8,
    },
    left: { flexDirection: "row", alignItems: "flex-start", gap: 10, flex: 1 },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: c.muted,
      marginTop: 2,
    },
    checkboxOn: { backgroundColor: c.success, borderColor: c.success },
    title: { fontSize: 16, color: c.text },
    titleDone: { textDecorationLine: "line-through", color: c.muted },
    desc: { fontSize: 13, color: c.subtext, marginTop: 2 },
    actions: { flexDirection: "row", gap: 2, paddingLeft: 8 },
    iconBtn: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
  });

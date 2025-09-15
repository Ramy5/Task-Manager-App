import { useRef, useState, useMemo } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTasks } from "../TasksContext";
import { useTheme } from "../../../theme/ThemeContext";

const validateTitle = (t: string) =>
  t.trim().length >= 2 && t.trim().length <= 60;
const validateDesc = (d: string) =>
  d.trim().length === 0 || (d.trim().length >= 2 && d.trim().length <= 160);

export function TaskInput() {
  const { addTask } = useTasks();
  const { colors: c } = useTheme();
  const styles = makeStyles(c);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef<TextInput>(null);
  const descRef = useRef<TextInput>(null);

  const titleError = useMemo(
    () => (title.length > 0 && !validateTitle(title) ? "2–60 chars" : ""),
    [title]
  );
  const descError = useMemo(
    () =>
      description.length > 0 && !validateDesc(description)
        ? "2–160 chars or empty"
        : "",
    [description]
  );
  const canAdd = validateTitle(title) && validateDesc(description);

  const onAdd = () => {
    if (!canAdd) return;
    addTask(title.trim(), description.trim() || undefined);
    setTitle("");
    setDescription("");
    requestAnimationFrame(() => titleRef.current?.focus());
  };

  return (
    <View style={styles.card}>
      <TextInput
        value={title}
        ref={titleRef}
        onChangeText={setTitle}
        autoCapitalize="sentences"
        autoCorrect
        placeholder="Title"
        placeholderTextColor={c.muted}
        style={[styles.input, titleError && styles.inputError]}
        returnKeyType="next"
        onSubmitEditing={() => descRef.current?.focus()}
      />
      {!!titleError && <Text style={styles.error}>{titleError}</Text>}

      <TextInput
        value={description}
        ref={descRef}
        onChangeText={setDescription}
        autoCapitalize="sentences"
        placeholder="Description"
        placeholderTextColor={c.muted}
        style={[styles.input, styles.textarea, descError && styles.inputError]}
        multiline
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />
      {!!descError && <Text style={styles.error}>{descError}</Text>}

      <Pressable
        accessibilityRole="button"
        style={[styles.btn, canAdd ? styles.btnPrimary : styles.btnDisabled]}
        onPress={onAdd}
        disabled={!canAdd}
      >
        <Text style={styles.btnText}>Add task</Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (c: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.card,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.border,
    },
    input: {
      borderWidth: 1,
      borderColor: c.border,
      color: c.text,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: c.card,
    },
    textarea: { minHeight: 72, textAlignVertical: "top", marginTop: 8 },
    inputError: { borderColor: "#ef4444" },
    error: { color: "#ef4444", fontSize: 12, marginTop: 4 },
    btn: {
      marginTop: 10,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    btnPrimary: { backgroundColor: c.accent },
    btnDisabled: { backgroundColor: c.muted },
    btnText: { color: c.bg, fontWeight: "700", fontSize: 16 },
  });

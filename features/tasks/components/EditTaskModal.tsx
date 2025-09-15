import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Task } from "../TaskTypes";
import { useTheme } from "../../../theme/ThemeContext";

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (
    id: string,
    updates: { title?: string; description?: string }
  ) => void;
};

const validateTitle = (t: string) =>
  t.trim().length >= 2 && t.trim().length <= 60;
const validateDesc = (d: string) =>
  d.trim().length === 0 || (d.trim().length >= 2 && d.trim().length <= 160);

export function EditTaskModal({ visible, task, onClose, onSave }: Props) {
  const { colors: c } = useTheme();
  const styles = makeStyles(c);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  useEffect(() => {
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
  }, [task, visible]);

  const titleError = useMemo(
    () =>
      title.trim().length > 0 && !validateTitle(title) ? "2–60 chars" : "",
    [title]
  );
  const descError = useMemo(
    () =>
      description.length > 0 && !validateDesc(description)
        ? "2–160 chars or empty"
        : "",
    [description]
  );
  const canSave = validateTitle(title) && validateDesc(description);

  if (!visible || !task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit task</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={c.muted}
            style={[styles.input, titleError && styles.inputError]}
            returnKeyType="next"
            autoFocus
          />
          {!!titleError && <Text style={styles.error}>{titleError}</Text>}

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor={c.muted}
            style={[
              styles.input,
              styles.textarea,
              descError && styles.inputError,
            ]}
            multiline
          />
          {!!descError && <Text style={styles.error}>{descError}</Text>}

          <View style={styles.row}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={onClose}>
              <Text style={styles.btnGhostText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.btn,
                canSave ? styles.btnPrimary : styles.btnDisabled,
              ]}
              disabled={!canSave}
              onPress={() => {
                onSave(task.id, {
                  title: title.trim(),
                  description: description.trim(),
                });
                onClose();
              }}
            >
              <Text style={styles.btnPrimaryText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (c: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      padding: 16,
    },
    card: {
      backgroundColor: c.card,
      borderRadius: 14,
      padding: 16,
      gap: 8,
      borderWidth: 1,
      borderColor: c.border,
    },
    title: { fontSize: 18, fontWeight: "700", color: c.text, marginBottom: 4 },
    input: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: c.card,
      color: c.text,
    },
    textarea: { minHeight: 72, textAlignVertical: "top" },
    inputError: { borderColor: "#ef4444" },
    error: { color: "#ef4444", fontSize: 12, marginTop: -4, marginBottom: 4 },
    row: {
      flexDirection: "row",
      gap: 10,
      marginTop: 8,
      justifyContent: "flex-end",
    },
    btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
    btnPrimary: { backgroundColor: c.accent },
    btnPrimaryText: { color: "#ffffff", fontWeight: "600" },
    btnDisabled: { backgroundColor: c.muted },
    btnGhost: { backgroundColor: c.bg, borderWidth: 1, borderColor: c.border },
    btnGhostText: { color: c.text, fontWeight: "600" },
  });

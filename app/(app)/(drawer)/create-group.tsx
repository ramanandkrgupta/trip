// app/create-group.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CreateGroupScreen = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupIcon, setGroupIcon] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateGroup = () => {
    // Here you would add your group creation logic (e.g., save to backend, generate invite link)
    // For now, we simply navigate back to the chats list.
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group</Text>

      {/* Group Icon Selector */}
      <Pressable style={styles.iconSelector}>
        {groupIcon ? (
          <Image source={{ uri: groupIcon }} style={styles.groupIcon} />
        ) : (
          <Ionicons name="camera-outline" size={48} color="#888" />
        )}
        <Text style={styles.iconText}>Select Group Icon</Text>
      </Pressable>

      {/* Group Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />

      {/* Group Description Input */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Group Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Create Group Button */}
      <Pressable style={styles.createButton} onPress={handleCreateGroup}>
        <Text style={styles.createButtonText}>Create Group & Share Link</Text>
      </Pressable>
    </View>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  iconSelector: {
    alignItems: "center",
    marginBottom: 24,
  },
  groupIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  iconText: {
    marginTop: 8,
    fontSize: 16,
    color: "#888",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

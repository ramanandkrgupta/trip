// app/chats/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Define a simple type for our chat items.
interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  isGroup?: boolean;
}

const ChatsScreen = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  // For now, we use sample data.
  useEffect(() => {
    const sampleChats: Chat[] = [
      {
        id: "1",
        name: "John Doe",
        lastMessage: "Hey, how are you?",
        timestamp: "10:00 AM",
      },
      {
        id: "2",
        name: "Family Group",
        lastMessage: "Dinner at 8?",
        timestamp: "9:45 AM",
        isGroup: true,
      },
      {
        id: "3",
        name: "Jane Smith",
        lastMessage: "Let’s catch up later!",
        timestamp: "Yesterday",
      },
    ];
    setChats(sampleChats);
  }, []);

  const renderItem = ({ item }: { item: Chat }) => (
    <Pressable
      style={styles.chatItem}
      onPress={() => router.push(`../chat/${item.id}`)}
    >
      <View style={styles.avatar}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={48} color="#888" />
        )}
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.chatTimestamp}>{item.timestamp}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Floating Action Button to Create Group */}
      <Pressable
        style={styles.fab}
        onPress={() => router.push("/create-group")}
      >
        <Ionicons name="people-circle-outline" size={28} color="#fff" />
      </Pressable>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  avatar: { marginRight: 12 },
  avatarImage: { width: 48, height: 48, borderRadius: 24 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: "bold" },
  chatLastMessage: { fontSize: 14, color: "#888", marginTop: 4 },
  chatTimestamp: { fontSize: 12, color: "#888" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#0a7ea4",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

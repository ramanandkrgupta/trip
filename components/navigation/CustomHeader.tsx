// CustomHeader.tsx
import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSession } from "@/context";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

export const CustomHeader = () => {
  // Use the built-in hook; fallback to "light" if it returns null.
  const colorScheme = useColorScheme() || "light";
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { user } = useSession();

  // Compute profile photo URL or fallback to an initial.
  const profilePhoto = user?.photoURL;
  const initials = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase()
    : "";

  // Instead of relying on Colors[colorScheme]?.headerBackground,
  // explicitly define a header background that works for each mode.
  const headerBg = colorScheme === "dark" ? "#202124" : "#ffffff";
  // Use the tint from Colors as is.
  const tintColor = Colors[colorScheme]?.tint || "#000000";

  return (
    <View style={[styles.headerContainer, { backgroundColor: headerBg }]}>
      {/* Hamburger Menu */}
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={styles.iconContainer}
      >
        <Ionicons name="menu" size={24} color={tintColor} />
      </Pressable>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search riders"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* Notification Bell */}
      <Pressable
        onPress={() => {
          /* Add your notification handler here */
        }}
        style={styles.iconContainer}
      >
        <Ionicons name="notifications-outline" size={24} color={tintColor} />
      </Pressable>

      {/* Profile Photo or Initial */}
      <Pressable
        onPress={() => navigation.navigate("profile")}
        style={styles.iconContainer}
      >
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={[styles.profileText, { color: tintColor }]}>
              {initials}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 3,
  },
  iconContainer: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profilePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontWeight: "bold",
  },
});

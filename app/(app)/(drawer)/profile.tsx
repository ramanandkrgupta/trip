import { useSession } from "@/context";
import React from "react";
import { View, Text } from "react-native";

const ProfileScreen = () => {
  // ============================================================================
  // Hooks
  // ============================================================================
  const { user } = useSession();

  // ============================================================================
  // Computed Values
  // ============================================================================

  /**
   * Gets the display name for the welcome message
   * Prioritizes user's name, falls back to email, then default greeting
   */
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View className="flex-1 mt-4 p-4">
      {/* Welcome Section */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-blue-900">
          Name: {displayName}
        </Text>
        <Text className="text-xl font-semibold  text-blue-900 mt-2">
          Email: {user?.email}
        </Text>
        <Text className="text-normL font-semibold  text-blue-900 mt-2">
          Last Seen: {user?.metadata?.lastSignInTime}
        </Text>
        <Text className="text-normal font-semibold  text-blue-900 mt-2">
          Created: {user?.metadata?.creationTime}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

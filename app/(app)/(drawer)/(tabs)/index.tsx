// TabsIndexScreen.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { useSession } from "@/context";
// Import the helper function that fetches user profile data from Firestore
import { getUserProfile } from "@/lib/firebase-service";

/**
 * TabsIndexScreen displays the main home screen content with a personalized welcome message.
 * It fetches the user's full name from the database if available, and disables the hardware back button.
 *
 * @returns {JSX.Element} Home screen component.
 */
const TabsIndexScreen = () => {
  const { signOut, user } = useSession();
  const [profile, setProfile] = useState<any>(null);

  // Fetch the user's profile data (including their full name) from the database.
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileData = await getUserProfile(user.uid);
          setProfile(profileData);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };
    fetchProfile();
  }, [user]);

  // Compute a friendly display name:
  // 1. Use the fetched profile name if available.
  // 2. Otherwise, use the Firebase displayName (if it's not just the email).
  // 3. Otherwise, derive a name from the email.
  const displayName = useMemo(() => {
    if (!user) return "Guest";
    if (profile && profile.name) return profile.name;
    if (user.displayName && user.displayName !== user.email)
      return user.displayName;
    if (user.email) {
      const namePart = user.email.split("@")[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return "Guest";
  }, [user, profile]);

  // Logout handler.
  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  // Disable the hardware back button on this screen.
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Returning true disables the default back behavior.
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Welcome back,
        </Text>
        <Text className="text-2xl font-bold text-blue-600">{displayName}</Text>
        <Text className="text-sm text-gray-500 mt-2">{user?.email}</Text>
      </View>

      {/* Logout Button */}
      <Pressable
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg active:bg-red-600"
      >
        <Text className="text-white font-semibold text-base">Logout</Text>
      </Pressable>
    </View>
  );
};

export default TabsIndexScreen;

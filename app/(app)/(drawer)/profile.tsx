import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSession } from "@/context";
import { router } from "expo-router";

const ProfileScreen = () => {
  // Get the user and signOut function from our auth context.
  const { user, signOut } = useSession();

  // Compute display name (falls back to email prefix or "Guest").
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";

  // State for the profile image. If the user already has one, you can initialize it.
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.photoURL || null
  );

  // Sample counts. In a real app, fetch these from your backend.
  const [followers] = useState(120);
  const [friends] = useState(75);
  const [groups] = useState(10);

  // Function to pick an image from the gallery.
  const pickImage = async () => {
    // Request permission to access media library.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      // The new image URI is in result.assets[0].uri.
      setProfileImage(result.assets[0].uri);
      // Here, update your backend/user profile if necessary.
    }
  };

  // Logout handler.
  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Profile Header */}
      <View className="items-center mb-8">
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-300 mb-4 justify-center items-center">
            <Text className="text-3xl font-bold text-white">
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Pressable onPress={pickImage}>
          <Text className="text-blue-600 font-semibold">Upload Photo</Text>
        </Pressable>
        <Text className="text-xl font-bold text-blue-900 mt-4">
          {displayName}
        </Text>
        <Text className="text-lg font-semibold text-blue-900 mt-2">
          {user?.email}
        </Text>
        <Text className="text-base text-blue-900 mt-2">
          Last Seen: {user?.metadata?.lastSignInTime}
        </Text>
        <Text className="text-base text-blue-900 mt-2">
          Created: {user?.metadata?.creationTime}
        </Text>
      </View>

      {/* Statistics Section */}
      <View className="flex-row justify-around mb-8">
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-900">{followers}</Text>
          <Text className="text-base text-blue-900">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-900">{friends}</Text>
          <Text className="text-base text-blue-900">Friends</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-900">{groups}</Text>
          <Text className="text-base text-blue-900">Groups</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-around mb-8">
        <Pressable className="bg-blue-600 px-4 py-2 rounded-lg">
          <Text className="text-white font-semibold">Follow</Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

import { router, Link } from "expo-router";
import {
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useSession } from "@/context";

export default function SignIn() {
  // ============================================================================
  // Hooks & State
  // ============================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { signIn } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================
  const handleSignInPress = async () => {
    setIsProcessing(true);
    try {
      const resp = await signIn(email, password);
      if (resp) {
        // Successful sign in — navigate to the main area
        router.replace("/(app)/(drawer)/(tabs)/");
      }
    } catch (error: any) {
      // Check for both "user not found" and "invalid credential" errors
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        setRedirectMessage("User not found. Redirecting to Sign Up...");
        setTimeout(() => {
          router.replace("/sign-up");
        }, 1500);
      } else {
        setRedirectMessage("An error occurred. Please try again.");
        setTimeout(() => {
          setRedirectMessage("");
        }, 1500);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // ============================================================================
  // Render
  // ============================================================================
  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Welcome Back
        </Text>
        <Text className="text-sm text-gray-500">
          Please sign in to continue
        </Text>
      </View>

      {/* Form Section */}
      <View className="w-full max-w-[300px] space-y-4 mb-8">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Email
          </Text>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Password
          </Text>
          <TextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>

      {/* Redirect/Status Message (shown above the button) */}
      {redirectMessage ? (
        <Text className="text-gray-700 text-center mb-4">
          {redirectMessage}
        </Text>
      ) : null}

      {/* Sign In Button */}
      <Pressable
        onPress={handleSignInPress}
        disabled={isProcessing}
        className="bg-blue-600 w-full max-w-[300px] py-3 rounded-lg active:bg-blue-700"
      >
        {isProcessing ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white font-semibold text-base text-center">
            Sign In
          </Text>
        )}
      </Pressable>

      {/* Sign Up Link */}
      <View className="flex-row items-center mt-6">
        <Text className="text-gray-600">Don't have an account?</Text>
        <Link href="/sign-up" asChild>
          <Pressable className="ml-2">
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { signUp } = useSession();

  const handleSignUpPress = async () => {
    setIsProcessing(true);
    try {
      const resp = await signUp(email, password, name);
      if (resp) {
        // Successful registration—navigate to the app's main area
        router.replace("/(app)/(drawer)/(tabs)/");
      }
    } catch (error: any) {
      // If the email is already registered, show a message above the button
      if (error.code === "auth/email-already-in-use") {
        setRedirectMessage(
          "Email already registered. Redirecting to Sign In..."
        );
        setTimeout(() => {
          router.replace("/sign-in");
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

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Create Account
        </Text>
        <Text className="text-sm text-gray-500">Sign up to get started</Text>
      </View>

      {/* Form Section */}
      <View className="w-full max-w-[300px] space-y-4 mb-8">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Name
          </Text>
          <TextInput
            placeholder="Your full name"
            value={name}
            onChangeText={setName}
            textContentType="name"
            autoCapitalize="words"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="newPassword"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>

      {/* Redirect/Status Message Above the Button */}
      {redirectMessage ? (
        <Text className="text-gray-700 text-center mb-4">
          {redirectMessage}
        </Text>
      ) : null}

      {/* Sign Up Button */}
      <Pressable
        onPress={handleSignUpPress}
        disabled={isProcessing}
        className="bg-blue-600 w-full max-w-[300px] py-3 rounded-lg active:bg-blue-700"
      >
        {isProcessing ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white font-semibold text-base text-center">
            Sign Up
          </Text>
        )}
      </Pressable>

      {/* Sign In Link */}
      <View className="flex-row items-center mt-6">
        <Text className="text-gray-600">Already have an account?</Text>
        <Link href="/sign-in" asChild>
          <Pressable className="ml-2">
            <Text className="text-blue-600 font-semibold">Sign In</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

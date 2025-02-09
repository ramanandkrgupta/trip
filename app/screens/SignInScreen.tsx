// screens/SignInScreen.tsx
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

export default function SignInScreen() {
  const handleGoogleSignIn = async () => {
    // Your Firebase Google Auth logic here
  }

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center p-4">
      <Image
        source={require('../assets/rider-hero.png')}
        className="h-64 w-64 mb-8"
      />
      <Text className="text-3xl text-neon-blue font-bold mb-4">
        Rider Connect
      </Text>
      <GoogleSigninButton onPress={handleGoogleSignIn} />
    </View>
  )
}

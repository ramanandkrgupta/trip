// app/screens/SignInScreen.tsx
import { View, Image, Text } from 'react-native'
import GoogleSignInButton from '../components/GoogleSignInButton'

export default function SignInScreen() {
  return (
    <View className="flex-1 bg-gray-900 justify-center items-center p-4">
      <Image
        source={require('../../assets/rider-icon.png')}
        className="h-32 w-32 mb-8"
      />
      <Text className="text-3xl text-[#00f0ff] font-bold mb-12">
        Rider Connect
      </Text>
      <GoogleSignInButton />
    </View>
  )
}

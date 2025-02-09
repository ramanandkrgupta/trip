// app/components/GoogleSignInButton.tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { router } from 'expo-router'
import { auth } from '../constants/firebase'
import { Image, Text, TouchableOpacity } from 'react-native'
import { signInWithCredential } from 'firebase/auth'


GoogleSignin.configure() // Initialize Google Sign-In SDK


GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // From Firebase Console
})

export default function GoogleSignInButton() {
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const credential = auth.GoogleAuthProvider.credential(userInfo.idToken)
      await signInWithCredential(auth, credential)
      router.replace('/(tabs)') // Redirect to home after login
    } catch (error) {
      console.error('Google Sign-In Error:', error)
    }
  }

  return (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg flex-row items-center"
      onPress={handleSignIn}
    >
      <Image
        source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
        className="w-8 h-8 mr-4"
      />
      <Text className="text-gray-900 font-bold">Sign in with Google</Text>
    </TouchableOpacity>
  )
}

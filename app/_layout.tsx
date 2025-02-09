// app/_layout.tsx
import { Stack } from 'expo-router'
import { AuthProvider } from '@/context/AuthContext'
import TabNavigator from '@/navigation/TabNavigator'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}

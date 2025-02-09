// app/_layout.tsx
import { Stack } from 'expo-router'
import { AuthProvider } from '@/context/AuthContext'
import TabNavigator from '@/navigation/TabNavigator'
import { testFirebaseConnection } from '@/constants/firebase'
import { useEffect } from 'react'

export default function RootLayout() {
  // Inside your RootLayout component
  useEffect(() => {
    testFirebaseConnection()
  }, [])
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}

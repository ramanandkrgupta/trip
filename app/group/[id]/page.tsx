// app/group/[id]/page.tsx
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function GroupPage() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-white text-2xl">Group ID: {id}</Text>
    </View>
  )
}

// Simple header component
import { Text, View } from 'react-native'

export default function Header({ title }: { title: string }) {
  return (
    <View className="bg-gray-800 p-4 mb-4">
      <Text className="text-white text-xl font-bold">{title}</Text>
    </View>
  )
}

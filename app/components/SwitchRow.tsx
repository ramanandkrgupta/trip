// Simple switch component
import { Switch, Text, View } from 'react-native'

export default function SwitchRow({ label }: { label: string }) {
  return (
    <View className="flex-row items-center justify-between p-4 bg-gray-800 mb-2">
      <Text className="text-white">{label}</Text>
      <Switch />
    </View>
  )
}

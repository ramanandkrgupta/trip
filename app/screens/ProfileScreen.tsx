// screens/ProfileScreen.tsx
import { Image, Text, View } from 'react-native'



export default function ProfileScreen() {
  return (
    <View className="bg-gray-900 flex-1 p-4">
      <Header title="Profile" />
      <View className="items-center mb-6">
        <Image
          source={{ uri: user.photo }}
          className="h-24 w-24 rounded-full mb-4"
        />
        <Text className="text-white text-xl">{user.name}</Text>
        <Text className="text-gray-400">{user.bikeModel}</Text>
      </View>
      <SwitchRow label="Enable Lost Rider Alerts" />
      <SwitchRow label="Background Location Updates" />
    </View>
  )
}

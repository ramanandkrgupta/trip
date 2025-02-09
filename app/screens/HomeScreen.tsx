// app/screens/HomeScreen.tsx
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { RootStackParamList } from '../types'
import { useAuth } from '../context/AuthContext'




// Define your groups data
const groups = [
  { id: '1', name: 'Weekend Riders', memberCount: 8 },
  { id: '2', name: 'Mountain Crew', memberCount: 5 },
]

// 🔽🔽🔽 Put this OUTSIDE the component function 🔽🔽🔽
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Create Group Button */}
      <TouchableOpacity
        className="bg-[#00f0ff] p-4 rounded-lg mb-4"
        onPress={() => console.log('Create group')}
      >
        <Text className="text-gray-900 text-center font-bold">
          Create Group
        </Text>
      </TouchableOpacity>

      {/* Groups List */}
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '../group/[id]',
              params: { id: item.id },
            }}
            asChild
          >
            <TouchableOpacity className="bg-gray-800 p-4 rounded-lg mb-2">
              <Text className="text-white text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-400">{item.memberCount} riders</Text>
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

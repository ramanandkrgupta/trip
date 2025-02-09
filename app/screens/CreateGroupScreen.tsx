// app/screens/CreateGroupScreen.tsx
import { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { db } from '../constants/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import router from 'next/router'

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState('')
  const { user } = useAuth()

  const createGroup = async () => {
    const groupRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      admin: user?.uid,
      createdAt: new Date(),
    })

    // Add creator as first member
    await addDoc(collection(db, `groups/${groupRef.id}/members`), {
      userId: user?.uid,
      joinedAt: new Date(),
    })

    router.back() // Return to home
  }

  return (
    <View className="bg-gray-900 flex-1 p-4">
      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        placeholder="Group Name"
        placeholderTextColor="#666"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Button title="Create Group" onPress={createGroup} color="#00f0ff" />
    </View>
  )
}

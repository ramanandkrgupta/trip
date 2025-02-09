// app/services/location.ts
import * as Location from 'expo-location'
import { db } from '../constants/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { GeoPoint, serverTimestamp } from 'firebase/firestore'

export const startLocationTracking = async (
  groupId: string,
  userId: string
) => {
  // Request permissions
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') return

  // Send location to Firestore
  const sendLocation = async () => {
    const location = await Location.getCurrentPositionAsync({})
    await updateDoc(doc(db, `groups/${groupId}/members/${userId}`), {
      location: new GeoPoint(
        location.coords.latitude,
        location.coords.longitude
      ),
      updatedAt: serverTimestamp(),
    })
  }

  // Update every 30 seconds
  setInterval(sendLocation, 30000)
  sendLocation() // Initial update
}

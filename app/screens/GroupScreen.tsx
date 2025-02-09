// app/screens/GroupScreen.tsx
import MapView, { Marker } from 'react-native-maps'
import { View } from 'react-native'

export default function GroupScreen() {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const members = [
    { id: '1', location: { latitude: 37.78825, longitude: -122.4324 } },
    { id: '2', location: { latitude: 37.78925, longitude: -122.4334 } },
  ]

  return (
    <View className="flex-1 bg-gray-900">
      <MapView
        className="flex-1"
        initialRegion={initialRegion}
        mapType="standard"
        showsUserLocation
      >
        {members.map((member) => (
          <Marker
            key={member.id}
            coordinate={member.location}
            pinColor="#00f0ff"
          />
        ))}
      </MapView>
    </View>
  )
}

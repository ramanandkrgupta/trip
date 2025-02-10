import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import * as Battery from 'expo-battery';

type LocationCoords = {
  latitude: number;
  longitude: number;
  speed?: number;
  name?: string;
  battery?: number;
};

export default function TabTwoScreen() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [groupMembers, setGroupMembers] = useState<LocationCoords[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (newLocation) => {
          const batteryStatus = await Battery.getBatteryLevelAsync();
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            speed: newLocation.coords.speed || 0,
            name: 'You',
            battery: batteryStatus * 100,
          });
        }
      );

      return () => locationSubscription.remove();
    })();
  }, []);

  // Dummy group member locations (Replace with real-time data fetching)
  useEffect(() => {
    setGroupMembers([
      {
        latitude: 37.7885,
        longitude: -122.4325,
        speed: 10,
        name: 'John',
        battery: 80,
      },
      {
        latitude: 37.7890,
        longitude: -122.4330,
        speed: 15,
        name: 'Emma',
        battery: 60,
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsIndoorLevelPicker={true}
        showsScale={true}
        loadingEnabled={true}
        loadingIndicatorColor="#000"
        loadingBackgroundColor="#fff"
      >
        {location && (
          <Marker coordinate={location}>
            <Callout>
              <Text>{location.name}</Text>
              <Text>Battery: {location.battery?.toFixed(0)}%</Text>
              <Text>Speed: {(location.speed || 0).toFixed(2)} km/h</Text>
            </Callout>
          </Marker>
        )}
        {groupMembers.map((member, index) => (
          <Marker key={index} coordinate={member}>
            <Callout>
              <Text>{member.name}</Text>
              <Text>Battery: {member.battery}%</Text>
              <Text>Speed: {member.speed?.toFixed(2)} km/h</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

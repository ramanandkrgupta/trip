import React from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

// Get the device's screen width.
const windowWidth = Dimensions.get("window").width;

/**
 * DrawerLayout implements the root drawer navigation for the app.
 * This layout wraps the tab navigation and other screens accessible via the drawer menu.
 * The drawer's width is set to half of the device's screen width.
 */
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          // Set the drawer's width to half the screen width.
          drawerStyle: { width: 2*windowWidth / 3 },
        }}
      >
        {/*
          (tabs) route contains the TabLayout with bottom navigation
          - Nested inside the drawer as the main content
          - headerShown: false removes double headers (drawer + tabs)
        */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            headerShown: false,
          }}
        />
        {/* Additional drawer routes */}
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile", // Label shown in drawer menu
            title: "Profile", // Header title when screen is open
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

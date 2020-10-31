import React from "react";

import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { BeachMapScreen } from "./screens/BeachMapScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { RootParamsType } from "./types/RootParamsType";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const Drawer = createDrawerNavigator<RootParamsType>();
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: (props: {
                color: string;
                size: number;
                focused: boolean;
              }) => (
                <Ionicons
                  name={"md-home"}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="BeachMap"
            component={BeachMapScreen}
            options={{
              drawerIcon: (props: {
                color: string;
                size: number;
                focused: boolean;
              }) => (
                <Ionicons
                  name={"md-map"}
                  color={props.color}
                  size={props.size}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

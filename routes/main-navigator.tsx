import HomeScreen from "@/screens/home-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home-screen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import AuthNavigator from "./auth-navigator";
import MainNavigator from "./main-navigator";

export type RootParamList = {
  "auth-navigator": undefined;
  "main-navigator": undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  const session = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="auth-navigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="main-navigator" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

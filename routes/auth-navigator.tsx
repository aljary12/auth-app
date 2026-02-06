import SignInScreen from "@/screens/sign-in-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

export type AuthParamList = {
  "sign-in-screen": undefined;
  "sign-up-screen": undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in-screen" component={SignInScreen} />
    </Stack.Navigator>
  );
}

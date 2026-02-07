import Button from "@/components/button";
import Text from "@/components/text";
import { useAuth } from "@/context/auth.context";
import * as React from "react";
import { View } from "react-native";

function HomeScreen() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
}

export default HomeScreen;

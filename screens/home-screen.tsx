import Button from "@/components/button";
import InputForm from "@/components/input-form";
import NavBar from "@/components/nav-bar";
import { useAuth } from "@/context/auth.context";
import { palette } from "@/themes/pallete";
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.othersWhite }}>
      <NavBar headerText="Personal Info" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 12,
          paddingHorizontal: 24,
          gap: 24,
        }}
        bounces={false}
      >
        <InputForm
          title="Full Name"
          placeholder="Full Name"
          autoCapitalize="none"
          value={user?.name || ""}
          editable={false}
        />
        <InputForm
          title="Email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={user?.email || ""}
          editable={false}
        />
      </KeyboardAwareScrollView>
      <View style={{ padding: 24 }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

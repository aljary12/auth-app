import Button from "@/components/button";
import InputForm from "@/components/input-form";
import NavBar from "@/components/nav-bar";
import Text from "@/components/text";
import Touchable from "@/components/touchable";
import { useAuth } from "@/context/auth.context";
import { AuthParamList } from "@/routes/auth-navigator";
import { palette } from "@/themes/pallete";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

type Navigation = NativeStackNavigationProp<AuthParamList>;

export default function SignInScreen() {
  const { login } = useAuth();
  const navigation = useNavigation<Navigation>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    try {
      await login(email, password);
    } catch (e: any) {
      console.log("🚀 ~ signInWithEmail ~ e:", e?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.othersWhite }}>
      <NavBar />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 12,
          paddingHorizontal: 24,
          gap: 32,
        }}
        bounces={false}
      >
        <View>
          <Text size="h3" weight="bold" style={{ marginBottom: 16 }}>
            Welcome back 👋
          </Text>
          <Text size="h6">Please enter your email & password to sign in.</Text>
        </View>
        <View style={{ gap: 28 }}>
          <View style={{ gap: 20 }}>
            <InputForm
              title="Email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
            <InputForm
              title="Password"
              placeholder="Password"
              autoCapitalize="none"
              isPassword
              onChangeText={setPassword}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 24 }}>
            <Text
              size="h6"
              weight="bold"
              style={{ flex: 1, textAlign: "right" }}
            >
              Forgot password?
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: palette.greyscale200,
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text size="h6" weight="medium">
              {"Don't have an account? "}
            </Text>
            <Touchable onPress={() => navigation.navigate("sign-up-screen")}>
              <Text size="h6" weight="bold">
                Sign up
              </Text>
            </Touchable>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={{ padding: 24 }}>
        <Button
          title="Sign in"
          onPress={signInWithEmail}
          loading={loading}
          disabled={!email || !password}
        />
      </View>
    </SafeAreaView>
  );
}

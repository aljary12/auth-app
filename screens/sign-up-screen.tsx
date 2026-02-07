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

export default function SignUpScreen() {
  const { signup } = useAuth();
  const navigation = useNavigation<Navigation>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);

    try {
      await signup(email, password);
    } catch (e) {
      console.log("🚀 ~ signInWithEmail ~ e:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.othersWhite }}>
      <NavBar back />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          paddingVertical: 12,
          paddingHorizontal: 24,
          gap: 32,
        }}
        bounces={false}
      >
        <View>
          <Text size="h3" weight="bold" style={{ marginBottom: 16 }}>
            Create account 👩‍💻
          </Text>
          <Text size="h6">Please enter your email & password to sign up.</Text>
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
          <View
            style={{
              height: 1,
              backgroundColor: palette.greyscale200,
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text size="h6" weight="medium">
              {"Already have an account? "}
            </Text>
            <Touchable onPress={navigation.goBack}>
              <Text size="h6" weight="bold">
                Sign in
              </Text>
            </Touchable>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={{ padding: 24 }}>
        <Button
          title="Sign up"
          onPress={signUpWithEmail}
          loading={loading}
          disabled={!email || !password}
        />
      </View>
    </SafeAreaView>
  );
}

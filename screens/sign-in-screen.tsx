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
import { Alert, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { firebaseAuthErrors } from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";

type Navigation = NativeStackNavigationProp<AuthParamList>;

// Zod validation schema
const signInSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const { login } = useAuth();
  const navigation = useNavigation<Navigation>();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { field: emailField, fieldState: emailState } = useController({
    name: "email",
    control,
  });

  const { field: passwordField, fieldState: passwordState } = useController({
    name: "password",
    control,
  });

  async function signInWithEmail({ email, password }: SignInFormData) {
    setLoading(true);

    try {
      await login(email, password);
    } catch (error: any) {
      const errorMessage =
        firebaseAuthErrors[error?.code] || "Login failed. Please try again.";
      Alert.alert("Error", errorMessage);
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
              value={emailField.value}
              onChangeText={emailField.onChange}
              onBlur={emailField.onBlur}
              error={emailState.error?.message}
            />
            <InputForm
              title="Password"
              placeholder="Password"
              autoCapitalize="none"
              isPassword
              value={passwordField.value}
              onChangeText={passwordField.onChange}
              onBlur={passwordField.onBlur}
              error={passwordState.error?.message}
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
          onPress={handleSubmit(signInWithEmail)}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

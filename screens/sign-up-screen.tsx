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
const signUpSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const { signup } = useAuth();
  const navigation = useNavigation<Navigation>();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { field: nameField, fieldState: nameState } = useController({
    name: "name",
    control,
  });

  const { field: emailField, fieldState: emailState } = useController({
    name: "email",
    control,
  });

  const { field: passwordField, fieldState: passwordState } = useController({
    name: "password",
    control,
  });

  async function signUpWithEmail({ name, email, password }: SignUpFormData) {
    setLoading(true);

    try {
      await signup(name, email, password);
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
              placeholder="Full Name"
              value={nameField.value}
              onChangeText={nameField.onChange}
              onBlur={nameField.onBlur}
              error={nameState.error?.message}
            />
            <InputForm
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailField.value}
              onChangeText={emailField.onChange}
              onBlur={emailField.onBlur}
              error={emailState.error?.message}
            />
            <InputForm
              placeholder="Password"
              autoCapitalize="none"
              isPassword
              value={passwordField.value}
              onChangeText={passwordField.onChange}
              onBlur={passwordField.onBlur}
              error={passwordState.error?.message}
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
          onPress={handleSubmit(signUpWithEmail)}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

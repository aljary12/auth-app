import { palette } from "@/themes/pallete";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Text from "./text";
import Touchable from "./touchable";

interface Props extends TextInputProps {
  title?: string;
  formStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ComponentProps<typeof Ionicons>;
  isPassword?: boolean;
  error?: string;
}

export default function InputForm(props: Props) {
  const {
    leftIcon,
    title,
    formStyle,
    inputStyle,
    isPassword,
    error,
    style,
    ...rest
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={formStyle}>
      {!!title && (
        <Text size="h6" weight="semiBold" style={{ marginBottom: 8 }}>
          {title}
        </Text>
      )}
      <View
        style={[
          {
            paddingVertical: 18,
            paddingHorizontal: 20,
            backgroundColor: palette.greyscale50,
            borderRadius: 12,
            flexDirection: "row",
            gap: 12,
            borderWidth: !!error ? 1 : 0,
            borderColor: !!error ? palette.alertsStatusError : undefined,
          },
          inputStyle,
        ]}
      >
        {leftIcon && (
          <Ionicons color={palette.greyscale900} size={20} {...leftIcon} />
        )}
        <TextInput
          style={[
            weights.regular,
            sizes["h6"],
            {
              paddingTop: 0,
              paddingBottom: 0,
              paddingHorizontal: 0,
              margin: 0,
              color: palette.greyscale900,
              includeFontPadding: false,
              flex: 1,
            },
            style,
          ]}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor={palette.greyscale500}
          {...rest}
        />
        {isPassword && (
          <Touchable onPress={() => setIsPasswordVisible((prev) => !prev)}>
            <Ionicons
              type="regular"
              size={20}
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              color={palette.greyscale900}
            />
          </Touchable>
        )}
      </View>

      {!!error && (
        <Text style={{ color: palette.alertsStatusError, marginTop: 8 }}>
          {error}
        </Text>
      )}
    </View>
  );
}

const weights = StyleSheet.create({
  bold: { fontFamily: "Urbanist-Bold" },
  semiBold: { fontFamily: "Urbanist-SemiBold" },
  medium: { fontFamily: "Urbanist-Medium" },
  regular: { fontFamily: "Urbanist-Regular" },
});

const sizes = StyleSheet.create({
  h1: { fontSize: 48 },
  h2: { fontSize: 40 },
  h3: { fontSize: 32 },
  h4: { fontSize: 24 },
  h5: { fontSize: 20 },
  h6: { fontSize: 18 },
  large: { fontSize: 16 },
  medium: { fontSize: 14 },
  small: { fontSize: 12 },
  "x-small": { fontSize: 10 },
});

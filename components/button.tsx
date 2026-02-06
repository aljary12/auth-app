import { palette } from "@/themes/pallete";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ActivityIndicator } from "react-native";
import Text from "./text";
import Touchable, { TouchableProps } from "./touchable";

interface Props extends TouchableProps {
  title: string;
  leftIcon?: React.ComponentProps<typeof Ionicons>;
  rightIcon?: React.ComponentProps<typeof Ionicons>;
  isPassword?: boolean;
  mode?: "outline" | "fill";
  loading?: boolean;
}

export default function Button(props: Props) {
  const {
    title,
    style,
    leftIcon,
    rightIcon,
    mode = "fill",
    loading,
    disabled,
    ...rest
  } = props;
  return (
    <Touchable
      row
      center
      style={[
        {
          height: 58,
          padding: 16,
          gap: 20,
          backgroundColor: disabled
            ? palette.alertsStatusButtonDisabled
            : palette.primary900,
          borderRadius: 1000,
        },
        style,
      ]}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size={20} color={palette.greyscale900} />
      ) : (
        <>
          {leftIcon && (
            <Ionicons size={20} color={palette.greyscale900} {...leftIcon} />
          )}
          <Text
            size="large"
            weight="bold"
            style={{ color: palette.greyscale900 }}
            center
          >
            {title}
          </Text>
          {rightIcon && (
            <Ionicons size={20} color={palette.greyscale900} {...rightIcon} />
          )}
        </>
      )}
    </Touchable>
  );
}

import { palette } from "@/themes/pallete";
import React from "react";
import { ActivityIndicator } from "react-native";
import Text from "./text";
import Touchable, { TouchableProps } from "./touchable";

interface Props extends TouchableProps {
  title: string;
  isPassword?: boolean;
  mode?: "outline" | "fill";
  loading?: boolean;
}

export default function Button(props: Props) {
  const { title, style, mode = "fill", loading, disabled, ...rest } = props;

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
        <Text
          size="large"
          weight="bold"
          style={{ color: palette.greyscale900 }}
          center
        >
          {title}
        </Text>
      )}
    </Touchable>
  );
}

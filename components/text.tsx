import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

import type { TextProps as RNTextProps } from "react-native";

export type TextProps = RNTextProps & {
  fill?: boolean;
  center?: boolean;
  capitalize?: boolean;
  size?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "large"
    | "medium"
    | "small"
    | "x-small";
  weight?: "bold" | "semiBold" | "medium" | "regular";
};

const Text = React.forwardRef<RNText, TextProps>((props, ref) => {
  const {
    capitalize,
    children,
    style,
    center,
    size = "medium",
    weight = "regular",
    fill,
    ...rest
  } = props;

  const _size = sizes[size];
  const _weight = weights[weight];

  return (
    <RNText
      ref={ref}
      style={[
        fill && { flex: 1 },
        center && { textAlign: "center" },
        capitalize && { textTransform: "capitalize" },
        _size,
        _weight,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
});

export default Text;

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

import React, { useRef } from "react";
import { Animated, Pressable } from "react-native";

import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface TouchableProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  center?: boolean;
  "center-x"?: boolean;
  "center-y"?: boolean;
  row?: boolean;
  fill?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Touchable(props: TouchableProps) {
  const {
    style,
    center,
    "center-x": centerX,
    "center-y": centerY,
    row,
    fill,
    ...rest
  } = props;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: GestureResponderEvent) => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
    rest.onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    rest.onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      {...rest}
      style={[
        fill && { flex: 1 },
        row && { flexDirection: "row" },
        centerX &&
          (row ? { justifyContent: "center" } : { alignItems: "center" }),
        centerY &&
          (row ? { alignItems: "center" } : { justifyContent: "center" }),
        center && { alignItems: "center", justifyContent: "center" },
        { opacity },
        style,
      ]}
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    />
  );
}

export default Touchable;

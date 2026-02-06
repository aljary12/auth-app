import { palette } from "@/themes/pallete";
import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import Text from "./text";
import Touchable from "./touchable";

interface Props {
  back?: boolean;
  logo?: boolean;
  headerText?: string;
  headerColor?: string;
  onLeftPress?(): void;
  rightText?: string;
  onRightPress?(): void;
  containerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}
export default function NavBar(props: Props) {
  const {
    headerText,
    headerColor = palette.greyscale900,
    onLeftPress,
    rightText,
    onRightPress,
    containerStyle,
    headerTextStyle,
  } = props;

  const header = headerText || "";

  return (
    <View
      style={[{ paddingHorizontal: 24, paddingVertical: 16 }, containerStyle]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", height: 48 }}>
        <Text
          center
          size="h4"
          weight="bold"
          style={[
            { position: "absolute", left: 0, right: 0, zIndex: -1 },
            headerTextStyle,
          ]}
        >
          {header}
        </Text>

        {!!rightText && (
          <Touchable onPress={onRightPress}>
            <Text center size="h5" weight="bold">
              {rightText}
            </Text>
          </Touchable>
        )}
      </View>
    </View>
  );
}

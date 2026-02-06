import { palette } from "@/themes/pallete";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import Text from "./text";
import Touchable from "./touchable";

interface Props {
  back?: boolean;
  logo?: boolean;
  headerText?: string;
  headerColor?: string;
  leftIcon?: React.ComponentProps<typeof Ionicons>;
  onLeftPress?(): void;
  rightIcon?: React.ComponentProps<typeof Ionicons>;
  rightText?: string;
  onRightPress?(): void;
  containerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}
export default function NavBar(props: Props) {
  const navigation = useNavigation();
  const {
    logo,
    back,
    headerText,
    headerColor = palette.greyscale900,
    leftIcon,
    onLeftPress,
    rightIcon,
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
        {back && (
          <Touchable onPress={navigation.goBack}>
            <Ionicons
              type="regular"
              name="arrow-back"
              color={headerColor}
              size={20}
            />
          </Touchable>
        )}

        {leftIcon && (
          <Touchable onPress={onLeftPress}>
            <Ionicons color={headerColor} size={20} {...leftIcon} />
          </Touchable>
        )}

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

        {rightIcon && (
          <Touchable onPress={onRightPress}>
            <Ionicons color={headerColor} size={20} {...rightIcon} />
          </Touchable>
        )}
      </View>
    </View>
  );
}

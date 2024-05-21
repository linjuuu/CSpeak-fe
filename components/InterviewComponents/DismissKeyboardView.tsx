import React, { ReactNode } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface DismissKeyboardViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DismissKeyboardView = ({ children, style }: DismissKeyboardViewProps) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView style={style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;

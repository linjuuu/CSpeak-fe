import React from "react";
import { ImageBackground,Text } from "react-native";

export default function Other() {
    const BackgroundImage = require("../src/assets/background.png");
  return (
    <ImageBackground source={BackgroundImage} style={{ flex: 1 }}>
      <Text>ㄴㄴ</Text>
    </ImageBackground>
  );
}

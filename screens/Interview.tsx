import React from "react";
import { ImageBackground } from "react-native";
import ChattingBoard from "../src/components/ChattingBoard";
import ChattingTopBar from "../src/components/ChattingTopbar";
export default function Interview() {
  const BackgroundImage = require("../src/assets/background.png");
  return (
    <ImageBackground source={BackgroundImage} style={{ flex: 1 }}>
      <ChattingTopBar />
      <ChattingBoard />
    </ImageBackground>
  );
}

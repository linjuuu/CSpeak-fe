import React from "react";
import { ImageBackground } from "react-native";
import ChattingBoard from "../components/InterviewComponents/ChattingBoard";
import ChattingTopbar from "../components/InterviewComponents/ChattingTopbar";
export default function Interview() {
  const BackgroundImage = require("../assets/background1.png");
  return (
    <ImageBackground source={BackgroundImage} style={{ flex: 1 }}>
      <ChattingTopbar />
      <ChattingBoard />
    </ImageBackground>
  );
}

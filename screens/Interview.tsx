import React from "react";
import { ImageBackground } from "react-native";
import ChattingBoard from "../components/InterviewComponents/ChattingBoard";
import ChattingTopbar from "../components/InterviewComponents/ChattingTopbar";
import CSFinishButton from "../components/InterviewComponents/CSFinishButton";
export default function Interview() {
  const BackgroundImage = require("../assets/background2.png");
  return (
    <ImageBackground source={BackgroundImage} style={{ flex: 1 }}>
      <CSFinishButton/>
      <ChattingTopbar />
      <ChattingBoard />
    </ImageBackground>
  );
}

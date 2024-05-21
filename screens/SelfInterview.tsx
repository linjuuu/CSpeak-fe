import React from "react";
import { ImageBackground } from "react-native";
import ChattingTopbar from "../components/InterviewComponents/ChattingTopbar";
import SelfChattingBoard from "../components/InterviewComponents/SelfChattingBoard";
import SelfFinishButton from "../components/InterviewComponents/SelfFinishButton";

export default function Interview() {
  const BackgroundImage = require("../assets/background2.png");

  return (
    <ImageBackground source={BackgroundImage} style={{ flex: 1 }}>
      <SelfFinishButton/>
      <ChattingTopbar />
      <SelfChattingBoard />
    </ImageBackground>
  );
}
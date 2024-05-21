import { StyleSheet, ImageBackground } from "react-native";
import KakaoLoginButton from "../src/components/KakaoLoginButton";
export default function Login() {
  const BackgroundImage = require("../src/assets/background.png");

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <KakaoLoginButton />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

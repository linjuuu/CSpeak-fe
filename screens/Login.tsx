import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import AppLogo from "../components/LoginComponents/Applogo";
import LoginButton from "../components/LoginComponents/LoginButton";

const Login = () => {
  const BackgroundImage = require('../assets/background1.png');

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <AppLogo />
      <LoginButton />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;

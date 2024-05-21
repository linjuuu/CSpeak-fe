import { StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as KakaoLogins from "@react-native-seoul/kakao-login";
import LoginTest from "../contexts/LoginTest";
import { useNavigation } from "@react-navigation/native";

const LoginButton = require("../assets/login_button.png");

export default function KakaoLoginButton() {
  const [idToken, setIdToken] = useState(null); // idToken 상태값 설정
  const navigation = useNavigation();
  const signInWithKakao = async () => {
    try {
      const token = await KakaoLogins.login();
      console.log(token)
      // idToken 상태값 업데이트
      setIdToken(token.idToken);
      navigation.navigate('Interview');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={signInWithKakao}>
      <Image source={LoginButton} style={styles.login} />
      {idToken && <LoginTest idToken={idToken} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  login: {
    width: 350,
    height: 50,
  },
});

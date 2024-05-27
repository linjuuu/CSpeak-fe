import { StyleSheet, ImageBackground, Alert } from "react-native";
import AppLogo from "../components/LoginComponents/Applogo";
import LoginButton from "../components/LoginComponents/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAccessToken } from "../store/actions";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import withRedux from "../store/withRedux";

const Login = () => {
  const BackgroundImage = require('../assets/background1.png');
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
      const checkToken = async() => {
          if (!accessToken && refreshToken) {
              console.log("리프레시 토큰 : ", refreshToken);
              try {
                  const response = await axios.post(
                      'http://43.201.164.254:8080/api/v1/reissue', 
                      {}, 
                      {
                          headers: {
                              Authorization: `Bearer ${refreshToken}`,
                          }
                      }
                  );
                  const newAccessToken = response.data.data.accessToken;
                  dispatch(setAccessToken(newAccessToken));
                  console.log('액세스 토큰이 만료되어 리프레시토큰으로 갱신 후 Home으로 이동');
                  navigation.replace('Home');
              } catch (error) {
                  console.error('Error while refreshing token:', error);
                  console.error('서버 응답 내용:', error.response.data); // 서버 응답 내용 추가 출력
                  Alert.alert("Session expired", "Please log in again.");
              }
          }else if (accessToken){
                navigation.replace('Home');
          }
      };
      checkToken();
  }, [accessToken, refreshToken, dispatch]);


  return (
      <ImageBackground source={BackgroundImage} style={styles.background}>
          <AppLogo/>
          <LoginButton/>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background : { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

export default withRedux(Login);
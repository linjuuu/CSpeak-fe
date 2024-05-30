import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppLogo from "../components/LoginComponents/Applogo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import withRedux from "../store/withRedux";
import EncryptedStorage from 'react-native-encrypted-storage';
import { setAccessToken } from "../store/actions";

const TokenCheck = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const getRefreshToken = async () => {
    try {
      const token = await EncryptedStorage.getItem('refreshToken');
      if (token !== null) {
        setRefreshToken(token);
      }
    } catch (error) {
      console.error('리프레시 토큰을 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    getRefreshToken();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      setTimeout(async () => {
        try {
          if (accessToken) {
            navigation.replace('Home');
          } else if (refreshToken) {
            const response = await axios.post(
              'http://43.201.164.254:8080/api/v1/reissue',
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                }
              }
            );
            const newAccessToken = response.data.data.authTokens.accessToken;
            const newRefreshToken = response.data.data.authTokens.refreshToken;
            dispatch(setAccessToken(newAccessToken));
            await EncryptedStorage.setItem('refreshToken', newRefreshToken);
            console.log('액세스 토큰이 만료되어 리프레시토큰으로 갱신 후 Home으로 이동');
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        } catch (error) {
          console.error('서버 응답 내용:', error.response?.data); // 서버 응답 내용 추가 출력
          navigation.replace('Login'); // 에러 발생 시 로그인 페이지로 이동
        }
      }, 1500); // 1.5초 지연
    };

    if (refreshToken !== null || accessToken !== null) {
      checkToken();
    }
  }, [accessToken, refreshToken, dispatch]);

  return (
    <View style={styles.background}>
      <AppLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withRedux(TokenCheck);
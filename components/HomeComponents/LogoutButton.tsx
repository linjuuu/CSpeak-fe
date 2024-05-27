import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { setAccessToken, setRefreshToken } from '../../store/actions';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const accessToken = useSelector((state: any) => state.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://43.201.164.254:8080/api/v1/member/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Logout successful:', response.data);
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error.response.data);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말 로그아웃하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "확인",
          onPress: handleLogout
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.buttonLocate} onPress={confirmLogout}>
      <Image source={require("../../assets/logout_button.png")} style={styles.logout_button} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLocate: {
    position: 'absolute',
    top: '7%',
    left: 20,
    zIndex: 999,
  },
  logout_button: {
    width: 30,
    height: 30,
  },
});

export default withRedux(LogoutButton);

import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { setAccessToken, setRefreshToken} from '../../store/actions';

const LogoutButton = () => {
  // 액세스 토큰을 Redux 스토어에서 가져옵니다.
  const accessToken = useSelector((state: any) => state.accessToken);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/member/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 로그아웃 성공 후 처리
      console.log('Logout successful:', response.data);
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
    } catch (error) {
      // 오류 처리
      console.error('Error during logout:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.buttonLocate} onPress={handleLogout}>
      <Text style={styles.buttonText}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLocate: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999, // 다른 요소 위로 버튼을 띄우기 위한 zIndex 설정
  },
  buttonText: {
    fontSize: 12,
    color: 'black', // 텍스트 색상
  },
});

export default withRedux(LogoutButton);

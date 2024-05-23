import React from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { setInitSelf, setSelfID } from '../../store/actions';
import { useNavigation } from '@react-navigation/native';

const SelfFinishButton = () => {
  // 액세스 토큰을 Redux 스토어에서 가져옵니다.
  const accessToken = useSelector((state: any) => state.accessToken);
  const selfID = useSelector((state: any) => state.selfID);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const handleFinish = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/member/end/chat/self_intro/${selfID}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('chatting finish :', response.data);
      dispatch(setSelfID(""));
      dispatch(setInitSelf(""));
      navigation.replace('/Home');
    } catch (error) {
      // 오류 처리
      console.error('Error chatting finish :', error);
    }
  };

  return (
    <TouchableOpacity style={styles.buttonLocate} onPress={handleFinish}>
      <Text style={styles.buttonText}>면접 종료</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLocate: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999, // 다른 요소 위로 버튼을 띄우기 위한 zIndex 설정
  },
  buttonText: {
    fontSize: 12,
    color: 'black', // 텍스트 색상
  },
});

export default withRedux(SelfFinishButton);

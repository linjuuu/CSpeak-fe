import React from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setCsID, setInitCS, setInitSelf, setTopicCS } from '../../store/actions';
import { AntDesign } from '@expo/vector-icons';

const SelfFinishButton = () => {
  // 액세스 토큰을 Redux 스토어에서 가져옵니다.
  const accessToken = useSelector((state: any) => state.accessToken);
  const selfID = useSelector((state: any) => state.selfID);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleFinish = async () => {
    try {
      const response = await axios.post(`http://43.201.164.254:8080/api/v1/member/end/chat/self_intro/${selfID}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('chatting finish :', response.data);
      dispatch(setCsID(""));
      dispatch(setInitCS(""));
      dispatch(setTopicCS(""));
      dispatch(setInitSelf(""));
      navigation.replace('Home');
    } catch (error) {
      // 오류 처리
      console.error('Error chatting finish :', error.response.data);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "면접 종료",
      "면접을 종료하시나요?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "확인",
          onPress: handleFinish
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.buttonLocate} onPress={confirmLogout}>
      <AntDesign name = "left" size={30} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLocate: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 999, // 다른 요소 위로 버튼을 띄우기 위한 zIndex 설정
  },
  buttonText: {
    fontSize: 12,
    color: 'black', // 텍스트 색상
  },
});

export default withRedux(SelfFinishButton);

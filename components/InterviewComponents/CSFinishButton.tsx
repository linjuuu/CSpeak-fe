import React from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setCsID, setInitCS, setTopicCS } from '../../store/actions';
import { AntDesign } from '@expo/vector-icons';

const CSFinishButton = () => {
  // 액세스 토큰을 Redux 스토어에서 가져옵니다.
  const accessToken = useSelector((state: any) => state.accessToken);
  const CsID = useSelector((state: any) => state.CsID);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleFinish = async () => {
    try {
      const response = await axios.post(`http://43.201.164.254:8080/api/v1/member/end/chat/cs/${CsID}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('chatting finish :', response.data);
      dispatch(setInitCS(""));
      dispatch(setTopicCS(""));
      dispatch(setInitCS(""));
      homeOrRating();
    } catch (error) {
      // 오류 처리
      console.error('Error chatting finish :', error.response.data);
    }
  };

  const goHome = () => {
    dispatch(setCsID(""));
    navigation.replace('Home');
  }

  const goRating = () => {
    navigation.replace('CheckRating');
  }

  const homeOrRating = () => {
    Alert.alert(
      "면접이 종료되었습니다 !",
      "면접 결과를 확인하시겠습니까?",
      [
        {
          text: "홈으로",
          style: "cancel",
          onPress : goHome
        },
        {
          text: "결과 확인하기",
          onPress: goRating
        }
      ],
      { cancelable: false }
    );
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

export default withRedux(CSFinishButton);

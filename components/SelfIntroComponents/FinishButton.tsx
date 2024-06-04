import axios from 'axios';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import withRedux from '../../store/withRedux';
import { setInitSelf, setSelfID, setTopicCS } from '../../store/actions';
import { useNavigation } from '@react-navigation/native';

interface FinishButtonProps {
    introTitle: string;
    introText: string;
  }
  
  const FinishButton: React.FC<FinishButtonProps> = ({ introTitle, introText }) => {
  
    const accessToken = useSelector((state: any) => state.accessToken);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const handlePress = async () => {

      try {
          navigation.replace('SelfInterview');
          const response = await axios.post(`http://43.201.164.254:8080/api/v1/member/initial/chat/self_intro`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: {
              question: introTitle,
              content : introText,
            },
          });
          console.log("첫질문 : ", response.data.data.question);
          console.log("채팅창 고유 ID : ", response.data.data.chatRoomId);
          dispatch(setSelfID(response.data.data.chatRoomId));
          dispatch(setInitSelf(response.data.data.question));
          dispatch(setTopicCS("자기소개서"));
      } catch (error) {
          console.error('Error while self intro in:', error.response.data);
      }
    }

    return (
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>면접 시작하기</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily : "AppleSDGothicNeoM",
  },
});

export default withRedux(FinishButton);
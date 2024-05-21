import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import withRedux from '@/store/withRedux';
import { setInitSelf, setSelfID } from '@/store/actions';

interface FinishButtonProps {
    introTitle: string;
    introText: string;
  }
  
  const FinishButton: React.FC<FinishButtonProps> = ({ introTitle, introText }) => {
  
    const accessToken = useSelector((state: any) => state.accessToken);
    const router = useRouter();
    const dispatch = useDispatch();
    
    const handlePress = async () => {

      try {
          const response = await axios.get(`http://localhost:8080/api/v1/member/initial/chat/self_intro?question=${introTitle}&content=${introText}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("첫질문 : ", response.data.data.question);
          console.log("채팅창 고유 ID : ", response.data.data.chatRoomId);
          dispatch(setSelfID(response.data.data.chatRoomId));
          dispatch(setInitSelf(response.data.data.question));
      } catch (error) {
          console.error('Error while self intro in:', error);
      }
      router.push('/SelfInterview');
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
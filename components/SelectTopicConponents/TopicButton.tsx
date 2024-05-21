import axios from 'axios';
import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import withRedux from '@/store/withRedux';
import { setCsID, setInitCS, setTopicCS } from '@/store/actions';

interface TopicButtonProps {
  topic: string;
  imageSource: any;
}

const TopicButton: React.FC<TopicButtonProps> = ({ topic, imageSource }) => {
  const router = useRouter();
  const accessToken = useSelector((state: any) => state.accessToken);
  const dispatch = useDispatch();
  const callAPI = async (topic: string) => {
    
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/member/initial/chat/cs/${topic}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Initial Chat Response:", response.data);
        console.log('질문 : ' , response.data.data.question);
        dispatch(setCsID(response.data.data.chatRoomId));
        dispatch(setTopicCS(topic));
        dispatch(setInitCS(response.data.data.question));
    } catch (error) {
        console.error('Error while ChatInitial in:', error);
    }

    router.push('/Interview');
  }
  
  return (
    <TouchableOpacity style={styles.button} onPress={() => callAPI(topic)}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{topic}</Text>
    </TouchableOpacity>
  );
}; 

const styles = StyleSheet.create({
  button: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  image: {
    width: '70%',
    height: '70%',
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default withRedux(TopicButton);
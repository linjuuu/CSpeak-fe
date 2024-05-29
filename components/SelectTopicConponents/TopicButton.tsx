import axios from 'axios';
import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import withRedux from '../../store/withRedux';
import { setCsID, setInitCS, setTopicCS } from '../../store/actions';
import { useNavigation } from '@react-navigation/native';

interface TopicButtonProps {
  topic: string;
  imageSource: any;
}

const TopicButton: React.FC<TopicButtonProps> = ({ topic, imageSource }) => {
  const accessToken = useSelector((state: any) => state.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const callAPI = async (topic: string) => {
    
    try {
        navigation.replace('Interview');
        const response = await axios.get(`http://43.201.164.254:8080/api/v1/member/initial/chat/cs/${topic}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        dispatch(setCsID(response.data.data.chatRoomId));
        dispatch(setTopicCS(topic));
        dispatch(setInitCS(response.data.data.question));
    } catch (error) {
        console.error('Error while ChatInitial in:', error.response.data);
    }

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
    width: '90%',
    margin : 10,
    aspectRatio: 0.8,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    opacity : 0.9
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
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopicButton from './TopicButton';

const TopicButtonContainer = () => {

  return (
    <View style={styles.container}>
      <TopicButton topic="컴퓨터네트워크" imageSource={require('../../assets/Network.png')} aspectRatio =  {1.2}/>
      <TopicButton topic="운영체제" imageSource={require('../../assets/OS.png')} aspectRatio =  {0.8}/>
      <TopicButton topic="자료구조" imageSource={require('../../assets/DataStructure.png')} aspectRatio =  {0.8}/>
      <TopicButton topic="데이터베이스" imageSource={require('../../assets/Database.png')} aspectRatio =  {1.2}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop : '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems : "center",
    padding: 10,
  },
});

export default TopicButtonContainer;
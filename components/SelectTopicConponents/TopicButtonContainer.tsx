import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopicButton from './TopicButton';

const TopicButtonContainer = () => {

  return (
    <View style={styles.container}>
      <TopicButton topic="컴퓨터네트워크" imageSource={require('../../assets/Network.png')} />
      <TopicButton topic="운영체제" imageSource={require('../../assets/OS.png')} />
      <TopicButton topic="자료구조" imageSource={require('../../assets/DataStructure.png')} />
      <TopicButton topic="데이터베이스" imageSource={require('../../assets/Database.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default TopicButtonContainer;
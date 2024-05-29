import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopicButton from './TopicButton';

const TopicButtonContainer = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.leftColumn, styles.shiftDown]}>
        <TopicButton topic="컴퓨터네트워크" imageSource={require('../../assets/Network.png')} aspectRatio={1.3} />
        <TopicButton topic="운영체제" imageSource={require('../../assets/OS.png')} aspectRatio={0.7} />
      </View>
      <View style={[styles.rightColumn, styles.shiftUp]}>
        <TopicButton topic="알고리즘" imageSource={require('../../assets/DataStructure.png')} aspectRatio={0.7} />
        <TopicButton topic="데이터베이스" imageSource={require('../../assets/Database.png')} aspectRatio={1.3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop : 30,
  },
  leftColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  shiftDown: {
    transform: [{ translateY: 30 }], // 왼쪽 열을 아래로 이동
  },
  shiftUp: {
    transform: [{ translateY: -30 }], // 오른쪽 열을 위로 이동
  },
});

export default TopicButtonContainer;

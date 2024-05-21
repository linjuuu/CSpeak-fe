import React, { useState } from'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from'react-native';
import ExplainText from './ExplainText';
import { useNavigation } from '@react-navigation/native';

const SelectBar: React.FC = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <View style={styles.container}>
        <ExplainText/>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {[
            {
              image: require('../../assets/selectInterviewList.png'),
              text: '대화목록\n확인하기',
              onPress: () => navigation.navigate('ChattingRetrieve'),
            },
            {
              image: require('../../assets/selectIntroduce.png'),
              text: '자기소개서 \n면접 시작하기',
              onPress: () => navigation.navigate('WriteSelfIntro'),
            },
            {
              image: require('../../assets/selectCSInterview.png'),
              text: 'CS면접\n시작하기',
              onPress: () => navigation.navigate('SelectTopic'),
            },
          ].map((button, index) => (
            <View key={index} style={[
              styles.buttonContainer,
              selectedIndex === index? styles.selectedButton : styles.unselectedButton,
            ]}>
              <TouchableOpacity onPress={() => {
                setSelectedIndex(index);
                button.onPress();
              }}>
                <Image style={styles.image} source={button.image} />
                <Text style={styles.selectText}>{button.text}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center'
  },
  buttonContainer: {
    borderRadius: 50, 
    margin: 10, 
    padding: 20,
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 255, 255)',
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  image: {
    width: 150,
    height: 150,
  },
  selectText: {
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    maxWidth: 200,
    fontSize: 12,
    fontFamily : "AppleSDGothicNeoM", 
  }
});

export default SelectBar;
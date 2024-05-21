import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import ExplainText from './ExplainText';
import { useNavigation } from '@react-navigation/native';

const SelectBar: React.FC = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = [
    {
      image: require('../../assets/selectCSInterview.png'),
      text: 'CS면접\n시작하기',
      onPress: () => navigation.navigate('SelectTopic'),
    },
    {
      image: require('../../assets/selectIntroduce.png'),
      text: '자기소개서 \n면접 시작하기',
      onPress: () => navigation.navigate('WriteSelfIntro'),
    },
    {
      image: require('../../assets/selectInterviewList.png'),
      text: '대화목록\n확인하기',
      onPress: () => navigation.navigate('ChattingRetrieve'),
    },
  ];

  return (
    <>
      <View style={styles.backgroundContainer}>
        <View style={styles.foregroundContainer}>
          <ExplainText />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {buttons.map((button, index) => (
              <View
                key={index}
                style={[
                  styles.buttonContainer,
                  selectedIndex === index ? styles.selectedButton : styles.unselectedButton,
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index);
                    button.onPress();
                  }}
                >
                  <Image style={styles.image} source={button.image} />
                  <Text style={styles.selectText}>{button.text}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  foregroundContainer: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 50,
    margin: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  unselectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
    fontFamily: 'AppleSDGothicNeoM',
  },
});

export default SelectBar;

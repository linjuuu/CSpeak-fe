import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import ExplainText from './ExplainText';
import { useNavigation } from '@react-navigation/native';

const SelectBar: React.FC = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handlePress = (index: number, onPress: () => void) => {
    setSelectedIndex(index);
    onPress();
    setTimeout(() => {
      setSelectedIndex(null);
    }, 1000); 
  };

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
                  onPress={() => handlePress(index, button.onPress)}
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  foregroundContainer: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 100,
    margin: 20,
    marginTop: -40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 2, // 테두리 두께
    borderColor: '#ccc', // 테두리 색상
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  unselectedButton: {
    backgroundColor: 'rgba(230, 230, 230, 0.5)',
  },
  image: {
    width: 150,
    height: 200,
    overflow: 'visible',
  },
  selectText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 200,
    fontSize: 13,
    fontFamily: 'AppleSDGothicNeoM',
  },
});

export default SelectBar;

import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import FinishButton from './FinishButton';

const InputIntroduction: React.FC = () => {
  const [introTitle , setIntroTitle] = useState('');
  const [introText , setIntroText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.titleInput} placeholder="자기소개서 문항 내용" onChangeText={(text) => setIntroTitle(text)}/>
        <View style={styles.line} />
        <TextInput style={styles.input} placeholder="자기소개를 입력해주세요" onChangeText={(text) => setIntroText(text)} multiline/>
      </View>
      <FinishButton introTitle={introTitle} introText={introText} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: '100%',
    height : '70%',
    borderRadius: 10,
    padding: 20,
  },
  titleInput: {
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  },
  line: {
    backgroundColor: 'gray',
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderColor: 'lightgray',
    width: '100%',
    height: '80%',
    textAlignVertical: 'top',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  
});

export default InputIntroduction;
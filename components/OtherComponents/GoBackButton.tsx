import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Expo의 아이콘 라이브러리를 사용하여 뒤로가기 아이콘을 가져옵니다.

const GoBackButton = () => {

    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999, // 다른 요소 위로 버튼을 띄우기 위한 zIndex 설정
    },
});

export default GoBackButton;

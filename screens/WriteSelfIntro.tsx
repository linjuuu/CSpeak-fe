import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import GoBackButton from '../components/OtherComponents/GoBackButton'; // GoBackButton 컴포넌트를 가져옵니다.
import InputIntroduction from '../components/SelfIntroComponents/InputIntroduction';

export default function WriteSelfIntro() {
    const BackgroundImage = require('../assets/background2.png');

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <GoBackButton /> 
            <Text style={styles.topText}>자기소개를 작성해주세요.</Text>
            <InputIntroduction />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
    },
    topText: {
        fontSize: 16,
        color: 'white',
        marginTop: 60,
        marginBottom: 40,
        fontWeight: 'bold',
        fontFamily : "AppleSDGothicNeoM",
    },
});

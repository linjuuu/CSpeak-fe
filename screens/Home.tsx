import React from 'react';
import { ImageBackground, StyleSheet, Image } from "react-native";
import SelectBar from "../components/HomeComponents/SelectBar";
import MenuBar from "../components/HomeComponents/MenuBar"; // MenuBar 컴포넌트 추가

export default function Home() {
    const BackgroundImage = require('../assets/background2.png');
    const Character = require('../assets/character0.png');

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}> 
            <MenuBar />
            <Image source={Character} style={styles.character}/>
            <SelectBar/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    character: {
        marginTop: '20%',
        width: '80%',
        height: '30%',
        resizeMode: 'contain',
        zIndex: 1,
    }
});

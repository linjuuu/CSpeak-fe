import {ImageBackground,StyleSheet, Image } from "react-native"
import SelectBar from "../components/HomeComponents/SelectBar";
import LogoutButton from "../components/HomeComponents/LogoutButton";

export default function Home() {

    const BackgroundImage = require('../assets/background2.png')
    const Character = require('../assets/character0.png');

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}> 
            <LogoutButton/>
            <Image source={Character} style = {styles.character}/>
            <SelectBar/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background : { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
    },

    character : {
        marginTop : '20%',
        width : 270,
        height : 250,
    }
});
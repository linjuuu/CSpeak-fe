import { ImageBackground, StyleSheet, Text} from "react-native";
import PrintRating from "../components/ChattingRetrieveComponents/PrintRating";

export default function CheckRating() {
    const BackgroundImage = require('../assets/background2.png')
    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <Text style = {styles.topText}>면접 평가</Text>
            <PrintRating/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background : { 
      flex: 1, 
    },

    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily : 'AppleSDGothicNeoM',
        fontSize: 18,
        color: 'white',  // 텍스트 색상을 흰색으로 설정
        marginTop: 80,  // 화면 상단부터의 간격을 조정
      },

  });
import { ImageBackground, StyleSheet, Text} from "react-native";
import SelectList from "../components/ChattingRetrieveComponents/SelectList";

export default function ChattingRetrieve() {
    const BackgroundImage = require('../assets/background2.png')
    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <Text style = {styles.topText}>면접 평가</Text>
            <SelectList/>
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
        fontSize: 18,
        color: 'white',  // 텍스트 색상을 흰색으로 설정
        marginTop: 130,  // 화면 상단부터의 간격을 조정
      },

  });
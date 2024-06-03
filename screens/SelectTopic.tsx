import { Text,ImageBackground,StyleSheet } from "react-native"
import TopicButtonContainer from "../components/SelectTopicConponents/TopicButtonContainer";

export default function SelectTopic() {

    const BackgroundImage = require('../assets/background2.png')

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}> 
            <Text style = {styles.topText}>주제를 선택해주세요.</Text>
            <TopicButtonContainer/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background : { 
      flex: 1, 
      alignItems: 'center',
    },
    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        maxWidth: 200,
        fontSize: 18,
        color: 'white',  // 텍스트 색상을 흰색으로 설정
        marginTop: 130,  // 화면 상단부터의 간격을 조정
        marginBottom : 30,
      },

});
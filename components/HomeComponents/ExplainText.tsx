import withRedux from "../../store/withRedux";
import { Text,StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ExplainText = () => {
    const username = useSelector((state: any) => state.username);
    
    return(
        <>
            <Text style = {styles.helloText}>HELLO</Text>
            <Text style = {styles.nameText}>{username}님</Text>
            <Text style = {styles.text}>원하시는 대화 주제를 선택하세요.</Text>
        </>
    )

}

const styles = StyleSheet.create({
    helloText : {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft : 30,
        marginTop : 30,
        color: "#5871F3", // 하늘색
        fontFamily: "Cafe24Ssurround"
    }, 

    nameText : {
        fontSize: 30,
        marginLeft : 30,
        fontFamily : "AppleSDGothicNeoM"
    },

    text : {
        fontSize: 15,
        marginLeft : 30,
        marginTop : 10,
        fontFamily : "AppleSDGothicNeoM"
    }
  }
);

export default withRedux(ExplainText);
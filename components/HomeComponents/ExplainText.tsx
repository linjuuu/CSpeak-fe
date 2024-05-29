import { useEffect, useState } from "react";
import withRedux from "../../store/withRedux";
import { Text,StyleSheet } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

const ExplainText = () => {
    const [username, setUsername] = useState(null);
    const getUsername = async () => {
        try {
          const username = await EncryptedStorage.getItem('username');
          if (username !== null) {
            setUsername(username);
          }
        } catch (error) {
          console.error('리프레시 토큰을 가져오는 데 실패했습니다:', error);
        }
      };
    
      useEffect(() => {
        getUsername();
      }, []);
    
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
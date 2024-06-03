import { StyleSheet, Pressable, Image, View } from "react-native";
import { useDispatch } from "react-redux";
import * as KakaoLogins from "@react-native-seoul/kakao-login";
import axios from 'axios';
import { setAccessToken} from '../../store/actions';
import withRedux from "../../store/withRedux";
import { useNavigation } from "@react-navigation/native";
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginButton = () => {
    const ButtonImage = require('../../assets/login_button.png');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const kakaoLogin = async () => {
        const token = await KakaoLogins.login();
        const idToken = token.idToken;
     
        try {
            const response = await axios.post(
                `http://43.201.164.254:8080/api/v1/kakao/login?idToken=${encodeURIComponent(idToken)}`,
                {}
            );
            const accessToken = response.data.data.authTokens.accessToken;
            const refreshToken = response.data.data.authTokens.refreshToken;
            const username = response.data.data.nickname;

            dispatch(setAccessToken(accessToken));
            await EncryptedStorage.setItem('refreshToken' , refreshToken);
            await EncryptedStorage.setItem('username' , username);
            
            console.log(username, "의 로그인");
            navigation.replace("Home"); 
        } catch (error) {
            console.error('Error while logging in:', error);
        }
    };

    return (
        <Pressable onPress={kakaoLogin} style={styles.button}>
            <View style={styles.buttonContainer}>
                <Image source={ButtonImage} style={styles.login} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 100,
    },
    buttonContainer: {
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    login: {
        width: 350,
        height: 50,
        borderRadius : 15,
    },
});

export default withRedux(LoginButton);
import { StyleSheet, Pressable, Image, View } from "react-native";
import { useDispatch } from "react-redux";
import * as KakaoLogins from "@react-native-seoul/kakao-login";
import axios from 'axios';
import { setAccessToken, setRefreshToken, setUsername } from '../../store/actions';

export default function LoginButton() {
    const ButtonImage = require('../../assets/login_button.png');
    const dispatch = useDispatch();

    const kakaoLogin = async () => {
        console.log('카카오 로그인 버튼 눌림');
        const token = await KakaoLogins.login();
        const idToken = token.idToken;
        
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/kakao/login?idToken=${encodeURIComponent(idToken)}`, // URL 쿼리 파라미터로 idToken 추가
                null, // 본문은 null로 설정
            );
            const accessToken = response.data.data.authTokens.accessToken;
            const refreshToken = response.data.data.authTokens.refreshToken;
            const username = response.data.data.nickname;
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setUsername(username));
            console.log(username, "로그인 성공");
            router.push("/Home");
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
        marginTop: 250,
    },
    buttonContainer: {
        elevation: 5, // 그림자의 깊이를 조절합니다.
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
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

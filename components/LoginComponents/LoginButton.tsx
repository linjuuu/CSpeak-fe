import { StyleSheet, Pressable, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setAccessToken, setRefreshToken, setUsername } from '../../store/actions';

export default function LoginButton() {
    const ButtonImage = require('../../assets/login_button.png');
    const router = useRouter();
    const dispatch = useDispatch();

    const kakaoLogin = async () => {
        console.log('카카오 로그인 버튼 눌림');
        const token = {"accessToken": "GXilwyRGnYkfRNYH1iIcokR6cXJPAuAOAAAAAQo9dZsAAAGPk4E-TQGXonZVdqHq", "accessTokenExpiresAt": "2024-05-20 21:57:50", "idToken": "eyJraWQiOiI5ZjI1MmRhZGQ1ZjIzM2Y5M2QyZmE1MjhkMTJmZWEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1YWQ1MDFiNjc5NTllZjY1Y2Q2MTEyMTY1ZWU1YTc1NiIsInN1YiI6IjM0NjAyNzIwOTUiLCJhdXRoX3RpbWUiOjE3MTYxNjY2NzEsImlzcyI6Imh0dHBzOi8va2F1dGgua2FrYW8uY29tIiwibmlja25hbWUiOiLrhbjspIDsnbwiLCJleHAiOjE3MTYyMDk4NzEsImlhdCI6MTcxNjE2NjY3MSwicGljdHVyZSI6Imh0dHA6Ly90MS5rYWthb2Nkbi5uZXQvYWNjb3VudF9pbWFnZXMvZGVmYXVsdF9wcm9maWxlLmpwZWcudHdnLnRodW1iLlIxMTB4MTEwIn0.n7GNqGDVObDKHNqKNlfzDmzEQjF1aaoPFfiE7LvS1nGg6koWfEt7j7CnEozvDjKapqtiMTQulsvtgk2054IzTemv5nP4eGI_ZkS9sH403dvpTinP85itO26fol6X3j1kuvhfzQryTk1xfqk3Q3lQZmu37G0l4uQ99qeKbUAQg1VE1s_csK3EFtNvU1y2qWU_qxtWJVkGF5-NbG0WVy_vNCKKKz3hZhRGL9w6t1pcZQgF2ZcgB7JjCLCz6HI6yallSj_zPuO6jOprz2h3r6jHsruXDtMOlkVeQNnSztUwdHB4skkNcC8FEbfXMBSJZnweiSuYT393-jucevyLy2Xb-A", "refreshToken": "-XvSAZB2zEZaftLPIblMYHpycxgzkOI0AAAAAgo9dZsAAAGPk4E-SQGXonZVdqHq", "refreshTokenExpiresAt": "2024-07-19 09:57:50", "scopes": ["profile_image", "openid", "profile_nickname"]};
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

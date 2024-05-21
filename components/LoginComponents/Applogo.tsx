import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";


//앱 로고 설정 필요한 상태.
export default function AppLogo() {
    return(
        <>
            <Text style = {styles.logo}>CSpeak</Text>
        </>
    )
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 30,
        color: "#5871F3", // 하늘색
        fontWeight: "bold", // 굵게
        textAlign: "center", // 가운데 정렬
        fontFamily : 'Cafe24Ssurround'
    },
});
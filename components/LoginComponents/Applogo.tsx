import { StyleSheet, Image } from "react-native";

export default function AppLogo() {
    return(
        <>
            <Image style={styles.logo} source={require('../../assets/applogo.png')}/>
        </>
    )
}

const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

});
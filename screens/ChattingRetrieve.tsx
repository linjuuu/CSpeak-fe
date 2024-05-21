import { ImageBackground, StyleSheet} from "react-native";
import SelectList from "../components/ChattingRetrieveComponents/SelectList";

export default function ChattingRetrieve() {
    const BackgroundImage = require('../assets/background2.png')
    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <SelectList/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background : { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
  });
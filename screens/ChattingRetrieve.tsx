import { ImageBackground, StyleSheet} from "react-native";
import GoBackButton from "../components/OtherComponents/GoBackButton";
import SelectList from "../components/ChattingRetrieveComponents/SelectList";

export default function ChattingRetrieve() {
    const BackgroundImage = require('../assets/background2.png')
    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <GoBackButton/>
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
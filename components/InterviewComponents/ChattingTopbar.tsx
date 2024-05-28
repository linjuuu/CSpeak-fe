import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import withRedux from "../../store/withRedux";
import CSFinishButton from "./CSFinishButton";
const ChattingTopBar = () => {
  const topicCS = useSelector((state: any) => state.topicCS);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/character1.png")} // 이미지 경로 (임시 경로)
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{topicCS} 면접관</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // 화면 상단에 정렬
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 60,
  },

  profileName: {
    fontSize: 17,
    marginLeft : 8,
    fontWeight: "bold",
  },
});

export default withRedux(ChattingTopBar);
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import withRedux from "../../store/withRedux";

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
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 40,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default withRedux(ChattingTopBar);
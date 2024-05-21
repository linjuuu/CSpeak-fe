import { View, Text, Image, StyleSheet } from "react-native";

export default function ChattingTopBar() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/character1.png")} // 이미지 경로 (임시 경로)
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>운영체제 면접관</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginLeft: 60,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

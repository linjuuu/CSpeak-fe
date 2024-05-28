import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

interface Props {
  onSendMessage: (message: string) => void;
}

const ChattingInputBar: React.FC<Props> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.length != 0)  {
        onSendMessage(message);
        setMessage("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="메시지를 입력하세요"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendText}>전송</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal : 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 30, // 둥글게 만들기 위해 수정
    shadowColor: "#000", // 그림자 효과 추가
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // 안드로이드에서의 그림자 효과를 위해 추가
  },
  input: {
    flex: 1,
    height: 40, // 입력 폼을 위로 더 길게 수정
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#ffcccb", // 연한 핑크색으로 변경
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChattingInputBar;
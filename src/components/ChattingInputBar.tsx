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
    onSendMessage(message);
    setMessage("");
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    position: "absolute",
    bottom: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChattingInputBar;

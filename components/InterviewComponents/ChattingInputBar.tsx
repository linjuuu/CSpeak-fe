import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
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

  const sendMessageByVoice = () => {
    console.log("음성 전송");
  }

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.micButton} onPress={sendMessageByVoice}>
        <Image source={require("../../assets/microphone.png")} style = {styles.sendImage}/>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="메시지를 입력하세요"
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Image source={require("../../assets/send.png")} style = {styles.sendImage}/>
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
    borderRadius: 30, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  
  input: {
    flex: 1,
    height: 40, // 입력 폼을 위로 더 길게 수정
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  micButton: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  sendButton: {
    backgroundColor: "#ffcccb", // 연한 핑크색으로 변경
    opacity : 0.7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginRight: 10, // 오른쪽 여백을 추가하여 마이크와 전송 버튼 사이의 간격을 조절
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sendImage : {
    width : 20,
    height : 20,
    opacity : 1,
  }
});

export default ChattingInputBar;

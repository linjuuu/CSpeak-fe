import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import ChattingInputBar from "./ChattingInputBar";
import axios from "axios";
import { useSelector } from "react-redux";
import withRedux from "../../store/withRedux";

interface ChatMessage {
  isUser: boolean;
  message: string;
  index: string;
}

const ChattingBoard: React.FC = () => {
  const accessToken = useSelector((state: any) => state.accessToken);
  const initSelf =  useSelector((state: any) => state.initSelf);

  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { isUser: false, message: initSelf, index: "1" },
  ]);

  const sendMessage = async (newMessage: string) => {
    const updatedUserMessages = [
      ...messages,
      { isUser: true, message: newMessage, index: String(messages.length + 1) },
    ];
    setMessages(updatedUserMessages);

    try {
        //채팅방 고유ID 변수로 설정 필요함
      const response = await axios.get(`http://localhost:8080/api/v1/member/chat/self_intro/66481cbf5f49e74239d76be5?client_answer=${newMessage}.`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Chat Response:", response.data);
      setMessages(prevMessages => [
        ...prevMessages,
        { isUser: false, message: response.data.data.question, index: String(prevMessages.length + 1) },
      ]);
    } catch (error) {
      console.error('Error while Chat in:', error);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    return (
      <View
        key={item.index}
        style={[
          styles.messageContainer,
          item.isUser ? styles.userMessage : styles.computerMessage,
        ]}
      >
        <Text>{item.message}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleFlatListLayout = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={{ flex: 8 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.index}
            renderItem={renderMessage}
            onLayout={handleFlatListLayout}
            onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          />
        </View>

        <View style={styles.inputBarContainer}>
          <ChattingInputBar onSendMessage={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    top: 0,
  },
  scrollContent: {
    padding: 10,
    marginBottom: 50,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    margin: 10,
  },
  userMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-end",
  },
  computerMessage: {
    backgroundColor: "#c9e6e3",
    alignSelf: "flex-start",
  },
  inputBarContainer: {
    // backgroundColor: "yellow",
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    flex: 1,
  },
});

export default withRedux(ChattingBoard);
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
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
  const initCS = useSelector((state: any) => state.initCS);

  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (initCS) {
      setMessages([{ isUser: false, message: initCS, index: "1" }]);
    }
  }, [initCS]);

  const sendMessage = async (newMessage: string) => {
    const updatedUserMessages = [
      ...messages,
      { isUser: true, message: newMessage, index: String(messages.length + 1) },
    ];
    setMessages(updatedUserMessages);

    try {
      const response = await axios.get(`http://43.201.164.254:8080/api/v1/member/chat/cs?client_answer=${newMessage}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Chat Response:", response.data.data.question);
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

  if (!initCS) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingOverlay} />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>첫 질문을 준비하는 중 ...</Text>
      </View>
    );
  }

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 화면을 어둡게 함
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  loadingText: {
    marginTop: 20,
    color: '#ffffff',
    fontSize: 16,
  },
});

export default withRedux(ChattingBoard);

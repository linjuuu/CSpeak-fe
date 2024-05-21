import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import ChattingInputBar from "./ChattingInputBar";

interface ChatMessage {
  isUser: boolean;
  message: string;
  index: string;
}

const ChattingBoard: React.FC = () => {
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { isUser: false, message: "안녕하세요, 반가워요!", index: "1" },
    { isUser: true, message: "안녕하세요! 어떻게 도와드릴까요?", index: "2" },
    { isUser: false, message: "이 상품이 어떠냐고요?", index: "3" },
    { isUser: false, message: "괜찮은 상품이에요!", index: "4" },
  ]);

  const sendMessage = (newMessage: string) => {
    const updatedMessages = [
      ...messages,
      { isUser: true, message: newMessage, index: String(messages.length + 1) },
    ];
    setMessages(updatedMessages);
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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    // backgroundColor: "green",
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

export default ChattingBoard;

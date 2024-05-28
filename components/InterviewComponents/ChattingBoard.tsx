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
  const [typingIndicator, setTypingIndicator] = useState<string>("");

  useEffect(() => {
    if (initCS) {
      setMessages([{ isUser: false, message: initCS, index: "1" }]);
    }
  }, [initCS]);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const typingText = [".", "..", "..."];
    let typingIndex = 0;

    if (typingIndicator) {
      typingTimeout = setInterval(() => {
        typingIndex = (typingIndex + 1) % typingText.length;
        setTypingIndicator(typingText[typingIndex]);
      }, 500);
    }

    return () => clearInterval(typingTimeout);
  }, [typingIndicator]);

  const sendMessage = async (newMessage: string) => {
    const updatedUserMessages = [
      ...messages,
      { isUser: true, message: newMessage, index: String(messages.length + 1) },
    ];
    setMessages(updatedUserMessages);

    setTypingIndicator(".");

    try {
      const response = await axios.get(
        `http://43.201.164.254:8080/api/v1/member/chat/cs?client_answer=${newMessage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTypingIndicator("");
      console.log("Chat Response:", response.data.data.question);
      setMessages((prevMessages) => [
        ...prevMessages,
        { isUser: false, message: response.data.data.question, index: String(prevMessages.length + 1) },
      ]);
    } catch (error) {
      console.error("Error while Chatting:", error);
      setTypingIndicator("");
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
        <Text style={styles.messageText}>{item.message}</Text>
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
            data={typingIndicator ? [...messages, { isUser: false, message: `${typingIndicator}`, index: String(messages.length + 1) }] : messages}
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
    backgroundColor: "rgba(255, 255, 255, 0.35)",
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
    marginVertical: 15,
    borderRadius: 20, // 더 둥글게 만들기 위해 수정
    margin: 10,
    maxWidth: '75%', // 말풍선의 최대 너비를 화면의 2/3로 제한
    shadowColor: "#000", // 그림자 효과 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // 안드로이드에서의 그림자 효과를 위해 추가
  },
  userMessage: {
    backgroundColor: "#F6F3FF", // 유저 메시지를 흰색으로 변경
    alignSelf: "flex-end",
  },
  computerMessage: {
    backgroundColor: "#BBBFFF", // 컴퓨터 메시지를 회색으로 변경
    alignSelf: "flex-start",
  },
  messageText: {
    flexWrap: 'wrap',
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

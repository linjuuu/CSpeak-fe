import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, SafeAreaView, Platform, PermissionsAndroid } from "react-native";
import Voice from "@react-native-voice/voice";

const Test = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    const androidPermissionChecking = async () => {
      if (Platform.OS === "android") {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        console.log("Android permission check: ", hasPermission);
      }
    };
    androidPermissionChecking();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (event) => {
    console.log("Recording Started...:", event);
  };

  const onSpeechResults = (event) => {
    console.log("Speech Results:", event);
    const text = event.value[0];
    setRecognizedText(text);
  };

  const onSpeechError = (error) => {
    console.log("onSpeechError:", error);
  };

  const startListening = async () => {
    console.log("Starting to listen...");
    setIsListening(true);
    try {
      await Voice.start("ko-KR");
    } catch (error) {
      console.log("startListening error: ", error);
    }
  };

  const stopListening = async () => {
    console.log("Stopping listening...");
    try {
      await Voice.stop();
      await Voice.cancel();
      setIsListening(false);
    } catch (error) {
      console.log("stopListening error: ", error);
    }
  };


  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={recognizedText}
          onChangeText={(text) => setRecognizedText(text)}
        />
        <TouchableOpacity
          onPress={() => {
            isListening ? stopListening() : startListening();
          }}
          style={styles.voiceButton}
        >
          {isListening ? (
            <Text style={styles.voiceButtonText}>•••</Text>
          ) : (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4980/4980251.png",
              }}
              style={{ width: 45, height: 45 }}
            />
          )}
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E0",
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: "70%",
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#EFEFEF",
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
  },
  voiceButtonText: {
    fontSize: 24,
    height: 45,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FF6969",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Test;
import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Platform, PermissionsAndroid, Text } from "react-native";
import Voice from "@react-native-voice/voice";

interface VoiceRecognitionProps {
  onResult: (text: string) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onResult }) => {
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

  const onSpeechStart = (event: any) => {
    console.log("Recording Started...:", event);
  };

  const onSpeechResults = (event: any) => {
    console.log("Speech Results:", event);
    const text = event.value[0];
    setRecognizedText(text);
    onResult(text);  // 부모 컴포넌트에 텍스트 전달
  };

  const onSpeechError = (error: any) => {
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
            source={require('../../assets/microphone.png')}
            style={{ width: 25, height: 25}}
          />
        )}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
    justifyContent : "center"
  },
  voiceButtonText: {
    fontSize: 15,
    height: 25,
  },
});

export default VoiceRecognition;
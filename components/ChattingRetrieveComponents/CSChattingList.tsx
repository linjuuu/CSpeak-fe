import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import withRedux from "../../store/withRedux";
import { useNavigation } from "@react-navigation/native";
import { setCsID, setSelfID, setTopicCS } from "../../store/actions";

const CSChattingList: React.FC = () => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const [csChats, setCsChats] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/member/chats/cs', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log("CS 전체 조회 Response:", response.data.data);
                if (Array.isArray(response.data.data.csChats)) {
                    setCsChats(response.data.data.csChats);
                } else {
                    setError("아무 대화가 없습니다");
                }
            } catch (error) {
                console.error('Error in CSChattingList:', error);
                setError("Failed to fetch chats");
            }
        };

        fetchChats();
    }, [accessToken]);

    const handleChatPress = (csID: string) => {
        dispatch(setCsID(csID));
        dispatch(setSelfID(""));
        dispatch(setTopicCS(""));
        navigation.navigate('CheckRating');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {csChats.map((chat, index) => (
                <TouchableOpacity key={chat.id} style={styles.chatContainer} onPress={() => handleChatPress(chat.id)}>
                    <Text style={styles.chatTitle}>CS 면접 {index + 1}</Text>
                    <Text>면접 날짜: {chat.createdAt}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    chatContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    chatTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
});

export default withRedux(CSChattingList);

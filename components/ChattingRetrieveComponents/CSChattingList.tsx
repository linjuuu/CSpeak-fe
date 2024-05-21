import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import withRedux from "../../store/withRedux";

const CSChattingList: React.FC = () => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const [csChats, setCsChats] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState<any | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/member/chats/cs', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log("CS 전체 조회 Response:", response.data.data);
                if (Array.isArray(response.data.data)) {
                    setCsChats(response.data.data);
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

    const fetchChatDetails = async (csID: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/member/cs/${csID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSelectedChat(response.data);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching chat details:', error);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedChat(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {csChats.map((chat, index) => (
                <TouchableOpacity key={chat.id} style={styles.chatContainer} onPress={() => fetchChatDetails(chat.id)}>
                    <Text style={styles.chatTitle}>CS Chat {index + 1}</Text>
                    <Text>CreatedAt: {chat.createdAt}</Text>
                    <Text>MemberId: {chat.memberId}</Text>
                </TouchableOpacity>
            ))}
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedChat ? (
                            <>
                                <Text style={styles.chatTitle}>Chat Details</Text>
                                <Text>CreatedAt: {selectedChat.createdAt}</Text>
                                <Text>MemberId: {selectedChat.memberId}</Text>
                                <Text>{JSON.stringify(selectedChat, null, 2)}</Text>
                            </>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default withRedux(CSChattingList);

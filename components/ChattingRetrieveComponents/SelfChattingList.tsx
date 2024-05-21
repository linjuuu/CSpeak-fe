import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, ScrollView, Modal, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import withRedux from "@/store/withRedux";

const SelfChattingList = () => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const [selfIntros, setSelfIntros] = useState<any[]>([]);
    const [selectedIntro, setSelectedIntro] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/member/chats/self_intro', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log("자소서 전체 조회 Response:", response.data.data);
                setSelfIntros(response.data.data.selfIntros);
            } catch (error) {
                console.error('Error in SelfChattingList:', error);
            }
        };

        fetchChats();
    }, [accessToken]);

    const handlePress = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/member/self_intro/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log("자소서 상세 조회 Response:", response.data);
            setSelectedIntro(response.data);
            setModalVisible(true);
        } catch (error) {
            console.error('Error in handlePress:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {selfIntros.map((intro, index) => (
                <View key={intro.id} style={styles.buttonContainer}>
                    <Button
                        title={`자소서 ${index + 1}`}
                        onPress={() => handlePress(intro.id)}
                    />
                </View>
            ))}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>자소서 상세 내용</Text>
                        {selectedIntro && (
                            <>
                                <Text>제목: {selectedIntro.title}</Text>
                                <Text>내용: {selectedIntro.content}</Text>
                                {/* Add more fields as necessary */}
                            </>
                        )}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default withRedux(SelfChattingList);

import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import withRedux from "../../store/withRedux";
import { useNavigation } from "@react-navigation/native";
import { setCsID, setSelfID, setTopicCS } from "../../store/actions";
import character1 from '../../assets/character1.png';
import character2 from '../../assets/character2.png';
import character3 from '../../assets/character3.png';
import character4 from '../../assets/character4.png';
import character5 from '../../assets/character5.png';
import trashIcon from '../../assets/trash.png';

const CSTopicChattingList: React.FC<{ selectedTopic: string }> = ({ selectedTopic }) => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const [csChats, setCsChats] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const fetchChats = async () => {
        try {
            const response = await axios.get(`http://43.201.164.254:8080/api/v1/member/chats/cs/${selectedTopic}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(`CS ${selectedTopic}  조회 Response:`, response.data.data);
            if (Array.isArray(response.data.data.csChats)) {
                setCsChats(response.data.data.csChats);
            } else {
                setError("아무 대화가 없습니다");
            }
        } catch (error) {
            console.error('Error in CSTopicChattingList:', error);
            setError("Failed to fetch chats");
        }
    };
    useEffect(() => {

        fetchChats();
    }, [accessToken]);

    const handleChatPress = (csID: string) => {
        dispatch(setCsID(csID));
        dispatch(setSelfID(""));
        dispatch(setTopicCS(""));
        navigation.navigate("CheckRating");
    };

    const handleDeletePress = async (chatID: string) => {
        console.log(selectedTopic , chatID);
        try {
            const response = await axios.delete(`http://43.201.164.254:8080/api/v1/member/cs/${chatID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log("cs 삭제 : " ,response.data.data);
            fetchChats();
        } catch (error) {
            console.error('Error in deleting cs intro:', error.data.data);
        }
    };

    const images = [character1, character2, character3, character4, character5];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {csChats.map((chat, index) => {
                const randomImageIndex = Math.floor(Math.random() * 5);
                return (
                    <TouchableOpacity key={chat.id} style={styles.chatContainer} onPress={() => handleChatPress(chat.id)}>
                        <Image source={images[randomImageIndex]} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.chatTitle}>{chat.topic} {index + 1}</Text>
                            <Text>면접 날짜: {chat.createdAt.split('T')[0]}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleDeletePress(chat.id)}>
                            <Image source={trashIcon} style={styles.trashIcon} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    chatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
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
    trashIcon: {
        width: 24,
        height: 24,
        tintColor: 'red',
    },
});

export default withRedux(CSTopicChattingList);
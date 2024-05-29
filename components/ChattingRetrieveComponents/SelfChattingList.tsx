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

const SelfChattingList: React.FC = () => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const [selfIntros, setSelfIntros] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const fetchChats = async () => {
        try {
            console.log(accessToken);
            const response = await axios.get('http://43.201.164.254:8080/api/v1/member/chats/self_intro', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log("자소서 전체 조회 Response:", response.data.data);
            if (Array.isArray(response.data.data.selfIntros)) {
                setSelfIntros(response.data.data.selfIntros);
            } else {
                setError("아무 자소서가 없습니다");
            }
        } catch (error) {
            console.error('Error in SelfChattingList:', error);
            setError("Failed to fetch self intros");
        }
    };

    useEffect(() => {
        fetchChats();
    }, [accessToken]);

    const handleIntroPress = (selfID: string) => {
        dispatch(setSelfID(selfID));
        dispatch(setCsID(""));
        dispatch(setTopicCS(""));
        navigation.navigate('CheckRating');
    };

    const handleDeletePress = async (chatID: string) => {
        console.log(chatID);
        try {
            const response = await axios.delete(`http://43.201.164.254:8080/api/v1/member/self_intro/${chatID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log("자소서 삭제 : " ,response.data.data);
            fetchChats();
        } catch (error) {
            console.error('Error in deleting self intro:', error.data.data);
        }
    };

    const images = [character1, character2, character3, character4, character5];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {selfIntros.map((intro, index) => {
                const randomImageIndex = Math.floor(Math.random() * 5);
                return (
                    <View key={intro.id} style={styles.introContainer}>
                        <TouchableOpacity onPress={() => handleIntroPress(intro.id)}>
                            <Image source={images[randomImageIndex]} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            <TouchableOpacity onPress={() => handleIntroPress(intro.id)}>
                                <Text style={styles.introTitle}>자기소개서 {index + 1}</Text>
                                <Text>작성 날짜: {intro.createdAt}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => handleDeletePress(intro.id)}>
                            <Image source={trashIcon} style={styles.trashIcon} />
                        </TouchableOpacity>
                    </View>
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
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    introContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    introTitle: {
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

export default withRedux(SelfChattingList);
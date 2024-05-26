import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import withRedux from "../../store/withRedux";
import { useNavigation } from "@react-navigation/native";
import { setCsID, setSelfID, setTopicCS } from "../../store/actions";

const SelfChattingList: React.FC = () => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const [selfIntros, setSelfIntros] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/member/chats/self_intro', {
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

        fetchChats();
    }, [accessToken]);

    const handleIntroPress = (selfID: string) => {
        dispatch(setSelfID(selfID));
        dispatch(setCsID(""));
        dispatch(setTopicCS(""));

        navigation.navigate('CheckRating');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {selfIntros.map((intro, index) => (
                <TouchableOpacity key={intro.id} style={styles.introContainer} onPress={() => handleIntroPress(intro.id)}>
                    <Text style={styles.introTitle}>자기소개서 {index + 1}</Text>
                    <Text>작성 날짜: {intro.createdAt}</Text>
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
    introContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
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
});

export default withRedux(SelfChattingList);

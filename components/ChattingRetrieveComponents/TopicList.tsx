import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import withRedux from '../../store/withRedux';

const TopicList: React.FC = () => {
    const accessToken = useSelector((state: any) => state.accessToken);
    const CsID = useSelector((state: any) => state.CsID);
    const [topicData, setTopicData] = useState<any>(null);

    const topics = [
        { id: 'computer_network', name: '컴퓨터네트워크' },
        { id: 'operating_system', name: '운영체제' },
        { id: 'data_structure', name: '자료구조' },
        { id: 'database', name: '데이터베이스' },
    ];

    const handlePress = async (topic : string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/member/chats/cs/${topic}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(`$주제 조회 Response:`, response.data.data.csChats[0].chatHistory);
            setTopicData(response.data.data.csChats[0].chatHistory);
        } catch (error) {
            console.error(`Error in fetching :`, error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonContainer}>
                {topics.map(topic => (
                    <View key={topic.id} style={styles.buttonWrapper}>
                        <Button
                            title={topic.name}
                            onPress={() => handlePress(topic.name)}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.resultContainer}>
                {topicData && (
                    <>
                        <Text style={styles.resultTitle}>조회 결과:</Text>
                        <Text>{JSON.stringify(topicData, null, 2)}</Text>
                    </>
                )}
            </View>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
    },
    buttonWrapper: {
        margin: 10,
        width: '45%',
    },
    resultContainer: {
        marginTop: 20,
        width: '100%',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default withRedux(TopicList);

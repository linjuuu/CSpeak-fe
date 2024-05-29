import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { setCsID, setSelfID, setTopicCS } from '../../store/actions';
import PrintRating from './PrintRating';

const TopicList: React.FC = () => {
    const topics = [
        { id: 'total', name: '전체' }, 
        { id: 'computer_network', name: '컴퓨터네트워크' },
        { id: 'operating_system', name: '운영체제' },
        { id: 'data_structure', name: '알고리즘' },
        { id: 'database', name: '데이터베이스' }, 
    ];

    const [selectedTopic, setSelectedTopic] = useState<string>('전체'); // '전체'로 초기화
    const dispatch = useDispatch();

    const handleTopicPress = (name: string) => {
        dispatch(setTopicCS(name));
        dispatch(setCsID(""));
        dispatch(setSelfID(""));
        setSelectedTopic(name); // 선택된 토픽 업데이트
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.buttonContainer} showsHorizontalScrollIndicator={false}>
                {topics.map(topic => (
                    <View key={topic.id} style={styles.buttonWrapper}>
                        <TouchableOpacity
                            onPress={() => handleTopicPress(topic.name)}
                            style={[styles.button, selectedTopic === topic.name && styles.selectedButton]}
                        >
                            <Text style={[styles.buttonText, selectedTopic === topic.name && styles.selectedText]}>
                                {topic.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <PrintRating selectedTopic={selectedTopic} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    buttonWrapper: {
        padding: 10,
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: -5,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 16,
        color: '#999',
    },
    selectedButton: {
        backgroundColor: '#f9f9f9',
    },
    selectedText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default withRedux(TopicList);
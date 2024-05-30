import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { setCsID, setSelfID, setTopicCS } from '../../store/actions';
import CSTopicChattingList from './CSTopicChattingList';
import CSChattingList from './CSChattingList';

const TopicList: React.FC = () => {
    const topics = [
        { id: 'total', name: '전체' }, 
        { id: 'computer_network', name: '컴퓨터네트워크' },
        { id: 'operating_system', name: '운영체제' },
        { id: 'data_structure', name: '알고리즘' },
        { id: 'database', name: '데이터베이스' }, 
    ];

    const [selectedTopic, setSelectedTopic] = useState<string>('전체');
    const dispatch = useDispatch();

    const handleTopicPress = (name: string) => {
        if (selectedTopic !== name) {
            dispatch(setTopicCS(name));
            dispatch(setCsID(""));
            dispatch(setSelfID(""));
            setSelectedTopic(name);
        }
    };

    return (
        <ScrollView>
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
            {
                // 확실한 리렌더링을 위해 selectedTopic에 따라 키 값을 할당하여 조건부 렌더링
                selectedTopic === '전체'
                ? <CSChattingList key="cslist" />
                : <CSTopicChattingList key={selectedTopic} selectedTopic={selectedTopic} />
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
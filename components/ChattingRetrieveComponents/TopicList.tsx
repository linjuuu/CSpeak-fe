import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import withRedux from '../../store/withRedux';
import { setCsID, setSelfID, setTopicCS } from '../../store/actions';
import { useNavigation } from '@react-navigation/native';

const TopicList: React.FC = () => {
    const topics = [
        { id: 'total', name: '전체' }, 
        { id: 'computer_network', name: '컴퓨터네트워크' },
        { id: 'operating_system', name: '운영체제' },
        { id: 'data_structure', name: '자료구조' },
        { id: 'database', name: '데이터베이스' }, 
    ];

    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleTopicPress = (name: string) => {
        dispatch(setTopicCS(name));
        dispatch(setCsID(""));
        dispatch(setSelfID(""));
        setSelectedTopic(name); // 선택된 토픽 업데이트
        navigation.navigate('CheckRating');
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'flex-start',
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

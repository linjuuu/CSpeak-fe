import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SelfChattingList from './SelfChattingList'; // Replace with your actual file path
import CSChattingList from './CSChattingList'; // Replace with your actual file path
import TopicList from './TopicList';

const SelectList: React.FC = () => {
    const [selectedList, setSelectedList] = useState<'self' | 'cs주제별 보기' | 'cs전체보기'>('self');

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                {selectedList === 'self' && <SelfChattingList />}
                {selectedList === 'cs주제별 보기' && <TopicList />}
                {selectedList === 'cs전체보기' && <CSChattingList />}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, selectedList === 'self' && styles.selectedButton]}
                    onPress={() => setSelectedList('self')}
                >
                    <Text style={styles.buttonText}>자소서</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedList === 'cs주제별 보기' && styles.selectedButton]}
                    onPress={() => setSelectedList('cs주제별 보기')}
                >
                    <Text style={styles.buttonText}>CS주제별 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedList === 'cs전체보기' && styles.selectedButton]}
                    onPress={() => setSelectedList('cs전체보기')}
                >
                    <Text style={styles.buttonText}>CS전체보기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20, 
    },
    listContainer: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 40,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    selectedButton: {
        backgroundColor: '5871F3',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SelectList;

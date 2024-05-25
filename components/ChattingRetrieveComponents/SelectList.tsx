import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SelfChattingList from './SelfChattingList'; // Replace with your actual file path
import CSChattingList from './CSChattingList'; // Replace with your actual file path
import TopicList from './TopicList';

const SelectList: React.FC = () => {
    const [selectedList, setSelectedList] = useState<'self' | 'cs주제별 보기' | 'cs전체보기'>('self');

    return (
        <>
        <View style={styles.selectButtonContainer}>
            <TouchableOpacity
                style={[styles.button, selectedList === 'self' && styles.selectedButton]}
                onPress={() => setSelectedList('self')}
            >
                <Text style={styles.buttonText}>자기소개서</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedList === 'cs주제별 보기' && styles.selectedButton]}
                onPress={() => setSelectedList('cs주제별 보기')}
            >
                <Text style={styles.buttonText}>{"CS 주제별"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedList === 'cs전체보기' && styles.selectedButton]}
                onPress={() => setSelectedList('cs전체보기')}
            >
                <Text style={styles.buttonText}>CS 전체</Text>
            </TouchableOpacity>
        </View>

            <View style={styles.container}>
                <View style={styles.listContainer}>
                    {selectedList === 'self' && <SelfChattingList />}
                    {selectedList === 'cs주제별 보기' && <TopicList />}
                    {selectedList === 'cs전체보기' && <CSChattingList />}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    selectButtonContainer : {
        flexDirection: 'row',
        justifyContent: 'center', // 가운데 정렬
        borderRadius: 10, // 모서리 둥글게
        padding: 10, // 내부 여백
        marginVertical: 10, // 상하 여백
    },
    selectedButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },

    container: {
        flex: 1,
        marginTop: '10%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20, 
    },
    listContainer: {
        flex: 1,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 5, // 버튼 간격
    },
    
    buttonText: {
        color: 'rgb(0, 0, 0)',
        fontWeight: 'bold',
        fontFamily : "AppleSDGothicNeoM",
        fontSize: 16,
    },
});

export default SelectList;

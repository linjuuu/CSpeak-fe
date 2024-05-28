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
                <Text style={[styles.buttonText, selectedList === 'self' && styles.selectedButtonText]}>자기소개서</Text>
                {selectedList === 'self' && <View style={styles.underline} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedList === 'cs주제별 보기' && styles.selectedButton]}
                onPress={() => setSelectedList('cs주제별 보기')}
            >
                <Text style={[styles.buttonText, selectedList === 'cs주제별 보기' && styles.selectedButtonText]}>{"CS 주제별"}</Text>
                {selectedList === 'cs주제별 보기' && <View style={styles.underline} />}
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
    selectButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        marginTop: 60,
    },
    button: {
        flex: 1, // 화면을 반반씩 나누기
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    selectedButton: {
        position: 'relative',
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        height: 4,
        width: '100%',
        backgroundColor: 'rgba(100, 100, 200, 1)', // 연한 보라색
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    container: {
        flex: 1,
        marginTop: '-2%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    listContainer: {
        flex: 1,
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'bold',
        fontFamily: "AppleSDGothicNeoM",
        fontSize: 16,
    },
    selectedButtonText: {
        color: 'black', // 선택된 버튼의 텍스트 색상
    },
});

export default SelectList;

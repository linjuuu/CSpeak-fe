import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SelfChattingList from './SelfChattingList'; // Replace with your actual file path
import CSChattingList from './CSChattingList'; // Replace with your actual file path
import TopicList from './TopicList';

const SelectList: React.FC = () => {
    const [selectedList, setSelectedList] = useState<'self' | 'cs주제별 보기' | 'cs전체보기'>('self');

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="자소서"
                    onPress={() => setSelectedList('self')}
                    color={selectedList === 'self' ? 'blue' : 'gray'}
                />
                <Button
                    title="CS주제별 보기"
                    onPress={() => setSelectedList('cs주제별 보기')}
                    color={selectedList === 'cs주제별 보기' ? 'blue' : 'gray'}
                />
                <Button
                    title="CS전체보기"
                    onPress={() => setSelectedList('cs전체보기')}
                    color={selectedList === 'cs전체보기' ? 'blue' : 'gray'}
                />
            </View>
            <View style={styles.listContainer}>
                {selectedList === 'self' && <SelfChattingList />}
                {selectedList === 'cs주제별 보기' && <TopicList />}
                {selectedList === 'cs전체보기' && <CSChattingList />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop : 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    listContainer: {
        flex: 1,
    },
});

export default SelectList;

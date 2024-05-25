import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import withRedux from '../../store/withRedux';

const PrintRating: React.FC = () => {
    const CsID = useSelector((state: any) => state.CsID);
    const SelfID = useSelector((state: any) => state.selfID);

    useEffect(() => {
        if (CsID) {
            console.log('CsID 있음:', CsID);
        } else if (SelfID) {
            console.log('SelfID 있음:', SelfID);
        } else {
            console.log('CsID와 SelfID가 모두 없습니다');
        }
    }, [CsID, SelfID]);

    return (
        <>
            <Text>{CsID || SelfID ? `ID: ${CsID || SelfID}` : 'ID 없음'}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    // 스타일 정의가 필요 없으면 비워두세요
});

export default withRedux(PrintRating);

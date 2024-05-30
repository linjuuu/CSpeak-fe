import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import withRedux from '../../store/withRedux';
import axios from 'axios';

const PrintRating: React.FC<{ selectedTopic: string }> = ({ selectedTopic }) => {
  const [data, setData] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const accessToken = useSelector((state: any) => state.accessToken);
  const CsID = useSelector((state: any) => state.CsID);
  const selfID = useSelector((state: any) => state.selfID);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        let response;
        if (CsID) {
          response = await axios.get(`http://43.201.164.254:8080/api/v1/member/cs/${CsID}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setData(response.data.data.chatEvaluations || []);
        } else if (selfID) {
          response = await axios.get(`http://43.201.164.254:8080/api/v1/member/self_intro/${selfID}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setData(response.data.data.selfIntroChats || []);
        } else {
            response = await axios.get(`http://43.201.164.254:8080/api/v1/member/chats/cs/${selectedTopic}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            setData(response.data.data.csChats[0].chatHistory || []);
          }
        }
      catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };
    fetchData();
  }, [CsID, selfID, selectedTopic]);

  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.noDataText}>면접 기록이 없습니다 !</Text>
      ) : (
        data.map((item, index) => (
          <View key={index}>
            <View style={styles.card}>
              <View style={styles.questionContainer}>
                <Image source={require('../../assets/alphabetQ.png')} style={styles.Qimage} />
                <Text style={styles.questionText}>{item.question}</Text>
                <TouchableOpacity onPress={() => handlePress(index)} style={styles.toggleButton}>
                  <Image source={require('../../assets/answerToggle.png')} style={styles.toggleImage} />
                </TouchableOpacity>
              </View>
              {expandedIndex === index && (
                <View style={styles.expandedSection}>

                  <View style={styles.answerContainer}>
                    <Image source={require('../../assets/alphabetA.png')} style={styles.image} />
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.answerContainer}>
                    <Image source={require('../../assets/alphabetE.png')} style={styles.image} />
                    <Text style={styles.evaluationText}>평가: {item.evaluation}</Text>
                  </View>
                  
                </View>
              )}
            </View>
            {index < data.length - 1 && <View style={styles.separator} />}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  Qimage : {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  image: {
    width: 18,
    height: 18,
    marginRight: 15,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleImage: {
    width: 24,
    height: 24,
  },
  expandedSection: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  answerText: {
    fontSize: 14,
    color: 'rgba(50,50,50,1)',
  },
  evaluationText: {
    fontSize: 14,
    color: 'rgba(200,50,50,0.8)',
  },
});

export default withRedux(PrintRating);

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import withRedux from '../../store/withRedux';
import axios from 'axios';


const PrintRating: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const accessToken = useSelector((state: any) => state.accessToken);
  const CsID = useSelector((state: any) => state.CsID);
  const selfID = useSelector((state: any) => state.selfID);
  const topicCS = useSelector((state: any) => state.topicCS);

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
          response = await axios.get(`http://43.201.164.254:8080/api/v1/member/chats/cs/${topicCS}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setData(response.data.data.csChats[0].chatHistory || []);
          return;
        }
      } catch (error) {
        
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [CsID, selfID]);


  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
        {data.length === 0 ? (
            <Text style={styles.noDataText}>No data available</Text>
        ) : (
            data.map((item, index) => (
            <View key={index}>
                <View style={styles.card}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                    <Text style={styles.questionText}>Q: {item.question}</Text>
                </TouchableOpacity>
                {expandedIndex === index && (
                    <View style={styles.expandedSection}>
                    <Text style={styles.answerText}>A: {item.answer}</Text>
                    <Text style={styles.evaluationText}>F: {item.evaluation}</Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  expandedSection: {
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },

  separator: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 10,
  },

  answerText: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 8,
  },

  evaluationText: {
    fontSize: 14,
    color: '#28a745',
  },
});

export default withRedux(PrintRating);
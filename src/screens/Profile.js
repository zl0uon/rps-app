import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [aiScores, setAiScores] = useState([0, 0, 0, 0, 0]);  // 자 점수표입니다^^ 우리 5판이었죠? 각각 입력하는 변수 만든거에요^^ 근데 AI꺼임 사랑해줘
  const [humanScores, setHumanScores] = useState([0, 0, 0, 0, 0]);  // 이게 인간 점수표^^

  useEffect(() => {
    // 근데 이걸 데이터베이스에 보내야지 판정을 하고 뭐 순위 보내고 하잖아여 그래서 보내는거에요
    const data = getData();
    setUserData(data);

    // 현재 점수 알아내는 백엔드 코드입니다아^^
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_scores');
        const { human_scores, ai_scores } = response.data;

        setHumanScores(human_scores);
        setAiScores(ai_scores);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    // 이건 내가 하긴 했는데 나도 모르겠어 근데 건들지는 말아봐
    fetchScores();

    // 나도 몰라
    const intervalId = setInterval(fetchScores, 5000);

    // 모른다고
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Score</Text>

      <View style={styles.table}>
        {/* 이게 AI 판마다 해주는거 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Pan (Game)</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>3</Text>
          <Text style={styles.tableCell}>4</Text>
          <Text style={styles.tableCell}>5</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Score</Text>
          {aiScores.map((score, index) => (
            <Text key={index} style={styles.tableCell}>{score}</Text>
          ))}
        </View>

        {/* 이게 인간 경기수 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Pan (Game)</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>3</Text>
          <Text style={styles.tableCell}>4</Text>
          <Text style={styles.tableCell}>5</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Score</Text>
          {humanScores.map((score, index) => (
            <Text key={index} style={styles.tableCell}>{score}</Text>
          ))}
        </View>
      </View>

      <Text style={styles.finalScore}>
        {/* 점수 계산기^^ */}
        Final Score: HUMAN - {humanScores.reduce((a, b) => a + b, 0)} : AI - {aiScores.reduce((a, b) => a + b, 0)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
  },
  finalScore: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

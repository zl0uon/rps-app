import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [aiScores, setAiScores] = useState([0, 0, 0, 0, 0]);  // Store AI's scores for each round
  const [humanScores, setHumanScores] = useState([0, 0, 0, 0, 0]);  // Store HUMAN's scores for each round

  useEffect(() => {
    // Get user data from Data.js file (this assumes you've set the user's data in Data.js)
    const data = getData();
    setUserData(data);

    // Fetch the current scores from the backend
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

    // Fetch scores when the component mounts
    fetchScores();

    // Optionally, set up an interval to fetch scores periodically (every 5 seconds)
    const intervalId = setInterval(fetchScores, 5000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Score</Text>

      <View style={styles.table}>
        {/* AI Scores Table */}
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

        {/* HUMAN Scores Table */}
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
        {/* Calculate final score */}
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

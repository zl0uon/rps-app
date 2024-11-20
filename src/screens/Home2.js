import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import { getData } from './Data/Data'; // 학생 데이터 받아오는거당아아아가

export default function Home2({ nextScreen }) {
  const [userData, setUserData] = useState({});
  const [humanChoice, setHumanChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [winner, setWinner] = useState('');
  const [score, setScore] = useState(0);  // 이길때 마다 추가하는거임

  useEffect(() => {
    const data = getData();
    setUserData(data);
  }, []);

  const handleChoice = async (choice) => {
    setHumanChoice(choice);

    try {
      // 파이썬 보고 이거 플레이어 우승자 선택에서 파일 보내주는거임
      const response = await axios.post('http://localhost:5000/play', {
        player_move: choice,
      });

      // 판정하는거
      const { computer_move, winner, score } = response.data;

      setComputerChoice(computer_move);
      setWinner(winner);
      setScore(score);  // 그래서 파이썬 파일에 업데이트하게 보내주는거

      // 이걸 이제 화면으로 보여주는거임
      Alert.alert('Game Result', `Computer chose: ${computer_move}\nWinner: ${winner}\nYour score: ${score}`);
    } catch (error) {
      console.error('Error playing the game:', error);
      Alert.alert('Error', 'Something went wrong, please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the rock-paper-scissors game!</Text>
      <Text style={styles.userInfo}>Student Number: {userData.studentNumber}</Text>
      <Text style={styles.userInfo}>Name: {userData.name}</Text>

      <View style={styles.aiContainer}>
        <Text style={styles.aiText}>AI</Text>
        <View style={styles.aiBox}>
          <Text style={styles.aiSelection}>AI has completed the selection.</Text>
        </View>
      </View>

      <View style={styles.humanContainer}>
        <Text style={styles.humanText}>HUMAN</Text>
        <View style={styles.humanBox}>
          <Text style={styles.instructionText}>Please choose one of the following three:</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Scissors" color="blue" onPress={() => handleChoice('가위')} />
          <Button title="Rock" color="blue" onPress={() => handleChoice('바위')} />
          <Button title="Look" color="blue" onPress={() => handleChoice('보')} />
        </View>
      </View>

      <Text style={styles.scoreText}>Your Score: {score}</Text>  {/* 그냥 점수 알려주는거 */}

      <Button title="Next" onPress={nextScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 11,
    marginBottom: 8,
  },
  aiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  aiText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  aiBox: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
  },
  aiSelection: {
    fontSize: 11,
    color: 'blue',
  },
  humanContainer: {
    marginTop: 20,
  },
  humanText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  humanBox: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 11,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
});


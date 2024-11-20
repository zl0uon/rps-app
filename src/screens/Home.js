import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getData } from './Data/Data'; // 인공지능한테서 데이터 받아오는거

export default function Home() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // 이것도 데이터 받아오는거임
    const data = getData();
    setUserData(data);
  }, []);

  return (
    <View style={styles.container}>
      {/* 걍 제일 위에다가 뭐시기 말하는거 */}
      <Text style={styles.welcome}>Welcome to the rock-paper-scissors game</Text>

      {/* 학번 이름 나타내주는거 */}
      <Text style={styles.userInfo}>Student Number: {userData.studentNumber}</Text>
      <Text style={styles.userInfo}>Name: {userData.name}</Text>

      {/* Ai 고르고 있을때 화면 */}
      <View style={styles.aiContainer}>
        <Text style={styles.aiText}>AI is selecting...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // Align items at the top
    alignItems: 'flex-start',       // Align items at the left
    padding: 16,
  },
  welcome: {
    fontSize: 18,          // Larger font for the welcome message
    fontWeight: 'bold',
    marginBottom: 20,      // Space between the welcome message and user info
  },
  userInfo: {
    fontSize: 11,          // 11-point font size
    marginBottom: 8,       // Space between student number and name
  },
  aiContainer: {
    position: 'absolute',       // Position at the bottom of the screen
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 255, 0.3)',  // Opaque blue color
    paddingVertical: 20,        // Vertical padding for better spacing
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiText: {
    fontSize: 16,      // Font size for "AI is selecting..."
    fontWeight: 'bold',
    color: 'white',    // White text color to contrast with the blue background
  },
});


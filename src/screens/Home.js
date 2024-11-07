import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getData } from './Data/Data'; // Import data

export default function Home() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch the data when the component mounts
    const data = getData();
    setUserData(data);
  }, []);

  return (
    <View style={styles.container}>
      {/* Welcome Text at the top left */}
      <Text style={styles.welcome}>Welcome to the rock-paper-scissors game</Text>

      {/* Student Number and Name */}
      <Text style={styles.userInfo}>Student Number: {userData.studentNumber}</Text>
      <Text style={styles.userInfo}>Name: {userData.name}</Text>

      {/* Opaque Blue Section at the bottom */}
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


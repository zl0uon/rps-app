import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setData } from './Data/Data'; // Import the data handling function

export default function Login() {
  const navigation = useNavigation();

  // State to manage form input
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');

  // Handle the form submission
  const handleSubmit = () => {
    // Save data into the Data.js (or any other data management solution)
    setData({ studentNumber, name });

    // Navigate to the Home screen
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Hello Text at the top left */}
      <Text style={styles.greeting}>Hello</Text>

      {/* Instruction Text */}
      <Text style={styles.instruction}>Please enter your student number and name</Text>

      {/* Login Form */}
      <TextInput
        style={styles.input}
        placeholder="Student Number"
        value={studentNumber}
        onChangeText={setStudentNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      {/* Start Game Button */}
      <Button title="Start Game" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  greeting: {
    position: 'absolute',
    top: 40,
    left: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  instruction: {
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});


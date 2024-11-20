import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setData } from './Data/Data'; // 얘도 인공지능 데이터 불러오는거

export default function Login() {
  const navigation = useNavigation();

  // 학번 이름 입력하거라아아ㅏㅏㅏ
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');

  // 로그인 버튼 누르기이
  const handleSubmit = () => {
    // 데이터 베이스에 이 정보 주는거임
    setData({ studentNumber, name });

    // 홈화면으로 들어가자아
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* 걍 화면 위에 헬로 하는거임 */}
      <Text style={styles.greeting}>Hello</Text>

      {/* 학번 이름 입력하거라 문구 */}
      <Text style={styles.instruction}>Please enter your student number and name</Text>

      {/* 멋진 로그인 폼 */}
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

      {/* 게임 시작버튼 */}
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


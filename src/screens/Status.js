import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getAllUserData, calculateTotalScore } from './Data/Data.js';

// 이제 그래프 만들어주는건데요 지우면 클나요
const screenWidth = Dimensions.get('window').width;

const TopUsersBarGraph = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    // 모든 유저의 데이터를 모읍시다!
    const users = getAllUserData();
    
    // 모은 데이터를 그래프로 나타내는거에요^^
    const usersWithTotalScore = users.map(user => ({
      ...user,
      totalScore: calculateTotalScore(user.scores),
    }));

    // 하지만 최종 점수를 디버깅 해야겠죠?
    usersWithTotalScore.sort((a, b) => b.totalScore - a.totalScore);

    // 그리고 높은 결과대로 20인을 선발해요!
    const top20Users = usersWithTotalScore.slice(0, 20);

    // 다시 그래프에 나타냅시다!
    const labels = top20Users.map(user => user.student_name);
    const data = top20Users.map(user => user.totalScore);

    setTopUsers({
      labels,
      data,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 20 Users Based on Scores</Text>

      {topUsers.labels ? (
        <ScrollView horizontal>
          <BarChart
            data={{
              labels: topUsers.labels,
              datasets: [
                {
                  data: topUsers.data,
                },
              ],
            }}
            width={screenWidth * 1.5} // 이건 이제 꾸미는건데 걍 건들이지마
            height={220}
            fromZero={true}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#e26a00',
              decimalPlaces: 0, 
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

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
});

export default TopUsersBarGraph;

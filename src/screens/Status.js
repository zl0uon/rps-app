import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getAllUserData, calculateTotalScore } from './Data/Data.js';

// Get device width for responsive chart
const screenWidth = Dimensions.get('window').width;

const TopUsersBarGraph = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    // Fetch all user data
    const users = getAllUserData();
    
    // Calculate total score for each user and sort by score
    const usersWithTotalScore = users.map(user => ({
      ...user,
      totalScore: calculateTotalScore(user.scores),
    }));

    // Sort users by total score in descending order
    usersWithTotalScore.sort((a, b) => b.totalScore - a.totalScore);

    // Select the top 20 users
    const top20Users = usersWithTotalScore.slice(0, 20);

    // Prepare data for bar graph
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
            width={screenWidth * 1.5} // Make the chart wide enough to fit all labels
            height={220}
            fromZero={true}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#e26a00',
              decimalPlaces: 0, // No decimal places
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

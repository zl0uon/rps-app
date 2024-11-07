import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Home2 from './src/screens/Home2';

// Create the stack navigator
const Stack = createStackNavigator();

export default function App() {
  const [cycle, setCycle] = useState(0);  // State to track screen cycling

  // Function to handle cycling between Home.js and Home2.js
  const nextScreen = () => {
    setCycle((prevCycle) => (prevCycle + 1) % 2);  // Toggle between Home (0) and Home2 (1)
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen name="Login" component={Login} />
        
        {/* Home Screen with Cycle */}
        <Stack.Screen name="Home">
          {(props) => <Home {...props} nextScreen={nextScreen} />}
        </Stack.Screen>

        {/* Home2 Screen with Cycle */}
        <Stack.Screen name="Home2">
          {(props) => <Home2 {...props} nextScreen={nextScreen} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


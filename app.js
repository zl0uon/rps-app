import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Home2 from './src/screens/Home2';

// Create the stack navigator
const Stack = createStackNavigator();

export default function App() {
  const [cycle, setCycle] = useState(0); 

  const nextScreen = (navigation) => {
    const nextScreen = cycle === 0 ? 'Home2' : 'Home';
    setCycle((prevCycle) => (prevCycle + 1) % 2);
    navigation.navigate(nextScreen); 
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen name="Login" component={Login} />

        {/* Home Screen */}
        <Stack.Screen name="Home">
          {(props) => <Home {...props} nextScreen={() => nextScreen(props.navigation)} />}
        </Stack.Screen>

        {/* Home2 Screen */}
        <Stack.Screen name="Home2">
          {(props) => <Home2 {...props} nextScreen={() => nextScreen(props.navigation)} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

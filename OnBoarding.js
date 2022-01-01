
import React from 'react';
import {
    createStackNavigator,
  } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import SignedOut from './SignedOut';
import OnBoardingScreen from './Screens/OnBoardingScreen';
import SignedOutScreen from './Screens/SignedOutScreen';


function OnBoarding(props) {
    const Stack = createStackNavigator(); 
    return (
        <NavigationContainer>
           <Stack.Navigator 
            screenOptions={{
          headerShown:false
        }}
        >
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="SignedOutScreen" component={SignedOutScreen} />

        </Stack.Navigator> 
        </NavigationContainer>
    );
}

export default OnBoarding;
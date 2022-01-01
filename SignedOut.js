
import React from 'react';
import {
    createStackNavigator,
  } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import SignedOutScreen from './Screens/SignedOutScreen';


function SignedOut() {
    const Stack = createStackNavigator(); 
    return (
        <NavigationContainer>
           <Stack.Navigator 
            screenOptions={{
          headerShown:false
        }}
        >
          <Stack.Screen name="SignedOutScreen" component={SignedOutScreen} />
        </Stack.Navigator> 
        </NavigationContainer>
    );
}

export default SignedOut;
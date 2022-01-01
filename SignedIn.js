import {
    createStackNavigator,
    CardStyleInterpolators,
  } from '@react-navigation/stack';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Post from './Screens/Post';
import ManageProfile from './Screens/ManageProfile';
import SettingScreen from './Screens/SettingScreen';
import UserPost from './Screens/UserPost';
import BottomNavbar from './routes/BottomNavbar';
import ChatScreen from './Screens/ChatScreen';


  const Stack = createStackNavigator(); 

  const SignedIn = () => {
    const closeConfig = {
      config: {
        duration: 200,
      },
    };
    
    const config = {
      config: {
        duration: 600,    
      },
    };
    

      
  
      return (
          <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown:false,
          transitionSpec: {
            open: config,
            close: closeConfig,
            
          },
        }}
        >
          <Stack.Screen name="BottomNavbar" component={BottomNavbar} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="ManageProfile" component={ManageProfile} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen name="UserPost" component={UserPost} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />

        </Stack.Navigator>
        </NavigationContainer>
      );
  }
  
  export default SignedIn;
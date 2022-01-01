import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import AddPost from '../Screens/AddPost'
import ColorPallets from '../config/ColorPallets';
import Feeds from '../Screens/Feeds';
import Chats from '../Screens/Chats';
import UserProfile from '../Screens/UserProfile';

const Tab = createBottomTabNavigator();

function BottomNavbar() {
    return (
           
            <Tab.Navigator
           
                initialRouteName="Feeds"
                screenOptions={{
                    tabBarActiveTintColor: ColorPallets.primary,
                    tabBarInactiveTintColor: "#aaa",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        elevation: 0,
                        borderTopWidth: 0,
                        backgroundColor: ColorPallets.navbar,
                    }
                }}
            >
                <Tab.Screen name="Feeds" component={Feeds}
                    options={{
                        headerShown: false, 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="slack" color={color} size={size} />
                        ),
                    }} />

                <Tab.Screen name="AddPost" component={AddPost} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="plussquare" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="Chats" component={Chats} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="message1" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="UserProfile" component={UserProfile} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                }} />
            </Tab.Navigator>
          
    );
}
export default BottomNavbar;



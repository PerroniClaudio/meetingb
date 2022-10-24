import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen'
import EditEventScreen from '../screens/EditEventScreen'
import NewEventScreen from '../screens/NewEventScreen'

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />             
        <HomeStack.Screen name="Event" component={EventScreen} options={{ presentation: 'modal', headerShown: false}}/>
        <HomeStack.Screen name="EditEvent" component={EditEventScreen} options={{ presentation: 'modal', headerShown: false}}/> 
        <HomeStack.Screen name="NewEvent" component={NewEventScreen} options={{ presentation: 'modal', headerShown: false}}/> 
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarScreen from '../screens/CalendarScreen'
import CalendarDayScreen from '../screens/CalendarDayScreen'


const CalendarStack = createNativeStackNavigator();

const CalendarStackScreen = () => {
  return (
    <CalendarStack.Navigator>
        <CalendarStack.Screen name="CalendarScreen" component={CalendarScreen} options={{headerShown: false}} /> 
        <CalendarStack.Screen name="CalendarDayScreen" component={CalendarDayScreen} options={{ presentation: 'modal', headerShown: false}}/>            
    </CalendarStack.Navigator>
  )
}

export default CalendarStackScreen
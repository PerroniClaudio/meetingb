import { View, Text } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, CogIcon , CalendarDaysIcon } from 'react-native-heroicons/solid'

import HomeStackScreen from "./HomeStack";
import CalendarStackScreen from "./CalendarStack";
import SettingsScreen from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator();
const meetingbColor = "#00e676";

const Navigator = () => {

    const iconFor = (route, focused, color, size) => {
        switch(route.name) {
          case "Home":
              return <HomeIcon color={color} size={size}/>
            break;
          case "Impostazioni":
              return <CogIcon color={color} size={size} />
            break;
          case "Calendario":
              return <CalendarDaysIcon color={color} size={size} />
            break;
          default: 
            console.log(route.name)
            break;
        }
    }


  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return iconFor(route, focused, color, size);
          },
          tabBarActiveTintColor: meetingbColor,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Calendario"
          component={CalendarStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Impostazioni"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Navigator;

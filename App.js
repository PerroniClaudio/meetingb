import {Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen'
import EditEventScreen from './screens/EditEventScreen'


import { HomeIcon, CogIcon , CalendarDaysIcon } from 'react-native-heroicons/solid'
// import { store } from './app/store';
// import { Provider } from 'react-redux'

const Tab = createBottomTabNavigator()

const meetingbColor = "#00e676"
import "./styles";
export default function App() {

    const iconFor = (route, focused, color, size) => {
      switch(route.name) {
        case "Home":
            return <HomeIcon color={color} size={size}/>
          break;
        case "Settings":
            return <CogIcon color={color} size={size} />
          break;
        case "Calendar":
            return <CalendarDaysIcon color={color} size={size} />
          break;
        default: 
          console.log(route.name)
          break;
      }
    }

    return (
      // <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ( { focused, color, size } ) => {
                  return iconFor(route, focused, color, size)
                },
                tabBarActiveTintColor: meetingbColor,
                tabBarInactiveTintColor: 'gray',
              })}
            >
              <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}}/>
              <Tab.Screen name="Calendar" component={SettingsScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      // </Provider>
    );
}



function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}


const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
     <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />             
     <HomeStack.Screen name="Event" component={EventScreen} options={{ presentation: 'modal', headerShown: false}}/>
     <HomeStack.Screen name="EditEvent" component={EditEventScreen} options={{ presentation: 'modal', headerShown: false}}/>
    </HomeStack.Navigator>
   );
 }
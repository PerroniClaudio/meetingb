import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import UserEventRow from '../components/UserEventRow';

import {
    ArrowLeftIcon,
    PlusIcon,
} from "react-native-heroicons/solid";

const CalendarDayScreen = () => {

    const { params } = useRoute();
    const navigation = useNavigation();

    const renderUserEventRows = () => {
        if ( Object.keys(params).length !== 1 ) {
            return <UserEventRow day={params} withBorder={false} /> 
        } else {
            return <>
                <View className="w-full flex-1 p-4 flex-row items-center justify-center">
                    <Text className="text-2xl text-gray-400">Nessun evento</Text>
                </View>
            </>
        }
    }

    return (
        <View className="bg-white flex-1">
            <View className="bg-white flex-row items-center justify-between pt-8 pb-4 px-4">
                <TouchableOpacity
                    className="bg-gray-100 justify-center items-center p-3 rounded-full"
                    onPress={navigation.goBack}
                >
                    <ArrowLeftIcon color="#00e676" size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-gray-100 justify-center items-center p-3 rounded-full "
                    onPress={ () => navigation.navigate("NewEvent", {
                        "start_date" : `${params.date} ${getHMS(new Date())}`
                    }) }
                >
                    <PlusIcon color="#00e676" size={20} />
                </TouchableOpacity>
            </View>

            {renderUserEventRows()}

        </View>
    )
}

const getCurrentTimestamp = (date) => {
    const leadingzero = (n) => {
      if (n < 10) {
        return `0${n}`;
      } else {
        return `${n}`;
      }
    };
  
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    let timestamp = `${year}-${leadingzero(month)}-${leadingzero(
      day
    )} ${leadingzero(hours)}:${leadingzero(minutes)}:${leadingzero(seconds)}`;
  
    return timestamp;
  };

const getHMS = (date) => {
    const leadingzero = (n) => {
      if (n < 10) {
        return `0${n}`;
      } else {
        return `${n}`;
      }
    };
  
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    let timestamp = `${leadingzero(hours)}:${leadingzero(minutes)}:${leadingzero(
      seconds
    )}`;
  
    return timestamp;
  };
  

export default CalendarDayScreen
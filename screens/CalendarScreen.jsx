import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import userEventData from "../dataset/userEvent.json";
import { useNavigation } from '@react-navigation/native';

LocaleConfig.locales['it'] = {
        monthNames: [
          'Gennaio',
          'Febbraio',
          'Marzo',
          'Aprile',
          'Maggio',
          'Giugno',
          'Luglio',
          'Agosto',
          'Settembre',
          'Ottobre',
          'Novembre',
          'Dicembre'
        ],
        monthNamesShort: ['Gen.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Domenica', 'Lunedì', 'Martedi', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mer.', 'Gio.', 'Ven.', 'Sab.'],
        today: "Oggi"
};
      
LocaleConfig.defaultLocale = 'it';


const CalendarScreen = () => {

    const today = new Date()
    const year = today.getFullYear();

    const [userEvents, setUserEvents] = useState([]);
    const [markedEvents, setMarkedEvents] = useState({});

    const navigation = useNavigation()

    useEffect(() => {
        let events = {};
        let eventsList = [];
        let markedevents = {};
    
        userEventData.events.forEach((element) => {
          let start_date = element.start_date.split(" ");
    
          if (events[start_date[0]] == undefined) {
            events[start_date[0]] = [];
          }
    
          events[start_date[0]] = [...events[start_date[0]], element];
        });
    
        for (const [key, value] of Object.entries(events)) {
          eventsList.push({
            date: key,
            events: value,
          });

          markedevents[key] = {marked: true, dotColor: '#00e676'}
        }

        setUserEvents(eventsList);
        setMarkedEvents(markedevents);

    }, []);

    return (

        <SafeAreaView edges={["right", "top", "left"]} className="bg-white flex-1">
            <View className="p-4">
                <Text className="text-4xl font-extrabold">
                Meeting<Text className="text-[#00e676]">B</Text>
                </Text>
            </View>
            <CalendarList
                minDate={`${getYMD(today)}`}
                maxDate={`${year}-12-31`}
                firstDay={1}
                className="h-full w-full"
                markingType={'period'}
                // markedDates={{
                //     '2022-09-29': {marked: true, dotColor: '#00e676'},
                // }}
                markedDates={markedEvents}
                theme={{
                    selectedDayTextColor: "#00e676",
                    todayTextColor: '#00e676'
                }}
                onDayPress={day => {

                    const filterDate = userEvents.filter( (eventDate) => {
                        return eventDate.date == day.dateString
                    })

                    if(filterDate.length > 0) {
                        let foundDate = filterDate[0]
                        navigation.navigate('CalendarDayScreen' , foundDate)
                    } else {
                      navigation.navigate('CalendarDayScreen' , { "start_date" : day.dateString  })
                    }

                }}
 
            />
        </SafeAreaView>


    )

}

const getYMD = (date) => {
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
  
    let timestamp = `${year}-${leadingzero(month)}-${leadingzero(day)}`;
  
    return timestamp;
};




export default CalendarScreen
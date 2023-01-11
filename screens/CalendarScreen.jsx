import { View, Text, Modal, Pressable, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

import { ArrowLeftIcon } from "react-native-heroicons/solid";

import userEventData from "../dataset/userEvent.json";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

LocaleConfig.locales["it"] = {
  monthNames: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
  monthNamesShort: [
    "Gen.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Domenica",
    "Lunedì",
    "Martedi",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mer.", "Gio.", "Ven.", "Sab."],
  today: "Oggi",
};

LocaleConfig.defaultLocale = "it";

const CalendarScreen = () => {
  const today = new Date();
  const year = today.getFullYear();

  const [userEvents, setUserEvents] = useState([]);
  const [markedEvents, setMarkedEvents] = useState({});

  const navigation = useNavigation();

  const { user } = useSelector((state) => state.user);

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(user.rooms[0]);

  const changeRoom = () => {
    setShowRoomModal(false)
  }

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

      markedevents[key] = { marked: true, dotColor: "#00e676" };
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

      <View className="px-4 mb-2">
        <Text className="text-xl font-bold mb-2">Stanza</Text>
        <Pressable className="p-4 rounded border border-gray-200 w-full" onPress={() => setShowRoomModal(true)}>
          <Text>
            {selectedRoom.name} - {selectedRoom.building.name}
          </Text>
        </Pressable>
      </View>

      <CalendarList
        minDate={`${getYMD(today)}`}
        maxDate={`${year}-12-31`}
        firstDay={1}
        className="h-full w-full"
        markingType={"period"}
        // markedDates={{
        //     '2022-09-29': {marked: true, dotColor: '#00e676'},
        // }}
        markedDates={markedEvents}
        theme={{
          selectedDayTextColor: "#00e676",
          todayTextColor: "#00e676",
        }}
        onDayPress={(day) => {
          const filterDate = userEvents.filter((eventDate) => {
            return eventDate.date == day.dateString;
          });

          if (filterDate.length > 0) {
            let foundDate = filterDate[0];
            navigation.navigate("CalendarDayScreen", foundDate);
          } else {
            navigation.navigate("CalendarDayScreen", { date: day.dateString });
          }
        }}
      />


      <Modal
        visible={showRoomModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowRoomModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#00000053] ">
          <View className="bg-white p-4 rounded w-10/12 lg:w-1/2">
            <Text className="text-xl font-bold">Stanza</Text>
            <FlatList
              data={user.rooms}
              renderItem={(element) => {
                let room = element.item;

                return (
                  <TouchableOpacity
                    className={
                      `mb-2 p-4 rounded border ` +
                      (selectedRoom.rid == room.rid
                        ? "border-[#00e676]"
                        : "border-gray-200")
                    }
                    onPress={() => setSelectedRoom(room)}
                  >
                    <Text>
                      {room.name} - {room.building.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => {
                return index;
              }}
              showsVerticalScrollIndicator={false}
              className="bg-red"
            />

            <TouchableOpacity
              className="bg-[#00e676] p-3 rounded-full"
              onPress={changeRoom}
            >
              <Text className="font-bold text-white text-center">Conferma</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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

export default CalendarScreen;

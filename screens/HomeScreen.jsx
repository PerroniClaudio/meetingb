import { View, Text, ScrollView, FlatList, Dimensions } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";

import UserEventRow from "../components/UserEventRow";

import { getListForUser, resetSettings } from "../features/events/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Toast from "react-native-toast-message";
import { useComponentRenderLog } from "../hooks/useComponentRenderLog";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [userEvents, setUserEvents] = useState([]);

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, events, message } = useSelector(
    (state) => state.events
  );

  const getEvents = () => {
    let today = new Date();

    dispatch(
      getListForUser({
        start: getCurrentTimestamp(today),
      })
    );
  };

  useFocusEffect(
    useCallback(() => {
      getEvents();
    }, [])
  );

  useEffect(() => {
    let eventsData = {};
    let eventsList = [];

    if (events) {
      events.forEach((element) => {
        let start_date = element.start_date.split(" ");

        if (eventsData[start_date[0]] == undefined) {
          eventsData[start_date[0]] = [];
        }

        eventsData[start_date[0]] = [...eventsData[start_date[0]], element];
      });

      for (const [key, value] of Object.entries(eventsData)) {
        eventsList.push({
          date: key,
          events: value,
        });
      }

      setUserEvents(eventsList);
    } else {
      getEvents();
    }
  }, [events]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Errore",
        text2: message,
      });
    }

    dispatch(resetSettings());
  }, [isError, isSuccess, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView edges={["right", "top", "left"]} className="bg-white flex-1">
      <View className="p-4">
        <Text className="text-4xl font-extrabold">
          Meeting<Text className="text-[#00e676]">B</Text>
        </Text>
      </View>

      <FlatList
        data={userEvents}
        renderItem={(element) => {
          return <UserEventRow day={element.item} withBorder={true} />;
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
        showsVerticalScrollIndicator={false}
        className="bg-white"
      />
    </SafeAreaView>
  );
};

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

export default HomeScreen;

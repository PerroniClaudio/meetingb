import { View, Text, ScrollView, FlatList, Dimensions } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import userEventData from "../dataset/userEvent.json";
import { useState, useEffect } from "react";

import UserEventRow from "../components/UserEventRow";

const HomeScreen = () => {
  const [userEvents, setUserEvents] = useState([]);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    let events = {};
    let eventsList = [];

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
    }

    setUserEvents(eventsList);
  }, []);

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
          return <UserEventRow day={element.item} withBorder={true}/>;
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

export default HomeScreen;

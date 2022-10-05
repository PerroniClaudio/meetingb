import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import { PencilIcon } from "react-native-heroicons/solid";

import AttendeeRow from "../components/AttendeeRow";

const EventScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const options = { hour: "2-digit", minute: "2-digit" };

  const start_date = new Date(params.start_date);
  const start_date_split = start_date
    .toLocaleDateString("it-IT", options)
    .split(" ");

  const end_date = new Date(params.end_date);
  const end_date_split = end_date
    .toLocaleDateString("it-IT", options)
    .split(" ");

  return (
    <View className="h-full">
      <View className="bg-white flex-row items-center justify-between pt-8 pb-4 px-4">
        <TouchableOpacity
          className="bg-gray-100 justify-center items-center p-3 rounded-full"
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon color="#00e676" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 justify-center items-center p-3 rounded-full"
          onPress={ () => navigation.navigate("EditEvent", {...params})}
        >
          <PencilIcon color="#00e676" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="bg-white">

        <View className="mb-4 px-4">
          <Text className="text-2xl font-bold capitalize mb-4">
            {params.subject}
          </Text>
          <Text className="text-md text-gray-400 mb-4">
            {params.description} Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Commodi deleniti a dicta! Incidunt beatae, amet,
            ratione, sint commodi sed enim provident cumque reprehenderit earum
            tenetur!
          </Text>

          <View className="flex-row items-center space-x-2">
            <Image
              source={{ uri: `https://picsum.photos/id/233/300/300` }}
              className="h-8 w-8 rounded-full"
            />
            <View>
              <Text className="text-md font-bold">Claudio Perroni</Text>
              <Text className="text-sm text-gray-400">Organizzatore</Text>
            </View>
          </View>
        </View>

        <View className="mb-4 px-4">
          <View className="flex-row items-center space-x-2 border-b border-gray-200 p-4">
            <CalendarDaysIcon color="gray" size={24} />

            <Text className="flex-1">
              {start_date_split[0].replace(",", "")}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 border-b border-gray-200 p-4">
            <ClockIcon color="gray" size={24} />

            <Text className="flex-1">
              {start_date_split[1]} - {end_date_split[1]}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 border-b border-gray-200 p-4">
            <MapPinIcon color="gray" size={24} />

            <Text className="flex-1">
              {params.room.name} - {params.room.building.name}
            </Text>
          </View>
        </View>

        <View className="mb-4 px-4">
            <TouchableOpacity className="p-4 bg-[#00e676] rounded-full items-center justify-center" >
                <Text className="font-bold text-white text-lg">Conferma partecipazione</Text>
            </TouchableOpacity>
        </View>

        <View className="mb-4 px-4">

            <Text className="font-bold text-xl">Invitati</Text>

            <View className="grid grid-cols-2">
              {params.attendees.map( (element) => ( 
                <AttendeeRow confirmed={false} email={element} key={Math.random()} />
              ))} 
            </View>



        </View>
        

      </ScrollView>
    </View>
  );
};

export default EventScreen;

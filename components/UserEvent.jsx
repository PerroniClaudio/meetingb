import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const UserEvent = ({event}) => {

    const options = {  hour: '2-digit', minute: '2-digit' };
    const start_date = new Date(event.start_date)
    const start_date_split = start_date.toLocaleDateString("it-IT",options).split(" ")
    const navigation = useNavigation()
    

  return (
    <>
      <TouchableOpacity className="flex-row space-x-2 p-4 bg-gray-100 border border-gray-200 rounded shadow mb-4" onPress={ () => navigation.navigate("Event", {...event}) }>

        <View><Image source={{uri: `https://picsum.photos/id/233/300/300` }} className="h-8 w-8 rounded-full" /></View>
        
        <View className="flex-1">
            <Text className="text-lg font-bold">{event.subject}</Text>
            <Text className="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi deleniti a dicta! Incidunt beatae, amet, ratione, sint commodi sed enim provident cumque reprehenderit earum tenetur!</Text>
        </View>

        <View>
            <Text>{start_date_split[1]}</Text>
        </View>

      </TouchableOpacity>
    </>
  )
}

export default UserEvent
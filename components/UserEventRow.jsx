import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import UserEvent from './UserEvent';

const UserEventRow = ({day}) => {

  const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(day.date)


  return (
    <View className="bg-white p-4 border-b border-gray-200 ">
      <View className="mb-2">
        <Text className="text-xl font-semibold">{date.toLocaleDateString("it-IT",options)}</Text>
      </View>

      <ScrollView>

        {day.events.map( (event) => (
          <UserEvent event={event} key={event.mid} />
        ))}

      </ScrollView>
    </View>
  )
}

export default UserEventRow
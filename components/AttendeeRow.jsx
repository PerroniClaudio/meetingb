import { View, Text, Image } from 'react-native'
import React from 'react'

import { CheckCircleIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/solid'

const AttendeeRow = ({confirmed, email}) => {

  return (
    <View className="p-2">
       
        <View className="flex-row items-center space-x-2 bg-gray-200 w-full rounded-full p-2 shadow">
            <Image
              source={{ uri: `https://picsum.photos/id/233/300/300` }}
              className="h-8 w-8 rounded-full"
            />

            <View className="flex-1">
                <Text className="font-bold" >Claudio perroni</Text>

                {email != undefined && (
                  <Text className="text-gray-400">{email}</Text>
                )}

               
            </View>
            

            {confirmed == true && (
                <CheckCircleIcon color={'#00e676'} />
            )}

            {confirmed == false && (
                <QuestionMarkCircleIcon color={'gray'} />
            )}
        </View>


    </View>
  )

}

export default AttendeeRow
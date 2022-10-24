import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Spinner = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#00e676" />
    </View>
  )
}

export default Spinner
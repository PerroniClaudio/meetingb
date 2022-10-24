import { View, Text, Image, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import React, { useState } from 'react';

import { ChevronRightIcon } from "react-native-heroicons/solid";

import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {

  const [showProfileModal, setShowModalProfile] = useState(false)
  const [showPasswordModal, setShowModalPassword] = useState(false)


  return (
    <SafeAreaView edges={["right", "top", "left"]} className="bg-white flex-1">
      <View className="p-4">
        <Text className="text-4xl font-extrabold">Impostazioni</Text>
      </View>

      <View className="p-4">

        <TouchableOpacity className="bg-gray-100 p-4 rounded shadow flex-row space-x-4 items-center" onPress={() => setShowModalProfile(true)}>

            <View>
                <Image source={{uri: `https://picsum.photos/id/233/300/300` }} className="h-16 w-16 rounded-full" />
            </View>

            <View className="flex-1">
                <Text className="text-lg font-bold">Claudio Perroni</Text>
                <Text className="text-gray-500">iFortech s.r.l.</Text>
            </View>

            <View>
                <ChevronRightIcon className="text-gray-500" />
            </View>

        </TouchableOpacity>

      </View>

      <View className="p-4 mb-4">

        <TouchableOpacity className="bg-gray-100  p-2 rounded shadow flex-row space-x-4 items-center" onPress={ () => setShowModalPassword(true)}>

            <View className="flex-1">
                <Text className="font-bold">Cambia password</Text>
            </View>

            <View>
                <ChevronRightIcon className="text-gray-500" />
            </View>

        </TouchableOpacity>

      </View>

      <View className="p-4 mb-4">

        <TouchableOpacity className="flex-row items-center justify-center">
            <Text className="text-xl text-red-500">Logout</Text>
        </TouchableOpacity>

      </View>

      <View className="flex-row items-center justify-center">

        <Text className="text-gray-300">Versione App 0.1</Text>

      </View>

      <Modal
        visible={showProfileModal}
        animationType="slide"
        // presentationStyle="formSheet"
        transparent={true}
      >

        <View className="flex-1 justify-center items-center bg-[#00000053] relative">

          <View className="bg-white p-4 absolute inset-x-0 bottom-0 rounded">

            <ScrollView className="bg-white mt-4">

              <View className="px-4 mb-2">
                <Text className="text-xl font-bold mb-2">Nome</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>
              
              <View className="px-4 mb-2">
                <Text className="text-xl font-bold mb-2">Cognome</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>
              
              <View className="px-4 mb-2">
                <Text className="text-xl font-bold mb-2">Telefono</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>
              
              <View className="px-4 mb-4">
                <Text className="text-xl font-bold mb-2">Email</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>

              <View className="px-4 mb-2">

                <TouchableOpacity
                  className="bg-[#00e676] p-3 rounded-full"
                  onPress={() => setShowModalProfile(false)}
                >
                  <Text className="font-bold text-white text-center">Conferma</Text>
                </TouchableOpacity>

              </View>

              

            </ScrollView>

          </View>

        </View>

      </Modal>
      
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        // presentationStyle="formSheet"
        transparent={true}
      >

        <View className="flex-1 justify-center items-center bg-[#00000053] relative">

          <View className="bg-white p-4 absolute inset-x-0 bottom-0 rounded">

            <ScrollView className="bg-white mt-4">

              <View className="px-4 mb-2">
                <Text className="text-xl font-bold mb-2">Password attuale</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>

              <View className="px-4 mb-2">
                <Text className="text-xl font-bold mb-2">Nuova Password</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>
              
              <View className="px-4 mb-2">
                <Text className="text-xl font-bold mb-2">Ripeti nuova password</Text>
                <TextInput
                  className="p-4 rounded border border-gray-200 outline-0"
                  
                  value=""
                  // onChangeText={(newText) => handleOnChange("subject", newText)}
                />
              </View>

              <View className="px-4 mb-2">

                <TouchableOpacity
                  className="bg-[#00e676] p-3 rounded-full"
                  onPress={() => setShowModalPassword(false)}
                >
                  <Text className="font-bold text-white text-center">Conferma</Text>
                </TouchableOpacity>

              </View>

              

            </ScrollView>

          </View>

        </View>

      </Modal>

 


    </SafeAreaView>
  );
};


export default SettingsScreen;

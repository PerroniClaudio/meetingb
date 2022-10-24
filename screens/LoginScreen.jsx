import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
  
} from "react-native";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const {isLoading, isError, message} = useSelector(state => state.auth)
  const {username, password} = formData

  useEffect(() => {
    if(isError) {
      Toast.show({
        type: 'error',
        text1: 'Errore',
        text2: message
      });
    }
  
    dispatch(reset())

  }, [isError, message])
  

  const handleOnChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onSubmit = () => {

    const userData = {
        username,
        password
    }

    dispatch(login(userData))

  }

  const renderView = () => {
    return <>
      <View className="flex-1 justify-center items-center bg-[#00e676] px-4">
        <View className="bg-white p-4 rounded w-full h-3/5">
          <View className="p-4">
            <Text className="text-4xl font-extrabold text-center">
              Meeting<Text className="text-[#00e676]">B</Text>
            </Text>
          </View>

          <View className="px-4 flex-1 items-center justify-center mb-2">
            <View className="mb-2 w-full">
              <Text className="text-xl text-center font-bold mb-2">Email</Text>
              <TextInput
                className="p-4 rounded border border-gray-200 outline-0"
                value={username}
                onChangeText={(newText) => handleOnChange("username", newText)}
              />
            </View>

            <View className="w-full">
              <Text className="text-xl text-center font-bold mb-2">
                Password
              </Text>
              <TextInput
                className="p-4 rounded border border-gray-200 outline-0"
                secureTextEntry={true}
                value={password}
                onChangeText={(newText) => handleOnChange("password", newText)}
              />
            </View>
          </View>

          <View className="px-4 mb-4">
            <TouchableOpacity
              className="bg-[#00e676] p-3 rounded-full h-16 justify-center items-center"
              onPress={() => onSubmit()}
            >
              <Text className="font-bold text-white text-center">ACCEDI</Text>
            </TouchableOpacity>
          </View>

          <View className="px-4 mb-2">
            <TouchableOpacity>
              <Text className="text-[#00e676] text-center">
                Hai dimenticato la password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  }

  if( isLoading ) {
    return <Spinner />
  }

  if(Platform.OS !== "web") {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        className="h-full w-full "
      >

        {renderView()}
  
      </TouchableWithoutFeedback>
    );
  } else {
    return renderView()
  }

};

export default LoginScreen;

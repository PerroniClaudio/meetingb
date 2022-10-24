import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://meetingb.com/v2/api'
const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
}

const login = async ( userData ) => {

    const response = await axios.post(
        API_URL + "/auth/login" , 
        userData,
        headers
    ) 

    if(response.data) {
        setDataByKey('user', JSON.stringify(response.data))
    }

    return response.data

}

const logout = () => localStorage.removeItem('user')


const getDataByKey = async (key) => {
    const value = await AsyncStorage.getItem(key)
    return value
}

const setDataByKey = async (key, value) => {
    await AsyncStorage.setItem(key, value)
}

const authService = {
    login,
    logout
}

export default authService
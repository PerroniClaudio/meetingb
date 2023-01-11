import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://meetingb.com/v2/api'

const getListForUser = async (params, token) => {

    const urlparams = new URLSearchParams(params)
    const config = {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'bearer' : token
        }
    }

    const response = await axios.get(
        API_URL + `/event/user?${urlparams}` , 
        config
    ) 

    return response.data

}

const editEvent =  async (params, token) => {

    const config = {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'bearer' : token
        }
    }

    const response = await axios.patch(
        API_URL + "/event/" + params.get("mid") , 
        params,
        config
    )

    return response.data


}

const getListCalendar =  async (userData) => {

    const params = new URLSearchParams(userData)

    const response = await axios.get(
        API_URL + `/event/user?${params}` , 
        headers
    ) 

    return response.data

}


const newEvent =  async (params, token) => {

    const config = {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'bearer' : token
        }
    }

    const response = await axios.post(
        API_URL + "/event/",
        params,
        config
    )

    return response.data

}



const deeleteEvent =  async (userData) => {

    const response = await axios.delete(
        API_URL + "/event/" , 
        userData,
        headers
    )

    return response.data


}


const eventService = {
    getListForUser,
    getListCalendar,
    newEvent,
    editEvent,
    deeleteEvent
}

export default eventService
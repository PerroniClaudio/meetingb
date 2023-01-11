import axios from "axios";
const API_URL = 'https://meetingb.com/v2/api'

const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
}

const getActiveUserData = async ( token ) => {

    const config = {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'bearer' : token
        }
    }

    const response = await axios.get(
        API_URL + `/user/me`, 
        config
    ) 

    return response.data

}

const userService = { getActiveUserData }

export default userService
import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initUser } from '../features/auth/authSlice' 


export const useLoggedUser = () => {

    const dispatch = useDispatch()

    const getUser = async () => {
        let userData = await getDataByKey('user')
        return JSON.parse(userData)
    }
  
    const getDataByKey = async (key) => {
        const value = await AsyncStorage.getItem(key)
        return value
    }

    useEffect(() => {

        const checkLoggedUser = async () => {
    
          let user = await getUser()
    
          if(user != null) {
            dispatch(initUser(user))
          }
    
        }
    
        checkLoggedUser()
    
    }, [])
      

}
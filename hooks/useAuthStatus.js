import { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useLoggedUser } from './useLoggedUser'


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const {user} = useSelector( (state) => state.auth)

    const loggeduser = useLoggedUser()

    useEffect( () => {

        if(user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setCheckingStatus(false)
    }, [user])

    return {loggedIn, checkingStatus}

}
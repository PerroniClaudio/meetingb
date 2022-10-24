import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
    event: {},
    events: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const eventSlice = createSlice({
    name: 'events',
    initialState: initialState,
    reducers : {
        reset: (state) => {
            state.event = {}, 
            state.events = [], 
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        
    }
})

export const { reset } = eventSlice.actions

export default eventSlice.reducer
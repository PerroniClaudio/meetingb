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

export const getListForUser = createAsyncThunk('event/user', async (params, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token
        return await eventService.getListForUser(params, token)
        
    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.error_message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)

    }

})

export const editEvent = createAsyncThunk('event/edit', async (params, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token
        const fd = new FormData()

        for (const [key, value] of Object.entries(params)) {
            fd.append(key, value)
        }

        return await eventService.editEvent(fd, token)
        
    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.error_message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)

    }

})

export const newEvent = createAsyncThunk('event/new', async (params, thunkAPI) => {

    try {

        const token = thunkAPI.getState().auth.user.token
        const fd = new FormData()

        for (const [key, value] of Object.entries(params)) {
            fd.append(key, value)
        }

        return await eventService.newEvent(fd, token)
        
    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.error_message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)

    }

})

export const eventSlice = createSlice({
    name: 'events',
    initialState: initialState,
    reducers : {
        reset: (state) => {
            state.event = {}
            state.events = []
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        resetSettings: (state) => {

            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        setEvent: (state, action) => {
            state.event = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListForUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListForUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.events = action.payload.events
            })
            .addCase(getListForUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.events = null
            })
            
            .addCase(editEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.event = action.payload.event
            })
            .addCase(editEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.event = null
            })

            .addCase(newEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.event = action.payload.event
            })
            .addCase(newEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.event = null
            })
    }
})

export const { reset,resetSettings, setEvent } = eventSlice.actions

export default eventSlice.reducer
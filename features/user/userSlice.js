import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    user: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getActiveUserData = createAsyncThunk('/user/me', async (token, thunkApi) => {

    try {
        //const token = thunkAPI.getState().auth.user.payload.token
        return await userService.getActiveUserData(token)
        
    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.error_message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
        
    }

})

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers : {
        reset: (state) => {
            state.user = {}
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getActiveUserData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getActiveUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user_data
        })
        builder.addCase(getActiveUserData.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = {}
        })
    }
})

export const { reset } = userSlice.actions

export default userSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {

    try {

        return await authService.login(user)
        
    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.error_message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
        
    }

})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice ({
    name : 'auth',
    initialState: initialState,
    reducers : {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        initUser: (state, user) => {
            state.user = user
        }
    }, 
    extraReducers: (builder) => {

        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

    }
})

export const { reset, initUser } = authSlice.actions

export default authSlice.reducer
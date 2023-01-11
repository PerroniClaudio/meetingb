import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/events/eventSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    user: userReducer
  }
});

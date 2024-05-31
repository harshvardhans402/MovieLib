import { createSlice } from "@reduxjs/toolkit";
import { serializeState, deserializeState } from './common.js'

// Serialize state to JSON including token


const initialState = {
    userId: "",
    username: "",
    token: "", // Add token property to store JWT token
    isLoggedIn: false
};

const savedState = deserializeState();

const userSlice = createSlice({
    name: "user",
    initialState: savedState || initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.token = action.payload.token; // Store JWT token
            state.isLoggedIn = true;


            serializeState(state); // Save state to localStorage after login
        }

    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

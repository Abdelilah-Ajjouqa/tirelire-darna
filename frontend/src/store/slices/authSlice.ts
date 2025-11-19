import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthState, User } from "../types";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: false,
    loading: false,
    error: null,
}

/**
 * create thunks
 */
export const register = createAsyncThunk(
    'auth/register',
    async (userData: { firstName: string, lastName: string, email: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", userData);
            localStorage.setItem('token', res.data.data.token);

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (userData: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:3001/api/auth/login", userData);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


/**
 * create slices
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        /**
        * register
        */
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        /**
        * login
        */
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.error = null;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})
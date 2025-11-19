import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState } from "../types";
import authService from "../../components/api/authService";

const token = localStorage.getItem('token');

const initialState: AuthState = {
    user: null,
    token: token ? token : null,
    refreshToken: null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
};

export const register = createAsyncThunk(
    'auth/register',
    async (user: any) => {
        try {
            return await authService.register(user);
        } catch (error: any) {
            return error.response.message;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user: any) => {
        try {
            return await authService.login(user);
        } catch (error: any) {
            return error.response.message;
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        authService.logout();
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    }
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
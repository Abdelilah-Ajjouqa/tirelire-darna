import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState } from "../types/types";
import authService from "../../components/api/authService";

const isTokenExist = localStorage.getItem('token');

const initialState: AuthState = {
    user: null,
    token: isTokenExist ? isTokenExist : null,
    refreshToken: null,
    isAuthenticated: !!isTokenExist,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (user: any, { rejectWithValue }) => {
        try {
            return await authService.register(user);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (user: any, { rejectWithValue }) => {
        try {
            return await authService.login(user);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        authService.logout();
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            return await authService.checkAuth()
        } catch (error: any) {
            localStorage.removeItem('token');
            return rejectWithValue('Token validation failed')
        }
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })

            //check auth
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
    }
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
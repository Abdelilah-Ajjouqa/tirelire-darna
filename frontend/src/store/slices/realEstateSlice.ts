import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RealEstateState, Property } from '../types/realEstate';
import realEstateService from '../../components/api/realEstateService';

const initialState: RealEstateState = {
    properties: [],
    loading: false,
    error: null,
    selectedProperty: null,
};

// Async thunk to fetch properties
export const fetchProperties = createAsyncThunk(
    'realEstate/fetchProperties',
    async (_, { rejectWithValue }) => {
        try {
            const response = await realEstateService.getProperties();
            return response.data || response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
        }
    }
);

const realEstateSlice = createSlice({
    name: 'realEstate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default realEstateSlice.reducer;
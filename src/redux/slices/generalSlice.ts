import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as generalApi from '../api/generalApi';
import type { RootState } from '../store';
import type { User, Category } from '../../types/general.interface';

interface GeneralState {
  users: User[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: GeneralState = {
  users: [],
  categories: [],
  loading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk('general/fetchUsers', async () => {
  return await generalApi.getUsers();
});

export const fetchCategoriesThunk = createAsyncThunk('general/fetchCategories', async () => {
  return await generalApi.getCategories();
});

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const selectUsers = (state: RootState) => state.general.users;
export const selectCategories = (state: RootState) => state.general.categories;
export const selectGeneralLoading = (state: RootState) => state.general.loading;
export const selectGeneralError = (state: RootState) => state.general.error;

export default generalSlice.reducer; 
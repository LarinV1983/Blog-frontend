import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (params) => {
	const {data} = await axios.post('/login', params);
	return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
	const {data} = await axios.post('/register', params);
	return data;
});

export const fetchUserMe = createAsyncThunk('auth/fetchUserMe', async () => {
	const {data} = await axios.get('/me');
	return data;
});

const initialState = {
	data: null,
	status: 'loading',
};

const authSlice = createSlice ({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		}
	},
	extraReducers: {
		[fetchUser.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchUser.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchUser.rejected]: (state) => {
			state.status = 'error';
			state.data = null;
		},
		[fetchUserMe.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchUserMe.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchUserMe.rejected]: (state) => {
			state.status = 'error';
			state.data = null;
		},
		[fetchRegister.pending]: (state) => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: (state) => {
			state.status = 'error';
			state.data = null;
		},
	},
}); 

export const selectIsAuth = (state) => Boolean(state.login.data); 

export const LoginReducer = authSlice.reducer;

export const {logout} = authSlice.actions;  
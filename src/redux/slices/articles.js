import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {	
		items: [],
		status: 'loading', 
	},
};

const articlesSlice = createSlice ({
	name: 'posts',
	initialState,
	reducer: {},
});

export const articlesReducer = articlesSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchArticles = createAsyncThunk('posts/fetchArticles', async () =>{
	const {data} = await axios.get('/articles');
	return data; 
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () =>{
	const {data} = await axios.get('/tags');
	return data; 
});

export const fetchRemoveArticles = createAsyncThunk('posts/fetchRemoveArticles', async (id) =>{
	const {data} = await axios.delete(`/articles/${id}`);
});

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
	reducers: {},
	extraReducers: {
		[fetchArticles.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = 'loading';
		},
		[fetchArticles.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = 'loaded';
		},
		[fetchArticles.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = 'error';
		},
		[fetchTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.status = 'loading';
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.status = 'loaded';
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.status = 'error';
		},
		[fetchRemoveArticles.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter((obj) => obj.id !== action.meta.arg);
		},
		
		[fetchRemoveArticles.rejected]: (state) => {
			state.posts.status = 'error';
		},
	},
});

export const articlesReducer = articlesSlice.reducer;

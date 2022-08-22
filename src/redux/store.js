import {configureStore} from '@reduxjs/toolkit';
import {articlesReducer} from './slices/articles';

const store = configureStore({
	reducer: {
		posts: articlesReducer,
	},

});

export default store;


import {configureStore} from '@reduxjs/toolkit';
import {articlesReducer} from './slices/articles';
import {LoginReducer} from './slices/auth';

const store = configureStore({
	reducer: {
		posts: articlesReducer,
		login: LoginReducer,
	},

});

export default store;


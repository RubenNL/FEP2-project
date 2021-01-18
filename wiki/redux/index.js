import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userStore from './userStore.js'

const store = configureStore({
	reducer: combineReducers({
		userStore
	})
})

store.subscribe(() => {
	const userStore = store.getState().userStore;
	localStorage.setItem('userStore', JSON.stringify(userStore));
})

export default store

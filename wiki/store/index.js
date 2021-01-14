import { configureStore, combineReducers } from 'https://cdn.skypack.dev/@reduxjs/toolkit@1.2.3';

import userStore from './userStore.js'
//import darkMode from './darkMode.js'

const store = configureStore({
	reducer: combineReducers({
		userStore,
//		darkMode,
	})
})

store.subscribe(() => {
	const userStore = store.getState().userStore
	localStorage.setItem('userStore', JSON.stringify(userStore))
//	const darkMode = store.getState().darkMode
//	localStorage.setItem('darkMode', JSON.stringify(darkMode))
})

export default store

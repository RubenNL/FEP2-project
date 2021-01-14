import { createSlice, createSelector } from 'https://cdn.skypack.dev/@reduxjs/toolkit@1.2.3';
import store from './index.js'

const savedState = JSON.parse(localStorage.getItem('userStore')) || {}

//--------- Reducers ---------//
function parseJwt (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	return JSON.parse(jsonPayload);
};

function loginReducer(state, action) {
	return {jwt:action.payload,...parseJwt(action.payload)};
}

function logoutReducer(state, action) {
	return {}
}

//--------- Selectors ---------//
const jwtSelector = createSelector(
	state => state.userStore,
	login => {
		return login.jwt
	}
)

const emailSelector = createSelector(
	state => state.userStore,
	login => {
		return login.email
	}
)
const nameSelector = createSelector(
	state => state.userStore,
	login => {
		return login.fullName
	}
)
//--------- Slice ---------//
const userStore = createSlice({
	name: 'userStore',
	initialState: savedState,
	reducers: {
		login: loginReducer,
		logout: logoutReducer
	}
})

//--------- Export slice values ---------//
export const getJwt = () => jwtSelector(store.getState())
export const getEmail= () => emailSelector(store.getState())
export const getName= () => nameSelector(store.getState())

//--------- Export slice actions ---------//
export const {
	login,
	logout
} = userStore.actions

//--------- Export slice reducer ---------//
export default userStore.reducer

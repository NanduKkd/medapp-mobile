import actionTypes from '../actionTypes'
import { readUser, writeUser, deleteUser } from '../../utils/storage'
import axios from '../../utils/axios'

const userInit = () => {
	return async dispatch => {
		let { token, ...data } = /*{token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDEzMjQxNjQzYTA1YTc4MjVkNjIwMyIsInR5cGUiOiJkb2N0b3IiLCJpYXQiOjE2NTc4NzcxNjYsImV4cCI6MTY2MDQ2OTE2Nn0.To-SYyPUTyF9FQggf18xN-21uLEMhPXs4HzuAfR0ULI', name: "Nandu", email: "haha"}*/ await readUser();
		console.log('reading',token, data)
		if(token) {
			dispatch({ type: actionTypes.USER_DATA, data, token })
			axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
			const response = await axios.get('/v1/profile')
			console.log(response.data, 'after checking auth')
			data = response.data;
			if(response.status===200)
				dispatch({ type: actionTypes.USER_DATA, data, token })
			else {
				axios.defaults.headers.common["Authorization"] = undefined;
				dispatch({ type: actionTypes.USER_LOGOUT })
				console.log('received response', response)
			}
		} else
			dispatch({ type: actionTypes.USER_LOGOUT })
	}
}

const userLogin = (phone, password) => {
	return async dispatch => {
		dispatch({ type: actionTypes.USER_LOADING, loading: true })
		const response = await axios.post('/v1/auth/login', { phone, password })
		if(response.status===200) {
			const { token, ...data } = response.data;
			axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
			writeUser({ token, ...data })
			dispatch({ type: actionTypes.USER_DATA, token, data })
		} else {
			dispatch({ type: actionTypes.USER_LOADING, loading: false })
			return response.data.message;
		}
	}
}

const userSignup = ({ phone, password, name, gender, email, dob, address }) => {
	return async dispatch => {
		dispatch({ type: actionTypes.USER_LOADING, loading: true })
		const response = await axios.post('/v1/auth/signup', { phone, password, name, gender, email, dob, address })
		if(response.status===200) {
			const { token, ...data } = response.data;
			axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
			writeUser({ token, ...data })
			dispatch({ type: actionTypes.USER_DATA, token, data })
		} else {
			dispatch({ type: actionTypes.USER_LOADING, loading: false })
			return response.data.message;
		}
	}
}

const userLogout = () => {
	return async dispatch => {
		dispatch({ type: actionTypes.USER_LOADING, loading: true })
		axios.defaults.headers.common["Authorization"] = undefined
		deleteUser()
		dispatch({ type: actionTypes.USER_LOGOUT })
	}
}

export const userActions = {
	userInit,
	userLogin,
	userSignup,
	userLogout
}

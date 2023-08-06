import actionTypes from '../actionTypes'

const initialState = {
	init: true,
	loading: true,
	token: null,
	data: {}
}

export default function user(state=initialState, action) {
	switch(action.type) {
		case actionTypes.USER_LOADING:
			return { ...state, loading: action.loading }
		case actionTypes.USER_DATA:
			return { ...state, token: action.token, data: action.data, init: false, loading: false }
		case actionTypes.USER_LOGOUT:
			return { ...state, token: null, data: {}, loading: false, init: false }
		default:
			return state;
	}
}

import actionTypes from '../actionTypes'

const initialState = {
	init: true
}

export default function user(state=initialState, action) {
	switch(action.type) {
		case actionTypes.APP_INIT:
			return {...state, init: false}
		default:
			return state
	}
}

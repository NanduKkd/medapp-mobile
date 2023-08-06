import actionTypes from '../actionTypes'

const initialState = {
	loading: false,
	error: null,
	doctor: null,
	profile: null,
	meeting: null,
	publicKey: null,
	ws: null,
}

export default function meet(state=initialState, action) {
	switch(action.type) {
		case actionTypes.MEET_LOADING:
			return { ...state, loading: true, error: null }
		case actionTypes.MEET_CONNECT:
			return { ...state, profile: action.profile, doctor: action.doctor, error: null, loading: false, ws: action.ws, meeting: action.meeting, publicKey: action.publicKey }
		case actionTypes.MEET_CLOSE:
			return { ...state, profile: null, doctor: null, error: action.error||null, loading: false, ws: null, publicKey: null }
		default:
			return state
	}
}

import actionTypes from '../actionTypes'

const initialState = {
	loading: false,
	folders: [],
}

export default function docs(state=initialState, action) {
	switch( action.type ) {
		case actionTypes.DOC_LOADING:
			return {...state, loading: action.loading}
		/*
		case actionTypes.DOC_LIST:
			state = {...state, loading: false}
			state.folders = [...state.folders, action.]
			}
			return {...state, loading: false, folders: [...state.folders, {}]list: action.list}
			*/
		case actionTypes.FOLDER_LIST:
			return {...state, loading: false, folders: action.list}
		case actionTypes.FOLDER_ADD:
			return { ...state, loading: false, folders: [...state.folders, action.folder] }
		default:
			return state
	}
}

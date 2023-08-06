import actionTypes from '../actionTypes'

const appInit = () => {
	return async dispatch => {
		setTimeout(() => {
			dispatch({ type: actionTypes.APP_INIT })
		}, 1000)
	}
}

export const appActions = { appInit }

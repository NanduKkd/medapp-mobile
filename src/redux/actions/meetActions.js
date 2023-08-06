import actionTypes from '../actionTypes'
import { connectSocket } from '../../utils/socket'
import rnfs from 'react-native-fs'
import { encryptRSA } from '../../utils/rsa'

const connectDoctor = (doctor) => {
	return async (dispatch, getState) => {
		dispatch({ type: actionTypes.MEET_LOADING, loading: true })
		const ws = connectSocket()
		ws.onopen = () => {
			ws.send(JSON.stringify({ type: 'patient_connect', auth: 'Bearer ' + getState().user.token, doctor }))
			ws.onmessage = (msg) => {
				msg = JSON.parse(msg.data)
				if(msg.error) {
					throw msg.error
				} else {
					if(msg.type==='patient_connect_accept'){
						dispatch({ type: actionTypes.MEET_CONNECT, doctor: msg.doctor, profile: msg.profile, meeting: msg.meeting, ws, publicKey: msg.publicKey })
					} else if(msg.type==='patient_connect_close') {
						dispatch({ type: actionTypes.MEET_CLOSE })
						ws.close();
					}
				}
			}
			ws.onclose = (e) => {
				if(getState().meet.doctor) {
					dispatch({ type: actionTypes.MEET_CLOSE, error: e.reason })
					console.log('meeting closed', e.reason, e.code)
				}
			}
		}
	}
}
const shareDocuments = (documents) => {
	return async (dispatch, getState) => {
		const { ws, doctor, meeting } = getState().meet
		if(ws) {
			alert(JSON.stringify(documents))
			ws.send(JSON.stringify({ type: 'patient_share', documents, auth: 'Bearer '+getState().user.token, doctor, meeting }))
		}
	}
}
export const meetActions = {
	connectDoctor,
	shareDocuments,
}

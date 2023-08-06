import actionTypes from '../actionTypes'
import axios from '../../utils/axios'

const loadDocs = (folder) => {
	return async dispatch => {
		dispatch({ type: actionTypes.DOC_LOADING, loading: true })
		try {
			const res = await axios.get('/v1/document/'+folder)
			if(res.status!==200) throw 'Status code '+res.status+' '+res.data.message
			dispatch({ type: actionTypes.DOC_LIST, list: res.data.list, folder })
		} catch (error) {
			dispatch({ type: actionTypes.DOC_LOADING, loading: false })
		}
	}
}

const loadFolders = () => {
	return async dispatch => {
		dispatch({ type: actionTypes.DOC_LOADING, loading: true })
		try {
			const res = await axios.get('/v1/folder')
			if(res.status!==200) throw 'Status code '+res.status+' '+res.data.message
			dispatch({ type: actionTypes.FOLDER_LIST, list: res.data.list })
		} catch (error) {
			dispatch({ type: actionTypes.DOC_LOADING, loading: false })
			console.log(error)
		}
	}
}

const addFolder = (name) => {
	return async dispatch => {
		dispatch({ type: actionTypes.DOC_LOADING, loading: true })
		try {
			const res = await axios.post('/v1/folder/', {name})
			if(res.status!==201) throw 'Status code '+res.status+' '+res.data.message
			dispatch({ type: actionTypes.FOLDER_ADD, folder: res.data })
		} catch (error) {
			dispatch({ type: actionTypes.DOC_LOADING, loading: false })
			console.log(error)
		}
	}
}

const deleteFolder = (folder) => {
	return async dispatch => {
		dispatch({ type: actionTypes.DOC_LOADING, loading: true })
		try {
			const res = await axios.post('/v1/folder/'+folder)
			if(res.status!==204) throw 'Status code '+res.status+' '+res.data.message
		} catch (error) {
			dispatch({ type: actionTypes.DOC_LOADING, loading: false })
			console.log(error)
		}
	}
}

export const docActions = {
	loadDocs, loadFolders, addFolder, deleteFolder
}

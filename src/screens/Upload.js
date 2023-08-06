import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import DocumentPicker, { types } from 'react-native-document-picker'
import { docActions } from '../redux/actions'
import axios from '../utils/axios'
import rnfs from 'react-native-fs'
import Aes from 'react-native-aes-crypto'


function Upload({ loadFolders, navigation, route, docs }) {
	const { index } = route.params
	const [ file, setFile ] = useState(null)
	const [ name, setName ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const validity = useMemo(() => file&&name&&!loading, [file, name, loading])
	const onPick = async () => {
		const res = await DocumentPicker.pickSingle({ type: [ types.pdf, 'image/jpeg', 'image/png' ] })
		setFile(res)
	}
	const upload = async() => {
		try {
			setLoading(true)

			const key = await Aes.pbkdf2("secret password", 'salt', 5000, 256)
			
			const iv = await Aes.randomKey(16)
			const base64 = await rnfs.readFile(file.uri, 'base64')
			const cipher = await Aes.encrypt(base64, key, iv, 'aes-256-cbc')
			//const res = await axios.post('/v1/document/encrypted/'+docs.folders[index]._id, {name, cipher: base64, iv, filename: file.name, mime: file.type, size: file.size} )
			const res = await axios.post('/v1/document/'+docs.folders[index]._id, {name, cipher: base64, iv, filename: file.name, mime: file.type, size: file.size} )
			if(res.status===200) {
				try {
					await rnfs.writeFile(rnfs.DocumentDirectoryPath+'/keys/'+res.data, key)
				} catch (e) {
					if(e.code==='ENOENT') {
						await rnfs.mkdir(rnfs.DocumentDirectoryPath+'/keys')
						await rnfs.writeFile(rnfs.DocumentDirectoryPath+'/keys/'+res.data, key)
					} else throw e;
				}
				loadFolders();
				navigation.goBack()
			} else {
				console.error('status '+res.status+' '+JSON.stringify(res.data))
				alert('status '+res.status)
			}
			/*
			const base64 = await rnfs.readFile(file.uri, 'base64')
			const cipherText = await crypto.subtle.encrypt({
				name: 'AES-CBC', iv: crypto.getRandomValues(new Uint8(16))
			}, key, new TextEncoder().encode(base64))

			const res = await axios.post('/v1/document/'+docs.folders[index]._id, {name, cipherText} })
			if(res.status===200) {
				loadFolders();
				navigation.goBack()
			} else {
				console.error('status '+res.status+' '+JSON.stringify(res.data))
			}
			*/

			/*
			const data = new FormData()
			data.append('name', name)
			data.append('file', file)
			const res = await axios.post('/v1/document/'+docs.folders[index]._id, data, { headers: { 'Content-Type': 'multipart/form-data' } })
			if(res.status===200) {
				loadFolders();
				navigation.goBack()
			} else {
				console.error('status '+res.status+' '+JSON.stringify(res.data))
			}
			*/

		} catch (e) {
			alert("Unknown Error");
			console.log(e.message, e.code)
		}
		setLoading(false)
	}
	return (
		<View style={styles.Outer}>
			<TouchableOpacity style={styles.InputOuter} onPress={() => onPick()}>
				<Text style={[styles.InputText, { color: file?'#000':'#888' }]}>{file?.name || "Select a document"}</Text>
				<Image style={styles.InputIcon} source={require('../assets/open.png')} />
			</TouchableOpacity>
			<View style={styles.InputOuter}>
				<TextInput style={styles.InputText} placeholder="Enter document name" placeholderTextColor='#888' value={name} onChangeText={setName} />
				<Image style={styles.InputIcon} source={require('../assets/edit.png')} />
			</View>
			<TouchableOpacity disabled={!validity} onPress={() => upload()} style={[styles.Button, { backgroundColor: validity?'#080':'#aaa' }]}>
				<Text style={styles.ButtonText}>Upload</Text>
			</TouchableOpacity>
			{loading && (
				<View style={{margin: 30, alignSelf: 'center'}}>
					<ActivityIndicator size="large" color="#777" />
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	Outer: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
	Label: {
		color: '#000'
	},
	InputOuter: {
		borderWidth: 1,
		borderColor: '@aaa',
		bordeRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	InputText: {
		flex: 1,
		paddingHorizontal: 10,
		textAlignVertical: 'center',
		fontSize: 16,
		lineHeight: 21,
		height: 40,
		color: '#000',
	},
	InputIcon: {
		height: 20,
		width: 20,
		marginRight: 10,
	},
	Button: {
		backgroundColor: '#080',
		borderRadius: 10,
		paddingVertical: 15,
	},
	ButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
})

export default connect(({docs}) => ({docs}), docActions)(Upload)

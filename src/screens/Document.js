import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Share, TouchableOpacity, Alert } from 'react-native'
import Constants from '../utils/constants'
import rnfs from 'react-native-fs'
import Aes from 'react-native-aes-crypto'

function Document({ route, navigation }) {
	const params = route.params
	const [ img, setImg ] = useState('')
	useEffect(() => {
		navigation.setOptions({ 
			headerRight: ({tintColor}) => (
				<TouchableOpacity onPress={() => Share.share({message: `${Constants.PROTOCOL}://${Constants.DOMAIN}/files/${params.filename}`})} style={{height: 60, width: 60, alignItems: 'center', justifyContent: 'center'}}>
					<Image style={{tintColor, height: 20, width: 20, resizeMode: 'contain'}} source={require('../assets/share.png')} />
				</TouchableOpacity>
				//<Text style={{color: '#00f'}}>Share</Text>
			)
		})
		let key;
		rnfs.readFile(rnfs.DocumentDirectoryPath+'/keys/'+params._id).catch(e => {
			console.log(e.message)
		}).then(str => {
			key = str;
			return fetch(`${Constants.PROTOCOL}://${Constants.DOMAIN}/files/${params.filename}`)
		}).then(res => {
			return res.blob()
		}).then(blob => {
			let reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.addEventListener("loadend", function() {
					resolve(reader.result.substring(37))
				});
				reader.readAsDataURL(blob);
			})
		}).then(base64 => {
			let cipher = Aes.decrypt(cipher, key, params.iv, 'aes-256-cbc')
			setImg(`data:${params.mimetype};base64,${base64}`)
		}).catch(e => {
			console.error(e)
			Alert.alert("Error", "Something went wrong. Please try again later.", [{text: "Ok", onPress: () => {
				navigation.goBack();
			}}])
		})
	}, [])
	return (
		<View style={{ flex: 1 }}>
			{params.mimetype==='application/pdf'?(
				<Text style={{color: '#000', textAlign: 'center', marginTop: 100}}>[PDF File]</Text>
			):(
				/*<Image style={{ flex: 1, resizeMode: 'contain' }} source={{ uri: `${Constants.PROTOCOL}://${Constants.DOMAIN}/files/${params.filename}` }} />*/
				<Image style={{ flex: 1, resizeMode: 'contain' }} source={{ uri: img }} />
			)}
		</View>
	)
}

export default Document

import React, { useCallback, useEffect, useState } from 'react'
import { View, Modal, Dimensions, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { docActions } from '../redux/actions'
import Constants from '../utils/constants'

import { useFocusEffect } from '@react-navigation/native'

const unitWidth = Dimensions.get('screen').width/3

function Home({ navigation, meet, docs, loadDocs, loadFolders, addFolder }) {
	useEffect(() => {
		loadFolders();
		/*
		console.log('+++++++++++++++++')
		let key = 'MIIBCgKCAQEAtZDb/x2XiohzQ4ANTSgJhsEVa+7tH4iGGddZwFnRzY7apDyEgd4bkt5cI87Ev3bfPFXqVIKyH32JLKlhPtK1dVCX6NQTQfPefqgWxTQ50PklGGvuQBVLgo4kb6RHpx7Fm6N7vpJdGhwszom2041cnJa4dWOFd1n8BgUaC8EQwzSlMXbv9WoEhGi7i+T78yBfFpCM0xolnynS2rQpbPR63xlNPy7N2MLS7lBjXHiKJUO8Jm0FPrYFdvJlVjizBCfVJM53kD6Z7jpjOkgJCwsCEZ0vI0RbVp25/Xujw2QZ/xP8EPrlFIIUKdOR4FpB3HskUhbIC4Aj7NoAMwuK3FqugwIDAQAB'
		RSA.encrypt("Luv u ammuze", changeKeyFormat(key)).then(enc => {
			console.log(enc, 'encrypted!!')
		})
		RSA.generateKeys(2048).then(keys => {
			RSA.encrypt("269638", keys.public).then(enc => console.log(enc))
		})
		*/
	}, [])
	const [ createModal, setCreateModal ] = useState(false)
	const [ newName, setNewName ] = useState('')
	useFocusEffect(useCallback(() => {
		navigation.setOptions({ 
			headerRight: ({tintColor}) => (
				<>
					<TouchableOpacity onPress={() => navigation.navigate('Scan')} style={styles.HeaderButton}>
						<Image style={[styles.HeaderIcon, {tintColor}]} source={require('../assets/qr.png')} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Medication')} style={styles.HeaderButton}>
						<Image style={[styles.HeaderIcon, {tintColor}]} source={require('../assets/medicine.png')} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.HeaderButton}>
						<Image style={[styles.HeaderIcon, {tintColor}]} source={require('../assets/profile.png')} />
					</TouchableOpacity>
				</>
			)
		})
	}, []))
	const onAddFolder = () => {
		addFolder(newName)
		setNewName('')
		setCreateModal(false)
	}
	return (
		<>
			{meet.doctor && (
				<TouchableOpacity style={styles.MeetButton} onPress={() => navigation.navigate('Meet')}>
					<Text style={styles.MeetText}>You are consulting... <Text style={styles.Underline}>See details</Text></Text>
				</TouchableOpacity>
			)}
			<FlatList
				data={docs.folders}
				numColumns={3}
				refreshing={docs.loading}
				onRefresh={() => loadFolders()}
				keyExtractor={(_,i) => i+'_'}
				renderItem={({item, index}) => (
					<TouchableOpacity onPress={() => navigation.navigate('Folder', {index})} style={styles.DocOuter}>
						<Image style={styles.DocThumbnail} source={require('../assets/folder.png')} />
						<Text style={styles.DocName}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
			<Modal transparent onRequestClose={() => setCreateModal(true)} visible={createModal}>
				<View style={styles.ModalOuter}>
					<View style={styles.ModalInner}>
						<View style={styles.ModalHeader}>
							<Text style={styles.ModalTitle}>Create a new folder</Text>
						</View>
						<View style={styles.ModalContent}>
							<Text style={styles.ModalLabel}>Enter folder name</Text>
							<TextInput style={styles.ModalInput} value={newName} onChangeText={setNewName} />
						</View>
						<View style={styles.ModalFooter}>
							<TouchableOpacity style={styles.ModalButton} onPress={() => setCreateModal(false)}>
								<Text style={styles.ModalButtonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.ModalButton} onPress={onAddFolder}>
								<Text style={styles.ModalButtonText}>Create</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<TouchableOpacity onPress={() => setCreateModal(true)} style={styles.AddButton}>
				<Image style={styles.AddIcon} source={require('../assets/newfolder.png')} />
			</TouchableOpacity>
			{/*
			*/}
		</>
	)
}

const styles = StyleSheet.create({
	HeaderButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		width: 60,
	},
	HeaderIcon: {
		height: 30,
		width: 30,
	},
	HeaderButtonText: {
		color: '#00f',
	},
	Outer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	Label: {
		color: '#000'
	},
	DocOuter: {
		width: unitWidth,
		alignItems: 'center',
		marginTop: 10,
	},
	DocThumbnail: {
		height: 80,
		width: 80,
		margin: 20,
	},
	DocName: {
		color: '#000',
	},
	MeetButton: {
		backgroundColor: '#fc0',
		padding: 10,
	},
	MeetText: {
		color: '#000',
		textAlign: 'center',
		fontSize: 15,
	},
	Underline: {
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
	},
	AddButton: {
		position: 'absolute',
		height: 60,
		width: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Constants.PRIMARY,
		elevation: 10,
		bottom: 20,
		right: 20,
	},
	AddIcon: {
		height: 35,
		width: 35,
		tintColor: '#fff',
	},
	ModalOuter: {
		backgroundColor: '#0005',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	ModalInner: {
		backgroundColor: '#fff',
		borderRadius: 5,
		overflow: 'hidden',
		width: '80%',
	},
	ModalHeader: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: Constants.PRIMARY,
	},
	ModalContent: {
		padding: 10,
	},
	ModalFooter: {
		flexDirection: 'row',
	},
	ModalButton: {
		flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 25,
		backgroundColor: Constants.PRIMARY,
	},
	ModalButtonText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
	ModalTitle: {
		color: '#fff',
		fontSize: 18,
	},
	ModalLabel: {
		color: '#000',
		fontSize: 14,
	},
	ModalInput: {
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginTop: 5,
	},
})

export default connect(({meet, docs}) => ({meet, docs}), docActions)(Home)

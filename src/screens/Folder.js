import React, { useCallback } from 'react'
import { View, Text, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Constants from '../utils/constants'

import { useFocusEffect } from '@react-navigation/native'

const unitWidth = Dimensions.get('screen').width/3

function Folder({ route, navigation, docs }) {
	const { index } = route.params
	React.useEffect(() => {
		console.log(docs.folders[0].list, index)
	}, [])
	useFocusEffect(useCallback(() => {
		navigation.setOptions({headerTitle: docs.folders[index].name})
	}, []))
	return (
		<View style={styles.Outer}>
			<FlatList
				data={docs.folders[index].list}
				numColumns={3}
				refreshing={docs.loading}
				/*onRefresh={() => loadDocs()}*/
				keyExtractor={(_,i) => i+'_'}
				renderItem={({item}) => (
					<TouchableOpacity onPress={() => navigation.navigate('Document', item)} style={styles.DocOuter}>
						{/*<Image style={styles.DocThumbnail} source={{uri: `${Constants.PROTOCOL}://${Constants.DOMAIN}/files/thumbnails/${item.filename}.jpg`}} />*/}
						<Image style={styles.DocThumbnail} source={require('../assets/file.png')} />
						<Text style={styles.DocName}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
			<TouchableOpacity onPress={() => navigation.navigate('Upload', {index})} style={styles.AddButton}>
				<Image style={styles.AddIcon} source={require('../assets/add.png')} />
			</TouchableOpacity>
		</View>
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

export default connect((state) => ({docs: state.docs}))(Folder)

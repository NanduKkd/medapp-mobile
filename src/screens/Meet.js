import React, { useEffect, useState } from 'react'
import { View, Dimensions, ActivityIndicator, StyleSheet, Modal, FlatList, SectionList, TouchableOpacity, TouchableWithoutFeedback, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { meetActions } from '../redux/actions'
import Constants from '../utils/constants'
// import { RSA } from 'react-native-rsa-native'


const screenWidth = Dimensions.get('screen').width
const unitWidth = screenWidth/3-4

function Meet({ navigation, meet, docs, route, connectDoctor, shareDocuments }) {
	const [ showSharer, setShowSharer ] = useState(true)
	const [ selected, setSelected ] = useState([])
	const [ sharing, setSharing ] = useState(false)
	const doctor = route.params?.doctor
	useEffect(() => {
		if(!meet.profile)connectDoctor(doctor)
	}, [])
	const changeSelection = (document) => {
		const ind = selected.indexOf(document)
		if(ind===-1) setSelected(s => [...s, document])
		else setSelected(s => {
			s = [...s]
			s.splice(ind, 1)
			return s
		})
	}
	const changeFolderSelection = (folder) => {
		if(!folder.data.filter(i => selected.indexOf(i._id)===-1).length) {
			// all selected
			setSelected(s => s.filter(i => !folder.data.find(d => d._id===i)))
		} else {
			// some selected
			let s = folder.data.map(i => i._id)
			for(let i of selected) {
				let x = s.indexOf(i)
				if(x!==-1) s.splice(x,1)
			}
			setSelected(se => [...se, ...s])
		}
	}

	const share = async() => {
		setSharing(true)
		await shareDocuments(selected)
		setTimeout(() => {
			setSharing(false)
			setShowSharer(false)
		}, 2000)
	}
/*
	useEffect(() => {
		if(meet.publicKey) {
			RSA.encrypt('269638', meet.publicKey).then(enc => {
				console.log(enc, 'encrpted message')
			})
		}
	}, [meet.publicKey])
	*/
	return (
		<View style={{flex: 1, padding: 20}}>
			{ meet.loading && <ActivityIndicator size="large" color="#aaa" />}
			{ meet.profile?(
				<>
					<View style={styles.DpOuter}>
						<Image style={styles.Dp} source={{uri: 'https://asterhospitals.in/'+meet.profile.dp}} />
					</View>
					<Text style={styles.Name}>{meet.profile.name}</Text>
					<Text style={styles.Designation}>{meet.profile.designation}</Text>
					<Text style={styles.Qualification}>{meet.profile.qualification}</Text>
					<View style={{flex: 1}} />
					<Text style={styles.FooterText}>You are consulting this doctor</Text>
				</>
			):null }
			<Modal onRequestClose={() => {}} visible={showSharer}>
				<SectionList
					sections={docs.folders.map(i => ({...i, data: i.list}))}
					refreshing={docs.loading}
					keyExtractor={(_,i) => i+'_'}
					contentContainerStyle={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap'}}
					renderItem={({item}) => (
						<TouchableOpacity onPress={() => changeSelection(item._id)} style={[styles.DocOuter, {backgroundColor: selected.indexOf(item._id)> -1?'#0f05':'#fff', borderWidth: selected.indexOf(item._id)> -1?3:0}]}>
							<Image style={styles.DocThumbnail} source={{uri: `${Constants.PROTOCOL}://${Constants.DOMAIN}/files/thumbnails/${item.filename}.jpg`}} />
							<Text style={styles.DocName}>{item.name}</Text>
						</TouchableOpacity>
					)}
					renderSectionHeader={({section}) => (
						<View style={styles.FolderOuter}>
							<Text style={styles.FolderTitle}>{section.name}</Text>
							<TouchableWithoutFeedback onPress={() => changeFolderSelection(section)}>
								<View style={styles.FolderCheckbox}>
									{section.data.filter(i => selected.indexOf(i._id)===-1).length?null:<Image style={styles.Checkmark} source={require('../assets/check.png')} />}
								</View>
							</TouchableWithoutFeedback>
						</View>
					)}
				/>
				{/*
				<FlatList
					data={docs.list}
					numColumns={3}
					refreshing={docs.loading}
					keyExtractor={(_,i) => i+'_'}
					renderItem={({item}) => (
						<TouchableOpacity onPress={() => changeSelection(item._id)} style={[styles.DocOuter, {borderWidth: selected.indexOf(item._id)>-1?3:0}]}>
							<Image style={styles.DocThumbnail} source={{uri: `${Constants.PROTOCOL}://${Constants.DOMAIN}/files/thumbnails/${item.filename}.jpg`}} />
							<Text style={styles.DocName}>{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
				*/}
				<TouchableOpacity onPress={share} disabled={selected.length===0 || sharing} style={[styles.ShareButton, {backgroundColor: selected.length?'#0a0':'#aaa'}]}>
					<Text style={styles.ShareText}>Share {selected.length} documents</Text>
					{sharing?<View style={{marginLeft: 10}}><ActivityIndicator size="small" color="#fff" /></View>:null}
				</TouchableOpacity>
			</Modal>
		</View>
	)
}
export default connect(({meet, docs}) => ({meet, docs}), meetActions)(Meet);
const styles = StyleSheet.create({
	DpOuter: {
		alignItems: 'center',
		marginBottom: 20,
	},
	Dp: {
		height: 200,
		width: 200,
		borderRadius: 100,
	},
	Name: {
		color: '#000',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	Designation: {
		color: '#000a',
		textAlign: 'center',
		marginBottom: 20,
	},
	Qualification: {
		textAlign: 'center',
		color: '#0008',
		fontWeight: 'bold',
	},
	FooterText: {
		color: '#b90',
		borderColor: '#b90',
		fontWeight: 'bold',
		fontSize: 16,
		borderWidth: 2,
		borderRadius: 5,
		textAlign: 'center',
		padding: 10,
	},
	DocOuter: {
		width: unitWidth,
		alignItems: 'center',
		borderColor: '#0a0',
		margin: 2,
		marginTop: 10,
	},
	DocThumbnail: {
		height: 100,
		width: 100,
	},
	DocName: {
		color: '#000',
	},
	ShareButton: {
		//borderColor: '#b90',
		//borderWidth: 2,
		margin: 10,
		marginBottom: 15,
		borderRadius: 5,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ShareText: {
		//color: '#b90',
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	FolderOuter: {
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		marginTop: 20,
		backgroundColor: '#ddffee',
	},
	FolderTitle: {
		color: '#000',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
	},
	FolderCheckbox: {
		height: 25,
		width: 25,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	Checkmark: {
		height: 20,
		width: 20,
		tintColor: Constants.PRIMARY,
	},
})

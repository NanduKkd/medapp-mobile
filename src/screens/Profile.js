import React from 'react'
import { View, Alert, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'

import { connect } from 'react-redux'

import { userActions } from '../redux/actions'
import Datestamp from '../utils/datestamp'
import Constants from '../utils/constants'

function Profile({ user, userLogout }) {
	const onLogout = () => {
		Alert.alert("Logout", "Are you sure to logout? You will need to login again.", [ {text: "Cancel"}, {text: "Logout", onPress: () => userLogout()} ])
	}
	return (
		<ScrollView style={styles.Scroll} contentContainerStyle={styles.Container}>
			<View style={styles.Main}>
				<Image style={styles.DP} source={require('../assets/profile.png')} />
				<View style={styles.MainContent}>
					<Text style={styles.Title}>{user.data.name}</Text>
					<Text style={styles.Subtitle}>{user.data.gender.substring(0,1).toUpperCase()}{user.data.gender.substring(1)}, {new Datestamp(user.data.dob).age()} years</Text>
				</View>
			</View>
			<View style={styles.Field}>
				<Text style={styles.FieldName}>Date of Birth:</Text>
				<Text style={styles.FieldValue}>{new Datestamp(user.data.dob).format('D MMM, YYYY')}</Text>
			</View>
			<View style={styles.Field}>
				<Text style={styles.FieldName}>Phone:</Text>
				<Text style={styles.FieldValue}>{user.data.phone}</Text>
			</View>
			<View style={{height: 30}} />
			<TouchableOpacity onPress={onLogout} style={styles.Button}>
				<Text style={styles.ButtonText}>Logout</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	Scroll: {
		backgroundColor: '#fff',
	},
	Container: {
		padding: 20,
	},
	Field: {
		flexDirection: 'row',
		marginTop: 10,
	},
	FieldName: {
		color: '#000',
		fontSize: 18,
		marginRight: 20,
	},
	FieldValue: {
		flex: 1,
		fontSize: 18,
		textAlign: 'right',
		color: '#000',
	},
	Button: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: '#f00',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	ButtonText: {
		color: '#f00',
		fontSize: 18,
		fontWeight: 'bold',
	},
	Main: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 30,
	},
	DP: {
		tintColor: Constants.PRIMARY,
		height: 100,
		width: 100,
		marginRight: 20,
	},
	MainContent: {},
	Title: {
		fontSize: 24,
		color: '#000',
		fontWeight: 'bold',
		marginBottom: 3,
	},
	Subtitle: {
		color: '#000',
		fontSize: 18,
	},
})

export default connect(({user}) => ({user}), userActions)(Profile)

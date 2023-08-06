import React, { useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { appActions, userActions } from '../redux/actions'

function Splash({ appInit, userInit }) {
	useEffect(() => {
		appInit()
		userInit()
	}, [])
	return (
		<View style={styles.Outer}>
			<StatusBar backgroundColor="#245c6d" barStyle="light" />
			<View style={{flex: 1}} />
			<Text style={styles.Title}>MedApp</Text>
			<View style={{flex: 1}} />
			<Text style={styles.SubTitle}>Powered by <Text style={styles.Aster}>Aster Medicity</Text></Text>
		</View>
	)
}

const styles = StyleSheet.create({
	Outer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#245c6d',
		alignItems: 'center',
		padding: 20,
	},
	Title: {
		color: '#fff',
		fontSize: 48,
		fontWeight: 'bold',
	},
	SubTitle: {
		color: '#fff7',
	},
	Aster: {
		color: '#fff',
	},
})

export default connect(() => ({}), { ...appActions, ...userActions })(Splash)

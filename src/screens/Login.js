import React, { useEffect, useState } from 'react'
import { Alert, View, Text, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { userActions } from '../redux/actions'

function Login({ navigation, userLogin, user }) {
	const [ phone, setPhone ] = useState('')
	const [ password, setPassword ] = useState('')
	const onLogin = () => {
		userLogin(phone, password).then(err => {
			if(err) {
				Alert.alert("Error", err)
			}
		})
	}
	return (
		<View style={styles.Container}>
			<TextInput style={styles.Input} placeholderTextColor="#aaa" placeholder="Phone number" onChangeText={setPhone} value={phone} disabled={user.loading} />
			<TextInput style={styles.Input} placeholderTextColor="#aaa" placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} disabled={user.loading} />
			<TouchableOpacity disabled={!(phone||password) || user.loading} onPress={() => onLogin()} style={[styles.Button, { backgroundColor: (phone&&password&&!user.loading)?'#00f':'#ccc' }]}>
				<Text style={[styles.ButtonText, {marginRight: user.loading?10:0}]}>Login</Text>
				{user.loading?(
					<ActivityIndicator color="#fff" size="small" />
				):null}
			</TouchableOpacity>
			<Text style={styles.OrText}>OR</Text>
			<TouchableOpacity onPress={() => navigation.navigate('Signup')} disabled={user.loading} style={[styles.ButtonOutline, {borderColor: user.loading?'#ccc':'#00f'}]}>
				<Text style={[styles.ButtonOutlineText, {color: user.loading?'#ccc':'#00f'}]}>Create Account</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	Scroll: {
	},
	Container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
	Input: {
		borderWidth: 1,
		borderColor: '#aaa',
		marginTop: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		color: '#000',
	},
	Button: {
		backgroundColor: '#00f',
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		flexDirection: 'row',
	},
	ButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	OrText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#666',
		fontWeight: 'bold',
		marginVertical: 20,
	},
	ButtonOutline: {
		padding: 15,
		borderRadius: 5,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ButtonOutlineText: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default connect(({user}) => ({user}), userActions)(Login)

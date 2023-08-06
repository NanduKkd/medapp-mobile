import React, { useEffect, useState, useMemo } from 'react'
import {
	Alert,
	View,
	Text,
	TextInput,
	ActivityIndicator,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
	StyleSheet
} from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { connect } from 'react-redux'

import Datestamp from '../utils/datestamp'

import { userActions } from '../redux/actions'

function Login({ navigation, userSignup, user }) {
	const [ name, setName ] = useState('')
	const [ gender, setGender ] = useState(null)
	const [ dob, setDob ] = useState(null)
	const [ phone, setPhone ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ pass, setPass ] = useState('')
	const [ confirm, setConfirm ] = useState('')
	const verified = useMemo(() => {
		return name&&gender&&dob&&phone&&email&&pass.length>5&&pass===confirm
	}, [name, phone, email, pass, confirm])
	const onDob = () => {
		DateTimePickerAndroid.open({
			value: dob?.toDate()||new Date(),
			onChange: (e,d) => setDob(new Datestamp(d))
		})
	}
	const onSignup = () => {
		userSignup({ name, phone, email, password: pass, gender, dob: dob.ds }).then(err => {
			if(err) {
				Alert.alert("Error", err)
			}
		})
	}
	return (
		<ScrollView style={styles.Scroll} contentContainerStyle={styles.Container}>
			<TextInput disabled={user.loading} style={styles.Input} placeholderTextColor="#aaa" placeholder="Full name" onChangeText={setName} value={name} />
			<View style={styles.InputField}>
				<Text style={styles.InputLabel}>Your Gender:</Text>
				<View style={styles.InputRow}>
					<TouchableWithoutFeedback onPress={() => setGender('female')}>
						<View style={styles.RadialRow}>
							<View style={styles.RadialMarker}>
								{gender==="female" && <View style={styles.RadialMark} /> }
							</View>
							<Text style={styles.RadialLabel}>Female</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => setGender('male')}>
						<View style={styles.RadialRow}>
							<View style={styles.RadialMarker}>
								{gender==="male" && <View style={styles.RadialMark} /> }
							</View>
							<Text style={styles.RadialLabel}>Male</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.InputRow}>
					<TouchableWithoutFeedback onPress={() => setGender('others')}>
						<View style={styles.RadialRow}>
							<View style={styles.RadialMarker}>
								{gender==="others" && <View style={styles.RadialMark} /> }
							</View>
							<Text style={styles.RadialLabel}>Others</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
			<TouchableWithoutFeedback onPress={onDob}>
				<View style={styles.InputBox}>
					<Text style={[styles.InputValue, {color: dob?'#000':'#999'}]}>{dob?.format('D MMM, YYYY') || "Date of Birth"}</Text>
				</View>
			</TouchableWithoutFeedback>
			<TextInput disabled={user.loading} style={styles.Input} placeholderTextColor="#aaa" placeholder="Phone number" onChangeText={setPhone} value={phone} />
			<TextInput disabled={user.loading} style={styles.Input} placeholderTextColor="#aaa" placeholder="Email address" onChangeText={setEmail} value={email} />
			<TextInput disabled={user.loading} style={styles.Input} placeholderTextColor="#aaa" placeholder="Password" secureTextEntry onChangeText={setPass} value={pass} />
			<TextInput disabled={user.loading} style={styles.Input} placeholderTextColor="#aaa" placeholder="Confirm Password" secureTextEntry onChangeText={setConfirm} value={confirm} />
			<TouchableOpacity disabled={!verified || user.loading} onPress={() => onSignup()} style={[styles.Button, { backgroundColor: verified&&!user.loading?'#00f':'#ccc' }]}>
				<Text style={[styles.ButtonText, {marginRight: user.loading?10:0}]}>Signup {user.data.name}</Text>
				{user.loading?(
					<ActivityIndicator color="#fff" size="small" />
				):null}
			</TouchableOpacity>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	Scroll: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Container: {
		padding: 20,
	},
	InputField: {
		marginTop: 10
	},
	InputLabel: {
		color: '#555',
		fontSize: 14,
		paddingVertical: 5,
	},
	InputRow: {
		flexDirection: 'row',
		paddingVertical: 5,
		paddingHorizontal: 20,
	},
	RadialRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	RadialMarker: {
		height: 15,
		width: 15,
		borderWidth: 1,
		borderRadius: 10,
		marginLeft: 5,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	RadialMark: {
		height: 8,
		width: 8,
		borderRadius: 5,
		backgroundColor: '#000',
	},
	RadialLabel: {
		fontSize: 16,
		color: '#000',
	},
	InputBox: {
		borderWidth: 1,
		borderColor: '#aaa',
		marginTop: 10,
		paddingHorizontal: 10,
		paddingVertical: 15,
		borderRadius: 5,
	},
	Input: {
		borderWidth: 1,
		color: '#000',
		borderColor: '#aaa',
		marginTop: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
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
})

export default connect(({user}) => ({user}), userActions)(Login)

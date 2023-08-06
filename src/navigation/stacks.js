import React from 'react'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { connect } from 'react-redux'

import SplashScreen from '../screens/Splash'
import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'
import ScanScreen from '../screens/Scan'
import MeetScreen from '../screens/Meet'
import UploadScreen from '../screens/Upload'
import DocumentScreen from '../screens/Document'
import LoginScreen from '../screens/Login'
import SignupScreen from '../screens/Signup'
import FolderScreen from '../screens/Folder'
import MedicationScreen from '../screens/Medication'
import Constants from '../utils/constants'

const Stack = createNativeStackNavigator();

function Stacks({app, user}) {
	return (
		<>
			<StatusBar backgroundColor="#245c6d" barStyle="light" />
			<Stack.Navigator screenOptions={{headerStyle: {backgroundColor: Constants.PRIMARY}, headerTintColor: '#fff'}}>
				{app.init || user.init?
					<Stack.Screen name="Splash" options={{headerShown: false}} component={SplashScreen} />
				:null}
				{user.token?
					<>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Medication" component={MedicationScreen} options={{title: 'Your Daily Medicines'}} />
						<Stack.Screen name="Profile" component={ProfileScreen} />
						<Stack.Screen name="Scan" component={ScanScreen} />
						<Stack.Screen name="Upload" component={UploadScreen} />
						<Stack.Screen name="Document" component={DocumentScreen} />
						<Stack.Screen name="Folder" component={FolderScreen} />
						<Stack.Screen name="Meet" component={MeetScreen} options={{ title: "Meet" }} />
					</>
				:
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Signup" component={SignupScreen} />
					</>
				}
			</Stack.Navigator>
		</>
	)
}

export default connect(({user, app}) => ({app, user}))(Stacks)

/**
 * @format
 */

import 'react-native-reanimated'
import React from 'react'
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux'
import Navigation from './src/navigation';
import store from './src/redux/store'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => (
	<Provider store={store}>
		<Navigation />
	</Provider>
));

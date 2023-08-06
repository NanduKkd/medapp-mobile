import React from 'react'
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native'
import Constants from '../utils/constants'

export default function Medication () {
	return (
		<View style={styles.Outer}>
			<FlatList
				style={styles.Scroll}
				contentContainerStyle={styles.Container}
				data={[{title: "Medicine 1", subtitle: "Morning and night, after food"}, {title: "Medicine 2", subtitle: "Night, before food"}, {title: "Medicine 3", subtitle: "Morning and Night, after food"}]}
				renderItem={({item, index}) => (
					<View style={styles.ItemOuter}>
						<Text style={styles.ItemName}>{item.title}</Text>
						<Text style={styles.ItemSubtitle}>{item.subtitle}</Text>
					</View>
				)}
				keyExtractor={(_,i) => i+'_'}
			/>
			<TouchableOpacity style={styles.AddButton}>
				<Image style={styles.AddIcon} source={require('../assets/add.png')} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	Outer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Scroll: {
		flex: 1,
		backgroundColor: '#eee',
	},
	Container: {
		padding: 10,
	},
	ItemOuter: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		padding: 10,
	},
	ItemName: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 20,
	},
	ItemSubtitle: {
		color: '#777',
		fontSize: 15,
		marginBottom: 5,
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
})

import AsyncStorage from '@react-native-async-storage/async-storage'

export const readUser = async() => {
	const data = await AsyncStorage.getItem('@user')
	return data?JSON.parse(data):{}
}
export const writeUser = (data) => AsyncStorage.setItem('@user', JSON.stringify(data))
export const deleteUser = () => AsyncStorage.removeItem('@user')

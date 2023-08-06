import React, { useCallback, useState, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, StyleSheet, Vibration } from 'react-native'
import { useCameraDevices, Camera, useFrameProcessor } from 'react-native-vision-camera'
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'
import { runOnJS } from 'react-native-reanimated'

function Scan({ navigation }) {
	const [hasPermission, setHasPermission] = useState(false);
	const devices = useCameraDevices();
	const device = devices.back;
	const scanned = useRef(false)

	const onBarcode = (doctor) => {
		if(!scanned.current) {
			navigation.reset({ index: 1, routes: [{ name: 'Home' }, { name: 'Meet', params: {doctor} }] })
			Vibration.vibrate(100)
			setHasPermission(false)
			scanned.current = true
		}
	}

	const frameProcessor = useFrameProcessor((frame) => {
		'worklet'
		const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true })
		if(barcodes.length && barcodes[0].format===256 && barcodes[0].rawValue) {
			runOnJS(onBarcode)(barcodes[0].rawValue)
		}
	}, [])

	useFocusEffect(useCallback(() => {
		Camera.requestCameraPermission().then(status => setHasPermission(status==="authorized"))
		//navigation.reset({ index: 1, routes: [{ name: 'Home' }, { name: 'Meet', params: {doctor: 'davidson-devasia'} }] })
	}, []))

	return (
		device != null && hasPermission && (
			<Camera
				style={StyleSheet.absoluteFill}
				device={device}
				isActive={true}
				frameProcessor={frameProcessor}
				frameProcessorFps={5}
			/>
		)
	)
}

const styles = StyleSheet.create({
	Outer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	Label: {
		color: '#000'
	}
})

export default Scan

import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from "react-native-unimodules";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from "./components/navigation";
import reducer from './reducers';
import { purple } from './utils/colors';


export function UdaciStatusBar ({ backgroundColor, ...props }) {

	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

export default function App() {

	useEffect(() => {
		console.log("Before..")
		debugger
		console.log("After...")
	});

	return (
		<Provider store = {createStore(reducer)}>
			<View style={{flex: 1}}>
				<Navigation />
			</View>
		</Provider>
	);
}

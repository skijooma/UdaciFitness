import * as Notifications from "expo-notifications";
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from "react-native-unimodules";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from "./components/navigation";
import reducer from './reducers';
import { purple } from './utils/colors';
import { setLocalNotification } from "./utils/helpers";


export function UdaciStatusBar ({ backgroundColor, ...props }) {

	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {

	useEffect(() => {
		console.log("Before..")
		debugger
		console.log("After...")
	});

	useEffect(() => {
		setLocalNotification()
			.then(() => console.log("LOCAL NOTIFICATIONS SET"))
	});

	return (
		<Provider store = {createStore(reducer)}>
			<View style={{flex: 1}}>
				<Navigation />
			</View>
		</Provider>
	);
}

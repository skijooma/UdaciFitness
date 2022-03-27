import React, { useEffect } from 'react';
import { View } from 'react-native';
import AddEntry from "./components/AddEntry";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import History from "./components/History";
import reducer from './reducers';


export default function App() {

	useEffect(() => {
		console.log("Before..")
		debugger
		console.log("After...")
	});

	return (
		<Provider store = {createStore(reducer)}>
			<View style = {{ flex: 1 }}>
				<View style = {{ height: 20 }}/>
				<History/>
			</View>
		</Provider>
	);
}

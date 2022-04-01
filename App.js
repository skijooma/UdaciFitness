import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import reducer from './reducers';
import { purple, white } from './utils/colors';
import { Constants } from "react-native-unimodules";


function UdaciStatusBar ({ backgroundColor, ...props }) {

	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tab =
	Platform.OS === 'ios'
		? createBottomTabNavigator()
		: createMaterialTopTabNavigator();

export default function App() {

	useEffect(() => {
		console.log("Before..")
		debugger
		console.log("After...")
	});

	return (
		<Provider store = {createStore(reducer)}>
			<NavigationContainer>
				<UdaciStatusBar backgroundColor={ purple } barStyle="light-content" />
				<Tab.Navigator
					screenOptions = {({ route }) => ({
						tabBarIcon: ({ color, size }) => {
							let icon;
							if (route.name === 'Add Entry') {
								icon = (<FontAwesome name = 'plus-square' size = {size} color = {color}/>)
							} else if (route.name === 'History') {
								icon = (<Ionicons name = 'ios-bookmarks' size = {size} color = {color}/>)
							}

							return icon;
						},
						tabBarStyle: {
							backgroundColor: Platform.OS === 'ios' ? white : purple,
							// height: 56,
							// shadowColor: 'rgba(0, 0, 0, 0.24)',
							// shadowOffset: {
							// 	width: 0,
							// 	height: 3
							// },
							// shadowRadius: 6,
							// shadowOpacity: 1
						},
						tabBarItemStyle: { shadowColor: 'rgba(0, 0, 0, 0.24)', },
						tabBarActiveTintColor: Platform.OS === 'ios' ? purple : white,
						headerShown: false,
					})}
				>
					<Tab.Screen name = "History" component = {History}/>
					<Tab.Screen name = "AddEntry" component = {AddEntry}/>
				</Tab.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

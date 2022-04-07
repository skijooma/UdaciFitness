import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from 'react';
import { Platform } from "react-native";
import { purple, white } from "../utils/colors";
import AddEntry from "./AddEntry";
import History from "./History";
import { Live } from "./Live";


const Tab =
	Platform.OS === 'ios'
		? createBottomTabNavigator()
		: createMaterialTopTabNavigator();

const HomeScreen = () => {

	return (
		<Tab.Navigator
			screenOptions = {({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let icon;
					if (route.name === 'AddEntry') {
						icon = (<FontAwesome name = 'plus-square' size = {size} color = {color}/>)
					} else if (route.name === 'History') {
						icon = (<Ionicons name = 'ios-bookmarks' size = {size} color = {color}/>)
					} else if (route.name === 'Live') {
						icon = (<Ionicons name = 'speedometer' size = {size} color = {color}/>)
					}

					return icon;
				},
				tabBarStyle: {
					backgroundColor: Platform.OS === 'ios' ? white : purple,
				},
				tabBarItemStyle: { shadowColor: 'rgba(0, 0, 0, 0.24)', },
				tabBarActiveTintColor: Platform.OS === 'ios' ? purple : white,
				headerShown: false,
			})}
		>
			<Tab.Screen name="History" component={History}/>
			<Tab.Screen name="AddEntry" component={AddEntry}/>
			<Tab.Screen
				name="Live"
				component={Live}
				options={{
					headerTintColor: white,
					headerStyle: {
						backgroundColor: purple,
					}
				}}
			/>
		</Tab.Navigator>
	)
}

export default HomeScreen;

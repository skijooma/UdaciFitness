import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform } from "react-native";
import React from 'react';
import { purple, white } from "../utils/colors";
import History from "./History";
import AddEntry from "./AddEntry";


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
					if (route.name === 'Add Entry') {
						icon = (<FontAwesome name = 'plus-square' size = {size} color = {color}/>)
					} else if (route.name === 'History') {
						icon = (<Ionicons name = 'ios-bookmarks' size = {size} color = {color}/>)
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
		</Tab.Navigator>
	)
}

export default HomeScreen;
